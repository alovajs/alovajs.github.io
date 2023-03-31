---
title: Taro Adapter
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Tips

This plugin only supports the taro application of react 16.8+, vue3 version.

:::

## Install

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-taro --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-taro
```

</TabItem>
</Tabs>

:::caution Caution

If you are develop a React-Native app with Taro, please ensure `metro >= 0.76.0` and enable `resolver.unstable_enablePackageExports` in the `metro.config.js`.

[about unstable_enablePackageExports of metro](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)

:::

## Usage

### create alova

Calling **AdapterTaro** will return _Request Adapter_, _Storage Adapter_, and _ReactHook_, so you no longer need to set these three items, and the usage is exactly the same.

<Tabs groupId="framework">
<TabItem value="2" label="react">

```javascript
import { createAlova } from 'alova';
import AdapterTaro from '@alova/adapter-taro';

const alovaInst = createAlova(
   baseURL: 'https://api.alovajs.org',
   ...AdapterTaro()
);
```

</TabItem>

<TabItem value="1" label="vue">

```javascript
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import AdapterTaro from '@alova/adapter-taro';

const alovaInst = createAlova(
   baseURL: 'https://api.alovajs.org',
   ...AdapterTaro(),

   // Use ReactHook by default, replace it with VueHook by overriding
   statesHook: VueHook
);
```

</TabItem>
</Tabs>

### Request

The usage method of the request is exactly the same as that used in the web environment. Already fully compatible with `Taro.request`, you can specify [all configuration items](https://taro-docs.jd.com/docs/apis/network/request/) supported by `Taro.request` in the _config_ of method instance creation

<Tabs groupId="framework">
<TabItem value="2" label="react">

```jsx
const list = () =>
   alovaInst. Get('/list', {
     // The set parameters will be passed to Taro.request
     enableHttp2: true
   });

const App = () => {
   const { loading, data } = useRequest(list);

   return (
     { loading ? <View>Loading...</View> : null }
     <View>The requested data is: { JSON.stringify(data) }</View>
   )
};
```

</TabItem>
<TabItem value="1" label="vue">

```html
<tempate>
   <view v-if="loading">Loading...</view>
   <view>The requested data is: {{ data }}</view>
</template>

<script setup>
   const list = () =>
     alovaInst. Get('/list', {
       // The set parameters will be passed to Taro.request
       enableHttp2: true
     });
   const { loading, data } = useRequest(list);
</script>
```

</TabItem>
</Tabs>

### Upload

When `requestType: 'upload'` is set in the _config_ of the method instance, it means to upload the file, the request adapter will call `Taro.uploadFile`, and the uploaded file data is placed in the data of the method instance, you need to specify in the data `name` and `filePath`, these two parameters will be passed to `Taro.uploadFile`, at the same time, you can also specify other parameters in data, and the request adapter will pass them to `formData `in parameters.

Similarly, it is fully compatible with `Taro.uploadFile`, you can specify [all configuration items](https://taro-docs.jd.com/docs/apis/network/upload/uploadFile) supported by `Taro.uploadFile`, if there are additional parameters to be set, please specify them in _config_ of the method instance.

<Tabs groupId="framework">
<TabItem value="2" label="react">

```jsx
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

       // Start upload progress
       enableUpload: true
     }
   );

const App = () => {
   const { loading, data, uploading, send } = useRequest(uploadFile, {
     immediate: false
   });

   const handleImageChoose = () => {
     Taro. chooseImage({
       success: chooseImageRes => {
         const tempFilePaths = chooseImageRes.tempFilePaths;
         send('fileName', tempFilePaths[0], {
           extra1: 'a',
           extra2: 'b'
         });
       }
     });
   };

   return (
     { loading ? <View>Uploading...</View> : null }
     <View>Upload progress: { uploading.loaded }/{ uploading.total }</View>
     <Button onClick={handleImageChoose}>Upload Image</Button>
     {/* ... */}
   )
}
```

</TabItem>
<TabItem value="1" label="vue">

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

         // Start upload progress
         enableUpload: true
       }
     );

   const { loading, data, uploading, send } = useRequest(uploadFile, {
     immediate: false
   });

   const handleImageChoose = () => {
     Taro. chooseImage({
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

</TabItem>
</Tabs>

### download

When `requestType: 'download'` is set in the _config_ of the method instance, it means to download the file, and the request adapter will call `Taro.downloadFile`.

Similarly, it is fully compatible with `Taro.downloadFile`, you can specify [all configuration items](https://taro-docs.jd.com/docs/apis/network/download/downloadFile) supported by `Taro.downloadFile`, if there are additional parameters to be set, please specify them in _config_ of the method instance.

<Tabs groupId="framework">
<TabItem value="2" label="react">

```jsx
const downloadFile = filePath =>
   alovaInst. Get('/bigImage. jpg', {
     // Set the request method to download, and the adapter will call uni.downloadFile
     requestType: 'download',
     filePath,

     // Start download progress
     enableDownload: true
   });

