---
title: Core useHooks
---

## useRequest

Represents the sending of a request. When executing useRequest, a request will be sent by default, and stateful request-related data will be created and maintained, such as `loading/data/error`, etc. It is the most commonly used method when obtaining initial data on the page. It also supports turning off its default request sending, which is very useful in request scenarios triggered by click events such as submitting data.

> Go to [Send Request](/v2/tutorial/combine-framework/use-request) for details.

### type

```ts
function useRequest(
   methodHandler: Method | (...args: any[]) => Method<S, E, R, T, RC, RE, RH>,
   config?: RequestHookConfig
): UseHookReturnType;
```

### Parameters

1. `methodHandler`: can be passed in two forms: method instance and function. When specified as a function, it can receive parameters passed in by `send` and require a method instance to be returned.
2. `config`: hook configuration parameters.

| Name          | Description                                                                                                                | Type                                                                                                                               | Default | Version |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| immediate     | Whether to initiate the request immediately                                                                                | boolean                                                                                                                            | true    | -       |
| initialData   | The initial data value. The data value is the initial value before the first response. If it is not set, it is `undefined` | any                                                                                                                                | -       | -       |
| force         | Whether to force the request, it can be set to the function to dynamically return a boolean value                          | boolean \| (...args: any[]) => boolean \| false                                                                                    | -       | -       |
| managedStates | Additional managed states, which can be updated via updateState                                                            | Record\<string \|number \| symbol, any\>                                                                                           | -       | -       |
| middleware    | Middleware function, [Understanding alova middleware](/v2/tutorial/advanced/middleware)                                    | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\ > | -       | -       |

#### AlovaFrontMiddlewareContext

