---
title: 分页请求策略
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

为分页场景下设计的 hook，它可以帮助你自动管理分页数据，数据预加载，减少不必要的数据刷新，**流畅性提高 300%，编码难度降低 50%**。你可以在下拉加载和页码翻页两种分页场景下使用它，此 hook 提供了丰富的特性，助你的应用打造性能更好，使用更便捷的分页功能。

## 示例

[页码列表](/tutorial/example/paginated-list)

[下拉加载更多](/tutorial/example/load-more)

## 特性

- ✨ 丰富全面的分页状态；
- ✨ 丰富全面的分页事件；
- ✨ 更改 page、pageSize 自动获取指定分页数据；
- ✨ 数据缓存，无需重复请求相同参数的列表数据；
- ✨ 前后页预加载，翻页不再等待；
- ✨ 搜索条件监听自动重新获取页数；
- ✨ 支持列表数据的新增、编辑、删除；
- ✨ 支持刷新指定页的数据，无需重置；
- ✨ 请求级搜索防抖，无需自行维护；

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```bash
# npm
npm install @alova/scene-vue --save
# yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
# yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
# yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## 使用

### 展示列表数据

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <div
    v-for="item in data"
    :key="item.id">
    <span>{{ item.name }}</span>
  </div>
  <button @click="handlePrevPage">上一页</button>
  <button @click="handleNextPage">下一页</button>
  <button @click="handleSetPageSize">设置每页数量</button>
  <span>共有{{ pageCount }}页</span>
  <span>共有{{ total }}条数据</span>
</template>

<script setup>
  import { queryStudents } from './api.js';
  import { usePagination } from '@alova/scene-vue';

  const {
    // 加载状态
    loading,

    // 列表数据
    data,

    // 是否为最后一页
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,

    // 当前页码，改变此页码将自动触发请求
    page,

    // 每页数据条数
    pageSize,

    // 分页页数
    pageCount,

    // 总数据量
    total
  } = usePagination(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // 请求前的初始数据（接口返回的数据格式）
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // 初始页码，默认为1
      initialPageSize: 10 // 初始每页数据条数，默认为10
    }
  );

  // 翻到上一页，page值更改后将自动发送请求
  const handlePrevPage = () => {
    page.value--;
  };

  // 翻到下一页，page值更改后将自动发送请求
  const handleNextPage = () => {
    page.value++;
  };

  // 更改每页数量，pageSize值更改后将自动发送请求
  const handleSetPageSize = () => {
    pageSize.value = 20;
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { queryStudents } from './api.js';
import { usePagination } from '@alova/scene-react';

const App = () => {
  const {
    // 加载状态
    loading,

    // 列表数据
    data,

    // 是否为最后一页
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,

    // 当前页码，改变此页码将自动触发请求
    page: [page, setPage],

    // 每页数据条数
    pageSize: [page, setPageSize],

    // 分页页数
    pageCount,

    // 总数据量
    total
  } = usePagination(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // 请求前的初始数据（接口返回的数据格式）
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // 初始页码，默认为1
      initialPageSize: 10 // 初始每页数据条数，默认为10
    }
  );

  // 翻到上一页，page值更改后将自动发送请求
  const handlePrevPage = () => {
    setPage(value => value - 1);
  };

  // 翻到下一页，page值更改后将自动发送请求
  const handleNextPage = () => {
    setPage(value => value + 1);
  };

  // 更改每页数量，pageSize值更改后将自动发送请求
  const handleSetPageSize = () => {
    setPageSize(20);
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))}
      <button onClick={handlePrevPage}>上一页</button>
      <button onClick={handleNextPage}>下一页</button>
      <button onClick={handleSetPageSize}>设置每页数量</button>
      <span>共有{pageCount}页</span>
      <span>共有{total}条数据</span>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { queryStudents } from './api.js';
  import { usePagination } from '@alova/scene-svelte';

  const {
    // 加载状态
    loading,

    // 列表数据
    data,

    // 是否为最后一页
    // 下拉加载时可通过此参数判断是否还需要加载
    isLastPage,

    // 当前页码，改变此页码将自动触发请求
    page,

    // 每页数据条数
    pageSize,

    // 分页页数
    pageCount,

    // 总数据量
    total
  } = usePagination(
    // Method实例获取函数，它将接收page和pageSize，并返回一个Method实例
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // 请求前的初始数据（接口返回的数据格式）
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // 初始页码，默认为1
      initialPageSize: 10 // 初始每页数据条数，默认为10
    }
  );

  // 翻到上一页，page值更改后将自动发送请求
  const handlePrevPage = () => {
    $page--;
  };

  // 翻到下一页，page值更改后将自动发送请求
  const handleNextPage = () => {
    $page++;
  };

  // 更改每页数量，pageSize值更改后将自动发送请求
  const handleSetPageSize = () => {
    $pageSize = 20;
  };
</script>

{#each $data as item}
<div>
  <span>{item.name}</span>
</div>
{/each}
<button on:click="{handlePrevPage}">上一页</button>
<button on:click="{handleNextPage}">下一页</button>
<button on:click="{handleSetPageSize}">设置每页数量</button>
<span>共有{pageCount}页</span>
<span>共有{total}条数据</span>
```

