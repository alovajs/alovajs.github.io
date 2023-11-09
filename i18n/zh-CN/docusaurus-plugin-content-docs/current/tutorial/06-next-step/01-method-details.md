---
title: 请求方法详解
sidebar_position: 10
---

alova 实例对象提供了七种请求方法的抽象对象，包括 GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH。为了简单易用，alova 使用了和`axios`相同的参数结构。

| 实例创建函数 | 参数                                        |
| ------------ | ------------------------------------------- |
| GET          | `alovaInstance.Get(url[, config])`          |
| POST         | `alovaInstance.Post(url[, data[, config]])` |
| PUT          | `alova.Put(url[, data[, config]])`          |
| DELETE       | `alova.Delete(url[, data[, config]])`       |
| HEAD         | `alova.Head(url[, config])`                 |
| OPTIONS      | `alova.Options(url[, config])`              |
| PATCH        | `alova.Patch(url[, data[, config]])`        |

参数说明：

- `url`是请求路径，它将会与`createAlova`中的`baseURL`拼接成完整的 url 进行请求；
- `data`为请求体数据对象；
- `config`为请求配置对象，其中包含了请求头、params 参数等、请求行为参数等配置；

## config 参数说明

### 通用配置项

config 对象共有 10 项通用的配置项。

| 名称           | 描述                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------- |
| name           | method 实例 名称，它一般用于[匹配 method 实例](../next-step/method-instance-matcher)     |
| params         | 设置 url 参数，具体查看[请求方法实例](/tutorial/learning/method-instance)                |
| headers        | 设置请求头，具体查看[请求方法实例](/tutorial/learning/method-instance)                   |
| transformData  | 设置响应数据转换函数，具体查看[转换响应数据](/tutorial/learning/transform-response-data) |
| localCache     | 设置请求级的缓存模式，具体查看[缓存模式](/tutorial/learning/response-cache)              |
| timeout        | 设置请求级的超时时间                                                                     |
| enableDownload | 启用下载进度信息，具体查看[下载/上传进度](../next-step/download-upload-progress)         |
| enableUpload   | 启用上传进度信息，具体查看[下载/上传进度](../next-step/download-upload-progress)         |
| hitSource      | 缓存自动失效设置，具体查看[自动失效缓存](../next-step/auto-invalidate-cache)             |
| shareRequest   | 共享请求，具体查看[共享请求](../next-step/share-request)                                 |

### 适配器配置项

根据配置不同的 requestAdapter 而不同，如 GlobalFetch 适配器将保留了`fetch(url, config)`中 config 的全部配置项，具体支持的配置项可到不同的请求适配器文档内查看。

## 实例方法

| 名称    | 描述                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------ |
| send    | 直接发送请求，具体查看[直接发送请求](../next-step/send-request-directly)                               |
| setName | 动态设置 method 实例的名称，它一般用于在需要后置设置名称时使用，如需要在响应后根据响应数据来设置名称。 |
| abort   | 中断当前 method 实例发送的请求，它可以中断 use hook 和直接调用 send 发送的请求                         |

### setName 示例

```javascript
// 在请求成功后将数据id作为当前method的名称
onSuccess(event => {
  event.method.setName(event.data.id);
});
```
