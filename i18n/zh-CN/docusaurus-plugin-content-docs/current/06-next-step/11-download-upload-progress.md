---
title: 下载/上传进度
sidebar_position: 100
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

默认情况下，上传和下载进度是关闭的，你需要在在指定的`Method`实例上开启上传和下载进度信息，具体如下：

## 下载进度

先将`enableDownload`设置为`true`，即表示开启了下载进度，然后在`useRequest`、`useWatcher`、`useFetcher`三个 use hook 中接收`downloading`响应式状态，下载过程中将持续更新这个状态。

<Tabs groupId="framework">
<TabItem label="vue" value="1">

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
  const { dowinlading } = useRequest(downloadGetter);
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
  // highlight-start
  // 开启下载进度
  enableDownload: true
  // highlight-end
});

const App = () => {
  const { dowinlading } = useRequest(downloadGetter);
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
<TabItem label="svelte" value="3">

```html
<script>
  const downloadGetter = alovaInstance.Get('/todo/downloadfile', {
    // highlight-start
    // 开启下载进度
    enableDownload: true
    // highlight-end
  });
  const { dowinlading } = useRequest(downloadGetter);
</script>

<div>文件大小：{$downloading.total}B</div>
<div>已下载：{$downloading.loaded}B</div>
<div>进度：{$downloading.loaded / $downloading.total * 100}%</div>
```

</TabItem>
</Tabs>

## 上传进度

上传进度与下载进度使用方法相同，先通过`enableUpload`开启上传进度信息，再通过接收`uploading`响应式状态接收。

<Tabs groupId="framework">
<TabItem label="vue" value="1">

```html
<template>
  <div>文件大小：{{ uploading.total }}B</div>
  <div>已上传：{{ uploading.loaded }}B</div>
  <div>进度：{{ uploading.loaded / uploading.total * 100 }}%</div>
</template>

<script setup>
  const downloadGetter = alovaInstance.Get('/todo/uploadfile', {
    // highlight-start
    // 开启上传进度
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(downloadGetter);
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
const downloadGetter = alovaInstance.Get('/todo/uploadfile', {
  // highlight-start
  // 开启上传进度
  enableUpload: true
  // highlight-end
});

const App = () => {
  const { uploading } = useRequest(downloadGetter);
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
<TabItem label="svelte" value="3">

```html
<script>
  const downloadGetter = alovaInstance.Get('/todo/uploadfile', {
    // highlight-start
    // 开启上传进度
    enableUpload: true
    // highlight-end
  });
  const { uploading } = useRequest(downloadGetter);
</script>

<div>文件大小：{$uploading.total}B</div>
<div>已上传：{$uploading.loaded}B</div>
<div>进度：{$uploading.loaded / $uploading.total * 100}%</div>
```

</TabItem>
</Tabs>

:::caution 使用`GlobalFetch`适配器需注意

因 fetch api 限制，alova 提供的 **GlobalFetch** 适配器不支持上传进度，如果需要上传进度，请使用[XMLHttpRequest 适配器](/extension/alova-adapter-xhr)或[axios 适配器](/extension/alova-adapter-axios)。

页可以自行编写请求适配器，详见 [编写请求适配器](../advanced/custom-http-adapter)。

:::

## 上传/下载状态类型

```typescript
type Progress = {
  /** 上传或下载的数据总数据量 */
  total: number;
  /** 已完成的数据 */
  loaded: number;
};
```
