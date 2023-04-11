---
title: Transform response data
sidebar_position: 10
---

When the response data structure cannot directly meet the front-end requirements, we can set the `transformData` hook function for the method instance to convert the response data into the required structure, and the data will be used as the value of the `data` state after conversion.

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  params: {
    page: 1
  },

  // The function accepts raw data and response header objects, and asks to return the converted data, which will be assigned to the data state.
  // Note: rawData is generally the data filtered by the response interceptor. For the configuration of the response interceptor, please refer to the [Setting the Global Response Interceptor] chapter.
  transformData(rawData, headers) {
    return rawData.list.map(item => {
      return {
        ...item,
        statusText: item.done ? 'completed' : 'in progress'
      };
    });
  }
});
```

## special usage of transformData

Since the transformData function has the following two properties:

1. It will only be triggered when the network request responds, and will not be triggered when the response cache is hit;
2. Support asynchronous functions;

You can also use it as a hook function for network request response. For example, in the cache scenario where files are used as response data, you can cooperate with IndexedDB to cache file data, and at the same time cooperate with [Controlled cache](/next-step/controlled-cache) to hit the file cache in IndexedDB.

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
