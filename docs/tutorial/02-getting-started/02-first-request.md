---
title: First request
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";
import CodeBlock from '@theme/CodeBlock';

import quickStartVue from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueComposition-useRequest.en.vue';
import quickStartReact from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/react-useRequest.en.jsx';
import quickStartSvelte from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/svelte-useRequest.en.svelte';
import quickStartVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueOptions-useRequest.en.vue';
import quickStartStaticVue from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueComposition-static.en.html';
import quickStartStaticReact from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/react-static.en.html';
import quickStartStaticVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueOptions-static.en.html';
import quickStartMethodVue from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueComposition-method.en.vue';
import quickStartMethodReact from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/react-method.en.jsx';
import quickStartMethodSvelte from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/svelte-method.en.svelte';
import quickStartMethodVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueOptions-method.en.vue';

:::tip Example tip

If you haven’t konwn anything about alova yet, it is recommended that you read [overview](/tutorial/getting-started/overview) first.

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

## First create an alova instance

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="2" label="react">

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  statesHook: ReactHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="3" label="svelte">

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';
import GlobalFetch from 'alova/GlobalFetch';

export const alovaInstance = createAlova({
  statesHook: SvelteHook,
  requestAdapter: GlobalFetch()
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
  statesHook: VueOptionsHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

When creating an alova instance, two parameters are specified:

1. statesHook: Decide which UI library status to return when using useHook request. You can decide which statesHook to choose based on the UI framework used in the project.
2. requestAdapter: The request adapter used by the alova instance. It is recommended to use the `GlobalFetch` request adapter here, which is based on the `fetch API` package.

## Send request directly

You can send a request through `alovaInstance.Get` and pass the url. Since the `GlobalFetch` request adapter is used, a `Response` instance will be received. This is very simple.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={quickStartMethodVue} editorHeight={400} containBaseURL={false} containResponded={false} />

</TabItem>

<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={quickStartMethodReact} editorHeight={400} containBaseURL={false} containResponded={false} />

</TabItem>
<TabItem value="3" label="svelte">

<EmbedSandpack template="svelte" mainFile={quickStartMethodSvelte} editorHeight={400} containBaseURL={false} containResponded={false} />

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" deps="vue-options" mainFile={quickStartMethodVueOptions} editorHeight={400} containBaseURL={false} containResponded={false} />

</TabItem>
</Tabs>

You can also use `await alovaInstance.Get` to wait for a response.

:::info version difference

In versions before `[v2.16.0]`, you need to call the `send` function to send a request. If it is a version after `[v2.16.0]`, you can ignore this reminder.

```js
alovaInstance
  .Get('https://jsonplaceholder.typicode.com/todos/1')
  .send()
  .then(response => {
    // ...
  });
```

:::

## Use useRequest to send a request

The above is just the beginning. In enterprise-level projects, requests are often not so simple. We also need to display request status, upload and download status, handle request errors, etc. In order to more easily implement enterprise-level needs, alova combines the UI framework to make requests simpler. , you can use **useHooks** provided by alova to initiate a request. It will create multiple request-related responsive data such as `loading/error/data` based on the specified `statesHook`, and automatically manage them in alova. No need to maintain it yourself.

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

In this example, pass `alovaInstance.Get` into `useRequest`, which will help us send the request and create responsive data `loading/error/data`, and use them directly in the view.

为了让`data`接收到的值为响应数据，我们在`alovaInstance`添加了简单的全局响应拦截器，它可以接收到`Response`实例并返回转换后的数据。
In order to receive the response data and assign to state `data`, there is a simple global response interceptor added to `alovaInstance`.

```javascript
const alovaInstance = createAlova({
  // highlight-start
  responded: response => response.json()
  // highlight-end
});
```

You can also change the states created by `useRequest`.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

//...
// update the data value directly
data.value = {};

// or use function update
update({
  data: {}
});
```

</TabItem>

<TabItem value="2" label="react">

In react, the returned state is data that can be used directly, so it needs to be modified by the `update` function.

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

//...
// update the data value by update
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

In svelte, the status returned by `useRequest` is of type `writable`.

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

//...
// update the data value directly
$data = {};
// or data.update(d => ({}));

// or use function update
update({
  data: {}
});
```

</TabItem>
<TabItem value="4" label="vue options">

```javascript
export default {
  mixins: mapAlovaHook(function () {
    todo: useRequest(todoListGetter);
  }),
  methods: {
    handleModifyTodo() {
      // update the data value directly
      this.todo.data = {};

      // or use function update
      this.todo.update({
        data: {}
      });
    }
  }
};
```

</TabItem>
</Tabs>

[When to use useRequest and when to send requests via `await alovaInstance.Get`](/tutorial/best-practice/skills).

### UseHook usage specifications

Please note that `useRequest` can only be used to send requests within the component. Outside the component, you can send requests directly through the method instance, and the use of `useRequest` needs to comply with the use hook usage rules, that is, it can only be called in the outermost layer of the function. .

**❌❌❌ It is not recommended to call** in a loop, conditional judgment or sub-function. For example, the following usage example in the click callback. When used in the callback function, although the request can be initiated normally, the response returned by use hook Formula data cannot be used in views, nor can it be used in loops and conditional judgments.

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

## Used in static html

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

In fact, this is just the simplest sample code, but alova also includes rich features such as request and response interceptors, cache and state management, rich multi-scenario useHooks, etc. Let us continue to learn together.
