---
title: Request Middleware
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Usage scope

Client useHook

:::

You can set request middleware for all useHooks to freely control request behavior, providing powerful capabilities that can control almost all behaviors of a request. Whether it is a simple or complex request strategy, you may use it. Next, let's see what it can do.

## Middleware function

Request middleware is an asynchronous function. The following is a simple request middleware that prints some information before and after the request, without changing any request behavior.

```javascript
useRequest(todoList, {
  async middleware(_, ​​next) {
    console.log('before request');
    await next();
    console.log('after requeste');
  }
});
```

The `next` function is an asynchronous function. Calling it will continue to send requests. At this time, the _loading_ state will be set to true, and then the request will be sent. The return value of next is a Promise instance with response data. You can manipulate the return value in the middleware function.

## Ignore requests

When you don't want to make a request, you can ignore the request by not calling `next`, as if the request has never been made. For example, do not make a request when a listening field changes in `useWatcher`.

```js
useWatcher(() => todoList(), [state1], {
  middleware: async (_, next) => {
    if (state1 === 'a') {
      return next();
    }
  }
});
```

## Control response data

The return value of the middleware function will be used as the response data of this request for subsequent processing. If the middleware does not return any data but calls `next`, the response data of this request will be used for subsequent processing.

```javascript
// Convert response data and return
useRequest(todoList, {
  async middleware(_, ​​next) {
    const result = await next();
    result.code = 500;
    return result;
  }
});

// The response data of this request will be used for subsequent processing
useRequest(todoList, {
  async middleware(_, ​​next) {
    await next();
  }
});

// The string abc will be used as the response data
useRequest(todoList, {
  async middleware(_, ​​next) {
    await next();
    return 'abc';
  }
});
```

## Change request

Sometimes you want to change the request. At this time, you can specify another method instance in `next`. When sending the request, the information in this method will be requested. At the same time, you can also use `next` to set whether to force the request to penetrate the cache. This is also very simple.

```javascript
useRequest(todoList, {
  async middleware(_, ​​next) {
    await next({
      // Change the method instance of the request
      method: newMethodInstance,

      // Force the request this time
      force: true
    });
  }
});
```

## Control errors

### Capture errors

In the middleware, you can capture the request error generated in `next`. After capturing, the global `onError` hook will no longer be triggered.

```javascript
useRequest(todoList, {
  async middleware(_, ​​next) {
    try {
      await next();
    } catch (e) {
      console.error('Caught error', e);
    }
  }
});
```

### Throw an error

Of course, you can also throw a custom error in the middleware, and even if the request is normal, it will enter the request error process.

```javascript
// No request is sent, and global and request-level onError will be triggered. If the request is sent through `method.send`, a reject promise instance will be returned
useRequest(todoList, {
  async middleware(_, ​​next) {
    throw new Error('error on before request');
    await next();
  }
});

// After the request is successful, global and request-level onError will be triggered. If the request is sent through `method.send`, a reject promise instance will be returned
useRequest(todoList, {
  async middleware(_, ​​next) {
    await next();
    throw new Error('error on after request');
  }
});
```

## Control response delay

In the middleware, we can delay the response or respond in advance. In the case of early response, although the response data cannot be obtained, some other data can be returned as response data to participate in subsequent processing.

```javascript
// Delay response for 1 second
useRequest(todoList, {
  async middleware(_, ​​next) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    return next();
  }
});

// Respond immediately and use string abc as response data
useRequest(todoList, {
  async middleware(_, ​​next) {
    return 'abc';
  }
});
```

## More than that

**So far, we have mentioned the use of the second parameter `next` of the middleware, so what does the first parameter do? **

The first parameter of the middleware contains some information about this request, as well as control functions for the status and events returned in useHook such as `loading`, `data` and `onSuccess`. Let's continue to look down!

## Request information included

```javascript
async function middleware(context, next) {
  // Method instance for this request
  context.method;

  // Parameter array sent by the send function, default is []
  context.args;

  // Cache data hit by this request
  context.cachedResponse;

  // Configuration collection of useHook
  context.config;

  // The various states returned by useHook, it is a state proxy, including the following properties
  // loading, data, error, downloading, uploading, and additional states managed by managedStates
  context.proxyStates;

  // Operation function in current useHook, send, abort
  // context.fetch in useFetcher
  context.send;
  context.abort;
}
```

Next, let's take a look at what control capabilities are available.

## Modify responsive data

Use `context.proxyStates` to modify the state data of the current useHook. Since alova's useHook is compatible with multiple UI frameworks, proxyStates is a unified state proxy, which is used in a similar way to vue's ref value.

```javascript
async function middleware(context, next) {
  const { loading, data } = context.proxyStates;

  // Get loading value
  const loadingValue = loading.v;
  // Change loading status to true
  loading.v = true;

  // Modify data status value
  data.v = {
    /* ... */
  };
}
```

For detailed usage of state proxy, please refer to [State Proxy](/tutorial/advanced/custom/client-strategy).

## Interrupt or repeat request

The `abort` and `send` functions (`fetch` in useFetcher) received by the middleware can also send multiple requests when a request intent is triggered.

A typical use case is request retry. If a request fails after sending a request, it will automatically request again according to a certain strategy. After the retry succeeds, it will trigger `onSuccess`. The following is a simple request retry example code.

```javascript
async function middleware(context, next) {
  return next().catch(error => {
    if (needRetry) {
      setTimeout(() => {
        context.send(...context.sendArgs);
      }, retryDelay);
    }
    return Promise.reject(error);
  });
}
```

If you need to interrupt the request in the middleware, you can call `context.abort()`.

## Controlled loading state

In the above content, we know that we can modify responsive data through `loading.v`, but there will be obstacles when you modify the loading state value `loading`, because under normal circumstances, the loading state value will be automatically set to true when calling `next`, and automatically set to false in the response process, which will overwrite the loading state value modified by `loading.v`. At this time, we can turn on the controlled loading state. After turning it on, the loading state value will no longer be modified in the `next` function and the response process, and we will be fully controlled.

Let's take request retry as an example. We hope that the loading state will remain true from the beginning of triggering a request intention, through request retry until the request ends.

Use `context.controlLoading` to turn on the custom control loading state.

```javascript
async function middleware(context, next) {
  context.controlLoading();
  const { loading } = context.proxyStates;

  // Set to true when the request starts
  loading.v = true;
  return next()
    .then(value => {
      // Set to false after the request is successful
      loading.v = false;
      return value;
    })
    .catch(error => {
      if (needRetry) {
        setTimeout(() => {
          context.send(...context.sendArgs);
        }, retryDelay);
      } else {
        // Set to false when no longer retrying
        loading.v = false;
      }
      return Promise.reject(error);
    });
}
```
