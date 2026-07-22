:::info request strategy

use hook

:::

When you have the following needs:

1. Preload data that will be used later and store it in the cache, so users no longer wait for data to load;
2. Easily update data across pages (like global state) — for example, edit an item in the todo list, then re-fetch the latest data and let the view refresh after the response.

`useFetcher` is the hook for these scenarios. The response data it fetches cannot be read directly, but it updates both the cache and the matching state, which re-renders the view.

## Preload data

Let's implement a paging list to automatically preload the next page of data. Before preloading data, please make sure that the Method instance used has enabled caching.

**vue:**

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


---

**react:**

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


---

**svelte:**

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


---

**solid:**

```jsx
import { createSignal } from 'solid-js';
import { useFetcher } from 'alova/client';

// method instance creation function
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
    // loading indicates the status of the fetch request
    loading,
    error,
    onSuccess,
    onError,
    onComplete,

    // A request is only sent after you call `fetch`. You can call `fetch` repeatedly to pull data from different interfaces.
    fetch
  } = useFetcher({
    updateState: false
  });
  const [currentPage, setCurrentPage] = createSignal(1);
  const { data } = useWatcher(() => getTodoList(currentPage()), [currentPage], {
    immediate: true
  }).onSuccess(() => {
    // After the current page is loaded successfully, pass the method instance of the next page to pre-fetch the data of the next page
    fetch(getTodoList(currentPage() + 1));
  });

  return (
    <>
      {loading() ? <div>Fetching...</div> : null}
      {/* List view */}
    </>
  );
};
```


:::warning

The example above sets `updateState` to `false` when calling `useFetcher`. By default, fetching automatically triggers a cross-component state update and re-renders the view. When the preloaded data matches the data currently being requested, set this to `false` to avoid unexpected view updates.

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

`useFetcher` updates the cache only after the request completes, and if that Method instance was previously used by a hook, the `data` state created by that hook is also updated to keep the page data consistent. This is what makes `useFetcher` reliable for updating views across modules or components.

:::

> For more methods of using `Method` instance matcher, see [Method instance matcher](/tutorial/client/in-depth/method-matcher).

## Force sending request

Same as `useRequest` and `useWatcher`, please read [Force Request](/tutorial/cache/force-request) for more information.
