---
title: Custom Request Adapter
sidebar_position: 20
---

Remember how to create an Alova instance?

```javascript
const alovaInstance = createAlova({
  //...
  requestAdapter: GlobalFetch()
});
```

`requestAdapter` is a request adapter. Internal request sending and receiving will depend on the request adapter. `GlobalFetch` manages requests through fetch api. In most cases, we can use it. However, when `alova` When running in an environment where fetch api is not available (such as app, applet), it is necessary to replace a request adapter that supports the current environment.

So how should you customize a request adapter? Very simple, it is actually a function, which is called every time a request is made, and returns an object, which contains such things as `url`, `method`, `data`, `headers`, `timeout`, etc. Request related data sets. Although there are many fields, we only need to access the data we need.

## Request adapter structure

The request adapter will receive request-related parameters and the currently requesting method instance, and return a set of response-related functions.

```javascript
function CustomRequestAdapter(requestElements, methodInstance) {
  // send request...
  return {
    async response() {
      // ...return the response data
    },
    async headers() {
      // Asynchronous function that returns response headers
    },
    abort() {
      // Interrupt request, this function will be triggered when abort is called externally
    },
    onDownload(updateDownloadProgress) {
      // Download progress information, internally call updateDownloadProgress continuously to update the download progress
    },
    onUpload(updateUploadProgress) {
      // Upload progress information, internally call updateUploadProgress continuously to update the upload progress
    }
  };
}
```

### Request parameter details

**requestElements**

Relevant elements of the send request, including the following data.

```typescript
interface RequestElements {
  // request url, the get parameter is already included
  readonly url: string;

  // Request type, such as GET, POST, PUT, etc.
  readonly type: MethodType;

  // Request header information, object
  readonly headers: Arg;

  // request body information
  readonly data?: RequestBody;
}
```

**methodInstance**

The method instance of the current request

### Return parameter details

**response (required)**

An asynchronous function, the function returns the response value, which will be passed to the global response interceptor responded;

**headers (required)**

An asynchronous function, the response header object returned by the function will be passed to the transformData conversion hook function of the Method instance;

**abort (required)**

A common function, which is used for aborting request. All aborting requests will eventually call this function to execute;

**onDownload (optional)**

An ordinary function that receives a callback function that updates the download progress, and customizes the frequency of the progress update within this function, in this example simulating an update every 100 milliseconds. The `updateDownloadProgress` callback function receives two parameters, the first parameter is the total size, and the second parameter is the downloaded size;

**onUpload (optional)**

An ordinary function that receives a callback function that updates the upload progress, and customizes the frequency of the progress update within this function, in this example simulating an update every 100 milliseconds. The `updateUploadProgress` callback function receives two parameters, the first parameter is the total size, and the second parameter is the uploaded size;

## XMLHttpRequest request adapter example

The following is an example of an adapter that sends requests through XMLHttpRequest, mainly to demonstrate how to write the adapter, the code is incomplete and cannot be run.

```javascript
function XMLHttpRequestAdapter(requestElements, methodInstance) {
  // Deconstruct the data that needs to be used
  const { url, type, data, headers } = config;

  // send request
  const xhr = new XMLHttpRequest();
  xhr.open(type, url);
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  const responsePromise = new Promise((resolve, reject) => {
    xhr.addEventListener('load', event => {
      // process response data
      resolve(/* ... */);
    });
    xhr.addEventListener('error', event => {
      // Handle request errors
      reject(/* ... */);
    });
  });

  xhr.send(JSON.stringify(data));

  return {
    // Asynchronous function that returns response data
    response: () => responsePromise,

    // Asynchronous function that returns response headers
    headers: () => responsePromise.then(() => xhr.getAllResponseHeaders()),
    abort: () => {
      xhr.abort();
    },

    // Download progress information, internally call updateDownloadProgress continuously to update the download progress
    onDownload: updateDownloadProgress => {
      xhr.addEventListener('progress', event => {
        // data receiving progress
        updateDownloadProgress(event.total, event.loaded);
      });
    },

    // Upload progress information, internally call updateUploadProgress continuously to update the upload progress
    onUpload: updateUploadProgress => {
      xhr.upload.onprogress = event => {
        updateUploadProgress(event.total, event.loaded);
      };
    }
  };
}
```

:::note

More complete request adapter details can be found in [GlobalFetch source code](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts) to understand.

:::

## Request adapter type

The types of the global `beforeRequest`, `responded` interceptors, and the configuration object when the `Method` instance is created will be automatically inferred based on the type provided by the request adapter. The following are the types of GlobalFetch.

```javascript
import type { RequestElements, Method, ProgressUpdater } from 'alova';

export type GlobalFetch = () => (
  elements: RequestElements,
  method: Method<any, any, any, any, RequestInit, Response, Headers>
) => {
  response: () => Promise<Response>,
  headers: () => Promise<Headers>,
  onDownload: (handler: ProgressUpdater) => void,
  abort: () => void
};
```

Three types of values ​​of `RC`, `RE` and `RH` are specified in this type, so the type given by the request adapter will be automatically inferred in the global interceptor, method instance configuration and other places.

They are expressed as:

- **RC**: Abbreviation of _RequestConfig_, request configuration object type
- **RH**: Abbreviation of _ResponseHeader_, response header object type
- **RE**: Abbreviation of _Response_, response type

If you are using **GlobalFetch**, their types will be inferred as:

- **RC**: fetch api's request configuration object `RequestInit`;
- **RH**: Response header object `Headers`;
- **RE**: response object `Response`;

In order to facilitate the definition of the request adapter type, alova also provides an adapter type. You only need to pass in the `RC/RE/RH` generic parameters as needed.

```typescript
import type { AlovaRequestAdapter } from 'alova';
type CustomRequestAdpater = AlovaRequestAdapter<any, any, RequestInit, Response, Headers>;
```
