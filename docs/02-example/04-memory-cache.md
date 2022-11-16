---
title: 响应缓存-内存模式
sidebar_position: 20
---

> 示例以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/index);

<iframe src="https://codesandbox.io/embed/vite-vue-starter-cdgb8l?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue"
  style={{
    width: '100%',
    height: '500px',
    border: '0',
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="memory-cache"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

:::info 示例说明
内存缓存模式是将响应数据存放在内存中，缓存在刷新页面即失效。

*操作引导：*
1. 点击以下的学生列表项，将会发送请求学生详细信息，此时模态框显示Loading状态；
2. 点击遮罩关闭弹框，并重新打开它，此时将会命中缓存并立即显示学生详细信息，Request Records中不再打印请求记录；
:::