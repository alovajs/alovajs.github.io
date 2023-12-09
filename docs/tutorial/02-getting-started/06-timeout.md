---
title: timeout
sidebar_position: 60
---

## Set global request timeout

The following is to set the global request timeout.

```javascript
// Set request timeout globally
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // Request timeout, unit is milliseconds, default is 0, which means it will never timeout
  timeout: 50000
  // highlight-end
});
```

## Set request-level timeout

The global request timeout affects all `Method` instances, but many times we need to set different timeouts based on special requests. At this time, we can set the request-level timeout, which will override the global `timeout` parameter.

```javascript
// Request timeout at request level
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  timeout: 10000
  // highlight-end
});
```
