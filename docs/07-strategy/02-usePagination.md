---
title: Pagination request strategy
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```bash
# npm
npm install @alova/scene-vue --save
#yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
#yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
#yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

:::info
Before using extension hooks, make sure you are familiar with basic usage of alova.
:::

A hook designed for paging scenarios. You can use it in two paging scenarios: pull-down loading and page number flipping. **This hook provides a wealth of features to help your application create better performance and more convenient paging functions **.

## Features

- ✨ Rich and comprehensive paging status;
- ✨ Rich and comprehensive pagination events;
- ✨ Change page, pageSize to automatically get specified paging data;
- ✨Data caching, no need to repeatedly request list data of the same parameters;
- ✨ Front and back pages are preloaded, no waiting for page turning;
- ✨Search condition monitoring automatically reacquires pages;
- ✨ Support adding, editing and deleting list data;
- ✨ Support refreshing the data of the specified page without reset;
- ✨ Request-level search anti-shake, no need to maintain by yourself;

## Example

[Paginated list](/example/paginated-list)

[Load more](/example/load-more)

## import

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
import { usePagination } from '@alova/scene-vue';
```

</TabItem>
<TabItem value="2" label="react">

```javascript
import { usePagination } from '@alova/scene-react';
```

</TabItem>
<TabItem value="3" label="svelte">

```javascript
import { usePagination } from '@alova/scene-svelte';
```

</TabItem>
</Tabs>

## usage

Display and operate the student list, take Vue as an example.

```javascript
import { ref, watchEffect } from 'vue';
import { queryStudents, removeStudent, editStudent } from './api.js';
import { usePagination } from '@alova/hooks/vue';
import { useRequest } from 'alova';

// search condition status
const studentName = ref('');
const clsName = ref('');

const {
  // load state
  loading,

  // list data
  data,

  // Is it the last page
  // When pull-down loading, you can use this parameter to determine whether it needs to be loaded
  isLastPage,

  // The current page number, changing this page number will automatically trigger the request
  page,

  // number of data bars per page
  pageSize,

  // list item removal function
  remove,

  // list item insertion function
  insert,

  // Refresh function, you can specify to refresh a page of data
  refresh,

  // reset function, after calling it will clear the data and reload the first page
  reload
} = usePagination(
  // Method instance get function, it will receive page and pageSize, and return a Method instance
  (page, pageSize) => queryStudents(page, pageSize, studentName.value, clsName.value),
  {
    watchingStates: [studentName, clsName], // The state of external listening, such as search conditions
    initialData: [], // initial data before request,
    debounce: 300 // Debounce parameter, the unit is milliseconds, it can also be set as an array to set the debounce time separately for watchingStates
    // append: true, // Whether to enable append mode, it needs to be set to true when drop-down loading, the default is false
    // preloadPreviousPage: true, // Whether to preload the previous page data, the default is true
    // preloadNextPage: true, // Whether to preload the next page data, the default is true
    // total: data => data['total'], // Specify how to get the total value of the list item, data is the response data, and data.total is obtained by default
    // data: data['data'], // Specify how to get the list data, data is the response data, and data.data is obtained by default
    // initialPage: 1, // initial page number, default is 1
    // initialPageSize: 10, // The initial number of data per page, the default is 10
    // immediate: true // whether to send the request immediately, the default is true
  }
);

// next page
const handleNextPage = () => {
  page.value++;
};

// remove list item with silent commit
const { send: removeSend, onSuccess: onRemoveSuccess } = useRequest(id => removeStudent(id), {
  immediate: false,
  silent: true
});
onRemoveSuccess((_, removeId) => {
  // Pass in the removed index item to remove the specified item
  remove(students.value.findIndex(s => s.id === removeId));
});

// add or edit list item
const detail = ref({
  name: '',
  cls: ''
});
const {
  loading: submitting,
  send: sendStudentEdit,
  onSuccess
} = useRequest(selectedId => editStudent(detail.value.name, detail.value.cls, selectedId), {
  immediate: false,
  silent: true
});
onSuccess((_, selectedId) => {
  if (selectedId) {
    // When editing, refresh the page where the updated list item is located, without resetting the list
    const refreshPage = Math.floor(students.value.findIndex(({ id }) => id === selectedId) / pageSize.value) + 1;
    refresh(refreshPage);
  } else {
    // When adding, reset the list
    reload();
  }
});

// Submit student information callback, selectedId has a value to indicate editing, otherwise it is new
const handleSubmit = selectedId => {
  sendStudentEdit(selectedId);
};
```

:::warning debounce description

The debounce parameter can be set as an array, and the debounce time is set separately for changes in the monitoring state (watchingStates), which is achieved through the request debounce in [**useWatcher**](/request-timing/use-watcher). **At the end of the monitoring state, there are two hidden monitoring states of page and pageSize, which can also be set by debounce. **

:::

## List operation function description

