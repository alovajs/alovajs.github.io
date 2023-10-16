---
title: Server-sent events发送请求
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
  data, // eventSource实例每次响应的数据
  eventSource, // eventSource实例
  onMessage, // 对应实例的onmessage事件
  onError, // 对应实例的onerror事件
  onOpen, // 对应实例的onopen事件
  on // 对应实例的onmessage的addEventListener，它将返回解绑函数
} = useSSE(() => method(), {
  withCredentials: true, // 会传给new EventSource
  interceptByGlobalResponded: true // 是否经过alova实例的responded拦截，默认为true
  initialData: {}, // 初始化数据，在响应前设置到data状态上
});
```

## useSSE 参数的详细格式及解释

### 返回的响应式状态

以下都是响应式的值

```typescript
type readyState = 0 | 1 | 2; // 响应式的状态，0 — connecting、1 — open、2 — closed
type eventSource = EventSource; // eventSource实例，内部需要使用useFlag$包裹，保证在react下每次也能获取到同一个实例
type data = T; // eventSource实例每次响应的数据，其数据类型由method实例上的T决定
```

### 事件绑定函数

每个事件绑定的回调函数都会接收一个事件对象，格式如下

```typescript
// 对应eventSourcee的onopen事件
type onOpen = (handler: (event: AlovaSSEOpenEvent) => void) => void;
interface AlovaSSEErrorEvent {
  method: Method; // alova的method实例
  eventSource: EventSource; // eventSource实例
}

// 对应eventSourcee的onmessage事件，其data为转换后的数据
type onMessage = (handler: (event: AlovaSSEMessageEvent) => void) => void;
interface AlovaSSEMessageEvent extends AlovaSSEErrorEvent {
  data: T; // 每次响应的，经过拦截器转换后的数据
}

// 对应eventSourcee的onerror事件
type onError = (handler: (event: AlovaSSEErrorEvent) => void) => void;
interface AlovaSSEErrorEvent extends AlovaSSEErrorEvent {
  error: Error; // 错误对象
}
```

### 返回的操作函数

```typescript
// 绑定自定义的事件，sse会根据响应数据内的event字段触发对应的自定义事件
// 绑定事件时将返回这个事件的解绑函数，调用即可解绑
type on = (eventName: string, handler: (event: AlovaSSEMessageEvent) => void) => () => void;
```

## 内部实现建议

`EventSource`属于请求层面的内容，但属于多次响应的形式，因此无法通过`alova`的请求适配器支持。所以在开发时建议在`useSSE`中读取 method 实例的请求信息并创建`EventSource`实例来发送请求，这可能会带来一个问题 —— 响应数据无法被 alova 的全局响应钩子和 method 实例的`transformData`钩子拦截，对于这两个拦截器需要在`useSSE`中自行调用，全局响应钩子会被`interceptByGlobalResponded`参数影响，将转换后的数据通过`onMessage`事件通知外部，同时更新到`data`状态中。
