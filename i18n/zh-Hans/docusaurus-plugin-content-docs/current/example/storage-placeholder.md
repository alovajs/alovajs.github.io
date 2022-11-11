---
title: 响应缓存-缓存占位模式
sidebar_position: 23
---

> 以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/);

:::info 示例说明
缓存占位模式是将响应数据持久化，它将在刷新页面后立即更新到data state中作为占位数据，同时发送请求，开发者可以在响应前使用占位数据替代Loading状态。

*操作引导：*
1. 点击`Reload page`刷新页面，你不再看到Loading状态，而是旧数据被渲染出来了，且当请求响应后被替换为新数据；
2. 点击`Invalidate the data of placeholder`让缓存数据失效，此时你将重新看到Loading状态；
:::

@include(../../example-code/storage-placeholder.md)

在 [StackBlitz](https://stackblitz.com/edit/alova-example-storage-placeholder?file=src/App.vue) 中运行此项目