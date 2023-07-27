---
title: Request method instance
sidebar_position: 20
---

In Alova, each request corresponds to a method instance, which describes the url, request header, request parameters, and request behavior parameters such as response data processing and cache data processing, but it does not actually send the request.

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

Then create a POST request Method instance to submit the todo item.

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

> ⚠️ Note: The `Method` instance only saves the information needed for the request, it does not send the request, but needs to send the request through the `use hook` (will be explained in detail later), which is different from `axios`.

## Set a finer-grained timeout

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

## Request method type

`Alova` provides abstract instances of seven request methods including GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH. For specific usage methods, please read [Request Method Details](../next-step/method-details).
