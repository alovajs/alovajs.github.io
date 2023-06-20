---
title: 使用method实例发送请求
sidebar_position: 30
---

## 发送请求

:::info 提示
v1.2.0+
:::

有时候我们只想要简单地发出请求，而不是通过 use hook 的形式获得各种响应状态，或者在组件外发送请求，此时可以直接调用`Method`实例的`send`函数即可，它将返回一个带返回参数的`Promise`对象。

```javascript
// 获取全局的用户信息
const globalUserGetter = alovaInstance.Get('/global/user', {
  params: {
    userId: 1
  },
  transformData(rawData, headers) {
    return {
      data: rawData,
      respHeaders: headers
    };
  }
});

// send方法接收一个参数，表示是否强制请求，默认为false
const { data, respHeaders } = await globalUserGetter.send(true);
// 使用数据...
```

:::caution 注意

1. 返回的响应数据也会依次被全局的 responded 拦截器和当前`Method`实例的`transformData`处理；
2. 缓存机制依然有效，如果命中缓存也会返回缓存数据，此时可以在`send`方法中传入`true`来强制发起请求；

:::

关于在何时使用 `useRequest` 发送请求，何时使用 method 实例发送请求，请移步阅读这边的[最佳实践](/best-practice/skills)。

## 中断请求

:::info 提示

v2.6.0+

:::

如果需要中断`method.send`发送的请求，可以通过通过以下方式中断。

```javascript
globalUserGetter.abort();
```

值得注意的是，中断请求的 method 实例必须与发送请求的 method 实例是同一个引用。

`[v2.6.2+]`另外，你还可以在`beforeRequest`中调用`abort`中断请求。

```javascript
const alovaInst = createAlova({
  // ...
  beforeRequest(method) {
    if (someCondition) {
      method.abort();
    }
  }
});
```
