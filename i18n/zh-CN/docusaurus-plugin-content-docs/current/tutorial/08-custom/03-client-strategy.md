---
title: 客户端策略
sidebar_position: 30
---

alova 的客户端策略分为 中间件、拦截器、useHook 三种，当你的项目需要自定义时，你可以参考这个章节。

## 中间件

中间件提供了强大的、几乎能控制一个请求的所有行为的能力，你可以通过它控制请求行为、自定义修改请求状态、错误处理等，详情请前往[请求中间件](/tutorial/advanced/middleware)查看，以下的源码可以告诉你中间件到底能做什么。

- [actionDelegationMiddleware](https://github.com/alovajs/alova/blob/main/packages/client/src/middlewares/actionDelegation.ts) 通过中间件中实现了跨组件触发请求。
- [useSQRequest](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/silent/useSQRequest.ts) 在中间件中实现立即响应请求，无需等待。
- [useSerialRequest](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/serial/useSerialRequest.ts) 在中间件中串行请求并管理多个请求的响应数据。
- [useRetriableRequest](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/useRetriableRequest.ts) 在中间件中重试失败的请求。
- [延迟更新 loading](/tutorial/best-practice/middleware)示例。

## 拦截器

拦截器控制全局的请求前后行为，我们可以包装全局拦截器实现特定功能的拦截器。

以下是一个示例，它在特定条件下中断所有进行中的请求。

```js
const methodsAborter = (handler, detector) => {
  let requestingMethods = [];
  // 返回请求前拦截器
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
      .catch(() => {}); // 防止抛出错误
    handler(method);
  };
};

createAlova({
  beforeRequest: methodsAborter(
    method => {
      // 原请求前钩子
    },
    () => {
      // 中断请求判断条件
      return false;
    }
  )
});
```

一个更复杂的示例，[token 认证拦截器](https://github.com/alovajs/alova/blob/main/packages/client/src/functions/tokenAuthentication/createTokenAuthentication.ts)

## useHook

useHook 是 alova 最常用的请求策略，而且它是跨 UI 框架的，当你为特定 UI 框架编写 useHook 时和普通的 useHook 一样编写即可，这里我们主要了解编写跨 UI 框架的 useHook 编写。

我们创新性地使用了**状态代理**来抹平 UI 框架状态的差异性，它的用法类似 Vue 的 ref 值，只需要通过简单的访问 v 属性，或对 v 属性赋值，不再需要关心 UI 框架的差异性。

为了抹平状态代理的差异性，我们提供了`statesHookHelper`函数来创建辅助函数，通过这些辅助函数来实现跨 UI 框架的 useHook。

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

接下来让我们来详细了解他们。

### 创建状态

使用`create`创建 UI 框架无关状态代理 FrameworkState，以 loading 状态为例。

```js
// 参数1：为初始值
// 参数2：导出key
const loading = create(false, 'loading');

// 获取原始值
const dehydratedLoading = loading.v;
// 更新状态值
loading.v = true;
// 获取导出值，内部调用`statesHook.export`导出值
const exportedLoading = loading.e;
// 获取通过statesHook.create创建的，平台相关的状态值
const platformedState = loading.s;
```

### 创建计算属性

使用`computed`创建 UI 框架无关的计算属性，为了兼容 react，需要传入计算属性依赖项，它可以是平台相关的状态值和 FrameworkState。

```js
// 参数1：计算属性的函数
// 参数2：计算属性依赖项
// 参数3：导出key
const computedState = computed(() => !loading.v, [loading], 'states');

// 获取原始值
const dehydratedComputedState = computedState.v;
// 获取导出值，内部调用`statesHook.export`导出值
const exportedComputedState = computedState.e;
// 获取通过statesHook.computed创建的，平台相关的状态值
const platformedComputedState = computedState.s;
```

### 创建引用值

它主要用于跨越 react 的闭包陷阱，内部调用`useRef`，其他框架直接返回`{ current: value }`对象，，通过`unifiedValue.current`访问和更新。

```js
const unifiedValue = ref({});
```

### 组件挂载钩子

```js
onMounted(() => {});
```

### 组件卸载钩子

```js
onUnmount(() => {});
```

### 监听状态变化

```js
// 参数1：监听项，用于兼容react，可传平台相关的状态值和FrameworkState
// 参数2：回调函数
watch([loading, computedState.e], () => {});
```

### 状态对象化

将 UI 框架无关的状态代理数组转换为状态对象，一般配合`exposeProvider`使用，以 key 为键，第二个参数还可以指定对象的取值。

```js
const states = objectify([loading, data, error]);
/* states的值为
{
  loading: loading,
  data: data,
  error: error
}
*/

const states = objectify([loading, data, error], 's');
/* states的值为
{
  loading: loading.s,
  data: data.s,
  error: error.s
}
*/
```

### 暴露内部数据

如果直接导出 useHook 的内部信息，将变得无法使用，因此提供了`exposeProvider`来导出，它会自动帮我们处理以下内容：

1. 将状态代理自动转换为对应 UI 框架的状态。
2. 提供一个统一的 update 函数，如果传入参数中包含了 useRequest 返回的 states 和 update 函数，也会自动兼容这些。
3. 在 react 中，非 on 开头的函数使用 memorize 包裹，已包裹的不再包裹。
4. on 开头的视为事件绑定函数，会直接添加到导出对象中。
5. 导出统一的 referingObject。

以下是一个`usePagination`的导出示例：

```js
export const usePagination = (/* ... */) => {
  return exposeProvider({
    // 当前useHook中useWatcher的返回对象
    ...useWatcherReturns,

    // 状态数组转对象
    ...objectify([page, pageSize, data, pageCount, total, isLastPage]),

    // 操作函数
    reset: () => {
      // ...
    },

    // 事件绑定函数
    onFetchSuccess: fetchState.onSuccess
    // ...
  });
};
```

### `__referingObj` 说明

`__referingObj`是为了兼容 options style 和 class style 的 UI 框架，它是一个普通的引用对象，用来同步 options 和 class style 的组件对象，从而让 statesHook 内可以访问到对应组件对象。自定义 useHook 内需要使用同一个 referingObj 对象，这样才能保证一个 useHook 内的 states 可以访问到同一个组件对象。
`__referingObj` 会在 `statesHookHelper` 中创建并返回，也不需要具体处理，只需要按以下方式导出即可。

当 scene hook 内使用了 alova 核心 hook 时，将这个对象传入 hook 内，同时保证在这个 useHook 导出。

> 如果不传入 referingObj，则核心 hook 会自动在内部创建

```js

export const useXXX = (...) => {
  const {
    __referingObj,
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

当 scene hook 内没有使用 alova 核心 hook 时，直接在这个 useHook 导出 referingObj 对象。

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

当你使用`exposeProvider`导出信息时，它将自动导出`__referingObj`，而不需要我们手动处理。
