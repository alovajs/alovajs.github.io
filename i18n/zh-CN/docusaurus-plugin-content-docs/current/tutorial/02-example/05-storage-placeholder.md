---
title: 响应缓存-缓存占位模式
sidebar_position: 50
---

import StoragePlaceholder from '@site/example-links/StoragePlaceholder';

> 示例以 vue3 为例，但你还可以在 react、svelte 中使用 alova，详细请阅读 [入门指南](/tutorial/get-started/overview);

<StoragePlaceholder></StoragePlaceholder>

:::info 示例说明

缓存占位模式是将响应数据持久化，它将在刷新页面后立即更新到 data state 中作为占位数据，同时发送请求，开发者可以在响应前使用占位数据替代 Loading 状态。

_操作引导：_

1. 点击`Reload page`刷新页面，你不再看到 Loading 状态，而是旧数据被渲染出来了，且当请求响应后被替换为新数据；
2. 点击`Invalidate the data of placeholder`让缓存数据失效，此时你将重新看到 Loading 状态；

:::
