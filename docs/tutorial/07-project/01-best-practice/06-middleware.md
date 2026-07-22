---
title: Common middleware practices
---

## Delay update loading

When the response is very fast, the loading status flashes briefly, which gives a poor user experience. Delaying the loading update keeps the loading status hidden for a short period; if the response completes within that period, the loading status will not appear at all. Let's implement a middleware with delayed loading updates.

```javascript
const delayLoadingMiddleware =
  (delayTimer = 1000) =>
  async (ctx, next) => {
    const { loading } = ctx.proxyStates;

    // Control loading by yourself
    ctx.controlLoading();

    // Delay updates for a specific time
    const timer = setTimeout(() => {
      loading.v = true;
    }, delayTimer);
    await next();
    loading.v = false;
    clearTimeout(timer);
  };

useRequest(methodInstance, {
  middleware: delayLoadingMiddleware()
});
```
