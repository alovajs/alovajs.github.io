---
title: 更新与查找缓存
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

缓存也支持更新和查找，在[缓存模式](/tutorial/cache/mode)中我们提到过，每份缓存数据是以发送请求的 method 实例作为 key 进行保存的，因此在手动更新缓存时也将使用 method 实例来查找对应的缓存数据。

## 更新静态缓存数据

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <button @click="handleTodolistToggle">切换日期，命中缓存</button>
</template>
<script setup>
  import { setCache } from 'alova';
  import { ref } from 'vue';

  const getTodoListByDate = dateList =>
    alovaInstance.Get('/todo/list/dates', {
      params: { dateList }
    });
  // 初始化时批量获取5天的数据
  const dates = ref(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.value.join()), [dates], {
    immediate: true
  });
  onSuccess(({ data: todoListDates }) => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // 默认情况下，这5天的数据会一起缓存到一个key中
    // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCache相继手动设置响应缓存
    todoListDates.forEach(todoDate => {
      // setCache参数说明：
      // 参数1：method实例对象，它用于指定缓存的key
      // 参数2：缓存数据
      setCache(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // 此时再在切换日期为5月1日时，它将会命中我们手动设置的响应缓存。
    // dates值正在被useWatcher监听，因此改变它就可以自动触发请求
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
  // 初始化时批量获取5天的数据
  const [dates, setDates] = useState(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.join()), [dates], {
    immediate: true
  });
  onSuccess(({ data: todoListDates }) => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // 默认情况下，这5天的数据会一起缓存到一个key中
    // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCache一一手动设置响应缓存
    // setCache的第一个参数为method实例对象，它用于指定缓存的key
    // 第二个参数为缓存数据
    todoListDates.forEach(todoDate => {
      setCache(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // 此时再在切换日期为5月1日时，它将会命中我们手动设置的响应缓存。
    // dates值正在被useWatcher监听，因此改变它就可以自动触发请求
    setDates(['2022-05-01']);
  };
  // highlight-end

  return <button onClick={handleTodolistToggle}>切换日期，命中缓存</button>;
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
  // 初始化时批量获取5天的数据
  const dates = writable(['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate($dates.join()), [dates], {
    immediate: true
  });
  onSuccess(({ data: todoListDates }) => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // 默认情况下，这5天的数据会一起缓存到一个key中
    // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCache一一手动设置响应缓存
    // setCache的第一个参数为method实例对象，它用于指定缓存的key
    // 第二个参数为缓存数据
    todoListDates.forEach(todoDate => {
      setCache(getTodoListByDate(todoDate.date), [todoDate]);
    });
    // highlight-end
  });

  // highlight-start
  const handleTodolistToggle = () => {
    // 此时再在切换日期为5月1日时，它将会命中我们手动设置的响应缓存。
    // dates值正在被useWatcher监听，因此改变它就可以自动触发请求
    $dates = ['2022-05-01'];
  };
  // highlight-end
</script>
<button on:click="{handleTodolistToggle}">切换日期，命中缓存</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <button @click="handleTodolistToggle">切换日期，命中缓存</button>
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
        // 初始化时批量获取5天的数据
        dates: ['2022-05-01', '2022-05-02', '2022-05-03', '2022-05-04', '2022-05-05']
      };
    },
    mounted() {
      this.todo$onSuccess(({ data: todoListDates }) => {
        if (todoListDates.length <= 1) {
          return;
        }

        // highlight-start
        // 默认情况下，这5天的数据会一起缓存到一个key中
        // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCache相继手动设置响应缓存
        todoListDates.forEach(todoDate => {
          // setCache参数说明：
          // 参数1：method实例对象，它用于指定缓存的key
          // 参数2：缓存数据
          setCache(getTodoListByDate(todoDate.date), [todoDate]);
        });
        // highlight-end
      });
    },
    methods: {
      // highlight-start
      handleTodolistToggle() {
        // 此时再在切换日期为5月1日时，它将会命中我们手动设置的响应缓存。
        // dates值正在被useWatcher监听，因此改变它就可以自动触发请求
        this.dates = ['2022-05-01'];
      }
      // highlight-end
    }
  };
</script>
```

</TabItem>
</Tabs>

## 动态更新缓存数据

你也可以在`setCache`中传入一个回调函数来动态计算缓存数据，并返回需要更新的缓存数据。

```javascript
setCache(getTodoListByDate('2022-10-01'), oldCache => {
  // 返回需要缓存的数据
  return {
    ...oldCache,
    expire: isAfter('2022-10-01', new Date())
  };
});
```

同样的，你也可以通过 [method 匹配器](/tutorial/advanced/method-matcher) 动态查找 method 实例。

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

## 中断缓存更新

有时候你需要动态判断是否需要更新缓存，如果在`setCache`的回调函数中未返回数据，或返回了`undefined`，此时将不更新原缓存数据

```javascript
setCache(getTodoListByDate('2022-10-01'), oldCache => {
  const isExpired = isAfter('2022-10-01', new Date());
  if (!isExpired) {
    return; // 中断缓存更新
  }
  return null; // 将缓存更新为null
});
```

## 查询缓存

同时，我们也提供了缓存查询方法。

```javascript
import { queryCache } from 'alova';

const cacheData = queryCache(getTodoListByDate('2022-10-01'));
```

你也可以通过 [method 匹配器](/tutorial/advanced/method-matcher) 动态查找 method 实例。

```javascript
const cacheData = queryCache({
  name: 'todoList',
  filter: (method, index, ary) => {
    return index < 5;
  }
});
```
