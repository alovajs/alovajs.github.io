---
title: response processing
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After the request is completed, the response data will be processed through multiple processes before the final data is obtained at the location where the request was sent. The process is as follows:

```mermaid
flowchart LR
   classDef condition fill:#a8bcff

   R1[Response successful] --> alovaInstance.responded.onSuccess
   alovaInstance.responded.onSuccess --> throw{throw error?}:::condition
   throw -->|No| method.transformData
   method.transformData --> useRequest.onSuccess
   throw -->|Yes| useRequest.onError

   method.transformData --> throw2{throw error?}:::condition
   throw2 -->|No| useRequest.onSuccess
   throw2 -->|Yes| useRequest.onError

   useRequest.onSuccess --> throw3{throw error?}:::condition
   throw3 -->|Yes| useRequest.onError

   R2[Response error] --> alovaInstance.responded.onError
   alovaInstance.responded.onError --> throw4{throw error?}:::condition
   throw4 -->|Yes| useRequest.onError
   throw4 -->|No| method.transformData
```

When no error is thrown, the next node will receive the return value of the previous node. The global response interceptor has been explained in [Global Interceptor](/tutorial/getting-started/global-interceptor). Next, let's take a look at `transformData` in method.

## Transform response data

When the response data structure of a request cannot directly meet the usage needs, we can set the `transformData` for the method instance to transform response data into the required structure.

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  params: {
    page: 1
  },

  // The function accepts raw data and response headers, and requires the transformed data to be returned, which will be assigned to the data state.
  // Note: rawData is the data filtered by the global response interceptor (if it is set). For the configuration of the response interceptor, please refer to the [Setting the Global Response Interceptor] chapter.
  transformData(rawData, headers) {
    return rawData.list.map(item => {
      return {
        ...item,
        statusText: item.done ? 'Completed' : 'In progress'
      };
    });
  }
});
```

<Tabs>
<TabItem value="1" label="useRequest">

```javascript
const { data } = useRequest(todoListGetter);
```

</TabItem>
<TabItem value="2" label="method">

```javascript
const data = await todoListGetter;
```

</TabItem>
</Tabs>

The data value will receive the transformed data structure.

```typescript
type data = {
  // ...
  statusText: 'Completed' | 'In progress';
}[];
```

:::warning note

When used in usehooks, throwing an error in `transformData` will also trigger `onError`;

:::

## Binding response callback

If you need to set a request callback, you can also receive the callback setting function in the return parameter of useRequest, as follows:

```javascript
const {
  // ...

  //Successful callback binding
  onSuccess,

  // Failure callback binding
  onError,

  // Complete the callback binding, the callback will be called on success or failure
  onComplete
} = useRequest(todoListGetter);
onSuccess(event => {
  console.log('The request was successful, the response data is:', event.data);
  console.log('The method instance of this request is:', event.method);
  console.log('Whether the response data comes from the cache:', event.fromCache);
});
onError(event => {
  console.log('The request failed, the error message is:', event.error);
  console.log('The method instance of this request is:', event.method);
});
onComplete(event => {
  // event.status is success when it succeeds and error when it fails.
  console.log('The request is completed, the status is: ', event.status);
  console.log('The method instance of this request is:', event.method);
  console.log('Whether the response data comes from the cache:', event.fromCache);
  if (event.data) {
    console.log('Request data:', event.data);
  } else if (event.error) {
    console.log('Error message:', event.error);
  }
});
```

:::warning note

Throwing an error in `onSuccess` will trigger `onError`.

:::
