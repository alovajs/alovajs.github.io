---
title: Quick Start
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";
import CodeBlock from '@theme/CodeBlock';

import quickStartVue from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/vueComposition-useRequest.en.vue';
import quickStartReact from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/react-useRequest.en.jsx';
import quickStartSvelte from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/svelte-useRequest.en.svelte';
import quickStartVueOptions from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/vueOptions-useRequest.en.vue';
import quickStartStaticVue from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/vueComposition-static.en.html';
import quickStartStaticReact from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/react-static.en.html';
import quickStartStaticVueOptions from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/vueOptions-static.en.html';
import quickStartMethodVue from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/vueComposition-method.en.vue';
import quickStartMethodReact from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/react-method.en.jsx';
import quickStartMethodSvelte from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/svelte-method.en.jsx';
import quickStartMethodVueOptions from '!!raw-loader!@site/codesandbox/01-get-started/04-quick-start/vueOptions-method.en.vue';

:::tip Example tip

1. If you haven’t learned about alova yet, it is highly recommended that you read the [alova overview section](/tutorial/get-started/overview) first.
2. Want to try it out first? You can [click here](/tutorial/example/init-page) to try a simple example!

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

## First, create an alova instance

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  // VueHook is used to create ref status, including request status loading, response data data, request error object error, etc.
  statesHook: VueHook,

  // Request adapter, it is recommended to use fetch request adapter
  requestAdapter: GlobalFetch(),

  // The GlobalFetch adapter will return the Response instance,
  // You can set a global response interceptor to return json data
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
  // ReactHook is used to create react status, including request status loading, response data data, request error object error, etc.
  statesHook: ReactHook,

  // Request adapter, it is recommended to use fetch request adapter
  requestAdapter: GlobalFetch(),

  // The GlobalFetch adapter will return the Response instance,
  // You can set a global response interceptor to return json data
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
  // SvelteHook is used to create writable status, including request status loading, response data data, request error object error, etc.
  statesHook: SvelteHook,

  // Request adapter, it is recommended to use fetch request adapter
  requestAdapter: GlobalFetch(),

  // The GlobalFetch adapter will return the Response instance,
  // You can set a global response interceptor to return json data
  responded: response => response.json()
});
```

</TabItem>
<TabItem value="4" label="vue options">

When used in vue options style, additional installation of the `@alova/vue-options` package is required.

```js
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import { VueOptionsHook } from '@alova/vue-options';

export const alovaInstance = createAlova({
  // VueOptionsHook is used to create status, including request status loading, response data data, request error object error, etc.
  statesHook: VueOptionsHook,

  // Request adapter, it is recommended to use fetch request adapter
  requestAdapter: GlobalFetch(),

  // The GlobalFetch adapter will return the Response instance,
  // You can set a global response interceptor to return json data
  responded: response => response.json()
});
```

</TabItem>

</Tabs>

## Send get request directly

Then, you can use the alova instance to send the request directly. The request parameter setting method is similar to axios, but the difference is that alova needs to call the `send` function to send the request. If you are familiar with axios, this should be easy to understand.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={quickStartMethodVue} editorHeight={400} containBaseURL={false} />

</TabItem>

<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={quickStartMethodReact} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="3" label="svelte">

<EmbedSandpack template="svelte" mainFile={quickStartMethodSvelte} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" deps="vue-options" mainFile={quickStartMethodVueOptions} editorHeight={400} containBaseURL={false} />

</TabItem>
</Tabs>

`[v2.16.0+]` In order to provide a consistent usage experience with axios, there is no need to call the `send` function to send requests.

```js
alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
  // ...
});
// or
await alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1');
```

For more information about using method instances to send requests, please go to [Use method instances to send requests](/tutorial/next-step/send-request-directly) to read.

## Use useRequest to send a request

But the above is just the beginning. In enterprise-level projects, requests are often not so simple. We also need to display request status, upload and download status, handle request errors, etc. In order to more easily implement enterprise-level needs, alova combines the UI framework to make requests simpler. , you can use **useHooks** provided by alova to initiate a request, which will return stateful data related to multiple requests such as `loading`, and automatically manage them in alova without maintaining it yourself.

> There is no need to call the `send` function when sending a request using useRequest.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={quickStartVue} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={quickStartReact} editorHeight={400} containBaseURL={false} />

</TabItem>
<TabItem value="3" label="svelte">

<CodeBlock language="html">{quickStartSvelte}</CodeBlock>

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" deps="vue-options" mainFile={quickStartVueOptions} editorHeight={400} containBaseURL={false} />

</TabItem>
</Tabs>

Regarding when to use useRequest to send requests and when to send requests through `method.send`, please read the [Best Practices](/tutorial/best-practice/skills) here.

### UseHook usage specifications

Please note that `useRequest` can only be used to send requests within the component. Outside the component, you can send requests directly through the method instance, and the use of `useRequest` needs to comply with the use hook usage rules, that is, it can only be called in the outermost layer of the function. .

**❌❌❌ It is not recommended to call** in loops, conditional judgments or sub-functions, for example the followingExample of use in click callback. When used in the callback function, although the request can be initiated normally, the responsive data returned by use hook cannot be used in the view, and the same is true for use in loops and conditional judgments.

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

## Use in static html

In addition to installing alova using esModule, you can also use alova using the `<script>` tag.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="static" mainFile={quickStartStaticVue} editorHeight={700} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="static" mainFile={quickStartStaticReact} editorHeight={700} />

</TabItem>
<TabItem value="3" label="svelte">

:::tip

svelte relies on compilation tools and cannot be used directly through CDN. For details, see [svelte.dev](https://svelte.dev/)

:::

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="static" deps="vue-options" mainFile={quickStartStaticVueOptions} editorHeight={700} />

</TabItem>
</Tabs>

## What’s next?

In fact, this is just the simplest sample code, but alova also includes features such as request and response interceptors, cache and state management, rich multi-scenario useHooks, etc. Please continue to read below.

If you want to better manage your request code, here is a best practice for [method management](/tutorial/best-practice/method-manage) for you to read.
