---
title: 多服务器
sidebar_position: 40
---

如果你的项目需要请求多个服务器，可以创建多个 alova 实例来分别对应不同的服务器，为了便于区分不同的环境，也可以使用环境变量来管理多个服务器的 host。

```ts
import { createAlova } from '@alova/core';

// 创建user相关的alova实例
const userAlova = createAlova({
  baseURL: VITE_API_USER
});

// 创建order相关的alova实例
const alova2 = createAlova({
  baseURL: VITE_API_ORDER
});
```
