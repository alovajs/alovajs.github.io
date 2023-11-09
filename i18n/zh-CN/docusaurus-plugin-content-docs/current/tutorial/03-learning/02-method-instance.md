---
title: 请求方法实例
sidebar_position: 20
---

在 alova 中，每个请求都对应一个 method 实例，它描述了一次请求的 url、请求头、请求参数，以及响应数据处理、缓存数据处理等请求行为参数。通过 method 实例，你可以在任意的 js 环境下感受到统一的使用体验，只需要非常少的改动就可以正常运行起来，同时 method 实例将请求参数和请求行为参数放在了一起，更便于 api 的管理，而不是分散在多个代码文件中。

## 创建实例

method 实例的创建也和 axios 的请求发送函数非常类似，你需要使用上一节中创建的 alova 实例来创建 method 实例，下面我们先来创建一个获取 todo 列表的 Method 实例。

```javascript
// 创建一个Get实例，描述一次Get请求的信息
const todoListGetter = alovaInstance.Get('/todo/list', {
  // 请求头
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // params参数将会以?的形式拼接在url后面
  params: {
    userId: 1
  }
});
```

接着再创建一个提交 todo 项的 POST 请求 Method 实例，此时第二个参数传入的是 request body。

```javascript
// 创建Post实例
const createTodoPoster = alovaInstance.Post(
  '/todo/create',
  // 第二个参数是http body数据
  {
    title: 'test todo',
    time: '12:00'
  },
  // 第三个参数是请求配置相关信息
  {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
      // ...
    }
  }
);
```

> ⚠️ 注意：`Method`实例里只是保存了请求所需要的信息，它不会发出请求，而是需要通过`use hook`发送请求（后续将详细讲解），或使用`methodInstance.send`发送请求，这点与`axios`不同。

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

## 请求方法类型

`Alova`提供了包括 GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH 七种请求方法的抽象实例，具体的使用方式可以阅读 [请求方法详解](/tutorial/next-step/method-details)。

## 请求行为参数

除了设置请求参数外，`method`实例还可以设置请求行为参数，以下是支持的请求行为参数，也将在后面的章节中详细讲解。

| 名称           | 描述                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------- |
| name           | method 实例 名称，它一般用于[匹配 method 实例](/tutorial/next-step/method-instance-matcher) |
| transformData  | 设置响应数据转换函数，具体查看[转换响应数据](/tutorial/learning/transform-response-data)    |
| localCache     | 设置请求级的缓存模式，具体查看[缓存模式](/tutorial/learning/response-cache)                 |
| enableDownload | 启用下载进度信息，具体查看[下载/上传进度](/tutorial/next-step/download-upload-progress)     |
| enableUpload   | 启用上传进度信息，具体查看[下载/上传进度](/tutorial/next-step/download-upload-progress)     |
| hitSource      | 缓存自动失效设置，具体查看[自动失效缓存](/tutorial/next-step/auto-invalidate-cache)         |
| shareRequest   | 共享请求，具体查看[共享请求](/tutorial/next-step/share-request)                             |

## 设置请求适配器支持的参数

method 实例的配置参数除了[10 项通用配置项](/tutorial/next-step/method-details)外，还可以配置对应请求适配器支持的参数，例如，在[了解 alova 实例的章节](/tutorial/learning/alova-instance)中，我们内置并推荐了`GlobalFetch`作为 alova 的请求适配器，它内部将会通过`fetch`函数发送请求。此时你还可以在`method`实例上配置任何`fetch`支持的参数，这些参数会在请求时传给`fetch`函数。

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  credentials: 'same-origin',
  referrerPolicy: 'no-referrer',
  mode: 'cors'
  // highlight-end
});
```

以上`method`实例在通过`fetch`发送请求时，将会以以下参数请求。

```javascript
fetch('/todo/list', {
  // ...
  // highlight-start
  credentials: 'same-origin',
  referrerPolicy: 'no-referrer',
  mode: 'cors'
  // highlight-end
});
```

在扩展中，我们还提供了[XMLHttpRequest 适配器](/tutorial/extension/alova-adapter-xhr)、[axios 适配器](/tutorial/extension/alova-adapter-axios)、[Uniapp 适配器](/tutorial/extension/alova-adapter-uniapp)、[Taro 适配器](/tutorial/extension/alova-adapter-taro)等，每个适配器也有它们支持的参数。
