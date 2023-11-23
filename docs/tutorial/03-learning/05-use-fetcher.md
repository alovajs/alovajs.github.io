---
title: Data fetch
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When you have the following needs:

1. Preload the data that will be used in the subsequent process and store it in the cache, so that users no longer wait for the data loading process;
2. It is convenient to update data across pages (similar to the global state), for example, after modifying an item in the todo list and re-fetching the latest data, the interface will be refreshed after the response.

`useFetcher` is the hook used to implement the above scenarios. The response data obtained through it cannot be received directly, but the data fetched through it will not only update the cache, but also update the corresponding state, thereby re-rendering the view.

You can use it to pre-fetch data and save it in the cache, or gracefully update the state across components, such as modifying an item in the todo list and re-fetching the latest data, and the interface will be refreshed after the response

## Update views across modules/components

Next, let's modify a certain todo data, and re-fetch the latest todo list data to update the view.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- Render the unified fetch state. -->
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
    // The fetching attribute is the same as loading, it is true when a fetch request is sent, and it is false after the request ends
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // After calling fetch, a request to fetch data will be sent, and fetch can be called repeatedly to fetch data from different interfaces
    fetch
  } = useFetcher();

  // Trigger the data fetch in the event
  const handleSubmit = () => {
    // todo item modification...

    // Start to fetch the updated data
    // Situation 1: When you clearly know that the data on the first page of todoList is fetched, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to fetch the last requested data of todoList, use the Method instance matcher to filter
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
    // The fetching attribute is the same as loading, it is true when a fetch request is sent, and it is false after the request ends
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // After calling fetch, a request to fetch data will be sent, and fetch can be called repeatedly to fetch data from different interfaces
    fetch
  } = useFetcher();

  // Trigger the data fetch in the event
  const handleSubmit = () => {
    // Assume the modification of the todo item has been completed...

    // Start to fetch the updated data
    // Situation 1: When you clearly know that the data on the first page of todoList is fetched, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to fetch the last requested data of todoList, use the Method instance matcher to filter
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance that needs to be fetched
        return index === ary.length - 1;
      }
    });
  };

  return (
    <>
      {/* Render the unified fetch state */}
      {fetching ? <div>Fetching data in the background...</div> : null}
      {/* ... */}
      <button onClick={handleSubmit}>Modify todo items</button>
    </>
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
    // The fetching attribute is the same as loading, it is true when a fetch request is sent, and it is false after the request ends
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // After calling fetch, a request to fetch data will be sent, and fetch can be called repeatedly to fetch data from different interfaces
    fetch
  } = useFetcher();

  // Trigger the data fetch in the event
  const handleSubmit = () => {
    // Assume the modification of the todo item has been completed...

    // Start to fetch the updated data
    // Situation 1: When you clearly know that the data on the first page of todoList is fetched, pass in a Method instance
    fetch(getTodoList(1));

    // Situation 2: When you only know to fetch the last requested data of todoList, use the Method instance matcher to filter
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // Return true to specify the Method instance that needs to be fetched
        return index === ary.length - 1;
      }
    });
  };
</script>

