---
title: Controlled Cache
sidebar_position: 60
---

:::info version requirements

v2.1.0+

:::

When sending a request, by default it will first check whether there is matching cache data. If it matches, it will use it as the response data to return. If in some scenarios, the user needs to use a custom cache, they must first use `setCache` to synchronize Setting up cached data can only work, which undoubtedly increases the burden on users. This is an uncontrolled cache.

If you want to use **IndexedDB** to custom manage cached data under uncontrolled caching, you may first pre-set the hit cache for the upcoming request, like this:

```javascript
const getFile = fileName => {
  const fileGetter = alovaInstance.GET(`/file/${fileName}`);
  const tx = db.transaction(['files']);
  const getRequest = tx.objectStore('files').get(fileName);
  getRequest.onsuccess = ({ result }) => {
    setCache(fileGetter, result);
  };
  return fileGetter;
};
```

**❌ However, the above writing method is not recommended** for the following reasons:

1. Each time `getFile` is called, a cache will be set, but fileGetter is not necessarily used to send requests;
2. IndexedDB is an asynchronous interface. If the cache matching step occurs before IndexedDB triggers onsuccess, then the cached data will not be matched, and their order is unpredictable;
3. Custom cache management tasks and methods are separated, but in fact they should be brought together;

In this case, you can use controlled caching to solve the above problem. Using controlled caching is also very simple. You can set the localCache in the method to an asynchronous or synchronous function, and return custom data as a hit in this function. The cached data is returned.

```javascript
const getFile = fileName =>
  alovaInstance.GET(`/file/${fileName}`, {
    // Controlled cache functions support asynchronous and synchronous functions
    localCache() {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(['files']);
        const getRequest = tx.objectStore('files').get(fileName);
        getRequest.onsuccess = resolve;
        getRequest.onerror = reject;
      });
    }
  });
```

## Do not use caching

If you wish to continue sending the request, you can return `undefined` or `void` in `localCache`, which is useful in the case of cache misses when customizing the cache.

## Use transformData to set up cache

Because the `transformData` function has the following two properties:

- It is only triggered when responding, but will not be triggered when the response cache is hit;
- Support asynchronous functions;

Therefore, you can also use it to save customized caches. For example, in a cache scenario where files are used as response data, you can use IndexedDB to cache file data.

```javascript
const fileGetter = alovaInstance.Get('/file/file_name', {
  // Use IndexedDB to cache files
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

## Notes

When used in usehooks, throwing an error in the `localCache` function will trigger `onError`. When a request is made directly using a method instance, a promise instance with a reject status will be returned.
