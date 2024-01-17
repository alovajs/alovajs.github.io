---
title: 在服务端使用
sidebar_position: 180
---

:::info 版本要求

v2.17.0+

:::

alova 支持 commonjs 规范，在服务端使用时，不再需要使用 useHooks，因此也不再需要设置`statesHook`。除此以外，你依然可以享受到例如请求共享、缓存等其他所有的特性。

一个简单的使用示例如下：

```javascript
const { createAlova } = require('alova');
const GlobalFetch = require('alova/GlobalFetch');

const alova = createAlova({
  requestAdapter: GlobalFetch();
});

await alova.Get('/user/1');
```

在 nodejs 中使用 GlobalFetch 时，nodejs 版本要求`v17.5`，或者你可以使用[axios 请求适配器](/tutorial/request-adapter/alova-adapter-axios/)。

```javascript
const { createAlova } = require('alova');
const { axiosRequestAdapter } = require('@alova/adapter-axios');

const alova = createAlova({
  requestAdapter: axiosRequestAdapter();
});
```
