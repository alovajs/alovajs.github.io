---
title: 更安全的乐观更新
sidebar_position: 40
---

> 示例以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](../overview/index);

<iframe src="https://codesandbox.io/embed/safer-ptimistic-update-tw16we?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue"
  style={{
    width: '100%',
    height: '500px',
    border: '0',
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="safer-ptimistic-update"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

:::info 示例说明
alova的静默提交功能可以让应用在后台提交数据，因此你可以立即将新数据更新到界面上，配合alova独有的延迟数据更新机制，以及后台轮询机制，将会保证后台请求的安全性，即使退出再次进入也将有效。

*操作引导：*
1. 点击**Add student**，并立即点击**Submit**提交数据。
2. 新增项将会立即出现在列表项，同时在后台静默发送提交，当请求响应后，新列表项的id将通过延迟更新机制自动更新进去。
:::