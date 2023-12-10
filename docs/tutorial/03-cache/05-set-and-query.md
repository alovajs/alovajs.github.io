---
title: Cache set and query
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Some service interfaces support batch request data, which means that it is always composed of uncertain sets of response data. When we want to batch request data when initializing the page, and then only request a single piece of data in the interaction, it will cause caching Penetration problem.

For example, we need to obtain the todo list data by date. During initialization, a request obtains the data of 5 days from May 1 to 5, and then the user obtains the data of May 1 again during the operation. At this time, it will not Hit the data on May 1st when it was initialized, because the initialized data of 5 days is stored together instead of being cached separately. At this time, we can manually create a single response cache for the data of these 5 days, so that we can Solve the problem of cache penetration when a single data request is made.

As we mentioned in [cache mode](/tutorial/learning/response-cache), each cached data is saved with the method instance that sends the request as the key, so the method instance will also be used when updating the cache manually to find the corresponding cached data.

## Update static cache data

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <button @click="handleTodolistToggle">Switch date, hit cache</button>
</template>
<script setup>
  import { setCache } from 'alova';
  import { ref } from 'vue';

  const getTodoListByDate = dateList =>
    alovaInstance.Get('/todo/list/dates', {
      params: { dateList }
    });
  // Get 5 days of data in batches during initialization
  const dates = ref(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    //...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.value.join()), [dates], {
    immediate: true
  });
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // By default, the data of these 5 days will be cached together in a key
    // In order to make subsequent requests for data of a certain day also hit the cache, we can disassemble the data of 5 days into days, and manually set the response cache successively through setCache
    todoListDates.forEach(todoDate => {
      // setCache parameter description:
      // Parameter 1: method instance object, which is used to specify the key of the cache
      // Parameter 2: Cache data
      setCache(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // At this time, when the switching date is May 1, it will hit the response cache we manually set.
    // The dates value is being monitored by useWatcher, so changing it can automatically trigger the request
    dates.value = ['2022-05-01'];
  };
  // highlight-end
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { setCache } from 'alova';
import { useState } from 'react';

const getTodoListByDate = dateList =>
  alovaInstance.Get('/todo/list/dates', {
    params: { dateList }
  });

const App = () => {
  // Get 5 days of data in batches during initialization
  const [dates, setDates] = useState(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    //...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.join()), [dates], {
    immediate: true
  });
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // By default, the data of these 5 days will be cached together in a key
    // In order to make subsequent requests for data of a certain day also hit the cache, we can disassemble the data of 5 days into days, and manually set the response cache one by one through setCache
    // The first parameter of setCache is the method instance object, which is used to specify the key of the cache
    // The second parameter is the cached data
    todoListDates.forEach(todoDate => {
      setCache(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // At this time, when the switching date is May 1, it will hit the response cache we manually set.
    // The dates value is being monitored by useWatcher, so changing it can automatically trigger the request
    setDates(['2022-05-01']);
  };
  // highlight-end

  return <button onClick={handleTodolistToggle}>Switch date, hit cache</button>;
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { setCache } from 'alova';
  import { writable } from 'svelte/store';

  const getTodoListByDate = dateList =>
    alovaInstance.Get('/todo/list/dates', {
      params: { dateList }
    });
  // Get 5 days of data in batches during initialization
  const dates = writable(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    //...
    onSuccess
  } = useWatcher(() => getTodoListByDate($dates.join()), [dates], {
    immediate: true
  });
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // By default, the data of these 5 days will be cached together in a key
    // In order to make subsequent requests for data of a certain day also hit the cache, we can disassemble the data of 5 days into days, and manually set the response cache one by one through setCache
    // The first parameter of setCache is the method instance object, which is used to specify the key of the cache
    // The second parameter is the cached data
    todoListDates.forEach(todoDate => {
      setCache(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // At this time, when the switching date is May 1, it will hit the response cache we manually set.
    // The dates value is being monitored by useWatcher, so changing it can automatically trigger the request
    $dates = ['2022-05-01'];
  };
  // highlight-end
</script>
<button on:click="{handleTodolistToggle}">Switch date, hit cache</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <button @click="handleTodolistToggle">Switch date, hit cache</button>
</template>
<script>
  import { setCache, useWatcher } from 'alova';
  import { mapAlovaHook } from '@alova/vue-options';

  const getTodoListByDate = dateList =>
    alovaInstance.Get('/todo/list/dates', {
      params: { dateList }
    });

  export default {
    mixins: mapAlovaHook(function () {
      return {
        todo: useWatcher(() => getTodoListByDate(this.dates.join()), ['dates'], {
          immediate: true
        })
      };
    }),
    data() {
      return {
        // Get 5 days of data in batches during initialization
        dates: ['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']
      };
    },
    mounted() {
      this.todo$onSuccess(({ data: todoListDates }) => {
        if (todoListDates.length <= 1) {
          return;
        }

        // highlight-start
        // By default, the data of these 5 days will be cached together in a key
        // In order to make subsequent requests for data of a certain day also hit the cache, we can disassemble the data of 5 days into days, and manually set the response cache successively through setCache
        todoListDates.forEach(todoDate => {
          // setCache parameter description:
          // Parameter 1: method instance object, which is used to specify the key of the cache
          // Parameter 2: Cache data
          setCache(getTodoListByDate(todoDate.date), [todoDate]);
        });
        // highlight-end
      });
    },
    methods: {
      // highlight-start
      handleTodolistToggle() {
        // At this time, when the switching date is May 1, it will hit the response cache we manually set.
        // The dates value is being monitored by useWatcher, so changing it can automatically trigger the request
        this.dates = ['2022-05-01'];
      }
      // highlight-end
    }
  };
</script>
```

</TabItem>
</Tabs>

## Dynamically set cache data

You can also pass in a callback function in `setCache` to dynamically calculate the cache data and return the cache data that needs to be updated.

```javascript
setCache(getTodoListByDate('2022-10-01'), oldCache => {
  // Return the data that needs to be cached
  return {
    ...oldCache,
    expire: isAfter('2022-10-01', new Date())
  };
});
```

Similarly, you can also dynamically find method instances through [method instance matcher](/tutorial/next-step/method-instance-matcher).

```javascript
setCache(
  {
    name: 'todoList',
    filter: (method, index, ary) => {
      return index < 5;
    }
  },
  'newCache'
);
```

## Abort to set cache

Sometimes you need to dynamically determine whether to update the cache. If no data is returned in the callback function of `setCache`, or `undefined` is returned, the original cache data will not be updated at this time

```javascript
setCache(getTodoListByDate('2022-10-01'), oldCache => {
  const isExpired = isAfter('2022-10-01', new Date());
  if (!isExpired) {
    return; // abort cache updating when return the undefined
  }
  return null; // update the cache to null
});
```

## cache query

At the same time, we also provide a cache query method.

```javascript
import { queryCache } from 'alova';

const cacheData = queryCache(getTodoListByDate('2022-10-01'));
```

You can also dynamically find method instances via [method instance matcher](/tutorial/next-step/method-instance-matcher).

```javascript
const cacheData = queryCache({
  name: 'todoList',
  filter: (method, index, ary) => {
    return index < 5;
  }
});
```
