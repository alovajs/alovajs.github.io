---
title: Quick Start
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip example tip

1. If you don't know about alova yet, it is highly recommended that you read the [alova overview](/get-started/overview) first.
2. Want to try it out first? You can [click here](../example/init-page) to try a simple example!

:::

## Install

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

Alova combines the UI framework to make the request easier. You can use the **use hook** provided by alova to initiate a request, which will return stateful data related to multiple requests such as `loading`, and automatically manage it in alova them without having to maintain them yourself.

When using alova, please ensure that the UI framework meets the following version requirements:

1. React: >= v16.8
2. Vue: 2.7, 3.x
3. Svelte: Any

## Send a request using useRequest

First create an alova instance, use this instance to create the corresponding method, and pass it to useRequest.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error. message }}</div>
  <span v-else>responseData: {{ data }}</span>
</template>

<script setup>
  import { createAlova, useRequest } from 'alova';
  import GlobalFetch from 'alova/GlobalFetch';
  import VueHook from 'alova/vue';

  // 1. Create an alova instance
  const alovaInstance = createAlova({
    // VueHook is used to create ref status, including request status loading, response data data, request error object error, etc.
    statesHook: VueHook,

    // request adapter, it is recommended to use the fetch request adapter
    requestAdapter: GlobalFetch(),

    // adapter GlobalFetch will return a Response instance
    // you can set a global response interception to return actual json data
    responded: response => response.json()
  });

  // 2. Use the alova instance to create a method and pass it to useRequest to send the request
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

// 1. Create an alova instance
const alovaInstance = createAlova({
  // ReactHook is used to create ref status, including request status loading, response data data, request error object error, etc.
  statesHook: ReactHook,

  // request adapter, it is recommended to use the fetch request adapter
  requestAdapter: GlobalFetch()
});

const app = () => {
  // 2. Use the alova instance to create a method and pass it to useRequest to send the request
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

  // 1. Create an alova instance
  const alovaInstance = createAlova({
    // SvelteHook is used to create ref status, including request status loading, response data data, request error object error, etc.
    statesHook: SvelteHook,

    // request adapter, it is recommended to use the fetch request adapter
    requestAdapter: GlobalFetch()
  });

  // 2. Use the alova instance to create a method and pass it to useRequest to send the request
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
<div>{ $error. message }</div>
{:else}
<span>responseData: {{ data }}</span>
{/if}
```

</TabItem>
</Tabs>

> Please note that the use of useRequest needs to comply with the rules of use hook, that is, it can only be called at the outermost layer of the function. Do not call in loops, conditionals, or subfunctions.

## Use the method instance to send the request

The use hook can only be used to send requests within the component. Outside the component, you can directly send requests through the method instance.

```javascript
const response = await alovaInstance.Get('https://api.alovajs.org/profile?id=1').send();
```

## Used in static html

In addition to using esModule to install alova, you can also use `<script>` tags to use alova.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
    <script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <!-- vuehook depends on vue, so you need to introduce vue first -->
    <script src="https://unpkg.com/alova/dist/hooks/vuehook.umd.min.js"></script>
    <script>
      const alovaInstance = window.alova.createAlova({
        baseURL: 'https://api.alovajs.org',
        statesHook: window.VueHook,
        requestAdapter: window.GlobalFetch()
      });
      //...
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
    <!-- reacthook depends on react, so you need to introduce react and react-dom first -->
    <script src="https://unpkg.com/alova/dist/hooks/reacthook.umd.min.js"></script>
    <script>
      const alovaInstance = window.alova.createAlova({
        baseURL: 'https://api.alovajs.org',
        statesHook: window.ReactHook,
        requestAdapter: window.GlobalFetch()
      });
      //...
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

svelte depends on compilation tools and cannot be used directly through CDN. For details, see [svelte.dev](https://svelte.dev/)

:::

</TabItem>
</Tabs>

## What to do next?

In fact, this is just the simplest sample code, but alova also includes rich functions such as request and response interceptors, cache and state management, multiple core use hooks, etc., which we will elaborate in subsequent chapters.

If you want to better manage your request code, here is a best practice of [method management](/best-practice/method-manage), waiting for you to read it.
