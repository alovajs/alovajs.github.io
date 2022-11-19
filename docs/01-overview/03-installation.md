---
title: Install
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When using alova, make sure the following version

1. React: > v16.8
2. Vue: 3.x
3. Svelte: any

> Want to try it out first? You can [click here](../example/init-page) to see the example!

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

## ESM

<Tabs>
<TabItem value="1" label="vue">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
const alovaInstance = createAlova({
  // server root directory
  baseURL: 'https://api.alovajs.org',

  // VueHook is used to create ref status, including request status loading, response data data, request error object error, etc. (detailed later)
  statesHook: VueHook,

  // request adapter, we recommend and provide the fetch request adapter
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="2" label="react">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
const alovaInstance = createAlova({
  // server root directory
  baseURL: 'https://api.alovajs.org',

  // ReactHook is used to create react state, including request state loading, response data data, request error object error, etc. (detailed later)
  statesHook: ReactHook,

  // request adapter, we recommend and provide the fetch request adapter
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="3" label="svelte">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';
const alovaInstance = createAlova({
  // server root directory
  baseURL: 'https://api.alovajs.org',

  // SvelteHook is used to create the store status of svelte, including request status loading, response data data, request error object error, etc. (detailed later)
  statesHook: SvelteHook,

  // request adapter, we recommend and provide the fetch request adapter
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

## CDN

### Import core code

```html
<script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
```

Once imported, you can use the api via `window.alova`.

### Introduce fetch adapter

```html
<script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
```

You can use `window.GlobalFetch` which will use `winfow.fetch` for requests.

### Introduce States Hook

You can use different States Hook according to the framework used by the project

<Tabs>
<TabItem value="1" label="vue">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/alova/dist/hooks/vuehook.umd.min.js"></script>
```

It needs to be imported when used in a vue3 project, you can access it through `window.VueHook`

> It depends on vue, so vue needs to be introduced first

</TabItem>
<TabItem value="2" label="react">

```html
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/alova/dist/hooks/reacthook.umd.min.js"></script>
```

It needs to be imported when used in a react project, you can access it through `window.ReactHook`

> It depends on react, so you need to introduce react and react-dom first

</TabItem>
<TabItem value="3" label="svelte">

:::tip
svelte depends on compilation tools and cannot be used directly through cdn
:::

See [svelte.dev](https://svelte.dev/) for details

</TabItem>
</Tabs>

### In static html

<Tabs>
<TabItem value="1" label="vue">

```html
<script>
  const alovaInstance = window.alova.createAlova({
    baseURL: 'https://api.alovajs.org',
    statesHook: window.VueHook,
    requestAdapter: window.GlobalFetch()
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```html
<script>
  const alovaInstance = window.alova.createAlova({
    baseURL: 'https://api.alovajs.org',
    statesHook: window.ReactHook,
    requestAdapter: window.GlobalFetch()
  });
</script>
```

</TabItem>
</Tabs>
