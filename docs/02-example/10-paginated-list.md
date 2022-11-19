---
title: list of page numbers
sidebar_position: 60
---

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../overview/index);

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

:::info example description
Using the `usePagination` in the **@alova/hooks** extension, you can achieve a more high-performance and easy-to-use pagination function, automatic management of paging-related status, preloading of previous and previous pages, and automatic maintenance of data addition/editing/replacement/ Removed, and request-level stabilization.

*Operation guide:*
1. After the initialization is completed, the next page of data will be preloaded, and there is no need to wait when turning to the next page;
2. Adding, deleting, and modifying list items does not need to reset the list, it will be automatically processed into the same effect as the re-request;

[usePagination documentation](../extension/alova-hooks/usePagination)
:::