---
title: Fetch Data
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you have the following needs:

1. Preload the data that will be used in subsequent processes and store it in the cache, so that users no longer have to wait for the data loading process;
2. Conveniently implement cross-page data update (similar to global state), for example, modify an item in the todo list and then re-fetch the latest data, and the interface will be refreshed after the response.

`useFetcher` is the hook used to implement the above scenario. The response data obtained through it cannot be received directly, but the data fetched through it will not only update the cache, but also update the corresponding state, thereby re-rendering the view.

## Preload data

Let's implement a paging list to automatically preload the next page of data. Before preloading data, please make sure that the Method instance used has enabled caching.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <div v-if="fetching">Fetching...</div>
  <!-- List view -->
</template>

<script setup>
  //method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      localCache: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // The fetching attribute is the same as loading. It is true when sending the fetch request and false after the request is completed.
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
    fetch
  } = useFetcher();

  const currentPage = ref(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage.value), [currentPage], {
    immediate: true
  });

  // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
  onSuccess(() => {
    fetch(getTodoList(currentPage.value + 1));
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';

//method instance creation function
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    localCache: 60000,
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const {
    // The fetching attribute is the same as loading. It is true when sending the fetch request and false after the request is completed.
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
    fetch
  } = useFetcher();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage), [currentPage], {
    immediate: true
  });

  // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
  onSuccess(() => {
    fetch(getTodoList(currentPage + 1));
  });

  return (
    <>
      {fetching ? <div>Fetching...</div> : null}
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

  //method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      localCache: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // The fetching attribute is the same as loading. It is true when sending the fetch request and false after the request is completed.
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
    fetch
  } = useFetcher();
  const currentPage = writable(1);
  const { data, onSuccess } = useWatcher(() => getTodoList($currentPage), [currentPage], {
    immediate: true
  });

  // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

{#if fetching}
<div>Fetching...</div>
{/if}
<!-- List view -->
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <div>
    <div v-if="fetching">Fetching...</div>
    <!-- List view -->
  </div>
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher, useWatcher } from 'alova';

  //method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      localCache: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function () {
      return {
        fetcher: useFetcher(),
        paging: useWatcher(() => getTodoList(this.currentPage), ['currentPage'], {
          immediate: true
        })
      };
    }),
    data() {
      return {
        currentPage: 1
      };
    },
    mounted() {
      // After the current page is loaded successfully, pass in the method instance of the next page to pre-fetch the data of the next page.
      this.paging$onSuccess(() => {
        this.fetcher$fetch(getTodoList(this.currentPage + 1));
      });
    }
  };
</script>
```

</TabItem>
</Tabs>

## Update views across modules/components

Next, we will modify a todo data and re-fetch the latest todo list data to update the view. We may not know which page the todo list is currently on. In this case, when using the `fetch` function, we can use [Method instance matcher](/tutorial/advanced/method-matcher) to dynamically fetch the data of the current page.

> The Method instance matcher is used to find method instances that meet the conditions among the requested method instances.

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
   await fetch({
     name: 'todoList',
     filter: (method, index, ary) => {
       // Return true to specify the Method instance that needs to be fetched
       return index === ary.length - 1;
     }
   });
};
```

:::warning Notes

useFetcher only updates the cache after the request is completed, and if this Method is foundIf the instance has been requested using useHook before, the `data` state created by this useHook will also be updated to ensure that the page data is consistent. This is the guarantee that `useFetcher` is used to update views across modules/components.

:::

> For more methods of using `Method` instance matcher, see [Method instance matcher](/tutorial/advanced/method-matcher).

## Force sending request

Same as `useRequest` and `useWatcher`, please read [Force Request](/tutorial/cache/force-request) for more information.

## Bind response callback

useFetcher also supports binding `onSuccess/onError/onComplete` callback functions.

```javascript
const { onSuccess, onError, onComplete } = useFetcher();
```

Please read [Response Processing](/tutorial/combine-framework/response) for details.

## send function parameter passing rules

Different from `useRequest` and `useWatcher`, the custom parameters of the fetch function start from the second parameter, and they will also be received by the event callback and `force` function respectively.

```javascript
const { onSuccess, fetch } = useFetcher();
onSuccess(({ sendArgs }) => {
  //The value of sendArgs is ['test arg']
});

fetch(getTodoList(), 'test arg');
```

For details, please read [send function parameter passing rules](/tutorial/combine-framework/receive-params).

## Comparison between useRequest and useFetcher

1. useFetcher does not return the `data` field, the pre-fetched data will be saved in the cache, and the status data of the corresponding location will be updated;
2. Renamed `loading` to `fetching`;
3. There is no `send` function, but there is a `fetch` function. You can reuse the fetch function to fetch data from different interfaces. At this time, you can use the `fetching` and `error` states to uniformly render the view to achieve unified processing. the goal of;
