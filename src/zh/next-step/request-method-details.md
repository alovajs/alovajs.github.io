---
title: 请求方法详解
order: 10
---

`Alova`实例对象提供了七种请求方法的抽象对象，包括GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH。
- GET: `alova.Get(url[, config])`;
- POST: `alova.Post(url[, data[, config]])`;
- PUT: `alova.Put(url[, data[, config]])`;
- DELETE: `alova.Delete(url[, data[, config]])`;
- HEAD: `alova.Head(url[, config])`;
- OPTIONS: `alova.Options(url[, config])`;
- PATCH: `alova.Patch(url[, data[, config]])`;

参数说明：
- `url`是请求路径，它将会与`createAlova`中的`baseURL`拼接成完整的url进行请求；
- `data`为请求体数据对象；
- `config`为请求配置对象，其中包含了请求头、params参数等、请求行为参数等配置；