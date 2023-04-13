---
title: 使用IndexedDB管理缓存
sidebar_position: 30
---

如果你正在开发需要大量使用本地缓存的应用，如图形编辑类应用、文件管理类应用等，低容量的 localStorage 已经无法满足开发需求，此时你可以使用 IndexedDB 配合 alova 进行大容量的本地缓存管理。

这一功能主要得益于 alova 的 [受控缓存](/next-step/controlled-cache) 功能，它可以实现自定义的缓存管理，我们来看看实践步骤。

这里有一个[使用 IndexedDB 管理缓存的示例](/example/controlled-cache-by-indexeddb)

我们以自定义管理大图片数据为例。

## 创建 IndexedDB 实例

首先创建一个 IndexedDB 实例用于操作本地缓存，并导出缓存操作的函数。

```javascript title=db.js
const dbVersion = 1;
let dbInstance;
const request = window.indexedDB.open('MyTestDatabase', dbVersion);
request.onupgradeneeded = ({ target }) => {
  dbInstance = target.result;
  const imgStore = dbInstance.createObjectStore('images', {
    autoIncrement: true
  });
  imgStore.createIndex('fileName', 'fileName', {
    unique: true
  });
};
request.onerror = () => {
  throw new Error('Database open fail');
};
request.onsuccess = ({ target }) => {
  dbInstance = target.result;
};

// 新增数据到IndexedDB
export const addImage2Cache = async (fileName, data) => {
  const tx = dbInstance.transaction(['images'], 'readwrite');
  const request = tx.objectStore('images').add({
    fileName,
    data
  });
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject('data add fail');
    };
    request.onsuccess = ({ result }) => {
      resolve(result);
    };
  });
};

// 根据fileName获取文件数据
export const getImageFromCache = async fileName => {
  const tx = dbInstance.transaction(['images']);
  const request = tx.objectStore('images').index('fileName').get(fileName);
  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject('data add fail');
    };
    request.onsuccess = ({ target }) => {
      resolve(target.result);
    };
  });
};
```

## 保存数据

在保存数据时，我们可以在 method 的`transformData`中保存缓存，因为`transformData`只会在网络请求响应时被触发，而命中缓存时不会触发的特性。在示例代码中，将图片 blob 实例转换为 base64 数据，缓存并返回这个 base64 数据。

```javascript api.js
import { addImage2Cache } from './db';

export const image = fileName =>
  alovaInst.Get(`/image/${fileName}`, {
    // highlight-start
    async transformData(imgBlob) {
      // 将blob异步转换为base64
      const reader = new FileReader();
      reader.readAsDataURL(imgBlob);
      const base64Img = await new Promise(resolve => {
        reader.onload = ({ target }) => {
          resolve(target.result);
        };
      });

      // 缓存image数据到IndexedDB中
      await addImage2Cache(fileName, base64Img);
      return base64Img;
    }
    // highlight-end
  });
```

## 获取数据

将这个 method 实例的`localCache`指定为一个异步函数，让缓存转变为受控状态，在这个函数中匹配 IndexedDB 中的缓存，如果匹配则返回它，否则返回`undefined`继续发起请求获取数据。

```javascript title=api.js
import { getImageFromCache } from './db';

export const image = fileName =>
  alovaInst.Get(`/image/${fileName}`, {
    async transformData(imgBlob) {
      // ...
    },

    // highlight-start
    async localCache() {
      // 获取缓存
      const cache = await getImageFromCache(fileName);
      return cache && cache.data;
    }
    // highlight-end
  });
```

这样就基本完成了一个基本的自定义缓存管理，你也可以保存缓存的过期时间，并在`localCache`中匹配到缓存时再判断是否已过期，从而实现缓存过期功能。

IndexedDB 只是其中一个异步管理缓存的案例，你也可以连接你的缓存服务器来管理它们。
