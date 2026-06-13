:::tip Example tip

If you haven’t learned about alova yet, it is recommended that you read [alova overview](/v2/tutorial/getting-started) first.

:::

## Install

**npm:**

```bash
npm install alova --save
```


---

**yarn:**

```bash
yarn add alova
```


---

**pnpm:**

```bash
pnpm add alova
```


---

**bun:**

```bash
bun add alova
```


> You can also [use alova through CDN](/v2/tutorial/others/use-in-static)

## Create alova instance

In alova, a request needs to be made through an alova instance. Let's create one first. When creating an alova instance, you need to specify a request adapter. It is recommended to use the `GlobalFetch` request adapter here, which is a package based on the `fetch API`.

**esModule:**

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

const alovaInstance = createAlova({
  requestAdapter: GlobalFetch()
});
```


---

**commonJS:**

```javascript
const { createAlova } = require('alova');
const GlobalFetch = require('alova/GlobalFetch');

const alova = createAlova({
   requestAdapter: GlobalFetch();
});
```

> When using GlobalFetch in nodejs, the nodejs version requires `v17.5`, or you can use [axios request adapter](/v2/tutorial/request-adapter/alova-adapter-axios/).

---

**deno:**

```javascript
import { createAlova } from 'npm:alova';
import GlobalFetch from 'npm:alova/GlobalFetch';

const alova = createAlova({
   requestAdapter: GlobalFetch();
});
```


## GET request

Sending a request via `alovaInstance.Get` will receive a `Response` instance thanks to the `GlobalFetch` request adapter, which is simple.



In an asynchronous function, you can also use `await alovaInstance.Get` to wait for a response.

## POST request

Submitting data via `alovaInstance.Post` is also easy.



## What’s next?

In fact, this is just the simplest request example. We will learn more about the features in the next chapters, so let's start learning.
