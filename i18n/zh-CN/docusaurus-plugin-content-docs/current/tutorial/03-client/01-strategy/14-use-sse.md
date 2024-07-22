---
title: Server-sent events发送请求
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

通过 Server-sent Events(SSE)请求，内部使用`EventSource`实现。

## 特性

- 更加简洁易用的使用方式；
- 自动管理连接；

## 用法

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```typescript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  initialData: 'initial-data' // 初始时 data 中的数据
});

// connect
send('value');

console.log(data.value); // data 在接收到事件后更新，默认是 initialData

// 对应 eventsource 的 message 事件
const unbindMessage = onMessage(({ data }) => {
  console.log(data);
});

const unbindError = onError(({ error }) => {
  console.error('sse error', error);
  close();
});

// 在需要的时候解绑
unbindMessage();
unbindError();
```

</TabItem>
<TabItem value="2" label="react">

```typescript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  initialData: 'initial-data' // 初始时 data 中的数据
});

// connect
send('value');

console.log(data); // data 在接收到事件后更新，默认是 initialData

// 对应 eventsource 的 message 事件
const unbindMessage = onMessage(({ data }) => {
  console.log(data);
});

const unbindError = onError(({ error }) => {
  console.error('sse error', error);
  close();
});

// 在需要的时候解绑
unbindMessage();
unbindError();
```

</TabItem>
<TabItem value="3" label="svelte">

```typescript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  initialData: 'initial-data' // 初始时 data 中的数据
});

// connect
send('value');

console.log(data); // data 在接收到事件后更新，默认是 initialData

// 对应 eventsource 的 message 事件
const unbindMessage = onMessage(({ data }) => {
  console.log(data);
});

const unbindError = onError(({ error }) => {
  console.error('sse error', error);
  close();
});

// 在需要的时候解绑
unbindMessage();
unbindError();
```

</TabItem>
</Tabs>

:::warning

`useSSE` 目前只能连接到一个源。也就是说，当试图连接多个目标时，上一个连接总会被断开。

:::

```typescript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method);

send('value1');
// highlight-start
send('value2'); // 这会断开上一个连接
send('value3'); // 这也会断开上一个连接
// highlight-end
```

默认情况下，不会发送请求。当然，通过设置`immediate = true`，可以省去手动 send 的一步。

```typescript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  // highlight-start
  immediate: true
  // highlight-end
});

// codes here...
```

### 绑定自定义事件

```typescript
const { data, readyState, onMessage, on } = useSSE(method);

on('event-name', ({ data }) => {
  console.log(data);
});
```

### 全局响应拦截

默认情况下，响应数据受到[全局响应拦截器的捕获](/tutorial/getting-started/basic/global-interceptor)。如果这不是你预期的行为，可以手动关闭。

```typescript
const { data, readyState, onMessage, on } = useSSE(method, {
  // highlight-start
  interceptByGlobalResponded: false // 现在数据不会被响应拦截
  // highlight-end
});
```

## 类型声明

```typescript
const enum SSEHookReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2
};

type SSEHookConfig = {
  /**
   * 会传给new EventSource
   */
  withCredentials?: boolean;

  /**
   * 是否经过alova实例的responded拦截
   * @default true
   */
  interceptByGlobalResponded?: boolean;

  /**
   * 初始数据
   */
  initialData?: any;

  /**
   * 是否立即发起请求
   * @default false
   */
  immediate?: boolean;
};

type SSEReturnType<S, Data> = {
  readyState: ExportedType<SSEHookReadyState, S>;
  data: ExportedType<Data | undefined, S>;
  eventSource: ExportedType<EventSource | undefined, S>;
  /**
   * 手动发起请求。在使用 `immediate: true` 时该方法会自动触发
   * @param sendArgs 请求参数，会传递给 method
   */
  send: (...sendArgs: any[]) => Promise<void>;
  /**
   * 关闭连接
   */
  close: () => void;
  /**
   * 注册 EventSource open 的回调函数
   * @param callback 回调函数
   * @returns 取消注册函数
   */
  onOpen(callback: SSEOnOpenTrigger): () => void;

  /**
   * 注册 EventSource message 的回调函数
   * @param callback 回调函数
   * @returns 取消注册函数
   */
  onMessage<T = Data>(callback: SSEOnMessageTrigger<T>): () => void;

  /**
   * 注册 EventSource error 的回调函数
   * @param callback 回调函数
   * @returns 取消注册函数
   */
  onError(callback: SSEOnErrorTrigger): () => void;

  /**
   * @param eventName 事件名称，默认存在 `open` | `error` | `message`
   * @param handler 事件处理器
   */
  on(
    eventName: string,
    handler: (event: AlovaSSEMessageEvent<S, E, R, T, RC, RE, RH>) => void
  ) => () => void;
};
```
