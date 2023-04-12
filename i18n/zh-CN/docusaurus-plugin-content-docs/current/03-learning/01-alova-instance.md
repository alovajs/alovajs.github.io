---
title: 了解alova实例
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip

在 [快速入门](/get-started/quick-start) 中我们初步使用了 alova 实例，如果你还未阅读 [快速入门](/get-started/quick-start)，建议你先阅读它再继续阅读这部分内容。

:::

其实，alova 实例是一个全局的请求配置，所有通过这个 alova 实例的请求都将使用它的配置信息，接下来跟着示例代码来了解这些配置吧！

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
  baseURL: 'https://api.alovajs.org',
  statesHook: VueHook,
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
  baseURL: 'https://api.alovajs.org',
  statesHook: ReactHook,
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
  baseURL: 'https://api.alovajs.org',
  statesHook: SvelteHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

在这个创建 alova 实例的代码中，分别指定了**baseURL、SvelteHook、requestAdapter**，现在我们来了解下它们：

- **baseURL**：（可选）表示请求的根路径，通过这个 alova 实例发送的请求都会在前面拼接 baseURL，一般设置为域名；
- **statesHook**：（必须）它用于确定在 use hook（例如 useRequest）应该如何返回状态化数据，目前提供了 VueHook、ReactHook、SvelteHook 分别用于支持 vue、react 和 svelte，statesHook 将会帮我们创建不同 UI 框架的请求相关的、可以被 Alova 管理的状态，包括请求状态 loading、响应数据 data、请求错误对象 error 等；
- **requestAdapter**：（必须）请求适配器，请求适配器将用于所有请求的发送，请求发送模块和具体的请求信息是解耦的。在示例代码中使用了默认提供的 **GlobalFetch**，它由`window.fetch`提供请求支持。

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
3. 在 2.0.x 及以前的版本中将`responded`错误地拼写为了`responsed`，在 2.1.0 中已将两者做了兼容处理，建议在后续版本中使用`responded`代替`responsed`。

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

## 其他

在 alova 实例中，还可以设置以下配置：

1. [响应数据的缓存模式](/learning/response-cache)，我们将在下面的章节中阐述；
2. [自定义存储适配器](/advanced/custom-storage-adapter)，它将用于持久化响应缓存，这将在高级章节中阐述；
