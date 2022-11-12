---
title: 请求方法详解
sidebar_position: 10
---

`alova`实例对象提供了七种请求方法的抽象对象，包括GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH。为了简单易用，`alova`借鉴了和`axios`相同的参数结构。
- GET: `alovaInstance.Get(url[, config])`;
- POST: `alovaInstance.Post(url[, data[, config]])`;
- PUT: `alova.Put(url[, data[, config]])`;
- DELETE: `alova.Delete(url[, data[, config]])`;
- HEAD: `alova.Head(url[, config])`;
- OPTIONS: `alova.Options(url[, config])`;
- PATCH: `alova.Patch(url[, data[, config]])`;

参数说明：
- `url`是请求路径，它将会与`createAlova`中的`baseURL`拼接成完整的url进行请求；
- `data`为请求体数据对象；
- `config`为请求配置对象，其中包含了请求头、params参数等、请求行为参数等配置；


## config参数说明
固定配置项name、params、headers、transformData、localCache、timeout、enableDownload、enableUpload

其他配置项：根据配置不同的requestAdapter而不同，如GlobalFetch适配器将保留了`fetch(url, config)`中config的全部配置项