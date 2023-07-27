---
title: Step 3 - Set Request Retry
sidebar_position: 60
---

When a request enters the silent queue, you can set request retry parameters for it to ensure its request success rate. This is valid when the behavior mode is set to **queue** and **silent**. The difference is, The request under the behavior of **silent** is persistent by default, and the request will continue to be sent even if it is refreshed before the request succeeds, while the request under the behavior of **queue** will not be persisted and will be cleared after refreshing.

## Maximum number of retries

Set the maximum number of retries, no retries by default.

```javascript
useSQRequest(createOrEditTodo, {
  //...
  // highlight-start
  // The number of retries is 3 times
  maxRetryTimes: 3
  // highlight-end
});
```

## Request delay time

By default, each retry interval is 1000ms, and we can customize the delay time of each retry in the avoidance strategy.

```javascript
useSQRequest(createOrEditTodo, {
  //...
  maxRetryTimes: 3,
  // highlight-start
  // Requests are delayed by 2000ms each time
  backoff: {
    delay: 2000
  }
  // highlight-end
});
```

If you need to increase the delay time according to the rules, you can set a growth factor for it.

```javascript
useSQRequest(createOrEditTodo, {
  //...
  maxRetryTimes: 3,
  backoff: {
    delay: 2000,
    // highlight-start
    // When multiplier is set to 2, the first retry delay is 2 seconds, the second is 4 seconds, and the third is 6 seconds
    multiplier: 2
    // highlight-end
  }
});
```

not enough? You can even add a random jitter value to each delay to make it look less regular

```javascript
useSQRequest(createOrEditTodo, {
   //...
   maxRetryTimes: 3,
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

## set retry rules

By default, as long as the request fails, it will be retried. The request failure is divided into the following situations:

1. The request is wrong, and the error is not caught by the global `onError` hook;
2. The request was successful, but an error was thrown in the global `onSuccess` hook;

But in reality, not all requests need to be retried. For example, when a server error occurs or the network is disconnected, it should not be retried. In this case, it is necessary to set a retry judgment rule. When a request fails, an instance of `Error` is usually obtained. We can set a regular expression to match `error.message` or `error.name`, and if the match passes, no retry will be made.

```javascript
useSQRequest(createOrEditTodo, {
  //...
  // highlight-start
  // When the thrown error name is 500, or the wrong message matches network error, do not retry
  retryError: {
    name: /^500$/,
    message: /network error/i
  }
  // highlight-end
});
```

You can also set one of the matching rules. When only setting the matching rules for `message`, it can be directly abbreviated as a regular expression.

```javascript
// Only set the name that matches the error
useSQRequest(createOrEditTodo, {
  //...
  retryError: {
    name: /^500$/
  }
});

// Only set the message that matches the error
useSQRequest(createOrEditTodo, {
  //...
  retryError: /network error/i
});
```

In order not to pollute the error message, usually we will put the error code returned by the server in `error.name`, of course, you can also splice it into `error.message`, the error handling example of Response is as follows:

```javascript
const alovaInst = createAlova({
  //...
  responded: {
    onSuccess(response) {
      // Error thrown on 500 error
      if (response.status === 500) {
        const error = new Error(response.statusText);
        error.name = response.status;
        throw error;
      }
      return response.json();
    }
  }
});
```

In the next step, the saved operation records will be used to perform data compensation on the list data to achieve the latest state.
