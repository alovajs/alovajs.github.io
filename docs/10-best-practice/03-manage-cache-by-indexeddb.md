---
title: Manage Cache with IndexedDB
sidebar_position: 30
---

If you are developing applications that require extensive use of local cache, such as graphics editing applications, file management applications, etc., the low-capacity localStorage can no longer meet the development needs. At this time, you can use IndexedDB and alova for large-capacity local cache management.

This feature is mainly due to alova's [Controlled Cache] (/next-step/controlled-cache) function, which can implement custom cache management. Let's take a look at the practical steps.

Here is an [example of managed cache with IndexedDB](/example/controlled-cache-by-indexeddb)

Let's take custom management of large image data as an example.

## Create IndexedDB instance

First create an IndexedDB instance to operate the local cache, and export the cache operation function.

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

// Add new data to IndexedDB
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

// Get file data according to fileName
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

## save data

When saving data, we can save the cache in the `transformData` of the method, because `transformData` will only be triggered when the network request responds, but will not be triggered when the cache is hit. In the sample code, convert the image blob instance to base64 data, cache and return this base64 data.

```javascript-api.js
import { addImage2Cache } from './db';

export const image = fileName =>
   alovaInst. Get(`/image/${fileName}`, {
     // highlight-start
     async transformData(imgBlob) {
       // Asynchronously convert the blob to base64
       const reader = new FileReader();
       reader.readAsDataURL(imgBlob);
       const base64Img = await new Promise(resolve => {
         reader.onload = ({ target }) => {
           resolve(target.result);
         };
       });

       // Cache image data to IndexedDB
       await addImage2Cache(fileName, base64Img);
       return base64Img;
     }
     // highlight-end
   });
```

## retrieve data

Specify `localCache` of this method instance as an asynchronous function to change the cache into a controlled state, match the cache in IndexedDB in this function, and return it if it matches, otherwise return `undefined` and continue to initiate a request to obtain data.

```javascript title=api.js
import { getImageFromCache } from './db';

export const image = fileName =>
  alovaInst.Get(`/image/${fileName}`, {
    async transformData(imgBlob) {
      //...
    },

    // highlight-start
    async localCache() {
      // get cache
      const cache = await getImageFromCache(fileName);
      return cache && cache.data;
    }
    // highlight-end
  });
```

In this way, a basic custom cache management is basically completed. You can also save the expiration time of the cache, and judge whether it has expired when the cache is matched in `localCache`, so as to realize the cache expiration function.

IndexedDB is just one example of managing caches asynchronously, you can also connect to your cache servers to manage them.
