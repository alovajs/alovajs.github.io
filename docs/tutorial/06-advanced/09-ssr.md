---
title: Server-Side Rendering(SSR)
sidebar_position: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info version required

2.8.0+

:::

## Overview

Although the positioning of alova is not to make requests in nodejs, we have also adapted it in order to combine the server-side rendering([Nuxt3.x](https://nuxt.com/) / [Nextjs](https://nextjs.org/) / [sveltekit](https://kit.svelte.dev/)) of the UI framework. Although built-in request functionality is provided in e.g. `Nuxt3.x`, `Sveltekit`, if you choose to use alova, you can use alova to manage requests in both server and client, instead of server and client separately. Use different request schemes to manage them.

Here are some caveats for using alova in SSR, and examples of usage in SSR for different UI frameworks.

## Call apis on server

In SSR, it is necessary to get data on server and render it into HTML. In this case, we cannot use alova's use hooks (and do not need to use them) to obtain data. Below we will show the supported SSR frameworks respectively.

### Nuxt3.x

In Nuxt3.x, `useAsyncData` is provided to initialize page data on server, and `useFetch` and `$fetch` request functions are also provided. These request functions that can be used on both server and client are really convenient. However, if you want to use alova in nuxt, you can use the combination of **useAsyncData + alova.Method** to complete the server-side data fetching, which is no different from your usual `useAsyncData`.

```html
<script setup>
  const todoListGetter = alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // return promise in useAsyncData
  const { data, pending, refresh } = useAsyncData(async () => {
    return todoListGetter.send();
  });
</script>
```

### Nextjs

Nextjs provides fixed server-side initialization page data functions, such as `getStaticProps`, `getServerSideProps`, etc., you can [directly use the method instance](/tutorial/getting-started/quick-start) call apis in the function.

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

Sveltekit also provides the `load` function to initialize the page data on server, and you can also [directly use the method instance](/tutorial/getting-started/quick-start) call apis in the function. For example, call apis in `+page.server.js`.

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

## Using usehooks in SSR

Since each SSR framework has its own way to initialize data on server, when generating html in SSR, `useRequest` and `useWatcher` in the component will not be initiated even if `immediate` is set to `true` request, as this is more like client initialization data.

However, if you need to initialize the data of the page as in the client, you can also set `immediate` to `true`, and when the page is running in the browser, you can use all the functions of alova as usual.

## Precautions

### Client and server caches are separate

If you use alova's caching function, you may need to pay attention here that the client and server caches are not shared, which means that if you directly use **usehooks** to get data when initializing the page, you may Run into inconsistencies in client-side and server-side rendering, although few people do.

Please see the following code snippet.

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

The following code assumes that `alovaGetter` requests are cached on server, but not on the client.

At this time, when the html is generated on server , `loading` is `false` and does not display `<div>loading</div>` because it hits the cache, but when the client is initialized, because it misses the cache, `loading` is `true` will cause `<div>loading</div>` to be displayed, and the SSR framework will prompt that the rendering of the two ends is inconsistent.

**Solution**

1. Try to put the page data initialization work in the acquisition function instead of the component;
2. If you must do this, you can avoid using the same apis on the client and server, or turn off the problematic api caches;
3. If caching is also required, you can clear the cache on server in the data initialization function of server. The sample code is as follows:

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

  // Clear the cache on server
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
  // Clear the cache on server
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
  // Clear the cache on server
  invalidateCache(alovaGetter);
  return {};
}
```

</TabItem>
</Tabs>
