---
title: Manage APIs
---

In a project, we may need to use hundreds or thousands of request APIs, so managing these request APIs becomes particularly important.

You may write request code like the snippet in the [quick start](/tutorial/getting-started/quick-start), with all the code in one file.

```javascript
const { loading, data, error } = useRequest(
  alovaInstance.Get('https://api.alovajs.org/profile', {
    params: {
      id: 1
    }
  })
);
```

This is only for beginners to understand. In real projects, we do not recommend it, because a method instance is used not only to send requests but also to operate on cache and state. The usage above makes these request APIs unmanageable, and you might overlook one important detail:

> The response data cache key is uniquely identified by combining the method instance's request method (method), request URL (url), request headers (headers), url parameters (params), and request body (requestBody). Otherwise, a different position will be treated as a different key.

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

Your project may need to communicate with different servers, or you may need to use special request schemes in specific requests, or use different response interceptors, etc. All of these require creating and maintaining multiple alova instances in the project. It is recommended to use a separate file to manage them; for example, in the api management structure above, `api/index.js` is used to manage them.

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
  async beforeRequest(method) {
    method.config.headers.token = 'user token';
  }
});

// order alova instance
export const orderAlova = createAlova({
  baseURL: 'https://api-order.alovajs.org',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  async beforeRequest(method) {
    method.config.headers.token = 'order token';
  }
});

// upload alova instance
export const uploadAlova = createAlova({
  baseURL: 'https://api-upload.alovajs.org',
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter()
});
```

## Manage method instances

We can use different js files to classify and manage method instances. For example, in the api management structure above, `api/methods/user.js` manages method instances related to user information, and `api/methods/order.js` manages method instances related to order management.

In addition, as mentioned above, method instances do more than send requests; they also operate on caches and states. To keep the number and order of request parameters consistent, map each request API to a function that returns the corresponding method instance based on the incoming request parameters. As long as the incoming parameters are the same, the method instance's request info and parameter order stay the same, which ensures that the correct method instance is used for cache and state operations.

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
  import { useRequest, invalidateCache } from 'alova/client';

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
