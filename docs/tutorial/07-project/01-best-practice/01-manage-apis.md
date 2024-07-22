---
title: Manage APIs
---

In a project, we may need to use hundreds or thousands of request APIs, so managing these request APIs becomes particularly important.

You may write the request code like the code snippet in [quick start](/tutorial/getting-started/quick-start). all codes in one file.

```javascript
const { loading, data, error } = useRequest(
  alovaInstance.Get('https://api.alovajs.org/profile', {
    params: {
      id: 1
    }
  })
);
```

This is just for beginners to understand, but in actual projects, we do not recommend this, because the method instance is not only used to send requests, it can also be used to operate cache and state, the above usage will make these request api become It's unmanageable, and if you think it's wrong, you might forget a little:

> The key of the response data cache is uniquely identified by the combination of the method instance’s request method (method), request address (url), request header parameters (headers), url parameters (params), and request body parameters (requestBody). Or different positions will be treated as different keys.

Therefore, in actual projects, method instances should be managed, and alova instances can also be managed uniformly.

## api file structure

First of all, your project needs a folder that uniformly stores method instances and alova instances, for example called `api`, the following is a common api management structure, and you can also use any structure suitable for the project.

```
|-api
| |-index.js -> contains all alova instances
| |-methods
| | |-user.js
| | |-article.js
| | |-order.js
| | |-...
|-...
```

In short, your project should use a suitable folder structure to organize them.

> Next, take vue as an example to show the sample code

## Manage alova instance

Your project may need to communicate with different servers, or you may need to use special request schemes in specific requests, or use different response interceptors, etc. All of these require creating and maintaining multiple alova instances in the project. It is recommended to Use a separate file to manage them, for example in the above api management structure, will use `api/index.js` to manage.

```javascript title=api/index.js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import adapterFetch from 'alova/fetch';
import { axiosRequestAdapter } from '@alova/adapter-axios';

// user alova instance
export const userAlova = createAlova({
  baseURL: 'https://api-user.alovajs.org',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  async responded(method) {
    method.config.headers.token = 'user token';
  }
});

// order alova instance
export const orderAlova = createAlova({
  baseURL: 'https://api-order.alovajs.org',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
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

## Manage method instances

We can use different js files to classify and manage method instances. For example, in the above api management structure, `api/methods/user.js` will be used to manage method instances related to user information, and `api/methods/order.js` will be used `A method instance related to order management.

In addition, as mentioned above, in addition to sending requests, method instances can also be used to operate caches and states. In order to ensure the number and order of request parameters, we can use a function to correspond to a request API, through The corresponding method instance is returned in the form of incoming request parameters. As long as the incoming parameters are the same, the request information and parameter order of the method instance are also the same, so as to ensure that the method instance used to operate the cache and state is correct.

```javascript title=api/methods/user.js
import { userAlova } from '..';

// Get user information
export const getUserInfo = id => userAlova.Get('/user/' + id);

// Edit user information
export const editUserInfo = (name, age, mobile) =>
  userAlova.Post('/user', {
    name,
    age,
    mobile
  });

// remove user
export const removeUser = id => userAlova.Delete('/user/' + id);

//...
```

In the **user component**, the method function can be directly imported for use, and the method function can be used again to invalidate the corresponding cache after calling `invalidateCache`.

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

  const userId = 1; // use 1 as userId
  const { loading, error, data } = useRequest(getUserInfo(userId));

  // Submit edit information
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
