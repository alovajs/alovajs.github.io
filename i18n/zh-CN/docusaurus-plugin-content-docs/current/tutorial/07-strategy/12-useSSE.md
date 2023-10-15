---
title: Server-send events发送请求
sidebar_position: 120
---

:::caution

此策略暂未实现，以下为设计文档

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

通过 Server-sent Events(SSE)请求，内部使用`EventSource`实现。

## useSSE 的全部参数一览

```javascript
const {
  readyState, // 响应式的状态，0 — connecting、1 — open、2 — closed
  eventSource, // eventSource实例
  onMessage, // 对应实例的onmessage事件
  onError, // 对应实例的onerror事件
  onOpen, // 对应实例的onopen事件
  on, // 对应实例的onmessage的addEventListener
  off // 对应实例的onmessage的removeEventListener
} = useSSE(() => method(), {
  withCredentials: true, // 会传给new EventSource
  interceptByGlobalResponded: true // 是否经过alova实例的responded拦截
});
```
