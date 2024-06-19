---
title: 受控的缓存
---

在发送一个请求时，默认会优先匹配响应缓存，在某些情况下，你可能需要使用`IndexedDB`作为缓存管理方案，使用自定义的`IndexedDB`适配器，但这会让所有请求都使用它作为存储方案，而受控的缓存则可以让你从单个请求上控制自定义的缓存。

使用受控缓存也很简单，可以在 method 中的 `cacheFor` 设置为异步或同步函数，在这个函数中返回的数据将作为缓存数据。例如在`IndexedDB`中读取数据。

```javascript
const getFile = fileName =>
  alovaInstance.GET(`/file/${fileName}`, {
    // 受控缓存函数支持异步和同步函数
    cacheFor() {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(['files']);
        const getRequest = tx.objectStore('files').get(fileName);
        getRequest.onsuccess = resolve;
        getRequest.onerror = reject;
      });
    }
  });
```

你也可以在`cacheFor`中返回 `undefined` 或不返回任何数据，继续发送请求，这在自定义管理缓存时未命中缓存的情况下很有用。

## 使用 transformData 设置缓存

由于 `transformData` 函数具有以下两个特性：

- 只有在响应时才被触发，而命中响应缓存时不会触发；
- 支持异步函数；

因此，你还可以配合它保存自定义的缓存，例如以文件为响应数据的缓存场景下，可以配合 IndexedDB 进行文件数据的缓存。

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

## 注意事项

在 usehooks 中使用时，在`cacheFor`函数中抛出错误将会触发`onError`，使用 method 实例直接发起请求时，promise 将会被 reject。
