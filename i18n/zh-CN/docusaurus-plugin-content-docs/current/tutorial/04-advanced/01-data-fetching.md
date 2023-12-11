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

你可以用它预拉取数据并保存到缓存中，或优雅地跨组件更新状态，例如修改 todo 列表的某一项后重新拉取最新数据，响应后将会刷新界面

## 跨模块/组件更新视图

下面我们来实现修改某个 todo 数据，并重新拉取最新的 todo 列表数据，让视图更新。p

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- 渲染统一的拉取状态。 -->
  <div v-if="fetching">{{ 正在后台拉取数据... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">修改todo项</button>
</template>

<script setup>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
      // 详见后续的《Method实例匹配器》章节
      name: 'todoList',
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
  } = useFetcher();

  // 在事件中触发数据拉取
  const handleSubmit = () => {
    // todo项修改...

    // 开始拉取更新后的数据
    // 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
    fetch(getTodoList(1));

    // 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // 返回true来指定需要拉取的Method实例
        return index === ary.length - 1;
      }
    });
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const getTodoList = currentPage => {
	return alovaInstance.Get('/todo/list', {
		// 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
		// 详见后续的《Method实例匹配器》章节
		name: 'todoList',
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
	} = useFetcher();

	// 在事件中触发数据拉取
	const handleSubmit = () => {
		// 假设已完成todo项的修改...

		// 开始拉取更新后的数据
		// 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
		fetch(getTodoList(1));

		// 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
		fetch({
			name: 'todoList',
			filter: (method, index, ary) => {
				// 返回true来指定需要拉取的Method实例
				return index === ary.length - 1;
			}
		});
	};

	return (
		{/* 渲染统一的拉取状态 */}
		{ fetching ? <div>{{ 正在后台拉取数据... }}</div> : null }
		{/* ... */}
		<button onClick={handleSubmit}>修改todo项</button>
	);
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
      // 详见后续的《Method实例匹配器》章节
      name: 'todoList',
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
  } = useFetcher();

  // 在事件中触发数据拉取
  const handleSubmit = () => {
    // 假设已完成todo项的修改...

    // 开始拉取更新后的数据
    // 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
    fetch(getTodoList(1));

    // 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
    fetch({
      name: 'todoList',
      filter: (method, index, ary) => {
        // 返回true来指定需要拉取的Method实例
        return index === ary.length - 1;
      }
    });
  };
</script>

<!-- 渲染统一的拉取状态 -->
{#if $fetching}
<div>{{ 正在后台拉取数据... }}</div>
{/if}
<!-- ... -->
<button on:click="{handleSubmit}">修改todo项</button>
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <!-- 渲染统一的拉取状态。 -->
  <div v-if="fetcher.fetching">{{ 正在后台拉取数据... }}</div>

  <!-- ... -->
  <button @click="handleSubmit">修改todo项</button>
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher } from 'alova';

  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      // 注意：这边设置了name属性，用于在无法直接指定Method实例时，过滤出需要的Method实例
      // 详见后续的《Method实例匹配器》章节
      name: 'todoList',
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function () {
      const {
        // fetching属性与loading相同，发送拉取请求时为true，请求结束后为false
        fetching,
        error,
        onSuccess,
        onError,
        onComplete,

        // 调用fetch后才会发送请求拉取数据，可以重复调用fetch多次拉取不同接口的数据
        fetch
      } = (fetcherStates = useFetcher());
      return {
        fetcher: fetcherStates
      };
    }),
    methods: {
      // 在事件中触发数据拉取
      handleSubmit() {
        // 开始拉取更新后的数据
        // 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method实例
        this.fetcher$fetch(getTodoList(1));

        // 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method实例匹配器来筛选
        this.fetcher$fetch({
          name: 'todoList',
          filter: (method, index, ary) => {
            // 返回true来指定需要拉取的Method实例
            return index === ary.length - 1;
          }
        });
      }
    }
  };
</script>
```

</TabItem>
</Tabs>

> 更多`Method`实例匹配器的使用方法见 [Method 实例匹配器](/tutorial/advanced/method-matcher)

## 预加载数据

以下实现 todo 列表分页场景下，下一页数据的预加载功能。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<template>
  <!-- ... -->
</template>

<script setup>
  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const { fetch } = useFetcher();

  const currentPage = ref(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage.value), [currentPage], {
    immediate: true
  });

  // 当前页请求成功时预拉取下一页的数据
  // 实现当翻页到下一页时不需要等待请求
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
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const App = () => {
  const { fetch } = useFetcher();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, onSuccess } = useWatcher(() => getTodoList(currentPage), [currentPage], {
    immediate: true
  });

  // 当前页请求成功时预拉取下一页的数据
  // 实现当翻页到下一页时不需要等待请求
  onSuccess(() => {
    fetch(getTodoList(currentPage + 1));
  });

  return {
    /* ... */
  };
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
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  const { fetch } = useFetcher();
  const currentPage = writable(1);
  const { data, onSuccess } = useWatcher(() => getTodoList($currentPage), [currentPage], {
    immediate: true
  });

  // 当前页请求成功时预拉取下一页的数据
  // 实现当翻页到下一页时不需要等待请求
  onSuccess(() => {
    fetch(getTodoList($currentPage + 1));
  });
</script>

<!-- views... -->
```

</TabItem>
<TabItem value="4" label="vue options">

```html
<template>
  <!-- ... -->
</template>

<script>
  import { mapAlovaHook } from '@alova/vue-options';
  import { useFetcher, useWatcher } from 'alova';

  // method实例创建函数
  const getTodoList = currentPage => {
    return alovaInstance.Get('/todo/list', {
      params: {
        currentPage,
        pageSize: 10
      }
    });
  };

  export default {
    mixins: mapAlovaHook(function () {
      return {
        fetcher: useFetcher(),
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
      // 当前页请求成功时预拉取下一页的数据
      // 实现当翻页到下一页时不需要等待请求
      this.paging$onSuccess(() => {
        this.fetcher$fetch(getTodoList(this.currentPage + 1));
      });
    }
  };
</script>
```

</TabItem>
</Tabs>

:::warning 注意事项

useFetcher 请求完成后只更新缓存，且如果发现该`Method`实例下还有`data`状态，也会同步更新它，从而保证页面数据一致，这是`useFetcher`用于跨模块/组件更新视图的保证。

:::

## 强制发送请求

和`useRequest`和`useWatcher`相同，更多请阅读[强制请求](/tutorial/cache/force-request)。

## 绑定响应回调

在上面的示例中，调用 fetch 函数触发数据拉取，fetch 函数还可以从第二个参数开始传入自定义的参数，这些参数也将分别被`onSuccess/onError/onComplete`的回调函数，以及`force`函数接收，具体请阅读[手动发送请求](/tutorial/getting-started/request-manually)中的 **send 函数参数传递规则**部分。

## 与 useRequest 和 useFetcher 的差异对比

1. useFetcher 不返回`data`字段，预拉取的数据将保存在缓存中，以及更新对应位置的状态数据;
2. 将`loading`改名为了`fetching`;
3. 没有`send`函数，但多了一个`fetch`函数，可以重复利用 fetch 函数拉取不同接口的数据，此时你可以使用 `fetching` 和 `error` 状态统一渲染视图，从而达到统一处理的目的;
