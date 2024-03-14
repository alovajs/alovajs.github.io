---
title: alova详解
sidebar_position: 40
---

alova 实例不但可以创建不同类型的 method 实例，还可以设置全局参数，创建的 method 实例都会继承这个 alova 实例的参数。当 alova 实例的参数与 method 实例设置了相同的参数时，例如 `timeout`、`shareRequest`等，将优先使用 method 实例的参数。

接下来我们看下 alova 的全局参数。

## baseURL

设置 baseURL 后，你可以不再需要为每个请求都添加相同的 url 前缀。

```javascript
const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.dev'
  // ...
});
```

此时，创建 method 实例时只需要指定 pathname 即可。

```javascript
alovaInstance.Get('/todo/list');
```

## 全局的超时时间

以下为设置全局的请求超时时间。

```javascript
// 全局设置请求超时时间
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // 请求超时时间，单位为毫秒，默认为0，表示永不超时
  timeout: 50000
  // highlight-end
});
```

## 全局的共享请求

在全局设置共享请求。

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  shareRequest: false
  // highlight-end
});
```

## 请求适配器

在之前的章节中我们已经配置了`GlobalFetch`请求适配器，由这个 alova 实例发起的请求都将使用它发送请求。实际上，我们针对不同的 JS 环境，还提供了各种请求适配器。

- [模拟请求适配器](/tutorial/request-adapter/alova-mock)
- [XMLHttpRequest 适配器](/tutorial/request-adapter/alova-adapter-xhr)
- [axios 适配器](/tutorial/request-adapter/alova-adapter-axios)
- [uniapp 适配器](/tutorial/request-adapter/alova-adapter-uniapp)
- [taro 适配器](/tutorial/request-adapter/alova-adapter-taro)

## 全局的响应缓存

你还可以全局设置响应缓存，我们将在后面的[响应缓存](/tutorial/cache/mode)章节中详细说明。
