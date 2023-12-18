---
title: (vue)下拉加载更多
sidebar_position: 80
---

import LoadMore from '@site/example-links/LoadMore';

> 示例以 vue3 为例，但你还可以在 react、svelte 中使用 alova，详细请阅读 [入门指南](/tutorial/getting-started/overview);

<LoadMore></LoadMore>

:::info 示例说明

使用分页策略，实现更加高性能易用的分页功能，分页相关状态自动管理、前后一页预加载、自动维护数据的新增/编辑/替换/移除，以及请求级的防抖功能。

_操作引导：_

1. 初始化完成后会预加载下一页数据，下拉翻页无需等待；
2. 添加、删除、修改列表项无需重置列表，它将自动处理成和重新请求一致的效果；

[usePagination 文档](/tutorial/strategy/usePagination)

:::
