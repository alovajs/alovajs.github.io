---
title: Quick Start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";

import quickStartGET from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/get.js';
import quickStartPOST from '!!raw-loader!@site/codesandbox/01-getting-started/02-first-request/post.js';

:::tip Example tip

If you haven’t learned about alova yet, it is recommended that you read [alova overview](/v2/tutorial/getting-started) first.

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

> You can also [use alova through CDN](/v2/tutorial/others/use-in-static)

## Create alova instance

In alova, a request needs to be made through an alova instance. Let's create one first. When creating an alova instance, you need to specify a request adapter. It is recommended to use the `GlobalFetch` request adapter here, which is a package based on the `fetch API`.

<Tabs>
<TabItem value="1" label="esModule">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

const alovaInstance = createAlova({
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="2" label="commonJS">

```javascript
const { createAlova } = require('alova');
const GlobalFetch = require('alova/GlobalFetch');

const alova = createAlova({
   requestAdapter: GlobalFetch();
});
```

> When using GlobalFetch in nodejs, the nodejs version requires `v17.5`, or you can use [axios request adapter](/v2/tutorial/request-adapter/alova-adapter-axios/).

</TabItem>
<TabItem value="3" label="deno">

```javascript
import { createAlova } from 'npm:alova';
import GlobalFetch from 'npm:alova/GlobalFetch';

const alova = createAlova({
   requestAdapter: GlobalFetch();
});
```

</TabItem>
</Tabs>

## GET request

Sending a request via `alovaInstance.Get` will receive a `Response` instance thanks to the `GlobalFetch` request adapter, which is simple.

<EmbedSandpack template="vanilla" mainFile={quickStartGET} editorHeight={400} containBaseURL={false} />

In an asynchronous function, you can also use `await alovaInstance.Get` to wait for a response.

## POST request

Submitting data via `alovaInstance.Post` is also easy.

<EmbedSandpack template="vanilla" mainFile={quickStartPOST} editorHeight={400} containBaseURL={false} />

## What’s next?

In fact, this is just the simplest request example. We will learn more about the features in the next chapters, so let's start learning.
