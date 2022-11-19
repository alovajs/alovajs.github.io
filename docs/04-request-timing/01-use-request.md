---
title: send request
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Next, let's take a look at how to actually make a request. In `alova`, `useRequest`, `useWatcher`, and `useFetcher` three `use hook` are provided to realize the request timing, and they control when the request should be issued. At the same time, it will create and maintain stateful request-related data for us, such as `loading`, `data`, `error`, etc. There is no need to maintain these states independently. Let's learn about them below.

This time, let's first understand the first use hook, **useRequest**, which represents the sending of a request. When executing `useRequest`, a request will be sent by default. It is the most commonly used method for obtaining initial data on a page, and it also supports Turn off its default request sending, which is very useful in request scenarios such as submitting data that are triggered by click events. .

## Initial data request

Let's get page data for the todo list.

<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <!-- You can use data directly to render the todo list -->
  <div v-if="loading">Loading...</div>
  <div
    v-else-if="error"
    class="error">
    {{ error.message }}
  </div>
  <template v-else>
    <div v-for="todo in data">
      <div class="todo-title">{{ todo.title }}</div>
      <div class="todo-time">{{ todo.time }}</div>
    </div>
  </template>
</template>

<script setup>
  const {
    // loading is the loading state value, when it is loaded, its value is true, and it is automatically updated to false after the end
    // It is a value of type Ref, you can access it through loading.value, or bind directly to the interface
    loading,

    // Response data, also Ref value
    data,

    // Request error object, Ref value, there is a value when the request is wrong, otherwise it is undefined
    error,

    // successful callback binding
    onSuccess,

    // Failed callback binding
    onError,

    // complete callback binding
    onComplete

    // Directly pass in the Method instance to send the request
  } = useRequest(todoListGetter, {
    // Initial value of data before request response
    initialData: []
  });
  onSuccess(todoListRaw => {
    console.log('The request is successful, the response data is:', todoListRaw);
  });
  onError(error => {
    console.log('The request failed, the error message is:', error);
  });
  onComplete(() => {
    console.log('The request is completed, it will be called regardless of success or failure');
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const App = () => {
  const {
    // loading is the loading state value, when it is loaded, its value is true, and it is automatically updated to false after the end
    // Its value is a normal boolean value. When the request state changes, the set function will be automatically called internally to update its value
    loading,

    // response data
    data,

    // Request error object, it has a value when the request is wrong, otherwise it is undefined
    error,

    // successful callback binding
    onSuccess,

    // Failed callback binding
    onError,

    // complete callback binding
    onComplete

    // Directly pass in the Method instance to send the request
  } = useRequest(todoListGetter, {
    // Initial value of data before request response
    initialData: []
  });
  onSuccess(todoListRaw => {
    console.log('The request is successful, the response data is:', todoListRaw);
  });
  onError(error => {
    console.log('The request failed, the error message is:', error);
  });
  onComplete(() => {
    console.log('The request is completed, it will be called regardless of success or failure');
  });

  // You can use todoList directly to render the todo list
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div class="error">{error.message}</div>;
  } else {
    return (
      <>
        <div v-for="todo in data">
          <div class="todo-title">{todo.title}</div>
          <div class="todo-time">{todo.time}</div>
        </div>
      </>
    );
  }
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const {
    // loading is the loading state value, when it is loaded, its value is true, and it is automatically updated to false after the end
    // it is a Writable value, it will be maintained internally
    loading,

    // response data
    data,

    // Request error object, it has a value when the request is wrong, otherwise it is undefined
    error,

    // successful callback binding
    onSuccess,

    // Failed callback binding
    onError,

    // complete callback binding
    onComplete

    // Directly pass in the Method instance to send the request
  } = useRequest(todoListGetter, {
    // Initial value of data before request response
    initialData: []
  });
  onSuccess(todoListRaw => {
    console.log('The request is successful, the response data is:', todoListRaw);
  });
  onError(error => {
    console.log('The request failed, the error message is:', error);
  });
  onComplete(() => {
    console.log('The request is completed, it will be called regardless of success or failure');
  });
</script>

<!-- You can use todoList directly to render the todo list -->
{#if $loading}
<div>Loading...</div>
{:else if $error}
<div class="error">{ $error.message }</div>
{:else} {#each $data as todo}
<div>
  <div class="todo-title">{ todo.title }</div>
  <div class="todo-time">{ todo.time }</div>
</div>
{/each} {/if}
```

</TabItem>
</Tabs>

## Manually send the request

When you need to create a new todo item, you can turn off the default sending request first and switch to triggering the request manually. Then change the first parameter of useRequest to a function that returns an instance of `Method`, which is called when the request is fired.

```javascript
const createTodoPoster = newTodo => alovaInstance.Post('/todo', newTodo);

const {
  loading,
  data,
  error,

  // The function of the manual sender request, the request is sent after the call
  send: addTodo
} = useRequest(newTodo => createTodoPoster(newTodo), {
  // When immediate is false, it is not emitted by default
  immediate: false
});

// Manually send the request
const handleAddTodo = () => {
  /** Manual trigger function can accept any number of parameters, these parameters will be passed to 4 functions
   * 1. It can be received when the first parameter of useRequest is a callback function
   * 2. The callback set by onSuccess starts to receive from the second parameter (the first parameter is the response data)
   * 3. The callback set by onError starts to receive from the second parameter (the first parameter is the error object)
   * 4. Received from the first parameter in the callback set by onComplete
   * See next section for details
   *
   * Returns: a Promise object that can receive response data
   */
  const newTodo = {
    title: 'New todo item',
    time: new Date().toLocaleString()
  };
  addTodo(newTodo)
    .then(result => {
      console.log('Add todo item successfully, the response data is:', result);
    })
    .catch(error => {
      console.log('Failed to add todo item, the error message is:', error);
    });
};
```

## Send function parameter passing rules

In the above example, the send function is called to manually trigger the request, which can accept any number of parameters, which will be received by the following 4 functions respectively:

### useRequest callback function

It can be received when the first parameter of useRequest is set to the callback function, as follows:

```javascript
const { send } = useRequest(id => removeTodoPoster(id));
send(1); // the id in the above callback function will receive 1
```

### onSuccess callback function

The callback set by onSuccess starts to receive from the second parameter (the first parameter is the response data)

```javascript
const { send, onSuccess } = useRequest(id => removeTodoPoster(id));
onSuccess((responseData, id) => {
  // responseData is the response data
  // id will receive 1
});
send(1);
```

### onError callback function

The callback set by onError starts to receive from the second parameter (the first parameter is the error object)

```javascript
const { send, onError } = useRequest(id => removeTodoPoster(id));
onError((err, id) => {
  // err is the Error object thrown when the request is wrong
  // id will receive 1
});
send(1);
```

### onComplete callback function

4. Receive from the first parameter in the callback set by onComplete

```javascript
const { send, onComplete } = useRequest(id => removeTodoPoster(id));
onComplete(id => {
  // id will receive 1
});
send(1);
```

## Set initial response data

Before a page gets the initial data, it inevitably needs to wait for the server to respond. Before responding, it is generally necessary to initialize the state to an empty array or empty object, so as to avoid page errors. A parameter realizes the setting of the initial data.

```javascript
// Set initial data in useRequest
const {
  // The initial value of data before the response is [], not undefined
  // highlight-start
  data
} = useRequest(todoListGetter, {
  initialData: []
});
// highlight-end
```

## Manual interrupt request

When the `timeout` parameter is not set, the request will never time out. If you need to manually interrupt the request, you can receive the `abort` method when the `useRequest` function is called.

```javascript
const {
  // ...
  // highlight-start
  // abort function is used for interrupt request
  abort
  // highlight-end
} = useRequest(todoListGetter);

// highlight-start
// Call abort to interrupt the request
const handleCancel = () => {
  abort();
};
// highlight-end
```
