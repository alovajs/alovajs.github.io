---
title: Actively Invalidate Response Cache
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There is such a scenario, when the user clicks on an item in the todo list, enters the todo details page and edits it, at this time we hope that the todo list data on the previous page will also be updated with the edited content, usually The approach is to trigger the content update of the previous page through events, which increases maintenance costs. And `alova` provides 3 ways to achieve this goal very elegantly:

1. Use `useFetcher` to immediately re-request the latest data, which has been mentioned in the above section;
2. Manually update the cache, which will be explained in detail in the next section;
3. Make the response cache invalid, and when the request is made again, the data will be re-requested due to the cache invalidation. This is what this section is about.

As we mentioned in [cache mode](../learning/response-cache), each cached data is saved with the method instance that sent the request as the key, so the method instance will also be used when the cache is invalidated. Invalidate the corresponding cached data.

Now we try to achieve this requirement with cache invalidation.

## Use method instance lookup cache

In the invalidateCache function, a method instance is passed in, and it will always look for the cache under this instance to invalidate.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

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
</Tabs>

:::info
Its function is far more than that. We can also invalidate any number or even all caches by setting `Method` instance matchers.
:::

## Dynamic lookup invalidation cache

Maybe sometimes you are not sure which cache data needs to be invalidated, but you know how to find the cached data that needs to be invalidated. We can use [Method instance matcher](../next-step/method-instance-matcher) To dynamically find the corresponding method instance. The following example shows how to invalidate the cache for the first 5 Method instances named todoList.

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

> See [Method instance matcher](../next-step/method-instance-matcher) for more usage of `Method` instance matcher

## Invalidate all caches

```javascript
// When no parameters are passed, invalidate all response caches
invalidateCache();
```
