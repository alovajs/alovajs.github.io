---
title: Manually update the cache
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Some service interfaces support batch request data, which means that it is always composed of indeterminate sets of response data. When we want to batch request data when initializing the page, and then request only a single piece of data in the interaction, it will cause caching penetration problem.

For example, we need to obtain the todo list data by date. During initialization, we obtained the data from May 1st to 5th and 5 days in one request, and then the user obtained the data of May 1st again during the operation. Hit the May 1st data during initialization, because the initialized 5-day data are stored together instead of being cached separately. At this time, we can manually create a single response cache for the 5-day data, so that we can Solve the problem of cache penetration when a single data request is made.

## Update static cache data

<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <button @click="handleTodolistToggle">Switch date, hit cache</button>
</template>
<script setup>
  import { setCacheData } from 'alova';
  import { ref } from 'vue';

  const getTodoListByDate = dateList =>
    alovaInstance.Get('/todo/list/dates', {
      params: { dateList }
    });
  // Get 5 days of data in batches during initialization
  const dates = ref(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.value.join()), [dates], {
    immediate: true
  });
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // By default, these 5 days of data will be cached together in a key
    // In order to make subsequent requests for a certain day's data also hit the cache, we can disassemble the 5-day data into daily, and manually set the response cache one after another through setCacheData
    todoListDates.forEach(todoDate => {
      // setCacheData parameter description:
      // Parameter 1: method instance object, which is used to specify the cache key
      // parameter 2: cache data
      setCacheData(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // At this point, when the switch date is May 1, it will hit the response cache we manually set.
    // The dates value is being listened to by useWatcher, so changing it automatically triggers the request
    dates.value = ['2022-05-01'];
  };
  // highlight-end
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { setCacheData } from 'alova';
import { useState } from 'react';

const getTodoListByDate = dateList =>
  alovaInstance.Get('/todo/list/dates', {
    params: { dateList }
  });

const App = () => {
  // Get 5 days of data in batches during initialization
  const [dates, setDates] = useState(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.join()), [dates], {
    immediate: true
  });
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // By default, these 5 days of data will be cached together in a key
    // In order to make subsequent requests for a certain day's data also hit the cache, we can disassemble the 5-day data into daily, and manually set the response cache one by one through setCacheData
    // The first parameter of setCacheData is the method instance object, which is used to specify the cache key
    // The second parameter is the cache data
    todoListDates.forEach(todoDate => {
      setCacheData(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // At this point, when the switch date is May 1, it will hit the response cache we manually set.
    // The dates value is being listened to by useWatcher, so changing it automatically triggers the request
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
  import { setCacheData } from 'alova';
  import { writable } from 'svelte/store';

  const getTodoListByDate = dateList =>
    alovaInstance.Get('/todo/list/dates', {
      params: { dateList }
    });
  // Get 5 days of data in batches during initialization
  const dates = writable(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate($dates.join()), [dates], {
    immediate: true
  });
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // By default, these 5 days of data will be cached together in a key
    // In order to make subsequent requests for a certain day's data also hit the cache, we can disassemble the 5-day data into daily, and manually set the response cache one by one through setCacheData
    // The first parameter of setCacheData is the method instance object, which is used to specify the cache key
    // The second parameter is the cache data
    todoListDates.forEach(todoDate => {
      setCacheData(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // At this point, when the switch date is May 1, it will hit the response cache we manually set.
    // The dates value is being listened to by useWatcher, so changing it automatically triggers the request
    $dates = ['2022-05-01'];
  };
  // highlight-end
</script>
<button on:click="{handleTodolistToggle}">Switch date, hit cache</button>
```

</TabItem>
</Tabs>

## Dynamic cache data update

You can also pass a callback function to `setCacheData` to dynamically calculate the cache data and return the cache data that needs to be updated.

```javascript
setCacheData(getTodoListByDate('2022-10-01'), oldCache => {
  // return the data to be cached
  return {
    ...oldCache,
    expire: isAfter('2022-10-01', new Date())
  };
});
```

## interrupt cache update

You can also interrupt the cache update by returning `false` in the `setCacheData` callback function.

```javascript
setCacheData(getTodoListByDate('2022-10-01'), oldCache => {
  const isExpired = isAfter('2022-10-01', new Date());
  if (!isExpired) {
    return false; // interrupt cache update
  }
  return undefined; // update the cache to undefined
});
```
