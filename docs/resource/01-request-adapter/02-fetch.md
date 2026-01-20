---
title: Fetch Adapter
---

The fetch adapter is a predefined request adapter for alova, through which you can use all the functions of the fetch API.

## Usage

Set the request adapter to the fetch adapter

```js
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const alovaInst = createAlova({
  requestAdapter: adapterFetch()
  // ...
});
```

## Configuration items

When creating a method instance, you can pass in any parameters supported by the `fetch API`, which will be passed to the `fetch` function when requesting.

```javascript
alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  credentials: 'same-origin',
  referrerPolicy: 'no-referrer',
  mode: 'cors'
  // highlight-end
});
```

When the above method instance is sent through `fetch`, it will be requested with the following parameters.

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

> The request body of the `fetch API` supports passing `string | FormData | Blob | ArrayBuffer | URLSearchParams | ReadableStream` parameters.

## Content-Type Handling

The fetch adapter defaults to `application/json;charset=UTF-8` when no `Content-Type` header is specified and the request body data is not `FormData`. You can override the default behavior by setting the `Content-Type` header.

```javascript
alovaInstance.Post(
  '/todo/create',
  { title: 'New Todo' },
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
);
```

`[v3.4.0+]`If you do not want to set the default `Content-Type`, you can set `Content-Type` to a falsy value, i.e., `undefined`, `null`, `false`, or an empty string.

```javascript
alovaInstance.Post(
  '/todo/create',
  { title: 'New Todo' },
  {
    headers: {
      'Content-Type': undefined
    }
  }
);
```

## `[3.5.0]`custom fetch function

if you need to use a custom fetch function, you can pass in the custom fetch function when creating the fetch adapter.

```javascript
import adapterFetch from 'alova/fetch';
import fetch from 'node-fetch';
// import { fetch } from 'expo/fetch';

const alovaInst = createAlova({
  requestAdapter: adapterFetch({
    customFetch: fetch
  })
  // ...
});
```
