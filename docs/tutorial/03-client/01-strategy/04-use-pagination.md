---
title: Pagination request strategy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info stragety type

use hook

:::

> Before using extension hooks, make sure you are familiar with basic usage of alova.

A hook designed for paging scenarios, which can help you automatically manage paging data, preload data, reduce unnecessary data refresh, improve fluency by 300%, and reduce coding difficulty by 50%\*\*. You can use it in the two paging scenarios of pull-down loading and page number flipping. This hook provides a wealth of features to help your application create better performance and more convenient paging functions.

<!-- ## Example

[page list](/next/tutorial/example/vue/paginated-list)

[Pull down to load more](/next/tutorial/example/vue/load-more) -->

## Features

- Rich and comprehensive paging status;
- Rich and comprehensive pagination events;
- Change page, pageSize to automatically get specified paging data;
- Data caching, no need to repeatedly request list data of the same parameters;
- Front and back pages are preloaded, no waiting for page turning;
- Search condition monitoring automatically reacquires pages;
- Support adding, editing and deleting list data;
- Support refreshing the data of the specified page without reset;
- Request-level search anti-shake, no need to maintain by yourself;

## Usage

### Render list data

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <div
    v-for="item in data"
    :key="item.id">
    <span>{{ item.name }}</span>
  </div>
  <button @click="handlePrevPage">Previous page</button>
  <button @click="handleNextPage">next page</button>
  <button @click="handleSetPageSize">Set the number of pages</button>
  <span>There are {{ pageCount }} pages</span>
  <span>A total of {{ total }} data</span>
</template>

<script setup>
  import { queryStudents } from './api.js';
  import { usePagination } from 'alova/client';

  const {
    // loading state
    loading,

    // list data
    data,

    // is it the last page
    // This parameter can be used to determine whether it needs to be loaded during pull-down loading
    isLastPage,

    // The current page number, changing this page number will automatically trigger the request
    page,

    // Number of data items per page
    pageSize,

    // number of paging pages
    pageCount,

    // total amount of data
    total
  } = usePagination(
    // Method instance acquisition function, it will receive page and pageSize, and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before the request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // initial page number, default is 1
      initialPageSize: 10 // The initial number of data items per page, the default is 10
    }
  );

  // Turn to the previous page, the request will be sent automatically after the page value changes
  const handlePrevPage = () => {
    page.value--;
  };

  // Turn to the next page, the request will be sent automatically after the page value changes
  const handleNextPage = () => {
    page.value++;
  };

  // Change the number of pages, the request will be sent automatically after the pageSize value is changed
  const handleSetPageSize = () => {
    pageSize.value = 20;
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { queryStudents } from './api.js';
import { usePagination } from 'alova/client';

const App = () => {
  const {
    // loading state
    loading,

    // list data
    data,

    // is it the last page
    // This parameter can be used to determine whether it needs to be loaded during pull-down loading
    isLastPage,

    // The current page number, changing this page number will automatically trigger the request
    page,

    // Number of data items per page
    pageSize,

    // number of paging pages
    pageCount,

    // total amount of data
    total，

    // update states
    update
  } = usePagination(
    // Method instance acquisition function, it will receive page and pageSize, and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before the request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // initial page number, default is 1
      initialPageSize: 10 // The initial number of data items per page, the default is 10
    }
  );

  // Turn to the previous page, the request will be sent automatically after the page value changes
  const handlePrevPage = () => {
    update({
      page: page - 1
    });
  };

  // Turn to the next page, the request will be sent automatically after the page value changes
  const handleNextPage = () => {
    update({
      page: page + 1
    });
  };

  // Change the number of pages, the request will be sent automatically after the pageSize value is changed
  const handleSetPageSize = () => {
    update({
      pageSize: 20
    });
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))}
      <button onClick={handlePrevPage}>Previous page</button>
      <button onClick={handleNextPage}>Next Page</button>
      <button onClick={handleSetPageSize}>Set the number per page</button>
      <span>There are {pageCount} pages</span>
      <span>A total of {total} pieces of data</span>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { queryStudents } from './api.js';
  import { usePagination } from 'alova/client';

  const {
    // loading state
    loading,

    // list data
    data,

    // is it the last page
    // This parameter can be used to determine whether it needs to be loaded during pull-down loading
    isLastPage,

    // The current page number, changing this page number will automatically trigger the request
    page,

    // Number of data items per page
    pageSize,

    // number of paging pages
    pageCount,

    // total amount of data
    total
  } = usePagination(
    // Method instance acquisition function, it will receive page and pageSize, and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before the request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // initial page number, default is 1
      initialPageSize: 10 // The initial number of data items per page, the default is 10
    }
  );

  // Turn to the previous page, the request will be sent automatically after the page value changes
  const handlePrevPage = () => {
    $page--;
  };

  // Turn to the next page, the request will be sent automatically after the page value changes
  const handleNextPage = () => {
    $page++;
  };

  // Change the number of pages, the request will be sent automatically after the pageSize value is changed
  const handleSetPageSize = () => {
    $pageSize = 20;
  };