usePagination provides a full-featured list manipulation function, which can achieve the same effect as re-requesting the list without re-requesting the list, which greatly improves the interactive experience of the page. Continue to read the specific function description below!

### Insert list item

You can use it to insert a list item to any position in the list, it will remove the last item after inserting, to ensure the same effect as re-requesting the current page data.

```typescript
/**
 * Insert a piece of data, if no index is passed in, it will be inserted to the front by default
 * @param item Insert item
 * @param index Insertion position (index)
 */
insert: (item: LD[number], index?: number) => void;
```

The following is an example of returning to the first page and inserting a list item in **non-append mode** (page number page turning scene):

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

:::caution note
onBefore, insert operation, onAfter are all executed asynchronously in series, so if the state is changed in `onBefore`, the view will be refreshed and then the insert operation will be performed.
:::
:::caution note
In order for the data to be correct, the insert function call clears the entire cache.
:::

### remove list item

In the case where there is a cache on the next page, it will use the cache of the next page to add to the end of the list item after removing an item to ensure the same effect as re-requesting the current page data. In **append mode** and **Non-append mode** behaves the same.

```typescript
/**
 * remove a piece of data
 * @param index the index to remove
 */
remove: (index: number) => void;
```

But in the following two cases, it will re-initiate the request to refresh the data of the corresponding page:

1. The next page is not cached
2. The data that exceeds the cached list items on the next page is continuously called synchronously, and the cached data is not enough to be added to the current page list.

:::caution note
In order to make the data correct, the remove function call will clear the entire cache.
:::

### update data item

Use this function when you want to update a list item.

```typescript
/**
 * replace a piece of data
 * @param item replacement
 * @param index replacement position (index)
 */
replace: (item: LD[number], index: number) => void;
```

### Refresh the data of the specified page

When you do not want to update the list items locally after the data operation, but re-request data from the server, you can use refresh to refresh the data of any page without resetting the list data and letting the user start browsing from the first page again.

```typescript
/**
 * Refresh the specified page number data, this function will ignore the cache and force the request to be sent
 * @param refreshPage refresh page number
 */
refresh: (refreshPage: number) => void;
```

### reset list

It will clear the entire cache and reload the first page.

```typescript
/**
 * Reload the list from the first page and clear the cache
 */
reload: () => void;
```

## type

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```typescript
interface UsePaginationReturnType<LD extends any[], R> {
  loading: Ref<boolean>;
  error: Ref<Error | undefined>;
  downloading: Ref<Progress>;
  uploading: Ref<Progress>;
  page: Ref<number>;
  pageSize: Ref<number>;
  data: Ref<LD>;
  pageCount: ComputedRef<number | undefined>;
  total: ComputedRef<number | undefined>;
  isLastPage: ComputedRef<boolean>;

  abort: () => void;
  send: (...args: any[]) => Promise<R>;
  onSuccess: (handler: SuccessHandler<R>) => void;
  onError: (handler: ErrorHandler) => void;
  onComplete: (handler: CompleteHandler) => void;

  fetching: Ref<boolean>;
  onFetchSuccess: (handler: SuccessHandler<R>) => void;
  onFetchError: (handler: ErrorHandler) => void;
  onFetchComplete: (handler: CompleteHandler) => void;

  /**
   * Refresh the specified page number data, this function will ignore the cache and force the request to be sent
   * @param refreshPage refresh page number
   */
  refresh: (refreshPage: number) => void;

  /**
   * insert a piece of data
   * onBefore, insert operation, onAfter all need to be executed asynchronously in sequence, because you need to wait for the view to update before executing
   * @param item Insert item
   * @param config insert configuration
   */
  insert: (item: LD[number], config?: InsertConfig) => void;

  /**
   * remove a piece of data
   * @param index the index to remove
   */
  remove: (index: any) => void;

  /**
   * Reload the list from the first page and clear the cache
   */
  reload: () => void;
}

/**
 * vue paging hook based on alova.js
 * Automatic management of paging related status, preloading of previous and previous pages, automatic maintenance of data addition/editing/replacement/removal
 *
 * @param handler method creation function
 * @param config pagination hook configuration
 * @returns {UsePaginationReturnType}
 */
export declare function usePagination<
  S extends Ref,
  E extends Ref,
  R,
  T,
  RC,
  RE,
  RH,
  LD extends any[],
  WS extends WatchSource[]
>(
  handler: (page: number, pageSize: number) => Method<S, E, R, T, RC, RE, RH>,
  config: PaginationConfig<R, LD, WS>
): UsePaginationReturnType<LD, R>;
```

</TabItem>
<TabItem value="2" label="react">

