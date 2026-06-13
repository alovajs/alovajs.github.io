:::tip 示例提示

如果你还未了解 alova，推荐你先阅读 [alova 概述](/v2/tutorial/getting-started)。

:::

## 安装

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


> 你也可以[通过 CDN 使用 alova](/v2/tutorial/others/use-in-static)

## 创建 alova 实例

在 alova 中需要通过 alova 实例发起请求，我们先创建一个。在创建 alova 实例时需要指定请求适配器，在这里推荐使用`GlobalFetch`请求适配器， 它是基于`fetch API`的封装。

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

> 在 nodejs 中使用 GlobalFetch 时，nodejs 版本要求`v17.5`，或者你可以使用[axios 请求适配器](/v2/tutorial/request-adapter/alova-adapter-axios/)。

---

**deno:**

```javascript
import { createAlova } from 'npm:alova';
import GlobalFetch from 'npm:alova/GlobalFetch';

const alova = createAlova({
  requestAdapter: GlobalFetch();
});
```


## GET 请求

通过 `alovaInstance.Get` 发送一个请求，由于使用了`GlobalFetch`请求适配器，将会接收到一个`Response`实例，这很简单。



在异步函数中，你也可以使用`await alovaInstance.Get`等待响应。

## POST 请求

通过 `alovaInstance.Post`提交数据，这同样很简单。



## 接下来要做什么？

实际上，这只是一个最简单的请求示例，在接下来的章节中将会了解更多功能，让我们开始学习吧。
