---
title: Fetch Data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info request strategy

use hook

:::

When you have the following needs:

1. Preload the data that will be used in subsequent processes and store it in the cache, so that users no longer have to wait for the data loading process;
2. Conveniently implement cross-page data update (similar to global state), for example, modify an item in the todo list and then re-fetch the latest data, and the interface will be refreshed after the response.

`useFetcher` is the hook used to implement the above scenario. The response data obtained through it cannot be received directly, but the data fetched through it will not only update the cache, but also update the corresponding state, thereby re-rendering the view.

## Preload data

Let's implement a paging list to automatically preload the next page of data. Before preloading data, please make sure that the Method instance used has enabled caching.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <div v-if="loading">Fetching...</div>
  <!-- List view -->
</template>

<script setup>
  import { useFetcher } from 'alova/client';

  //method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      cacheFor: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // the loading is the status of data fetching
    loading,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
    fetch
  } = useFetcher({
    updateState: false
  });

  const currentPage = ref(1);
  const { data } = useWatcher(() => getTodoList(currentPage.value), [currentPage], {
    immediate: true
  }).onSuccess(() => {
    // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
    fetch(getTodoList(currentPage.value + 1));
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';
import { useFetcher } from 'alova/client';

//method instance creation function
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    cacheFor: 60000,
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const {
    // the loading is the status of data fetching
    loading,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
    fetch
  } = useFetcher({
    updateState: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage), [currentPage], {
    immediate: true
  }).onSuccess(() => {
    // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
    fetch(getTodoList(currentPage + 1));
  });

  return (
    <>
      {loading ? <div>Fetching...</div> : null}
      {/* list view */}
    </>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';
  import { useFetcher } from 'alova/client';

  //method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      cacheFor: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // the loading is the status of data fetching
    loading,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
    fetch
  } = useFetcher({
    updateState: false
  });
  const currentPage = writable(1);
  const { data, onSuccess } = useWatcher(() => getTodoList($currentPage), [currentPage], {
    immediate: true
  }).onSuccess(() => {
    // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
    fetch(getTodoList($currentPage + 1));
  });
</script>

{#if loading}
<div>Fetching...</div>
{/if}
<!-- List view -->
```

</TabItem>
</Tabs>

:::warning

The above example is set `updateState` to false when calling `useFetcher`. This is because the data fetching will automatically trigger a states cross-component updating by default, causing the view to be re-rendered. When preload data is the same as the currently requested data. You can set it to false to avoid affecting view errors.

:::

## Update views across modules/components

Next, we will modify a todo data and re-fetch the latest todo list data to update the view. We may not know which page the todo list is currently on. In this case, when using the `fetch` function, we can use [Method snapshots matcher](/tutorial/client/in-depth/method-matcher) to dynamically fetch the data of the current page.

> The Method snapshots matcher is used to find method instances that meet the conditions among the requested method instances.

First, set a name for the method instance in the todo list, which is used to filter out the required Method instance when the Method instance cannot be specified directly.

```javascript title="api/todoList.js"
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    name: 'todoList',
    // highlight-end
    params: {
      currentPage,
      pageSize: 10
    }
  });
};
```

Then in the `EditTodo` component, use the `fetch` function to dynamically find the last name of `todoList` in the requested Method instance to fetch data.

```javascript title="EditTodo Component"
const { fetch } = useFetcher();

// Trigger data fetch in event
const handleSubmit = () => {
   // submit data...
   // highlight-start
  const lastMethod = alovaInstance.snapshots.match({
    name: 'todoList',
    filter: (method, index, ary) => {
      // Return true to specify the Method instance that needs to be fetched
      return index === ary.length - 1;
    }
  }, true);
  if (lastMethod) {
    await fetch(lastMethod);
  }
  // highlight-end
};
```

:::warning Notes

useFetcher only updates the cache after the request is completed, and if this Method is foundIf the instance has been requested using useHook before, the `data` state created by this useHook will also be updated to ensure that the page data is consistent. This is the guarantee that `useFetcher` is used to update views across modules/components.

:::

> For more methods of using `Method` instance matcher, see [Method instance matcher](/tutorial/client/in-depth/method-matcher).

## Force sending request

Same as `useRequest` and `useWatcher`, please read [Force Request](/tutorial/cache/force-request) for more information.
