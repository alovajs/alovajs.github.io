---
title: 响应缓存-缓存占位模式
sidebar_position: 23
---

> 以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/index);

:::info 示例说明
缓存占位模式是将响应数据持久化，它将在刷新页面后立即更新到data state中作为占位数据，同时发送请求，开发者可以在响应前使用占位数据替代Loading状态。

*操作引导：*
1. 点击`Reload page`刷新页面，你不再看到Loading状态，而是旧数据被渲染出来了，且当请求响应后被替换为新数据；
2. 点击`Invalidate the data of placeholder`让缓存数据失效，此时你将重新看到Loading状态；
:::

<iframe src="https://codesandbox.io/embed/storage-placeholder-09053c?fontsize=14&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '500px',
    border: '0',
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="storage-placeholder"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>