| Name             | Description                                                                                                                                                                  | Type                                                                                                                                                                                                          | Version |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| method           | The method object of the current request                                                                                                                                     | Method                                                                                                                                                                                                        | -       |
| cachedResponse   | Hit cached data                                                                                                                                                              | any                                                                                                                                                                                                           | -       |
| config           | Current use hook configuration                                                                                                                                               | Record\<string, any\>                                                                                                                                                                                         | -       |
| sendArgs         | Parameters of the response processing callback, which are passed in by send of use hooks                                                                                     | any[]                                                                                                                                                                                                         | -       |
| frontStates      | use hook front-end state collection, such as data, loading, error, etc.                                                                                                      | [FrontRequestState](#frontrequeststate)                                                                                                                                                                       | -       |
| send             | Send request function                                                                                                                                                        | (...args: any[]) => Promise                                                                                                                                                                                   | -       |
| abort            | abort function                                                                                                                                                               | () => void                                                                                                                                                                                                    | -       |
| decorateSuccess  | Decorate success callback function                                                                                                                                           | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](#alovasuccessevent), <br/ >index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | Decoration failure callback function                                                                                                                                         | (decorator: (<br/>handler: (event: [AlovaErrorEvent](#alovaerrorevent)) => void, <br/>event: [AlovaErrorEvent](#alovaerrorevent), <br/ >index: number, <br/>length: number<br/>) => void) => void             | -       |
| decorateComplete | Decoration completion callback function                                                                                                                                      | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent), <br/ >index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | Function to update the current use hook front-end state, more useful in react                                                                                                | (newFrontStates: [FrontRequestState](#frontrequeststate)) => void;                                                                                                                                            | -       |
| controlLoading   | Customize the loading state of the control. The call will no longer trigger changes in the loading state. When the incoming control is false, the control will be cancelled. | (control?: boolean) => void                                                                                                                                                                                   | -       |

#### AlovaGuardNext

```typescript
type AlovaGuardNext = (guardNextConfig?: {
   force?: boolean | (...args: any[]) => boolean;
   method?: Method;
}): Promise;
```

#### FrontRequestState

The following attribute values will automatically infer the responsive data type of the corresponding UI framework based on `statesHook`, which is the `Ref` type in vue3, the normal value in react, and the `Writable` type in svelte

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| loading     | request loading status        | boolean            | -       |
| data        | response data                 | any                | -       |
| error       | Request error information     | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

#### AlovaSuccessEvent

| Name      | Description                                                                              | Type    | Version |
| --------- | ---------------------------------------------------------------------------------------- | ------- | ------- |
| method    | The method object of the current request                                                 | Method  | -       |
| sendArgs  | Parameters of the response processing callback, which are passed in by send of use hooks | any[]   | -       |
| data      | response data                                                                            | any     | -       |
| fromCache | Whether the response data comes from cache                                               | boolean | -       |

#### AlovaErrorEvent

| Name     | Description                                                                              | Type   | Version |
| -------- | ---------------------------------------------------------------------------------------- | ------ | ------- |
| method   | The method object of the current request                                                 | Method | -       |
| sendArgs | Parameters of the response processing callback, which are passed in by send of use hooks | any[]  | -       |
| error    | Response error instance                                                                  | Error  | -       |

#### AlovaCompleteEvent

| Name      | Description                                                                              | Type                 | Version |
| --------- | ---------------------------------------------------------------------------------------- | -------------------- | ------- |
| method    | The method object of the current request                                                 | Method               | -       |
| sendArgs  | Parameters of the response processing callback, which are passed in by send of use hooks | any[]                | -       |
| status    | Response status, success when successful, error when failure                             | 'success' \| 'error' | -       |
| data      | response data, with value when successful                                                | any                  | -       |
| fromCache | Whether the response data comes from the cache, a value if successful                    | boolean              | -       |
| error     | Response error instance, with value in case of failure                                   | Error                | -       |

### return value

`UseHookReturnType` contains response data and request-related states, operation functions and event binding functions. They will automatically infer the responsive data type of the corresponding UI framework based on `statesHook`, which is the `Ref` type in vue3 and the `Ref` type in react. It is a normal value and is of `Writable` type in svelte.

#### Responsive data

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| loading     | request loading status        | boolean            | -       |
| data        | response data                 | any                | -       |
| error       | Request error information     | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

#### Operation function

| name   | description                                                                   | function parameters                                     | return value | version |
| ------ | ----------------------------------------------------------------------------- | ------------------------------------------------------- | ------------ | ------- |
| send   | Send request function                                                         | ...args: any[]                                          | -            | -       |
| abort  | abort function                                                                | -                                                       | Promise      | -       |
| update | Function to update the current use hook front-end state, more useful in react | newFrontStates: [FrontRequestState](#frontrequeststate) | -            |

#### event

| name       | description                      | callback parameters                              | version |
| ---------- | -------------------------------- | ------------------------------------------------ | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](#alovasuccessevent)   | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](#alovaerrorevent)       | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](#alovacompleteevent) | -       |

## useWatcher

Monitor the status and initiate a request after the status changes. In some scenarios that require re-requesting as the data changes, such as paging, data filtering, and fuzzy search.

> Go to [State Change Request](/v2/tutorial/combine-framework/use-watcher) for details.

### type

```typescript
function useWatcher(
   handler: Method | (...args: any[]) => Method<S, E, R, T, RC, RE, RH>,
   watchingStates: State[],
   config?:WatcherHookConfig
): UseHookReturnType;
```

### Parameters

1. `handler`: can be passed in two forms: method instance and function. When specified as a function, it can receive parameters passed in by `send` and require a method instance to be returned.
2. `config`: hook configuration parameters.

| Name          | Description                                                                                                                                | Type                                                                                                                               | Default    | Version |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| immediate     | Whether to initiate the request immediately                                                                                                | boolean                                                                                                                            | true       | -       |
| initialData   | The initial data value. The data value is the initial value before the first response. If it is not set, it is `undefined`                 | any                                                                                                                                | -          | -       |
| force         | Whether to force the request, it can be set to the function to dynamically return a boolean value                                          | boolean \| (...args: any[]) => boolean \| false                                                                                    |
| managedStates | Additional managed states, which can be updated via updateState                                                                            | Record\<string \| number \| symbol, any\>                                                                                          | -          |
| debounce      | Request debounce time (milliseconds), when passing in the array, you can set the debounce time individually in the order of watchingStates | number \| number[]                                                                                                                 | -          |
| middleware    | Middleware function, [Understanding alova middleware](/v2/tutorial/advanced/middleware)                                                    | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\ > | -          | -       |
| sendable      | Whether to send a request when the monitored state changes                                                                                 | (methodInstance: AlovaEvent) => boolean                                                                                            | () => true | -       |
| abortLast     | Whether to abort the last unresponsive request                                                                                             | boolean                                                                                                                            | true       | -       |

### return value

`UseHookReturnType` contains response data and request-related states, operation functions and event binding functions. They will automatically infer the responsive data type of the corresponding UI framework based on statesHook. It is Ref type in vue3 and ordinary value in react. In svelte it is Writable type.

#### Responsive data

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| loading     | request loading status        | boolean            | -       |
| data        | response data                 | any                | -       |
| error       | Request error information     | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

#### Operation function

| name   | description                                                                   | function parameters                                     | return value | version |
| ------ | ----------------------------------------------------------------------------- | ------------------------------------------------------- | ------------ | ------- |
| send   | Send request function                                                         | ...args: any[]                                          | Promise      | -       |
| abort  | abort function                                                                | -                                                       | -            | -       |
| update | Function to update the current use hook front-end state, more useful in react | newFrontStates: [FrontRequestState](#frontrequeststate) | -            |

#### event

| name       | description                      | callback parameters                              | version |
| ---------- | -------------------------------- | ------------------------------------------------ | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](#alovasuccessevent)   | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](#alovaerrorevent)       | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](#alovacompleteevent) | -       |

## useFetcher

It is used to pull data through `useFetcher`, which is useful when preloading data and updating status across modules.

> Go to [Data Fetching](/v2/tutorial/advanced/use-fetcher) to view details.

### type

```typescript
function useFetcher(config?: FetcherHookConfig): UseFetchHookReturnType;
```

### Parameters

1. `config`: hook configuration parameters.

| Name       | Description                                                                                       | Type                                                                                                                                   | Default                              | Version |
| ---------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------- |
| force      | Whether to force the request, it can be set to the function to dynamically return a boolean value | boolean                                                                                                                                | (...args: any[]) => boolean \| false | -       |
| middleware | Middleware function, [Understand alova middleware](/v2/tutorial/advanced/middleware)              | (context: [AlovaFetcherMiddlewareContext](#alovafetchermiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\ > | -                                    | -       |

#### AlovaFetcherMiddlewareContext

| Name             | Description                                                                                                                                                                                       | Type                                                                                                                                                                                                          | Version |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| method           | The method object of the current request                                                                                                                                                          | Method                                                                                                                                                                                                        | -       |
| cachedResponse   | Hit cached data                                                                                                                                                                                   | any                                                                                                                                                                                                           | -       |
| config           | Current use hook configuration                                                                                                                                                                    | Record\<string, any\>                                                                                                                                                                                         | -       |
| fetchArgs        | Parameters of the response processing callback, which are passed in by fetch of useFetcher                                                                                                        | any[]                                                                                                                                                                                                         | -       |
| fetchStates      | use hook preload state collection, such as fetching, error, etc.                                                                                                                                  | [FetchRequestState](#fetchrequeststate)                                                                                                                                                                       | -       |
| fetch            | Data preloading function                                                                                                                                                                          | (method: Method, ...args: any[]) => Promise                                                                                                                                                                   | -       |
| abort            | abort function                                                                                                                                                                                    | () => void                                                                                                                                                                                                    | -       |
| decorateSuccess  | Decorate success callback function                                                                                                                                                                | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](#alovasuccessevent), <br/ >index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | Decoration failure callback function                                                                                                                                                              | (decorator: (<br/>handler: (event: [AlovaErrorEvent](#alovaerrorevent)) => void, <br/>event: [AlovaErrorEvent](#alovaerrorevent), <br/>index: number, <br/>length: number<br/>) => void) => void              | -       |
| decorateComplete | Decoration completion callback function                                                                                                                                                           | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent), <br/ >index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | Function to update the current use hook preloading state, more useful in react                                                                                                                    | (newFrontStates: [FetchRequestState](#fetchrequeststate)) => void;                                                                                                                                            | -       |
| controlFetching  | After calling, the state of fetching will be customized and the change of fetching state will no longer be triggered internally. When the incoming control is false, the control will be canceled | (control?: boolean) => void                                                                                                                                                                                   | -       |

#### FetchRequestState

The following attribute values will automatically infer the responsive data type of the corresponding UI framework based on `statesHook`, which is the `Ref` type in vue3, the normal value in react, and the `Writable` type in svelte

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| fetching    | preloading request status     | boolean            | -       |
| error       | Request error information     | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

### return value

`UseFetchHookReturnType` contains request-related states, operation functions and event binding functions. They will automatically infer the responsive data type of the corresponding UI framework based on statesHook. It is Ref type in vue3, ordinary value in react, and ordinary value in svelte. For Writable type.

#### Responsive data

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| fetching    | preloading request status     | boolean            | -       |
| error       | Request error information     | Error \| undefined | -       |
| downloading | Download progress information | Object             | -       |
| uploading   | Upload progress information   | Object             | -       |

#### Operation function

| name   | description                                                                   | function parameters                                        | return value | version |
| ------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ | ------- |
| fetch  | Data preloading function                                                      | 1. method: preloaded Method instance<br/>2. ...args: any[] | Promise      | -       |
| abort  | abort function                                                                | -                                                          | -            | -       |
| update | Function to update the current use hook front-end state, more useful in react | newFrontStates: [FrontRequestState](#frontrequeststate)    | -            |

#### event

| name       | description                      | callback parameters                                                                                              | version |
| ---------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovasuccessevent)   | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovaerrorevent)       | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent) | -       |
