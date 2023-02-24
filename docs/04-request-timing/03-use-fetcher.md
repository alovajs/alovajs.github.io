---
title: Data Pull
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you have the following needs:

1. Preload the data that will be used in the subsequent process and store it in the cache, so that users no longer wait for the data loading process;
2. It is convenient to update data across pages (similar to the global state), for example, after modifying an item in the todo list and re-pulling the latest data, the interface will be refreshed after the response.

`useFetcher` is the hook used to implement the above scenarios. The response data obtained through it cannot be received directly, but the data pulled through it will not only update the cache, but also update the corresponding state, thereby re-rendering the view.

You can use it to pre-fetch data and save it in the cache, or gracefully update the state across components, such as modifying an item in the todo list and re-pulling the latest data, and the interface will be refreshed after the response

## Update views across modules/components

Next, let's modify a certain todo data, and re-pull the latest todo list data to update the view.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <!-- Render the unified pull state. -->
  <div v-if="fetching">{{ Fetching data in background... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">Modify todo items</button>
</template>

<script setup>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // Note: The name attribute is set here to filter out the required Method instance when the Method instance cannot be specified directly
      // For details, see the subsequent "Method Instance Matcher" chapter
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // The fetching attribute is the same as loading, it is true when a pull request is sent, and it is false after the request ends
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // After calling fetch, a request to pull data will be sent, and fetch can be called repeatedly to pull data from different interfaces
    fetch
  } = useFetcher();

  // Trigger the data pull in the event
  const handleSubmit = () => {
    // todo item modification...

    // Start to pull the updated data
    // Situation 1: When you clearly know that the data on the first page of todoList is pulled, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to pull the last requested data of todoList, use the Method instance matcher to filter
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance that needs to be pulled
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
return alovaInstance. Get('/todo/list', {
// Note: The name attribute is set here to filter out the required Method instance when the Method instance cannot be specified directly
// For details, see the subsequent "Method Instance Matcher" chapter
name: 'todoList',
params: {
currentPage,
pageSize: 10
}
});
};

const App = () => {
const {
// The fetching attribute is the same as loading, it is true when a pull request is sent, and it is false after the request ends
fetching,
error,
onSuccess,
onError,
onComplete,

// After calling fetch, a request to pull data will be sent, and fetch can be called repeatedly to pull data from different interfaces
fetch
} = useFetcher();

// Trigger the data pull in the event
const handleSubmit = () => {
// Assume the modification of the todo item has been completed...

// Start to pull the updated data
// Situation 1: When you clearly know that the data on the first page of todoList is pulled, pass in a Method instance
fetch(getTodoList(1));

// Situation 2: When you only know to pull the last requested data of todoList, use the Method instance matcher to filter
fetch({
name: 'todoList',
filter: (method, index, ary) => {
// Return true to specify the Method instance that needs to be pulled
return index === ary. length - 1;
}
});
};

return (
{/* Render the unified pull state */}
{ fetching ? <div>{{ Fetching data in the background... }}</div> : null }
{/* ... */}
<button onClick={handleSubmit}>Modify todo items</button>
);
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // Note: The name attribute is set here to filter out the required Method instance when the Method instance cannot be specified directly
      // For details, see the subsequent "Method Instance Matcher" chapter
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // The fetching attribute is the same as loading, it is true when a pull request is sent, and it is false after the request ends
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // After calling fetch, a request to pull data will be sent, and fetch can be called repeatedly to pull data from different interfaces
    fetch
  } = useFetcher();

  // Trigger the data pull in the event
  const handleSubmit = () => {
    // Assume the modification of the todo item has been completed...

    // Start to pull the updated data
    // Situation 1: When you clearly know that the data on the first page of todoList is pulled, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to pull the last requested data of todoList, use the Method instance matcher to filter
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance that needs to be pulled
        return index === ary.length - 1;
      }
    });
  };
</script>

<!-- Render a unified pull state -->
{#if $fetching}
<div>{{ Pulling data in background... }}</div>
{/if}
<!-- ... -->
<button on:click="{handleSubmit}">Modify todo items</button>
```

</TabItem>
</Tabs>

> See [Method instance matcher](../next-step/method-instance-matcher) for more usage methods of `Method` instance matcher

## preload data

The following implements the preloading function of the next page of data in the paging scenario of the todo list.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <!-- ... -->
</template>

<script setup>
  // method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
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
  // Realize that there is no need to wait for the request when turning the page to the next page
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
  return alovaInstance.Get('/todo/list', {
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
  // Realize that there is no need to wait for the request when turning the page to the next page
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
    return alovaInstance.Get('/todo/list', {
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
  // Realize that there is no need to wait for the request when turning the page to the next page
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

<!-- views... -->
```

</TabItem>
</Tabs>

:::caution Notes

After the useFetcher request is completed, only the cache is updated, and if it is found that there is still a `data` state under the `Method` instance, it will also be updated synchronously, so as to ensure that the page data is consistent. This is `useFetcher` used to update views across modules/components ensure.

:::

## Force send request

Same as `useRequest` and `useWatcher`, you can specify `force` parameter in `useFetcher` to set whether to send the request.

### Set static value

force is false by default. When set to true, the cache will be penetrated every time and a request will be sent

```javascript
useFetcher({ force: true });
```

### Dynamically set the force value

In actual situations, we often need to set whether to force the request to be sent according to different situations. In this case, force can be set as a function.

```javascript
useFetcher({
  force: () => {
    return true;
  }
});
```

## Compare with useRequest and useWatcher

1. useFetcher does not return the `data` field, the pre-fetched data will be saved in the cache, and the status data of the corresponding location will be updated;
2. Rename `loading` to `fetching`;
3. There is no `send` function, but there is a `fetch` function, which can be reused to pull data from different interfaces. At this time, you can use the `fetching` and `error` states to render views uniformly, so as to achieve unified processing the goal of;
