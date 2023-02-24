---
title: Detailed request method
sidebar_position: 10
---

The alova instance object provides abstract objects of seven request methods, including GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH. For ease of use, alova borrows the same parameter structure as `axios`.

- GET: `alovaInstance. Get(url[, config])`;
- POST: `alovaInstance.Post(url[, data[, config]])`;
- PUT: `alova.Put(url[, data[, config]])`;
- DELETE: `alova.Delete(url[, data[, config]])`;
- HEAD: `alova.Head(url[, config])`;
- OPTIONS: `alova.Options(url[, config])`;
- PATCH: `alova.Patch(url[, data[, config]])`;

Parameter Description:

- `url` is the request path, it will be spliced with `baseURL` in `createAlova` to form a complete url for request;
- `data` is the request body data object;
- `config` is the request configuration object, which contains configurations such as request headers, params parameters, and request behavior parameters;

## config parameter description

There are 10 fixed configuration items in total, which are

**name**: method name, which is generally used for [matching method instance](/next-step/method-instance-matcher)

**params**: Set url parameters, see [Request Method Instance](/get-started/request-method-instance) for details

**headers**: Set request headers, see [Request Method Instance](/get-started/request-method-instance) for details

**transformData**: Set the response data conversion function, see [Transform Response Data](/response-data-management/transform-response-data) for details

**localCache**: set request-level cache mode, see [cache mode](/get-started/response-cache) for details

**timeout**: Set request-level timeout

**enableDownload**: enable download progress information, see [download/upload progress](/next-step/download-upload-progress) for details

**enableUpload**: enable upload progress information, see [download/upload progress](/next-step/download-upload-progress) for details

**hitSource**: cache automatic invalidation setting, see [auto-invalidate cache](/next-step/auto-invalidate-cache) for details

**shareRequest**: Share request, see [Share Request](/next-step/share-request) for details

### Other configuration items

It is different according to different requestAdapter configurations. For example, the GlobalFetch adapter will retain all configuration items of config in `fetch(url, config)`

## instance method

### send

To send a request directly, see [Send Request Directly](/next-step/send-request-directly) for details

### setName

Dynamically set the name of the method instance, which is generally used when the name needs to be set later, such as setting the name according to the response data after the response.

```javascript
// Use the data id as the name of the current method after the request is successful
onSuccess(event => {
  event.method.setName(event.data.id);
});
```
