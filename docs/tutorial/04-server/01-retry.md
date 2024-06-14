---
title: Request retry strategy
sidebar_position: 10
---

:::info type

server hook

:::

Request retry strategy, you can use it for important requests.

## Features

- ✨ Customize the number of retries or determine whether to retry based on conditions;

- ✨ Retry delay mechanism;

## Usage

### Basic usage

```javascript
const { retry } = require('alova/server');
const { alovaInstance } = require('./api');

const request = alovaInstance.Get('/api/user');
const hookedMethod = retry(request);
```

`retry`'s maximum request retry count defaults to 3, and each retry will be delayed by 1 second.

### Set the maximum number of static retries

The maximum number of retries indicates the maximum number of times a request is retried after the first request fails. If the request succeeds during this period, it will stop retrying. The default maximum number of retries is 3 times, and you can customize the setting in the following way.

```javascript
const hookedMethod = retry(request, {
  // ...
  // highlight-start
  // Set the maximum number of retries to 5
  retry: 5
  // highlight-end
});
```

### Dynamically set the maximum number of retries

Sometimes you may want to determine whether to continue retrying based on a certain condition. In this case, you can set `retry` to a function that returns a boolean value to dynamically determine whether to continue retrying.

```javascript
const hookedMethod = retry(request, {
  // ...
  // highlight-start
  // The first parameter is the last error instance, and the second parameter is the parameter passed in by send
  retry(error) {
    // If the request times out, continue to retry
    return /network timeout/i.test(error.message);
  }
  // highlight-end
});
```

### Set the delay time

The default retry delay time is 1 second, and you can customize it in the following way.

```javascript
retry(request, {
  // ...
  backoff: {
    // highlight-start
    // Set the delay time to 2 seconds
    delay: 2000
    // highlight-end
  }
});
```

### Set an unfixed retry delay time

Sometimes you want the delay time of each request to be not fixed. You can set the delay growth multiple as follows. The delay time will increase exponentially according to the number of retries.

```javascript
retry(request, {
  // ...
  backoff: {
    delay: 2000,
    // highlight-start
    // When multiplier is set to 2, the first retry delay is 2 seconds, the second is 4 seconds, the third is 8 seconds, and so on.
    multiplier: 2
    // highlight-end
  }
});
```

Not enough? You can even add a random jitter value to each delay time to make it look less regular.

```javascript
retry(request, {
// ...
backoff: {
delay: 2000,
multiplier: 2,
// highlight-start
/**
* The starting percentage value of the delay request jitter, ranging from 0-1
* When only startQuiver is set, endQuiver defaults to 1
* For example, if it is set to 0.5, it will add a random time of 50% to 100% to the current delay time
* If endQuiver has a value, the delay time will increase by a random value in the range of startQuiver and endQuiver
*/
startQuiver: 0.5,

/**
* The ending percentage value of the delay request jitter, ranging from 0-1
* When only endQuiver is set, startQuiver defaults to 0
* For example, if it is set to 0.8, it will add a random time of 0% to 80% to the current delay time
* If startQuiver has a value, the delay time will increase by a random value in the range of startQuiver and endQuiver
*/
endQuiver: 0.8;
// highlight-end
}
});
```

## API

Please refer to [API-retry](/api/core-hooks#usewatcher).
