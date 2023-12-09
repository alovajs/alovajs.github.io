---
title: 共享请求
sidebar_position: 20
---

我们总会遇到这种情况，当一个请求发出但还未响应时，又发起了相同请求，就造成了请求浪费，或者重复提交问题，例如以下三种场景：

1. 一个组件在创建时会获取初始化数据，当一个页面同时渲染多个此组件时，将会同时发出多次相同请求；
2. 提交按钮未被禁用，用户点击了多次提交按钮；
3. 当预加载还未完成时进入了预加载页面，将会发起多次相同请求；
4. 在 react 的 StrictMode 下防止重复发送请求；

**共享请求就是用来解决这些问题的！**它不仅可以提升应用流畅性，还能降低服务端压力。

## 全局关闭共享请求

在大部分情况下，你应该需要共享请求，因此它默认是开启的，但如果你遇到了特殊情况，希望全局关闭它，可以这样做：

```javascript
const alovaInst = createAlova({
  // ...
  // highlight-start
  shareRequest: false
  // highlight-end
});
```

## 局部关闭共享请求

如果你希望在特定请求上关闭共享请求，可以这样做：

```javascript
alovaInst.Get('/todo', {
  // ...
  // highlight-start
  // 只关闭这个请求的共享请求
  shareRequest: false
  // highlight-end
});
```

:::warning 注意事项

需要再次注意的是，alova 是通过 method 实例的请求方法、请求 url、请求头、url 参数、请求体组合作为唯一标识，标识相同即表示为相同请求，而不是对比 method 实例的引用地址。

:::
