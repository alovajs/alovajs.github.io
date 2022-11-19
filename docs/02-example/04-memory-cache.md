---
title: Response Cache - Memory Mode
sidebar_position: 20
---

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../overview/index);

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

:::info example description
The memory cache mode stores the response data in memory, and the cache is invalid when the page is refreshed.

*Operation guide:*
1. Click on the following student list item, the requesting student details will be sent, and the modal box will display the Loading status;
2. Click the mask to close the pop-up box and reopen it. At this time, the cache will be hit and the student details will be displayed immediately, and the request record will no longer be printed in Request Records;
:::