---
title: 从axios迁移
---

本迁移指南的优势：

- 最小改动: 只需创建 alova 实例，其他代码可以慢慢改。
- 渐进迁移: 可以一个接口一个接口地迁移,不必一次性重写所有代码。
- 保持一致性: 使用现有的 axios 实例,原有配置和拦截器仍然有效。
- 新老并存: 迁移过程中，axios 和 alova 可以同时使用，互不影响。

## 迁移步骤

### 1. 安装包

首先，安装 alova 和 它的 axios 适配器:

```bash
# npm
npm install alova @alova/adapter-axios

# yarn
yarn add alova @alova/adapter-axios

# pnpm
pnpm install alova @alova/adapter-axios
```

### 2. 创建 alova 实例

使用你现有的 axios 实例创建 alova 实例:

```javascript
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';
import axiosInstance from './your-axios-instance'; // 你现有的 axios 实例

const alovaInst = createAlova({
  statesHook, // VueHook / ReactHook / SvelteHook
  requestAdapter: axiosRequestAdapter({
    axios: axiosInstance
  })
});
```

### 3. 保持现有代码不变

对于暂时不想改动的部分，继续使用原有的 axios 方式，不需要任何改动。

现在，你已经可以使用 alova 的 method 实例了。

```js
const getUser = id => alovaInst.Get(`/user/${id}`);

// 在组件中使用
const { loading, data, error } = useRequest(getUser(userId));
```

### 4. 逐步迁移请求

如果你追求统一的使用体验，你也可以开始逐步将 axios 请求改写为 alova 请求，只需要将`axios.get`、`axios.post`等方法替换为`alovaInst.Get`、`alovaInst.Post`等就可以了。

```javascript
// 原来的get请求
const todoList = id => axios.get('/todo');
// 更改后
const todoList = id => alovaInst.Get('/todo');

// 原来的post请求
const todoList = data =>
  axios.post('/todo', data, {
    responseType: 'json',
    responseEncoding: 'utf8'
  });
// 更改后
const todoList = data =>
  alovaInst.Post('/todo', data, {
    responseType: 'json',
    responseEncoding: 'utf8'
  });
```
