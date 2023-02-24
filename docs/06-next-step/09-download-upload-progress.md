---
title: Download/Upload progress
sidebar_position: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

By default, upload and download progress is turned off. You need to enable upload and download progress information on the specified `Method` instance, as follows:

## download progress

First set `enableDownload` to `true`, which means that the download progress is enabled, and then receive the `downloading` responsive state in the three use hooks `useRequest`, `useWatcher`, and `useFetcher`, which will be continuously updated during the download process. this state.

<Tabs groupId="framework">
<TabItem label="vue" value="1">

```html
<template>
  <div>File size: {{ downloading.total }}B</div>
  <div>Downloaded: {{ downloading.loaded }}B</div>
  <div>Progress: {{ downloading.loaded / downloading.total * 100 }}%</div>
</template>

<script setup>
  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    enableDownload: true
  });
  const { dowinlading } = useRequest(downloadGetter);
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
  enableDownload: true
});

const App = () => {
  const { dowinlading } = useRequest(downloadGetter);
  return (
    <>
      <div>File size: {downloading.total}B</div>
      <div>Downloaded: {downloading.loaded}B</div>
      <div>Progress: {(downloading.loaded / downloading.total) * 100}%</div>
    </>
  );
};
```

</TabItem>
<TabItem label="svelte" value="3">

```html
<script>
  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    enableDownload: true
  });
  const { dowinlading } = useRequest(downloadGetter);
</script>

<div>File size: {downloading.total}B</div>
<div>Downloaded: {downloading.loaded}B</div>
<div>Progress: {downloading.loaded / downloading.total * 100}%</div>
```

</TabItem>
</Tabs>

## upload progress

The upload progress is used in the same way as the download progress. First, enable the upload progress information through `enableUpload`, and then receive it through the `uploading` response status.

<Tabs groupId="framework">
<TabItem label="vue" value="1">

```html
<template>
  <div>File size: {{ uploading.total }}B</div>
  <div>Uploaded: {{ uploading.loaded }}B</div>
  <div>Progress: {{ uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script setup>
  const downloadGetter = alovaInstance.Get('/todo/uploadfile', {
    enableUpload: true
  });
  const { uploading } = useRequest(downloadGetter);
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
const downloadGetter = alovaInstance.Get('/todo/uploadfile', {
  enableUpload: true
});

const App = () => {
  const { uploading } = useRequest(downloadGetter);
  return (
    <>
      <div>File size: {uploading.total}B</div>
      <div>Uploaded: {uploading.loaded}B</div>
      <div>Progress: {(uploading.loaded / uploading.total) * 100}%</div>
    </>
  );
};
```

</TabItem>
<TabItem label="svelte" value="3">

```html
<script>
  const downloadGetter = alovaInstance.Get('/todo/uploadfile', {
    enableUpload: true
  });
  const { uploading } = useRequest(downloadGetter);
</script>

<div>File size: {uploading.total}B</div>
<div>Uploaded: {uploading.loaded}B</div>
<div>Progress: {uploading.loaded / uploading.total * 100}%</div>
```

</TabItem>
</Tabs>

:::caution Caution when using the `GlobalFetch` adapter
Due to the limitation of fetch api, the **GlobalFetch** adapter provided by alova does not support upload progress, and more complete request adapters will be provided in the future. At present, if you need to upload the progress, please write your own request adapter. For details, see [Write a Request Adapter](../advanced/custom-http-adapter).
:::

## upload/download status type

```typescript
type Progress = {
  /** The total amount of data uploaded or downloaded */
  total: number;
  /** Completed data */
  loaded: number;
};
```
