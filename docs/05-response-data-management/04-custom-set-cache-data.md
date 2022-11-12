---
title: 手动更新缓存
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


有些服务接口支持批量请求数据，它意味着总是由不确定的若干组响应数据组成，当我们想要在初始化页面时批量请求数据，然后在交互中只请求单条数据的情况下，会造成缓存穿透的问题。

例如我们需要按日期获取todo列表数据，在初始化时一次请求获取了5月1日到5日，5天的数据，然后用户在操作时又获取了一次5月1日的数据，此时不会命中初始化时的5月1日数据，因为初始化的5天数据是存放在一起的，而不是分开缓存的，此时我们就可以为这5天的数据相继手动创建单条的响应缓存，这样就可以解决单条数据请求时的缓存穿透的问题。

## 更新静态缓存数据
<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <button @click="handleTodolistToggle">切换日期，命中缓存</button>
</template>
<script setup>
import { setCacheData } from 'alova';
import { ref } from 'vue';

const getTodoListByDate = dateList => alovaInstance.Get('/todo/list/dates', {
  params: { dateList }
});
// 初始化时批量获取5天的数据
const dates = ref([
  '2022-05-01',
  '2022-05-02',
  '2022-05-03',
  '2022-05-04',
  '2022-05-05',
]);
const {
  // ...
  onSuccess
} = useWatcher(() => getTodoListByDate(dates.value.join()),
  [dates],
  {
    immediate: true
  }
);
onSuccess(todoListDates => {
  if (todoListDates.length <= 1) {
    return;
  }

  // highlight-start
  // 默认情况下，这5天的数据会一起缓存到一个key中
  // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCacheData相继手动设置响应缓存
  todoListDates.forEach(todoDate => {
    
    // setCacheData参数说明：
    // 参数1：method实例对象，它用于指定缓存的key
    // 参数2：缓存数据
    setCacheData(getTodoListByDate(todoDate.date), [todoDate]);
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
import { setCacheData } from 'alova';
import { useState } from 'react';

const getTodoListByDate = dateList => alovaInstance.Get('/todo/list/dates', {
  params: { dateList }
});

const App = () => {
  // 初始化时批量获取5天的数据
  const [dates, setDates] = useState([
    '2022-05-01',
    '2022-05-02',
    '2022-05-03',
    '2022-05-04',
    '2022-05-05',
  ]);
  const {
    // ...
    onSuccess
  } = useWatcher(() => getTodoListByDate(dates.join()),
    [dates],
    {
      immediate: true
    }
  );
  onSuccess(todoListDates => {
    if (todoListDates.length <= 1) {
      return;
    }

    // highlight-start
    // 默认情况下，这5天的数据会一起缓存到一个key中
    // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCacheData一一手动设置响应缓存
    // setCacheData的第一个参数为method实例对象，它用于指定缓存的key
    // 第二个参数为缓存数据
    todoListDates.forEach(todoDate => {
      setCacheData(getTodoListByDate(todoDate.date), [todoDate]);
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

  return (
    <button onClick={handleTodolistToggle}>切换日期，命中缓存</button>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
import { setCacheData } from 'alova';
import { writable } from 'svelte/store';

const getTodoListByDate = dateList => alovaInstance.Get('/todo/list/dates', {
  params: { dateList }
});
// 初始化时批量获取5天的数据
const dates = writable([
  '2022-05-01',
  '2022-05-02',
  '2022-05-03',
  '2022-05-04',
  '2022-05-05',
]);
const {
  // ...
  onSuccess
} = useWatcher(() => getTodoListByDate($dates.join()),
  [dates],
  {
    immediate: true
  }
);
onSuccess(todoListDates => {
  if (todoListDates.length <= 1) {
    return;
  }

  // highlight-start
  // 默认情况下，这5天的数据会一起缓存到一个key中
  // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCacheData一一手动设置响应缓存
  // setCacheData的第一个参数为method实例对象，它用于指定缓存的key
  // 第二个参数为缓存数据
  todoListDates.forEach(todoDate => {
    setCacheData(getTodoListByDate(todoDate.date), [todoDate]);
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
<button on:click={handleTodolistToggle}>切换日期，命中缓存</button>
```

</TabItem>
</Tabs>


## 动态缓存数据更新
你也可以在`setCacheData`中传入一个回调函数来动态计算缓存数据，并返回需要更新的缓存数据。
```javascript
setCacheData(getTodoListByDate('2022-10-01'), oldCache => {

  // 返回需要缓存的数据
  return {
    ...oldCache,
    expire: isAfter('2022-10-01', new Date()),
  };
});
```

## 中断缓存更新
你还可以在`setCacheData`的回调函数中返回`false`来中断缓存的更新。
```javascript
setCacheData(getTodoListByDate('2022-10-01'), oldCache => {
  const isExpired = isAfter('2022-10-01', new Date());
  if (!isExpired) {
    return false; // 中断缓存更新
  }
  return undefined; // 将缓存更新为undefined
});
```