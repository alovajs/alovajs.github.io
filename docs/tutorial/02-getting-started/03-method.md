---
title: request type and parameters
sidebar_position: 30
---

In alova, each request corresponds to a method instance, which describes the URL, request headers, request parameters, and request behavior parameters of a request. It is a PromiseLike instance, so you can use `await alovaInstance.Get` to trigger the request.

Next, let’s take a look at the request type.

## Request type

alova provides 7 request types: GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH.

| Instance creation function | Parameters                                  |
| -------------------------- | ------------------------------------------- |
| GET                        | `alovaInstance.Get(url[, config])`          |
| POST                       | `alovaInstance.Post(url[, data[, config]])` |
| PUT                        | `alova.Put(url[, data[, config]])`          |
| DELETE                     | `alova.Delete(url[, data[, config]])`       |
| HEAD                       | `alova.Head(url[, config])`                 |
| OPTIONS                    | `alova.Options(url[, config])`              |
| PATCH                      | `alova.Patch(url[, data[, config]])`        |

Parameter Description:

- `url` is the request path, which will be concatenated with `baseURL` in `createAlova` to form a complete url for request;
- `data` is the request body data object;
- `config` is the request configuration object, which includes configurations such as request headers, params parameters, request behavior parameters, etc.;

## Request parameters

For example, create a GET request method instance to obtain a todo list as follows. It specifies the request header and params parameters. The params parameters will be spliced in the form of ? after the url.

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  params: {
    userId: 1
  }
});
```

Then create a POST request Method instance to submit the todo item. At this time, the second parameter is passed in the request body. It is worth noting that the POST request can also pass in the params parameter.

```javascript
//Create Post instance
const createTodoPoster = alovaInstance.Post(
  '/todo/create',
  // The second parameter is http body data
  {
    title: 'test todo',
    time: '12:00'
  },
  //The third parameter is to request configuration related information
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

## Set the parameters supported by the request adapter

In addition to request headers, params parameters, etc., it also supports configuring parameters supported by the corresponding request adapter. When using `GlobalFetch` as the request adapter of alova, you can configure any `fetch API` supported parameters on the `method` instance. These Parameters will be passed to the `fetch` function during request.

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

When the above `method` instance sends a request through `fetch`, it will be requested with the following parameters.

```javascript
fetch('/todo/list', {
  // ...
  // highlight-start
  credentials: 'same-origin',
  referrerPolicy: 'no-referrer',
  mode: 'cors'
  // highlight-end
});
```