</script>

{#each $data as item}
<div>
  <span>{item.name}</span>
</div>
{/each}
<button on:click="{handlePrevPage}">Previous page</button>
<button on:click="{handleNextPage}">Next Page</button>
<button on:click="{handleSetPageSize}">Set the number per page</button>
<span>There are {pageCount} pages</span>
<span>A total of {total} pieces of data</span>
```

</TabItem>
</Tabs>

### Specify pagination data

The data structure returned by each paging data interface is different, so we need to tell `usePagination` the list data and the total number of items separately, so as to help us manage the paging data.

Suppose the data format returned by your paging interface is as follows:

```typescript
interface PaginationData {
  totalNumber: number;
  list: any[];
}
```

At this point, you need to return the list data and the total number of items in the form of a function.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  //...
  // highlight-start
  total: response => response.totalNumber,
  data: response => response.list
  // highlight-end
});
```

If you don't specify the total and data callback functions, they will get data in the following ways by default.

```javascript
const total = response => response.total;
const data = response => response.data;
```

:::warning Caution

The data callback function must return a list of data, indicating the data set used in paging, and total is mainly used to calculate the current page number. If no number is returned in the total callback function, it will pass whether the number of requested lists is less than the pageSize value To determine whether the current page is the last page, which is generally used for pull-down loading.

:::

### Enable append mode

By default, the original list data will be replaced when the page is turned, and the append mode will append the data of the next page to the bottom of the current list when the page is turned. A common usage scenario is to pull down to load more.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  //...
  // highlight-start
  append: true
  // highlight-end
});
```

### Preload adjacent page data

In order to provide a better experience for pagination, when the previous and next pages of the current page meet the conditions, it will be automatically preloaded, so that when the user turns the page, the data can be displayed directly without waiting. This is the default behavior. If you don't want to preload the data of adjacent pages, you can turn it off in the following way.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  //...
  // highlight-start
  preloadPreviousPage: false, // turn off preloading previous page data
  preloadNextPage: false // turn off preloading next page data
  // highlight-end
});
```

:::warning preloading trigger conditions

When preloading switch is turned on, the next page will not be loaded blindly. The following two conditions need to be met:

1. Preloading is based on cache of alova. The method instance used for pagination must enable chache. By default, get requests will have 5 minutes of memory cache. If it is a non-get request or the cache is turned off globally, you also need to set the cache in this Method. In the instance, set `localCache` separately to enable cache.
2. Based on the `total` and `pageSize` parameters, it is determined that there is still data on the next page.

:::

In addition to `onSuccess, onError, onComplete` request events, when preloading is triggered, you can also know the preloading status through `fetching`, and you can also listen to preloading request events through `onFetchSuccess, onFetchError, onFetchComplete`.

```javascript
const {
  // preload state
  fetching,

  // preload success event binding function
  onFetchSuccess,

  // preload error event binding function
  onFetchError,

  // Preloading complete event binding function
  onFetchComplete
} = usePagination((page, pageSize) => queryStudents(page, pageSize), {
  //...
});
```

### Listening filter conditions

In many cases, the list needs to be filtered by conditions. At this time, the re-request can be triggered through the status monitoring of `usePagination`, which is the same as `useWatcher` provided by alova.

For example, filter by student name, student grade.

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
  import { usePagination } from 'alova/client';

  // search condition status
  const studentName = ref('');
  const clsName = ref('');
  const {
    //...
  } = usePagination(
    (page, pageSize) => queryStudents(page, pageSize, studentName.value, clsName.value),
    {
      //...
      // highlight-start
      watchingStates: [studentName, clsName]
      // highlight-end
    }
  );
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { queryStudents } from './api.js';
import { usePagination } from 'alova/client';

