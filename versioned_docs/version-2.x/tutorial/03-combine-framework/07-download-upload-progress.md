---
title: Download & Upload Progress
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

useHook provides `downloading` and `uploading` for displaying progress information directly in the view.

## Download progress

For performance reasons, there is no progress information in `downloading` by default. You need to set `enableDownload` of the method instance to `true`, which will continuously update the `downloading` status during the download process.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <div>File size: {{ downloading.total }}B</div>
  <div>Downloaded: {{ downloading.loaded }}B</div>
  <div>Progress: {{ downloading.loaded / downloading.total * 100 }}%</div>
</template>

<script setup>
  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    // highlight-start
    // Start download progress
    enableDownload: true
    // highlight-end
  });
  const { downloading } = useRequest(downloadGetter);
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
  // highlight-start
  // Start download progress
  enableDownload: true
  // highlight-end
});

const App = () => {
  const { downloading } = useRequest(downloadGetter);
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
<TabItem value="3" label="svelte">

```html
<script>
  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    // highlight-start
    // Start download progress
    enableDownload: true
    // highlight-end
  });
  const { downloading } = useRequest(downloadGetter);
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
    // Start download progress
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

## Upload progress

Using the upload progress status is the same as using the download progress. First enable the upload progress information through `enableUpload`, and then receive it by receiving the `uploading` responsive state.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div>File size: {{ uploading.total }}B</div>
  <div>Uploaded: {{ uploading.loaded }}B</div>
  <div>Progress: {{ uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script setup>
  const uploadPoster = alovaInstance.Post('/todo/uploadfile', formData, {
    // highlight-start
    // Start upload progress
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(uploadPoster);
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const uploadPoster = alovaInstance.Post('/todo/uploadfile', formData, {
  // highlight-start
  // Start upload progress
  enableUpload: true
  // highlight-end
});

const App = () => {
  const { uploading } = useRequest(uploadPoster);
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
<TabItem value="3" label="svelte">

```html
<script>
  const uploadPoster = alovaInstance.Post('/todo/uploadfile', formData, {
    // highlight-start
    // Start upload progress
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(uploadPoster);
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
  <div>Uploaded: {{ file.uploading.loaded }}B</div>
  <div>Progress: {{ file.uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script>
  const uploadPoster = alovaInstance.Post('/todo/uploadfile', formData, {
    // highlight-start
    // Start upload progress
    enableUpload: true
    // highlight-end
  });

  export default {
    mixins: mapAlovaHook(function () {
      return {
        file: useRequest(uploadPoster)
      };
    })
  };
</script>
```

</TabItem>
</Tabs>
