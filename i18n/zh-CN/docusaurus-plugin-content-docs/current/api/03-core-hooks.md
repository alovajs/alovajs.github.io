---
title: 核心useHooks
---

## useRequest

表示一次请求的发送，执行 useRequest 时默认会发送一次请求，并创建和维护状态化的请求相关数据，如`loading/data/error`等。在页面获取初始数据时是最常用的方法，同时也支持关闭它的默认的请求发送，这在提交数据等通过点击事件触发的请求场景非常有用。

> 前往[useRequest](/tutorial/client/strategy/use-request)查看详情。

### 类型

```ts
function useRequest(
  methodHandler: Method | (...args: any[]) => Method<S, E, R, T, RC, RE, RH>,
  config?: RequestHookConfig
): UseHookReturnType;
```

### 参数

1. `methodHandler`: 可传入 method 实例和函数两种形式，当指定为函数时的可接收`send`传入的参数，并要求返回一个 method 实例。
2. `config`: hook 的配置参数。

| 名称          | 描述                                                                  | 类型                                                                                                                              | 默认值 | 版本 |
| ------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| immediate     | 是否立即发起请求                                                      | boolean                                                                                                                           | true   | -    |
| initialData   | 初始的 data 值，在首次响应前 data 值为初始值，未设置时为`undefined`   | any                                                                                                                               | -      | -    |
| force         | 是否强制请求，可设置为函数动态返回 boolean 值                         | boolean \| (...args: any[]) => boolean \| false                                                                                   | -      | -    |
| managedStates | 额外的监管状态，可通过 updateState 更新                               | Record\<string \|number \| symbol, any\>                                                                                          | -      | -    |
| middleware    | 中间件函数，[了解 alova 中间件](/tutorial/client/in-depth/middleware) | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -      | -    |

#### AlovaFrontMiddlewareContext

