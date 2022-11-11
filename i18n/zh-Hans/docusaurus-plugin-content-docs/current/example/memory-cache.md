---
title: 响应缓存-内存模式
sidebar_position: 20
---

> 以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/);

:::info 示例说明
内存缓存模式是将响应数据存放在内存中，缓存在刷新页面即失效。

*操作引导：*
1. 点击以下的学生列表项，将会发送请求学生详细信息，此时模态框显示Loading状态；
2. 点击遮罩关闭弹框，并重新打开它，此时将会命中缓存并立即显示学生详细信息，Request Records中不再打印请求记录；
:::

@include(../../example-code/memory-cache.md)

在 [StackBlitz](https://stackblitz.com/edit/alova-example-memory-cache?file=src/App.vue) 中运行此项目