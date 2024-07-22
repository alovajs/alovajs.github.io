---
title: 结合框架
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

接下来，我们将学习如何与 UI 框架结合使用，这可以让 alova 发挥出真正的力量。

在[RSM](/v2/tutorial/others/RSM)中，请求时机描述了请求应该在什么时候发送，在 UI 框架中使用时，不仅可以让 alova 自动管理响应式的请求状态，还能通过一定规则自动控制什么时候应该发送请求。

`alova`中提供了`useRequest`、`useWatcher`、`useFetcher`三个核心 useHook 实现请求时机，由它们控制何时应该发出请求，同时将会为我们创建和维护请求的响应式状态，如`loading/data/error`等，你可以直接在视图中使用这些响应式状态，当它们更改时，视图也将随之变化。

## 设置 statesHook

在使用它们前，我们需要在 alova 实例上设置对应的 statesHook，它必须和项目使用的 UI 框架对应，这非常重要，它将告诉 alova 应该创建对应 UI 框架的响应式状态，目前支持以下框架：

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: VueHook
  // highlight-end
});
```

</TabItem>
<TabItem value="2" label="react">

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: ReactHook
  // highlight-end
});
```

</TabItem>
<TabItem value="3" label="svelte">

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: SvelteHook
  // highlight-end
});
```

</TabItem>
<TabItem value="4" label="vue options">

在 vue options 风格中使用，需要额外安装`@alova/vue-options`包。

```js
import { createAlova } from 'alova';
import { VueOptionsHook } from '@alova/vue-options';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: VueOptionsHook
  // highlight-end
});
```

</TabItem>
</Tabs>

如果你希望在这些 UI 框架外使用 alova，也可以实现一个[自定义的 statesHook](/v2/tutorial/custom/custom-stateshook)。

等什么？赶紧继续了解下核心的 useHook 吧！
