---
title: 设置初始数据
sidebar_position: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

当使用 `useRequest` 时，它的`data`值在请求成功前默认为 undefined，但有时候我们需要`data`在请求成功前也有初始值，例如在请求列表时通常需要讲它初始化为`[]`。

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
    // 请求响应前，data的初始值
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
    // 请求响应前，data的初始值
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
    // 请求响应前，data的初始值
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
        // 请求响应前，data的初始值
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
