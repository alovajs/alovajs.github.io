---
title: 服务端渲染（SSR）
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 概述

为了可以结合 UI 框架的服务端渲染（[Nuxt3.x](https://nuxt.com/) / [Nextjs](https://nextjs.org/) / [sveltekit](https://kit.svelte.dev/)），alova对它们做了适配。尽管例如`Nuxt3.x`、`Sveltekit`中提供了内置的请求功能，但如果你选择使用 alova 的话，你可以同时在服务端和客户端中使用 alova 管理请求，而不是服务端和客户端分别使用不同的请求方案来管理它们。

## 在SSR环境下使用

当代码在服务端运行时，组件中的`useRequest`和`useWatcher`等use hooks将不会发送请求，即使将`immediate`设置为`true`，而会在浏览器运行时发送请求，你可以和往常一样使用 alova 的所有功能，这是在所有SSR框架中统一的表现。

但在每个SSR框架中使用时有所差别，现在，我们依次展示如何使用。

### Nuxt3.x

在 Nuxt3.x 中，你可以像`useFetch`一样使用`useRequest`、`useWatcher`等hooks，它会在服务端发起请求，并且不会在客户端进行初始化请求，实现与`useFetch`相同的效果。

```html
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
  const todoList = () => alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // 注意，`useRequest`使用了await，否则不会在服务端发送请求
  const { data, error, loading } = await useRequest(todoList);
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

### Nextjs

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

## 注意事项

### 客户端和服务端的缓存可能不一致

如果你使用了 alova 的缓存功能，这里可能需要注意的是，客户端和服务端的缓存并不是共享的，这意味着如果你在初始化页面时直接使用了**usehooks**获取数据，你可能会遇到客户端和服务端渲染不一致的问题，尽管很少人这样做。

请看以下代码片段。

<Tabs groupId="framework">
<TabItem label="nuxt" value="1">

```html
<template>
  <div v-if="loading">loading</div>
  <div>{{ data }}</div>
</template>

<script setup>
  const { loading, data } = useRequest(alovaGetter);
</script>
```

</TabItem>
<TabItem label="next" value="2">

```jsx
function App(props) {
  const { loading, data } = useRequest(alovaGetter);
  return (
    <>
      {loading ? <div>loading</div> : null}
      <div>{data}</div>
    </>
  );
}
```

</TabItem>
<TabItem label="sveltekit" value="3">

```html
<script>
  export let data;
  const { loading, data } = useRequest(alovaGetter);
</script>

{#if $loading}
<div>loading</div>
{/if}
<div>{{ data }}</div>
```

</TabItem>
</Tabs>

以下代码假设`alovaGetter`请求在服务端存在缓存，但在客户端不存在。

此时在服务端生成时 html 时，由于命中缓存，`loading`为`false`而不显示`<div>loading</div>`，但在客户端初始化时由于未命中缓存，`loading`为`true`而导致显示`<div>loading</div>`，此时 SSR 框架将会提示两个端渲染不一致。

**解决方法**

1. 尽量将页面数据初始化的工作放在获取函数中，而不是组件中；
2. 如果必须这样做，则可以避免在客户端和服务端使用相同的接口，或者关闭出现问题的接口缓存；
3. 如果也需要缓存，你可以在服务端数据初始化函数中清除服务端的缓存，示例代码如下：

<Tabs groupId="framework">
<TabItem label="nuxt" value="1">

```html
<template>
  <div v-if="loading">loading</div>
  <div>{{ data }}</div>
</template>

<script setup>
  import { invalidateCache } from 'alova';
  const { loading, data } = useRequest(alovaGetter);

  // 在服务端中清除缓存
  useAsyncData(
    () => {
      invalidateCache(alovaGetter);
    },
    {
      server: true
    }
  );
</script>
```

</TabItem>
<TabItem label="next" value="2">

```jsx
import { invalidateCache } from 'alova';

function App(props) {
  const { loading, data } = useRequest(alovaGetter);
  return (
    <>
      {loading ? <div>loading</div> : null}
      <div>{data}</div>
    </>
  );
}

export const getServerSideProps = async () => {
  // 在服务端中清除缓存
  invalidateCache(alovaGetter);
  return {
    props: {}
  };
};
```

</TabItem>
<TabItem label="sveltekit" value="3">

```javascript title=+page.server.js
import { invalidateCache } from 'alova';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // 在服务端中清除缓存
  invalidateCache(alovaGetter);
  return {};
}
```

</TabItem>
</Tabs>
