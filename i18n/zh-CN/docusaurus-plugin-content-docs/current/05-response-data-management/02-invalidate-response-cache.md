---
title: 主动失效响应缓存
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


有这样一个场景，当用户点开todo列表中的某一项，进入todo详情页并对它执行了编辑，此时我们希望上一页中的todo列表数据也更新为编辑后的内容，通常的做法是通过事件来触发上一页的内容更新，这样增加了维护成本。而`alova`提供了3种方式，可以很优雅地达到这个目的：
1. 使用`useFetcher`立即重新请求最新的数据，它在上面的章节中已经讲过；
2. 手动更新缓存，这种方式将在下一个小节详细讲解；
3. 让这个响应缓存失效，当再次请求时将会因缓存失效而重新请求数据。这也是本小节所要讲的内容。

现在我们尝试以缓存失效的方式实现本需求。
<Tabs>
<TabItem value="1" label="vue">

```html
<template>
  <button @click="send">发送请求</button>
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
// 提交成功后，固定使第一页的todo数据缓存失效
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
  // 提交成功后，固定使第一页的todo数据缓存失效
  onSuccess(() => {
    invalidateCache(getTodoList(1));
  });
  // highlight-end

  return <button onClick={send}>发送请求</button>
}
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
// 提交成功后，固定使第一页的todo数据缓存失效
onSuccess(() => {
  invalidateCache(getTodoList(1));
});
// highlight-end
</script>

<button on:click={send}>发送请求</button>
```

</TabItem>
</Tabs>

它的功能还远不止于此，我们还可以通过设置`Method`实例匹配器来实现任意多个，甚至全部缓存的失效。

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/tood/list', {
    // 注意：设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
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
// 提交成功后，固定使第一页的todo数据缓存失效
onSuccess(() => {

  // highlight-start
  // 失效名称为todoList的所有响应缓存
  invalidateCache({
    name: 'todoList',
    filter: (method, index, ary) => {
      // 名为todoList的前5个Method实例的响应缓存将会失效
      return index < 5;
    },
  });
  // highlight-end

  // highlight-start
  // 不传任何参数时，失效所有响应缓存
  invalidateCache();
  // highlight-end
});
```

> 更多`Method`实例匹配器的使用方法见 [Method实例匹配器](../next-step/method-instance-matcher )