---
title: Data fetching
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you have the following needs:

1. Preload the data that will be used in subsequent processes and store it in the cache, so that users no longer have to wait for the data loading process;
2. Conveniently implement cross-page data update (similar to global state), for example, modify an item in the todo list and then re-fetch the latest data, and the interface will be refreshed after the response.

`useFetcher` is the hook used to implement the above scenario. The response data obtained through it cannot be received directly, but the data fetching through it will not only update the cache, but also update the corresponding state, thereby re-rendering the view.

You can use it to pre-fetch data and save it to the cache, or elegantly update the status across components, such as modifying an item in the todo list and then re-fetching the latest data, and the interface will be refreshed after the response.

## Update views across modules/components

Next, we will modify a certain todo data and re-fetch the latest todo list data to update the view. p

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- Render unified fetch state. -->
  <div v-if="fetching">{{ Fetching data in the background... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">Modify todo items</button>
</template>

<script setup>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // Note: The name attribute is set here to filter out the required Method instances when the Method instance cannot be specified directly.
      // See the subsequent "Method Instance Matcher" chapter for details.
      name: 'todoList',
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

  // Trigger data fetch in event
  const handleSubmit = () => {
    // Todo item modification...

    // Start fetching updated data
    // Case 1: When you clearly know to fetch the first page of todoList data, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to fetch the data of the last request of todoList, filter it through the Method instance matcher
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance that needs to be fetched
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
return alovaInstance.Get('/todo/list', {
// Note: The name attribute is set here to filter out the required Method instances when the Method instance cannot be specified directly.
// See the subsequent "Method Instance Matcher" chapter for details.
name: 'todoList',
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

// Trigger data fetch in event
const handleSubmit = () => {
// Assume that the modification of todo items has been completed...

// Start fetching updated data
// Case 1: When you clearly know to fetch the first page of todoList data, pass in a Method instance
fetch(getTodoList(1));

// Situation 2: When you only know to fetch the data of the last request of todoList, filter it through the Method instance matcher
fetch({
name: 'todoList',
filter: (method, index, ary) => {
// Return true to specify the Method instance that needs to be fetched
return index === ary.length - 1;
}
});
};

return (
{/* Render unified fetch status */}
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
      // Note: The name attribute is set here to filter out the required Method instances when the Method instance cannot be specified directly.
      // See the subsequent "Method Instance Matcher" chapter for details.
      name: 'todoList',
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

  // Trigger data fetch in event
  const handleSubmit = () => {
    // Assume that the modification of todo items has been completed...

    // Start fetching updated data
    // Case 1: When you clearly know to fetch the first page of todoList data, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to fetch the data of the last request of todoList, filter it through the Method instance matcher
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance that needs to be fetched
        return index === ary.length - 1;
      }
    });
  };
</script>

<!-- Render unified fetch status -->
{#if $fetching}
<div>{{ Fetching data in the background... }}</div>
{/if}
<!-- ... -->
<button on:click="{handleSubmit}">Modify todo items</button>
```

</TabItem>
<TabItem value="4" label="vue options">

````html
<template>
  <!-- Render unified fetch state. -->
  <div v-if="fetcher.fetching">{{ Fetching data in the background... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">Modify todo items</button>
</template>

<script>
     import { mapAlovaHook } from '@alova/vue-options';
     import { useFetcher } from 'alova';

     const getTodoList = currentPage => {
       return alovaInstance.Get('/todo/list', {
         // Note: The name attribute is set here to filter out the required Method instances when the Method instance cannot be specified directly.
         // See the subsequent "Method Instance Matcher" chapter for details.
         name: 'todoList',
         params: {
           currentPage,
           pageSize: 10
         }
       });
     };

     export default {
       mixins: mapAlovaHook(function () {
         const {
           // The fetching attribute is the same as loading. It is true when sending the fetch request and false after the request is completed.
           fetching,
           error,
           onSuccess,
           onError,
           onComplete,

           // Only after calling fetch will a request be sent to fetch data. You can call fetch repeatedly to fetch data from different interfaces.
           fetch
         } = (fetcherStates = useFetcher());
         return {
           fetcher: fetcherStates
         };
       }),
       methods: {
         // Trigger data fetch in event
         handleSubmit() {
           // Start fetching updated data
           // Case 1: When you clearly know to fetch the first page of todoList data, pass in a Method instance
           this.fetcher$fetch(getTodoList(1));

           // Situation 2: When you only know to fetch the data of the last request of todoList, filter it through the Method instance matcher
           this.fetcher$fetch({
             name: 'todoList',
             filter
  ```r: (method, index, ary) => {
               // Return true to specify the Method instance that needs to be fetched
               return index === ary.length - 1;
             }
           });
         }
       }
     };
</script>
````

</TabItem>
</Tabs>

> For more information on how to use the `Method` instance matcher, see [Method matcher](/tutorial/advanced/method-matcher)

## Preload data

The following implements the preloading function of the next page data in the todo list paging scenario.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- ... -->
</template>

<script setup>
  //method instance creation function
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
  //Realize that there is no need to wait for a request when turning the page to the next page
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
  //Realize that there is no need to wait for a request when turning the page to the next page
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

  //method instance creation function
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
  //Realize that there is no need to wait for a request when turning the page to the next page
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

<!-- views... -->
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <!-- ... -->
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher, useWatcher } from 'alova';

  //method instance creation function
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
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
      // Pre-fetch the data of the next page when the current page request is successful
      //Realize that there is no need to wait for a request when turning the page to the next page
      this.paging$onSuccess(() => {
        this.fetcher$fetch(getTodoList(this.currentPage + 1));
      });
    }
  };
</script>
```

</TabItem>
</Tabs>

:::warning Notes

useFetcher only updates the cache after the request is completed, and if it is found that there is `data` status under the `Method` instance, it will also be updated synchronously to ensure that the page data is consistent. This is `useFetcher` used to update views across modules/components. ensure.

:::

## Force sending request

Same as `useRequest` and `useWatcher`, please read [Force Request](/tutorial/cache/force-request) for more information.

## Bind response callback

In the above example, the fetch function is called to trigger data fetching. The fetch function can also pass in custom parameters starting from the second parameter. These parameters will also be used by the callback functions of `onSuccess/onError/onComplete` and ` force` function is received. For details, please read the **send function parameter passing rules** section in [request manually](/tutorial/getting-started/request-manually).

## Compare the differences between useRequest and useFetcher

1. useFetcher does not return the `data` field, the pre-fetched data will be saved in the cache, and the status data of the corresponding location will be updated;
2. Renamed `loading` to `fetching`;
3. There is no `send` function, but there is a `fetch` function. You can reuse the fetch function to fetch data from different interfaces. At this time, you can use the `fetching` and `error` states to uniformly render the view to achieve unified processing. the goal of;
