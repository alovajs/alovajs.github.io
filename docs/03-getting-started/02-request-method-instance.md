---
title: request method instance
sidebar_position: 20
---

In `alova`, each request corresponds to a method instance representation, which describes the url, request header, request parameters of a request, and request behavior parameters such as response data processing, cache processing data, etc., but it does not actually send a request .

## create instance

The creation of the `Method` instance is similar to the `axios` request sending function. Let's first create a `Method` instance that gets the todo list.

```javascript
// Create a Get instance to describe the information of a Get request
const todoListGetter = alovaInstance.Get('/todo/list', {
  // request header
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // The params parameter will be spliced ​​after the url in the form of ?
  params: {
    userId: 1
  }
});
```

Then create a `Method` instance that submits the todo, POST request.

```javascript
// create a Post instance
const createTodoPoster = alovaInstance.Post(
  '/todo/create',
  // The second parameter is the http body data
  {
    title: 'test todo',
    time: '12:00'
  },
  // The third parameter is the request configuration related information
  {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
      // ...
    }
  }
);
```

> ⚠️ Note: The `Method` instance only stores the information required for the request, it will not send the request, but needs to send the request through the `use hook` (details later), which is different from `axios`.

## Set a finer grained timeout

The global request timeout applies to all `Method` instances, but in many cases we need to set different timeouts according to special requests. At this time, we can set the request-level timeout, which will override the global `timeout` parameter

```javascript
// request timeout at request level
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  timeout: 10000
  // highlight-end
});
```

## request method type

`Alova` provides abstract instances of seven request methods including GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH. details).
