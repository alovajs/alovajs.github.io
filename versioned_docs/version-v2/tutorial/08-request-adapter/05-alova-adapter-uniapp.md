---
title: Uniapp Adapter
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Tips

This plugin only supports vue3 version of uniapp application.

:::

## Install

<Tabs groupId="framework">
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-uniapp --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-uniapp
```

</TabItem>
</Tabs>

## Usage

### create alova

Calling **AdapterUniapp** will return _Request Adapter_, _Storage Adapter_, and _VueHook_, so you no longer need to set these three items, and the usage is exactly the same.

```javascript
import { createAlova } from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';

const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org',
  ...AdapterUniapp()
});
```

### Request

The usage method of the request is exactly the same as that used in the web environment. Already fully compatible with `uni.request`, you can specify [all configuration items] supported by `uni.request` in _config_ of method instance creation (https://uniapp.dcloud.net.cn/api/request/ request.html)

```html
<tempate>
   <view v-if="loading">Loading...</view>
   <view>The requested data is: {{ data }}</view>
</template>

<script setup>
   const list = () =>
     alovaInst.Get('/list', {
       // The set parameters will be passed to uni.request
       enableHttp2: true,
       sslVerify: true
     });
   const { loading, data } = useRequest(list);
</script>
```

When using `useRequest/useWatcher` to send a request immediately, it will be executed asynchronously in the `onLoad` hook, so you can access the options data in `methodHandler` as follows:

```javascript
import { onLoad } from '@dcloudio/uni-app';

let options = {};
onLoad(opt => {
  options = opt;
});
const { loading, data } = useRequest(() => getDetail(options.id));
```

### Upload

When `requestType: 'upload'` is set in the _config_ of the method instance, it means to upload the file, the request adapter will call `uni.uploadFile`, and the uploaded file data is placed in the data of the method instance, you need to specify in the data `name`, `filePath or files`, and `file` (if necessary), these 4 parameters will be passed to `uni.uploadFile`, at the same time, you can also specify other parameters besides these 4 parameters in data , the request adapter will pass them into the `formData` parameter.

Similarly, it is fully compatible with `uni.uploadFile`, you can specify [all configuration items] supported by `uni.uploadFile` in _config_ of method instance creation (https://uniapp.dcloud.net.cn/api /request/network-file.html#uploadfile), if there are additional parameters to be set, please specify them in _config_ of the method instance.

```html
<tempate>
   <view v-if="loading">Uploading...</view>
   <view>Upload progress: {{ uploading.loaded }}/{{ uploading.total }}</view>
   <button @click="handleImageChoose">Upload image</button>
   <!-- ... -->
</template>

<script setup>
   const uploadFile = (name, filePath, formData) =>
     alovaInst. Post(
       '/uploadImg',
       {
         name,
         filePath,

         // Additional data will be passed into formData of uni.uploadFile
         ...formData
       },
       {
         // Set the request method to upload, and the adapter will call uni.uploadFile
         requestType: 'upload',
         fileType: 'image',

         // Start upload progress
         enableUpload: true
       }
     );

   const { loading, data, uploading, send } = useRequest(uploadFile, {
     immediate: false
   });

   const handleImageChoose = () => {
     uni.chooseImage({
       success: chooseImageRes => {
         const tempFilePaths = chooseImageRes.tempFilePaths;
         send('fileName', tempFilePaths[0], {
           extra1: 'a',
           extra2: 'b'
         });
       }
     });
   };
</script>
```

### download

When `requestType: 'download'` is set in the _config_ of the method instance, it means to download the file, and the request adapter will call `uni.downloadFile`.

Similarly, it is fully compatible with `uni.downloadFile`, you can specify [all configuration items] supported by `uni.downloadFile` in _config_ of method instance creation (https://uniapp.dcloud.net.cn/api /request/network-file.html#downloadfile), if there are additional parameters to be set, please specify them in _config_ of the method instance.

```html
<tempate>
   <view v-if="loading">Downloading...</view>
   <view>Download progress: {{ downloading.loaded }}/{{ downloading.total }}</view>
   <button @click="handleImageDownload">Download image</button>
   <!-- ... -->
