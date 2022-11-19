---
title: Custom Request Adapter
sidebar_position: 10
---

Remember how you created an Alova instance? When calling `createAlova`, you must pass in `requestAdapter`, which is the request adapter of `alova`. Imagine that when `alova` runs in a non-browser environment (may be a client, a small program), `fetch api` may not If it is available again, then we need to replace a request adapter that supports the current environment.

So how to customize a request adapter? Very simple, it is actually a function, this function is called every time a request is made, and an object is returned, which contains such as `url`, `method`, `data`, `headers`, `timeout`, etc. Request related data sets, although there are many fields, we only need to access the data we need.

The parameter type of the request adapter, as well as the writing method that supports Typescript, can be [click here to view the description](#request adapter type).

## request adapter structure

```javascript
function customRequestAdapter(config) {
  // Deconstruct the data that needs to be used
  const { url, method, data, headers } = config;

  // send request
  const fetchPromise = fetch(url, {
    method: method,
    headers: headers,
    body: data
  });

  // Returns an object containing the requested operation
  return {
    response: () => fetchPromise,
    headers: () => fetchPromise.then(res => res.headers),
    abort: () => {
      // TODO: interrupt request...
    },
    onDownload: updateDownloadProgress => {
      let loaded = 0;
      let timer = setInterval(() => {
        updateDownloadProgress(1000, (loaded += 1000));
        if (loaded >= 1000) {
          clearInterval(timer);
        }
      }, 100);
    },
    onUpload: updateUploadProgress => {
      let loaded = 0;
      let timer = setInterval(() => {
        updateUploadProgress(1000, (loaded += 1000));
        if (loaded >= 1000) {
          clearInterval(timer);
        }
      }, 100);
    }
  };
}
```

## Description of the return value of the request adapter

- **response (required)**: an asynchronous function that returns the response value, which will be passed to the global response interceptor responsed;
- **headers (required)**: an asynchronous function, the response header object returned by the function will be passed to the transformData conversion hook function of the Method instance;
- **abort (required)**: a common function, which is used for interrupt request. When calling the `abort` function in the [Manual Interrupt Request](#Manual Interrupt Request) chapter, the function that actually triggers the interrupt request is this interrupt function;
- **onDownload (optional)**: a common function that receives a callback function to update the download progress, within this function you can customize the frequency of the progress update, in this example the simulation is updated every 100 milliseconds. The `updateDownloadProgress` callback function receives two parameters, the first parameter is the total size, and the second parameter is the downloaded size;
- **onUpload (optional)**: a common function that receives a callback function to update the upload progress, within this function you can customize the frequency of the progress update, in this example it simulates an update every 100 milliseconds. The `updateUploadProgress` callback function receives two parameters, the first parameter is the total size, and the second parameter is the uploaded size;

:::note
It is recommended that you refer to the [GlobalFetch source code](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts) for more details about the request adapter.
:::
