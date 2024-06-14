---
title: 服务端策略
---

import DocCardList from '@theme/DocCardList';

像使用组件库一样，当你需要特定的请求策略的时候学习就可以了！

以下是 server hooks 的规范，它接收 method 实例并返回一个新的 method 实例，因此可以很方便的组合多个 server hooks。

```ts
/**
 * 服务器钩子模型，表示所有服务器钩子的类型。
 * 传递一个方法或被钩住的方法实例，设置选项，返回一个被钩住的方法实例。
 * 可以继续修饰这个方法，达到多个服务器钩子组合的效果。
 */
export interface AlovaServerHook<Options extends Record<string, any>> {
  (method: Method, options: Options): Method;
}
```

## 目录

<DocCardList />
