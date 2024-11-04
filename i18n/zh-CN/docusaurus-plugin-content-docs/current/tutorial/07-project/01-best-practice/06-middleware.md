---
title: 常用中间件实践
---

## 延迟更新 loading

当响应非常快的时候，加载状态会出现一次闪烁，这给会用户带来糟糕的体验，延迟更新 loading 可以让加载状态在一段时间后才显示，如果在这段时间内完成响应则不会出现加载状态。我们来实现一个带延迟更新 loading 的 middleware。

```javascript
const delayLoadingMiddleware =
  (delayTimer = 1000) =>
  async (ctx, next) => {
    const { loading } = ctx.proxyStates;

    // 自行控制loading
    ctx.controlLoading();

    // 延迟特定时间更新
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
