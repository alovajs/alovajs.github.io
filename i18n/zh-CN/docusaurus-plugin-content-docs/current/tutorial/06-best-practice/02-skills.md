---
title: 使用技巧
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

以下为 alova 开发者在使用 alova 时，所使用的较好的使用技巧，通过多方收集，将它们整理在此，希望对大家可以更顺畅地使用 alova。

## 发送请求 useRequest OR method

alova 提供的`useRequest`在正常情况只会发送一次请求，并获取响应数据，那为什么不直接使用 method 实例来发送请求呢，这是因为`useRequest`可以帮我们自动管理`loading`、`data`、`error`等可以直接使用的响应式数据，因此，如果你需要使用这些状态时，使用`useRequest`不需要自行维护数据。但相反，你并不需要在整个项目中只适用`useRequest`，例如在只关心获取信息，而不需要使用到`loading`、`error`等的时候，在组件外获取数据的时候，可以使用 method 实例来发送请求。

## 同时更新状态和缓存

当你编辑完一个列表的某条数据时，不希望再次重新请求更新列表数据，而是手动更新列表数据，很多开发者可能会直接修改列表数据。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <List :data="listData"></List>
  <Editor @submit="handleItemSubmit"></Editor>
</template>
<script setup>
  // ...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // 直接更新了listData
  const handleItemSubmit = item => {
    const index = listData.findIndex(({ id }) => id === item.id);
    listData.splice(index, 1, item);
  };
</script>
```

</TabItem>

<TabItem value="2" label="react">

```jsx
// ...

const App = () => {
  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // 直接更新了listData
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
  // ...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // 直接更新了listData
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

**❌ 不推荐这样的写法**

这虽然可以触发界面刷新，但可能会带来另一个问题，就是在列表数据开启了缓存的时候，由于缓存数据未被更新，而导致再次进入这个列表页时命中的缓存依然是原来的数据。

因此你可以调用 `updateState` 来更新状态化数据的同时，还会立即更新缓存。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <List :data="listData"></List>
  <Editor @submit="handleItemSubmit"></Editor>
</template>
<script setup>
  // ...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // 通过updateState更新listData，将会同时更新缓存
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
// ...

const App = () => {
  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // 通过updateState更新listData，将会同时更新缓存
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
  // ...

  const { data: listData } = useRequest(getList, {
    initialData: []
  });

  // 通过updateState更新listData，将会同时更新缓存
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

## 在 onSuccess 中快速获取 sendArgs

在实际项目中，经常通过`send`函数传递数据，如果你需要在 onSuccess 等回调函数中使用这些数据，由于它们存在于`event.sendArgs`数组中，此时你可以使用双重解构的方式直接获取到数据。

```javascript
onSuccess(({ sendArgs: [content] }) => {
  console.log(content);
});
```

## 使用前缀管理同类 method 实例

在很多场景下，我们需要同时对多个缓存进行失效处理，例如一个页面的数据来自多个接口，当编辑这个页面的数据时需要同时失效这几个接口的缓存数据，你可以将这几个 method 实例使用相同的前缀来分类它们，并使用这个正则表达式将相同前缀的缓存失效。

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
  // 同时失效指定id的3个缓存数据
  invalidateCache(new RegExp(`^data-${id}`);
}
```

## 模拟数据实践

如果你的项目，在开发环境下需要使用模拟数据模拟部分或全部接口，在生产切换回真实的网络请求，你可以通过环境变量来控制。

```javascript
const globalFetch = GlobalFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1 /** ... */], {
  httpAdapter: globalFetch,
  delay: 1000
});

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // 通过环境变量控制生产环境下，不会将mock相关代码打包进去
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch
  // ...
});
```

并且推荐团队内不同的开发者可以根据每次迭代的版本号分别创建不同的模拟接口数据，以便于在团队中管理这些模拟数据，具体可参照 [模拟数据](/tutorial/extension/alova-mock) 章节。
