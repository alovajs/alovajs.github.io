---
title: 使用技巧
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

以下为 alova 开发者在使用 alova 时，所使用的较好的使用技巧，通过多方收集，将它们整理在此，希望对大家可以更顺畅地使用 alova。

## 发送请求 useRequest OR method

alova 提供的`useRequest`在正常情况只会发送一次请求，并获取响应数据，那为什么不直接使用 method 实例来发送请求呢，这是因为`useRequest`可以帮我们自动管理`loading`、`data`、`error`等可以直接使用的响应式数据，因此，如果你需要使用这些状态时，使用`useRequest`不需要自行维护数据。但相反，你并不需要在整个项目中只适用`useRequest`，例如在只关心获取信息，而不需要使用到`loading`、`error`等的时候，在组件外获取数据的时候，可以使用 method 实例来发送请求。

## 同时更新状态和缓存

当你编辑完一个列表的某条数据时，不希望再次重新请求更新列表数据，而是手动更新列表数据，很多开发者可能会直接修改列表数据。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

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
<TabItem value="1" label="vue">

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

## 在 onSuccess 中快速获取 args

在实际项目中，经常通过`send`函数传递数据，如果你需要在 onSuccess 等回调函数中使用这些数据，由于它们存在于`event.args`数组中，此时你可以使用双重解构的方式直接获取到数据。

```javascript
onSuccess(({ args: [content] }) => {
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
const adapterFetch = adapterFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1 /** ... */], {
  httpAdapter: adapterFetch,
  delay: 1000
});

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // 通过环境变量控制生产环境下，不会将mock相关代码打包进去
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch
  // ...
});
```

并且推荐团队内不同的开发者可以根据每次迭代的版本号分别创建不同的模拟接口数据，以便于在团队中管理这些模拟数据，具体可参照 [模拟数据](/resource/request-adapter/alova-mock) 章节。

## 使用 useRequest 并行请求

简单的并行请求，只需要同时调用多个 useRequest 即可。

```javascript
const { data: todoList } = useRequest(todoListGetter);
const { data: todoCounter } = useRequest(todoCountGetter);
```

但这样的请求只适用于单纯的并行请求，如果你需要在并行请求都完成后再进行某些操作，有以下两种方式可以实现：

### 方法 1

手动创建 promise 对象，并使用`Promise.all`完成效果。

```javascript
const {
  data: todoList,
  onSuccess: onListSuccess,
  onError: onListError
} = useRequest(todoListGetter);
const {
  data: todoCounter,
  onSuccess: onCountSuccess,
  onError: onCountError
} = useRequest(todoCountGetter);

// 手动创建promise对象
const listPromise = new Promise((resolve, reject) => {
  onListSuccess(resolve);
  onListError(reject);
});
const countPromise = new Promise((resolve, reject) => {
  onCountSuccess(resolve);
  onCountError(reject);
});
const [listEvent, countEvent] = await Promise.all([listPromise, countPromise]);
// 并行请求完成，继续处理业务...
```

### 方法 2

使用`useRequest`函数返回的`send`函数，调用`send`将会返回一个可用的 promise 对象。

```javascript
// 先让它们不自动发送请求
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendCount } = useRequest(todoCountGetter, { immediate: false });

// 利用send函数返回的promise对象
const parallelRequest = async () => {
  const [listResponse, countResponse] = await Promise.all([sendList(), sendCount()]);
  // 并行请求完成，继续处理业务...
};
```

## 使用 useRequest 串行请求

串行请求也具有两种方式。

### 方法 1

让第一个请求自动发出，第二个请求在第一个请求的`onSuccess`回调中触发，即可完成串行请求，可通过以下写法完成串行请求：

```javascript
//
const { data: todoList, onSuccess } = useRequest(todoListGetter);
const { data: todoDetail, send: sendTodoDetail } = useRequest(
  todoId => todoDetailGetter(todoId),
  { immediate: false }
);

// 先获取列表，再获取第一个todo的详情
onSuccess(event => {
  sendTodoDetail(event.todoList[0].id);
});
```

### 方法 2

使用`useRequest`函数返回的`send`函数，调用`send`将会返回一个可用的 promise 对象。

```javascript
// 先让它们不自动发送请求
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendTodoDetail } = useRequest(todoId => todoDetailGetter(todoId), {
  immediate: false
});

// 利用send函数返回的promise对象
const serialRequest = async () => {
  const todoList = await sendList();
  const todoDetail = await sendTodoDetail(todoList[0].id);
  // 串行请求完成，继续处理业务...
};
```

> 串行请求建议直接使用[useSerialRequest](/tutorial/client/strategy/use-serial-request)和[useSerialWatcher](/tutorial/client/strategy/use-serial-watcher)。
