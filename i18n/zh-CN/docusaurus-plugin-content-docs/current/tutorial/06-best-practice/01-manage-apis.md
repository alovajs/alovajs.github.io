---
title: method管理
sidebar_position: 10
---

在一个项目中，我们可能需要使用到成百上千个请求 api，因此管理这些请求 api 变得尤为重要。

你可能会像 [快速入门](/tutorial/getting-started/quick-start) 中的代码片段那样编写请求发送的代码，即调用 useRequest 的同时使用 alova 实例创建 method 实例。

```javascript
const { loading, data, error } = useRequest(
  alovaInstance.Get('https://api.alovajs.org/profile', {
    params: {
      id: 1
    }
  })
);
```

这只是便于初学者理解，但在实际项目中，我们并不推荐这样做，因为 method 实例的用途不仅用于发送请求，它还可以用于操作缓存和状态，上面的用法会让这些请求 api 变得难以管理，如果你认为不对的话，你可能忘记一点：

> 响应数据缓存的 key 是由 method 实例的请求方法(method)、请求地址(url)、请求头参数(headers)、url 参数(params)、请求体参数(requestBody)组合作为唯一标识，任意一个信息或位置不同都将被当做不同的 key。

因此，在实际项目中应该把 method 实例进行管理，也可以统一管理 alova 实例。

## api 文件结构

首先，你的项目需要一个统一存放 method 实例和 alova 实例的文件夹，例如叫做`api`，以下为一个常见的 api 管理结构，你也可以使用适合项目的任何结构。

```
|-api
| |-index.js -> 包含所有的alova实例
| |-methods
| | |-user.js
| | |-article.js
| | |-order.js
| | |-...
|-...
```

总之，你的项目应该使用适合的文件夹结构将它们管理起来。

> 接下来以 vue 为例展示示例代码

## 管理 alova 实例

你的项目可能需要和不同的服务器通信，也可能需要在特定的请求中使用特殊的请求方案，或者使用不同的响应拦截器等，这些都需要在项目中创建并维护多个 alova 实例，建议可以使用一个单独的文件来管理它们，例如在上面的 api 管理结构中，将使用`api/index.js`来管理。

```javascript title=api/index.js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import GlobalFetch from 'alova/GlobalFetch';
import { axiosRequestAdapter } from '@alova/adapter-axios';

// user alova instance
export const userAlova = createAlova({
  baseURL: 'https://api-user.alovajs.org',
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  async responded(method) {
    method.config.headers.token = 'user token';
  }
});

// order alova instance
export const orderAlova = createAlova({
  baseURL: 'https://api-order.alovajs.org',
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  async responded(method) {
    method.config.headers.token = 'order token';
  }
});

// upload alova instance
export const uploadAlova = createAlova({
  baseURL: 'https://api-order.alovajs.org',
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter()
});
```

## 管理 method 实例

我们可以使用不同的 js 文件将 method 实例分类管理，例如上面的 api 管理结构中，将使用`api/methods/user.js`来管理用户信息相关的 method 实例，用`api/methods/order.js`管理订单相关的 method 实例。

此外，在上文中提到过一点，method 实例除了用于发送请求外，还可以用于操作缓存和状态，为了确保请求参数的个数和顺序，我们可以使用一个函数来对应一个请求 api，通过传入请求参数的形式来返回对应的 method 实例，只要传入参数是相同的，method 实例的请求信息和参数顺序也是相同的，这样就可以确保用于操作缓存和状态的 method 实例不出错。

```javascript title=api/methods/user.js
import { userAlova } from '..';

// 获取用户信息
export const getUserInfo = id => userAlova.Get('/user/' + id);

// 编辑用户信息
export const editUserInfo = (name, age, mobile) =>
  userAlova.Post('/user', {
    name,
    age,
    mobile
  });

// 移除用户
export const removeUser = id => userAlova.Delete('/user/' + id);

// ...
```

在**user 组件**中可以直接导入 method 函数进行使用，并且可以在调用`invalidateCache`再次使用 method 函数来失效对应的缓存。

```html title=views/user.vue
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <template v-else>
    <div>
      <label>name:</label>
      <input v-model="data.name" />
    </div>
    <div>
      <label>age:</label>
      <input v-model="data.age" />
    </div>
    <div>
      <label>mobile:</label>
      <input v-model="data.mobile" />
    </div>
    <button
      @click="handleEdit"
      :loading="editing">
      Edit
    </button>
  </template>
</template>
<script setup>
  import { getUserInfo, editUserInfo } from '@/api/methods/user';
  import { useRequest, invalidateCache } from 'alova';

  const userId = 1; // 使用1作为userId
  const { loading, error, data } = useRequest(getUserInfo(userId));

  // 提交编辑信息
  const {
    loading: editing,
    send: handleEdit,
    onSuccess
  } = useRequest(() => editUserInfo(data.name, data.age, data.mobile), {
    immediate: false
  });
  onSuccess(() => {
    invalidateCache(getUserInfo(userId));
  });
</script>
```
