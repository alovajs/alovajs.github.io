---
title: 转换响应数据
sidebar_position: 70
---

当响应数据结构不能直接满足前端需求时，我们可以为 method 实例设置`transformData`钩子函数将响应数据转换成需要的结构，数据转换后将会作为`data`状态的值。

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  params: {
    page: 1
  },

  // 函数接受未加工的数据和响应头对象，并要求将转换后的数据返回，它将会被赋值给data状态。
  // 注意：rawData是全局响应拦截器（如果有设置）过滤后的数据，响应拦截器的配置可以参考[设置全局响应拦截器]章节。
  transformData(rawData, headers) {
    return rawData.list.map(item => {
      return {
        ...item,
        statusText: item.done ? '已完成' : '进行中'
      };
    });
  }
});
```

:::caution 注意

1. 在 usehooks 中使用时，在`transformData`中抛出错误将会触发`onError`；
2. 使用 method 实例直接发起请求时，将会返回一个 reject 状态的 promise 实例；

:::

## transformData 的特殊使用场景

由于 transformData 函数具有以下两个特性：

1. 只有在网络请求响应时才被触发，而命中响应缓存时不会触发；
2. 支持异步函数；

你也可以将它当作网络请求响应的钩子函数使用，例如以文件为响应数据的缓存场景下，可以配合 IndexedDB 进行文件数据的缓存，同时配合 [受控的缓存](../next-step/controlled-cache) 来命中 IndexedDB 中的文件缓存。

```javascript
const fileGetter = alovaInstance.Get('/file/file_name', {
  // 使用IndexedDB缓存文件
  async transformData(fileBlob) {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(['files'], 'readwrite');
      const putRequest = tx.objectStore('files').put({
        file: fileBlob
      });
      putRequest.onsuccess = resolve;
      putRequest.onerror = reject;
    });
    return fileBlob;
  }
});
```
