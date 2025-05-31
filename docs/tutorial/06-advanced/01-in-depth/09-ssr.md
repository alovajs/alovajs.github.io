---
title: Server-Side Rendering (SSR)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

To be compatible with server-side rendering of UI frameworks such as [Nuxt3.x](https://nuxt.com/) / [Nextjs](https://nextjs.org/) / [sveltekit](https://kit.svelte.dev/), alova has made adaptations for them. Although frameworks like `Nuxt3.x` and `Sveltekit` offer built-in request capabilities, if you choose to use alova, you can manage requests on both the server and client sides with alova instead of using different request solutions on the server and client sides respectively.

Usage in SSR Environment

When the code runs on the server side, the `useRequest` and `useWatcher` and other use hooks in the component will not send requests, even if `immediate` is set to `true`. Instead, requests will be sent when the code runs in the browser. You can use all the features of alova as usual. This is a unified behavior in all SSR frameworks.

However, there are differences when using each SSR framework. Now, we will demonstrate how to use them one by one.

### Nuxt3.x

In Nuxt 3.x, you can use hooks like `useRequest` and `useWatcher` just as you would `useFetch`. It initiates requests on the server side and does not perform an initial request on the client side, achieving the same effect as `useFetch`.

```html
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
  const todoList = () => alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });


  // Note that `useRequest` uses `await`, otherwise the request will not be sent on the server side.
  const { data, error, loading } = await useRequest(todoList);
</script>
```

You can also use the combination of `useAsyncData + alova.Method` to complete the server-side data acquisition. This is no different from how you usually use `useAsyncData`.

```html
<script setup>
  // Return a promise in useAsyncData.
  const { data, pending, refresh } = await useAsyncData(async () => {
    const response = await alovaInstance.Get('/todo/list', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });
    return response;
  });
</script>
```

### Nextjs

<Tabs>
<TabItem value="1" label="App Router">

In the app router mode of Next.js, you can directly use method instances in asynchronous components.

```jsx
const App = async () => {
  const data = await alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
  // then ... code
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

In the traditional pages router mode, Next.js provides fixed server-side data initialization functions such as `getStaticProps`, `getServerSideProps`, and `getStaticPaths`, etc. You can directly call the API in the function by using the method instance as shown in the [Quick Start tutorial](/tutorial/getting-started/quick-start).

```jsx
export const getServerSideProps = async ctx => {
  const list = await alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
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

Sveltekit also provides the `load` function for initializing page data on the server side. You can also directly use the method instance in the function to call the interface. For example, you can call the interface in `+page.server.js`.

```javascript title=+page.server.js
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return {
    list: alovaInstance.Get('/todo/list', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  };
}
```

## Notes

The cache on the client side and the server side may be inconsistent.

If you use the caching feature of alova, it's worth noting that the cache on the client side and the server side is not shared. This means that if you directly use **use hooks** to fetch data when initializing the page, you may encounter issues with inconsistent rendering between the client and the server, although few people do this.

Please look at the following code snippet.

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

The following code assumes that the `alovaGetter` request exists in the server cache but not in the client cache.

At this point, when the HTML is generated on the server side, due to cache hit, `loading` is `false` and `<div>loading</div>` is not displayed. However, during client-side initialization, since the cache is not hit, `loading` is `true`, causing `<div>loading</div>` to be displayed. At this time, the SSR framework will prompt that the rendering on the two ends is inconsistent.

**Solution**

1. Try to place the page data initialization work in the fetching function rather than in the component.
2. If you must do so, you can avoid using the same interface on the client and server, or disable the caching of the problematic interface.
3. If caching is also needed, you can clear the server-side cache in the server-side data initialization function. The sample code is as follows:

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

  // Clear the cache on the server side.
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
  // Clear the cache on the server side.
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
  // Clear the cache on the server side.
  invalidateCache(alovaGetter);
  return {};
}
```

</TabItem>
</Tabs>
