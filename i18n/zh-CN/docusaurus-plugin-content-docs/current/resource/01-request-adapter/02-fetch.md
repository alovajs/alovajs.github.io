---
title: Fetch适配器
---

fetch 适配器是 alova 的预定义的请求适配器，通过它可以使用 fetch API 的所有功能。

## 使用方法

设置请求适配器为 fetch 适配器

```js
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const alovaInst = createAlova({
  requestAdapter: adapterFetch()
  // ...
});
```

## 配置项

创建 method 实例时，可传入任何`fetch API`支持的参数，这些参数会在请求时传给`fetch`函数。

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

以上 method 实例在通过`fetch`发送请求时，将会以以下参数请求。

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

> `fetch API`的请求体支持传递`string | FormData | Blob | ArrayBuffer | URLSearchParams | ReadableStream`参数。

## Content-Type 处理

fetch 适配器在未指定`Content-Type`请求头，并且请求体数据不是`FormData`时，默认设置`Content-Type`为`application/json;charset=UTF-8`。你可以设置`Content-Type`请求头来覆盖默认行为，例如：

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

`[v3.4.0+]`如果不希望设置默认的`Content-Type`，可以将`Content-Type`设置为falsy值，即`undefined`、`null`、`false`或空字符串。

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
