---
title: 自定义请求适配器
sidebar_position: 20
---

还记得如何创建一个 Alova 实例吗？

```javascript
const alovaInstance = createAlova({
  // ...
  requestAdapter: GlobalFetch()
});
```

`requestAdapter`就是请求适配器，内部的请求发送和接收都将依赖请求适配器，`GlobalFetch`就是通过 fetch api 的方式来管理请求的，在大多数情况下我们可以使用它，但是，当`alova`运行在 fetch api 不可用的环境时（如 app、小程序），就需要更换一个支持当前环境的请求适配器。

那应该如何自定义一个请求适配器呢？很简单，它其实是一个函数，在每次发起请求时都会调用此函数，并返回一个对象，这个对象内包含如`url`、`method`、`data`、`headers`、`timeout`等请求相关的数据集合，虽然字段较多，但我们只需访问我们需要的数据即可。

## 请求适配器结构

请求适配器将接收到请求相关的参数，以及当前正在请求的 method 实例，并返回一个响应相关的函数集合。

```javascript
function CustomRequestAdapter(requestElements, methodInstance) {
  // 发送请求...
  return {
    async response() {
      // ...返回响应数据
    },
    async headers() {
      // 返回响应头的异步函数
    },
    abort() {
      // 中断请求，当外部调用abort时将触发此函数
    },
    onDownload(updateDownloadProgress) {
      // 下载进度信息，内部持续调用updateDownloadProgress来更新下载进度
    },
    onUpload(updateUploadProgress) {
      // 上传进度信息，内部持续调用updateUploadProgress来更新上传进度
    }
  };
}
```

### 请求参数详细

**requestElements**

发送请求的相关元素，包含以下数据。

```typescript
interface RequestElements {
  // 请求url，get参数已包含其中
  readonly url: string;

  // 请求类型，如GET、POST、PUT等
  readonly type: MethodType;

  // 请求头信息，对象
  readonly headers: Arg;

  // 请求体信息
  readonly data?: RequestBody;
}
```

**methodInstance**

当前请求的 method 实例

### 返回参数详细

**response（必填）**

一个异步函数，函数返回响应值，它将会传递给全局的响应拦截器（responded）；

**headers（必填）**

一个异步函数，函数返回的响应头对象将传递给 Method 实例的 transformData 转换钩子函数；

**abort（必填）**

一个普通函数，它用于中断请求，所有的中断请求最终都将会调用此函数来执行；

**onDownload（可选）**

一个普通函数，它接收一个更新下载进度的回调函数，在此函数内自定义进度更新的频率，在此示例中模拟每隔 100 毫秒更新一次。`updateDownloadProgress`回调函数接收两个参数，第一个参数是总大小，第二个参数是已下载大小；

**onUpload（可选）**

一个普通函数，它接收一个更新上传进度的回调函数，在此函数内自定义进度更新的频率，在此示例中模拟每隔 100 毫秒更新一次。`updateUploadProgress`回调函数接收两个参数，第一个参数是总大小，第二个参数是已上传大小；

## XMLHttpRequest 请求适配器示例

以下是一个通过 XMLHttpRequest 发送请求的适配器的示例，主要用于演示适配器的写法，代码不完整，不可运行。

```javascript
function XMLHttpRequestAdapter(requestElements, methodInstance) {
  // 解构出需要用到的数据
  const { url, type, data, headers } = config;

  // 发送请求
  const xhr = new XMLHttpRequest();
  xhr.open(type, url);
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  const responsePromise = new Promise((resolve, reject) => {
    xhr.addEventListener('load', event => {
      // 处理响应数据
      resolve(/* ... */);
    });
    xhr.addEventListener('error', event => {
      // 处理请求错误
      reject(/* ... */);
    });
  });

  xhr.send(JSON.stringify(data));

  return {
    // 返回响应数据的异步函数
    response: () => responsePromise,

    // 返回响应头的异步函数
    headers: () => responsePromise.then(() => xhr.getAllResponseHeaders()),
    abort: () => {
      xhr.abort();
    },

    // 下载进度信息，内部持续调用updateDownloadProgress来更新下载进度
    onDownload: updateDownloadProgress => {
      xhr.addEventListener('progress', event => {
        // 数据接收进度
        updateDownloadProgress(event.total, event.loaded);
      });
    },

    // 上传进度信息，内部持续调用updateUploadProgress来更新上传进度
    onUpload: updateUploadProgress => {
      xhr.upload.onprogress = event => {
        updateUploadProgress(event.total, event.loaded);
      };
    }
  };
}
```

:::note

更完整的请求适配器细节可以查阅 [GlobalFetch 源码](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts) 来了解。

:::

## 请求适配器类型

全局的`beforeRequest`、`responded`拦截器，以及 method 实例创建时的配置对象的类型，都会根据请求适配器提供的类型自动推断，以下是 GlobalFetch 的类型。

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

在这个类型中分别指定了`RC`、`RE`和`RH`三个类型的值，因此在全局的拦截器中、method 实例配置中等地方将自动推断为请求适配器给定的类型。

它们分别表示为：

- **RC**：*RequestConfig*的缩写，请求配置对象类型
- **RH**：*ResponseHeader*的缩写，响应头对象类型
- **RE**：*Response*的缩写，响应类型

如果你正在使用 **GlobalFetch**，他们的类型分别会被推断为：

- **RC**：fetch api 的请求配置对象`RequestInit`;
- **RH**：响应头对象`Headers`;
- **RE**：响应对象`Response`;

为了方便定义请求适配器的类型，alova 中也提供了一个适配器类型，你只需要根据需要传入`RC/RE/RH`泛型参数即可。

```typescript
import type { AlovaRequestAdapter } from 'alova';
type CustomRequestAdpater = AlovaRequestAdapter<any, any, RequestInit, Response, Headers>;
```
