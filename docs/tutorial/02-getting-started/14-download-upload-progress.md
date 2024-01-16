---
title: Download/Upload progress
sidebar_position: 140
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

By default, upload and download progress is turned off. You need to enable upload and download progress information on the specified `Method` instance, as follows:

## Download progress

### Use the progress state

`useRequest/useWatcher/useFetcher` provides the `downloading` state, which can be used directly in the view. For performance reasons, there is no progress information in `downloading` by default. You need to set `enableDownload` of method instance to `true`, which will continuously update the `downloading` state during the download process.

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
    // highlight-start
    // enable download progress
    enableDownload: true
    // highlight-end
  });
  const { dowinlading } = useRequest(downloadGetter);
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
  // highlight-start
  // enable download progress
  enableDownload: true
  // highlight-end
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
    // highlight-start
    // enable download progress
    enableDownload: true
    // highlight-end
  });
  const { dowinlading } = useRequest(downloadGetter);
</script>

<div>File size: {$downloading.total}B</div>
<div>Downloaded: {$downloading.loaded}B</div>
<div>Progress: {$downloading.loaded / $downloading.total * 100}%</div>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <div>File size: {{ file.downloading.total }}B</div>
  <div>Downloaded: {{ file.downloading.loaded }}B</div>
  <div>Progress: {{ file.downloading.loaded / file.downloading.total * 100 }}%</div>
</template>

<script>
  import { useRequest } from 'alova';
  import { mapAlovaHook } from '@alova/vue-options';

  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    // highlight-start
    // enable download progress
    enableDownload: true
    // highlight-end
  });
  export default {
    mixins: mapAlovaHook(function () {
      return {
        file: useRequest(downloadGetter)
      };
    })
  };
</script>
```

</TabItem>
</Tabs>

### Listen download progress event

`[v2.17.0+]` bind download progress event through `onDownload` of the method instance, which will return the unbinding function.

```javascript
const downloadGetter = alovaInstance.Get('/todo/downloadfile');
const offEvent = downloadGetter.onDownload(event => {
  console.log('File size:'，event.total);
  console.log('Downloaded:'，event.loaded);
});

offEvent(); // Unbind download callback
```

## Upload progress

### Use the progress state

Using the upload progress state is the same as the usage of download progress. Enable the upload progress information through `enableUpload`, and then receive it through the `uploading` state.

<Tabs groupId="framework">
<TabItem label="vue" value="1">

```html
<template>
  <div>File size: {{ uploading.total }}B</div>
  <div>Uploaded: {{ uploading.loaded }}B</div>
  <div>Progress: {{ uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script setup>
  const uploadGetter = alovaInstance.Get('/todo/uploadfile', {
    // highlight-start
    // enable upload progress
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(uploadGetter);
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
const uploadGetter = alovaInstance.Get('/todo/uploadfile', {
  // highlight-start
  // enable upload progress
  enableUpload: true
  // highlight-end
});

const App = () => {
  const { uploading } = useRequest(uploadGetter);
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
  const uploadGetter = alovaInstance.Get('/todo/uploadfile', {
    // highlight-start
    // enable upload progress
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(uploadGetter);
</script>

<div>File size: {$uploading.total}B</div>
<div>Uploaded: {$uploading.loaded}B</div>
<div>Progress: {$uploading.loaded / $uploading.total * 100}%</div>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <div>File size: {{ file.uploading.total }}B</div>
  <div>uploaded: {{ file.uploading.loaded }}B</div>
  <div>Progress: {{ file.uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script>
  const uploadGetter = alovaInstance.Get('/todo/uploadfile', {
    // highlight-start
    // enable upload progress
    enableUpload: true
    // highlight-end
  });

  export default {
    mixins: mapAlovaHook(function () {
      return {
        file: useRequest(uploadGetter)
      };
    })
  };
</script>
```

</TabItem>
</Tabs>

:::warning Caution when using the `GlobalFetch` adapter

Due to the limitation of fetch api, the **GlobalFetch** adapter provided by alova does not support upload progress. If you need to upload the progress, please use [XMLHttpRequest adapter](/tutorial/request-adapter/alova-adapter-xhr) or [axios adapter](/tutorial/request-adapter/alova-adapter-axios)。

And you also can code your own request adapter. For details, see [Write a Request Adapter](/tutorial/custom/custom-http-adapter).

:::

### Listen to upload progress events

`[v2.17.0+]` binds upload progress event through `onUpload` of the method instance, which will return the unbinding function.

```javascript
const uploadGetter = alovaInstance.Get('/todo/uploadfile');
const offEvent = uploadGetter.onUpload(event => {
  console.log('File size:', event.total);
  console.log('Uploaded:', event.loaded);
});

offEvent(); // Unbind upload callback
```

## upload/download states type

```typescript
type Progress = {
  /** The total amount of data uploaded or downloaded */
  total: number;
  /** Completed data */
  loaded: number;
};
```
