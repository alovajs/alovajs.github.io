---
title: 快速入门
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";
import { quickStartVue, quickStartReact, quickStartVueOptions, quickStartStaticVue, quickStartStaticReact, quickStartStaticVueOptions, quickStartMethodVue, quickStartMethodReact, quickStartMethodVueOptions } from './lives';

:::tip 示例提示

1. 如果你还未了解 alova，强烈推荐你先阅读 [alova 概述部分](/tutorial/get-started/overview)。
2. 想先尝试一下吗？可以 [点此](/tutorial/example/init-page) 尝试一个简单的示例！

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

## 首先，创建一个 alova 实例

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // GlobalFetch适配器将会返回Response实例，
  // 你可以设置一个全局的响应拦截器返回json数据
  responded: response => response.json()
});
```

</TabItem>
<TabItem value="2" label="react">

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  // ReactHook用于创建react状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: ReactHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // GlobalFetch适配器将会返回Response实例，
  // 你可以设置一个全局的响应拦截器返回json数据
  responded: response => response.json()
});
```

</TabItem>
<TabItem value="3" label="svelte">

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  // SvelteHook用于创建writable状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: SvelteHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // GlobalFetch适配器将会返回Response实例，
  // 你可以设置一个全局的响应拦截器返回json数据
  responded: response => response.json()
});
```

</TabItem>
<TabItem value="4" label="vue options">

在 vue options 风格中使用，需要额外安装`@alova/vue-options`包。

```js
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import { VueOptionsHook } from '@alova/vue-options';

export const alovaInstance = createAlova({
  // VueOptionsHook用于创建状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueOptionsHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // GlobalFetch适配器将会返回Response实例，
  // 你可以设置一个全局的响应拦截器返回json数据
  responded: response => response.json()
});
```

</TabItem>

</Tabs>

## 直接发送 get 请求

然后，你可以使用 alova 实例直接发送请求了，请求参数的设置方法与 axios 相似，但不同的是 alova 需要再调用`send`函数发送请求，如果你熟悉 axios，这应该很好理解。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={quickStartMethodVue} editorHeight={400} containBaseURL={false} />

</TabItem>

<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={quickStartMethodReact} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { alovaInstance } from './api';

  let data = null;
  alovaInstance
    .Get('https://jsonplaceholder.typicode.com/todos/1')
    .send()
    .then(response => {
      data = response;
    });
</script>
<span>responseData: { data }</span>
```

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" deps="vue-options" mainFile={quickStartMethodVueOptions} editorHeight={400} containBaseURL={false} />

</TabItem>
</Tabs>

更多关于 method 实例发送请求的内容，请前往[使用 method 实例发送请求](/tutorial/next-step/send-request-directly)阅读。

## 使用 useRequest 发送一个请求

但是，上面的仅仅只是开始。在企业级项目中，请求往往不会如此简单，我们还需要显示请求状态、上传下载状态、处理请求错误等，为了更简单地实现企业级的需求，alova 结合 UI 框架，让请求变得更简单，你可以使用 alova 提供的**useHooks**发起请求，它将返回例如`loading`等多个请求相关的状态化数据，并在 alova 中自动管理它们，而无需自己维护。

> 使用 useRequest 发送请求时不需要调用`send`函数。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={quickStartVue} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={quickStartReact} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { createAlova, useRequest } from 'alova';
  import { alovaInstance } from './api';

  // 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1'));
</script>

{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<span>responseData: { data }</span>
{/if}
```

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" deps="vue-options" mainFile={quickStartVueOptions} editorHeight={400} containBaseURL={false} />

</TabItem>
</Tabs>

关于在何时使用 useRequest 发送请求，何时通过`method.send` 发送请求，请移步阅读这边的[最佳实践](/tutorial/best-practice/skills)。

### useHook 的使用规范

请注意，`useRequest`只能用于组件内发送请求，在组件外，你可以通过 method 实例直接发送请求，并且 `useRequest` 的使用需要符合 use hook 使用规则，即只能在函数最外层调用。

**❌❌❌ 不推荐在在循环、条件判断或者子函数中调用**，例如以下在 click 回调中的使用示例，在回调函数中使用时，虽然可以正常发起请求，但 use hook 返回的响应式数据无法在视图中使用，循环和条件判断中使用也是如此。

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

## 在静态 html 中使用

除了使用 esModule 的方式安装 alova 外，你还可以使用`<script>`标签的方式使用 alova。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="static" mainFile={quickStartStaticVue} editorHeight={700} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="static" mainFile={quickStartStaticReact} editorHeight={700} />

</TabItem>
<TabItem value="3" label="svelte">

:::tip

svelte 依赖于编译工具，不能通过 CDN 直接使用，详情见 [svelte.dev](https://svelte.dev/)

:::

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="static" deps="vue-options" mainFile={quickStartStaticVueOptions} editorHeight={700} />

</TabItem>
</Tabs>

## 接下来要做什么？

实际上，这只是一个最简单的示例代码，但 alova 还包括如请求和响应拦截器、缓存和状态管理、丰富的多场景 useHooks 等功能，请继续往下看。

如果你想要更好地管理你的请求代码，这里有一个 [method 管理](/tutorial/best-practice/method-manage) 的最佳实践，待你移步去阅读。
