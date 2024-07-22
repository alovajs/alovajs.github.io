---
title: 强制请求
---

强制请求是指绕过缓存的检查触发请求发送的机制，当需要在一定条件下获取最新的数据时很有用。

## 在 method 中强制请求

通过调用 method 实例的 send 函数，并传入 true 来强制请求。

```javascript
const response = await alovaInstance.Get('/api/user').send(true);
```

## 在 useHook 中强制请求

请前往[自动管理请求状态-强制请求](/tutorial/client/strategy/use-request#强制请求)中查看详情。