<!-- Render a unified fetch state -->
{#if $fetching}
<div>{{ fetching data in background... }}</div>
{/if}
<!-- ... -->
<button on:click="{handleSubmit}">Modify todo items</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <!-- Render a unified fetch state -->
  <div v-if="fetcher.fetching">{{ fetching data in background... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">Modify todo items</button>
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher } from 'alova';

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

  export default {
    mixins: mapAlovaHook(function () {
      const {
        // The fetching attribute is the same as loading, it is true when a fetch request is sent, and it is false after the request ends
        fetching,
        error,
        onSuccess,
        onError,
        onComplete,

        // After calling fetch, a request to fetch data will be sent, and fetch can be called repeatedly to fetch data from different interfaces
        fetch
      } = (fetcherStates = useFetcher());
      return {
        fetcher: fetcherStates
      };
    }),
    methods: {
      // Trigger the data fetch in the event
      handleSubmit() {
        // Assume the modification of the todo item has been completed...

        // Start to fetch the updated data
        // Situation 1: When you clearly know that the data on the first page of todoList is fetched, pass in a Method instance
        this.fetcher$fetch(getTodoList(1));

        // Situation 2: When you only know to fetch the last requested data of todoList, use the Method instance matcher to filter
        this.fetcher$fetch({
          name: 'todoList',
          filter: (method, index, ary) => {
            // Return true to specify the Method instance that needs to be fetched
            return index === ary.length - 1;
          }
        });
      }
    }
  };
</script>
```

</TabItem>
</Tabs>

> See [Method instance matcher](/tutorial/next-step/method-instance-matcher) for more usage methods of `Method` instance matcher

## preload data

The following implements the preloading function of the next page of data in the paging scenario of the todo list.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

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
<TabItem value="4" label="vue options">

```html
<template>
  <!-- ... -->
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher, useWatcher } from 'alova';

  // method instance creation function
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
      // Realize that there is no need to wait for the request when turning the page to the next page
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

In actual situations, we often need to set whether to force the request to be sent according to different situations. At this time, force can be set as a function, which can be passed in through the fetch function.

```javascript
useFetcher({
  force: isForce => {
    return isForce;
  }
});
```

## fetch function parameter passing rules

In the above example, the fetch function is called to trigger data fetching. The fetch function can also pass in custom parameters starting from the second parameter, and these parameters will be received by the following four functions:

### Received in onSuccess, onError, onComplete callback functions

`event.sendArgs` in onSuccess, onError, and onComplete callback functions are received in the form of an array

```javascript
const { fetch, onSuccess, onError, onComplete } = useFetcher();
onSuccess(event => {
  // The value of sendArgs is ['a', 'b']
  console.log(event.sendArgs);
});
onError(event => {
  // The value of sendArgs is ['a', 'b']
  console.log(event.sendArgs);
});
onComplete(event => {
  // The value of sendArgs is ['a', 'b']
  console.log(event.sendArgs);
});

// fetch data
fetch(getTodoList(10), 'a', 'b');
```

### Received in the force function

```javascript
const { fetch } = useFetcher({
  force: isForce => {
    // The value of isForce is true
    return isForce;
  }
});
fetch(getTodoList(10), true);
```

## Compare with useRequest and useFetcher

1. useFetcher does not return the `data` field, the pre-fetched data will be saved in the cache, and the status data of the corresponding location will be updated;
2. Rename `loading` to `fetching`;
3. There is no `send` function, but there is a `fetch` function, which can be reused to fetch data from different interfaces. At this time, you can use the `fetching` and `error` states to render views uniformly, so as to achieve unified processing the goal of;

## API

### Hook configuration

| Name       | Description                                                                                     | Type                                                                                                                                                                 | Default                              | Version |
| ---------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------- |
| force      | Whether to force the request, it can be set as a function to dynamically return a boolean value | boolean                                                                                                                                                              | (...args: any[]) => boolean \| false | -       |
| middleware | Middleware function, [Learn about alova middleware](/tutorial/advanced/middleware)              | (context: [AlovaFetcherMiddlewareContext](#alovafetchermiddlewarecontext), next: [AlovaGuardNext](/tutorial/learning/use-request/#alovaguardnext)) => Promise\<any\> | -                                    | -       |

### AlovaFetcherMiddlewareContext

| Name             | Description                                                                                                                                                                                                | Type                                                                                                                                                                                                                                                                       | Version |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| method           | The method object of the current request                                                                                                                                                                   | Method                                                                                                                                                                                                                                                                     | -       |
| cachedResponse   | hit cached data                                                                                                                                                                                            | any                                                                                                                                                                                                                                                                        | -       |
| config           | current use hook configuration                                                                                                                                                                             | Record\<string, any\>                                                                                                                                                                                                                                                      | -       |
| fetchArgs        | The parameters of the response processing callback, which are passed in by the fetch of useFetcher                                                                                                         | any[]                                                                                                                                                                                                                                                                      | -       |
| fetchStates      | use hook preload state collection, such as fetching, error, etc.                                                                                                                                           | [FetchRequestState](#fetchrequeststate)                                                                                                                                                                                                                                    | -       |
| fetch            | data preloading function                                                                                                                                                                                   | (method: Method, ...args: any[]) => void                                                                                                                                                                                                                                   | Promise |
| abort            | interrupt function                                                                                                                                                                                         | () => void                                                                                                                                                                                                                                                                 | -       |
| decorateSuccess  | Decorate success callback function                                                                                                                                                                         | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovasuccessevent), <br/>index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | Decoration failure callback function                                                                                                                                                                       | (decorator: (<br/>handler: (event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovaerrorevent) => void, <br/>event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovaerrorevent), <br/>index: number, <br/ >length: number<br/>) => void) => void             | -       |
| decorateComplete | Decoration completion callback function                                                                                                                                                                    | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent), <br/>index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | A function to update the preloaded state of the current use hook, more useful in react                                                                                                                     | (newFrontStates: [FetchRequestState](#fetchrequeststate)) => void;                                                                                                                                                                                                         | -       |
| controlFetching  | After calling, it will control the state of fetching by itself, and the change of fetching state will no longer be triggered internally. When the passed in control is false, the control will be canceled | (control?: boolean) => void                                                                                                                                                                                                                                                | -       |

#### FetchRequestState

The following attribute values will automatically infer the responsive data type corresponding to the UI framework according to `statesHook`, which is `Ref` type in vue3, normal value in react, and `Writable` type in svelte

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| fetching    | preload request status        | boolean            | -       |
| error       | request error message         | Error \| undefined | -       |
| downloading | download progress information | Object             | -       |
| uploading   | upload progress information   | Object             | -       |

### Responsive data

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| fetching    | preload request status        | boolean            | -       |
| error       | request error message         | Error \| undefined | -       |
| downloading | download progress information | Object             | -       |
| uploading   | upload progress information   | Object             | -       |

### Action function

| name   | description                                                                            | function parameters                                        | return value | version |
| ------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ | ------- |
| fetch  | data preloading function                                                               | 1. method: preloaded Method instance<br/>2. ...args: any[] | Promise      | -       |
| abort  | interrupt function                                                                     | -                                                          | -            | -       |
| update | A function to update the front-end state of the current use hook, more useful in react | newFrontStates: [FrontRequestState](#frontrequeststate)    | -            |

### Event

| Name       | Description                      | Callback Parameters                                                                                                                                                            | Version |
| ---------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| onSuccess  | Request success event binding    | event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovasuccessevent)   | -       |
| onError    | Request error event binding      | event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovaerrorevent)       | -       |
| onComplete | Request completion event binding | event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent) | -       |
