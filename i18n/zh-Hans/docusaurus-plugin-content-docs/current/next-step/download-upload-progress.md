---
title: 下载/上传进度
sidebar_position: 60
---

## 下载进度
在获取下载进度前，你需要在指定`Method`实例上启用下载进度，然后在`useRequest`、`useWatcher`、`useFetcher`三个use hook中接收`downloading`响应式状态，下载过程中将持续更新这个状态。
```javascript
const downloadGetter = alovaInstance.Get('/tood/downloadfile', {
  enableDownload: true
});
const {
  dowinlading
} = useRequest(downloadGetter);
```
```html
<div>文件大小：{{ downloading.total }}B</div>
<div>已下载：{{ downloading.loaded }}B</div>
<div>进度：{{ downloading.loaded / downloading.total * 100 }}%</div>
```

## 上传进度
上传进度与下载进度使用方法相同，先启用再通过接收`uploading`响应式状态。
```javascript
const uploadGetter = alovaInstance.Get('/tood/uploadfile', {
  enableUpload: true
});
const {
  uploading
} = useRequest(uploadGetter);
```
```html
<div>文件大小：{{ uploading.total }}B</div>
<div>已上传：{{ uploading.loaded }}B</div>
<div>进度：{{ uploading.loaded / uploading.total * 100 }}%</div>
```

> ⚠️因fetch api限制，`alova`库提供的`GlobalFetch`适配器不支持上传进度，如需要上传进度，请自行编写请求适配器，详见 [高级-编写请求适配器](#编写请求适配器)。