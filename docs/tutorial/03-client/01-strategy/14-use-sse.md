---
title: Server-sent events send request
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

:::info strategy type

use hook

:::

> Before using extended hooks, make sure you are familiar with the basic use of alova.

Request through Server-sent Events (SSE), internally implemented using `EventSource`.

## Features

- A simpler and easier way to use;
- Automatically manage connections;

## Usage

```javascript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const {
  // Received data, each reception will modify data
  data,

  // Current EventSource instance
  eventSource,

  // Connection status, 0-connecting, 1-open, 2-closed
  readyState,

  // Bind connection event
  onOpen,

  // Bind message reception
  onMessage,

  // Bind error event
  onError,

  // Bind custom event
  on,

  // Connect and send message
  send,

  // Close connection
  close
} = useSSE(method, {
  withCredentials: true, // Will be passed to EventSource
  initialData: 'initial-data' // Data in data at the beginning
});
```

## Send request

By default, no request will be sent. You need to call `send` to send the request, or you can set `immediate = true` to send the request immediately.

```javascript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  // highlight-start
  immediate: true
  // highlight-end
});
```

`useSSE` can only connect to one source at present. That is, when trying to connect to multiple targets, the previous connection will always be disconnected.

```javascript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method);

send('value1');
// highlight-start
send('value2'); // This will disconnect the previous connection
send('value3'); // This will also disconnect the previous connection
// highlight-end
```

## Receive data

When data is received, it will automatically be assigned to the state `data`. You can bind it directly to the view, or listen to it to perform some operations.

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
  const { data, readyState, onMessage, close, send } = useSSE(method);

  onMessage(({ data: newData }) => {
    dataList.push(newData);
    data = newData;
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
  const { data, readyState, onMessage, onError, close, send } = useSSE(method);

  onMessage(({ data }) => {
    setDataList(prevList => [...prevList, data]);
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

### Binding events

`useSSE` provides a series of binding event methods, and will return the unbinding function when binding.

```javascript
const { onMessage, onError, close } = useSSE(method);

// Corresponding to the message event of eventsource
const offMessage = onMessage(event => {
  console.log(event.eventSource); // Current EventSource instance
  console.log(event.data);
});

const offError = onError(event => {
  console.log(event.eventSource); // Current EventSource instance
  console.error('sse error', event.error);
  close();
});

// Unbind event
offMessage();
offError();
```

In addition, you can also listen to custom EventSource events, which will call the `addEventListener` binding of EventSource.

```javascript
const { on } = useSSE(method);

// The following code will listen for events with the field `event: update`
const offUpdate = on('update', event => {
  console.log(event.eventSource); // Current EventSource instance
  console.log(event.data);
});
```

### Global response interception

By default, response data is captured by the [global response interceptor](/tutorial/getting-started/basic/global-interceptor). If this is not the behavior you expect, you can turn it off manually.

```javascript
const { data, readyState, onMessage, on } = useSSE(method, {
  // highlight-start
  interceptByGlobalResponded: false // Now dataWill not be intercepted by response
  // highlight-end
});
```

## Type declaration

```typescript
const enum SSEHookReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2
};

type SSEHookConfig = {
  /**
  * Will be passed to new EventSource
  */
  withCredentials?: boolean;

  /**
  * Whether to intercept by responding of alova instance
  * @default true
  */
  interceptByGlobalResponded?: boolean;

  /**
  * Initial data
  */
  initialData?: any;

  /**
  * Whether to initiate a request immediately
  * @default false
  */
  immediate?: boolean;
};

type SSEReturnType<S, Data> = {
  readyState: ExportedType<SSEHookReadyState, S>;
  data: ExportedType<Data | undefined, S>;
  eventSource: ExportedType<EventSource | undefined, S>;
  /**
  * Manually initiate a request. This method is automatically triggered when `immediate: true` is used
  * @param args request parameters, which will be passed to method
  */
  send: (...args: any[]) => Promise<void>;
  /**
  * Close the connection
  */
  close: () => void;
  /**
  * Register the callback function of EventSource open
  * @param callback callback function
  * @returns cancel the registration function
  */
  onOpen(callback: SSEOnOpenTrigger): () => void;

  /**
  * Register the callback function of EventSource message
  * @param callback callback function
  * @returns cancel the registration function
  */
  onMessage<T = Data>(callback: SSEOnMessageTrigger<T>): () => void;

  /**
  * Register the callback function of EventSource error
  * @param callback callback function
  * @returns cancel the registration function
  */
  onError(callback: SSEOnErrorTrigger): () => void;

  /**
  * @param eventName event name, default exists `open` | `error` | `message`
  * @param handler event handler
  */
  on(
    eventName: string,
    handler: (event: AlovaSSEMessageEvent<S, E, R, T, RC, RE, RH>) => void
  ) => () => void;
};
```
