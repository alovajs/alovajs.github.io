---
title: Request when states Changed
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EmbedSandpack from "@site/src/components/EmbedSandpack";
import useWatcherSearchVue from '!!raw-loader!@site/codesandbox/03-learning/04-use-watcher/vueComposition-search.en.vue';
import useWatcherSearchReact from '!!raw-loader!@site/codesandbox/03-learning/04-use-watcher/react-search.en.jsx';
import useWatcherSearchVueOptions from '!!raw-loader!@site/codesandbox/03-learning/04-use-watcher/vueOptions-search.en.vue';

In some scenarios that need to be re-requested as the data changes, such as paging, data filtering, and fuzzy search, `useWatcher` can be used to watch the specified state change and send the request immediately.

## Keyword Search

Next, let's take searching for todo items as an example.
<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

<EmbedSandpack template="vue" mainFile={useWatcherSearchVue} editorHeight={800} />

</TabItem>
<TabItem value="2" label="react">

<EmbedSandpack template="react" mainFile={useWatcherSearchReact} editorHeight={800} />

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';

  //Create method instance
  const filterTodoList = userId => {
    return alovaInstance.Get(`/users/${userId}/todos`);
  };
  const userId = writable(0);
  const { loading, data, error } = useWatcher(
    // Parameters must be set to functions that return method instances
    () => filterTodoList($userId),

    // The monitored status array, these status changes will trigger a request
    [userId]
  );
</script>
<select bind:value="{$userId}">
  <option value="{1}">User 1</option>
  <option value="{2}">User 2</option>
  <option value="{3}">User 3</option>
</select>

<!-- Render the filtered todo list -->
{#if $loading}
<div>Loading...</div>
{:else}
<ul>
  {#each $data as todo}
  <li class="todo-title">{{ todo.completed ? '(Completed)' : '' }}{{ todo.title }}</li>
  {/each}
</ul>
{/if}
```

</TabItem>
<TabItem value="4" label="vue options">

<EmbedSandpack template="vue" deps="vue-options" mainFile={useWatcherSearchVueOptions} editorHeight={800} />

</TabItem>
</Tabs>

## pagination

Using the todo list pagination request as an example, you can do this.

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

  const currentPage = ref(1);
  const { loading, data, error } = useWatcher(
    // The first parameter is the function that returns the method instance, not the method instance itself
    () => getTodoList(currentPage.value),
    // array of states being watched, these state changes will trigger a request
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
    // array of states being watched, these state changes will trigger a request
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
    // array of states being watched, these state changes will trigger a request
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
<TabItem value="4" label="vue options">

```html
<template>
  <!-- ... -->
</template>

<script>
  import { mapAlovaHook } from '@alovajs/vue-options';

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
      paging: useWatcher(
        () => getTodoList(this.currentPage),

        // array of states being watched, these state changes will trigger a request
        ['currentPage'],
        {
          // ⚠️Calling useWatcher does not trigger by default, pay attention to the difference with useRequest
          // Manually set immediate to true to initially obtain the first page data
          immediate: true
        }
      );
    }),
    data() {
      return {
        currentPage: 1
      };
    }
  };
</script>
```

</TabItem>
</Tabs>

## Manually send the request

Sometimes you want to resend the request when the watching state has not changed (for example, the server data has been updated), you can also manually trigger the request through the `send` function, the usage is the same as `useRequest`.

```javascript
const {
  //...
  // highlight-start
  send
  // highlight-end
} = useWatcher(
  () => getTodoList($currentPage),
  // array of states being watched, these state changes will trigger a request
  [currentPage],
  {
    immediate: true
  }
);

// highlight-start
send();
// highlight-end
```

> `[2.9.0+]`In react, the send function is wrapped with `useCallback`, and it is not limited by the closure trap. You can use it directly in the event without worrying about performance problems.

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
    /* watch states */
  ],
  {
    initialData: []
  }
);
```

## Request debounce

