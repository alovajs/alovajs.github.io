---
title: 直接发送请求
order: 20
---

::: info 提示
v1.2.0+
:::

有时候我们只想要简单地发出请求，并不需要各种状态，此时可以直接调用`Method`对象的`send`函数即可，它将返回一个带返回参数的`Promise`对象。
```javascript
// 获取全局的用户信息
const globalUserGetter = alova.Get('/global/user', {
  params: {
    userId: 1,
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
⚠️需要注意的是：
1. 返回的响应数据也会依次被全局的`responsed`和当前`Method`对象的`transformData`处理；
2. 缓存机制依然有效，如果命中缓存也会返回缓存数据，此时可以在`send`方法中传入`true`来强制发起请求；