</TabItem>
</Tabs>

### 指定分页数据

每个分页数据接口返回的数据结构各不相同，因此我们需要分别告诉`usePagination`列表数据与总条数，从而帮助我们管理分页数据。

假如你的分页接口返回的数据格式是这样的：

```typescript
interface PaginationData {
  totalNumber: number;
  list: any[];
}
```

此时你需要通过函数的形式返回列表数据与总条数。

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
  // highlight-start
  total: response => response.totalNumber,
  data: response => response.list
  // highlight-end
});
```

如果不指定 total 和 data 回调函数，它们将默认通过以下方式获取数据。

```javascript
const total = response => response.total;
const data = response => response.data;
```

:::warning 注意

data 回调函数必须返回一个列表数据，表示分页中所使用的数据集合，而 total 主要用于计算当前页数，在 total 回调函数中如果未返回数字，将会通过请求的列表数量是否少于 pageSize 值来判断当前是否为最后一页，这一般用于下拉加载时使用。

:::

### 开启追加模式

默认情况下，翻页时会替换原有的列表数据，而追加模式是在翻页时会将下一页的数据追加到当前列表底部，常见的使用场景是下拉加载更多。

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
  // highlight-start
  append: true
  // highlight-end
});
```

### 预加载相邻页数据

为了让分页提供更好的体验，在当前页的上一页和下一页满足条件时将会自动预加载，这样在用户翻页时可直接显示数据而不需要等待，这是默认的行为。如果你不希望预加载相邻页的数据，可通过以下方式关闭。

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
  // highlight-start
  preloadPreviousPage: false, // 关闭预加载上一页数据
  preloadNextPage: false // 关闭预加载下一页数据
  // highlight-end
});
```

:::warning 预加载触发条件

在开启预加载时，并不会一味地加载下一页，需要满足以下两个条件：

1. 预加载是基于缓存的，用于分页加载的 Method 实例必须开启缓存，默认情况下 get 请求会有 5 分钟的 memory 缓存，如果是非 get 请求或者全局关闭了缓存，你还需要在这个 Method 实例中单独设置`localCache`开启缓存。
2. 根据`total`和`pageSize`参数判断出下一页还有数据。

:::

除了`onSuccess、onError、onComplete`请求事件外，在触发了预加载时，你还可以通过`fetching`来获知预加载状态，还可以通过`onFetchSuccess、onFetchError、onFetchComplete`来监听预加载请求的事件。

```javascript
const {
  // 预加载状态
  fetching,

  // 预加载成功事件绑定函数
  onFetchSuccess,

  // 预加载错误事件绑定函数
  onFetchError,

  // 预加载完成事件绑定函数
  onFetchComplete
} = usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
});
```

### 监听筛选条件

很多时候列表需要通过条件进行筛选，此时可以通过`usePagination`的状态监听来触发重新请求，这与 alova 提供的`useWatcher`是一样的。

例如通过学生姓名、学生年级进行筛选。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- highlight-start -->
  <input v-model="studentName" />
  <select v-model="clsName">
    <option value="1">Class 1</option>
    <option value="2">Class 2</option>
    <option value="3">Class 3</option>
  </select>
  <!-- highlight-end -->
  <!-- ... -->
</template>

<script setup>
  import { ref } from 'vue';
  import { queryStudents } from './api.js';
  import { usePagination } from '@alova/scene-vue';

  // 搜索条件状态
  const studentName = ref('');
  const clsName = ref('');
  const {
    // ...
  } = usePagination((page, pageSize) => queryStudents(page, pageSize, studentName.value, clsName.value), {
    // ...
    // highlight-start
    watchingStates: [studentName, clsName]
    // highlight-end
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { queryStudents } from './api.js';
import { usePagination } from '@alova/scene-react';

const App = () => {
  // 搜索条件状态
  const [studentName, setStudentName] = useState('');
  const [clsName, setClsName] = useState('');
  const {
    // ...
  } = usePagination(
    (page, pageSize) => queryStudents(page, pageSize, studentName, clsName),
    {
      // ...
      // highlight-start
      watchingStates: [studentName, clsName]
      // highlight-end
    }
  );

  return (
    // highlight-start
    <input value={studentName} onChange={({ target }) => setStudentName(target.value)} />
    <select value={clsName} onChange={({ target }) => setClsName(target.value)}>
      <option value="1">Class 1</option>
      <option value="2">Class 2</option>
      <option value="3">Class 3</option>
    </select>
    // highlight-end
    // ...
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { queryStudents } from './api.js';
  import { usePagination } from '@alova/scene-svelte';
  import { writable } from 'svelte/store';

  // 搜索条件状态
  const studentName = writable('');
  const clsName = writable('');
  const {
    // ...
  } = usePagination((page, pageSize) => queryStudents(page, pageSize, $studentName, $clsName), {
    // ...
    // highlight-start
    watchingStates: [studentName, clsName]
    // highlight-end
  });
</script>

<!-- highlight-start -->
<input bind:value="{studentName}" />
<select bind:value="{clsName}">
  <option value="1">Class 1</option>
  <option value="2">Class 2</option>
  <option value="3">Class 3</option>
</select>
<!-- highlight-end -->
<!-- ... -->
```

