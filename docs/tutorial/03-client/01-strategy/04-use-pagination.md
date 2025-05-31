---
title: Pagination request strategy
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

:::info Strategy type

use hook

:::

> Before using extended hooks, make sure you are familiar with the basic use of alova.

A hook designed for paging scenarios, it can help you automatically manage paging data, preload data, reduce unnecessary data refreshes, **improve fluency by 300%, and reduce coding difficulty by 50%**. You can use it in two paging scenarios: pull-down loading and page number flipping. This hook provides rich features to help your application create better performance and more convenient paging functions.

<!-- ## Example

[Page List](/tutorial/example/vue/paginated-list)

[Pull down to load more](/tutorial/example/vue/load-more) -->

## Features

- Rich and comprehensive paging status;

- Rich and comprehensive paging events;

- Automatically obtain the specified paging data by changing page and pageSize;

- Data cache, no need to repeatedly request list data with the same parameters;

- Preload the previous and next pages, no need to wait for page turning;

- Automatically re-acquire the number of pages by monitoring the search conditions;

- Support adding, editing, and deleting list data;

- Support refreshing the data of the specified page without resetting;

- Request-level search anti-shake, no need for self-maintenance;

## Usage

### Render list data

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div
    v-for="(item, i) in data"
    :key="item.id">
    <span>{{ item.name }}</span>
    <button
      :loading="removing.includes(i)"
      @click="remove(item)">
      Delete
    </button>
  </div>
  <button @click="handlePrevPage">Previous page</button>
  <button @click="handleNextPage">Next page</button>
  <button @click="handleSetPageSize">Set the number of pages per page</button>
  <span>Total {{ pageCount }} pages</span>
  <span>Total {{ total }} data</span>
</template>

