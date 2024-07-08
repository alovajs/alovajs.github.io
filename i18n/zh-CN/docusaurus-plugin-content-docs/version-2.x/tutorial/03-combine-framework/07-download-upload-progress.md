---
title: 下载和上传进度
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

useHook 提供了`downloading`和`uploading`用于直接在视图中展示进度信息。

## 下载进度

为了性能考虑，默认情况下`downloading`中没有进度信息，需要将 method 实例的`enableDownload`设置为`true`，就会在下载过程中持续更新`downloading`状态。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div>文件大小：{{ downloading.total }}B</div>
  <div>已下载：{{ downloading.loaded }}B</div>
  <div>进度：{{ downloading.loaded / downloading.total * 100 }}%</div>
</template>

<script setup>
  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    // highlight-start
    // 开启下载进度
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
  // 开启下载进度
  enableDownload: true
  // highlight-end
});

const App = () => {
  const { downloading } = useRequest(downloadGetter);
  return (
    <>
      <div>文件大小：{downloading.total}B</div>
      <div>已下载：{downloading.loaded}B</div>
      <div>进度：{(downloading.loaded / downloading.total) * 100}%</div>
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
    // 开启下载进度
    enableDownload: true
    // highlight-end
  });
  const { downloading } = useRequest(downloadGetter);
</script>

<div>文件大小：{$downloading.total}B</div>
<div>已下载：{$downloading.loaded}B</div>
<div>进度：{$downloading.loaded / $downloading.total * 100}%</div>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <div>文件大小：{{ file.downloading.total }}B</div>
  <div>已下载：{{ file.downloading.loaded }}B</div>
  <div>进度：{{ file.downloading.loaded / file.downloading.total * 100 }}%</div>
</template>

<script>
  import { useRequest } from 'alova';
  import { mapAlovaHook } from '@alova/vue-options';

  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    // highlight-start
    // 开启下载进度
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

## 上传进度

使用上传进度状态与下载进度使用方法相同，先通过`enableUpload`开启上传进度信息，再通过接收`uploading`响应式状态接收。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div>文件大小：{{ uploading.total }}B</div>
  <div>已上传：{{ uploading.loaded }}B</div>
  <div>进度：{{ uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script setup>
  const uploadPoster = alovaInstance.Post('/todo/uploadfile', formData, {
    // highlight-start
    // 开启上传进度
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
  // 开启上传进度
  enableUpload: true
  // highlight-end
});

const App = () => {
  const { uploading } = useRequest(uploadPoster);
  return (
    <>
      <div>文件大小：{uploading.total}B</div>
      <div>已上传：{uploading.loaded}B</div>
      <div>进度：{(uploading.loaded / uploading.total) * 100}%</div>
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
    // 开启上传进度
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(uploadPoster);
</script>

<div>文件大小：{$uploading.total}B</div>
<div>已上传：{$uploading.loaded}B</div>
<div>进度：{$uploading.loaded / $uploading.total * 100}%</div>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <div>文件大小：{{ file.uploading.total }}B</div>
  <div>已上传：{{ file.uploading.loaded }}B</div>
  <div>进度：{{ file.uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script>
  const uploadPoster = alovaInstance.Post('/todo/uploadfile', formData, {
    // highlight-start
    // 开启上传进度
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
