---
title: useRequest with serial
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

This use hook is more concise and easy to use than [alova's serial request method](/tutorial/next-step/serial-request), with unified loading status, error, and callback functions.

## Features

- ✨ A more concise and easy-to-use serial method;
- ✨Unified request status and callback function;
- ✨ send function can trigger serial execution of multiple requests;

## Example

[serial request](/tutorial/example/serial-request)

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```bash
# npm
npm install @alova/scene-vue --save
#yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
#yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
#yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## Usage

### Basic usage

Same usage as `useRequest`, except that the first parameter is changed to an array of handlers executed serially, and each handler will receive the response data of the previous request.

```javascript
const {
  // Serial loading status, all requests will be changed to false
  loading,

  // The response data of the last request
  data,

  // Any request error will record the error message here
  error,

  // Manually send a serial request
  send,

  // serial request success callback binding function
  onSuccess,

  // Serial request error callback binding function, any request error will trigger it
  onError,

  // Serial request completion callback binding function
  onComplete
} = useSerialRequest(
  [
    // args is the parameter passed in by the send function
    (...args) => request1(args),

    // Starting from the second handler, the first parameter is the response data of the previous request, and args is received from the second
    (response1, ...args) => request2(response1, args),
    (response2, ...args) => request3(response2, args)
  ],
  {
    immediate: false
  }
);

// emit request manually and pass arguments
send(1, 2, 3);
```

It is worth noting that the first item in the handler array can also be specified as a method instance, and the second item must be a function.

```javascript
useSerialRequest([
  methodInstance,
  (response1, ...args) => request2(response1, args),
  (response2, ...args) => request3(response2, args)
]);
```

### Request error

When any of the serial requests is wrong, `onError` will be triggered, and its `event.method` will point to the method instance of the request error.

## API

### Hook configuration

Inherit all configurations from [**useRequest**](/tutorial/learning/use-request#api).

### Responsive data

Inherit all responsive data from [**useRequest**](/tutorial/learning/use-request#api).

### Action function

Inherit all action functions of [**useRequest**](/tutorial/learning/use-request#api).

### Event

Inherit all events from [**useRequest**](/tutorial/learning/use-request#api).
