---
title: Status Change Request
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In some scenarios that need to be re-requested as the data changes, such as paging, data filtering, and fuzzy search, `useWatcher` can be used to monitor the specified state change and send the request immediately.

## Keyword Search

Next, let's take searching for todo items as an example.
<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <!-- keyword changes as the input content changes -->
  <input v-model="keyword" />

  <!-- Render the filtered todo list -->
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
    return alovaInstance.Get('/todo/list/search', {
      params: {
        keywords
      }
    });
  };
  const keyword = ref('');
  const {
    loading,
    data,
    error

    // The first parameter must be a function that returns a method instance
  } = useWatcher(
    () => filterTodoList(keyword.value),

    // array of states being monitored, these state changes will trigger a request
    [keyword],
    {
      // Set 500ms anti-shake, if the keyword changes frequently, only send the request 500ms after the change stops
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
  return alovaInstance.Get('/todo/list/search', {
    params: {
      keywords
    }
  });
};

const App = () => {
  const [keyword, setKeyword] = useState('');
  const {
    loading,
    data,
    error
    // The first parameter must be a function that returns a method instance
  } = useWatcher(
    () => filterTodoList(keyword),

    // array of states being monitored, these state changes will trigger a request
    [keyword],
    {
      // Set 500ms anti-shake, if the keyword changes frequently, only send the request 500ms after the change stops
      debounce: 500
    }
  );

  return (
    <>
      {/* keyword changes with input content */}
      <input
        value={keyword}
        onInput={e => setKeyword(e.target.value)}
      />

      {/* Render the filtered todo list */}
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
    return alovaInstance.Get('/todo/list/search', {
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

    // The first parameter must be a function that returns a method instance
  } = useWatcher(
    () => filterTodoList($keyword),

    // array of states being monitored, these state changes will trigger a request
    [keyword],
    {
      // Set 500ms anti-shake, if the keyword changes frequently, only send the request 500ms after the change stops
      debounce: 500
    }
  );

  const updateKeyword = e => {
    $keyword = e.target.value;
  };
</script>
<!-- keyword changes as the input content changes -->
<input
  value="{$keyword}"
  on:input="{updateKeyword}" />

<!-- Render the filtered todo list -->
{#if $loading}
<div>Loading...</div>
{:else} {#each $data as todo}
<div>
  <div class="todo-title">{ todo. title }</div>
  <div class="todo-time">{ todo.time }</div>
</div>
{/each} {/if}
```

</TabItem>
</Tabs>

## pagination

Using the todo list pagination request as an example, you can do this.

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

  const currentPage = ref(1);
  const {
    loading,
    data,
    error

    // The first parameter is the function that returns the method instance, not the method instance itself
  } = useWatcher(
    () => getTodoList(currentPage.value),
    // array of states being monitored, these state changes will trigger a request
    [currentPage],
    {
      // ⚠️Calling useWatcher does not trigger by default, pay attention to the difference with useRequest
      // Manually set immediate to true to initially obtain the first page data
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
  return alovaInstance.Get('/todo/list', {
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
    // array of states being monitored, these state changes will trigger a request
    [currentPage],
    {
      // ⚠️Calling useWatcher does not trigger by default, pay attention to the difference with useRequest
      // Manually set immediate to true to initially obtain the first page data
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
    return alovaInstance.Get('/todo/list', {
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
    // array of states being monitored, these state changes will trigger a request
    [currentPage],
    {
      // ⚠️Calling useWatcher does not trigger by default, pay attention to the difference with useRequest
      // Manually set immediate to true to initially obtain the first page data
      immediate: true
    }
  );
</script>

<!-- ... -->
```

</TabItem>
</Tabs>

## Manually send the request

Sometimes you want to resend the request when the monitoring state has not changed (for example, the server data has been updated), you can also manually trigger the request through the `send` function, the usage is the same as `useRequest`.

```javascript
const {
  //...
  // highlight-start
  send
  // highlight-end
} = useWatcher(
  () => getTodoList($currentPage),
  // array of states being monitored, these state changes will trigger a request
  [currentPage],
  {
    immediate: true
  }
);

// highlight-start
send();
// highlight-end
```

## Force send request

Caching data can improve application fluency and reduce server pressure, but there is also the problem of data expiration. When you want to penetrate the cache to obtain the latest data, you can set the `force` property in the configuration of use hooks. help you.

### Set static value

force is false by default. When set to true, the cache will be penetrated every time and a request will be sent

```javascript
useWatcher(
  () => alovaInstance.Get('/todo'),
  [
    /*watchingStates*/
  ],
  {
    force: true
  }
);
```

### Dynamically set the force value

In actual situations, we often need to set whether to force the request to be sent according to different situations. At this time, force can be set as a function, which can be passed in through the send function.

```javascript
const { send } = useWatcher(
  alovaInstance.Get('/todo'),
  [
    /*watchingStates*/
  ],
  {
    force: id => {
      return !!id;
    }
  }
);
send(1);
```

## Send function parameter passing rules

In the above example, the send function is called to manually trigger the request, which can accept any number of parameters, and these parameters will be received by the following four functions:

### useWatcher callback function

The callback function of useWatcher can be received, as follows:

```javascript
const { send } = useWatcher(currentPage => getTodoList(currentPage));
send(1); // currentPage in the above callback function will receive 1
```

### Received in onSuccess, onError, onComplete callback functions

`event.sendArgs` in onSuccess, onError, and onComplete callback functions are received in the form of an array

```javascript
const { send, onSuccess, onError, onComplete } = useWatcher(currentPage => getTodoList(currentPage));
onSuccess(event => {
  // The value of sendArgs is [1]
  console.log(event.sendArgs);
});
onError(event => {
  // The value of sendArgs is [1]
  console.log(event.sendArgs);
});
onComplete(event => {
  // The value of sendArgs is [1]
  console.log(event.sendArgs);
});
send(1);
```

### Received in the force function

```javascript
const { send } = useWatcher(
  alovaInstance.Get('/todo'),
  [
    /*watchingStates*/
  ],
  {
    force: id => {
      return !!id;
    }
  }
);
send(1);
```

## Set initial response data

Before a page gets the initial data, it inevitably needs to wait for the response from the server. Before the response, it is generally necessary to initialize the state to an empty array or an empty object, so as not to cause an error on the page. We can set the second parameter to set the initial data.

```javascript
// You can also set the initial value of data in useWatcher
const {
  // The initial value of data before the response is [], not undefined
  data
} = useWatcher(
  () => getTodoList(/* parameter */),
  [
    /* Monitor status */
  ],
  {
    initialData: []
  }
);
```

## Request anti-shake

Usually we write anti-shake code at the level of frequently triggered events. This time we implemented the anti-shake function at the request level, which means that you no longer need to implement anti-shake yourself in the fuzzy search function, and the usage is very simple.
:::info Tips: What is function anti-shake
Function debounce means that after an event is triggered, the function can only be executed once within n seconds. If an event is triggered again within n seconds after the event is triggered, the delayed execution time of the function will be recalculated (here and the function section To distinguish between streams, function throttling means that the event cannot be triggered again within a period of time after the event is triggered)
:::

### Set the anti-shake time of all monitoring states

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // When debounce is set to a number, it represents the anti-shake time of all listening states, in milliseconds
  // As shown here, when one or more changes of status keyword and date, the request will be sent after 500ms
  debounce: 500
  // highlight-end
});
```

### Set the anti-shake time for a single monitoring state

In many scenarios, we only need to stabilize some frequently changing monitoring states, such as state changes triggered by `onInput` of a text box, we can do this:

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // Set the anti-shake time respectively in the array order of the monitoring state, 0 or no transmission means no anti-shake
  // The order of the monitoring status here is [keyword, date], and the anti-shake array is set to [500, 0], which means that the anti-shake is only set for the keyword alone
  debounce: [500, 0]
  // You can also set it as follows:
  // debounce: [500],
  // highlight-end
});
```

## Manually modify the status value

In alova, various states such as `data`, `loading`, and `error` returned by `useWatcher` allow custom modification, which will become very convenient in some cases.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
const watchingState = ref('');
const { data, loading, error } = useWatcher(todoListGetter, [watchingState]);

//...
// Modify the data value directly
data.value = {};
```

</TabItem>

<TabItem value="2" label="react">

In react, the returned state is data that can be used directly, so it needs to be modified by the `update` function.

```javascript
const [watchingState, setWatchingState] = useState('');
const { data, loading, error, update } = useWatcher(todoListGetter, [watchingState]);

//...
// Modify the data value through update
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

In svelte, the status returned by `useWatcher` is of type `writable`.

```javascript
const watchingState = writable('');
const { data, loading, error } = useWatcher(todoListGetter, [watchingState]);

//...
// Modify the data value directly
$data = {};
// or data.update(d => ({}));
```

</TabItem>
</Tabs>

:::caution Notes

1. The custom modified value will be overwritten by the internal state management mechanism of `useWatcher`. For example, when you modify the value of `data`, the value of `data` will be assigned the latest response data after requesting again;
2. The state value modified directly will not modify the cached data synchronously. If you need to modify the cached data synchronously, it is recommended to use [updateState](/learning/update-response-data-across-modules)

:::

## Abort request manually

When the `timeout` parameter is not set, the request will never time out. If you need to manually interrupt the request, you can receive the `abort` method when the `useWatcher` function is called.

```javascript
const {
  //...
  // highlight-start
  // abort function is used to interrupt request
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

In addition, this `abort` function will also be bound to the current method instance, so you can also call `abort` in `beforeRequest` to abort the request.

```javascript
const alovaInst = createAlova({
  //...
  beforeRequest(method) {
    if (someCondition) {
      method.abort();
    }
  }
});
```

## API

### Hook configuration

| Name          | Description                                                                                                                                        | Type                                                                                                                                                                               | Default  | Version |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | --- |
| immediate     | Whether to initiate the request immediately                                                                                                        | boolean                                                                                                                                                                            | true     | -       |
| initialData   | The initial data value, the data value is the initial value before the first response, `undefined` if not set                                      | any                                                                                                                                                                                | -        | -       |
| force         | Whether to force the request, it can be set as a function to dynamically return a boolean value                                                    | boolean &#124; (...args: any[]) => boolean                                                                                                                                         | false    | -       |
| managedStates | Additional managed states, can be updated via updateState                                                                                          | Record&lt;string &#124; number &#124; symbol, any&gt;                                                                                                                              | -        | -       |
| debounce      | Request debounce time (milliseconds), when passing in the array, you can set the debounce time separately according to the order of watchingStates | number                                                                                                                                                                             | number[] | -       | -   |
| middleware    | Middleware function, [Learn about alova middleware](/advanced/middleware)                                                                          | (context: [AlovaFrontMiddlewareContext](/learning/use-request/#alovafrontmiddlewarecontext), next: [AlovaGuardNext](/learning/use-request /#alovaguardnext)) => Promise&lt;any&gt; | -        | -       |

### Responsive data

| Name        | Description                   | Type                   | Version |
| ----------- | ----------------------------- | ---------------------- | ------- |
| loading     | request loading status        | boolean                | -       |
| data        | response data                 | any                    | -       |
| error       | request error message         | Error &#124; undefined | -       |
| downloading | download progress information | Object                 | -       |
| uploading   | upload progress information   | Object                 | -       |

### Action function

| name   | description                                                                            | function parameters                                                           | return value | version |
| ------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------ | ------- |
| send   | send request function                                                                  | ...args: any[]                                                                | Promise      | -       |
| abort  | interrupt function                                                                     | -                                                                             | -            | -       |
| update | A function to update the front-end state of the current use hook, more useful in react | newFrontStates: [FrontRequestState](/learning/use-request/#frontrequeststate) | -            |

### Event

| Name       | Description                    | Callback Parameters                                                    | Version |
| ---------- | ------------------------------ | ---------------------------------------------------------------------- | ------- |
| onSuccess  | request success event binding  | event: [AlovaSuccessEvent](/learning/use-request/#alovasuccessevent)   | -       |
| onError    | request error event binding    | event: [AlovaErrorEvent](/learning/use-request/#alovaerrorevent)       | -       |
| onComplete | request complete event binding | event: [AlovaCompleteEvent](/learning/use-request/#alovacompleteevent) | -       |
