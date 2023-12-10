---
title: cache logger
sidebar_position: 60
---

:::info version required

v2.8.0+

:::

In order to facilitate debugging when using the interface cache, when the request hits the cache without sending a network request, the hit cache information will be printed on the console by default, which can solve some confusion when using the cache.

If you don't want to print cache information or custom control print cache information in some cases (such as production environment), alova also provides support for them.

## Turn off printing cache logger

Console printing can be turned off by setting `cacheLogger` to `false or null` when creating an alova instance.

```javascript
const alovaInstance = createAlova({
  //...
  cacheLogger: false
});
```

You can also dynamically turn it on and off according to different environments.

```javascript
const alovaInstance = createAlova({
  //...
  // Enable cache logger in the development environment
  cacheLogger: process.env.NODE_ENV === 'development'
});
```

## Custom print cache logger

The cache logger is printed via `console.log` by default. If `console.log` or other purposes are not supported in your project environment, `cacheLogger` can be specified as a function to customize the logger for processing cache hits.

```javascript
const alovaInstance = createAlova({
  //...
  /**
   * Custom cache logger function
   * @param response hit cache data
   * @param method the current method instance
   * @param cacheMode cache mode memory or restore
   * @param tag The tag in the restore mode has a value only when the tag is set in the corresponding cache
   */
  cacheLogger(response, method, cacheMode, tag) {
    saveHitCache({
      response,
      method,
      cacheMode,
      tag
    });
  }
});
```
