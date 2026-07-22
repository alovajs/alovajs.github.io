Next, let's see how to use alova with a client UI framework, so it can show its real power. Inside a UI framework, alova not only manages the reactive request state automatically, but also controls when a request should be sent through certain rules.

`alova` provides 15+ client request strategies, which help you implement complex requests in a simple and elegant way. Let's continue to look down!

## Set statesHook

Alova's useHook request strategy can run in all UI frameworks supported by Alova. You only need to set the statesHook of the corresponding UI framework on the Alova instance, which will tell Alova which UI framework should be used to create states.

**vue:**

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: VueHook
  // highlight-end
});
```


---

**react/next:**

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: ReactHook
  // highlight-end
});
```


---

**nuxt:**

```js
import { createAlova } from 'alova';
import NuxtHook from 'alova/nuxt';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: NuxtHook({
    nuxtApp: useNuxtApp
  })
  // highlight-end
});
```

For more usage about NuxtHook，please refer to [SSR#nuxt](/tutorial/advanced/in-depth/ssr#nuxt3)

---

**svelte:**

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: SvelteHook
  // highlight-end
});
```


---

**solid:**

```js
import { createAlova } from 'alova';
import SolidHook from 'alova/solid';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: SolidHook
  // highlight-end
});
```


---

**vue-demi:**

```js
import { createAlova } from 'alova';
import VueDemiHook from 'alova/vue-demi';

// support vue@2.7+ composition api
export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: VueDemiHook
  // highlight-end
});
```


In addition, alova also provides the following statesHooks:

- [statesHook for vue options style](/resource/framework/vue-options), which means you can use alova's usehooks in vue2's options style components.

## Automatically manage request status

`useRequest` is our most commonly used request strategy. It can help us create and maintain responsive states of requests, such as `loading/data/error`, etc. You can use these responsive states directly in the view. When they change, the view will also change accordingly.

useRequest means sending a request. By default, a request will be sent when called.

**vue:**



---

**react:**



---

**svelte:**



---

**solid:**



[When to use useRequest and when to send a request via `await alovaInstance.Get`](/tutorial/project/best-practice/skills).

:::warning useHook usage specification

Please note that `useRequest` can only be used to send requests within a component. Outside a component, you can send requests directly through a method instance, and the use of `useRequest` must comply with the use hook usage rules, that is, it can only be called at the outermost level of a function.

**❌ Do not call it inside a loop, conditional, or nested function.** For example, calling it inside a click callback can start the request normally, but the reactive data returned by the hook cannot be used in the view — the same applies to loops and conditionals.

```javascript
// ❌ bad
const handleClick = () => {
  const { loading, data } = useRequest(getter);
};

// -------
// ✅ good
const { loading, data, send } = useRequest(getter, {
  immediate: false
});
const handleClick = () => {
  send();
};
```

:::

## Submit data

When you need to submit a new todo item, you can first disable the automatic request and switch to manual triggering, then take the `send` function from `useRequest` to send requests yourself. `send` returns a Promise that resolves with the response data once the request completes.

At this time, in order to receive the parameters passed in by the `send` function, you can set the first parameter of `useRequest` to a function, which we call **method handler**.

```javascript
const {
  // ...
  // Function for manual sender request, send request after calling
  send: addTodo

  // Parameters of send function will be received here
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // When immediate is false, it is not sent by default
  immediate: false
});

