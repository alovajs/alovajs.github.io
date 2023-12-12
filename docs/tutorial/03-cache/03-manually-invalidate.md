---
title: Invalidate Response Cache manually
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Generally, automatic invalidation cache is more concise, and it is recommended to use it first to invalidate the cache. When the automatic invalidation cache does not meet the needs, you can also invalidate the cache by calling `invalidateCache`.

## Use method instance lookup cache

In the invalidateCache function, a method instance is passed in, and it will always look for the cache under this instance to invalidate.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <button @click="send">Send request</button>
</template>

<script setup>
  import { invalidateCache } from 'alova';

  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    //...
    send,
    onSuccess
  } = useRequest(createTodoPoster, { immediate: false });

  // highlight-start
  // After the submission is successful, the todo data cache on the first page will be invalidated
  onSuccess(() => {
    invalidateCache(getTodoList(1));
  });
  // highlight-end
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { invalidateCache } from 'alova';

const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const {
    //...
    send,
    onSuccess
  } = useRequest(createTodoPoster, { immediate: false });

  // highlight-start
  // After the submission is successful, the todo data cache on the first page will be invalidated
  onSuccess(() => {
    invalidateCache(getTodoList(1));
  });
  // highlight-end

  return <button onClick={send}>send request</button>;
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { invalidateCache } from 'alova';

  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    //...
    send,
    onSuccess
  } = useRequest(createTodoPoster, { immediate: false });

  // highlight-start
  // After the submission is successful, the todo data cache on the first page will be invalidated
  onSuccess(() => {
    invalidateCache(getTodoList(1));
  });
  // highlight-end
</script>

<button on:click="{send}">Send request</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <button @click="todo$send">send request</button>
</template>

<script>
  import { invalidateCache, useRequest } from 'alova';
  import { mapAlovaHook } from '@alova/vue-options';

  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function() {
      return {
        todo: useRequest(createTodoPoster, { immediate: false })
      }
    })
    mounted() {
      // highlight-start
      // After the submission is successful, the todo data cache on the first page will be invalidated
      this.todo$onSuccess(() => {
        invalidateCache(getTodoList(1));
      });
      // highlight-end
    }
  };
</script>
```

</TabItem>
</Tabs>

:::info
Its function is far more than that. We can also invalidate any number or even all caches by setting `Method` instance matchers.
:::

## Dynamic lookup invalidation cache

Maybe sometimes you are not sure which cache data needs to be invalidated, but you know how to find the cached data that needs to be invalidated. We can use [Method instance matcher](/tutorial/advanced/method-matcher) To dynamically find the corresponding method instance. The following example shows how to invalidate the cache for the first 5 Method instances named todoList.

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    // First set the name for the method instance, which is used to filter out the required Method instance when the Method instance cannot be specified directly
    name: 'todoList',
    // highlight-end
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const {
  //...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });
// After the submission is successful, the todo data cache on the first page will be invalidated
onSuccess(() => {
  // highlight-start
  // Invalidate the cache of the first 5 Method instances named todoList
  invalidateCache({
    name: 'todoList',
    filter: (method, index, ary) => {
      return index < 5;
    }
  });
  // highlight-end
});
```

> See [Method instance matcher](/tutorial/advanced/method-matcher) for more usage of `Method` instance matcher

## Invalidate all caches

```javascript
// When no parameters are passed, invalidate all response caches
invalidateCache();
```
