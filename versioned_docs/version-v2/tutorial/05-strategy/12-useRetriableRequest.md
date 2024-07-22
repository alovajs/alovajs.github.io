---
title: retriable request
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

A use hook that can automatically retry a request failure, you can use it for important requests.

## Example

[Request Retry Demo](/v2/tutorial/example/retriable-hook)

## Features

- Customize the number of retries or judge whether retry is required according to the conditions;
- Retry delay mechanism;
- Manually stop retrying;

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue">

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

## use

### Basic usage

```javascript
const {
  // Loading status, always true during retry, until retry succeeds or fails
  loading,

  // response data
  data,

  // Request error information, every time a request or retry fails, there will be an error instance
  // The last error instance will be overwritten
  error,

  // Every time a request or retry fails, the onError event will be triggered
  onError,

  // Request retry event, triggered immediately after each retry request is issued
  onRetry,

  // request retry failure event
  // The request is not successful after reaching the maximum number of retries, or manually stopping retries will trigger
  onFail,

  // request or retry success event
  onSuccess,

  // Every request or retry, regardless of success or failure, will trigger the completion event
  onComplete
} = useRetriableRequest(request);
```

The maximum number of request retries for `useRetriableRequest` defaults to 3, and each retry will be delayed by 1 second. It will also make a request by default, you can change the behavior by setting `immediate` to false.

### Set the static maximum number of retries

The maximum number of retries indicates the maximum number of times to retry the request after the first request fails. During this period, if the request succeeds, it will stop continuing to retry. The default maximum number of retries is 3, and you can customize the settings in the following ways.

When the request reaches the maximum number of retries and still fails, the `onFail` event will be triggered and the request retry will stop. If you want to continue to retry after the failure, you can call the `send` function, and it will perform a new round request and retry.

```javascript
const { send } = useRetriableRequest(request, {
  //...
  // highlight-start
  // Set the maximum number of retries to 5
  retry: 5
  // highlight-end
});
```

### Dynamically set the maximum number of retries

Maybe sometimes you want to use a certain condition to determine whether to continue to retry. At this time, you can set `retry` as a function that returns a boolean value to dynamically determine whether to continue to retry.

```javascript
useRetriableRequest(request, {
  //...
  // highlight-start
  // The first parameter is the last error instance, and the parameters passed in from the second parameter to send
  retry(error, ...args) {
    // If the request times out, continue to retry
    return /network timeout/i.test(error.message);
  }
  // highlight-end
});
```

### Set delay time

The default retry delay time is 1 second, you can customize the setting in the following ways.

```javascript
useRetriableRequest(request, {
  //...
  backoff: {
    // highlight-start
    // Set the delay time to 2 seconds
    delay: 2000
    // highlight-end
  }
});
```

### Set an unfixed retry delay time

Sometimes you want that the delay time of each request is not fixed, you can set the delay growth multiple in the following way, and the delay time will increase exponentially according to the number of retries.

```javascript
useRetriableRequest(request, {
  //...
  backoff: {
    delay: 2000,
    // highlight-start
    // When the multiplier is set to 2, the first retry delay is 2 seconds, the second is 4 seconds, the third is 8 seconds, and so on.
    multiplier: 2
    // highlight-end
  }
});
```

not enough? You can even add a random jitter value to each delay to make it look less regular.

```javascript
useRetriableRequest(request, {
   //...
   backoff: {
     delay: 2000,
     multiplier: 2,
     // highlight-start
     /**
      * The initial jitter percentage value of the delay request, the range is 0-1
      * When only startQuiver is set, endQuiver defaults to 1
      * For example set to 0.5, it will add 50% to 100% random time on the current delay time
      * If endQuiver has a value, the delay time will be increased by a random value in the range of startQuiver and endQuiver
      */
     startQuiver: 0.5,

     /**
      * The jitter end percentage value of the delayed request, the range is 0-1
      * When only endQuiver is set, startQuiver defaults to 0
      * For example set to 0.8, it will add a random time from 0% to 80% on the current delay time
      * If startQuiver has a value, the delay time will increase the random value in the range of startQuiver and endQuiver
      */
     endQuiver: 0.8;
     // highlight-end
   }
});
```

