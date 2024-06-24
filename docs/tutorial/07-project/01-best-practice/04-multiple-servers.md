---
title: Multiple servers
---

If your project needs to request multiple servers, you can create multiple alova instances to correspond to different servers. In order to easily distinguish between different environments, you can also use environment variables to manage the hosts of multiple servers.

```ts
import { createAlova } from '@alova/core';

//Create user-related alova instance
const userAlova = createAlova({
  baseURL: VITE_API_USER
});

//Create order-related alova instances
const alova2 = createAlova({
  baseURL: VITE_API_ORDER
});
```
