---
title: 入门
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在接下来的入门指南中，我们将以待办事项（todo）为例，围绕着获取不同日期的待办事项列表、查看 todo 详情，以及创建、编辑、删除事项等需求进行`alova`的讲解。让我们开始吧！

## 创建 Alova 实例

一个 alova 实例是使用的开端，所有的请求都需要从它开始。它的写法类似`axios`，以下是一个最简单的 alova 实例的创建方法。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
const alovaInstance = createAlova({
  // 假设我们需要与这个域名的服务器交互
  baseURL: 'https://api.alovajs.org',

  // VueHook可以帮我们用vue的ref函数创建请求相关的，可以被Alova管理的状态，包括请求状态loading、响应数据data、请求错误对象error等（后续详细介绍）
  statesHook: VueHook,

  // 请求适配器，我们推荐并提供了fetch请求适配器
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="2" label="react">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
const alovaInstance = createAlova({
  // 假设我们需要与这个域名的服务器交互
  baseURL: 'https://api.alovajs.org',

  // ReactHook可以帮我们调用useState创建请求相关的，可以被Alova管理的状态，包括请求状态loading、响应数据data、请求错误对象error等（后续详细介绍）
  statesHook: ReactHook,

  // 请求适配器，我们推荐并提供了fetch请求适配器
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="3" label="svelte">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';
const alovaInstance = createAlova({
  // 假设我们需要与这个域名的服务器交互
  baseURL: 'https://api.alovajs.org',

  // SvelteHook可以帮我们调用writable创建请求相关的，可以被Alova管理的状态，包括请求状态loading、响应数据data、请求错误对象error等（后续详细介绍）
  statesHook: SvelteHook,

  // 请求适配器，我们推荐并提供了fetch请求适配器
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

## 设置全局请求拦截器

通常，我们需要让所有请求都用上相同的配置，例如添加 token、timestamp 到请求头，`alova`为我们提供了全局的请求拦截器，它将在请求前被触发，我们可以在此拦截器中统一设置请求参数，这也与`axios`相似。

```javascript
const alovaInstance = createAlova({
  // ...
  // 函数参数为一个method实例，包含如url、params、data、headers等请求数据
  // 你可以自由修改这些数据
  // highlight-start
  beforeRequest(method) {
    // 假设我们需要添加token到请求头
    method.config.headers.token = 'token';
  }
  // highlight-end
});
```

你也可以将 beforeRequest 设置为异步函数。

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  async beforeRequest(method) {
    // 执行一些异步任务
    // ...
  }
  // highlight-end
});
```

> 详细的请求方法实例介绍将在下一节中讲解

## 设置全局响应拦截器

:::info responsed 和 responded 兼容

在 2.0.x 及以前的版本中将`responded`错误地拼写为了`responsed`，在 2.1.0 中已将两者做了兼容处理，建议在后续版本中使用`responded`代替`responsed`。

:::

当我们希望统一解析响应数据、统一处理错误时，此时可以在创建`alova`实例时指定全局的响应拦截器，这同样与`axios`相似。响应拦截器包括请求成功的拦截器和请求失败的拦截器。

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // 使用数组的两个项，分别指定请求成功的拦截器和请求失败的拦截器
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.code !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json.message);
      }

      // 解析的响应数据将传给method实例的transformData钩子函数，这些函数将在后续讲解
      return json.data;
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (err, method) => {
      alert(error.message);
    }
  }
  // highlight-end
});
```

如果不需要设置请求失败的拦截器，可以直接传入请求成功的拦截器函数，而不再需要通过对象来设置回调。

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  async responded(response, method) {
    // 请求成功的拦截器
  }
  // highlight-end
});
```

:::caution 特别注意

1. `onSuccess`和`onError`均可以设为同步函数和异步函数。
2. onError 回调是请求错误的捕获函数，当捕获错误但没有抛出错误或返回 reject 状态的 Promise 实例，将认为请求是成功的，且不会获得响应数据。

:::

## 设置全局请求超时时间

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