### Manually stop retrying

In some cases, you need to manually stop the retry, whether you are currently requesting or waiting for the next retry, you can use `stop` to stop it.

```javascript
const { stop } = useRetriableRequest(request, {
  //...
});

const handleStop = () => {
  stop();
};
```

## API

### Hook configuration

Inherit all configurations from [**useRequest**](/api/core-hooks#userequest).

| Name    | Description                                                                                                                                  | Type                            | Default                                   | Version |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------- | ------- | --- |
| retry   | The maximum number of retries can also be set as a function returning a boolean value to dynamically determine whether to continue to retry. | number                          | (error: Error, ...args: any[]) => boolean | 3       | -   |
| backoff | Backoff policy, set retry delay time, etc.                                                                                                   | [BackoffPolicy](#backoffpolicy) | -                                         | -       |

### BackoffPolicy

| Name        | Description                                                                                                                                                                                                                                                                                                                                                       | Type   | Default | Version |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------- | ------- |
| delay       | Delay time for another request, in milliseconds                                                                                                                                                                                                                                                                                                                   | number | 1000    | -       |
| multiplier  | Specify the delay multiplier, for example, when multiplier is set to 2 and delay is 1 second, the first retry is 1 second, the second is 2 seconds, the third is 4 seconds, and so on                                                                                                                                                                             | number | 0       | -       |
| startQuiver | The initial jitter percentage value of the delay request, ranging from 0-1. When only startQuiver is set, endQuiver defaults to 1. For example, if it is set to 0.5, it will increase the current delay time by 50% to 100% randomly Time, if endQuiver has a value, the delay time will be increased by a random value in the range of startQuiver and endQuiver | number | 0       | -       |
| endQuiver   | The jitter end percentage value of the delayed request, the range is 0-1, when onlyWhen endQuiver is set, startQuiver defaults to 0. For example, if it is set to 0.5, it will add a random time from 0% to 50% to the current delay time. If startQuiver has a value, the delay time will increase the random value in the range of startQuiver and endQuiver    | number | 0       | -       |

### Responsive data

Inherit all responsive data from [**useRequest**](/api/core-hooks#userequest).

### Action function

Inherit all action functions of [**useRequest**](/api/core-hooks#userequest).

| name | description                                                                                                        | function parameters | return value | version |
| ---- | ------------------------------------------------------------------------------------------------------------------ | ------------------- | ------------ | ------- |
| stop | Stop retrying, it is only valid during retrying, and the onFail event will be triggered immediately after stopping | -                   | -            | -       |

### Event

Inherit all events from [**useRequest**](/api/core-hooks#userequest).

| Name    | Description                                                                                                                                                                                                                                                                                                                                                                                                          | Callback Parameters                                              | Version |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| onRetry | Retry event bindings, they will fire after a retry is initiated                                                                                                                                                                                                                                                                                                                                                      | Retry event instance [RetriableRetryEvent](#retriableretryevent) | -       |
| onFail  | Triggered when the request fails. It will be triggered when no more retries are made. For example, when the maximum number of retries is reached, when the retry callback returns false, manually call stop to stop retrying<br/>Note:<br/>1 The .onError event will be triggered every time an error is reported.<br/>2. If there are no retries, onError, onComplete and onFail will be triggered at the same time | Retry event instance [RetriableFailEvent](#retriablefailevent)   | -       |

#### RetriableRetryEvent

Event event instance inherited from alova.

| Name       | Description                         | Type   | Default  | Version |
| ---------- | ----------------------------------- | ------ | -------- | ------- |
| retryTimes | current retry times                 | number | required | -       |
| retryDelay | The delay time of this retry, in ms | number | required | -       |

#### RetriableFailEvent

Event event instance inherited from alova.

| Name       | Description         | Type   | Default  | Version |
| ---------- | ------------------- | ------ | -------- | ------- |
| retryTimes | current retry times | number | required | -       |