const App = () => {
   // search condition status
   const [studentName, setStudentName] = useState('');
   const [clsName, setClsName] = useState('');
   const {
     //...
   } = usePagination(
     (page, pageSize) => queryStudents(page, pageSize, studentName, clsName),
     {
       //...
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
     //...
   );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { queryStudents } from './api.js';
  import { usePagination } from 'alova/client';
  import { writable } from 'svelte/store';

  // search condition status
  const studentName = writable('');
  const clsName = writable('');
  const {
    //...
  } = usePagination((page, pageSize) => queryStudents(page, pageSize, $studentName, $clsName), {
    //...
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

Same as `useWatcher`, you can also implement request debounce by specifying `debounce`, for details, please refer to [useWatcher's debounce parameter setting](/next/api/core-hooks#usewatcher).

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize, studentName, clsName), {
  //...
  // highlight-start
  debounce: 300 // Anti-shake parameters, in milliseconds, can also be set as an array to set the anti-shake time separately for watchingStates
  // highlight-end
});
```

It should be noted that `debounce` is achieved by request debounce in [**useWatcher**](/next/api/core-hooks#usewatcher). **At the end of the monitoring state, there are two hidden monitoring states of page and pageSize, which can also be set by debounce. **

For example, when `watchingStates` is set to `[studentName, clsName]`, `[studentName, clsName, page, pageSize]` will be monitored internally, so if you need to set anti-shake for page and pageSize, you can specify ` [0, 0, 500, 500]`.

### Close initialization request

By default, `usePagination` will initiate a request during initialization, but you can also use `immediate` to turn it off, and then pass the `send` function, or change `page` or `pageSize`, and `watchingStates`, etc. state to initiate the request.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize, studentName, clsName), {
  //...
  // highlight-start
  immediate: false
  // highlight-end
});
```

## List action functions

usePagination provides a fully functional list action function, which can achieve the same effect as the re-request list without re-requesting the list, which greatly improves the interactive experience of the page. The specific function description continues to look down!

### Insert list item

You can use it to insert list items to any position in the list, and it will remove the last item after insertion to ensure the same effect as re-requesting the current page data.

```typescript
/**
 * Insert data
 * If no index is passed in, it will be inserted at the front by default
 * If a list item is passed in, it will be inserted after the list item, and an error will be thrown if the list item is not in the list data
 * @param item insert item
 * @param indexOrItem insertion position (index)
 */
declare function insert(item: LD[number], indexOrItem?: number | LD[number]): void;
```

The following is an example of returning to the first page and then inserting list items in **non-append mode** (page number flipping scenario):

```javascript
page.value = 1;
nextTick(() => {
  insert(newItem, 0);
});
```

The following is an example of scrolling to the top after inserting a list item in **append mode** (drop-down loading scene):

```javascript
insert(newItem, 0);
nextTick(() => {
  window.scrollTo(0, {});
});
```

You can also specify the second parameter of `insert` as a list item. When the same reference of this list item is found, the insert item will be inserted after this list item.

```javascript
insert(newItem, afterItem);
```

:::warning Caution

In order to make the data correct, the insert function call will clear all caches.

:::

### Remove list item

In the case that the next page has a cache, it will use the cache of the next page to add to the end of the list item after removing an item, so as to ensure the same effect as re-requesting the data of the current page. In **append mode** and Behave the same in **non-append mode**.

```typescript
/**
 * Remove data
 * If a list item is passed in, the list item will be removed, and an error will be thrown if the list item is not in the list data
 * @param position index or list item to remove
 */
declare function remove(position: number | LD[number]): void;
```

You can also specify the second parameter of `remove` as a list item, and when the same reference of this list item is found, this list item will be removed.

But in the following two cases, it will re-initiate the request to refresh the data of the corresponding page:

1. The next page is not cached
2. The data that exceeds the next page cache list item is continuously called synchronously, and the cache data is not enough to supplement the current page list.

:::warning Caution

In order to make the data correct, the remove function call will clear all caches.

:::

### Update data items

Use this function when you want to update list items.

```typescript
/**
 * Replace data
 * If the position passed in is a list item, this list item will be replaced, if the list item is not in the list data, an error will be thrown
 * @param item replacement item
 * @param position replacement position (index) or list item
 */
declare function replace(
  item: LD extends any[] ? LD[number] : any,
  position: number | LD[number]
): void;
```

You can also specify the second parameter of `replace` as a list item, which will be replaced when an identical reference to the list item is found.

### Refresh the data of the specified page

When you do not want to update the list items locally after the data operation, but re-request the data on the server side, you can use refresh to refresh the data on any page, without resetting the list data and letting the user start browsing from the first page again.

```typescript
/**
 * Refresh the specified page number data, this function will ignore the cache to force the send request
 * If no page number is passed in, the current page will be refreshed
 * If a list item is passed in, the page where the list item is located will be refreshed
 * @param pageOrItemPage Refreshed page number or list item
 */
declare function refresh(pageOrItemPage?: number | LD[number]): void;
```

In append mode, you can specify the parameter of `refresh` as a list item. When the same reference of this list item is found, the data of the page number where this list item is located will be refreshed.

### Manually update list data

Use the `update` function to update responsive data, which is similar to [useRequest's update](/next/tutorial/client/strategy/use-request), the only difference is that when calling `update` to update `data`, the list data is updated, while non-response data. This is useful when manually clearing list data without reissuing the request.

```typescript
// case list data
update({
  data: []
});
```

### Reset list

It will clear all caches and reload the first page.

```typescript
/**
 * Reload the list from the first page and clear the cache
 */
declare function reload(): void;
```

## API

### Hook configuration

Inherit all configurations of [**useWatcher**](/next/api/core-hooks#usewatcher).

| Name                | Description                                                           | Type                      | Default                    | Version |
| ------------------- | --------------------------------------------------------------------- | ------------------------- | -------------------------- | ------- |
| initialPage         | initial page number                                                   | number                    | 1                          | -       |
| initialPageSize     | Initial number of data items per page                                 | number                    | 10                         | -       |
| watchingStates      | state monitoring trigger request, implemented using useWatcher        | any[]                     | [page, pageSize]           | -       |
| debounce            | The debounce parameter of state monitoring, implemented by useWatcher | number \| number[]        | -                          | -       |
| append              | Whether to enable append mode                                         | boolean                   | false                      | -       |
| data                | Array data specifying pagination                                      | (response: any) => any[]  | response => response.data  | -       |
| total               | specify the total amount of data                                      | (response: any) => number | response => response.total | -       |
| preloadPreviousPage | whether to preload previous page data                                 | boolean                   | true                       | -       |
| preloadNextPage     | whether to preload next page data                                     | boolean                   | true                       | -       |

### Responsive data

Inherit all responsive data from [**useWatcher**](/next/api/core-hooks#usewatcher).

| Name       | Description                                                                                                                                                                                                         | Type    | Version |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| page       | Current page number, determined by initialPage                                                                                                                                                                      | number  | -       |
| pageSize   | The current number of pages, determined by initialPageSize                                                                                                                                                          | number  | -       |
| data       | paging list array data, obtained from data configuration                                                                                                                                                            | any[]   | -       |
| total      | The total amount of data, obtained from total configuration, can be empty                                                                                                                                           | number  | -       |
| pageCount  | The total number of pages, calculated from total and pageSize                                                                                                                                                       | number  | -       |
| isLastPage | Whether the current page is the last page, if pageCount has a value, it will be obtained by comparing pageCount and page, otherwise it will be obtained by whether the length of the list data is less than pagSize | number  | -       |
| fetching   | whether data is being preloaded                                                                                                                                                                                     | boolean | -       |

### Action function

Inherit all action functions of [**useWatcher**](/next/api/core-hooks#usewatcher).

| name    | description                                                                                                                                                                                                                                                                                           | function parameters                                                                                                                                       | return value | version |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| refresh | Refresh the data of the specified page number, this function will ignore the forced sending request of the cache, in the append mode, the list item can be passed in to indicate the page number where the list item is refreshed                                                                     | pageOrItemPage: Refreshed page number or list item                                                                                                        | -            | -       |
| insert  | Insert a piece of data. If no index is passed in, it will be inserted at the front by default. If a list item is passed in, it will be inserted after the list item. If the list item is not in the list data, an error will be thrown                                                                | 1. item: insert item<br/>2. indexOrItem: insert position (index) or list item, default is 0                                                               | -            | -       |
| remove  | Remove a piece of data. When a number is passed in, it means the removed index. When the position is passed in a list item, the list item will be removed. If the list item is not in the list data, an error will be thrown                                                                          | position : remove position (index) or list item                                                                                                           | -            | -       |
| replace | Replace a piece of data. When the second parameter is passed in a number, it means the replacement index. A negative number means counting from the end. When the position passed in is a list item, the list item will be replaced. If the list item is not in the list data An error will be thrown | 1. item: replacement item<br/>2. position: replacement position (index) or list item, when a negative number is passed in, it means counting from the end | -            | -       |
| reload  | Clear the data and re-request the first page of data                                                                                                                                                                                                                                                  | -                                                                                                                                                         | -            | -       |
| update  | Update state data, same as alova's use hook, but update list data when updating data field                                                                                                                                                                                                            | newFrontStates: new state data object                                                                                                                     | -            | -       |

### Event

Inherit all events from [**useWatcher**](/next/api/core-hooks#usewatcher).

| Name            | Description                                    | Callback Parameters                  | Version |
| --------------- | ---------------------------------------------- | ------------------------------------ | ------- |
| onFetchSuccess  | fetch success callback binding function        | event: alova success event object    | -       |
| onFetchError    | callback binding function for fetch failure    | event: alova failure event object    | -       |
| onFetchComplete | callback binding function for fetch completion | event: alova completion event object | -       |
