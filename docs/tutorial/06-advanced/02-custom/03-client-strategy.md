---
title: Client Strategy
---

alova's client strategies are divided into three types: middleware, interceptor, and useHook. When your project needs customization, you can refer to this section.

## Middleware

Middleware provides powerful capabilities that can control almost all behaviors of a request. You can use it to control request behavior, customize request status, error handling, etc. For details, please go to [Request Middleware](/tutorial/client/in-depth/middleware) to view. The following source code can tell you what the middleware can do.

- [actionDelegationMiddleware](https://github.com/alovajs/alova/blob/main/packages/client/src/middlewares/actionDelegation.ts) Cross-component triggering requests are implemented through middleware.
- [useSQRequest](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/silent/useSQRequest.ts) Implement immediate response requests in middleware without waiting.
- [useSerialRequest](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/serial/useSerialRequest.ts) Serialize requests in middleware and manage response data for multiple requests.
- [useRetriableRequest](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/useRetriableRequest.ts) Retry failed requests in middleware.
- [Delayed update loading](/tutorial/project/best-practice/middleware) example.

## Interceptor

Interceptors control global pre- and post-request behaviors. We can wrap global interceptors to implement interceptors with specific functions.

The following is an example that interrupts all ongoing requests under certain conditions.

```js
const methodsAborter = (handler, detector) => {
  let requestingMethods = [];
  // Return the pre-request interceptor
  return method => {
    if (detector()) {
      requestingMethods.forEach(method => {
        method.abort();
      });
      return;
    }
    requestingMethods.push(method);
    method.promise
      ?.then(() => {
        requestingMethods = requestingMethods.filter(item => item !== method);
      })
      .catch(() => {}); // Prevent errors from being thrown
    handler(method);
  };
};

createAlova({
  beforeRequest: methodsAborter(
    method => {
      // Original pre-request hook
    },
    () => {
      // Interrupt request judgment condition
      return false;
    }
  )
});
```

A more complex example, [token Authentication interceptor](https://github.com/alovajs/alova/blob/main/packages/client/src/functions/tokenAuthentication/createTokenAuthentication.ts)

## useHook

useHook is the most commonly used request strategy of alova, and it is cross-UI framework. When you write useHook for a specific UI framework, you can write it just like ordinary useHook. Here we mainly understand the useHook writing across UI frameworks.

We innovatively use **state proxy** to smooth out the differences in UI framework states. Its usage is similar to Vue's ref value. You only need to simply access the v attribute or assign a value to the v attribute, and you no longer need to care about the differences in UI frameworks.

In order to smooth out the differences in state proxies, we provide the `statesHookHelper` function to create auxiliary functions, and use these auxiliary functions to implement useHook across UI frameworks.

```js
import { statesHookHelper } from '@alova/shared/function';
import { promiseStatesHook } from 'alova';

function myUseHook(methodHandler, options) {
  const {
    create,
    computed,
    ref,
    onMounted,
    onUnmount,
    watch,
    objectify,
    exposeProvider,
    __referingObj
  } = statesHookHelper(promiseStatesHook());
}
```

Next, let's take a closer look at them.

### Create a state

Use `create` to create a UI framework-independent state proxy FrameworkState, taking the loading state as an example.

```js
// Parameter 1: initial value
// Parameter 2: export key
const loading = create(false, 'loading');

// Get the original value
const dehydratedLoading = loading.v;
// Update the state value
loading.v = true;
// Get the export value, call `statesHook.export` to export the value internally
const exportedLoading = loading.e;
// Get the platform-related state value created by statesHook.create
const platformedState = loading.s;
```

### Create a computed value

Use `computed` to create a UI framework-independent computed value. In order to be compatible with react, you need to pass in the computed value dependency, which can be a platform-related state value and FrameworkState.

```js
// Parameter 1: Function of computed value
// Parameter 2: Computed property dependency
// Parameter 3: Export key
const computedState = computed(() => !loading.v, [loading], 'states');

// Get the original value
const dehydratedComputedState = computedState.v;
// Get the exported value, call `statesHook.export` to export the value internally
const exportedComputedState = computedState.e;
// Get the platform-related state value created by statesHook.computed
const platformedComputedState = computedState.s;
```

### Create reference value

It is mainly used to cross the closure trap of react, call `useRef` internally, and other frameworks directly return `{ current: value }` objects, which are accessed and updated through `unifiedValue.current`.

```js
const unifiedValue = ref({});
```

### Component mounting hook

```js
onMounted(() => {});
```

### Component uninstallation hook

```js
onUnmount(() => {});
```

### Monitor state changes

```js
// Parameter 1: Monitor item, used for compatibility with react, can pass platform-related state values ​​and FrameworkState
// Parameter 2: Callback function
watch([loading, computedState.e], () => {});
```

### State objectification

Convert the state proxy array unrelated to the UI framework into a state object, generally used with `exposeProvider`, with key as the key, and the second parameter can also specify the value of the object.

```js
const states = objectify([loading, data, error]);
/* The value of states is
{
loading: loading,
data: data,
error: error
}
*/

const states = objectify([loading, data, error], 's');
/* The value of states is
{
loading: loading.s,
data: data.s,
error: error.s
}
*/
```

### Expose internal data

If the internal information of useHook is exported directly, it will become unusable, so `exposeProvider` is provided for export, which will automatically help us handle the following:

1. Automatically convert the state proxy to the state of the corresponding UI framework.
2. Provide a unified update function. If the incoming parameters include the states and update functions returned by useRequest, they will also be automatically compatible with these.
3. In react, functions that do not start with on are wrapped with memorize, and those that have been wrapped are no longer wrapped.
4. Functions that start with on are considered event binding functions and will be directly added to the export object.
5. Export a unified referringObject.

The following is an export example of `usePagination`:

```js
export const usePagination = (/* ... */) => {
  return exposeProvider({
    // Return object of useWatcher in current useHook
    ...useWatcherReturns,

    // State array to object
    ...objectify([page, pageSize, data, pageCount, total, isLastPage]),

    // Operation function
    reset: () => {
      // ...
    },

    // Event binding function
    onFetchSuccess: fetchState.onSuccess
    // ...
  });
};
```

### `__referingObj` Description

`__referingObj` is for compatibility with options style and class style UI frameworks. It is a common reference object used to synchronize the component objects of options and class style, so that the corresponding component objects can be accessed in statesHook. The same referingObj object needs to be used in the custom useHook to ensure that the states in a useHook can access the same component object.
`__referingObj` will be created and returned in `statesHookHelper`, and no specific processing is required. Just export it as follows.

When the alova core hook is used in the scene hook, pass this object into the hook and ensure that it is exported in this useHook.

> If referingObj is not passed in, the core hook will be automatically created internally

```js

export const useXXX = (...) => {
const {__referingObj,
// ...
} = statesHookHelper(promiseStatesHook());

const states = useReqest(methodHandler, {
__referingObj
});

return {
// ...
__referingObj,
}
}
```

When the alova core hook is not used in the scene hook, the referingObj object is exported directly in this useHook.

```js
export const useXXX = (/* ... */) => {
  const {
    __referingObj
    // ...
  } = statesHookHelper(promiseStatesHook());
  // ...

  return {
    // ...
    __referingObj
  };
};
```

When you use `exposeProvider` to export information, it will automatically export `__referingObj` without us having to handle it manually.
