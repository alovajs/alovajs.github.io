---
title: 自定义method key
---

:::info 使用范围

全范围

:::

method key 用来标识一切与 method 实例关联的数据，有很大的作用，例如：

- 关联响应数据的缓存
- 标识共享请求
- 关联例如 `useRequest` 等 useHook 返回的状态值，以便通过 `updateState` 查找到对应的状态值。

在默认情况下，method key 由 method 实例的相关请求参数生成，它可以准确标识一个请求。

但有时候你希望改变它，让以上三个情况在不同的请求中也可以被识别为同一个 method。

## 自定义 method 实例 key

```javascript
// method key在创建时生成，可以通过key自定义它
const methodInst = alovaInstance.Get('/api/user', {});
methodInst.key = 'my-custom-method-key';
```

## 自定义全部 method 实例 key

method 的 key 通过`Method.prototype.generateKey`生成，你可以重写此方法来改变 method key 生成规则。

```javascript
import { Method } from 'alova';

Method.prototype.generateKey = function () {
  return 'your-custom-method-key';
};
```

还可以根据 alova 实例设置不同的生成规则。

```javascript
Method.prototype.generateKey = function () {
  if (this.context === alovaInstance1) {
    return 'alova-1-method-key';
  } else {
    // ...
  }
  return 'alova-default-method-key';
};
```
