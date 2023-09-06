---
title: Request method instance
sidebar_position: 20
---

In alova, each request corresponds to a method instance, which describes the url, request header, request parameters, and request behavior parameters such as response data processing and cache data processing. Through the method instance, you can experience a unified user experience in any js environment, and it can run normally with very few changes. At the same time, the method instance puts the request parameters and request behavior parameters together, which is more convenient for api managed, rather than scattered across multiple code files.

## create instance

The creation of a method instance is also very similar to the request sending function of axios. You need to create method instance by alova instance created in last term. Let's first create a Method instance to get the todo list.

```javascript
// Create a Get instance to describe the information of a Get request
const todoListGetter = alovaInstance.Get('/todo/list', {
  // request header
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // The params parameter will be spliced after the url in the form of?
  params: {
    userId: 1
  }
});
```

Then create a POST request Method instance to submit the todo item, but now the second param is the request body.

```javascript
// Create a Post instance
const createTodoPoster = alovaInstance.Post(
  '/todo/create',
  // The second parameter is the http body data
  {
    title: 'test todo',
    time: '12:00'
  },
  // The third parameter is request configuration related information
  {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
      //...
    }
  }
);
```

> ⚠️ Note: The `Method` instance only saves the information needed for the request, it does not send the request, but needs to send the request through the `use hook` (will be explained in detail later), or call `methodInstance.send` to send request, which is different from `axios`.

## Set request-level timeout

The global request timeout applies to all `Method` instances, but many times we need to set different timeouts according to special requests. At this time, we can set the request-level timeout, which will override the global `timeout` parameter

```javascript
// Request timeout at the request level
const todoListGetter = alovaInstance.Get('/todo/list', {
  //...
  // highlight-start
  timeout: 10000
  // highlight-end
});
```

## Request behavior parameters

In addition to setting request parameters, `method` instances can also set request behavior parameters. The following are the supported request behavior parameters, which will also be explained in detail in subsequent chapters.

| Name           | Description                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| name           | method instance name, which is generally used to [match method instances](/tutorial/next-step/method-instance-matcher) |
| transformData  | Set the response data conversion function, see [Convert Response Data](/tutorial/learning/transform-response-data)     |
| localCache     | Set the request-level cache mode, see [cache mode](/tutorial/learning/response-cache)                                  |
| enableDownload | Enable download progress information, see [Download/Upload Progress](/tutorial/next-step/download-upload-progress)     |
| enableUpload   | Enable upload progress information, see [Download/Upload Progress](/tutorial/next-step/download-upload-progress)       |
| hitSource      | Cache auto-invalidation settings, see [Auto-invalidate cache](/tutorial/next-step/auto-invalidate-cache) for details   |
| shareRequest   | Sharing request, see [Share Request](/tutorial/next-step/share-request)                                                |

## Set the parameters supported by the request adapter

In the [Chapter about understanding alova instances](/tutorial/learning/alova-instance), we have built-in and recommended `GlobalFetch` as alova's request adapter. It will internally send requests through the `fetch` function. At this time, you can also Any parameter supported by `fetch` can be configured on the `method` instance, but we recommend setting request parameters using the fields mentioned above.

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  credentials: 'same-origin',
  referrerPolicy: 'no-referrer',
  mode: 'cors'
  // highlight-end
});
```

This is easy to understand, that is, in addition to unified parameters such as request parameters and request behavior parameters, you can also set any parameters supported by the request adapter. In the extension, we also provide [XMLHttpRequest Adapter](/tutorial/extension/alova-adapter-xhr), [axios Adapter](/tutorial/extension/alova-adapter-axios), [Uniapp Adapter](/tutorial/extension/alova-adapter-uniapp), [Taro adapter](/tutorial/extension/alova-adapter-taro) etc. Each adapter also has the parameters they support.

## Request method type

`Alova` provides abstract instances of seven request methods including GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH. For specific usage methods, please read [Request Method Details](../next-step/method-details).