</TabItem>
</Tabs>

与`useWatcher`相同，你也可以通过指定`debounce`来实现请求防抖，具体可参考[useWatcher 的 debounce 参数设置](/api/core-hooks#usewatcher)。

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize, studentName, clsName), {
  // ...
  // highlight-start
  debounce: 300 // 防抖参数，单位为毫秒数，也可以设置为数组对watchingStates单独设置防抖时间
  // highlight-end
});
```

需要注意的是，`debounce`是通过 [**useWatcher**](/api/core-hooks#usewatcher) 中的请求防抖实现的。**监听状态末尾分别还有 page 和 pageSize 两个隐藏的监听状态，也可以通过 debounce 来设置。**

举例来说，当`watchingStates`设置了`[studentName, clsName]`，内部将会监听`[studentName, clsName, page, pageSize]`，因此如果需要对 page 和 pageSize 设置防抖时，可以指定为`[0, 0, 500, 500]`。

### 关闭初始化请求

默认情况下，`usePagination`会在初始化时发起请求，但你也可以使用`immediate`关闭它，并在后续通过`send`函数，或者改变`page`或`pageSize`，以及`watchingStates`等监听状态来发起请求。

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize, studentName, clsName), {
  // ...
  // highlight-start
  immediate: false
  // highlight-end
});
```

## 列表操作函数

usePagination 提供了功能完善的列表操作函数，它可以在不重新请求列表的情况下，做到与重新请求列表一致的效果，大大提高了页面的交互体验，具体的函数说明继续往下看吧！

### 插入列表项

你可以用它插入列表项到列表任意位置，它将会在插入之后去掉末尾的一项，来保证和重新请求当前页数据一致的效果。

