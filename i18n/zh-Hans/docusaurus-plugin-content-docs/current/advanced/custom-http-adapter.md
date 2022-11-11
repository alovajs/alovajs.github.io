---
title: 自定义请求适配器
sidebar_position: 10
---


还记得你如何创建一个Alova实例吗？在调用`createAlova`时必须传入`requestAdapter`，这个就是`alova`的请求适配器，试想当`alova`运行在非浏览器环境时（可能是客户端、小程序），`fetch api`可能不再可用，那我们就需要更换一个支持当前环境的请求适配器。

那应该如何自定义一个请求适配器呢？很简单，它其实是一个函数，在每次发起请求时都会调用此函数，并返回一个对象，这个对象内包含如`url`、`method`、`data`、`headers`、`timeout`等请求相关的数据集合，虽然字段较多，但我们只需访问我们需要的数据即可。

请求适配器的参数类型，以及支持Typescript的写法，可以 [点此查看说明](#请求适配器类型)。

一个简单的请求适配器是这样的：
```javascript
function customRequestAdapter(config) {
  // 解构出需要用到的数据
  const {
    url,
    method,
    data,
    headers,
  } = config;

  // 发送请求
  const fetchPromise = fetch(url, {
    method: method,
    headers: headers,
    body: data,
  });

  // 返回一个包含请求操作相关的对象
  return {
    response: () => fetchPromise,
    headers: () => fetchPromise.then(res => res.headers),
    abort: () => {
      // TODO: 中断请求...
    },
    onDownload: updateDownloadProgress => {
      let loaded = 0;
      let timer = setInterval(() => {
        updateDownloadProgress(1000, loaded += 1000);
        if (loaded >= 1000) {
          clearInterval(timer);
        }
      }, 100);
    },
    onUpload: (updateUploadProgress) => {
      let loaded = 0;
      let timer = setInterval(() => {
        updateUploadProgress(1000, loaded += 1000);
        if (loaded >= 1000) {
          clearInterval(timer);
        }
      }, 100);
    },
  };
}
```
请求适配器的返回值说明：
1. 【必填】response函数：一个异步函数，函数返回响应值，它将会传递给全局的响应拦截器responsed；
2. 【必填】headers函数：一个异步函数，函数返回的响应头对象将传递给Method实例的transformData转换钩子函数；
3. 【必填】abort函数：一个普通函数，它用于中断请求，在 [手动中断请求](#手动中断请求) 章节中调用`abort`函数时，实际上触发中断请求的函数就是这个中断函数；
4. 【可选】onDownload函数：一个普通函数，它接收一个更新下载进度的回调函数，在此函数内自定义进度更新的频率，在此示例中模拟每隔100毫秒更新一次。`updateDownloadProgress`回调函数接收两个参数，第一个参数是总大小，第二个参数是已下载大小；
5. 【可选】onUpload函数：一个普通函数，它接收一个更新上传进度的回调函数，在此函数内自定义进度更新的频率，在此示例中模拟每隔100毫秒更新一次。`updateUploadProgress`回调函数接收两个参数，第一个参数是总大小，第二个参数是已上传大小；

建议你可以查阅 [GlobalFetch源码](https://github.com/JOU-amjs/alova/blob/main/src/predefine/GlobalFetch.ts) 来了解更多关于请求适配器的细节。