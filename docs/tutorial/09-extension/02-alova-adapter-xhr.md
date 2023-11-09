---
title: XMLHttpRequest Adapter
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-xhr --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-xhr
```

</TabItem>
</Tabs>

## Instructions

### create alova

Use **xhrRequestAdapter** as request adapter for alova.

```javascript
import { createAlova } from 'alova';
import { xhrRequestAdapter } from '@alova/adapter-xhr';

const alovaInst = createAlova({
  //...
  requestAdapter: xhrResponseAdapter()
  //...
});
```

### Request

The XMLHttpRequest adapter provides basic configuration parameters, including `responseType`, `withCredentials`, `mimeType`, `auth`, as follows:

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<tempate>
   <div v-if="loading">Loading...</div>
   <div>The request data is: {{ data }}</div>
</template>

<script setup>
   const list = () =>
     alovaInst. Get('/list', {
       /**
        * Set the response data type
        * Can be set to change the response type. Values are: "arraybuffer", "blob", "document", "json" and "text"
        * defaults to "json"
        */
       responseType: 'text',

       /**
        * True when credentials are to be included in cross-origin requests. false when they are excluded from cross-origin requests and when cookies are ignored in their responses. Default is false
        */
       withCredentials: true,

       /**
        * Set the mimeType of the response data
        */
       mimeType: 'text/plain; charset=x-user-defined',

       /**
        * auth means use HTTP Basic authentication and provide credentials.
        * This will set an `Authorization` header, overriding any existing
        * Custom headers for `Authorization` set using `headers`.
        * Note that only HTTP Basic authentication can be configured via this parameter.
        * For Bearer tokens etc., use the `Authorization` custom header instead.
        */
       auth: {
         username: 'name1',
         password: '123456'
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
     /**
        * Set the response data type
        * Can be set to change the response type. Values are: "arraybuffer", "blob", "document", "json" and "text"
        * defaults to "json"
        */
       responseType: 'text',

       /**
        * True when credentials are to be included in cross-origin requests. false when they are excluded from cross-origin requests and when cookies are ignored in their responses. Default is false
        */
       withCredentials: true,

       /**
        * Set the mimeType of the response data
        */
       mimeType: 'text/plain; charset=x-user-defined',

       /**
        * auth means use HTTP Basic authentication and provide credentials.
        * This will set an `Authorization` header, overriding any existing
        * Custom headers for `Authorization` set using `headers`.
        * Note that only HTTP Basic authentication can be configured via this parameter.
        * For Bearer tokens etc., use the `Authorization` custom header instead.
        */
       auth: {
         username: 'name1',
         password: '123456'
       }
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
      /**
       * Set the response data type
       * Can be set to change the response type. Values are: "arraybuffer", "blob", "document", "json" and "text"
       * defaults to "json"
       */
      responseType: 'text',

      /**
       * True when credentials are to be included in cross-origin requests. false when they are excluded from cross-origin requests and when cookies are ignored in their responses. Default is false
       */
      withCredentials: true,

      /**
       * Set the mimeType of the response data
       */
      mimeType: 'text/plain; charset=x-user-defined',

      /**
       * auth means use HTTP Basic authentication and provide credentials.
       * This will set an `Authorization` header, overriding any existing
       * Custom headers for `Authorization` set using `headers`.
       * Note that only HTTP Basic authentication can be configured via this parameter.
       * For Bearer tokens etc., use the `Authorization` custom header instead.
       */
      auth: {
        username: 'name1',
        password: '123456'
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

Use `FormData` to upload files, and this `FormData` instance will be sent to the server through `xhr.send`. It will be set `Content-Type` automatically, you don't need to custom it with `multipart/form-data`.

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

## Mock request adapter compatible

When developing applications, we may still need to use simulated requests. Only by default, the response data of [Mock Request Adapter (@alova/mock)](../extension/alova-mock) is a `Response` instance, which is compatible with the `GlobalFetch` request adapter by default. When using the XMLHttpRequest adapter, we You need to adapt the response data of the mock request adapter to the XMLHttpRequest adapter. In this case, you need to use the `xhrMockResponse` exported in the **@alova/adapter-xhr** package as the response adapter.

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import { xhrRequestAdapter, xhrMockResponse } from '@alova/adapter-xhr';

const mocks = defineMock({
  //...
});

// mock data request adapter
export default createAlovaMockAdapter([mocks], {
  // After specifying the request adapter, requests that do not match the simulated interface will use this adapter to send requests
  httpAdapter: xhrRequestAdapter(),

  // Use xhrMockResponse to adapt the simulated data to the XMLHttpRequest adapter
  onMockResponse: xhrMockResponse
});

export const alovaInst = createAlova({
  //...
  // Control whether to use the simulated request adapter through environment variables
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : xhrRequestAdapter()
});
```

## Typescript

The XMLHttpRequest request adapter provides complete type adaptation.

### method configuration

When creating a method instance, in addition to the common configuration items in the method, you can also use the configuration items in `AlovaXHRRequestConfig`.

```typescript
/**
 * xhr request configuration parameters
 */
interface AlovaXHRRequestConfig {
  /**
   * Set the response data type.
   *
   * Can be set to change the response type. Values are: "arraybuffer", "blob", "document", "json", and "text".
   * Setting 1: If the current global object is not a Window object, the setting to "document" is ignored.
   * Setup 2: Throw an "InvalidStateError" DOMException if the state is loading or complete.
   * Setting 3: Throws an "InvalidAccessError" DOMException if the sync flag is set and the current global object is a Window object.
   * @default "json"
   */
  responseType?: XMLHttpRequestResponseType;

  /**
   * True when credentials are to be included in cross-origin requests. false when they are excluded from cross-origin requests and when cookies are ignored in their responses. The default is false.
   * An 'InvalidStateError' DOMException is thrown if the state is not sent or not opened, or if the send() flag is set.
   * @default false
   */
  withCredentials?: boolean;

  /**
   * Set the mimeType of the response data
   */
  mimeType?: string;

  /**
   * `auth` indicates that HTTP Basic authentication should be used, and credentials are provided.
   * This will set an `Authorization` header, overriding any existing
   * Custom headers for `Authorization` set using `headers`.
   * Note that only HTTP Basic authentication can be configured via this parameter.
   * For Bearer tokens etc., use the `Authorization` custom header instead.
   */
  auth?: {
    username: string;
    password: string;
  };
}
```

### Response data

XMLHttpRequest adapter response data is as follows:

```typescript
interface AlovaXHRResponseHeaders {
  [x: string]: any;
}
interface AlovaXHRResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  headers: AlovaXHRResponseHeaders;
}
```
