---
title: Core useHooks
---

## useRequest

Indicates the sending of a request. When useRequest is executed, a request is sent by default, and stateful request-related data, such as `loading/data/error`, is created and maintained. It is the most commonly used method when the page obtains initial data. It also supports turning off its default request sending, which is very useful in request scenarios triggered by click events such as submitting data.

> Go to [useRequest](/tutorial/client/strategy/use-request) for details.

### Type

```ts
function useRequest<AG extends AlovaGenerics>(
  methodHandler: Method | (...args: any[]) => Method<AG>,
  config?: RequestHookConfig
): UseHookUseHookExposure<AG>;
```

### Parameters

1. `methodHandler`: Can be passed in two forms: method instance and function. When specified as a function, it can receive the parameters passed in by `send` and require a method instance to be returned.
2. `config`: Configuration parameters of hook.

| Name          | Description                                                                                                   | Type                                                                                                                              | Default | Version |
| ------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| immediate     | Whether to initiate a request immediately                                                                     | boolean                                                                                                                           | true    | -       |
| initialData   | Initial data value, before the first response, data value is the initial value, if not set, it is `undefined` | any                                                                                                                               | -       | -       |
| force         | Whether to force the request, can be set to a function to dynamically return a boolean value                  | boolean \| (...args: any[]) => boolean \| false                                                                                   | -       | -       |
| managedStates | Additional supervision states, can be updated through updateState                                             | Record\<string \|number \| symbol, any\>                                                                                          | -       | -       |
| middleware    | Middleware function, [Learn about alova middleware](/tutorial/client/in-depth/middleware)                     | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -       | -       |

#### AlovaFrontMiddlewareContext