| 名称             | 描述                                                                                                 | 类型                                                                                                                                                                                                         | 版本    |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| method           | 当前请求的 method 对象                                                                               | Method                                                                                                                                                                                                       | -       |
| cachedResponse   | 命中的缓存数据                                                                                       | any                                                                                                                                                                                                          | -       |
| config           | 当前的 use hook 配置                                                                                 | Record\<string, any\>                                                                                                                                                                                        | -       |
| sendArgs         | 响应处理回调的参数，该参数由 use hooks 的 send 传入                                                  | any[]                                                                                                                                                                                                        | -       |
| frontStates      | use hook 前端状态集合，如 data、loading、error 等                                                    | [FrontRequestState](#frontrequeststate)                                                                                                                                                                      | -       |
| send             | 发送请求函数                                                                                         | (...args: any[]) => void                                                                                                                                                                                     | Promise |
| abort            | 中断函数                                                                                             | () => void                                                                                                                                                                                                   | -       |
| decorateSuccess  | 装饰成功回调函数                                                                                     | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](#alovasuccessevent), <br/>index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | 装饰失败回调函数                                                                                     | (decorator: (<br/>handler: (event: [AlovaErrorEvent](#alovaerrorevent)) => void, <br/>event: [AlovaErrorEvent](#alovaerrorevent), <br/>index: number, <br/>length: number<br/>) => void) => void             | -       |
| decorateComplete | 装饰完成回调函数                                                                                     | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent), <br/>index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | 更新当前 use hook 前端状态的函数，在 react 中较有用                                                  | (newFrontStates: [FrontRequestState](#frontrequeststate)) => void;                                                                                                                                           | -       |
| controlLoading   | 将自定义控制 loading 的状态，调用内部不再触发 loading 状态的变更，传入 control 为 false 时将取消控制 | (control?: boolean) => void                                                                                                                                                                                  | -       |

#### AlovaGuardNext

```typescript
type AlovaGuardNext = (guardNextConfig?: {
  force?: boolean | (...args: any[]) => boolean;
  method?: Method;
}): Promise;
```

#### FrontRequestState

以下属性值将会根据`statesHook`自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为`Ref`类型，在 react 中为普通值，在 svelte 中为`Writable`类型

| 名称        | 描述         | 类型               | 版本 |
| ----------- | ------------ | ------------------ | ---- |
| loading     | 请求加载状态 | boolean            | -    |
| data        | 响应数据     | any                | -    |
| error       | 请求错误信息 | Error \| undefined | -    |
| downloading | 下载进度信息 | Object             | -    |
| uploading   | 上传进度信息 | Object             | -    |

#### AlovaSuccessEvent

| 名称      | 描述                                                | 类型    | 版本 |
| --------- | --------------------------------------------------- | ------- | ---- |
| method    | 当前请求的 method 对象                              | Method  | -    |
| sendArgs  | 响应处理回调的参数，该参数由 use hooks 的 send 传入 | any[]   | -    |
| data      | 响应数据                                            | any     | -    |
| fromCache | 响应数据是否来自缓存                                | boolean | -    |

#### AlovaErrorEvent

| 名称     | 描述                                                | 类型   | 版本 |
| -------- | --------------------------------------------------- | ------ | ---- |
| method   | 当前请求的 method 对象                              | Method | -    |
| sendArgs | 响应处理回调的参数，该参数由 use hooks 的 send 传入 | any[]  | -    |
| error    | 响应错误实例                                        | Error  | -    |

#### AlovaCompleteEvent

| 名称      | 描述                                                | 类型                 | 版本 |
| --------- | --------------------------------------------------- | -------------------- | ---- |
| method    | 当前请求的 method 对象                              | Method               | -    |
| sendArgs  | 响应处理回调的参数，该参数由 use hooks 的 send 传入 | any[]                | -    |
| status    | 响应状态，成功时为 success，失败时为 error          | 'success' \| 'error' | -    |
| data      | 响应数据，成功时有值                                | any                  | -    |
| fromCache | 响应数据是否来自缓存，成功时有值                    | boolean              | -    |
| error     | 响应错误实例，失败时有值                            | Error                | -    |

### 返回值

`UseHookReturnType`包含响应数据和请求相关的状态、操作函数和事件绑定函数，它们会根据`statesHook`自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为`Ref`类型，在 react 中为普通值，在 svelte 中为`Writable`类型。

#### 响应式数据

| 名称        | 描述         | 类型               | 版本 |
| ----------- | ------------ | ------------------ | ---- |
| loading     | 请求加载状态 | boolean            | -    |
| data        | 响应数据     | any                | -    |
| error       | 请求错误信息 | Error \| undefined | -    |
| downloading | 下载进度信息 | Object             | -    |
| uploading   | 上传进度信息 | Object             | -    |

#### 操作函数

| 名称   | 描述                                                | 函数参数                                                | 返回值  | 版本 |
| ------ | --------------------------------------------------- | ------------------------------------------------------- | ------- | ---- |
| send   | 发送请求函数                                        | ...args: any[]                                          | -       | -    |
| abort  | 中断函数                                            | -                                                       | Promise | -    |
| update | 更新当前 use hook 前端状态的函数，在 react 中较有用 | newFrontStates: [FrontRequestState](#frontrequeststate) | -       |

#### 事件

| 名称       | 描述             | 回调参数                                         | 版本 |
| ---------- | ---------------- | ------------------------------------------------ | ---- |
| onSuccess  | 请求成功事件绑定 | event: [AlovaSuccessEvent](#alovasuccessevent)   | -    |
| onError    | 请求错误事件绑定 | event: [AlovaErrorEvent](#alovaerrorevent)       | -    |
| onComplete | 请求完成事件绑定 | event: [AlovaCompleteEvent](#alovacompleteevent) | -    |

## useWatcher

监听状态，并在状态变化后发起请求，在一些需要随数据变化而重新请求的场景下，如分页、数据筛选、模糊搜索使用。

> 前往[状态变化请求](/tutorial/client/strategy/use-watcher)查看详情。

### 类型

```typescript
function useWatcher(
  handler: Method | (...args: any[]) => Method<S, E, R, T, RC, RE, RH>,
  watchingStates: State[],
  config?: WatcherHookConfig
): UseHookReturnType;
```

### 参数

1. `handler`: 可传入 method 实例和函数两种形式，当指定为函数时的可接收`send`传入的参数，并要求返回一个 method 实例。
2. `config`: hook 的配置参数。

| 名称          | 描述                                                                       | 类型                                                                                                                              | 默认值     | 版本 |
| ------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---- |
| immediate     | 是否立即发起请求                                                           | boolean                                                                                                                           | true       | -    |
| initialData   | 初始的 data 值，在首次响应前 data 值为初始值，未设置时为`undefined`        | any                                                                                                                               | -          | -    |
| force         | 是否强制请求，可设置为函数动态返回 boolean 值                              | boolean \| (...args: any[]) => boolean \| false                                                                                   |
| managedStates | 额外的监管状态，可通过 updateState 更新                                    | Record\<string \| number \| symbol, any\>                                                                                         | -          |
| debounce      | 请求防抖时间（毫秒），传入数组时可按 watchingStates 的顺序单独设置防抖时间 | number \| number[]                                                                                                                | -          |
| middleware    | 中间件函数，[了解 alova 中间件](/tutorial/client/in-depth/middleware)      | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -          | -    |
| sendable      | 监听的状态改变时是否发送请求                                               | (methodInstance: AlovaEvent) => boolean                                                                                           | () => true | -    |
| abortLast     | 是否中断上一次的未响应请求                                                 | boolean                                                                                                                           | true       | -    |

### 返回值

`UseHookReturnType`包含响应数据和请求相关的状态、操作函数和事件绑定函数，它们会根据 statesHook 自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为 Ref 类型，在 react 中为普通值，在 svelte 中为 Writable 类型。

#### 响应式数据

| 名称        | 描述         | 类型               | 版本 |
| ----------- | ------------ | ------------------ | ---- |
| loading     | 请求加载状态 | boolean            | -    |
| data        | 响应数据     | any                | -    |
| error       | 请求错误信息 | Error \| undefined | -    |
| downloading | 下载进度信息 | Object             | -    |
| uploading   | 上传进度信息 | Object             | -    |

#### 操作函数

| 名称   | 描述                                                | 函数参数                                                | 返回值  | 版本 |
| ------ | --------------------------------------------------- | ------------------------------------------------------- | ------- | ---- |
| send   | 发送请求函数                                        | ...args: any[]                                          | Promise | -    |
| abort  | 中断函数                                            | -                                                       | -       | -    |
| update | 更新当前 use hook 前端状态的函数，在 react 中较有用 | newFrontStates: [FrontRequestState](#frontrequeststate) | -       |

#### 事件

| 名称       | 描述             | 回调参数                                         | 版本 |
| ---------- | ---------------- | ------------------------------------------------ | ---- |
| onSuccess  | 请求成功事件绑定 | event: [AlovaSuccessEvent](#alovasuccessevent)   | -    |
| onError    | 请求错误事件绑定 | event: [AlovaErrorEvent](#alovaerrorevent)       | -    |
| onComplete | 请求完成事件绑定 | event: [AlovaCompleteEvent](#alovacompleteevent) | -    |

## useFetcher

通过`useFetcher`用来拉取数据，在预加载数据和跨模块更新状态时很有用。

> 前往[数据拉取](/tutorial/client/strategy/use-fetcher)查看详情。

### 类型

```typescript
function useFetcher(config?: FetcherHookConfig): UseFetchHookReturnType;
```

### 参数

1. `config`: hook 的配置参数。

| 名称       | 描述                                                                  | 类型                                                                                                                                  | 默认值                               | 版本 |
| ---------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---- |
| force      | 是否强制请求，可设置为函数动态返回 boolean 值                         | boolean                                                                                                                               | (...args: any[]) => boolean \| false | -    |
| middleware | 中间件函数，[了解 alova 中间件](/tutorial/client/in-depth/middleware) | (context: [AlovaFetcherMiddlewareContext](#alovafetchermiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -                                    | -    |

#### AlovaFetcherMiddlewareContext

| 名称             | 描述                                                                                                     | 类型                                                                                                                                                                                                         | 版本    |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| method           | 当前请求的 method 对象                                                                                   | Method                                                                                                                                                                                                       | -       |
| cachedResponse   | 命中的缓存数据                                                                                           | any                                                                                                                                                                                                          | -       |
| config           | 当前的 use hook 配置                                                                                     | Record\<string, any\>                                                                                                                                                                                        | -       |
| fetchArgs        | 响应处理回调的参数，该参数由 useFetcher 的 fetch 传入                                                    | any[]                                                                                                                                                                                                        | -       |
| fetchStates      | use hook 预加载状态集合，如 fetching、error 等                                                           | [FetchRequestState](#fetchrequeststate)                                                                                                                                                                      | -       |
| fetch            | 数据预加载函数                                                                                           | (method: Method, ...args: any[]) => void                                                                                                                                                                     | Promise |
| abort            | 中断函数                                                                                                 | () => void                                                                                                                                                                                                   | -       |
| decorateSuccess  | 装饰成功回调函数                                                                                         | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](#alovasuccessevent), <br/>index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | 装饰失败回调函数                                                                                         | (decorator: (<br/>handler: (event: [AlovaErrorEvent](#alovaerrorevent)) => void, <br/>event: [AlovaErrorEvent](#alovaerrorevent), <br/>index: number, <br/>length: number<br/>) => void) => void             | -       |
| decorateComplete | 装饰完成回调函数                                                                                         | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent), <br/>index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | 更新当前 use hook 预加载状态的函数，在 react 中较有用                                                    | (newFrontStates: [FetchRequestState](#fetchrequeststate)) => void;                                                                                                                                           | -       |
| controlFetching  | 调用后将自定义控制 fetching 的状态，内部不再触发 fetching 状态的变更，传入 control 为 false 时将取消控制 | (control?: boolean) => void                                                                                                                                                                                  | -       |

#### FetchRequestState

以下属性值将会根据`statesHook`自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为`Ref`类型，在 react 中为普通值，在 svelte 中为`Writable`类型

| 名称        | 描述           | 类型               | 版本 |
| ----------- | -------------- | ------------------ | ---- |
| fetching    | 预加载请求状态 | boolean            | -    |
| error       | 请求错误信息   | Error \| undefined | -    |
| downloading | 下载进度信息   | Object             | -    |
| uploading   | 上传进度信息   | Object             | -    |

### 返回值

`UseFetchHookReturnType`包含请求相关的状态、操作函数和事件绑定函数，它们会根据 statesHook 自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为 Ref 类型，在 react 中为普通值，在 svelte 中为 Writable 类型。

#### 响应式数据

| 名称        | 描述           | 类型               | 版本 |
| ----------- | -------------- | ------------------ | ---- |
| fetching    | 预加载请求状态 | boolean            | -    |
| error       | 请求错误信息   | Error \| undefined | -    |
| downloading | 下载进度信息   | Object             | -    |
| uploading   | 上传进度信息   | Object             | -    |

#### 操作函数

| 名称   | 描述                                                | 函数参数                                                | 返回值  | 版本 |
| ------ | --------------------------------------------------- | ------------------------------------------------------- | ------- | ---- |
| fetch  | 数据预加载函数                                      | 1. method: 预加载的 Method 实例<br/>2. ...args: any[]   | Promise | -    |
| abort  | 中断函数                                            | -                                                       | -       | -    |
| update | 更新当前 use hook 前端状态的函数，在 react 中较有用 | newFrontStates: [FrontRequestState](#frontrequeststate) | -       |

#### 事件

| 名称       | 描述             | 回调参数                                                                                                         | 版本 |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- | ---- |
| onSuccess  | 请求成功事件绑定 | event: [AlovaSuccessEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovasuccessevent)   | -    |
| onError    | 请求错误事件绑定 | event: [AlovaErrorEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovaerrorevent)       | -    |
| onComplete | 请求完成事件绑定 | event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent) | -    |
