---
title: Detailed request method
sidebar_position: 10
---

The `alova` instance object provides abstract objects for seven request methods, including GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH. For simplicity and ease of use, `alova` borrows the same parameter structure as `axios`.

- GET: `alovaInstance.Get(url[, config])`;
- POST: `alovaInstance.Post(url[, data[, config]])`;
- PUT: `alova.Put(url[, data[, config]])`;
- DELETE: `alova.Delete(url[, data[, config]])`;
- HEAD: `alova.Head(url[, config])`;
- OPTIONS: `alova.Options(url[, config])`;
- PATCH: `alova.Patch(url[, data[, config]])`;

Parameter Description:

- `url` is the request path, it will be concatenated with `baseURL` in `createAlova` to form a complete url for request;
- `data` is the request body data object;
- `config` is the request configuration object, which includes the configuration of request headers, params parameters, request behavior parameters, etc.;

## config parameter description

Fixed configuration items name, params, headers, transformData, localCache, timeout, enableDownload, enableUpload

Other configuration items: vary according to different requestAdapter configurations, such as the GlobalFetch adapter will retain all the configuration items of config in `fetch(url, config)`
