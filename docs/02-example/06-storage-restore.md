---
title: Response Caching - Recovery Mode
sidebar_position: 27
---

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../overview/index);

<iframe src="https://codesandbox.io/embed/vite-vue-starter-9hex50?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue"
  style={{
    width: '100%',
    height: '500px',
    border: '0',
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="storage-restore"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

:::info example description
The cache recovery mode is to persist the response data. When the request hits the cache, the persistent cached data will be returned, and no more requests will be issued. It is generally used for some data that needs server management but does not change for a certain period of time. The following is an example of the recovery mode of holiday information.

*Operation guide:*
1. Click `Reload page` to refresh the page, you will no longer see the Loading status, but will use the cached data and render it to the page immediately, and no longer send requests;
2. Click `Invalidate the data of placeholder` to invalidate the cached data, then you will see the Loading status again;
:::