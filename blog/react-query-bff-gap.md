# react-query stops at the browser. alova/server handles your BFF.

You built the frontend on react-query. Its cache and retry keep the browser happy. Then you stood up a Node BFF that calls three downstream services, and the retries and throttling for those calls live on the server. react-query never runs there. This post shows the exact line where react-query's job ends and where alova/server picks up, with the code for each side.

## The line

react-query lives in the browser. Its `useQuery` retry, its cache, its dedup, all happen per browser tab, bound to React's render cycle. None of that executes inside your BFF when your BFF calls a downstream. So the question isn't "react-query or alova". It's "who handles the server-side calls".

## Retry: browser vs BFF

react-query retries a failed query in the browser:

```js
useQuery({
  queryKey: ['resource', id],
  queryFn: () => fetch(`/api/resource/${id}`).then(r => r.json()),
  retry: 3,
  retryDelay: attempt => Math.min(1000 * 2 ** attempt, 8000)
});
```

That retry protects the user's view. It does nothing for the BFF's outbound call to the downstream, because that call doesn't go through react-query.

On the BFF, alova/server retries the outbound request with backoff:

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

// inside your route handler:
const data = await getResource(req.params.id);
```

Same idea, different layer. react-query covers the browser; `retry` covers the server.

## Rate limiting: only on the server

react-query has no concept of throttling your BFF's calls to a downstream. There's nothing in its API for "max 4 requests per 4 seconds to service X". That is a server-side concern, and alova/server's `createRateLimiter` is built for it:

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

`rateLimit` consumes a point before the call leaves, so a struggling downstream isn't buried by your own traffic. The default store is the method's `l2Cache`; across instances you swap in a shared one (`@alova/psc` or redis) so the limit is real cluster-wide.

## Cache: know which side it lives on

This is the part people mix up. react-query's cache is per browser. It keeps a user from refetching the same resource in the same tab. It does nothing for your BFF hammering a slow downstream, because that call isn't in the browser.

alova's caching is a client-side strategy feature too. `cacheFor` controls how long a method response is kept, with modes `memory` and `restore`, and non-GET requests default to `null` (no cache). On the server, `alova/server` gives you `retry` and `createRateLimiter`; it does not hand you a server-side response cache for downstream calls. If you want to skip a slow downstream for repeated GETs, you add your own cache (or lean on the downstream's own), and layer `retry`/`rateLimit` on top.

So the split is clean: react-query owns the browser cache, alova/server owns the BFF's outbound retry and throttle. Neither steps on the other.

The two tools solve different layers. Use react-query where the request ends in the browser, and [alova/server for the BFF](/blog/bff-retry). For the full选型 view, see the [react-query vs alova comparison](/blog/compare/react-query).

- [Server retry strategy](https://alova.js.org/tutorial/server/strategy/retry)
- [Server rate limit](https://alova.js.org/tutorial/server/strategy/rate-limit)
