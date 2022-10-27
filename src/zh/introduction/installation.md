---
title: 安装/使用
order: 4
---

使用alova时，请确保以下版本
1. React: > v16.8
2. Vue: 3.x
3. Svelte: 任意

> 想先尝试一下吗？可以[点此](#xx)查看示例！

## 安装
::: tabs
@tab npm

```bash
npm install alova --save
```

@tab yarn

```bash
yarn add alova
```
:::

### 在esModule中使用

::: tabs
@tab vue

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
const alovaInstance = createAlova({
	// 服务器根目录
	baseURL: 'https://api.alovajs.org',

	// VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等（后续详细介绍）
	statesHook: VueHook,

	// 请求适配器，我们推荐并提供了fetch请求适配器
	requestAdapter: GlobalFetch()
});
```

@tab react

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
const alovaInstance = createAlova({
	// 服务器根目录
	baseURL: 'https://api.alovajs.org',

	// ReactHook用于创建react状态，包括请求状态loading、响应数据data、请求错误对象error等（后续详细介绍）
	statesHook: ReactHook,

	// 请求适配器，我们推荐并提供了fetch请求适配器
	requestAdapter: GlobalFetch()
});
```

@tab svelte

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';
const alovaInstance = createAlova({
	// 服务器根目录
	baseURL: 'https://api.alovajs.org',

	// SvelteHook用于创建svelte的store状态，包括请求状态loading、响应数据data、请求错误对象error等（后续详细介绍）
	statesHook: SvelteHook,

	// 请求适配器，我们推荐并提供了fetch请求适配器
	requestAdapter: GlobalFetch()
});
```

:::

## cdn

### 引入核心代码
```html
<script src="https://unpkg.com/alova/dist/alova.umd.min.js"></script>
```
导入后，你可以通过`window.alova`使用api。

### 引入fetch adapter
```html
<script src="https://unpkg.com/alova/dist/adapter/globalfetch.umd.min.js"></script>
```
你可以通过`window.GlobalFetch`使用，它将使用`winfow.fetch`进行请求。


### 引入lib hook

你可以根据项目所用的框架，使用不同的lib hook

::: tabs
@tab vue

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/alova/dist/hooks/vuehook.umd.min.js"></script>
```
当在vue3项目中使用时需引入，你可以通过`window.VueHook`访问

> 它依赖vue，因此需先引入vue

@tab react

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/alova/dist/hooks/reacthook.umd.min.js"></script>
```
当在react项目中使用时需引入，你可以通过`window.ReactHook`访问

> 它依赖react，因此需先引入react和react-dom

@tab svelte

svelte依赖于编译工具，不能通过cdn直接使用

详情见 [svelte.dev](https://svelte.dev/)

:::


### 在静态html中使用
::: tabs
@tab vue

```html
<script>
const alovaInstance = window.alova.createAlova({
	baseURL: 'https://api.alovajs.org',
	statesHook: window.VueHook,
	requestAdapter: window.GlobalFetch()
});
</script>
```

@tab react

```html
<script>
const alovaInstance = window.alova.createAlova({
	baseURL: 'https://api.alovajs.org',
	statesHook: window.ReactHook,
	requestAdapter: window.GlobalFetch()
});
</script>
```

:::