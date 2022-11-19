---
title: Transform response data
sidebar_position: 10
---

When the response data structure cannot directly meet the front-end requirements, we can set the `transformData` hook function for the method instance to convert the response data into the required structure, and the data will be used as the value of the `data` state after conversion.

```javascript
const todoListGetter = alovaInstance.Get('/tood/list', {
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
