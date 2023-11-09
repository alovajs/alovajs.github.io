---
title: Detailed request method
sidebar_position: 10
---

The alova instance object provides abstract objects of seven request methods, including GET, POST, PUT, DELETE, HEAD, OPTIONS, and PATCH. For ease of use, alova uses the same parameter structure as `axios`.

| instance creation function | parameters                                  |
| -------------------------- | ------------------------------------------- |
| GET                        | `alovaInstance.Get(url[, config])`          |
| POST                       | `alovaInstance.Post(url[, data[, config]])` |
| PUT                        | `alova.Put(url[, data[, config]])`          |
| DELETE                     | `alova.Delete(url[, data[, config]])`       |
| HEAD                       | `alova.Head(url[, config])`                 |
| OPTIONS                    | `alova.Options(url[, config])`              |
| PATCH                      | `alova.Patch(url[, data[, config]])`        |

Parameter Description:

- `url` is the request path, it will be spliced with `baseURL` in `createAlova` to form a complete url for request;
- `data` is the request body data object;
- `config` is the request configuration object, which contains configurations such as request headers, params parameters, and request behavior parameters;

## config parameter description

### General configuration items

The config object has a total of 10 common configuration items.

| Name           | Description                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| name           | method instance name, it is generally used for [matching method instance](/tutorial/next-step/method-instance-matcher)               |
| params         | Set url parameters, see [Request Method Instance](/tutorial/learning/method-instance) for details                                    |
| headers        | Set request headers, see [Request Method Instance](/tutorial/learning/method-instance) for details                                   |
| transformData  | Set the response data transformation function, see [Transform Response Data](/tutorial/learning/transform-response-data) for details |
| localCache     | Set request-level cache mode, see [Cache Mode](/tutorial/learning/response-cache) for details                                        |
| timeout        | Set request-level timeout                                                                                                            |
| enableDownload | Enable download progress information, see [Download/Upload Progress](/tutorial/next-step/download-upload-progress) for details       |
| enableUpload   | Enable upload progress information, see [Download/Upload Progress](/tutorial/next-step/download-upload-progress) for details         |
| hitSource      | Cache auto-invalidation setting, see [Auto-invalidate cache](/tutorial/next-step/auto-invalidate-cache) for details                  |
| shareRequest   | Share request, see [Share Request](/tutorial/next-step/share-request) for details                                                    |

### Adapter configuration items

It varies according to different requestAdapter configurations. For example, the GlobalFetch adapter will retain all the configuration items of config in `fetch(url, config)`. The specific supported configuration items can be viewed in different request adapter documents.

## instance method

| Name    | Description                                                                                                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| send    | Send a request directly, see [Send Request Directly](/tutorial/next-step/send-request-directly) for details                                                                               |
| setName | Dynamically set the name of the method instance, which is generally used when the name needs to be set later, such as setting the name according to the response data after the response. |
| abort   | abort the request sent by the current method instance, it can abort request sent by use hook and directly call send                                                                       |

### setName Example

```javascript
// Use the data id as the name of the current method after the request is successful
onSuccess(event => {
  event.method.setName(event.data.id);
});
```
