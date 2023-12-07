---
title: Use method to request
sidebar_position: 30
---

## send request

:::info version required

v1.2.0+

:::

Sometimes we just want to simply send a request, instead of getting various response statuses through use hooks, or sending requests outside the component, we can directly call the `send` function of the `Method` instance, it will Returns a `Promise` object with return parameters.

```javascript
// Get global user information
const globalUserGetter = alovaInstance.Get('/global/user', {
  params: {
    userId: 1
  },
  transformData(rawData, headers) {
    return {
      data: rawData,
      respHeaders: headers
    };
  }
});

// The send method receives a parameter indicating whether to force the request, the default is false
const { data, respHeaders } = await globalUserGetter.send(true);
// use data...
```

`[v2.16.0+]` In order to provide a consistent usage experience with axios, there is no need to call the `send` function to send requests.

```js
alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
  // ...
});
// or
await alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1');
```

:::warning Note

1. The returned response data will also be processed by the global responded and the `transformData` of the current `Method` instance in turn;
2. The cache mechanism is still valid. If the cache is hit, the cached data will be returned. At this time, you can pass `true` in the `send` method to force the request;

:::

Regarding when to use `useRequest` to send a request and when to use a method instance to send a request, please read the [Best Practice](/tutorial/best-practice/skills) here.

## abort request

:::info version required

v2.6.0+

:::

If you need to interrupt the request sent by `method.send`, you can interrupt it in the following ways.

```javascript
globalUserGetter.abort();
```

It is worth noting that the method instance of the interrupt request must be the same reference as the method instance of the sending request.

`[v2.6.2+]`In addition, you can also call `abort` in `beforeRequest` to abort this request.

```javascript
const alovaInst = createAlova({
  //...
  beforeRequest(method) {
    if (someCondition) {
      method.abort();
    }
  }
});
```
