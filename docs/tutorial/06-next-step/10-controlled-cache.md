---
title: Controlled Caching
sidebar_position: 90
---

:::info version required

v2.1.0+

:::

When sending a request, by default, it will first check whether there is matching cache data, and if it matches, it will use it as the response data to return. If in some scenarios, the user needs to use a custom cache, he must first use `setCache` to synchronize It is only feasible to set cached data, which undoubtedly increases the burden on users. This is an uncontrolled cache.

If you want to use such **IndexedDB** to custom management cache data with uncontrolled caching, you may first pre-set the hit cache for upcoming requests, like this:

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

**❌ But the usage above is not recommended**, for the following reasons:

1. Each call to `getFile` will set up a cache, but fileGetter is not necessarily used to send requests;
2. IndexedDB is an asynchronous interface. If the step of matching the cache occurs before IndexedDB triggers onsuccess, then the cached data will not be matched, and their order is unpredictable;
3. Custom cache management tasks and methods are separate, but in fact they should be aggregated together;

In this case, you can use controlled caching to solve the above problem. Using controlled caching is also very simple. You can set localCache in the method as an asynchronous or synchronous function, and return custom data as a hit in this function The cached data is returned.

```javascript
const getFile = fileName =>
  alovaInstance.GET(`/file/${fileName}`, {
    // Controlled caching functions support asynchronous and synchronous functions
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

If you want to continue sending requests, you can return undefined or no data in `localCache`, which is useful in case of a cache miss when customizing the managed cache.

1. You can also use [special usage of transformData](/tutorial/learning/transform-response-data) to implement custom cache storage tasks.
2. When used in usehooks, throwing an error in the `localCache` function will trigger `onError`, and when using the method instance to request directly, a rejected promise will be returned.
