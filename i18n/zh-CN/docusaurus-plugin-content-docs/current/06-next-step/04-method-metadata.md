---
title: method元数据
sidebar_position: 35
---

:::info 版本要求

v2.7.0+

:::

method 实例是贯穿 alova 的整个请求生命周期的，并且，在项目中会大量存在不同的 method 实例，有时候我们需要对特定的 method 实例添加附加信息，以便于对它们进行身份标识或额外的信息传递等，此时，我们就需要使用 method 元数据。

## 使用元数据标识身份

例如，你的项目中大部分接口在每次请求时需附带`token`，但还存在一些接口无需验证的，可能你会在全局的`beforeRequest`函数中统一处理它们。

```javascript
const nonvalidateRequiredApi = [
  '/api/url1',
  '/api/url2',
  '/api/url3'
  // ...
];

createAlova({
  beforeRequest(method) {
    if (!nonvalidateRequiredApi.includes(method.url)) {
      method.config.headers.token = '...';
    }
  }
});
```

这将导致以下两个问题：

1. 信息没有与 method 实例聚合，可维护性更差；
2. 编码更麻烦；

为解决这两个问题，我们将使用元数据的方式，在创建特定的 method 实例时对它进行标识。

**在创建 method 实例时定义元数据**

```javascript
const loginAPI = (username, password) => {
  const methodInstance = alovaInst.Post('/login', {
    username,
    password
  });
  methodInstance.meta = {
    ignoreToken: true
  };
  return methodInstance;
};
```

**在`beforeRequest`中通过元数据作为判断依据。**

```javascript
createAlova({
  beforeRequest(method) {
    if (!method.meta.ignoreToken) {
      method.config.headers.token = '...';
    }
  }
});
```

这种方式还可以用于在全局的`responded`中， 你可以在响应成功或响应失败时使用不同的元数据分别处理不同的响应。

## 使用元数据传递信息

在某种情况下，如果你希望为不同的 method 实例添加附加信息，以便在其他地方使用，也可以使用元数据进行保存。以统一生成不同的 method 实例 id 为例。

```javascript
createAlova({
  beforeRequest(method) {
    if (!method.meta.generateId) {
      method.meta.uid = generateUUID();
    }
  },

  responded: {
    onSuccess(response, method) {
      // 在请求成功中访问当前method生成的meta数据
      const currentMethodUID = method.meta.uid;
    },
    onError(error, method) {
      // 在请求失败中访问当前method生成的meta数据
      const currentMethodUID = method.meta.uid;
    }
  }
});
```

## 注意事项

在非 typescript 环境下，你可以使用任意一个属性作为信息载体，而不局限于`meta`属性。

```javascript
methodInstance.showResponseMsg = true;
methodInstance.others = 'abc';
```

只是在 typescript 环境下，任意的属性名将会报`不存在属性“$0”。ts(2339)`，因此在类型中我们指定了`meta`属性作为信息载体。
