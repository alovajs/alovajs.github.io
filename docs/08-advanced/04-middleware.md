---
title: Middleware
sidebar_position: 40
---

Request middleware is an asynchronous function. Although it is only a function, it provides a powerful ability to control almost all behaviors of a request. If you just use alova, then you probably don't need to use request middleware, because it is mainly used to complete custom request strategies, no matter simple or complex request strategies, you may use it, let's look at it next What magical powers does it have.

## Middleware function

You can use request middleware in `useRequest`, `useWatcher`, `useFetcher`. The following is a simple request middleware, which prints some information before and after the request without changing any request behavior.

```javascript
useRequest(todoList, {
  async middleware(_, next) {
    console.log('before request');
    await next();
    console.log('after request');
  }
});
```

Here are a few things you need to know about the `next` function call. This function is also an asynchronous function. Calling it can continue to send requests. At this time, the _loading_ state will be set to true, and then the request will be sent. The return value of next is a Promise instance with the response data, you can manipulate the return value in the middleware function.

## Control response data

The return value of the middleware function will be used as the response data of this request to participate in subsequent processing. If the middleware does not return any data but calls `next`, the response data of this request will be used for subsequent processing.

```javascript
// The modified result will be used as the response data
useRequest(todoList, {
  async middleware(_, next) {
    const result = await next();
    result.code = 500;
    return result;
  }
});

// Will participate in subsequent processing with the response data of this request
useRequest(todoList, {
  async middleware(_, next) {
    await next();
  }
});

// will respond with the string abc
useRequest(todoList, {
  async middleware(_, next) {
    await next();
    return 'abc';
  }
});
```

There is also a special case here. When `next` is not called and there is no return value, subsequent processing will not be performed, which means that _onSuccess_, _onError_, _onComplete_ response events will not be triggered.

```javascript
useRequest(todoList, {
  async middleware() {}
});
```

## change request

Sometimes you want to change the request. At this time, you can specify another method instance in `next`, and the information in this method will be requested when sending the request. At the same time, you can also set whether to force the request through `next` Penetrating the cache is also very simple.

```javascript
useRequest(todoList, {
  async middleware(_, next) {
    await next({
      // Change the requested method instance
      method: newMethodInstance,

      // Whether to force the request this time
      force: true
    });
  }
});
```

## Control errors

### Catch errors

In the middleware, you can capture the request error generated in `next`, after capturing, the global `onError` hook will no longer be triggered.

```javascript
useRequest(todoList, {
  async middleware(_, next) {
    try {
      await next();
    } catch (e) {
      console.error('Error caught', e);
    }
  }
});
```

### Throw an error

Of course, you can also throw a custom error in the middleware, even if the request is normal, the global `onError` hook will be triggered.

```javascript
// When an error is thrown before the request, the request will not be sent
useRequest(todoList, {
  async middleware(_, next) {
    throw new Error('error on before request');
    await next();
  }
});

// When an error is thrown after the request, the request will be sent
useRequest(todoList, {
  async middleware(_, next) {
    await next();
    throw new Error('error on after request');
  }
});
```

## Control response delay

In the middleware, we can delay the response or respond in advance. In the case of advance, although the response data cannot be obtained, some other data can be returned as the response data to participate in subsequent processing.

```javascript
// Delay response for 1 second
useRequest(todoList, {
  async middleware(_, next) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    return next();
  }
});

// Respond immediately and use the string abc as the response data
useRequest(todoList, {
  async middleware(_, next) {
    return 'abc';
  }
});
```

## more than that

**So far, all we have mentioned is the use of the second parameter `next` of the middleware, so what is the first parameter for? **

The first parameter of the middleware contains some information about this request, as well as the control functions for the status and events returned in useHook such as `loading`, `data` and `onSuccess`. Let's move on!

## Included request information

```javascript
useRequest(todoList, {
  async middleware(context, next) {
    // The method instance of this request
    context.method;

    // The parameter array sent by the send function, the default is []
    context.sendArgs;

    // The cache data hit by this request
    context.cachedResponse;

    // configuration collection of useHook
    context.config;

    // The various states returned by useHook, including the following attributes
    // loading, data, error, downloading, uploading, and additional states managed by managedStates
    context.frontStates;
    //...
  }
});
```

Next, let's take a look at what controls are available.

## Control state

`context.update` can be used to change the state in `context.frontStates`.

```javascript
useRequest(todoList, {
  async middleware(context, next) {
    context.update({
      // Modify the loading status to true in advance
      loading: true,

      // Modify the data value, such as setting custom initialization data
      data: {
        /* ... */
      }
    });

    //...
  }
});
```

## Decorate the event

You can also decorate _onSuccess_, _onError_, _onComplete_ callback functions in middleware to make them richer, such as changing the parameters of the callback function, or receiving the return value of the callback function to achieve more functions.

You can use `decorateSuccess`, `decorateError`, `decorateComplete` functions to decorate callback functions. The following takes the success callback as an example, which is decorated in 3 places:

1. Added `custom` attribute to event object;
2. Added a second parameter to the success callback function, the value is `extra data`;
3. Receive the value of the second success callback function and print it;

```javascript
const { onSuccess } = useRequest(todoList, {
  //...
  async middleware(context, next) {
    // Decorate the successful callback function, the following function parameters are explained:
    // handler: bound callback function
    // event: the event object corresponding to the callback function
    // index: The subscript of the callback function, indicating which callback function is currently being executed
    // length: the number of callback functions bound
    context.decorateSuccess((handler, event, index, length) => {
      event.custom = 1;
      const received = handler(event, 'extra data');
      if (index === 1) {
        console.log(`received the return value of ${index + 1} callback function:`, received);
        // [Print information] Received the return value of the second callback function: I'm second handler
      }
    });
    //...
  }
});
onSuccess((event, extra) => {
  console.log(event.custom); // 1
  console.log(extra); // extra data
});
onSuccess((event, extra) => {
  return "I'm second handler";
});
```

The usage of `decorateError`, `decorateComplete` is the same as `decorateSuccess`.
