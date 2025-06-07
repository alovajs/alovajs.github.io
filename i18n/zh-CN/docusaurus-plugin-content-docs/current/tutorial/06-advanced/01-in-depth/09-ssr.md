---
title: 服务端渲染（SSR）
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 概述

为了可以结合 UI 框架的服务端渲染（[Nuxt3](https://nuxt.com/) / [Nextjs](https://nextjs.org/) / [sveltekit](https://kit.svelte.dev/)），alova对它们做了适配。尽管例如`Nuxt3`、`Sveltekit`中提供了内置的请求功能，但如果你选择使用 alova 的话，你可以同时在服务端和客户端中使用 alova 管理请求，而不是服务端和客户端分别使用不同的请求方案来管理它们。

## SSR中的CSR模式

当代码在服务端运行时，组件中的`useRequest`和`useWatcher`等use hooks将不会发送请求，即使将`immediate`设置为`true`，而会在浏览器运行时发送请求，你可以和往常一样使用 alova 的所有功能，这是在所有SSR框架中相同的表现。

但在每个SSR框架中使用时有所差别，现在，我们依次展示如何使用。

## 全栈框架

### Nuxt3

在 Nuxt3 中使用`useFetch`可以让数据在服务的和浏览器同步，使用nuxt适配器可以实现更好的体验，在使用`useRequest`、`useWatcher`等几乎所有的hooks时不仅可以同步两端的数据，避免在客户端重复请求，还可以同步例如`Date`，`Error`等以及自定义类型的数据，来看下如何使用。

#### 设置nuxt适配器

```javascript
import { createAlova } from 'alova';
import NuxtHook from 'alova/nuxt';

export const alovaInstance = createAlova({
  // ...
  statesHook: NuxtHook({
    nuxtApp: useNuxtApp // 必须指定useNuxtApp
  })
});
```

#### 在服务端拉取数据

使用`useRequest`、`useWatcher`等几乎所有的hooks时，通过`await`在服务端拉取数据，它具有以下特性：

1. 将会同步服务端数据到浏览器的states中，保持两端的states数据同步，并且states都是响应式的。
2. 默认支持`Date`、`Error`、`RegExp`对象的序列化，也支持序列化自定义数据。
3. 浏览器中不再重复初始化请求。

```html
<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
  const todoList = () => alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // 注意，`useRequest`使用了await，否则不会在服务端发送请求
  const { data, error } = await useRequest(todoList);
</script>
```

你也可以使用 **useAsyncData + alova.Method** 组合的方式完成服务端数据获取，这与你平时使用`useAsyncData`没什么区别。

```html
<script setup>
  // 在useAsyncData中返回promise
  const { data, pending, refresh } = await useAsyncData(async () => {
    const response = await alovaInstance.Get('/todo/list', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
    return response;
  });
</script>
```

#### 自定义序列化器

如果你希望序列化自定义的数据并同步到客户端，可以在nuxt适配器的`serializers`中指定，例如自定义moment实例序列化器。

```javascript
const momentSerializer = {
  // forward在序列化时被调用
  // 需要判断是否为moment实例，如果不是目标值则返回undefined，表示不处理它
  forward: data => moment.isMoment(data) ? data.valueOf() : undefined,

  // backward在反序列化时被调用，data为forward中返回的值
  backward: timestamp => moment(timestamp);
};

createAlova({
  // ...
  statesHook: NuxtHook({
    nuxtApp: useNuxtApp,
    // highlight-start
    serializers: {
      moment: momentSerializer
    }
    // highlight-end
  })
});
```

### Nextjs

在nuxtjs中设置使用react适配器。

<Tabs>
<TabItem value="1" label="App Router">

在 nextjs 的 app router 模式下，您可以在异步组件中直接使用方法实例。

```jsx
const App = async () => {
  const data = await alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
  // then ...code
  return data.map(item => (
    <div>
      <span>{item.title}</span>
      <span>{item.time}</span>
    </div>
  ));
};

export default App;
```

</TabItem>
<TabItem value="2" label="Pages Router">

在传统的 pages router 模式下，nextjs 提供程序固定的服务端数据初始化函数，例如 `getStaticProps`、`getServerSideProps` 和 `getStaticPaths` 等，你可以[直接使用方法实例](/tutorial/getting-started/quick-start)在函数中调用 api。

```jsx
export const getServerSideProps = async ctx => {
  const list = await alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });
  return {
    props: {
      list
    }
  };
};
export default function App(props) {
  return props.list.map(item => (
    <div>
      <span>{item.title}</span>
      <span>{item.time}</span>
    </div>
  ));
}
```

</TabItem>
</Tabs>

### Sveltekit

Sveltekit 中也提供了`load`函数进行服务端的页面数据初始化，你同样可以在函数中[直接使用 method 实例](/tutorial/getting-started/quick-start)调用接口。例如在`+page.server.js`中调用接口。

```javascript title=+page.server.js
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return {
    list: alovaInstance.Get('/todo/list', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  };
}
```
