---
title: 快速开始
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";

import quickStartGET from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/get.js';
import quickStartPOST from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/post.js';

:::tip 示例提示

如果你还未了解 alova，推荐你先阅读 [alova 概述](/tutorial/getting-started)。

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
<TabItem value="3" label="pnpm">

```bash
pnpm add alova
```

</TabItem>
<TabItem value="4" label="bun">

```bash
bun add alova
```

</TabItem>
</Tabs>

> 你也可以[通过 CDN 使用 alova](/tutorial/others/use-in-static)

## 创建 alova 实例

在 alova 中需要通过 alova 实例发起请求，我们先创建一个。在创建 alova 实例时需要指定请求适配器，在这里推荐使用`alova/fetch`请求适配器，它是基于`fetch API`的封装，非常简洁。

<Tabs>
<TabItem value="1" label="esModule">

```javascript
import { createAlova } from 'alova';
import fetchAdapter from 'alova/fetch';

const alovaInstance = createAlova({
  requestAdapter: fetchAdapter()
});
```

</TabItem>
<TabItem value="2" label="commonJS">

```javascript
const { createAlova } = require('alova');
const fetchAdapter = require('alova/fetch');

const alova = createAlova({
  requestAdapter: fetchAdapter();
});
```

> 在 nodejs 中使用 fetchAdapter 时，nodejs 版本要求`v17.5`，或者你可以使用[axios 请求适配器](/tutorial/request-adapter/alova-adapter-axios/)。

</TabItem>
<TabItem value="3" label="deno">

```javascript
import { createAlova } from 'npm:alova';
import fetchAdapter from 'npm:alova/fetch';

const alova = createAlova({
  requestAdapter: fetchAdapter();
});
```

</TabItem>
</Tabs>

## GET 请求

通过 `alovaInstance.Get` 发送一个请求，由于使用了`fetchAdapter`请求适配器，将会接收到一个`Response`实例，这很简单。

```js
const response = await alovaInstance
  .Get('https://alovajs.dev/user/profile')
  .then(response => response.json());
```

在异步函数中，你也可以使用`await alovaInstance.Get`等待响应。

## POST 请求

通过 `alovaInstance.Post`提交数据，这同样很简单。

```js
const response = alovaInstance
  .Post('https://alovajs.dev/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then(response => response.json());
```

## 接下来要做什么？

实际上，这只是一个最简单的请求示例，在接下来的章节中将会了解更多功能，让我们开始学习吧。