Usually we write debounce code at the level of frequently triggered events. This time we implemented the debounce function at the request level, which means that you no longer need to implement debounce yourself in the fuzzy search function, and the usage is very simple.

:::info Tips: What is function debounce

Function debounce means that after an event is triggered, the function can only be executed once within n seconds. If an event is triggered again within n seconds after the event is triggered, the delayed execution time of the function will be recalculated (here and the function section To distinguish between streams, function throttling means that the event cannot be triggered again within a period of time after the event is triggered)

:::

### Set the debounce time of all watching states

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // When debounce is set to a number, it represents the debounce time of all listening states, in milliseconds
  // As shown here, when one or more changes of states keyword and date, the request will be sent after 500ms
  debounce: 500
  // highlight-end
});
```

### Set the debounce time for a single watching state

In many scenarios, we only need to stabilize some frequently changing watching states, such as state changes triggered by `onInput` of a text box, we can do this:

```javascript
const { loading, data, error } = useWatcher(() => filterTodoList(keyword, date), [keyword, date], {
  // highlight-start
  // Set the debounce time respectively in the array order of the watching state, 0 or no transmission means no debounce
  // The order of the watching states here is [keyword, date], and the debounce array is set to [500, 0], which means that the debounce is only set for the keyword alone
  debounce: [500, 0]
  // You can also set it as follows:
  // debounce: [500],
  // highlight-end
});
```

## Manually modify the states value

In alova, various states such as `data`, `loading`, and `error` returned by `useWatcher` allow custom modification, which will become very convenient in some cases.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

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
// update the data value through update
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

In svelte, the states returned by `useWatcher` is of type `writable`.

```javascript
const watchingState = writable('');
const { data, loading, error } = useWatcher(todoListGetter, [watchingState]);

