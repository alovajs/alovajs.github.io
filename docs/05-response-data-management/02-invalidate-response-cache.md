---
title: Actively Invalidate Response Cache
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

There is such a scenario, when the user clicks on an item in the todo list, enters the todo details page and edits it, at this time we hope that the todo list data in the previous page is also updated to the edited content, usually The practice is to trigger the content update of the previous page through an event, which increases the maintenance cost. And `alova` provides 3 ways to achieve this purpose very elegantly:

1. Use `useFetcher` to immediately re-request the latest data, which has been covered in the above section;
2. Manually update the cache, which will be explained in detail in the next section;
3. Invalidate the cache of this response, when the request is made again, the data will be re-requested due to cache invalidation. That's what this section is about.

Now we try to achieve this requirement by way of cache invalidation.
<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <button @click="send">Send request</button>
</template>

<script setup>
  import { invalidateCache } from 'alova';

  const getTodoList = currentPage => {
    return alovaInstance.Get('/tood/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // ...
    send,
    onSuccess
  } = useRequest(createTodoPoster, { immediate: false });

  // highlight-start
  // After the submission is successful, the todo data cache of the first page is fixed to be invalidated
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
  return alovaInstance.Get('/tood/list', {
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const {
    // ...
    send,
    onSuccess
  } = useRequest(createTodoPoster, { immediate: false });

  // highlight-start
  // After the submission is successful, the todo data cache of the first page is fixed to be invalidated
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
    return alovaInstance.Get('/tood/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // ...
    send,
    onSuccess
  } = useRequest(createTodoPoster, { immediate: false });

  // highlight-start
  // After the submission is successful, the todo data cache of the first page is fixed to be invalidated
  onSuccess(() => {
    invalidateCache(getTodoList(1));
  });
  // highlight-end
</script>

<button on:click="{send}">Send request</button>
```

</TabItem>
</Tabs>

Its function is far more than that, we can also achieve any number of, or even all, cache invalidation by setting the `Method` instance matcher.

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/tood/list', {
    // Note: The name attribute is set to filter out the required Method instance when the Method instance cannot be specified directly
    name: 'todoList',
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const {
  // ...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });
// After the submission is successful, the todo data cache of the first page is fixed to be invalidated
onSuccess(() => {
  // highlight-start
  // invalidate all response caches named todoList
  invalidateCache({
    name: 'todoList',
    filter: (method, index, ary) => {
      // The response cache for the first 5 Method instances named todoList will be invalidated
      return index < 5;
    }
  });
  // highlight-end

  // highlight-start
  // When no parameters are passed, invalidate all response caches
  invalidateCache();
  // highlight-end
});
```

> For more usage of `Method` instance matcher, see [Method instance matcher](../next-step/method-instance-matcher)