// Send request manually
const handleAddTodo = () => {
  const newTodo = {
    title: 'New todo item',
    time: new Date().toLocaleString()
  };
  // The send function returns a Promise object, which can receive response data
  addTodo(newTodo)
    .then(result => {
      console.log('Add todo item successfully, response data is:', result);
    })
    .catch(error => {
      console.log('Add todo item failed, error message is:', error);
    });
};
```

The `send` function allows you to freely repeat requests.

> In react, the send function uses the `useCallback` package, and it is not restricted by the closure trap. You can use it directly in the event without worrying about performance problems.

## Process Response

After the request is completed, the response data will be processed through multiple processes before the final data is obtained at the location where the request was sent. The process is as follows:

```mermaid
flowchart LR
   classDef condition fill:#a8bcff

   R1[Response successfully] --> global.onSuccess
   global.onSuccess --> global.onComplete
   global.onSuccess --> throw{Is an error thrown? }:::condition
   throw -->|No| method.transform
   method.transform --> useHook.onSuccess
   throw -->|Yes| useHook.onError

   method.transform --> throw2{Is an error thrown? }:::condition
   throw2 -->|No| useHook.onSuccess
   throw2 -->|Yes| useHook.onError

   useHook.onSuccess --> throw3{Throw an error? }:::condition
   throw3 -->|Yes| useHook.onError

   R2[Response Error] --> global.onError
   global.onError --> global.onComplete
   global.onError --> throw4{Is an error thrown? }:::condition
   throw4 -->|Yes| useHook.onError
   throw4 -->|No| method.transform
```

When no error is thrown, the next node receives the return value of the previous node.

### Transform response data

In [method detailed explanation](/tutorial/getting-started/basic/method), we have already learned about `transform`, which is also very useful when used in useHook. It allows useHook's data to receive the transformed data without transform again.

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
   // The function accepts raw data and response header objects, and requires the transformed data to be returned, which will be assigned to the data state.
   // Note: rawData is the data filtered by the global response interceptor (if it is set). For the configuration of the response interceptor, please refer to the [Setting the Global Response Interceptor] chapter.
   transform(rawData, headers) {
     return rawData.list.map(item => ({
       ...item,
       statusText: item.done ? 'Completed' : 'In progress'
     });
   }
});
```

```javascript
const { data } = useRequest(todoListGetter);
const { data } = useWatcher(() => todoListGetter, [userInfo]);
```

The data value will receive the transformed data format.

```typescript
type Data = {
  // ...
  statusText: 'Completed' | 'In progress';
}[];
```

:::warning note

When used in usehooks, throwing an error in `transform` will also trigger `onError`;

:::

### Bind response callback

If you need to set a request callback, you can also receive the callback setting function in the return parameter of useHooks, as follows:

```javascript
const {
  // ...

  //Successful callback binding
  onSuccess,

  // Failure callback binding
  onError,

  // Complete the callback binding, the callback will be called on success or failure
  onComplete
} = useRequest(todoListGetter);
onSuccess(event => {
  console.log('The request was successful, the response data is:', event.data);
  console.log('The method instance of this request is:', event.method);
  console.log('Whether the response data comes from the cache:', event.fromCache);
});
onError(event => {
  console.log('The request failed, the error message is:', event.error);
  console.log('The method instance of this request is:', event.method);
});
onComplete(event => {
  // event.status is success when it succeeds and error when it fails.
  console.log('The request is completed, the status is: ', event.status);
  console.log('The method instance of this request is:', event.method);
  console.log('Whether the response data comes from the cache:', event.fromCache);
  if (event.data) {
    console.log('Request data:', event.data);
  } else if (event.error) {
    console.log('Error message:', event.error);
  }
});
```

We also support the chain call of binding functions in all useHooks。

```js
const { data, loading, error, onSuccess, onError, onComplete } = useRequest(todoListGetter)
  .onSuccess(event => {
    // ...
  })
  .onError(event => {
    // ...
  })
  .onComplete(event => {
    // ...
  });
```

:::note Hint

Throwing an error in `onSuccess` will trigger `onError`.

:::

## End

The above is the basic use of our most commonly used `useRequest`. Other commonly used request strategies include:

1. useWatcher: monitor data changes and automatically request
2. useForm: form data submission and management
3. useAutoRequest: automatically request according to rules such as timed polling, browser focus, network reconnection, etc.
4. ...

For complete usage or other client request strategies, please move to [Client Strategy](/tutorial/client/strategy) to view all client request strategies provided by alova.