//...
// update the data value directly
$data = {};
// or data.update(d => ({}));
```

</TabItem>
<TabItem value="4" label="vue options">

```javascript
export default {
  mixins: mapAlovaHook(function () {
    todo: useWatcher(todoListGetter, ['watchingState']);
  }),
  methods: {
    handleModifyTodo() {
      // updat the data value directly
      this.todo.data = {};

      // or use update function
      this.todo.update({
        data: {}
      });
    }
  }
};
```

</TabItem>
</Tabs>

:::warning Notes

1. The custom modified value will be overwritten by the internal state management mechanism of `useWatcher`. For example, when you modify the value of `data`, the value of `data` will be assigned the latest response data after requesting again;
2. The state value modified directly will not modify the cached data synchronously. If you need to modify the cached data synchronously, it is recommended to use [updateState](/tutorial/learning/update-response-data-across-modules)

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

> `[2.9.0+]`In react, the abort function is wrapped with `useCallback`, and it is not limited by the closure trap. You can use it directly in the event without worrying about performance problems.

`[2.6.2+]`In addition, this `abort` function will also be bound to the current method instance, so you can also call `abort` in `beforeRequest` to abort the request.

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

## Prevent sending request when state changes

Sometimes you want not to send a request when the watched state changes. You can control whether to send a request when the watched state changes through the sendable attribute in the Hook configuration. The sendable attribute is a function whose parameter is the `AlovaEvent` event object. Contains the array `sendArgs` composed of the parameters passed in by the `send` function, and the `method` instance of the current request, and the function returns a `truthy/falsy` value to determine whether the request needs to be triggered when the states changes (default is `true`), **throwing an error also means not triggering the request**.

```javascript
useWatcher(
  () => getTodoList($currentPage),
  // An array of watched states, these state changes will trigger a request
  [state],
  {
    // highlight-start
    sendable: methodInstance => {
      // do something
      // Send request only when state is 1
      return state === 1;
    }
    // highlight-end
  }
);
```

## Whether to interrupt the last unresponsive request

Sometimes when the states watched by `useWatcher` changes continuously and leads to the initiation of continuous requests, the latter request gets a response before the previous request, but when the previous request gets a response, it will overwrite the response of the latter request. Causes to get a response that does not match the state; for example, a request `1` is sent after a state `state` changes, and then the value of `state` is changed before the request `1` is responded to, and a request is sent` 2`, if request `1` returns after request `2`, the final response data will remain at request `1`.
So we designed the `abortLast` parameter, which is used to mark whether to interrupt the last unresponsive request when the next request is sent. The default is `true`, so that only the last request issued by `useWatcher` is valid.

```javascript
useWatcher(
  () => getTodoList($currentPage),
  // An array of watched states, these state changes will trigger a request
  [state],
  {
    // highlight-start
    abortLast: true // Whether to interrupt the last unresponsive request, the default is true
    // highlight-end
  }
);
```

:::warning Precautions

`abortLast` defaults to `true`, if it is changed to `false`, it may cause a problem that the state does not match the response.

:::

## API

### Hook configuration

| Name          | Description                                                                                                                                        | Type                                                                                                                                                                                            | Default                                   | Version |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------- |
| immediate     | Whether to initiate the request immediately                                                                                                        | boolean                                                                                                                                                                                         | true                                      | -       |
| initialData   | The initial data value, the data value is the initial value before the first response, `undefined` if not set                                      | any                                                                                                                                                                                             | -                                         | -       |
| force         | Whether to force the request, it can be set as a function to dynamically return a boolean value                                                    | boolean                                                                                                                                                                                         | (...args: any[]) => boolean \| false      | -       |
| managedStates | Additional managed states, can be updated via updateState                                                                                          | Record\<string                                                                                                                                                                                  | Record\<string \| number \| symbol, any\> | -       |
| debounce      | Request debounce time (milliseconds), when passing in the array, you can set the debounce time separately according to the order of watchingStates | number                                                                                                                                                                                          | number \| number[]                        | -       |
| middleware    | Middleware function, [Learn about alova middleware](/tutorial/advanced/middleware)                                                                 | (context: [AlovaFrontMiddlewareContext](/tutorial/learning/use-request/#alovafrontmiddlewarecontext), next: [AlovaGuardNext](/tutorial/learning/use-request/#alovaguardnext)) => Promise\<any\> | -                                         | -       |
| sendable      | Whether to send a request when the watched state changes                                                                                           | (methodInstance: AlovaEvent) => boolean                                                                                                                                                         | () => true                                | -       |
| abortLast     | Whether to interrupt the last unresponsive request                                                                                                 | boolean                                                                                                                                                                                         | true                                      | -       |

### Responsive data

| Name        | Description                   | Type               | Version |
| ----------- | ----------------------------- | ------------------ | ------- |
| loading     | request loading states        | boolean            | -       |
| data        | response data                 | any                | -       |
| error       | request error message         | Error \| undefined | -       |
| downloading | download progress information | Object             | -       |
| uploading   | upload progress information   | Object             | -       |

### Action function

| name   | description                                                                            | function parameters                                                                    | return value | version |
| ------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------ | ------- |
| send   | send request function                                                                  | ...args: any[]                                                                         | Promise      | -       |
| abort  | interrupt function                                                                     | -                                                                                      | -            | -       |
| update | A function to update the front-end state of the current use hook, more useful in react | newFrontStates: [FrontRequestState](/tutorial/learning/use-request/#frontrequeststate) | -            |

### Event

| Name       | Description                    | Callback Parameters                                                             | Version |
| ---------- | ------------------------------ | ------------------------------------------------------------------------------- | ------- |
| onSuccess  | request success event binding  | event: [AlovaSuccessEvent](/tutorial/learning/use-request/#alovasuccessevent)   | -       |
| onError    | request error event binding    | event: [AlovaErrorEvent](/tutorial/learning/use-request/#alovaerrorevent)       | -       |
| onComplete | request complete event binding | event: [AlovaCompleteEvent](/tutorial/learning/use-request/#alovacompleteevent) | -       |
