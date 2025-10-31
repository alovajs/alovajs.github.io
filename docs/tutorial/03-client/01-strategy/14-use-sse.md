---
title: Server-Sent Events Request
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Strategy Type

use hook

:::

> Before using extension hooks, ensure you are familiar with the basic usage of alova.

## Features

- More concise and user-friendly usage;
- Automatic connection management;

In `[3.3.0+]`, this strategy is implemented using `fetch`, meaning you can specify headers, methods, and all other `fetch`-supported parameters for streaming requests. In earlier versions, it was implemented using `EventSource`.

## Usage

```javascript
import { useSSE } from 'alova/client';

const postMethodHandler = (value: string) => alova.Post('/api/source', null, {
  headers: { 'Content-Type': 'application/json' },
  param: { key: value }
});
const {
  // Received data, updated with each reception
  data,

  // Current EventSource instance
  eventSource,

  // Connection state: 0-connecting, 1-open, 2-closed
  readyState,

  // Bind connection events
  onOpen,

  // Bind message reception
  onMessage,

  // Bind error events
  onError,

  // Bind custom events
  on,

  // Connect and send messages
  send,

  // Close the connection
  close
} = useSSE(postMethodHandler, {
  credentials: 'include',
  initialData: 'initial-data', // Initial data for `data`
  // ...other fetch parameters
});
```

## Sending Requests

By default, requests are not sent automatically. You need to call `send` to initiate the request, or set `immediate = true` to send the request immediately.

```javascript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(
  postMethodHandler,
  {
    // highlight-start
    immediate: true
    // highlight-end
  }
);
```

Each `useSSE` can only create one connection. This means that when attempting to connect to multiple targets, the previous connection will always be disconnected.

```javascript
const { data, eventSource, readyState, onMessage, onError, on, send, close } =
  useSSE(postMethodHandler);

send('value1');
// highlight-start
send('value2'); // This will disconnect the previous connection
send('value3'); // This will also disconnect the previous connection
// highlight-end
```

## Receiving Data

When data is received, it is automatically assigned to the `data` state. You can bind it directly in the view or listen to it for further actions. All listener binding functions support chaining.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div>
    <span v-if="readyState === 0">Connecting</span>
    <span v-else-if="readyState === 1">Connected</span>
    <span v-else-if="readyState === 2">Disconnected</span>
  </div>
  <div>Last received data: {{data}}</div>
  <ul>
    <li
      v-for="item in dataList"
      :key="item">
      {{item}}
    </li>
  </ul>
  <button @click="send">Connect</button>
  <button @click="close">Close</button>
</template>

<script setup>
  import { ref } from 'vue';

  const dataList = ref([]);
  const { data, readyState, close, send } = useSSE(postMethodHandler)
    .onMessage(({ data }) => {
      dataList.value.push(data);
    })
    .onError(error => {
      // ...
    });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useEffect, useState } from 'react';

