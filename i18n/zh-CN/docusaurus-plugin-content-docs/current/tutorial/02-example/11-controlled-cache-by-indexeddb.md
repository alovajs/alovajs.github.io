---
title: 使用IndexedDB管理缓存
sidebar_position: 110
---

import ControlledCacheByIndexedDB from '@site/example-links/ControlledCacheByIndexedDB';

> 示例以 vue3 为例，但你还可以在 react、svelte 中使用 alova，详细请阅读 [入门指南](../get-started/overview);

<ControlledCacheByIndexedDB></ControlledCacheByIndexedDB>

:::info 示例说明

使用受控缓存让开发者自定义管理缓存，在大文件缓存下，可以配合 IndexedDB 管理本地缓存。

_操作引导：_

1. 选择其中一张图片，图片会先请求网络加载，图片数据将会保存在本地 IndexedDB 中；
2. 刷新页面，再次选择相同的图片，图片将在 IndexedDB 中获取数据，而不再发起网络请求；

[受控缓存文档](../next-step/controlled-cache)

:::