<script setup>
  import { queryStudents } from './api.js';
  import { usePagination } from 'alova/client';

  const {
    // Loading status
    loading,

    // List data
    data,

    // Is it the last page
    // This parameter can be used to determine whether loading is required when pulling down to load
    isLastPage,

    // Current page number. Changing this page number will automatically trigger a request
    page,

    // Number of data items per page
    pageSize,

    // Number of pages for paging
    pageCount,

    // Total amount of data
    total,

    // [3.3.0+]
    // action status. This status will be changed only when the corresponding action is triggered. The specific values ​​are as follows:
    // empty string: default status
    // loading: list data request
    // removing: list data deletion
    // inserting: list data insertion
    // replacing: list data replacement
    status,

    // [3.3.0+]
    // Removing list items
    remove,

    // [3.3.0+]
    // The row index array being removed, used to control the delete button status of the corresponding column
    removing,

    // [3.3.0+]
    // Replace list items
    replace,

    // [3.3.0+]
    // Row being replaced index, used to control the replacement button state of the corresponding column
    replacing
  } = usePagination(
    // Method instance acquisition function, which will receive page and pageSize and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // Initial page number, default is 1
      initialPageSize: 10, // Initial number of data per page, default is 10

      // [3.3.0+]
      actions: {
        // When the remove function is called, this action will be triggered and receive the parameters of the remove function
        remove: async row => {
          // fetch remove interface...
        }
      }
    }
  );

  // Turn to the previous page, and the request will be automatically sent after the page value changes
  const handlePrevPage = () => {
    page.value--;
  };

  // Turn to the next page, the request will be automatically sent after the page value is changed
  const handleNextPage = () => {
    page.value++;
  };

  // Change the number of pages per page, the request will be automatically sent after the pageSize value is changed
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
    // Loading status
    loading,

    // List data
    data,

    // Is it the last page
    // This parameter can be used to determine whether it needs to be loaded when pulling down to load
    isLastPage,

    // Current page number, changing this page number will automatically trigger a request
    page,

    // Number of data per page
    pageSize,

    // Number of pages for paging
    pageCount,

    // Total amount of data
    total,

    // [3.3.0+]
    // action status, this status will be changed only when the corresponding action is triggered, the specific values ​​are as follows:
    // empty string: default status
    // loading: list data request
    // removing: list data deletion
    // inserting: list data insertion
    // replacing: list data replacement
    status,

    // [3.3.0+]
    // Remove list items
    remove,

    // [3.3.0+]
    // The row index array being removed, used to control the delete button state of the corresponding column
    removing,

    // [3.3.0+]
    // Replace list items
    replace,

    // [3.3.0+]
    // The row index being replaced, used to control the replace button state of the corresponding column
    replacing,

    // Update status
    update
  } = usePagination(
    // Method instance acquisition function, which will receive page and pageSize and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // Initial page number, default is 1
      initialPageSize: 10, // Initial number of data per page, default is 10

      // [3.3.0+]
      actions: {
        // When the remove function is called, this action will be triggered and receive the parameters of the remove function
        remove: async row => {
          // fetch remove interface...
        }
      }
    }
  );

  // Turn to the previous page, the request will be automatically sent after the page value changes
  const handlePrevPage = () => {
    update({
      page: page - 1
    });
  };

  // Turn to the next page, the request will be automatically sent after the page value changes
  const handleNextPage = () => {
    update({
      page: page + 1
    });
  };

  // Change the number of pages per page, and the request will be automatically sent after the pageSize value changes
  const handleSetPageSize = () => {
    update({
      pageSize: 20
    });
  };

  return (
    <div>
      {data.map((item, i) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button
            loading={removing.includes(i)}
            onClick={() => remove(item)}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={handlePrevPage}>Previous page</button>
      <button onClick={handleNextPage}>Next page</button>
      <button onClick={handleSetPageSize}>Set the number of pages per page</button>
      <span>Total {pageCount} pages</span>
      <span>Total {total} data</span>
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
    // Loading status
    loading,

    // List data
    data,

    // Is it the last page
    // This parameter can be used to determine whether loading is required when pulling down to load
    isLastPage,

    // Current page number. Changing this page number will automatically trigger a request
    page,

    // Number of data items per page
    pageSize,

    // Number of pages for paging
    pageCount,

    // Total amount of data
    total,

    // [3.3.0+]
    // action status. This status will be changed only when the corresponding action is triggered. The specific values ​​are as follows:
    // empty string: default status
    // loading: list data request
    // removing: list data removal
    // inserting: list data insertion
    // replacing: list data replacement
    status,

    // [3.3.0+]
    // Remove list items
    remove,

    // [3.3.0+]
    // The row index array being removed is used to control the delete button status of the corresponding column
    removing,

    // [3.3.0+]
    // Replace list items
    replace,
    // [3.3.0+]
    // The row index being replaced is used to control the replacement button status of the corresponding column
    replacing
  } = usePagination(
    // Method instance acquisition function, which will receive page and pageSize and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // Initial page number, default is 1
      initialPageSize: 10, // Initial number of data per page, default is 10

      // [3.3.0+]
      actions: {
        // When the remove function is called, this action will be triggered and receive the parameters of the remove function
        remove: async row => {
          // fetch remove interface...
        }
      }
    }
  );

  // Go to the previous page, the request will be automatically sent after the page value is changed
  const handlePrevPage = () => {
    $page--;
  };

  // Go to the next page, the request will be automatically sent after the page value is changed
  const handleNextPage = () => {
    $page++;
  };

  // Change the number of pages per page, the request will be automatically sent after the pageSize value is changed
  const handleSetPageSize = () => {
    $pageSize = 20;
  };
</script>

{#each $data as item, i}
<div>
  <span>{item.name}</span>
  <button
    loading="{removing.includes(i)}"
    on:click="() => remove(item)">
    Delete
  </button>
</div>
{/each}
<button on:click="{handlePrevPage}">Previous page</button>
<button on:click="{handleNextPage}">Next page</button>
<button on:click="{handleSetPageSize}">Set the number of pages</button>
<span>Total {pageCount} pages</span>
<span>Total {total} data</span>
```

</TabItem>
<TabItem value="4" label="solid">

```jsx
import { queryStudents } from './api.js';
import { usePagination } from 'alova/client';

const App = () => {
  const {
    // Loading status
    loading,

    // List data
    data,

    // Is it the last page
    // This parameter can be used to determine whether it needs to be loaded when pulling down to load
    isLastPage,

    // Current page number, changing this page number will automatically trigger a request
    page,

    // Number of data per page
    pageSize,

    // Number of pages for paging
    pageCount,

    // Total data
    total,

    // [3.3.0+]
    // action status, this status will be changed only when the corresponding action is triggered, the specific values ​​are as follows:
    // empty string: default status
    // loading: list data request
    // removing: list data removal
    // inserting: list data insertion
    // replacing: list data replacement
    status,

    // [3.3.0+]
    // Remove list items
    remove,

    // [3.3.0+]
    // The row index array being removed, used to control the delete button state of the corresponding column
    removing,

    // [3.3.0+]
    // Replace list items
    replace,

    // [3.3.0+]
    // The row index being replaced, used to control the replace button state of the corresponding column
    replacing,

    // Update status
    update
  } = usePagination(
    // Method instance acquisition function, which will receive page and pageSize and return a Method instance
    (page, pageSize) => queryStudents(page, pageSize),
    {
      // Initial data before request (data format returned by the interface)
      initialData: {
        total: 0,
        data: []
      },
      initialPage: 1, // Initial page number, default is 1
      initialPageSize: 10, // Initial number of data per page, default is 10

      // [3.3.0+]
      actions: {
        // When the remove function is called, this action will be triggered and receive the parameters of the remove function
        remove: async row => {
          // fetch remove interface...
        }
      }
    }
  );

  // Turn to the previous page, the request will be automatically sent after the page value changes
  const handlePrevPage = () => {
    update({
      page: page() - 1
    });
  };

  // Turn to the next page, the request will be automatically sent after the page value is changed
  const handleNextPage = () => {
    update({
      page: page() + 1
    });
  };

  // Change the number of pages per page, and the request will be automatically sent after the pageSize value is changed
  const handleSetPageSize = () => {
    update({
      pageSize: 20
    });
  };

  return (
    <div>
      {data().map((item, i) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button
            loading={removing.includes(i)}
            onClick={() => remove(item)}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={handlePrevPage}>Previous page</button>
      <button onClick={handleNextPage}>Next page</button>
      <button onClick={handleSetPageSize}>Set the number of pages per page</button>
      <span>There are {pageCount()} pages in total</span>
      <span>There are {total()} pieces of data in total</span>
    </div>
  );
};
```

</TabItem>
</Tabs>

### Specify pagination data

Each pagination data interface returns a different data structure, so we need to tell `usePagination` the list data and the total number of items to help us manage the pagination data.

Suppose your pagination interface returns the following data format:

```typescript
interface PaginationData {
  totalNumber: number;
  list: any[];
}
```

At this time, you need to return the list data and the total number of items in the form of a function.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
  // highlight-start
  total: response => response.totalNumber,
  data: response => response.list
  // highlight-end
});
```

If you do not specify the total and data callback functions, they will get the data by default in the following way.

```javascript
const total = response => response.total;
const data = response => response.data;
```

:::warning Note

The data callback function must return a list data, which represents the data set used in paging, and total is mainly used to calculate the current page number. If no number is returned in the total callback function, it will be determined whether the current page is the last page by whether the number of lists requested is less than the pageSize value. This is generally used for pull-down loading.

:::

### Enable append mode

By default, the original list data will be replaced when turning pages, while the append mode is to append the next page of data to the bottom of the current list when turning pages. The common usage scenario is to pull down to load more.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
  // highlight-start
  append: true
  // highlight-end
});
```

### Preload adjacent page data

In order to provide a better experience for paging, the previous and next pages of the current page will be automatically preloaded when the conditions are met, so that the data can be displayed directly when the user turns the page without waiting. This is the default behavior. If you do not want to preload the data of adjacent pages, you can turn it off in the following way.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
  // highlight-start
  preloadPreviousPage: false, // Disable preloading of the previous page data
  preloadNextPage: false // Disable preloading of the next page data
  // highlight-end
});
```

:::warning Preloading trigger conditions

When preloading is enabled, the next page will not be loaded blindly. The following two conditions must be met:

1. Preloading is based on caching. The Method instance used for paging loading must enable caching. By default, get requests will have a 5-minute memory cache. If it is a non-get request or the cache is globally disabled, you also need to set `cacheFor` in this Method instance to enable caching.

2. Determine whether there is data on the next page based on the `total` and `pageSize` parameters.

:::

In addition to the `onSuccess, onError, and onComplete` request events, when preloading is triggered, you can also use `fetching` to get the preloading status, and you can also use `onFetchSuccess, onFetchError, and onFetchComplete` to listen to the preloading request events.

```javascript
const {
  // Preloading status
  fetching,

  // Preloading success event binding function
  onFetchSuccess,

  // Preloading error event binding function
  onFetchError,

  // Preloading completion event binding function
  onFetchComplete
} = usePagination((page, pageSize) => queryStudents(page, pageSize), {
  // ...
});
```

### Listening for filtering conditions

Many times, the list needs to be filtered by conditions. At this time, the `usePagination` status monitoring can be used to trigger a re-request, which is the same as the `useWatcher` provided by alova.

For example, filtering by student name or student grade.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

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

  //Search condition status
  const studentName = ref('');
  const clsName = ref('');
  const {
    // ...
  } = usePagination(
    (page, pageSize) => queryStudents(page, pageSize, studentName.value, clsName.value),
    {
      // ...
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
import { useState } from 'react';

const App = () => {
//Search condition status
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
  import { usePagination } from 'alova/client';
  import { writable } from 'svelte/store';

  //Search condition status
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
<TabItem value="4" label="solid">

```jsx
import { queryStudents } from './api.js';
import { usePagination } from 'alova/client';
import { createSignal } from 'solid-js';

const App = () => {
//Search condition status
const [studentName, setStudentName] = createSignal('');
const [clsName, setClsName] = createSignal('');
const {
// ...
} = usePagination(
(page, pageSize) => queryStudents(page, pageSize, studentName(), clsName()),
{
// ...// highlight-start
watchingStates: [studentName, clsName]
// highlight-end
}
);

return (
// highlight-start
<input value={studentName()} onChange={({ target }) => setStudentName(target.value)} />
<select value={clsName()} onChange={({ target }) => setClsName(target.value)}>
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
</Tabs>

Similar to `useWatcher`, you can also implement request anti-shake by specifying `debounce`. For details, please refer to [useWatcher's debounce parameter setting](/api/core-hooks#usewatcher).

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize, studentName, clsName), {
  // ...
  // highlight-start
  debounce: 300 // Anti-shake parameter, in milliseconds, can also be set as an array to set the anti-shake time for watchingStates
  // highlight-end
});
```

It should be noted that `debounce` is implemented through request anti-shake in [**useWatcher**](/api/core-hooks#usewatcher). **There are two hidden monitoring states, page and pageSize, at the end of the monitoring state, which can also be set through debounce. **

For example, when `watchingStates` sets `[studentName, clsName]`, `[studentName, clsName, page, pageSize]` will be monitored internally, so if you need to set anti-shake for page and pageSize, you can specify `[0, 0, 500, 500]`.

### Turn off initialization request

By default, `usePagination` will initiate a request at initialization, but you can also use `immediate` to turn it off, and then initiate a request through the `send` function, or change `page` or `pageSize`, as well as `watchingStates` and other monitoring states.

```javascript
usePagination((page, pageSize) => queryStudents(page, pageSize, studentName, clsName), {
  // ...
  // highlight-start
  immediate: false
  // highlight-end
});
```

## List operation function

usePagination provides a full-featured list operation function, which can achieve the same effect as re-requesting the list without re-requesting the list, greatly improving the interactive experience of the page, and can also trigger the corresponding action to request data and display the operation status.

### Insert list item

You can use it to insert a list item to any position in the list, and it will remove the last item after insertion to ensure the same effect as re-requesting the current page data.

```typescript
/**
* Insert a piece of data
* If index is not passed, it will be inserted at the front by default
* If a list item is passed, it will be inserted after this list item. If the list item is not in the list data, an error will be thrown
* @param item Insert item
* @param indexOrItem Insert position (index)
*/
declare async function insert(item: LD[number], indexOrItem?: number | LD[number]): void;
```

The following is an example of returning to the first page and inserting a list item in **non-append mode** (page number flipping scenario):

```javascript
page.value = 1;
nextTick(() => {
  insert(newItem, 0);
});
```

The following is an example of scrolling to the top after inserting a list item in **append mode** (pull-down loading scenario):

```javascript
await insert(newItem, 0);
nextTick(() => {
  window.scrollTo(0, {});
});
```

You can also specify the second parameter of `insert` as a list item. When the same reference of this list item is found, the inserted item will be inserted after this list item.

```javascript
await insert(newItem, afterItem);
```

:::warning Note

In order to make the data correct, the insert function call will clear all caches.

:::

**insert action**

You can also specify the insert callback in actions, which is used to send the insert request, which will be triggered before inserting data.

```javascript
usePagination({
  // ...
  actions: {
    // highlight-start
    // row parameter passed from insert function
    insert: async row => {
      await insertListItem(row);
    }
    // highlight-end
  }
});
```

### Remove list items

If the next page has cache, it will use the cache of the next page to add to the end of the list item after removing an item to ensure the same effect as re-requesting the current page data. It behaves the same in **append mode** and **non-append mode**.

```typescript
/**
* Remove a piece of data
* If a list item is passed in, it will be removed. If the list item is not in the list data, an error will be thrown
* @param position The index or list item to be removed
*/
declare async function remove(...positions: Array<number | LD[number]>): void;
```

You can also specify the parameter of `remove` as a list item. When the same reference of this list item is found, this list item will be removed.

But in the following two cases, it will re-initiate a request to refresh the data of the corresponding page:

1. The next page is not cached

2. The data of the cache list items exceeding the next page is called synchronously and continuously, and the cached data is not enough to supplement the current page list.

:::warning Note

In order to make the data correct, the remove function call will clear all caches.

:::

**remove action**

You can also specify the remove callback in actions, which is used to send a removal request, which will be triggered before removing the data.

```javascript
usePagination({
  // ...
  actions: {
    // highlight-start
    // The row parameter is passed from the remove function. If the remove function passes multiple removal items, this callback will be called multiple times
    remove: async row => {
      await insertListItem(row);
    }
    // highlight-end
  }
});
```

### Update data items

When you want to update list items, use this function.

```typescript
/**
* Replace a piece of data
* When position is passed a number, it means replacing the index. A negative number means counting from the end. When position is passed a list item, it will replace this list item. If the list item is not in the list data, an error will be thrown
* @param item replacement item
* @param position replacement position (index) or list item
*/
declare async function replace(
item: LD extends any[] ? LD[number] : any,
position: number | LD[number]
): void;
```

You can also specify the second parameter of `replace` as a list item. When the same reference of this list item is found, this list item will be replaced.

**replace action**

You can also specify the replace callback in actions, which is used to send a replacement request. It will be triggered before replacing the data.

```javascript
usePagination({
  // ...
  actions: {
    // highlight-start
    // row parameter passed from replace function
    replace: async row => {
      await replaceListItem(row);
    }
    // highlight-end
  }
});
```

### Refresh the data of the specified page

When you do not want to update the list items locally after data operation, but re-request the data from the server, you can use refresh to refresh the data of any page without resetting the list data and letting the user start browsing from the first page again.

```typescript
/**
 * Refresh the specified page number data, this function will ignore the cache and force the request to be sent
 * If the page number is not passed in, the current page will be refreshed
 * If a list item is passed in, the page where the list item is located will be refreshed
 * @param pageOrItemPage refreshed page number or list item
 * @returns [v3.1.0+] promise containing response data
 */
declare function refresh(pageOrItemPage?: number | LD[number]): Promise<AG['Responded']>;
```

In append mode, you can specify the parameter of `refresh` as a list item. When the same reference of this list item is found, the data of the page number of this list item will be refreshed.

### Manually update list data

Use the `update` function to update responsive data, which is similar to [useRequest's update](/tutorial/client/strategy/use-request). The only difference is that when calling `update` to update `data`, the list data is updated instead of the response data. This is useful when manually clearing the list data without re-initiating a request.

```typescript
// Situation list data
update({
  data: []
});
```

### Reset the list

It will clear all caches and reload the first page.

```typescript
/**
 * Reload the list from the first page and clear the cache
 * @returns [v3.1.0+]promise instance, indicating whether the reset is successful
 */
declare function reload(): Promise<void>;
```

## Compatible with `updateState`

You can also use `updateState` to update the responsive data exported by `usePagination`.

```javascript
updateState(listMethod, {
  // Update the exported list data, that is, data.
  data: oldList => [...oldList, ...newList],
  // Update the exported total data
  total: oldTotal => oldTotal + newList.length,
  // Update exported page data
  page: oldPage => oldPage + 1,
  // Update exported pageSize data
  pageSize: oldPageSize => oldPageSize + 10
});
```

[Click here to view](/tutorial/client/in-depth/update-across-components)Detailed usage of `updateState`.

Since the `data` type of `usePagination` is not directly inferred from method, the type needs to be manually specified in `updateState`.

```ts
updateState<Item[]>(listMethod, {
  data: oldList => [...oldList, ...newList]
});
```

## API

### Hook configuration

Inherits all configurations of [**useWatcher**](/api/core-hooks#usewatcher).

| Name                | Description                                                              | Type                                  | Default                    | Version |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------- | -------------------------- | ------- |
| initialPage         | Initial page number                                                      | number                                | 1                          | -       |
| initialPageSize     | Initial number of data per page                                          | number                                | 10                         | -       |
| watchingStates      | State monitoring trigger request, implemented using useWatcher           | any[]                                 | [page, pageSize]           | -       |
| debounce            | Debounce parameter for state monitoring, implemented using useWatcher    | number \| number[]                    | -                          | -       |
| append              | Whether to enable append mode                                            | boolean                               | false                      | -       |
| data                | Array data for specifying paging                                         | (response: any) => any[]              | response => response.data  | -       |
| total               | Specified total number of data                                           | (response: any) => number             | response => response.total | -       |
| preloadPreviousPage | Whether to preload the previous page of data                             | boolean                               | true                       | -       |
| preloadNextPage     | Whether to preload the next page of data                                 | boolean                               | true                       | -       |
| actions             | Operation function callback, used to request the corresponding interface | [PaginationAction](#paginationaction) | -                          | 3.3.0   |

#### PaginationAction

| Name    | Description                                                                          | Type                                                       | Default value | Version |
| ------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ------------- | ------- |
| insert  | insert callback function, triggered when the operation function `insert` is called   | (item: Row, position: number) => Promise\<void\>           | -             | 3.3.0   |
| remove  | remove callback function, triggered when the operation function `remove` is called   | (item: number \| Row) => Promise\<void\>                   | -             | 3.3.0   |
| replace | replace callback function, triggered when the operation function `replace` is called | (item: number \| Row, position: number) => Promise\<void\> | -             | 3.3.0   |

### Responsive data

Inherits all responsive data from [**useWatcher**](/api/core-hooks#usewatcher).

| Name       | Description                                                                                                                                                                                                                                                                                                                                          | Type     | Version |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| page       | Current page number, determined by initialPage                                                                                                                                                                                                                                                                                                       | number   | -       |
| pageSize   | Current number of pages per page, determined by initialPageSize                                                                                                                                                                                                                                                                                      | number   | -       |
| data       | Paginated list array data, configured by data                                                                                                                                                                                                                                                                                                        | any[]    | -       |
| total      | Total number of data, configured by total, can be empty                                                                                                                                                                                                                                                                                              | number   | -       |
| pageCount  | Total number of pages, calculated by total and pageSize                                                                                                                                                                                                                                                                                              | number   | -       |
| isLastPage | Whether the current page is the last page, when pageCount has a value, it will be compared with pageCount, otherwise it will be determined by whether the length of the list data is less than pagSize                                                                                                                                               | number   | -       |
| fetching   | Whether data is being preloaded                                                                                                                                                                                                                                                                                                                      | boolean  | -       |
| status     | action status. This status will be changed only when the corresponding action is triggered. The specific values ​​are as follows: <br/>empty string: default status; <br/>loading: list data is being requested; <br/>removing: list data is being deleted; <br/>inserting: list data is being inserted; <br/>replacing: list data is being replaced | string   | 3.3.0   |
| removing   | The row index array being removed, used to control the delete button status of the corresponding column                                                                                                                                                                                                                                              | number[] | 3.3.0   |
| replacing  | The row index being replaced, used to control the replacement button status of the corresponding column                                                                                                                                                                                                                                              | number   | 3.3.0   |

### Operation function

Inherits all operation functions of [**useWatcher**](/api/core-hooks#usewatcher).

| Name    | Description                                                                                                                                                                                                                                                                                            | Function Parameters                                                                                                                                        | Return Value                 | Version |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| refresh | Refresh the specified page number data. This function will ignore the cache and force the request to be sent. In append mode, a list item can be passed in to indicate the page number where the list item is located.                                                                                 | pageOrItemPage: refreshed page number or list item                                                                                                         | Promise\<AG\['Responded'\]\> | v3.1.0+ |
| insert  | Insert a piece of data. If index is not passed in, it will be inserted at the front by default. If a list item is passed in, it will be inserted after this list item. If the list item is not in the list data, an error will be thrown                                                               | 1. item: insert item<br/>2. indexOrItem: insert position (index) or list item, default is 0                                                                | -                            | -       |
| remove  | Remove a piece of data. When a number is passed in, it indicates the index to be removed. When position If a list item is passed in, it will be removed. If the list item is not in the list data, an error will be thrown.                                                                            | position: Remove position (index) or list item. Multiple items can be passed in for batch deletion.                                                        | -                            | -       |
| replace | Replace a piece of data. When a number is passed in as the second parameter, it means replacing the index. A negative number means counting from the end. When position is passed in as a list item, it will replace the list item. If the list item is not in the list data, an error will be thrown. | 1. item: Replacement item<br/>2. position: Replacement position (index) or list item. When a negative number is passed in, it means counting from the end. | -                            | -       |
| reload  | Clear data and re-request the first page of data                                                                                                                                                                                                                                                       | -                                                                                                                                                          | Promise\<void\>              | v3.1.0+ |
| update  | Update status data. It is the same as the use hook of alova, but when updating the data field, it updates the list data.                                                                                                                                                                               | newFrontStates: New status data object                                                                                                                     | -                            | -       |

### Events

Inherits all events of [**useWatcher**](/api/core-hooks#usewatcher).

| Name            | Description                                    | Callback parameters                  | Version |
| --------------- | ---------------------------------------------- | ------------------------------------ | ------- |
| onFetchSuccess  | Callback binding function for successful fetch | event: alova successful event object | -       |
| onFetchError    | Callback binding function for failed fetch     | event: alova failed event object     | -       |
| onFetchComplete | Callback binding function for completed fetch  | event: alova completed event object  | -       |
