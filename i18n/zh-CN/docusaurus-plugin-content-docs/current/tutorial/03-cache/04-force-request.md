---
title: 强制请求
sidebar_position: 40
---

强制请求是指即使命中了缓存也会发送请求，在某些情况下需要绕过缓存获取实时数据。

## 在 useHook 设置静态值

force 默认为 false，设置为 true 时将每次穿透缓存，并发送请求

```javascript
useFetcher({ force: true });
```

### 动态设置 force 值

实际情况中，我们经常需要根据不同情况来设置是否需要强制发送请求，此时可以将 force 设置为一个函数，此函数可通过 fetch 函数传入。

```javascript
useFetcher({
  force: isForce => {
    return isForce;
  }
});
```
