---
title: 数据拉取
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

当你有以下需求时：

1. 预加载后续流程中将会使用到的数据并存放在缓存中，让用户不再等待数据加载的过程；
2. 便捷地实现跨页面更新数据（类似全局状态），例如修改 todo 列表的某一项后重新拉取最新数据，响应后将刷新界面。

`useFetcher`就是用于实现以上场景的 hook，通过它获取的响应数据不能直接接收到，但通过它拉取的数据除了会更新缓存外还会更新对应的状态，从而重新渲染视图。

## 预加载数据

我们来实现一个分页列表中，自动预加载下一页数据，在预加载数据前请确保使用的 Method 实例已开启了缓存。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <div v-if="fetching">Fetching...</div>
  <!-- 列表视图 -->
</template>

<script setup>
  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      localCache: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
    fetch
  } = useFetcher({
    updateState: false
  });

  const currentPage = ref(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage.value), [currentPage], {
    immediate: true
  });

  // 在当前页加载成功后，传入下一页的method实例，即可预拉取下一页的数据
  onSuccess(() => {
    fetch(getTodoList(currentPage.value + 1));
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';

// method实例创建函数
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    localCache: 60000,
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const {
    // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
    fetch
  } = useFetcher({
    updateState: false
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage), [currentPage], {
    immediate: true
  });

  // 在当前页加载成功后，传入下一页的method实例，即可预拉取下一页的数据
  onSuccess(() => {
    fetch(getTodoList(currentPage + 1));
  });

  return (
    <>
      {fetching ? <div>Fetching...</div> : null}
      {/* 列表视图 */}
    </>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { writable } from 'svelte/store';

  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      localCache: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const {
    // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
    fetching,
    error,
    onSuccess,
    onError,
    onComplete,

    // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
    fetch
  } = useFetcher({
    updateState: false
  });
  const currentPage = writable(1);
  const { data, onSuccess } = useWatcher(() => getTodoList($currentPage), [currentPage], {
    immediate: true
  });

  // 在当前页加载成功后，传入下一页的method实例，即可预拉取下一页的数据
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

{#if fetching}
<div>Fetching...</div>
{/if}
<!-- 列表视图 -->
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <div>
    <div v-if="fetching">Fetching...</div>
    <!-- 列表视图 -->
  </div>
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher, useWatcher } from 'alova';

  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      localCache: 60000,
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function () {
      return {
        fetcher: useFetcher({
          updateState: false
        }),
        paging: useWatcher(() => getTodoList(this.currentPage), ['currentPage'], {
          immediate: true
        })
      };
    }),
    data() {
      return {
        currentPage: 1
      };
    },
    mounted() {
      // 在当前页加载成功后，传入下一页的method实例，即可预拉取下一页的数据
      this.paging$onSuccess(() => {
        this.fetcher$fetch(getTodoList(this.currentPage + 1));
      });
    }
  };
</script>
```

</TabItem>
</Tabs>

:::warning

以上示例在调用`useFetcher`时设置了`updateState`为 false，这是因为默认情况下 fetch 时会自动触发跨组件更新状态，导致视图重新渲染，在预拉取的数据与当前请求的数据为同一份`data`时可以关闭它，以免影响视图错误。

:::

## 跨模块/组件更新视图

下面我们来实现修改一条 todo 数据，并重新拉取最新的 todo 列表数据，让视图更新。我们可能并不知道 todo 列表当前位于第几页，此时在使用`fetch`函数时可以使用[method 匹配器](/tutorial/advanced/method-matcher)来动态拉取当前页的数据。

> method 匹配器是用于，在已请求过的 method 实例中，查找符合条件的 method 实例。

首先，为 todo 列表的 method 实例设置名称，用于在无法直接指定 Method 实例时，过滤出需要的 Method 实例。

```javascript title="api/todoList.js"
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    name: 'todoList',
    // highlight-end
    params: {
      currentPage,
      pageSize: 10
    }
  });
};
```

然后在`EditTodo`组件中，通过`fetch`函数在已请求过的 Method 实例中，动态查找最后一个 name 为`todoList`进行数据拉取。

```javascript title="EditTodo Component"
const { fetch } = useFetcher();

// 在事件中触发数据拉取
const handleSubmit = () => {
  // 提交数据...
  await fetch({
    name: 'todoList',
    filter: (method, index, ary) => {
      // 返回true来指定需要拉取的Method实例
      return index === ary.length - 1;
    }
  });
};
```

:::warning 注意事项

useFetcher 请求完成后只更新缓存，且如果发现这个 Method 实例在之前使用过 useHook 请求过，那么也会更新这个 useHook 创建的`data`状态，从而保证页面数据一致，这是`useFetcher`用于跨模块/组件更新视图的保证。

:::

> 更多 method 匹配器的使用方法见 [method 匹配器](/tutorial/advanced/method-matcher)。

## 强制发送请求

和`useRequest`和`useWatcher`相同，更多请阅读[强制请求](/tutorial/cache/force-request)。

## 绑定响应回调

useFetcher 也支持绑定`onSuccess/onError/onComplete`回调函数。

```javascript
const { onSuccess, onError, onComplete } = useFetcher();
```

具体请阅读[响应处理](/tutorial/combine-framework/response)。

## send 函数参数传递规则

与`useRequest`和`useWatcher`不同的是，fetch 函数的自定义参数是从第二个参数开始的，它们也将分别被事件回调和`force`函数接收。

```javascript
const { onSuccess, fetch } = useFetcher();
onSuccess(({ sendArgs }) => {
  // sendArgs的值为['test arg']
});

fetch(getTodoList(), 'test arg');
```

具体请阅读[send 函数参数传递规则](/tutorial/combine-framework/receive-params)。

## useRequest 与 useFetcher 对比

1. useFetcher 不返回`data`字段，预拉取的数据将保存在缓存中，以及更新对应位置的状态数据;
2. 将`loading`改名为了`fetching`;
3. 没有`send`函数，但多了一个`fetch`函数，可以重复利用 fetch 函数拉取不同接口的数据，此时你可以使用 `fetching` 和 `error` 状态统一渲染视图，从而达到统一处理的目的;
