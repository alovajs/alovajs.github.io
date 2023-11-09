---
title: Quick Start
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";
import { quickStartVue, quickStartReact, quickStartVueOptions, quickStartStaticVue, quickStartStaticVueOptions, quickStartStaticReact } from './lives';

:::tip example tip

1. If you don't know about alova yet, it is highly recommended that you read the [alova overview](./overview) first.
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
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={quickStartVue} editorHeight={600} defaultAlova={false} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={quickStartReact} editorHeight={600} defaultAlova={false} />

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
    requestAdapter: GlobalFetch(),

    // adapter GlobalFetch will return a Response instance
    // you can set a global response interception to return actual json data
    responded: response => response.json()
  });

  // 2. Use the alova instance to create a method and pass it to useRequest to send the request
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

<EmbedSandpack template="vue" deps="vue-options" mainFile={quickStartVueOptions} editorHeight={600} defaultAlova={false} />

</TabItem>
</Tabs>

### Use hook specification

Please note that the use of useRequest needs to conform to the rules of use hook, that is, it can only be called at the outermost layer of the function. ❌❌❌ It is not recommended to call in loops, conditional judgments or sub-functions.

For example, the following usage example in the click callback, when used in the callback function, although the request can be initiated normally, the responsive data returned by the use hook cannot be used in the view, and the same is true for loops and conditional judgments.

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

## Use the method instance to send the request

The use hook can only be used to send requests within the component. Outside the component, you can directly send requests through the method instance.

```javascript
const response = await alovaInstance.Get('https://api.alovajs.org/profile?id=1').send();
```

For more information about method instance sending request, please go to [Use method instance to send request](../next-step/send-request-directly) to read.

Regarding when to use useRequest to send a request and when to use a method instance to send a request, please read the [Best Practice](../best-practice/skills) here.

## Used in static html

In addition to using esModule to install alova, you can also use `<script>` tags to use alova.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="static" mainFile={quickStartStaticVue} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="static" mainFile={quickStartStaticReact} />

</TabItem>
<TabItem value="3" label="svelte">

:::tip

svelte depends on compilation tools and cannot be used directly through CDN. For details, see [svelte.dev](https://svelte.dev/)

:::

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="static" deps="vue-options" mainFile={quickStartStaticVueOptions} editorHeight={700} />

</TabItem>
</Tabs>

## What to do next?

In fact, this is just the simplest sample code, but alova also includes rich functions such as request and response interceptors, cache and state management, multiple core use hooks, etc., which we will elaborate in subsequent chapters.

If you want to better manage your request code, here is a best practice of [method management](../best-practice/method-manage), waiting for you to read it.