const App = () => {
  const [dataList, setDataList] = useState([]);
  const { data, readyState, close, send } = useSSE(postMethodHandler)
    .onMessage(({ data }) => {
      setDataList(prevList => [...prevList, data]);
    })
    .onError(error => {
      // ...
    });
  return (
    <div>
      <span>
        {readyState === 0 ? 'Connecting' : readyState === 1 ? 'Connected' : 'Disconnected'}
      </span>
      <div>Last received data: {data}</div>
      <ul>
        {dataList.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={send}>Connect</button>
      <button onClick={close}>Close</button>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  let dataList = [];
  const { data, readyState, close, send } = useSSE(postMethodHandler)
    .onMessage(({ data }) => {
      dataList.push(newData);
      data = newData;
    })
    .onError(error => {
      // ...
    });
</script>

<div>
  <span
    >{readyState === 0 ? 'Connecting' : readyState === 1 ? 'Connected' : 'Disconnected'}</span
  >
  <div>Last received data: {data}</div>
  <ul>
    {#each dataList as item}
    <li>{item}</li>
    {/each}
  </ul>
  <button on:click="{send}">Connect</button>
  <button on:click="{close}">Close</button>
</div>
```

</TabItem>
<TabItem value="4" label="solid">

```jsx
import { createSignal } from 'solid-js';

const App = () => {
  const [dataList, setDataList] = createSignal([]);
  const { data, readyState, close, send } = useSSE(postMethodHandler)
    .onMessage(({ data }) => {
      setDataList(prevList => [...prevList, data]);
    })
    .onError(error => {
      // ...
    });
  return (
    <div>
      <span>
        {readyState() === 0 ? 'Connecting' : readyState() === 1 ? 'Connected' : 'Disconnected'}
      </span>
      <div>Last received data: {data()}</div>
      <ul>
        <For each={dataList()}>{item => <li key={item}>{item}</li>}</For>
      </ul>
      <button onClick={send}>Connect</button>
      <button onClick={close}>Close</button>
    </div>
  );
};
```

</TabItem>
</Tabs>

You can also listen for custom events to receive data.

```javascript
const { on } = useSSE(postMethodHandler);

// The following code will listen for events with the field `event: update`
const offUpdate = on('update', event => {
  console.log(event.eventSource); // Current EventSource instance
  console.log(event.data);
});
```

The `update` event will be triggered when the following data is received:

```plaintext
event: update
data: xxx
```

## Binding Events

`useSSE` provides a series of event binding methods, which return unbinding functions when bound.

```javascript
const { onMessage, onError, onOpen, on, close } = useSSE(postMethodHandler);

// Corresponds to the `message` event of EventSource
const offMessage = onMessage(event => {
  console.log(event.eventSource); // Current EventSource instance
  console.log(event.data);
});

const offError = onError(event => {
  console.log(event.eventSource); // Current EventSource instance
  console.error('SSE error', event.error);
  close();
});

// Unbind events
offMessage();
offError();
```

You can also bind events via chaining.

```javascript
const { data, readyState, close } = useSSE(postMethodHandler)
  .onMessage(event => {
    console.log(event.eventSource); // Current EventSource instance
    console.log(event.data);
  })
  .onError(event => {
    console.log(event.eventSource); // Current EventSource instance
    console.error('SSE error', event.error);
    close();
  });
```

## Global Response Interception

By default, response data is captured by the [Global Response Interceptor](/tutorial/getting-started/basic/global-interceptor). If this is not your intended behavior, you can manually disable it.

```javascript
const { data, readyState, onMessage, on } = useSSE(postMethodHandler, {
  // highlight-start
  interceptByGlobalResponded: false // Now data will not be intercepted
  // highlight-end
});
```

## Reconnection on Disconnect

When the connection is unexpectedly terminated or the server actively closes it, a reconnection will be triggered after 1 second by default. You can set the reconnection time on either the client or server side.

```javascript
const { data, readyState, onMessage, on } = useSSE(postMethodHandler, {
  // highlight-start
  reconnectionTime: 2000 // Reconnection will be triggered after 2 seconds
  // highlight-end
});
```

If you want to disable reconnection when closing the connection, handle it as follows:

### Set `reconnectionTime` to 0

A `reconnectionTime` of 0 disables the reconnection mechanism.

```javascript
useSSE(postMethodHandler, {
  reconnectionTime: 0
});
```

### Active Closure by Client

Calling the `close` method of `useSSE` will not trigger reconnection. Therefore, you can notify the client to actively close the connection via a custom event.

```javascript
const { close } = useSSE(postMethodHandler).on('close', () => {
  close();
});
```

### Server-Side Declaration

The server can declare the reconnection time. For example, sending the following data will set the reconnection delay to 5 seconds, overriding the client's `reconnectionTime` setting.

```plaintext
retry: 5000
```

Thus, the server can also send `retry: 0` to notify the client not to reconnect before closing the connection.

## Type Declarations

```typescript
const enum SSEHookReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2
};

type SSEHookConfig = {
  /**
   * Passed to `new EventSource`
   */
  withCredentials?: boolean;

  /**
   * Whether to intercept via alova's global responded interceptor
   * @default true
   */
  interceptByGlobalResponded?: boolean;

  /**
   * Initial data
   */
  initialData?: any;

  /**
   * Whether to send the request immediately
   * @default false
   */
  immediate?: boolean;
};

type SSEReturnType<S, Data> = {
  readyState: ExportedType<SSEHookReadyState, S>;
  data: ExportedType<Data | undefined, S>;
  eventSource: ExportedType<EventSource | undefined, S>;
  /**
   * Manually send the request. Automatically triggered when `immediate: true` is set.
   * @param args Request parameters passed to the method
   */
  send: (...args: any[]) => Promise<void>;
  /**
   * Close the connection
   */
  close: () => void;
  /**
   * Register a callback for the EventSource `open` event
   * @param callback Callback function
   * @returns Unregister function
   */
  onOpen(callback: SSEOnOpenTrigger): () => void;

  /**
   * Register a callback for the EventSource `message` event
   * @param callback Callback function
   * @returns Unregister function
   */
  onMessage<T = Data>(callback: SSEOnMessageTrigger<T>): () => void;

  /**
   * Register a callback for the EventSource `error` event
   * @param callback Callback function
   * @returns Unregister function
   */
  onError(callback: SSEOnErrorTrigger): () => void;

  /**
   * @param eventName Event name (default: `open` | `error` | `message`)
   * @param handler Event handler
   */
  on(
    eventName: string,
    handler: (event: AlovaSSEMessageEvent<S, E, R, T, RC, RE, RH>) => void
  ) => () => void;
};
```
