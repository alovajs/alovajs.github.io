---
title: 自定义method key
sidebar_position: 50
---

:::info version required

v2.20.0+

:::

method key 用来标识一切与 method 实例关联的数据，有很大的作用，例如：

- 关联响应数据的缓存
- 标识共享请求
- 关联 useRequest 等 useHook 返回的状态值

在默认情况下，method key 由 method 实例的相关请求参数生成，它可以准确标识一个请求。

但有时候你希望改变它，让以上三个情况在不同的请求中也可以被识别为同一个 method。

```javascript
// method key在创建时生成，可以通过__key__自定义它
const methodInst = alovaInstance.Get('/api/user', {});
methodInst.__key__ = 'my-custom-method-key';
```