</template>

<script setup>
   const downloadFile = filePath =>
     alovaInst.Get('/bigImage.jpg', {
       // Set the request method to download, and the adapter will call uni.downloadFile
       requestType: 'download',
       filePath,

       // Start download progress
       enableDownload: true
     });

   const { loading, data, downloading, send } = useRequest(downloadFile, {
     immediate: false
   });

   const handleImageDownload = () => {
     send('file_save_path');
   };
</script>
```

## Mock request adapter compatible

When using uniapp to develop applications, we may still need to use simulated requests, but by default, the response data of [mock adapter (@alova/mock)](/v2/tutorial/request-adapter/alova-mock) is a `Response` instance, That is, it is compatible with the `GlobalFetch` request adapter by default. When used in the uniapp environment, we need to make the response data of the simulated request adapter compatible with the uniapp adapter, so you need to use the **@alova/adapter-uniapp** package exported `uniappMockResponse` as response adapter.

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import AdapterUniapp, { uniappRequestAdapter, uniappMockResponse } from '@alova/adapter-uniapp';

const mocks = defineMock({
  //...
});

// mock data request adapter
export default createAlovaMockAdapter([mocks], {
  // After specifying the uniapp request adapter, requests that do not match the simulated interface will use this adapter to send requests
  httpAdapter: uniappRequestAdapter,

  // Simulate the response adapter, after specifying, the response data will be converted to a uniapp-compatible data format
  onMockResponse: uniappMockResponse
});

export const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org',
  timeout: 5000,
  ...AdapterUniapp({
    // Control whether to use the simulated request adapter through environment variables
    mockRequest: process.env.NODE_ENV === 'development' ? mockAdapter : undefined
  })
  //...
});
```

## Typescript

uniapp request adapter provides complete type adaptation, and the type of method configuration and response data will exactly match the type of uniapp.

### method configuration

When creating a method instance, in addition to the general configuration items in the method, you can also use the configuration items in `uniapp.request`, `uniapp.uploadFile` and `uniapp.downloadFile`, we have removed and method from the type Items that conflict with the common configuration of the instance.

```typescript
/**
 * uni.request requests additional parameters
 */
export type UniappRequestConfig = Omit<
  UniNamespace.RequestOptions,
  'url' | 'data' | 'header' | 'method' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * uni.uploadFile additional parameters
 */
export type UniappUploadConfig = Omit<
  UniNamespace.UploadFileOption,
  'url' | 'name' | 'header' | 'formData' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * uni.downloadFile additional parameters
 */
export type UniappDownloadConfig = Omit<
  UniNamespace.DownloadFileOption,
  'url' | 'header' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * Merged request configuration parameters
 */
export type UniappConfig = {
  /**
   * Request type, upload means upload, download means download, not filling means normal request
   */
  requestType?: 'upload' | 'download';
} & UniappRequestConfig &
  UniappUploadConfig &
  UniappDownloadConfig;
```

### Response data

Because the uniapp request adapter is compatible with `uniapp.request`, `uniapp.uploadFile` and `uniapp.downloadFile`, but their response value types are slightly different, so the response data type is as follows:

```typescript
type UniappResponse =
  // The response type of uni.request
  | UniNamespace.RequestSuccessCallbackResult

  // The response type of uni.uploadFile
  | UniNamespace.UploadFileSuccessCallbackResult

  // The response type of uni.downloadFile
  | UniNamespace.DownloadSuccessData;
```

In actual use, we usually need to process the response data globally. It is recommended to judge the returned data separately. A simple example is as follows:

```typescript
const alovaInst = createAlova(
   baseURL: 'https://api.alovajs.org',
   ...AdapterUniapp(),
   responded(response) {
     const { statusCode, data } = response as UniNamespace.RequestSuccessCallbackResult;
     if (statusCode >= 400) {
       throw new Error('request error');
     }
     return data || null;
   }
});
```
