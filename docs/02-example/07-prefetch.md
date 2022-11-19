---
title: Data Prefetch
sidebar_position: 30
---

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../overview/index);

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

:::info example description
Data pre-fetching is a way to predict user operation behavior to achieve a strategy of displaying content to users faster.

*Operation guide:*
1. Move the mouse to any list item and stay there for 0.2 seconds, a request for detailed data will be sent on the bottom panel;
2. Click to open this list item, you can see the detailed data immediately;
:::