```typescript
/**
 * 插入一条数据
 * 如果未传入index，将默认插入到最前面
 * 如果传入一个列表项，将插入到这个列表项的后面，如果列表项未在列表数据中将会抛出错误
 * @param item 插入项
 * @param indexOrItem 插入位置（索引）
 */
declare function insert(item: LD[number], indexOrItem?: number | LD[number]): void;
```

以下为**非 append 模式**下（页码翻页场景），返回第一页再插入列表项的示例：

```javascript
page.value = 1;
nextTick(() => {
  insert(newItem, 0);
});
```

以下为在**append 模式**下（下拉加载场景），插入列表项后滚动到最顶部的示例：

```javascript
insert(newItem, 0);
nextTick(() => {
  window.scrollTo(0, {});
});
```

你也可以将`insert`的第二个参数指定为列表项，当查找到这个列表项的相同引用时，插入项将插入到这个列表项的后面。

```javascript
insert(newItem, afterItem);
```

:::warning 注意

为了让数据正确，insert 函数调用会清除全部缓存。

:::

### 移除列表项

在下一页有缓存的情况下，它将会在移除一项后使用下一页的缓存补充到列表项尾部，来保证和重新请求当前页数据一致的效果，在**append 模式**和**非 append 模式**下表现相同。

```typescript
/**
 * 移除一条数据
 * 如果传入的是列表项，将移除此列表项，如果列表项未在列表数据中将会抛出错误
 * @param position 移除的索引或列表项
 */
declare function remove(position: number | LD[number]): void;
```

你也可以将`remove`的第二个参数指定为列表项，当查找到这个列表项的相同引用时，将会移除此列表项。

但在以下两种情况下，它将重新发起请求刷新对应页的数据：

1. 下一页没有缓存
2. 同步连续调用了超过下一页缓存列表项的数据，缓存数据已经不够补充到当前页列表了。

:::warning 注意

为了让数据正确，remove 函数调用会清除全部缓存。

:::

### 更新数据项

当你想要更新列表项时，使用此函数实现。

```typescript
/**
 * 替换一条数据
 * 当position传入数字时表示替换索引，负数表示从末尾算起，当 position 传入的是列表项，将替换此列表项，如果列表项未在列表数据中将会抛出错误
 * @param item 替换项
 * @param position 替换位置（索引）或列表项
 */
declare function replace(item: LD extends any[] ? LD[number] : any, position: number | LD[number]): void;
```

你也可以将`replace`的第二个参数指定为列表项，当查找到这个列表项的相同引用时，将会替换此列表项。

### 刷新指定页的数据

当你在数据操作后不希望本地更新列表项，而是重新请求服务端的数据，你可以用 refresh 刷新任意页的数据，而不需要重置列表数据让用户又从第一页开始浏览。

```typescript
/**
 * 刷新指定页码数据，此函数将忽略缓存强制发送请求
 * 如果未传入页码则会刷新当前页
 * 如果传入一个列表项，将会刷新此列表项所在页
 * @param pageOrItemPage 刷新的页码或列表项
 */
declare function refresh(pageOrItemPage?: number | LD[number]): void;
```

在 append 模式下，你可以将`refresh`的参数指定为列表项，当查找到这个列表项的相同引用时，刷新此列表项所在页数的数据。

### 手动更新列表数据

使用`update`函数更新响应式数据，这与[useRequest 的 update](/tutorial/combine-framework/use-request)相似，唯一不同的是，在调用`update`更新`data`时，更新的是列表数据，而非响应数据。这在手动清除列表数据，而不重新发起请求时很有用。

```typescript
// 情况列表数据
update({
  data: []
});
```

### 重置列表

它将清空全部缓存，并重新加载第一页。

```typescript
/**
 * 从第一页开始重新加载列表，并清空缓存
 */
declare function reload(): void;
```

## 限制

**缓存占位模式** 暂时无效

## API

### Hook 配置

