---
title: 页码列表
sidebar_position: 60
---

> 示例以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/index);

<iframe src="https://codesandbox.io/embed/pagination-owb89r?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue"
  style={{
    width: '100%',
    height: '500px',
    border: '0',
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="pagination"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

:::info 示例说明
使用 **@alova/hooks** 扩展内的`usePagination`，可以实现更加高性能易用的分页功能，分页相关状态自动管理、前后一页预加载、自动维护数据的新增/编辑/替换/移除，以及请求级的防抖功能。

*操作引导：*
1. 初始化完成后会预加载下一页数据，翻页到下一页时无需等待；
2. 添加、删除、修改列表项无需重置列表，它将自动处理成和重新请求一致的效果；

[usePagination文档](../extension/alova-hooks/usePagination)
:::