| Name           | Description                                                                                                                                                                 | Type                                    | Version |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------- |
| method         | The method object of the current request                                                                                                                                    | Method                                  | -       |
| cachedResponse | The cache data hit                                                                                                                                                          | any                                     | -       |
| config         | The current use hook configuration                                                                                                                                          | Record\<string, any\>                   | -       |
| args           | The parameters of the response processing callback, which are passed in by the send of use hooks                                                                            | any[]                                   | -       |
| proxyStates    | The proxy collection of use hook states, such as data, loading, error, etc.                                                                                                 | [FrameworkStateMap](#frameworkstatemap) | -       |
| send           | Send request function                                                                                                                                                       | (...args: any[]) => void                | Promise |
| abort          | Interrupt function                                                                                                                                                          | () => void                              | -       |
| controlLoading | Customize the state of loading control, and the call will no longer trigger the change of loading state. When the control passed in is false, the control will be cancelled | (control?: boolean) => void             | -       |

#### AlovaGuardNext

```typescript
type AlovaGuardNext = (guardNextConfig?: {
  force?: boolean | (...args: any[]) => boolean;
  method?: Method;
}): Promise;
```

#### FrameworkStateMap

The following property values ​​are `FrameworkState` collections. `FrameworkState` is a state proxy. [Click here for details](/tutorial/advanced/custom/client-strategy#usehook)

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| loading     | Request loading state         | boolean            | -       |
| data        | Response data                 | any                | -       |
| error       | Request error information     | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

#### AlovaSuccessEvent

| Name      | Description                                                                              | Type    | Version |
| --------- | ---------------------------------------------------------------------------------------- | ------- | ------- |
| method    | Method object of the current request                                                     | Method  | -       |
| args      | Parameters of the response processing callback, which are passed in by send of use hooks | any[]   | -       |
| data      | Response data                                                                            | any     | -       |
| fromCache | Whether the response data comes from the cache                                           | boolean | -       |

#### AlovaErrorEvent

| Name   | Description                                                                                      | Type   | Version |
| ------ | ------------------------------------------------------------------------------------------------ | ------ | ------- |
| method | The method object of the current request                                                         | Method | -       |
| args   | The parameters of the response processing callback, which are passed in by the send of use hooks | any[]  | -       |
| error  | Response error instance                                                                          | Error  | -       |

#### AlovaCompleteEvent

| Name      | Description                                                                                      | Type                 | Version |
| --------- | ------------------------------------------------------------------------------------------------ | -------------------- | ------- |
| method    | The method object of the current request                                                         | Method               | -       |
| args      | The parameters of the response processing callback, which are passed in by the send of use hooks | any[]                | -       |
| status    | Response status, success if successful, error if failed                                          | 'success' \| 'error' | -       |
| data      | Response data, with value if successful                                                          | any                  | -       |
| fromCache | Whether the response data comes from the cache, with value if successful                         | boolean              | -       |
| error     | Response error instance, with value when failed                                                  | Error                | -       |

### Return value

`UseHookExposure` contains response data and request-related states, operation functions, and event binding functions. They will automatically infer the responsive data type of the corresponding UI framework based on `statesHook`, which is `Ref` type in vue3, ordinary value in react, and `Writable` type in svelte.

#### Responsive data

| Name            | Description                                                                          | Type               | Version |
| --------------- | ------------------------------------------------------------------------------------ | ------------------ | ------- |
| loading         | Request loading status                                                               | boolean            | -       |
| data            | Response data                                                                        | any                | -       |
| error           | Request error message                                                                | Error \| undefined | -       |
| downloading     | Download progress information                                                        | Object             | -       |
| uploading       | Upload progress information                                                          | Object             | -       |
| \_\_referingObj | Internal reference object, implement useHook compatible with different UI frameworks | Object             | -       |

#### Operation function

| Name           | Description                                                                               | Function parameters               | Return value   | Version |
| -------------- | ----------------------------------------------------------------------------------------- | --------------------------------- | -------------- | ------- |
| send           | Send request function                                                                     | ...args: any[]                    | -              | -       |
| abort          | Interrupt function                                                                        | -                                 | Promise        | -       |
| update         | Function that updates the current use hook front-end state, which is more useful in react | newFrontStates: FrontRequestState | -              |
| \_\_proxyState | Internal function, function to get the state proxy                                        | stateKey: string                  | FrameworkState |

#### Event

| Name       | Description                      | Callback parameter                               | Version |
| ---------- | -------------------------------- | ------------------------------------------------ | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](#alovasuccessevent)   | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](#alovaerrorevent)       | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](#alovacompleteevent) | -       |

## useWatcher

Watches the state and initiates a request after the state changes. It is used in some scenarios where re-requests are required as the data changes, such as paging, data filtering, and fuzzy search.

> Go to [State Change Request](/tutorial/client/strategy/use-watcher) for details.

### Type

```typescript
function useWatcher<AG extends AlovaGenerics>(
  handler: Method | (...args: any[]) => Method<AG>,
  watchingStates: State[],
  config?: WatcherHookConfig
): UseHookExposure<AG>;
```

### Parameters

1. `handler`: Both method instance and function can be passed in. When specified as a function, it can receive the parameters passed in by `send` and is required to return a method instance.

2. `config`: Configuration parameters of hook.

| Name            | Description                                                                                                                                    | Type                                                                                                                              | Default | Version |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| immediate       | Whether to initiate a request immediately                                                                                                      | boolean                                                                                                                           | false    | -       |
| initialData     | Initial data value, before the first response, data value is the initial value, if not set, it is `undefined`                                  | any                                                                                                                               | -       | -       |
| force           | Whether to force the request, can be set to a function to dynamically return a boolean value                                                   | boolean \| (...args: any[]) => boolean \| false                                                                                   |
| managedStates   | Additional management states, can be updated through updateState                                                                               | Record\<string \| number \| symbol, any\>                                                                                         | -       |
| debounce        | Request debounce time (milliseconds). When passing an array, you can set the debounce time separately according to the order of watchingStates | number \| number[]                                                                                                                | -       |
| middleware      | Middleware function, [Learn about alova middleware](/tutorial/client/in-depth/middleware)                                                      | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -       | -       |
| abortLast       | Whether to interrupt the last unresponsive request                                                                                             | boolean                                                                                                                           | true    | -       |
| \_\_referingObj | Internal reference object to implement useHook compatibility with different UI frameworks                                                      | Object                                                                                                                            | -       |

### Return value

`UseHookExposure` contains states, operation functions, and event binding functions related to response data and requests. They will automatically infer the corresponding UI according to statesHook The responsive data type of the framework is Ref type in vue3, ordinary value in react, and Writable type in svelte.

#### Responsive data

| Name           | Description                                    | Type               | Version        |
| -------------- | ---------------------------------------------- | ------------------ | -------------- |
| loading        | Request loading status                         | boolean            | -              |
| data           | Response data                                  | any                | -              |
| error          | Request error message                          | Error \| undefined | -              |
| downloading    | Download progress information                  | Object             | -              |
| uploading      | Upload progress information                    | Object             | -              |
| \_\_proxyState | Internal function, function to get state proxy | stateKey: string   | FrameworkState |

#### Operation function

| Name   | Description                                                                   | Function parameters               | Return value | Version |
| ------ | ----------------------------------------------------------------------------- | --------------------------------- | ------------ | ------- |
| send   | Send request function                                                         | ...args: any[]                    | Promise      | -       |
| abort  | Interrupt function                                                            | -                                 | -            | -       |
| update | Update the current use hook Function of front-end state, more useful in react | newFrontStates: FrontRequestState | -            |

#### Event

| Name       | Description                      | Callback parameter                               | Version |
| ---------- | -------------------------------- | ------------------------------------------------ | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](#alovasuccessevent)   | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](#alovaerrorevent)       | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](#alovacompleteevent) | -       |

## useFetcher

Use `useFetcher` to fetch data, which is useful for preloading data and updating status across modules.

> Go to [Data Fetch](/tutorial/client/strategy/use-fetcher) for details.

### Type

```typescript
function useFetcher(config?: FetcherHookConfig): UseFetchHookExposure;
```

### Parameters

1. `config`: Configuration parameters of hook.

| Name            | Description                                                                                  | Type                                                                                                                                  | Default                              | Version |
| --------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------- |
| force           | Whether to force the request, can be set as a function to dynamically return a boolean value | boolean                                                                                                                               | (...args: any[]) => boolean \| false | -       |
| middleware      | Middleware function, [Learn about alova middleware](/tutorial/client/in-depth/middleware)    | (context: [AlovaFetcherMiddlewareContext](#alovafetchermiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -                                    | -       |
| \_\_referingObj | Internal reference object, implement useHook compatible with different UI frameworks         | Object                                                                                                                                | -                                    |

#### AlovaFetcherMiddlewareContext

| Name           | Description                                                                                                                                                                             | Type                                                               | Version |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| method         | The method object of the current request                                                                                                                                                | Method                                                             | -       |
| cachedResponse | Hit cache data                                                                                                                                                                          | any                                                                | -       |
| config         | Current use hook configuration                                                                                                                                                          | Record\<string, any\>                                              | -       |
| srgs           | Response processing callback parameters, which are passed in by useFetcher's fetch                                                                                                      | any[]                                                              | -       |
| proxyStates    | Use hook preload state proxy collection, such as loading, error, etc.                                                                                                                   | [FetchRequestState](#fetchrequeststate)                            | -       |
| fetch          | Data preload function                                                                                                                                                                   | (method: Method, ...args: any[]) => void                           | Promise |
| abort          | Interrupt function                                                                                                                                                                      | () => void                                                         | -       |
| update         | Function that updates the current use hook preload state, which is more useful in react                                                                                                 | (newFrontStates: [FetchRequestState](#fetchrequeststate)) => void; | -       |
| controlLoading | After calling, the loading state will be customized, and the loading state change will no longer be triggered internally. The control passed in is When false, control will be canceled | (control?: boolean) => void                                        | -       |

#### FetchRequestState

The following property values ​​will automatically infer the responsive data type of the corresponding UI framework based on `statesHook`, which is `Ref` type in vue3, normal value in react, and `Writable` type in svelte

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| loading     | Preload request status        | boolean            | -       |
| error       | Request error message         | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

### Return value

`UseFetchHookReturnType` contains request-related states, operation functions, and event binding functions, which will automatically infer the responsive data type of the corresponding UI framework based on statesHook, which is Ref in vue3 Type, a normal value in react, and a Writable type in svelte.

#### Responsive data

| Name            | Description                                                                          | Type               | Version |
| --------------- | ------------------------------------------------------------------------------------ | ------------------ | ------- |
| fetching        | Preload request status                                                               | boolean            | -       |
| error           | Request error message                                                                | Error \| undefined | -       |
| downloading     | Download progress information                                                        | Object             | -       |
| uploading       | Upload progress information                                                          | Object             | -       |
| \_\_referingObj | Internal reference object, implement useHook compatible with different UI frameworks | Object             | -       |

#### Operation function

| Name           | Description                                                                            | Function parameters                                        | Return value   | Version |
| -------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------- | ------- |
| fetch          | Data preloading function                                                               | 1. method: preloaded Method instance<br/>2. ...args: any[] | Promise        | -       |
| abort          | Interrupt function                                                                     | -                                                          | -              | -       |
| update         | Function to update the current use hook front-end state, which is more useful in react | newFrontStates: FrontRequestState                          | -              |
| \_\_proxyState | Internal function, function to get state proxy                                         | stateKey: string                                           | FrameworkState |

#### Event

| Name       | Description                      | Callback parameter                               | Version |
| ---------- | -------------------------------- | ------------------------------------------------ | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](#alovacompleteevent)  | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](#alovacompleteevent)    | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](#alovacompleteevent) | -       |
