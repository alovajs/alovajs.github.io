---
title: Controlled Cache
sidebar_position: 60
---

When sending a request, the default response cache will be matched first. In some cases, you may need to use `IndexedDB` as a cache management solution and use a custom `IndexedDB` adapter, but this will make all requests use it as a storage solution, while controlled cache allows you to control the custom cache from a single request.

Using controlled cache is also very simple. You can set `cacheFor` in method to an asynchronous or synchronous function. The data returned in this function will be used as cache data. For example, read data in `IndexedDB`.

```javascript
const getFile = fileName =>
  alovaInstance.GET(`/file/${fileName}`, {
    // Controlled cache functions support asynchronous and synchronous functions
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

You can also return `undefined` or no data in `cacheFor` and continue to send the request, which is useful in the case of cache misses when customizing cache management.

## Use transformData to set cache

Because the `transformData` function has the following two features:

- It is triggered only when responding, and will not be triggered when hitting the response cache;

- It supports asynchronous functions;

Therefore, you can also use it to save custom caches. For example, in the scenario where files are used as response data for caching, you can use IndexedDB to cache file data.

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

When used in usehooks, throwing an error in the `cacheFor` function will trigger `onError`. When using the method instance to directly initiate a request, the promise will be rejected.
