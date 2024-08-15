---
title: Migrate from axios
---

Benefits of this migration guide:

- Minimal changes: You only need to create an Alova instance, and other code can be changed slowly.

- Gradual migration: You can migrate one interface at a time without having to rewrite all the code at once.

- Maintain consistency: Use the existing axios instance, and the original configuration and interceptor are still valid.

- Coexistence of the old and the new: During the migration process, axios and Alova can be used at the same time without affecting each other.

## Migration steps

### 1. Install the package

First, install alova and its axios adapter:

```bash
# npm
npm install alova @alova/adapter-axios

# yarn
yarn add alova @alova/adapter-axios

# pnpm
pnpm install alova @alova/adapter-axios

```

### 2. Create an alova instance

Use your existing axios instance to create an alova instance:

```javascript
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import axiosInstance from './your-axios-instance'; // your existing axios instance

const alovaInst = createAlova({
  statesHook, // VueHook / ReactHook / SvelteHook
  requestAdapter: axiosRequestAdapter({
    axios: axiosInstance
  })
});
```

### 3. Keep the existing code unchanged

For the parts that you don't want to change for the time being, continue to use the original axios method without any changes.

Now, you can use the method instance of alova.

```js
const getUser = id => alovaInst.Get(`/user/${id}`);

// Use in components
const { loading, data, error } = useRequest(getUser(userId));
```

### 4. Gradually migrate requests

If you pursue a unified user experience, you can also gradually rewrite axios requests to alova requests. Just replace methods such as `axios.get` and `axios.post` with `alovaInst.Get` and `alovaInst.Post`.

```javascript
// Original get request
const todoList = id => axios.get('/todo');
// After change
const todoList = id => alovaInst.Get('/todo');

// Original post request
const todoList = data =>
  axios.post('/todo', data, {
    responseType: 'json',
    responseEncoding: 'utf8'
  });
// After change
const todoList = data =>
  alovaInst.Post('/todo', data, {
    responseType: 'json',
    responseEncoding: 'utf8'
  });
```
