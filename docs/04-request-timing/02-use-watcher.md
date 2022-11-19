---
title: state change request
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`useWatcher` is used to monitor the specified state change and send a request immediately. It is mainly used in scenarios where the data is updated with the state change, such as paging, data filtering, and fuzzy search.

##Keyword search
Next, let's take the example of searching for todo items.
<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <!-- keyword changes as input changes -->
  <input v-model="keyword" />

  <!-- Render filtered todo list -->
  <div v-if="loading">Loading...</div>
  <template v-else>
    <div v-for="todo in data">
      <div class="todo-title">{{ todo.title }}</div>
      <div class="todo-time">{{ todo.time }}</div>
    </div>
  </template>
</template>

<script setup>
  // create method instance
  const filterTodoList = keyword => {
    return alovaInstance.Get('/tood/list/search', {
      params: {
        keyword
      }
    });
  };
  const keyword = ref('');
  const {
    loading,
    data,
    error

    // The first parameter must be a function that returns an instance of method
  } = useWatcher(
    () => filterTodoList(keyword.value),

    // Array of monitored states, these state changes will trigger a request
    [keyword],
    {
      // Set 500ms anti-shake, if the keyword changes frequently, the request will only be sent 500ms after the change is stopped
      debounce: 500
    }
  );
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
// create method instance
const filterTodoList = keyword => {
  return alovaInstance.Get('/tood/list/search', {
    params: {
      keyword
    }
  });
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const {
    loading,
    data,
    error
    // The first parameter must be a function that returns an instance of method
  } = useWatcher(
    () => filterTodoList(keyword),

    // Array of monitored states, these state changes will trigger a request
    [keyword],
    {
      // Set 500ms anti-shake, if the keyword changes frequently, the request will only be sent 500ms after the change is stopped
      debounce: 500
    }
  );

  return (
    <>
      {/* keyword changes as input changes */}
      <input
        value={keyword}
        onInput={e => setKeyword(e.target.value)}
      />

      {/* Render filtered todo list */}
      {loading ? <div>Loading...</div> : null}
      {!loading ? (
        <>
          {data.map(todo => (
            <div>
              <div class="todo-title">{todo.title}</div>
              <div class="todo-time">{todo.time}</div>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';

  // create method instance
  const filterTodoList = text => {
    return alovaInstance.Get('/tood/list/search', {
      params: {
        keyword: text
      }
    });
  };
  const keyword = writable('');

  const {
    loading,
    data,
    error

    // The first parameter must be a function that returns an instance of method
  } = useWatcher(
    () => filterTodoList($keyword),

    // Array of monitored states, these state changes will trigger a request
    [keyword],
    {
      // Set 500ms anti-shake, if the keyword changes frequently, the request will only be sent 500ms after the change is stopped
      debounce: 500
    }
  );

  const updateKeyword = e => {
    $keyword = e.target.value;
  };
</script>
<!-- keyword changes as input changes -->
<input
  value="{$keyword}"
  on:input="{updateKeyword}" />

<!-- Render filtered todo list -->
{#if $loading}
<div>Loading...</div>
{:else} {#each $data as todo}
<div>
  <div class="todo-title">{ todo.title }</div>
  <div class="todo-time">{ todo.time }</div>
</div>
{/each} {/if}
```

</TabItem>
</Tabs>

## Pagination

Taking the todo list pagination request as an example, you can do this.

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

  const currentPage = ref(1);
  const {
    loading,
    data,
    error

    // The first parameter is the function that returns the method instance, not the method instance itself
  } = useWatcher(
    () => getTodoList(currentPage.value),
    // Array of monitored states, these state changes will trigger a request
    [currentPage],
    {
      // ⚠️ Calling useWatcher does not trigger by default, pay attention to the difference from useRequest
      // Manually set immediate to true to get the first page data initially
      immediate: true
    }
  );
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
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    data,
    error

    // The first parameter is the function that returns the method instance, not the method instance itself
  } = useWatcher(
    () => getTodoList(currentPage),
    // Array of monitored states, these state changes will trigger a request
    [currentPage],
    {
      // ⚠️ Calling useWatcher does not trigger by default, pay attention to the difference from useRequest
      // Manually set immediate to true to get the first page data initially
      immediate: true
    }
  );

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

  const currentPage = writable(1);
  const {
    loading,
    data,
    error

    // The first parameter is the function that returns the method instance, not the method instance itself
  } = useWatcher(
    () => getTodoList($currentPage),
    // Array of monitored states, these state changes will trigger a request
    [currentPage],
    {
      // ⚠️ Calling useWatcher does not trigger by default, pay attention to the difference from useRequest
      // Manually set immediate to true to get the first page data initially
      immediate: true
    }
  );
</script>

<!-- ... -->
```

</TabItem>
</Tabs>

## Manually send the request

Sometimes you want to resend the request when the listening state has not changed (such as server data has been updated), you can also manually trigger the request through the `send` function, the usage is the same as `useRequest`.

```javascript
const {
  // ...
  // highlight-start
  send
  // highlight-end
} = useWatcher(
  () => getTodoList($currentPage),
  // Array of monitored states, these state changes will trigger a request
  [currentPage],
  {
    immediate: true
  }
);

// highlight-start
send();
// highlight-end
```

## Send function parameter passing rules

In the above example, the send function is called to manually trigger the request, which can accept any number of parameters, which will be received by the following 4 functions respectively:

### useWatcher callback function

The callback function of useWatcher can be received, as follows:

```javascript
const { send } = useWatcher(currentPage => getTodoList(currentPage));
send(1); // currentPage in the above callback function will receive 1
```

### onSuccess callback function

The callback set by onSuccess starts to receive from the second parameter (the first parameter is the response data)

```javascript
const { send, onSuccess } = useWatcher(currentPage => getTodoList(currentPage));
onSuccess((responseData, currentPage) => {
  // responseData is the response data
  // currentPage will receive 1
});
send(1);
```

### onError callback function

The callback set by onError starts to receive from the second parameter (the first parameter is the error object)

```javascript
const { send, onError } = useWatcher(currentPage => getTodoList(currentPage));
onError((err, currentPage) => {
  // err is the Error object thrown when the request is wrong
  // currentPage will receive 1
});
send(1);
```

### onComplete callback function

4. Receive from the first parameter in the callback set by onComplete

```javascript
const { send, onComplete } = useWatcher(currentPage => getTodoList(currentPage));
onComplete(id => {
  // currentPage will receive 1
});
send(1);
```

## set initial response data

Before a page gets the initial data, it inevitably needs to wait for the server to respond. Before responding, it is generally necessary to initialize the state to an empty array or empty object, so as to avoid page errors. A parameter realizes the setting of the initial data.

```javascript
// The initial value of data can also be set in useWatcher
const {
  // The initial value of data before the response is [], not undefined
  data
} = useWatcher(
  () => getTodoList(/* parameters */),
  [
    /* monitor status */
  ],
  {
    initialData: []
  }
);
```

## Request anti-shake

Usually, we write anti-shake code at the level of frequently triggered events. This time, we implemented the anti-shake function at the request level, which means that you no longer have to implement anti-shake in the fuzzy search function, and the usage is very simple.
:::info Tips: What is function anti-shake
Function debounce means that after the event is triggered, the function can only be executed once within n seconds. If the event is triggered again within n seconds after the event is triggered, the function delay execution time will be recalculated (here and the function section). To distinguish between streams, function throttling means that the event cannot be triggered again within a period of time after the event is triggered)
:::

### Set the anti-shake time for all monitoring states

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // When setting debounce as a number, it represents the debounce time of all listening states, in milliseconds
  // As shown here, when one or more of the status keyword and date change, the request will be sent after 500ms
  debounce: 500
  // highlight-end
});
```

### Set the anti-shake time for a single listening state

In many scenarios, we only need to debounce certain frequently changing listening states, such as the state changes triggered by the `onInput` of the text box, you can do this:

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // Set the anti-shake time in the array order of the listening state, 0 or no transmission means no anti-shake
  // The order of the monitoring status here is [keyword, date], and the anti-shake array is set to [500, 0], which means that only the anti-shake is set separately for the keyword
  debounce: [500, 0]
  // can also be set as follows:
  // debounce: [500],
  // highlight-end
});
```

## Manual interrupt request

When the `timeout` parameter is not set, the request will never time out. If you need to manually interrupt the request, you can receive the `abort` method when the `useWatcher` function is called.

```javascript
const {
  // ...
  // highlight-start
  // abort function is used for interrupt request
  abort
  // highlight-end
} = useWatcher(() => filterTodoList(keyword), [keyword]);

// highlight-start
// Call abort to interrupt the request
const handleCancel = () => {
  abort();
};
// highlight-end
```
