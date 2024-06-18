---
title: Request Adapter
sidebar_position: 10
---

Remember how to create an Alova instance?

```javascript
import adapterFetch from 'alova/fetch';

const alovaInstance = createAlova({
  // ...
  requestAdapter: adapterFetch()
});
```

`requestAdapter` is the request adapter. The internal request sending and receiving will rely on the request adapter. `alova/fetch` manages requests through the fetch api. In most cases, we can use it. However, when `alova` runs in an environment where the fetch api is not available (such as app, mini program), you need to replace a request adapter that supports the current environment.

So how should you customize a request adapter? It's very simple. It is actually a function that will be called every time a request is initiated and returns an object. This object contains request-related data sets such as `url`, `method`, `data`, `headers`, `timeout`, etc. Although there are many fields, we only need to access the data we need.

## Request adapter structure

The request adapter will receive request-related parameters and the method instance currently being requested, and return a response-related function set.

```javascript
function CustomRequestAdapter(requestElements, methodInstance) {
  // Send the request here...

  return {
    async response() {
      // Return response data
    },
    async headers() {
      // Asynchronous function that returns the response header
    },
    abort() {
      // Interrupt the request, this function will be triggered when abort is called externally
    },
    onDownload(updateDownloadProgress) {
      // Download progress information, updateDownloadProgress is continuously called internally to update the download progress
    },
    onUpload(updateUploadProgress) {
      // Upload progress information, updateUploadProgress is continuously called internally to update the upload progress
    }
  };
}
```

### Request parameter details

**requestElements**

Send the relevant elements of the request, including the following data.

```typescript
interface RequestElements {
  // Request url, get parameters are already included
  readonly url: string;

  // Request type, such as GET, POST, PUT, etc.
  readonly type: MethodType;

  // Request header information, object
  readonly headers: Arg;

  // Request body information
  readonly data?: RequestBody;
}
```

**methodInstance**

The method instance of the current request

### Return parameter details

**response (required)**

An asynchronous function, the function returns a response value, which will be passed to the global response interceptor (responded);

**headers (required)**

An asynchronous function, the response header object returned by the function will be passed to the transformData of the Method instance Conversion hook function;

**abort (required)**

A normal function, which is used to interrupt the request. All interrupt requests will eventually call this function to execute;

**onDownload (optional)**

A normal function, which receives a callback function to update the download progress. The frequency of progress update is customized in this function. In this example, it is simulated to update every 100 milliseconds. The `updateDownloadProgress` callback function receives two parameters, the first parameter is the total size, and the second parameter is the downloaded size;

**onUpload (optional)**

A normal function, which receives a callback function to update the upload progress. The frequency of progress update is customized in this function. In this example, it is simulated to update every 100 milliseconds. The `updateUploadProgress` callback function receives two parameters, the first parameter is the total size, and the second parameter is the uploaded size;

## XMLHttpRequest request adapter example

The following is an example of an adapter that sends a request through XMLHttpRequest. It is mainly used to demonstrate the writing of the adapter. The code is incomplete and cannot be run.

```javascript
function XMLHttpRequestAdapter(requestElements, methodInstance) {
  // Deconstruct the data needed
  const { url, type, data, headers } = config;

  // Send request
  const xhr = new XMLHttpRequest();
  xhr.open(type, url);
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  const responsePromise = new Promise((resolve, reject) => {
    xhr.addEventListener('load', event => {
      // Process response data
      resolve(/* ... */);
    });
    xhr.addEventListener('error', event => {
      // Process request error
      reject(/* ... */);
    });
  });

  xhr.send(JSON.stringify(data));

  return {
    // Asynchronous function that returns response data
    response: () => responsePromise,

    // Asynchronous function that returns the response header
    headers: () => responsePromise.then(() => xhr.getAllResponseHeaders()),
    abort: () => {
      xhr.abort();
    },

    // Download progress information, continuously call updateDownloadProgress internally to update the download progress
    onDownload: updateDownloadProgress => {
      xhr.addEventListener('progress', event => {
        // Data receiving progress
        updateDownloadProgress(event.total, event.loaded);
      });
    },

    // Upload progress information, continuously call updateUploadProgress internally to update the upload progress
    onUpload: updateUploadProgress => {
      xhr.upload.onprogress = event => {
        updateUploadProgress(event.total, event.loaded);
      };
    }
  };
}
```

:::note

For more complete request adapter details, please refer to [alova/fetch Source code](https://github.com/alovajs/alova/blob/main/packages/alova/src/predefine/adapterFetch.ts) to understand.

:::

## Request adapter type

The global `beforeRequest`, `responded` interceptors, and the types of configuration objects when creating method instances are automatically inferred based on the types provided by the request adapter. The following is the type of `alova/fetch`.

```javascript
import type { AlovaRequestAdapter } from 'alova';

export type adapterFetch = () => AlovaRequestAdapter<FetchRequestInit, Response, Headers>;
```

The generic parameters in `AlovaRequestAdapter` are values ​​of three types: `RequestConfig`, `Response`, and `ResponseHeader`, which are automatically inferred to the types given by the request adapter in global interceptors, method instance configurations, etc.

They are represented as follows:

- **RequestConfig**: request configuration object type, which will be applied to the `config` parameter when the method is created.
- **Response**: response type, for example, `alova/fetch` is the Response type
- **ResponseHeader**: response header object type
