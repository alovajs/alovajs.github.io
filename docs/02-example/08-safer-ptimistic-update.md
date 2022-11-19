---
title: Safer optimistic update
sidebar_position: 40
---

> The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the [Getting Started Guide](../overview/index);

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

:::info example description
Alova's silent submission function allows applications to submit data in the background, so you can immediately update new data to the interface. With alova's unique delayed data update mechanism and background polling mechanism, it will ensure the security of background requests. It will work even if you exit and enter again.

*Operation guide:*
1. Click **Add student**, and click **Submit** to submit the data immediately.
2. The newly added item will appear in the list item immediately, and the submission will be sent silently in the background. When the request responds, the id of the new list item will be automatically updated through the delayed update mechanism.
:::