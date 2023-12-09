---
title: 第一个请求
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";
import CodeBlock from '@theme/CodeBlock';

import quickStartVue from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueComposition-useRequest.zh.vue';
import quickStartReact from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/react-useRequest.zh.jsx';
import quickStartSvelte from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/svelte-useRequest.zh.svelte';
import quickStartVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueOptions-useRequest.zh.vue';
import quickStartStaticVue from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueComposition-static.zh.html';
import quickStartStaticReact from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/react-static.zh.html';
import quickStartStaticVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueOptions-static.zh.html';
import quickStartMethodVue from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueComposition-method.zh.vue';
import quickStartMethodReact from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/react-method.zh.jsx';
import quickStartMethodVueOptions from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/vueOptions-method.zh.vue';
import quickStartMethodSvelte from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/svelte-method.zh.svelte';

:::tip 示例提示

如果你还未了解 alova，推荐你先阅读 [alova 概述](/tutorial/getting-started/overview)。

:::

## 安装

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

## 先创建一个 alova 实例

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

在 vue options 风格中使用，需要额外安装`@alova/vue-options`包。

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

在创建 alova 实例时，指定了两个参数：

1. statesHook：决定使用 useHook 请求时，返回哪个 UI 库的状态，可以根据项目中所使用的 UI 框架决定选择哪个 statesHook。
2. requestAdapter：alova 实例使用的请求适配器，在这里推荐使用`GlobalFetch`请求适配器， 它是基于`fetch API`的封装。

## 直接发送请求

通过 `alovaInstance.Get` 并传入 url 即可发送一个请求，由于使用了`GlobalFetch`请求适配器，将会接收到一个`Response`实例，这很简单。

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

你也可以使用`await alovaInstance.Get`等待响应。

:::info 版本差别

在`[v2.16.0]`之前的版本中，需要调用`send`函数才可以发送请求，如果是`[v2.16.0]`之后的版本可以忽略这个提醒。

```js
alovaInstance
  .Get('https://jsonplaceholder.typicode.com/todos/1')
  .send()
  .then(response => {
    // ...
  });
```

:::

## 使用 useRequest 发送请求

上面的仅仅只是开始。在企业级项目中，请求往往不会如此简单，我们还需要显示请求状态、上传下载状态、处理请求错误等，为了更简单地实现企业级的需求，alova 结合 UI 框架，让请求变得更简单，你可以使用 alova 提供的**useHooks**发起请求，它将根据指定的`statesHook`创建`loading/error/data`等多个请求相关的响应式数据，并在 alova 中自动管理它们，而无需自己维护。

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

在这个例子里，将`alovaInstance.Get`传入`useRequest`中，它将会帮我们发送请求并创建响应式数据`loading/error/data`，在视图中直接使用它们即可。

你也可以修改`useRequest`创建的响应式数据。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 直接修改data值
data.value = {};

// 或者通过update函数修改
update({
  data: {}
});
```

</TabItem>

<TabItem value="2" label="react">

在 react 中，返回的状态是直接可使用的数据，因此需通过`update`函数来修改。

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 通过update修改data值
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

在 svelte 中，`useRequest`返回的状态为`writable`类型。

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 直接修改data值
$data = {};
// 或data.update(d => ({}));

// 或者通过update函数修改
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
      // 直接修改data值
      this.todo.data = {};

      // 或者通过update函数修改
      this.todo.update({
        data: {}
      });
    }
  }
};
```

</TabItem>
</Tabs>

[何时使用 useRequest ，何时通过`await alovaInstance.Get` 发送请求](/tutorial/best-practice/skills)。

### useHook 的使用规范

请注意，`useRequest`只能用于组件内发送请求，在组件外，你可以通过 method 实例直接发送请求，并且 `useRequest` 的使用需要符合 use hook 使用规则，即只能在函数最外层调用。

**❌❌❌ 不推荐在在循环、条件判断或者子函数中调用**，例如以下在 click 回调中的使用示例，在回调函数中使用时，虽然可以正常发起请求，但 use hook 返回的响应式数据无法在视图中使用，循环和条件判断中使用也是如此。

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

## 在静态 html 中使用

除了使用 esModule 的方式安装 alova 外，你还可以使用`<script>`标签的方式使用 alova。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="static" mainFile={quickStartStaticVue} editorHeight={700} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="static" mainFile={quickStartStaticReact} editorHeight={700} />

</TabItem>
<TabItem value="3" label="svelte">

:::tip

svelte 依赖于编译工具，不能通过 CDN 直接使用，详情见 [svelte.dev](https://svelte.dev/)

:::

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="static" deps="vue-options" mainFile={quickStartStaticVueOptions} editorHeight={700} />

</TabItem>
</Tabs>

## 接下来要做什么？

实际上，这只是一个最简单的示例代码，但 alova 还包括如请求和响应拦截器、缓存和状态管理、丰富的多场景 useHooks 等丰富的功能，让我们一起继续往下学习。
