---
title: Common middleware practices
sidebar_position: 50
---

## Delay update loading

When the response is very fast, the loading status will flash once, which will bring a bad experience to the user. Delaying the loading update can make the loading status display after a period of time. If the response is completed within this period, it will not appear. Loading status. Let's implement a middleware with delayed update loading.

```javascript
const delayLoadingMiddleware =
  (delayTimer = 1000) =>
  async (ctx, next) => {
    //Control loading by yourself
    ctx.controlLoading();

    //Delay updates for a specific time
    const timer = setTimeout(() => {
      ctx.update({ loading: true });
    }, delayTimer);
    await next();
    ctx.update({ loading: false });
    clearTimeout(timer);
  };

useRequest(methodInstance, {
  middleware: delayLoadingMiddleware()
});
```
