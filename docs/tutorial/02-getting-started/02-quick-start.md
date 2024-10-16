---
title: Quick Start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";

import quickStartGET from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/get.js';
import quickStartPOST from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/post.js';

:::tip Tips

If you haven't learned about alova yet, it is recommended that you read [introduce alova](/tutorial/getting-started/introduce) first.

And we provide a [Tutorial in 5 minutes video](/video-tutorial) to help you learn alova quickly.

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

## Create an alova instance

In alova, you need to initiate a request through an alova instance. Let's create one first. When creating an alova instance, you need to specify a request adapter. Here we recommend using the `alova/fetch` request adapter, which is a wrapper based on the `fetch API` and is very concise.

<Tabs>
<TabItem value="1" label="esModule">

```javascript
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
```

</TabItem>
<TabItem value="2" label="commonJS">

```javascript
const { createAlova } = require('alova');
const adapterFetch = require('alova/fetch');

const alova = createAlova({
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
```

> When using adapterFetch in nodejs, the nodejs version requires `v17.5`, or you can use [axios request adapter](/resource/request-adapter/axios/).

</TabItem>
<TabItem value="3" label="deno">

```javascript
import { createAlova } from 'npm:alova';
import adapterFetch from 'npm:alova/fetch';

const alova = createAlova({
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
```

</TabItem>
</Tabs>

## GET request

Send a request through `alovaInstance.Get`. Since the `adapterFetch` request adapter is used, a `Response` instance will be received. This is very simple.

```js
const response = await alovaInstance.Get('https://alovajs.dev/user/profile');
```

In an asynchronous function, you can also use `await alovaInstance.Get` to wait for the response.

## POST request

Submit data through `alovaInstance.Post`. This is also very simple.

```js
const response = alovaInstance.Post('https://alovajs.dev/posts', {
  title: 'foo',
  body: 'bar',
  userId: 1
});
```

## What to do next?

In fact, this is just a simple request example. You will learn more functions in the next chapter. Let's start learning.
