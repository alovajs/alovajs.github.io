---
title: Use on server side
sidebar_position: 180
---

:::info version requirements

v2.17.0+

:::

alova supports the commonjs specification. When using alova on the server side, there is no need to use useHooks, so there is no need to set `statesHook`. In addition, you can still enjoy all other features such as request sharing and response cache.

A simple usage example is as follows:

```javascript
const { createAlova } = require('alova');
const GlobalFetch = require('alova/GlobalFetch');

const alova = createAlova({
   requestAdapter: GlobalFetch();
});

await alova.Get('/user/1');
```

When using GlobalFetch in nodejs, the nodejs version requires `v17.5`, or you can use [axios request adapter](/tutorial/request-adapter/alova-adapter-axios/).

```javascript
const { createAlova } = require('alova');
const { axiosRequestAdapter } = require('@alova/adapter-axios');

const alova = createAlova({
   requestAdapter: axiosRequestAdapter();
});
```
