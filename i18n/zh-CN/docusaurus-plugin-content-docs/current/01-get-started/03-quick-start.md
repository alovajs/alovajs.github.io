---
title: 快速入门
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip 示例提示

1. 如果你还未了解 alova，强烈推荐你先阅读 [alova 概述部分](/get-started/overview)。
2. 想先尝试一下吗？可以 [点此](../example/init-page) 尝试一个简单的示例！

:::

## 安装

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install alova --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add alova
```

</TabItem>
</Tabs>

alova 结合 UI 框架，让请求变得更简单，你可以使用 alova 提供的**use hook**发起请求，它将返回例如`loading`等多个请求相关的状态化数据，并在 alova 中自动管理它们，而无需自己维护。

使用 alova 时，请确保 UI 框架符合以下版本要求：

1. React: >= v16.8
2. Vue: 2.7、3.x
3. Svelte: 任意

## 使用 useRequest 发送一个请求

首先创建一个 alova 实例，并使用这个实例创建对应的 method，把它传给 useRequest 即可。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <span v-else>responseData: {{ data }}</span>
</template>

<script setup>
  import { createAlova, useRequest } from 'alova';
  import GlobalFetch from 'alova/GlobalFetch';
  import VueHook from 'alova/vue';

  // 1. 创建alova实例
  const alovaInstance = createAlova({
    // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
    statesHook: VueHook,

    // 请求适配器，推荐使用fetch请求适配器
    requestAdapter: GlobalFetch(),

    // 全局的响应拦截器
    responded: response => response.json()
  });

  // 2. 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(
    alovaInstance.Get('https://api.alovajs.org/profile', {
      params: {
        id: 1
      }
    })
  );
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { createAlova, useRequest } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';

// 1. 创建alova实例
const alovaInstance = createAlova({
  // ReactHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: ReactHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // 全局的响应拦截器
  responded: response => response.json()
});

const app = () => {
  // 2. 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(
    alovaInstance.Get('https://api.alovajs.org/profile', {
      params: {
        id: 1
      }
    })
  );

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <span>responseData: {JSON.stringify(data)}</span>
    </>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { createAlova, useRequest } from 'alova';
  import GlobalFetch from 'alova/GlobalFetch';
  import SvelteHook from 'alova/svelte';

  // 1. 创建alova实例
  const alovaInstance = createAlova({
    // SvelteHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
    statesHook: SvelteHook,

    // 请求适配器，推荐使用fetch请求适配器
    requestAdapter: GlobalFetch(),

    // GlobalFetch适配器将会返回Response实例，
    // 你可以设置一个全局的响应拦截器返回json数据
    responded: response => response.json()
  });

  // 2. 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(
    alovaInstance.Get('https://api.alovajs.org/profile', {
      params: {
        id: 1
      }
    })
  );
</script>
{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<span>responseData: {{ data }}</span>
{/if}
```

</TabItem>
</Tabs>

### use hook 的使用规范

请注意，useRequest 的使用需要符合 use hook 使用规则，即只能在函数最外层调用。❌❌❌ 不推荐在在循环、条件判断或者子函数中调用。

例如以下在 click 回调中的使用示例，在回调函数中使用时，虽然可以正常发起请求，但 use hook 返回的响应式数据无法在视图中使用，循环和条件判断中使用也是如此。

```javascript
// ❌ bad
const handleClick = () => {
  const { loading, data } = useRequest(getter);
};

// -------
// ✅ good
const { loading, data, send } = useRequest(getter, {
  immediate: false
});
const handleClick = () => {
  send();
};
```

## 使用 method 实例发送请求

use hook 只能用于组件内发送请求，在组件外，你可以通过 method 实例直接发送请求。

```javascript
const response = await alovaInstance.Get('https://api.alovajs.org/profile?id=1').send();
```

更多关于 method 实例发送请求的内容，请前往[使用 method 实例发送请求](/next-step/send-request-directly)阅读。

关于在何时使用 useRequest 发送请求，何时使用 method 实例发送请求，请移步阅读这边的[最佳实践](/best-practice/skills)。

## 在静态 html 中使用

除了使用 esModule 的方式安装 alova 外，你还可以使用`<script>`标签的方式使用 alova。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <!-- vuehook依赖 vue，因此需先引入 vue -->
    <script src="https://unpkg.com/alova/dist/hooks/vuehook.umd.min.js"></script>
    <script>
      const alovaInstance = window.alova.createAlova({
        baseURL: 'https://api.alovajs.org',
        statesHook: window.VueHook,
        requestAdapter: window.GlobalFetch()
      });
      // ...
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

</TabItem>
<TabItem value="2" label="react">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- reacthook依赖 react，因此需先引入 react 和 react-dom -->
    <script src="https://unpkg.com/alova/dist/hooks/reacthook.umd.min.js"></script>
    <script>
      const alovaInstance = window.alova.createAlova({
        baseURL: 'https://api.alovajs.org',
        statesHook: window.ReactHook,
        requestAdapter: window.GlobalFetch()
      });
      // ...
    </script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

</TabItem>
<TabItem value="3" label="svelte">

:::tip

svelte 依赖于编译工具，不能通过 CDN 直接使用，详情见 [svelte.dev](https://svelte.dev/)

:::

</TabItem>
</Tabs>

## 接下来要做什么？

实际上，这只是一个最简单的示例代码，但 alova 还包括如请求和响应拦截器、缓存和状态管理、多个核心 use hook 等丰富的功能，我们将在后续的章节中阐述。

如果你想要更好地管理你的请求代码，这里有一个 [method 管理](/best-practice/method-manage) 的最佳实践，待你移步去阅读。
