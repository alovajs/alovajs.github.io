---
title: 手动失效缓存
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

通常，自动失效缓存更加简洁，并且推荐优先使用它来失效缓存，当自动失效缓存不满足需求时，你还可以通过调用`invalidateCache`来失效缓存。

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

可能有时候你并不确定需要失效哪个缓存数据，但却知道以什么方式来找到需要失效的缓存数据，我们可以使用 [Method 实例匹配器](/tutorial/advanced/method-matcher) 来动态查找对应的 method 实例。以下例子展示了如何让名称为 todoList 的前 5 个 Method 实例的缓存失效。

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

> 更多`Method`实例匹配器的使用方法见 [Method 实例匹配器](/tutorial/advanced/method-matcher)

## 失效所有缓存

```javascript
// 当不传任何参数时，失效所有响应缓存
invalidateCache();
```
