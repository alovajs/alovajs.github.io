---
slug: /react-query-bff-gap
title: react-query 管不到 BFF？alova/server 补上重试限流
authors:
  - name: Alova Team
tags: [react-query, bff, alova-server, 重试, 限流]
date: 2026-08-05
description: react-query 的重试和缓存都在浏览器里。你的 BFF 调下游服务的出站调用跑在服务端，react-query 够不到。这篇划清那条线，并给出两侧代码。
keywords: [react-query bff, alova server 重试, alova server 限流, bff 重试 react-query]
---

# react-query 管不到 BFF？alova/server 补上重试限流

你用 react-query 搭了前端，它的缓存和重试让浏览器那边很顺。后来你起了个 Node BFF 调三个下游服务，这些调用的重试和限流都落在服务端，而 react-query 在那儿根本不跑。这篇划清 react-query 的工作止步于哪、alova/server 从哪接手，并给出两侧的代码。

## 那条线

react-query 活在浏览器里。它的 `useQuery` 重试、缓存、去重，全都发生在每个浏览器标签页里，绑着 React 的渲染周期。当你的 BFF 调下游时，这些逻辑在 BFF 内部一个都不执行。所以问题不是「react-query 还是 alova」，而是「服务端那层调用归谁管」。

## 重试：浏览器 vs BFF

react-query 在浏览器里重试一个失败的查询：

```js
useQuery({
  queryKey: ['resource', id],
  queryFn: () => fetch(`/api/resource/${id}`).then(r => r.json()),
  retry: 3,
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 8000)
});
```

这个重试护的是用户的视图。它对 BFF 出站调下游毫无作用，因为那次调用压根不经过 react-query。

在 BFF 上，alova/server 对出站请求做退避重试：

```js
const { createAlova } = require('alova');
const { axiosRequestAdapter } = require('@alova/adapter-axios');
const { retry } = require('alova/server');

const alovaInst = createAlova({
  baseURL: 'https://downstream.internal',
  requestAdapter: axiosRequestAdapter()
});

const getResource = (id) =>
  retry(alovaInst.Get(`/resource/${id}`), {
    retry: 5,
    backoff: { delay: 1000, multiplier: 2 }
  });

// 在路由 handler 里：
const data = await getResource(req.params.id);
```

同一个思路，不同层。react-query 管浏览器，`retry` 管服务端。顺带一句：alova 的客户端 hook 在 uni-app / Taro / 小程序里也能跑同一套 `useRequest`，所以「浏览器/服务端分层」在内客户端也成立。

## 限流：只在服务端有

react-query 完全没有「给 BFF 调下游做限流」这个概念，它的 API 里找不到「对服务 X 每秒最多 4 次」这种东西。那是服务端的事，而 alova/server 的 `createRateLimiter` 正是为它生的：

```js
const { createRateLimiter } = require('alova/server');

const rateLimit = createRateLimiter({ duration: 4000, points: 4 });

app.get('/api/resource/:id', async (req, res) => {
  try {
    const data = await rateLimit(
      retry(alovaInst.Get(`/resource/${req.params.id}`), {
        retry: 5,
        backoff: { delay: 1000, multiplier: 2 }
      }),
      { key: `downstream:${req.params.id}` }
    );
    res.json(data);
  } catch (err) {
    res.status(429).json({ error: 'downstream busy, retry later' });
  }
});
```

`rateLimit` 在请求真正出去之前先扣一个点，被下游打趴的时候它不被你自己的流量埋了。默认存储是 method 的 `l2Cache`；跨实例时你换成一个共享存储（`@alova/psc` 或 redis），额度才是真正集群级的。

## 缓存：先搞清楚它活在哪一侧

这是最容易被混的一点。react-query 的缓存是「每浏览器」的，它不让同一个用户在同一标签页里重复拉同一个资源，但对你 BFF 猛锤一个慢下游毫无作用，因为那次调用不在浏览器里。

alova 的缓存也是客户端策略特性：`cacheFor` 控制响应保留多久，模式只有 `memory` 和 `restore`，非 GET 请求默认是 `null`（不缓存）。在服务端，`alova/server` 给你的是 `retry` 和 `createRateLimiter`，它并不顺手塞给你一个下游响应的服务端缓存。如果你不想对重复的慢 GET 反复打下游，得自己加一层缓存（或倚仗下游自己带的），再把 `retry`/`rateLimit` 叠上去。

所以分工很干净：react-query 守浏览器缓存，alova/server 守 BFF 出站的重试和限流，互不相踩。

两个工具管的是不同层。请求止步于浏览器的地方用 react-query，[BFF 那层交给 alova/server](/blog/bff-retry)。要完整选型视角，见 [react-query 与 alova 对比](/blog/compare/react-query)。

- [服务端重试策略](https://alova.js.org/tutorial/server/strategy/retry)
- [服务端限流](https://alova.js.org/tutorial/server/strategy/rate-limit)
