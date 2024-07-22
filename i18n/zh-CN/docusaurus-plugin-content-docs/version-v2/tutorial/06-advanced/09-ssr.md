---
title: 服务端渲染（SSR）
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 版本要求

2.8.0+

:::

## 概述

尽管 alova 的定位并不是在 nodejs 中进行请求，但为了可以结合 UI 框架的服务端渲染（[Nuxt3.x](https://nuxt.com/) / [Nextjs](https://nextjs.org/) / [sveltekit](https://kit.svelte.dev/)），我们也对它做了适配。尽管例如`Nuxt3.x`、`Sveltekit`中提供了内置的请求功能，但如果你选择使用 alova 的话，你可以同时在服务端和客户端中使用 alova 管理请求，而不是服务端和客户端分别使用不同的请求方案来管理它们。

这里有一些在 SSR 中使用 alova 需要注意的地方，以及不同 UI 框架的 SSR 中的使用示例。

## 在服务端调用接口

SSR 中经常需要在服务端获取数据并渲染成 HTML，这种情况下我们不能使用 alova 的 use hooks（也无需使用）来获取数据，以下我们将分别对支持的 SSR 框架进行展示。

### Nuxt3.x

在 Nuxt3.x 中提供了`useAsyncData`在服务端初始化页面数据，同时还提供了`useFetch`和`$fetch`请求函数，这些可以同时在服务端和客户端使用的请求函数真的很方便。尽管如此，如果你希望在 nuxt 中使用 alova 的话，你可以使用 **useAsyncData + alova.Method** 组合的方式完成服务端数据获取，这与你平时使用`useAsyncData`没什么区别。

```html
<script setup>
  const todoListGetter = alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // 在useAsyncData中返回promise
  const { data, pending, refresh } = useAsyncData(async () => {
    return todoListGetter.send();
  });
</script>
```

### Nextjs

Nextjs 提供了固定的服务端初始化页面数据的函数，如`getStaticProps`、`getServerSideProps`等，可以在函数中[直接使用 method 实例](/v2/tutorial/getting-started/quick-start)调用接口。

```jsx
const todoListGetter = alovaInstance.Get('/todo/list', {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export const getServerSideProps = async ctx => {
  const list = await todoListGetter.send();
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

### Sveltekit

Sveltekit 中也提供了`load`函数进行服务端的页面数据初始化，你同样可以在函数中[直接使用 method 实例](/v2/tutorial/getting-started/quick-start)调用接口。例如在`+page.server.js`中调用接口。

```javascript title=+page.server.js
const todoListGetter = alovaInstance.Get('/todo/list', {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return {
    list: todoListGetter.send()
  };
}
```

## 在 SSR 中使用 usehooks

由于每个 SSR 框架都有各自的在服务端中初始化数据的方式，因此在 SSR 中生成 html 时，组件中的`useRequest`和`useWatcher`即使将`immediate`设置为`true`也不会发起请求，因为这更像是客户端初始化数据。

不过，如果你需要像客户端中一样初始化页面的数据，也可以设置`immediate`为`true`，当页面在浏览器中运行时，你可以和往常一样使用 alova 的所有功能。

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