继承[**useWatcher**](/api/core-hooks#usewatcher)所有配置。

| 名称                | 描述                                     | 类型                      | 默认值                     | 版本 |
| ------------------- | ---------------------------------------- | ------------------------- | -------------------------- | ---- |
| initialPage         | 初始页码                                 | number                    | 1                          | -    |
| initialPageSize     | 初始每页数据条数                         | number                    | 10                         | -    |
| watchingStates      | 状态监听触发请求，使用 useWatcher 实现   | any[]                     | [page, pageSize]           | -    |
| debounce            | 状态监听的防抖参数，使用 useWatcher 实现 | number \| number[]        | -                          | -    |
| append              | 是否开启追加模式                         | boolean                   | false                      | -    |
| data                | 指定分页的数组数据                       | (response: any) => any[]  | response => response.data  | -    |
| total               | 指定数据总数量值                         | (response: any) => number | response => response.total | -    |
| preloadPreviousPage | 是否预加载上一页数据                     | boolean                   | true                       | -    |
| preloadNextPage     | 是否预加载下一页数据                     | boolean                   | true                       | -    |

### 响应式数据

继承[**useWatcher**](/api/core-hooks#usewatcher)所有响应式数据。

| 名称       | 描述                                                                                                               | 类型    | 版本 |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ------- | ---- |
| page       | 当前页码，由 initialPage 决定                                                                                      | number  | -    |
| pageSize   | 当前每页数量，由 initialPageSize 决定                                                                              | number  | -    |
| data       | 分页列表数组数据，由 data 配置得到                                                                                 | any[]   | -    |
| total      | 数据总数量，由 total 配置得到，可为空                                                                              | number  | -    |
| pageCount  | 总页数，由 total 和 pageSize 计算得到                                                                              | number  | -    |
| isLastPage | 当前是否为最后一页，pageCount 有值时会通过 pageCount 和 page 对比得到，否则会通过列表数据长度是否少于 pagSize 得到 | number  | -    |
| fetching   | 是否正在预加载数据                                                                                                 | boolean | -    |

### 操作函数

继承[**useWatcher**](/api/core-hooks#usewatcher)所有操作函数。

| 名称    | 描述                                                                                                                                                   | 函数参数                                                                                | 返回值 | 版本 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------ | ---- |
| refresh | 刷新指定页码数据，此函数将忽略缓存强制发送请求，append 模式下可传入列表项表示刷新此列表项所在的页数                                                    | pageOrItemPage: 刷新的页码或列表项                                                      | -      | -    |
| insert  | 插入一条数据，如果未传入 index，将默认插入到最前面，如果传入一个列表项，将插入到这个列表项的后面，如果列表项未在列表数据中将会抛出错误                 | 1. item: 插入项<br/>2. indexOrItem: 插入位置（索引）或列表项，默认为 0                  | -      | -    |
| remove  | 移除一条数据，当传入数字时表示移除的索引，当 position 传入的是列表项，将移除此列表项，如果列表项未在列表数据中将会抛出错误                             | position: 移除位置（索引）或列表项                                                      | -      | -    |
| replace | 替换一条数据，当第二个参数传入数字时表示替换索引，负数表示从末尾算起，当 position 传入的是列表项，将替换此列表项，如果列表项未在列表数据中将会抛出错误 | 1. item: 替换项<br/>2. position: 替换位置（索引）或列表项，传入负数时表示从末尾开始算起 | -      | -    |
| reload  | 清空数据，并重新请求第一页数据                                                                                                                         | -                                                                                       | -      | -    |
| update  | 更新状态数据，与 alova 的 use hook 用法相同，但在更新 data 字段时是更新列表数据                                                                        | newFrontStates：新的状态数据对象                                                        | -      | -    |

### 事件

继承[**useWatcher**](/api/core-hooks#usewatcher)所有事件。

| 名称            | 描述                     | 回调参数                  | 版本 |
| --------------- | ------------------------ | ------------------------- | ---- |
| onFetchSuccess  | fetch 成功的回调绑定函数 | event: alova 成功事件对象 | -    |
| onFetchError    | fetch 失败的回调绑定函数 | event: alova 失败事件对象 | -    |
| onFetchComplete | fetch 完成的回调绑定函数 | event: alova 完成事件对象 | -    |
