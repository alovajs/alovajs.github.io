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

```javascript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const {
  // 接收的数据，每次接收将会修改data
  data,

  // 当前的EventSource实例
  eventSource,

  // 连接状态，0-connecting，1-open，2-closed
  readyState,

  // 绑定连接事件
  onOpen

  // 绑定消息接收
  onMessage,

  // 绑定错误事件
  onError,

  // 绑定自定义事件
  on,

  // 连接并发送消息
  send,

  // 关闭连接
  close,

  // 原始的EventSource实例
  eventSource
} = useSSE(method, {
  withCredentials: true, // 将会传给EventSource
  initialData: 'initial-data' // 初始时 data 中的数据
});
```

## 发送请求

默认情况下不会发送请求，你需要调用`send`来发送请求，也可以设置`immediate = true`立即发送请求。

```javascript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  // highlight-start
  immediate: true
  // highlight-end
});
```

`useSSE` 目前只能连接到一个源。也就是说，当试图连接多个目标时，上一个连接总会被断开。

```javascript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method);

send('value1');
// highlight-start
send('value2'); // 这会断开上一个连接
send('value3'); // 这也会断开上一个连接
// highlight-end
```

## 接收数据

当接收到数据时会自动将数据赋值给状态`data`，你可以直接在视图上绑定它，或者监听它进行一些操作。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div>
    <span v-if="readyState === 0">连接中</span>
    <span v-else-if="readyState === 1">已连接</span>
    <span v-else-if="readyState === 2">已断开</span>
  </div>
  <div>最后接收的数据：{{data}}</div>
  <ul>
    <li
      v-for="item in dataList"
      :key="item">
      {{item}}
    </li>
  </ul>
  <button @click="send">连接</button>
  <button @click="close">关闭</button>
</template>

<script setup>
  import { ref } from 'vue';

  const { data, readyState, onMessage, close, send } = useSSE(method);
  const dataList = ref([]);
  onMessage(({ data }) => {
    dataList.value.push(data);
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useEffect, useState } from 'react';

const App = () => {
  const [dataList, setDataList] = useState([]);
  const { data, readyState, onMessage, onError, close, send } = useSSE(method);

  onMessage(({ data }) => {
    setDataList(prevList => [...prevList, data]);
  });
  return (
    <div>
      <span>{readyState === 0 ? '连接中' : readyState === 1 ? '已连接' : '已断开'}</span>
      <div>最后接收的数据：{data}</div>
      <ul>
        {dataList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={send}>连接</button>
      <button onClick={close}>关闭</button>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  let dataList = [];
  const { data, readyState, onMessage, close, send } = useSSE(method);

  onMessage(({ data: newData }) => {
    dataList.push(newData);
    data = newData;
  });
</script>

<div>
  <span>{readyState === 0 ? '连接中' : readyState === 1 ? '已连接' : '已断开'}</span>
  <div>最后接收的数据：{data}</div>
  <ul>
    {#each dataList as item}
    <li>{item}</li>
    {/each}
  </ul>
  <button on:click="{send}">连接</button>
  <button on:click="{close}">关闭</button>
</div>
```

</TabItem>
<TabItem value="4" label="solid">

```jsx
import { createSignal } from 'solid-js';

const App = () => {
  const [dataList, setDataList] = createSignal([]);
  const { data, readyState, onMessage, onError, close, send } = useSSE(method);

  onMessage(({ data }) => {
    setDataList(prevList => [...prevList, data]);
  });
  return (
    <div>
      <span>{readyState() === 0 ? '连接中' : readyState() === 1 ? '已连接' : '已断开'}</span>
      <div>最后接收的数据：{data()}</div>
      <ul>
        <For each={dataList()}>{item => <li key={item}>{item}</li>}</For>
      </ul>
      <button onClick={send}>连接</button>
      <button onClick={close}>关闭</button>
    </div>
  );
};
```

</TabItem>
</Tabs>

### 绑定事件

`useSSE`提供了一系列的绑定事件方法，绑定时将返回解绑函数。

```javascript
const { onMessage, onError, close } = useSSE(method);

// 对应 eventsource 的 message 事件
const offMessage = onMessage(event => {
  console.log(event.eventSource); // 当前的EventSource实例
  console.log(event.data);
});

const offError = onError(event => {
  console.log(event.eventSource); // 当前的EventSource实例
  console.error('sse error', event.error);
  close();
});

// 解绑事件
offMessage();
offError();
```

除此以外，你还可以监听自定义的 EventSource 事件，它将调用 EventSource 的`addEventListener`绑定。

```javascript
const { on } = useSSE(method);

// 以下代码将监听具有字段 `event: update` 的事件
const offUpdate = on('update', event => {
  console.log(event.eventSource); // 当前的EventSource实例
  console.log(event.data);
});
```

### 全局响应拦截

默认情况下，响应数据受到[全局响应拦截器的捕获](/tutorial/getting-started/basic/global-interceptor)。如果这不是你预期的行为，可以手动关闭。

```javascript
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
   * @param args 请求参数，会传递给 method
   */
  send: (...args: any[]) => Promise<void>;
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
