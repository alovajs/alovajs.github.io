---
title: 请求类型和参数
sidebar_position: 30
---

在 alova 中，每个请求都对应一个 method 实例，它描述了一次请求的 url、请求头、请求参数，以及请求行为参数等，它是一个 PromiseLike 实例，所以可以使用 `await alovaInstance.Get(...)` 来触发请求。

接下来我们先来看下请求类型。

## 请求类型

alova 提供了 GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH 7 种请求类型。

| 实例创建函数 | 参数                                          |
| ------------ | --------------------------------------------- |
| GET          | `alovaInstance.Get(url[, config])`            |
| POST         | `alovaInstance.Post(url[, data[, config]])`   |
| PUT          | `alovaInstance.Put(url[, data[, config]])`    |
| DELETE       | `alovaInstance.Delete(url[, data[, config]])` |
| HEAD         | `alovaInstance.Head(url[, config])`           |
| OPTIONS      | `alovaInstance.Options(url[, config])`        |
| PATCH        | `alovaInstance.Patch(url[, data[, config]])`  |

参数说明：

- `url`是请求路径，它将会与`createAlova`中的`baseURL`拼接成完整的 url 进行请求；
- `data`为请求体数据对象；
- `config`为请求配置对象，其中包含了请求头、params 参数等、请求行为参数等配置；

## 请求参数

例如，创建一个获取 todo 列表的 GET 请求 method 实例如下，它指定了请求头和 params 参数，params 参数会在 url 后面以?的形式拼接。

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  params: {
    userId: 1
  }
});
```

接着再创建一个提交 todo 项的 POST 请求 Method 实例，此时第二个参数传入的是 request body，值得注意的是，POST 请求也可以传入 params 参数。

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

## 设置请求适配器支持的参数

除了请求头、params 参数等外，还支持配置对应请求适配器支持的参数，当使用`GlobalFetch`作为 alova 的请求适配器时，就可以在`method`实例上配置任何`fetch API`支持的参数，这些参数会在请求时传给`fetch`函数。

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
