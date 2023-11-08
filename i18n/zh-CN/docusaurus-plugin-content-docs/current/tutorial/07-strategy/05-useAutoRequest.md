---
title: 自动刷新数据
sidebar_position: 50
---

:::warning

此策略暂未实现，以下为设计文档

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

在一定条件下可以自动重新拉取数据，从而刷新页面，使用场景有：

1. 浏览器 tab 切换时拉取最新数据
2. 浏览器聚焦时拉取最新数据
3. 网络重连时拉取最新数据
4. 轮询请求

可同时配置以上的一个或多个触发条件，也可以配置节流时间来防止短时间内触发多次请求，例如 1 秒内只允许触发一次。

## useAutoRequest 的全部参数一览

```javascript
const { loading, data, error, onSuccess, onError, onComplete } = useAutoRequest(() => method(), {
  enablePolling: 2000, // 开启轮询，每2000毫秒轮询一次，默认不开启
  enableVisibility: true, // 浏览器显示隐藏，默认不开启
  enableFocus: true, // 浏览器聚焦，默认不开启
  enableNetwork: true // 开启网络重连，默认不开启
  throttle: 1000, // 节流时间，在1000ms内多次触发只会发送1次请求，默认为1000ms
  // 其他参数同useRequest...
});
```

## 自定义监听函数

以上 4 种自动重新拉取数据的方式，都是通过事件监听的方式实现的，为了全局可用且便于管理，在设计时将监听函数挂载到了`useAutoRequest`函数上，在用户每次调用此 hook 时根据开启情况来调用对应的监听函数，并在组件卸载时调用监听函数返回的卸载函数来卸载监听事件。

在默认情况下实现了在浏览器环境下的事件监听，但有可能用户会在其他环境下使用，此时用户可以覆盖监听函数，自定义对应的监听形式，在调用`notify`时就会触发一次数据拉取，但需要注意的是，还有`throttle`属性会限制触发频率，因此`notify`函数内需要做节流功能。

```javascript
// 网络重连自定义函数
useAutoRequest.onNetwork = notify => {
  window.addEventListener('online', notify);
  return () => window.removeEventListener('online', notify);
};

// 轮询自定义函数
useAutoRequest.onPolling = notify => {
  const timer = setInterval(notify, 3000);
  return () => clearInterval(timer);
};

// 轮询自定义函数
useAutoRequest.onVisibility = notify => {
  const handle = () => {
    if (document.visibilityState === 'visible') {
      notify();
    }
  };
  window.addEventListener('visibilitychange', handle);
  return () => window.removeEventListener('visibilitychange', handle);
};

// 网络重连自定义函数
useAutoRequest.onFocus = notify => {
  window.addEventListener('focus', notify);
  return () => window.removeEventListener('focus', notify);
};
```

## 内部实现建议

1. 内部使用`useRequest`实现；
2. 自动拉取数据时，需要强制发起请求，而不能命中缓存；

## 开发指南

开发前请仔细阅读[开发指南](/contributing/developing-guidelines)

开发此 use hook 需要开发以下内容：

1. 在 src/hooks 下编写 useUploader 功能代码
2. useUploader 功能的完整单元测试，建议在 vue 和 react 下测试
3. useUploader 的 typescript 类型声明，需要分别在`packages/scene-react/typings/index.d.ts`、`packages/scene-vue/typings/index.d.ts`、`packages/scene-svelte/typings/index.d.ts`下添加。公共的类型声明可以放在`typings/general.d.ts`中，打包时会将此文件分别复制到子包的`typings`文件夹下，也可以手动运行`npm run cp:files`复制文件夹。
