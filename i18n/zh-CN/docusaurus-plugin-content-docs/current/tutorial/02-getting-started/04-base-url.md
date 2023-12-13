---
title: 设置baseURL
sidebar_position: 40
---

设置 baseURL 后，你可以不再需要为每个请求都添加相同的 url 前缀。

```javascript
const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.dev'
  // ...
});
```

此时，创建 method 实例时只需要指定 pathname 即可。

```javascript
alovaInstance.Get('/todo/list');
```
