---
title: Set baseURL
sidebar_position: 40
---

After setting the baseURL, you can no longer need to add the same url prefix to each request.

```javascript
const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.dev'
  // ...
});
```

now, you can create method instance without prefix url.

```javascript
alovaInstance.Get('/todo/list');
```
