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
