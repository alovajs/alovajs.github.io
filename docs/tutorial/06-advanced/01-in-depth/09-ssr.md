---
title: Server-Side Rendering (SSR)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

To be compatible with server-side rendering of UI frameworks such as [Nuxt3](https://nuxt.com/) / [Nextjs](https://nextjs.org/) / [sveltekit](https://kit.svelte.dev/), alova has made adaptations for them. Although frameworks like `Nuxt3` and `Sveltekit` offer built-in request capabilities, if you choose to use alova, you can manage requests on both the server and client sides with alova instead of using different request solutions on the server and client sides respectively.

## CSR mode in SSR

When the code runs on the server side, the `useRequest` and `useWatcher` and other use hooks in the component will not send requests, even if `immediate` is set to `true`. Instead, requests will be sent when the code runs in the browser. You can use all the features of alova as usual. This is a same behavior in all SSR frameworks.

However, there are differences when using each SSR framework. Now, we will demonstrate how to use them one by one.

## SSR Frameworks

### Nuxt3

In Nuxt3, using `useFetch` can synchronize data between the server and the browser. By using the states hook adapter for nuxt, a better experience can be achieved. When using almost all hooks such as `useRequest` and `useWatcher`, not only can data be synchronized on both ends to avoid duplicate requests on the client side, but also data such as `Date`, `Error`, and custom types can be synchronized. Let's take a look at how to use it.

#### Setup the Nuxt adapter

```javascript
import { createAlova } from 'alova';
import NuxtHook from 'alova/nuxt';


export const alovaInstance = createAlova({
// ...
  statesHook: NuxtHook({
    nuxtApp: useNuxtApp // useNuxtApp must be specified })
  });
});
```

#### Fetch data on the server side

When using almost all hooks such as `useRequest` and `useWatcher`, data is fetched on the server side through `await`. it has the following features:

1. The server-side data will be synchronized to the states in browser, keeping the states on both ends in sync, and all states are reactive.
2. By default, it supports the serialization of `Date`, `Error`, and `RegExp` object of data, and also supports the serialization of custom data.
3. No repeated initialization requests in the browser.

```html
<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
  const todoList = () => alovaInstance.Get('/todo/list', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });


  // Note that `useRequest` uses `await`, otherwise the request will not be sent on the server side.
  const { data, error } = await useRequest(todoList);
</script>
```

You can also use the combination of `useAsyncData + alova.Method` to complete the server-side data acquisition. This is no different from how you usually use `useAsyncData`.

```html
<script setup>
  // Return a promise in useAsyncData
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

#### Custom Serializer

If you need to serialize custom data and synchronize them to client, you can specify it in the `serializers` of the Nuxt adapter, for example, a custom serializer for a moment instance.

```javascript
const momentSerializer = {
  // forward is called during serialization
  // It is necessary to determine whether it is a moment instance; if not, the target value is returned as undefined, indicating that it should not be processed.
  forward: data => (moment.isMoment(data) ? data.valueOf() : undefined),

  // The `backward` method is called during deserialization, and `data` is the value returned in `forward`.
  backward: timestamp => moment(timestamp)
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
