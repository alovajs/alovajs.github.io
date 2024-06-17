---
title: request by server-send events
sidebar_position: 140
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

A use hook that can automatically retry a request failure, you can use it for important requests.

## Features

- Simpler and easier-to-use usage.
- Automatic connection management.

## Usage

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```typescript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  initialData: 'initial-data' // Data initially in `data`
});

// Connect
send('value');

console.log(data.value); // Data is updated after receiving an event, by default it is `initialData`

// Corresponds to the `message` event of `eventsource`
const unbindMessage = onMessage(({ data }) => {
  console.log(data);
});

const unbindError = onError(({ error }) => {
  console.error('sse error', error);
  close();
});

// Unbind when needed
unbindMessage();
unbindError();
```

</TabItem>
<TabItem value="2" label="react">

```typescript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  initialData: 'initial-data' // Data initially in `data`
});

// Connect
send('value');

console.log(data); // Data is updated after receiving an event, by default it is `initialData`

// Corresponds to the `message` event of `eventsource`
const unbindMessage = onMessage(({ data }) => {
  console.log(data);
});

const unbindError = onError(({ error }) => {
  console.error('sse error', error);
  close();
});

// Unbind when needed
unbindMessage();
unbindError();
```

</TabItem>
<TabItem value="3" label="svelte">

```typescript
import { useSSE } from 'alova/client';

const method = (value: string) => alova.Get('/api/source', { param: { key: value } });
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  initialData: 'initial-data' // Data initially in `data`
});

// Connect
send('value');

console.log(data); // Data is updated after receiving an event, by default it is `initialData`

// Corresponds to the `message` event of `eventsource`
const unbindMessage = onMessage(({ data }) => {
  console.log(data);
});

const unbindError = onError(({ error }) => {
  console.error('sse error', error);
  close();
});

// Unbind when needed
unbindMessage();
unbindError();
```

</TabItem>
</Tabs>

:::warning

Currently, `useSSE` can only connect to one source. This means that when attempting to connect to multiple targets, the previous connection will always be terminated.

:::

```typescript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method);

send('value1');
// highlight-start
send('value2'); // This will terminate the previous connection
send('value3'); // This will also terminate the previous connection
// highlight-end
```

By default, no request is sent. However, by setting immediate = true, you can skip the manual send step.

```typescript
const { data, eventSource, readyState, onMessage, onError, on, send, close } = useSSE(method, {
  // highlight-start
  immediate: true
  // highlight-end
});

// codes here...
```

### Binding Custom Events

```typescript
const { data, readyState, onMessage, on } = useSSE(method);

on('event-name', ({ data }) => {
  console.log(data);
});
```

### Global Response Interception

By default, the response data is captured by [the global response interceptors](/tutorial/combine-framework/response). If this is not the desired behavior, you can manually disable it.

```typescript
const { data, readyState, onMessage, on } = useSSE(method, {
  // highlight-start
  interceptByGlobalResponded: false // Now the data will not be intercepted by the response interceptor
  // highlight-end
});
```

## Type Declaration

```typescript
const enum SSEHookReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2
};

type SSEHookConfig = {
  /**
   * Passed to new EventSource
   */
  withCredentials?: boolean;

  /**
   * Whether to be intercepted by the global responded interceptor of Alova instance
   * @default true
   */
  interceptByGlobalResponded?: boolean;

  /**
   * Initial data
   */
  initialData?: any;

  /**
   * Whether to initiate the request immediately
   * @default false
   */
  immediate?: boolean;
};

type SSEReturnType<S, Data> = {
  readyState: ExportedType<SSEHookReadyState, S>;
  data: ExportedType<Data | undefined, S>;
  eventSource: ExportedType<EventSource | undefined, S>;
  /**
   * Manually initiate the request. When `immediate: true` is used, this method is triggered automatically.
   * @param sendArgs Request parameters passed to the method
   */
  send: (...sendArgs: any[]) => Promise<void>;
  /**
   * Close the connection
   */
  close: () => void;
  /**
   * Register a callback function for the EventSource 'open' event
   * @param callback Callback function
   * @returns Function to unregister the callback
   */
  onOpen(callback: SSEOnOpenTrigger): () => void;

  /**
   * Register a callback function for the EventSource 'message' event
   * @param callback Callback function
   * @returns Function to unregister the callback
   */
  onMessage<T = Data>(callback: SSEOnMessageTrigger<T>): () => void;

  /**
   * Register a callback function for the EventSource 'error' event
   * @param callback Callback function
   * @returns Function to unregister the callback
   */
  onError(callback: SSEOnErrorTrigger): () => void;

  /**
   * @param eventName Event name, defaults to 'open' | 'error' | 'message'
   * @param handler Event handler
   */
  on(
    eventName: string,
    handler: (event: AlovaSSEMessageEvent<S, E, R, T, RC, RE, RH>) => void
  ) => () => void;
};
```
