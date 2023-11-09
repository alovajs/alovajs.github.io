---
title: 主动失效响应缓存
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

有这样一个场景，当用户点开 todo 列表中的某一项，进入 todo 详情页并对它执行了编辑，此时我们希望上一页中的 todo 列表数据也更新为编辑后的内容，通常的做法是通过事件来触发上一页的内容更新，这样增加了维护成本。而`alova`提供了 3 种方式，可以很优雅地达到这个目的：

1. 使用`useFetcher`立即重新请求最新的数据，它在上面的章节中已经讲过；
2. 手动更新缓存，这种方式将在下一个小节详细讲解；
3. 让这个响应缓存失效，当再次请求时将会因缓存失效而重新请求数据。这也是本小节所要讲的内容。

在[缓存模式](/tutorial/learning/response-cache)中我们提到过，每份缓存数据是以发送请求的 method 实例作为 key 进行保存的，因此在失效缓存时也将使用 method 实例来失效对应的缓存数据。

现在我们尝试以缓存失效的方式实现本需求。

## 使用 method 实例查找缓存

在 invalidateCache 函数中传入一个 method 实例，它将固定查找此实例下的缓存进行失效。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <button @click="send">发送请求</button>
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
  return alovaInstance.Get('/todo/list', {
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

  return <button onClick={send}>发送请求</button>;
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

<button on:click="{send}">发送请求</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <button @click="todo$send">发送请求</button>
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
      // 提交成功后，固定使第一页的todo数据缓存失效
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

它的功能还远不止于此，我们还可以通过设置`Method`实例匹配器来实现任意多个，甚至全部缓存的失效。

:::

## 动态查找失效缓存

可能有时候你并不确定需要失效哪个缓存数据，但却知道以什么方式来找到需要失效的缓存数据，我们可以使用 [Method 实例匹配器](/tutorial/next-step/method-instance-matcher) 来动态查找对应的 method 实例。以下例子展示了如何让名称为 todoList 的前 5 个 Method 实例的缓存失效。

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    // 先为method实例设置名称，用于在无法直接指定Method实例时，过滤出需要的Method实例
    name: 'todoList',
    // highlight-end
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
  // 失效名称为todoList的前5个Method实例的缓存
  invalidateCache({
    name: 'todoList',
    filter: (method, index, ary) => {
      return index < 5;
    }
  });
  // highlight-end
});
```

> 更多`Method`实例匹配器的使用方法见 [Method 实例匹配器](/tutorial/next-step/method-instance-matcher)

## 失效所有缓存

```javascript
// 当不传任何参数时，失效所有响应缓存
invalidateCache();
```