```typescript
type ReactState<S> = [S, Dispatch<SetStateAction<S>>];
interface UsePaginationReturnType<LD extends any[], R> {
  loading: boolean;
  error: Error | undefined;
  downloading: Progress;
  uploading: Progress;
  page: ReactState<number>;
  pageSize: ReactState<number>;
  data: LD;
  pageCount: number | undefined;
  total: number | undefined;
  isLastPage: boolean;

  abort: () => void;
  send: (...args: any[]) => Promise<R>;
  onSuccess: (handler: SuccessHandler<R>) => void;
  onError: (handler: ErrorHandler) => void;
  onComplete: (handler: CompleteHandler) => void;

  fetching: boolean;
  onFetchSuccess: (handler: SuccessHandler<R>) => void;
  onFetchError: (handler: ErrorHandler) => void;
  onFetchComplete: (handler: CompleteHandler) => void;

  /**
   * Refresh the specified page number data, this function will ignore the cache and force the request to be sent
   * @param refreshPage refresh page number
   */
  refresh: (refreshPage: number) => void;

  /**
   * insert a piece of data
   * onBefore, insert operation, onAfter all need to be executed asynchronously in sequence, because you need to wait for the view to update before executing
   * @param item Insert item
   * @param config insert configuration
   */
  insert: (item: LD[number], config?: InsertConfig) => void;

  /**
   * remove a piece of data
   * @param index the index to remove
   */
  remove: (index: any) => void;

  /**
   * Reload the list from the first page and clear the cache
   */
  reload: () => void;
}

/**
 * React paging hook based on alova.js
 * Automatic management of paging related status, preloading of previous and previous pages, automatic maintenance of data addition/editing/removal
 *
 * @param handler method creation function
 * @param config pagination hook configuration
 * @returns {UsePaginationReturnType}
 */
export declare function usePagination<S, E, R, T, RC, RE, RH, LD extends any[], WS extends DependencyList>(
  handler: (page: number, pageSize: number) => Method<S, E, R, T, RC, RE, RH>,
  config: PaginationConfig<R, LD, WS>
): UsePaginationReturnType<LD, R>;
```

</TabItem>
<TabItem value="3" label="svelte">

```typescript
interface UsePaginationReturnType<LD extends any[], R> {
  loading: Writable<boolean>;
  error: Writable<Error | undefined>;
  downloading: Writable<Progress>;
  uploading: Writable<Progress>;
  page: Writable<number>;
  pageSize: Writable<number>;
  data: Writable<LD>;
  pageCount: Readable<number | undefined>;
  total: Readable<number | undefined>;
  isLastPage: Readonly<Readable<boolean>>;

  abort: () => void;
  send: (...args: any[]) => Promise<R>;
  onSuccess: (handler: SuccessHandler<R>) => void;
  onError: (handler: ErrorHandler) => void;
  onComplete: (handler: CompleteHandler) => void;

  fetching: Writable<boolean>;
  onFetchSuccess: (handler: SuccessHandler<R>) => void;
  onFetchError: (handler: ErrorHandler) => void;
  onFetchComplete: (handler: CompleteHandler) => void;

  /**
   * Refresh the specified page number data, this function will ignore the cache and force the request to be sent
   * @param refreshPage refresh page number
   */
  refresh: (refreshPage: number) => void;

  /**
   * insert a piece of data
   * onBefore, insert operation, onAfter all need to be executed asynchronously in sequence, because you need to wait for the view to update before executing
   * @param item Insert item
   * @param config insert configuration
   */
  insert: (item: LD[number], config?: InsertConfig) => void;

  /**
   * remove a piece of data
   * @param index the index to remove
   */
  remove: (index: any) => void;

  /**
   * Reload the list from the first page and clear the cache
   */
  reload: () => void;
}

/**
 * svelte paging hook based on alova.js
 * Automatic management of paging related status, preloading of previous and previous pages, automatic maintenance of data addition/editing/removal
 *
 * @param handler method creation function
 * @param config pagination hook configuration
 * @returns {UsePaginationReturnType}
 */
export declare function usePagination<
  S extends Writable<any>,
  E extends Writable<any>,
  R,
  T,
  RC,
  RE,
  RH,
  LD extends any[],
  WS extends Readable<any>[]
>(
  handler: (page: number, pageSize: number) => Method<S, E, R, T, RC, RE, RH>,
  config: PaginationConfig<R, LD, WS>
): UsePaginationReturnType<LD, R>;
```

</TabItem>
</Tabs>

## limit

1. The list request supports the caching function, which greatly improves the performance of the list. When you operate the list, it will internally maintain the cache generated by it. Currently, it is by modifying the **name** attribute of each Method instance. Tracking is implemented, so the Method instance passed into usePagination does not support custom names for the time being, which may affect your method management. We will also optimize it in subsequent versions.
2. The `insert` function is limited, because the data returned by usePagination is not the data returned by useWatcher, and [Delayed Data Update](../../06-next-step/08-delayed-data-update is currently unavailable. .md) function, if your new list item depends on server-side data, it is recommended to use `refresh` or `reload` to re-request data, and we will support it in subsequent versions.
3. **placeholder Mode** and **Restore Mode** are temporarily disabled.
