---
title: Send request directly
sidebar_position: 20
---

:::info tips
v1.2.0+
:::

Sometimes we just want to simply make a request and do not need various states. In this case, we can directly call the `send` function of the `Method` instance, which will return a `Promise` object with return parameters.

```javascript
// Get global user information
const globalUserGetter = alovaInstance.Get('/global/user', {
  params: {
    userId: 1
  },
  transformData(rawData, headers) {
    return {
      data: rawData,
      respHeaders: headers
    };
  }
});

// The send method receives a parameter, indicating whether to force the request, the default is false
const { data, respHeaders } = await globalUserGetter.send(true);
// use data...
```

:::caution

1. The returned response data will also be processed by the global `responsed` and the `transformData` of the current `Method` instance in turn;
2. The cache mechanism is still valid. If the cache is hit, the cached data will also be returned. At this time, you can pass `true` in the `send` method to force the request;
   :::
