---
title: Quick Start
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";

import quickStartGET from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/get.js';
import quickStartPOST from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/post.js';

:::tip Example Tips

If you haven't learned about alova yet, it is recommended that you read [alova overview](/tutorial/getting-started) first.

:::

## Installation

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

> You can also [use alova through CDN](/tutorial/others/use-in-static)

## Create an alova instance

In alova, you need to initiate a request through an alova instance. Let's create one first. When creating an alova instance, you need to specify a request adapter. Here we recommend using the `alova/fetch` request adapter, which is a wrapper based on the `fetch API` and is very concise.

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

> When using fetchAdapter in nodejs, the nodejs version requires `v17.5`, or you can use [axios request adapter](/tutorial/request-adapter/alova-adapter-axios/).

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

## GET request

Send a request through `alovaInstance.Get`. Since the `fetchAdapter` request adapter is used, a `Response` instance will be received. This is very simple.

```js
const response = await alovaInstance
  .Get('https://alovajs.dev/user/profile')
  .then(response => response.json());
```

In an asynchronous function, you can also use `await alovaInstance.Get` to wait for the response.

## POST request

Submit data through `alovaInstance.Post`. This is also very simple.

```js
const response = alovaInstance
  .Post('https://alovajs.dev/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then(response => response.json());
```

## What to do next?

In fact, this is just a simple request example. You will learn more functions in the next chapter. Let's start learning.
