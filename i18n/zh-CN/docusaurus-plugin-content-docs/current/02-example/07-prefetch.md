---
title: 数据预拉取
sidebar_position: 30
---

> 示例以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/index);

<iframe src="https://codesandbox.io/embed/prefetch-v7bnyp?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue"
     style={{
    width: '100%',
    height: '500px',
    border: '0',
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="prefetch"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

:::info 示例说明
数据预拉取是一种预测用户操作行为的一种方式，来达到内容更快展示在用户面前的策略。

*操作引导：*
1. 鼠标移动到任意列表项，并停留0.2秒，将会在底部面板上看到详情数据的请求被发送；
2. 单击点开这个列表项，可以立即看到详情数据；
:::