const App = () => {
   const { loading, data, downloading, send } = useRequest(downloadFile, {
     immediate: false
   });
   const handleImageDownload = () => {
     send('file_save_path');
   };

   return (
     { loading ? <View>Downloading...</View> : null }
     <View>Download progress: { downloading.loaded }/{ downloading.total }</View>
     <Button onClick={handleImageDownload}>Download image</Button>
     {/* ... */}
   );
}
```

</TabItem>
<TabItem value="1" label="vue">

```html
<tempate>
   <view v-if="loading">Downloading...</view>
   <view>Download progress: {{ downloading.loaded }}/{{ downloading.total }}</view>
   <button @click="handleImageDownload">Download image</button>
   <!-- ... -->
</template>

<script setup>
   const downloadFile = filePath =>
     alovaInst. Get('/bigImage. jpg', {
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

</TabItem>
</Tabs>

## Mock request adapter compatible

When using Taro to develop applications, we may still need to use mock requests, but by default, the response data of [Mock Request Adapter (@alova/mock)](/extension/alova-mock) is a `Response` instance, That is, it is compatible with the `GlobalFetch` request adapter by default. When used in the Taro environment, we need to make the response data of the simulated request adapter compatible with the Taro adapter, so you need to use the **@alova/adapter-taro** package exported `taroMockResponse` as response adapter.

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import AdapterTaro, { taroRequestAdapter, taroMockResponse } from '@alova/adapter-taro';

const mocks = defineMock({
  //...
});

// mock data request adapter
export default createAlovaMockAdapter([mocks], {
  // After specifying the taro request adapter, requests that do not match the simulated interface will use this adapter to send requests
  httpAdapter: taroRequestAdapter,

  // Simulate the response adapter, after specifying, the response data will be converted to a taro-compatible data format
  onMockResponse: taroMockResponse
});

export const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org',
  timeout: 5000,
  ...AdapterTaro({
    // Control whether to use the simulated request adapter through environment variables
    mockRequest: process.env.NODE_ENV === 'development' ? mockAdapter : undefined
  })
  //...
});
```

## Typescript

The taro request adapter provides complete type adaptation, and the type of method configuration and response data will exactly match the type of taro.

### method configuration

When creating a method instance, in addition to the general configuration items in the method, you can also use the configuration items in `Taro.request`, `Taro.uploadFile` and `Taro.downloadFile`, we have removed the type and method Items that conflict with the common configuration of the instance.

```typescript
/**
 * Taro.request requests additional parameters
 */
export type TaroRequestConfig = Omit<
  Taro.request.Option,
  'url' | 'data' | 'header' | 'method' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * Taro.uploadFile additional parameter
 */
export type TaroUploadConfig = Omit<
  Taro.uploadFile.Option,
  'url' | 'filePath' | 'name' | 'header' | 'formData' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * Taro.downloadFile additional parameters
 */
export type TaroDownloadConfig = Omit<
  Taro.downloadFile.Option,
  'url' | 'header' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * Merged request configuration parameters
 */
export type TaroConfig = {
  /**
   * Request type, upload means upload, download means download, not filling means normal request
   */
  requestType?: 'upload' | 'download';
} & TaroRequestConfig &
  TaroUploadConfig &
  TaroDownloadConfig;
```

### Response data

Because the taro request adapter is compatible with `Taro.request`, `Taro.uploadFile` and `Taro.downloadFile`, but their response value types are slightly different, so the response data type is as follows:

```typescript
type TaroResponse =
  // The response type of Taro.request
  | Taro.request.SuccessCallbackResult<any>

  // The response type of Taro.uploadFile
  | Taro.uploadFile.SuccessCallbackResult

  // The response type of Taro.downloadFile
  | Taro.downloadFile.FileSuccessCallbackResult;
```

In actual use, we usually need to process the response data globally. It is recommended to judge the returned data separately. A simple example is as follows:

```typescript
const alovaInst = createAlova(
   baseURL: 'https://api.alovajs.org',
   ...AdapterTaro(),
   responded(response) {
     const { statusCode, data } = response as Taro.request.SuccessCallbackResult<any>;
     if (statusCode >= 400) {
       throw new Error('request error');
     }
     return data || null;
   }
});
```
