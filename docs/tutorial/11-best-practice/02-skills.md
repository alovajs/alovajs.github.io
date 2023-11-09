---
title: Skills
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The following are the better usage skills used by alova developers when using alova. They are collected from multiple parties and organized here. I hope that everyone can use alova more smoothly.

## Send request useRequest OR method

The `useRequest` provided by alova will only send a request and get the response data under normal circumstances, so why not use the method instance to send the request directly, because `useRequest` can help us automatically manage `loading` and `data` , `error` and other responsive data that can be used directly, so if you need to use these states, use `useRequest` without maintaining the data yourself. But on the contrary, you don't need to only apply `useRequest` in the whole project. For example, when you only care about getting information and don't need to use `loading`, `error`, etc., when getting data outside the component, you can use method instance to send the request.

## Update state and cache at the same time

When you finish editing a piece of data in a list, you don't want to re-request to update the list data again, but manually update the list data. Many developers may directly modify the list data.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <List :data="listData"></List>
  <Editor @submit="handleItemSubmit"></Editor>
</template>
<script setup>
  //...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // directly updated listData
  const handleItemSubmit = item => {
    const index = listData.findIndex(({ id }) => id === item.id);
    listData.splice(index, 1, item);
  };
</script>
```

</TabItem>

<TabItem value="2" label="react">

```jsx
//...

const App = () => {
  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // directly updated listData
  const handleItemSubmit = item => {
    const index = listData.findIndex(({ id }) => id === item.id);
    listData.splice(index, 1, item);
  };

  return (
    <>
      <List data={listData}></List>
      <Editor onSubmit={handleItemSubmit}></Editor>
    </>
  );
};
```

</TabItem>

<TabItem value="3" label="svelte">

```html
<script>
  //...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // directly updated listData
  const handleItemSubmit = item => {
    const index = listData.findIndex(({ id }) => id === item.id);
    listData.splice(index, 1, item);
  };
</script>
<List data="{listData}"></List>
<Editor on:submit="{handleItemSubmit}"></Editor>
```

</TabItem>
</Tabs>

**❌ This way of writing is not recommended**

Although this can trigger the interface to refresh, it may cause another problem, that is, when the list data is cached, because the cached data has not been updated, the hit cache is still the original data when entering the list page again.

So you can call `updateState` to update the stateful data and update the cache immediately.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <List :data="listData"></List>
  <Editor @submit="handleItemSubmit"></Editor>
</template>
<script setup>
  //...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // Update listData through updateState, the cache will be updated at the same time
  const handleItemSubmit = item => {
    updateState(getList(), oldListData => {
      const index = oldListData.findIndex(({ id }) => id === item.id);
      oldListData.splice(index, 1, item);
      return oldListData;
    });
  };
</script>
```

</TabItem>

<TabItem value="2" label="react">

```jsx
//...

const App = () => {
  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // Update listData through updateState, the cache will be updated at the same time
  const handleItemSubmit = item => {
    updateState(getList(), oldListData => {
      const index = oldListData.findIndex(({ id }) => id === item.id);
      oldListData.splice(index, 1, item);
      return oldListData;
    });
  };

  return (
    <>
      <List data={listData}></List>
      <Editor onSubmit={handleItemSubmit}></Editor>
    </>
  );
};
```

</TabItem>

<TabItem value="3" label="svelte">

```html
<script>
  //...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // Update listData through updateState, the cache will be updated at the same time
  const handleItemSubmit = item => {
    updateState(getList(), oldListData => {
      const index = oldListData.findIndex(({ id }) => id === item.id);
      oldListData.splice(index, 1, item);
      return oldListData;
    });
  };
</script>
<List data="{listData}"></List>
<Editor on:submit="{handleItemSubmit}"></Editor>
```

</TabItem>
</Tabs>

## Quickly get sendArgs in onSuccess

In actual projects, data is often passed through the `send` function. If you need to use these data in callback functions such as onSuccess, since they exist in the `event.sendArgs` array, you can use the double destructuring method to directly obtain them to the data.

```javascript
onSuccess(({ sendArgs: [content] }) => {
  console.log(content);
});
```

## Use prefixes to manage similar method instances

In many scenarios, we need to invalidate multiple caches at the same time. For example, the data of a page comes from multiple interfaces. When editing the data of this page, it is necessary to invalidate the cached data of these interfaces at the same time. You can method instances with the same prefix to classify them, and use this regex to invalidate caches with the same prefix.

```javascript
const getData1 = id => alovaInstance.Get('/data1', {
   name: `data-${id}-1`,
   params: {
     id
   }
});
const getData2 = alovaInstance.Get('/data2', {
   name: `data-${id}-2`,
   params: {
     id
   }
});
const getData3 = alovaInstance.Get('/data3', {
   name: `data-${id}-3`,
   params: {
     id
   }
});

const handleInvalidateCache = id => {
   // Simultaneously invalidate the 3 cached data of the specified id
   invalidateCache(new RegExp(`^data-${id}`);
}
```

## Simulation data practice

If your project needs to use simulated data to simulate some or all interfaces in the development environment, and switch back to real network requests in production, you can control it through environment variables.

```javascript
const globalFetch = GlobalFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1 /** ... */], {
  httpAdapter: globalFetch,
  delay: 1000
});

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // Control the production environment through environment variables, and will not package mock related codes
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch
  //...
});
```

And it is recommended that different developers in the team can create different mock interface data according to the version number of each iteration, so as to manage these mock data in the team. For details, please refer to the chapter of [Simulation Data](../extension/alova-mock) .
