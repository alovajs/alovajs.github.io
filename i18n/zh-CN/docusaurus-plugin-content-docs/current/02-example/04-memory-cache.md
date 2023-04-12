---
title: 响应缓存-内存模式
sidebar_position: 20
---

import MemoryCache from '@site/example-links/MemoryCache';

> 示例以 vue3 为例，但你还可以在 react、svelte 中使用 alova，详细请阅读 [入门指南](/get-started/overview);

<MemoryCache></MemoryCache>

:::info 示例说明

内存缓存模式是将响应数据存放在内存中，缓存在刷新页面即失效。

_操作引导：_

1. 点击以下的学生列表项，将会发送请求学生详细信息，此时模态框显示 Loading 状态；
2. 点击遮罩关闭弹框，并重新打开它，此时将会命中缓存并立即显示学生详细信息，Request Records 中不再打印请求记录；

:::
