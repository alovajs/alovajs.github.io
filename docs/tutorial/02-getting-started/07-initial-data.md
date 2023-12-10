---
title: Set initial data
sidebar_position: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When using `useRequest`, its `data` value defaults to undefined before the request is successful, but sometimes we need `data` to have an initial value before the request is successful. For example, when requesting a list, we usually need to initialize it to `[]`.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
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
  const { loading, data, error } = useRequest(todoListGetter, {
    // highlight-start
    //The initial value of data before requesting response
    initialData: []
    // highlight-end
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const App = () => {
  const { loading, data, error } = useRequest(todoListGetter, {
    // highlight-start
    //The initial value of data before requesting response
    initialData: []
    // highlight-end
  });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div class="error">{error.message}</div>;
  } else {
    return (
      <>
        {data.map(todo => (
          <div key={todo.id}>
            <div class="todo-title">{todo.title}</div>
            <div class="todo-time">{todo.time}</div>
          </div>
        ))}
      </>
    );
  }
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const { loading, data, error } = useRequest(todoListGetter, {
    // highlight-start
    //The initial value of data before requesting response
    initialData: []
    // highlight-end
  });
</script>

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
<TabItem value="4" label="vue options">

```html
<template>
  <div v-if="todo.loading">Loading...</div>
  <div
    v-else-if="todo.error"
    class="error">
    {{ todo.error.message }}
  </div>
  <template v-else>
    <div v-for="todoItem in todo.data">
      <div class="todo-title">{{ todoItem.title }}</div>
      <div class="todo-time">{{ todoItem.time }}</div>
    </div>
  </template>
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useRequest } from 'alova';

  export default {
    mixins: mapAlovaHook(function () {
      const { loading, data, error } = useRequest(todoListGetter, {
        // highlight-start
        //The initial value of data before requesting response
        initialData: []
        // highlight-end
      });

      return {
        todo: {
          loading,
          data,
          error
        }
      };
    })
  };
</script>
```

</TabItem>
</Tabs>
