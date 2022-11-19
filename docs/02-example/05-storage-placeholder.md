---
title: Response Cache - Cache Placeholder Mode
sidebar_position: 23
---

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../overview/index);

<iframe src="https://codesandbox.io/embed/storage-placeholder-09053c?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue"
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

:::info example description
The cache placeholder mode is to persist the response data. It will be updated to the data state as placeholder data immediately after refreshing the page. At the same time, a request is sent. Developers can use placeholder data to replace the Loading state before responding.

*Operation guide:*
1. Click `Reload page` to refresh the page, you no longer see the Loading status, but the old data is rendered and replaced with new data when the request is responded;
2. Click `Invalidate the data of placeholder` to invalidate the cached data, then you will see the Loading status again;
:::