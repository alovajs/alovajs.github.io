---
title: 超时时间
sidebar_position: 60
---

## 设置全局请求超时时间

以下为设置全局的请求超时时间。

```javascript
// 全局设置请求超时时间
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // 请求超时时间，单位为毫秒，默认为0，表示永不超时
  timeout: 50000
  // highlight-end
});
```

## 设置请求级的超时时间

全局的请求超时时间作用于所有的`Method`实例，但很多时候我们需要根据特殊请求设置不同的超时时间，此时我们可以设置请求级的超时时间，它将覆盖全局的`timeout`参数

```javascript
// 请求级别的请求超时时间
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  timeout: 10000
  // highlight-end
});
```
