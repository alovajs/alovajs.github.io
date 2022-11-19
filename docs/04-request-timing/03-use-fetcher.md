---
title: fetch data
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you have the following needs:

1. Preload the data that will be used in the subsequent process and store it in the cache, so that users no longer wait for the process of data loading;
2. It is convenient to update data across pages (similar to the global state). For example, after modifying an item in the todo list, re-pull the latest data, and the interface will be refreshed after the response.

`useFetcher` is a hook used to implement the above scenarios. The response data obtained through it cannot be directly received, but the data pulled through it will update the corresponding state in addition to updating the cache, thereby re-rendering the view.

You can use it to pre-fetch data and save it to the cache, or gracefully update state across components, such as modifying an item in the todo list and re-pulling the latest data, and the interface will be refreshed after the response

Compared with `useRequest` and `useWatcher`, `useFetcher` does not return `data` field, `loading` is renamed `fetching`, and there is no `send` function, but there is a `fetch` function, which can be reused The fetch function pulls data from different interfaces. At this time, you can use the `fetching` and `error` states to render the view uniformly, so as to achieve the purpose of unified processing.

## Update views across modules/components

Next, let's modify a todo data, and re-pull the latest todo list data to update the view.

<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <!-- Render a unified pull state. -->
  <div v-if="fetching">{{ Fetching data in the background... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">Modify todo item</button>
</template>

<script setup>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/tood/list', {
      // Note: The name attribute is set here to filter out the required Method instance when the Method instance cannot be specified directly
      // See the subsequent "Method instance matcher" chapter for details
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // The fetching attribute is the same as loading, true when a pull request is sent, and false after the request is complete
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will the request to pull data be sent. You can repeatedly call fetch multiple times to pull data from different interfaces.
    fetch
  } = useFetcher();

  // Trigger data pull in event
  const handleSubmit = () => {
    // todo item modification...

    // Start pulling the updated data
    // Case 1: When you clearly know to pull the first page of todoList data, pass in a Method instance
    fetch(getTodoList(1));

    // Case 2: When you only know to pull the data of the last request of the todoList, filter by the Method instance matcher
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance to be pulled
        return index === ary.length - 1;
      }
    });
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const getTodoList = currentPage => {
return alovaInstance.Get('/tood/list', {
// Note: The name attribute is set here to filter out the required Method instance when the Method instance cannot be specified directly
// See the subsequent "Method instance matcher" chapter for details
name: 'todoList',
params: {
currentPage,
pageSize: 10
}
});
};

const App = () => {
const {
// The fetching attribute is the same as loading, true when a pull request is sent, and false after the request is complete
fetching,
error,
onSuccess,
onError,
onComplete,

// Only after calling fetch will the request to pull data be sent. You can repeatedly call fetch multiple times to pull data from different interfaces.
fetch
} = useFetcher();

// Trigger data pull in event
const handleSubmit = () => {
// Assuming you have finished modifying the todo item...

// Start pulling the updated data
// Case 1: When you clearly know to pull the first page of todoList data, pass in a Method instance
fetch(getTodoList(1));

// Case 2: When you only know to pull the data of the last request of the todoList, filter by the Method instance matcher
fetch({
name: 'todoList',
filter: (method, index, ary) => {
// Return true to specify the Method instance to be pulled
return index === ary.length - 1;
}
});
};

return (
{/* Render unified pull state */}
{ fetching ? <div>{{ Fetching data in the background... }}</div> : null }
{/* ... */}
<button onClick={handleSubmit}>Modify todo item</button>
);
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/tood/list', {
      // Note: The name attribute is set here to filter out the required Method instance when the Method instance cannot be specified directly
      // See the subsequent "Method instance matcher" chapter for details
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // The fetching attribute is the same as loading, true when a pull request is sent, and false after the request is complete
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will the request to pull data be sent. You can repeatedly call fetch multiple times to pull data from different interfaces.
    fetch
  } = useFetcher();

  // Trigger data pull in event
  const handleSubmit = () => {
    // Assuming you have finished modifying the todo item...

    // Start pulling the updated data
    // Case 1: When you clearly know to pull the first page of todoList data, pass in a Method instance
    fetch(getTodoList(1));

    // Case 2: When you only know to pull the data of the last request of the todoList, filter by the Method instance matcher
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance to be pulled
        return index === ary.length - 1;
      }
    });
  };
</script>

<!-- Render unified pull state -->
{#if $fetching}
<div>{{ Pulling data in the background... }}</div>
{/if}
<!-- ... -->
<button on:click="{handleSubmit}">Modify todo item</button>
```

</TabItem>
</Tabs>

> For more usage of `Method` instance matcher, see [Method instance matcher](../next-step/method-instance-matcher)

## preload data

The following implements the preloading function of the next page data in the todo list paging scenario.

<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <!-- ... -->
</template>

<script setup>
  // method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/tood/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const { fetch } = useFetcher();

  const currentPage = ref(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage.value), [currentPage], {
    immediate: true
  });

  // Pre-fetch the data of the next page when the current page request is successful
  // Realize that there is no need to wait for the request when turning to the next page
  onSuccess(() => {
    fetch(getTodoList(currentPage.value + 1));
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';

// method instance creation function
const getTodoList = currentPage => {
  return alovaInstance.Get('/tood/list', {
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const { fetch } = useFetcher();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage), [currentPage], {
    immediate: true
  });

  // Pre-fetch the data of the next page when the current page request is successful
  // Realize that there is no need to wait for the request when turning to the next page
  onSuccess(() => {
    fetch(getTodoList(currentPage + 1));
  });

  return {
    /* ... */
  };
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';

  // method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/tood/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const { fetch } = useFetcher();
  const currentPage = writable(1);
  const { data, onSuccess } = useWatcher(() => getTodoList($currentPage), [currentPage], {
    immediate: true
  });

  // Pre-fetch the data of the next page when the current page request is successful
  // Realize that there is no need to wait for the request when turning to the next page
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

<!-- views... -->
```

</TabItem>
</Tabs>

:::caution Notes

1. After the `useFetcher` request is completed, only the cache is updated, and if it is found that there is a `data` state under the `Method` instance, it will also be updated synchronously to ensure consistent page data. This is `useFetcher` for cross-module/ The component's guarantee that the view is updated.

2. It ignores the cache to force the request by default, and you can also close it in the following ways.

```javascript
useFetcher({
  force: false
});
```

:::

For more information about forcing a request to be sent, see [Advanced-Force Sending Request](#Force Sending Request)
