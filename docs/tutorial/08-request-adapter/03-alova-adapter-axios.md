---
title: axios adapter
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-axios --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-axios
```

</TabItem>
</Tabs>

## Instructions

### create alova

Use **axiosRequestAdapter** as request adapter for alova.

```javascript
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';

const alovaInst = createAlova({
  //...
  requestAdapter: axiosRequestAdapter()
  //...
});
```

The adapter will use the default axios instance to make requests internally. If you set some global parameters for axios, you may need to pay attention to the following two points:

1. Priority is given to using the `baseURL` and `timeout` parameters in the axios instance, so if you set these parameters on the axios instance, you do not need to set them in `createAlova`;
2. The `beforeRequest` hook of the alova instance will be triggered earlier than the `interceptor.request` of the axios instance, and the `responded` hook of the axios instance will be triggered later than the `interceptor.response` of the axios instance;

> You can also [use custom axios instance](#use-custom-axios-instance)

## usage

### request

The usage of request is exactly the same as that used in the web environment. Already fully compatible with **axios**, you can specify [all configuration items](https://axios-http.com/docs/req_config) supported by `axios` in _config_ of method instance creation.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<tempate>
   <div v-if="loading">Loading...</div>
   <div>The request data is: {{ data }}</div>
</template>

<script setup>
   const list = () =>
     alovaInst.Get('/list', {
       // The set parameters will be passed to axios
       paramsSerializer: params => {
         return Qs.stringify(params, { arrayFormat: 'brackets' });
       }
     });
   const { loading, data } = useRequest(list);
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const list = () =>
   alovaInst.Get('/list', {
     // The set parameters will be passed to axios
     paramsSerializer: params => {
       return Qs.stringify(params, {arrayFormat: 'brackets'})
     },
   });

const App = () => {
   const { loading, data } = useRequest(list);

   return (
     { loading ? <div>Loading...</div> : null }
     <div>The request data is: { JSON.stringify(data) }</div>
   )
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const list = () =>
    alovaInst.Get('/list', {
      // The set parameters will be passed to axios
      paramsSerializer: params => {
        return Qs.stringify(params, { arrayFormat: 'brackets' });
      }
    });
  const { loading, data } = useRequest(list);
</script>

{#if $loading}
<div>Loading...</div>
{/if}
<div>The request data is: { data }</div>
```

</TabItem>
</Tabs>

### Upload

Use `FormData` to upload files, and this `FormData` instance will be passed to axios, which is consistent with the usage of axios upload files.

```javascript
const uploadFile = imageFile => {
  const formData = new FormData();
  formData.append('file', imageFile);
  return alovaInst.Post('/uploadImg', formData, {
    // Start upload progress
    enableUpload: true
  });
};

const {
  loading,
  data,
  uploading,
  send: sendUpload
} = useRequest(uploadFile, {
  immediate: false
});

// Picture selection event callback
const handleImageChoose = ({ target }) => {
  sendUpload(target.files[0]);
};
```

### download

Point the request url to the file address to download, you can also enable the download progress by setting `enableDownload` to true.

```javascript
const downloadFile = () =>
  alovaInst.Get('/bigImage.jpg', {
    // Start download progress
    enableDownload: true,
    responseType: 'blob'
  });

const { loading, data, downloading, send, onSuccess } = useRequest(downloadFile, {
  immediate: false
});
onSuccess(({ data: imageBlob }) => {
  // download image
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'image.jpg';
  anchor.click();
  URL.revokeObjectURL(anchor.href);
});
const handleImageDownload = () => {
  send();
};
```

## Use custom axios instance

By default, this adapter will use the default axios instance for requests, but in some cases you need to use a custom created axios instance. You can do this:

```javascript
const customAxios = axios.create({
  // ...
});

const alovaInst = createAlova({
  // ...
  // highlight-start
  requestAdapter: axiosRequestAdapter({
    axios: customAxios
  })
  // highlight-end
});
```

## Mock request adapter compatible

When developing applications, we may still need to use simulated requests. Only by default, the response data of [Mock Request Adapter (@alova/mock)](/tutorial/request-adapter/alova-mock) is a `Response` instance, which is compatible with the `GlobalFetch` request adapter by default. When using the axios adapter, we The response data of the mock request adapter needs to be compatible with **AxiosResponse**, and the error instance is **AxiosError**, so you need to use `axiosMockResponse` exported from the **@alova/adapter-axios** package as the response adapter .

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import { axiosRequestAdapter, axiosMockResponse } from '@alova/adapter-axios';

const mocks = defineMock({
  //...
});

// mock data request adapter
export default createAlovaMockAdapter([mocks], {
  // After specifying axios request adapter, requests that do not match the simulated interface will use this adapter to send requests
  httpAdapter: axiosRequestAdapter(),

  // axiosMockResponse contains onMockResponse and onMockError
  // Used to convert mock data to AxiosResponse and AxiosError compatible format
  ...axiosMockResponse
});

export const alovaInst = createAlova({
  //...
  // Control whether to use the simulated request adapter through environment variables
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : axiosRequestAdapter()
});
```

##Typescript

The axios request adapter provides complete type adaptation. The type of method configuration and response data will exactly match the type of axios.

### method configuration

When creating a method instance, in addition to the general configuration items in the method, you can also use the configuration items in `AxiosRequestConfig`, we have removed the items that conflict with the general configuration of the method instance in the type.

```typescript
/**
 * axios request configuration parameters
 * Removed the attributes that conflicted with the method
 */
export type AlovaAxiosRequestConfig = Omit<
  AxiosRequestConfig,
  | 'url'
  | 'method'
  | 'baseURL'
  | 'headers'
  | 'params'
  | 'data'
  | 'timeout'
  | 'cancelToken'
  | 'signal'
  | 'onUploadProgress'
  | 'onDownloadProgress'
>;
```

### Response data

The response data type of axios is `AxiosResponse`, when you use the axios adapter, you will also get the response data in the same format. In actual use, we usually need to process response data globally. A simple example is as follows:

```typescript
const alovaInst = createAlova(
   baseURL: 'https://api.alovajs.org',
   requestAdapter: axiosRequestAdapter(),
   responded(response) {
     // response is automatically inferred as AxiosResponse type
     return response.data;
   }
});
```

### Error

When axios receives non-20x and 30x response status codes, it will throw an error. In order to contain more information, axios custom-designed the error instance into an `AxiosError` instance instead of a normal Error instance, so when encountering An error will be thrown when there is a server error or a network error, and you can catch it in the global error callback.

```typescript
const alovaInst = createAlova(
   baseURL: 'https://api.alovajs.org',
   requestAdapter: axiosRequestAdapter(),
   responded: {
     onSuccess(response) {
       // response is automatically inferred as AxiosResponse type
       return response.data;
     },
     onError(err: AxiosError) {
       // err type is any by default, you can cast it to AxiosError
       //...
     }
   }
});
```
