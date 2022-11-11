---
title: 数据拉取
sidebar_position: 30
---

当你有以下需求时：
1. 预加载后续流程中将会使用到的数据并存放在缓存中，让用户不再等待数据加载的过程；
2. 便捷地实现跨页面更新数据（类似全局状态），例如修改 todo 列表的某一项后重新拉取最新数据，响应后将刷新界面。

`useFetcher`就是用于实现以上场景的hook，通过它获取的响应数据不能直接接收到，但通过它拉取的数据除了会更新缓存外还会更新对应的状态，从而重新渲染视图。

你可以用它预拉取数据并保存到缓存中，或优雅地跨组件更新状态，例如修改 todo 列表的某一项后重新拉取最新数据，响应后将会刷新界面

与`useRequest`和`useWatcher`相比，`useFetcher`不返回`data`字段，将`loading`改名为了`fetching`，也没有`send`函数，但多了一个`fetch`函数，可以重复利用 fetch 函数拉取不同接口的数据，此时你可以使用 `fetching` 和 `error` 状态统一渲染视图，从而达到统一处理的目的。

## 跨模块/组件更新视图
下面我们来实现修改某个 todo 数据，并重新拉取最新的 todo 列表数据，让视图更新。

:::tabs

@tab vue

```html
<template>
	<!-- 渲染统一的拉取状态。 -->
	<div v-if="fetching">{{ 正在后台拉取数据... }}</div>

	<!-- ... -->
	<button @click="handleSubmit">修改todo项</button>
</template>

<script setup>
const getTodoList = currentPage => {
	return alovaInstance.Get('/tood/list', {
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

@tab react
```jsx
const getTodoList = currentPage => {
	return alovaInstance.Get('/tood/list', {
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

@tab svelte
```html
<script>
const getTodoList = currentPage => {
	return alovaInstance.Get('/tood/list', {
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
<button on:click={handleSubmit}>修改todo项</button>
```

:::

> 更多`Method`实例匹配器的使用方法见 [Method实例匹配器](../next-step/method-instance-matcher.html)


## 预加载数据
以下实现 todo 列表分页场景下，下一页数据的预加载功能。

:::tabs

@tab vue
```vue
<template>
	<!-- ... -->
</template>

<script setup>
// method实例创建函数
const getTodoList = currentPage => {
	return alovaInstance.Get('/tood/list', {
		params: {
			currentPage,
			pageSize: 10
		}
	});
};

const { fetch } = useFetcher();

const currentPage = ref(1);
const {
	data,
	onSuccess
} = useWatcher(
	() => getTodoList(currentPage.value),
	[currentPage],
	{
		immediate: true
	}
);

// 当前页请求成功时预拉取下一页的数据
// 实现当翻页到下一页时不需要等待请求
onSuccess(() => {
	fetch(getTodoList(currentPage.value + 1));
});
</script>
```

@tab react
```jsx
import { useState } from 'react';

// method实例创建函数
const getTodoList = currentPage => {
	return alovaInstance.Get('/tood/list', {
		params: {
			currentPage,
			pageSize: 10
		}
	});
};

const App = () => {
	const { fetch } = useFetcher();
	const [currentPage, setCurrentPage] = useState(1);
	const {
		data,
		onSuccess
	} = useWatcher(
		() => getTodoList(currentPage),
		[currentPage],
		{
			immediate: true
		}
	);

	// 当前页请求成功时预拉取下一页的数据
	// 实现当翻页到下一页时不需要等待请求
	onSuccess(() => {
		fetch(getTodoList(currentPage + 1));
	});

	return (
		{/* ... */}
	);
}
```

@tab svelte
```html
<script>
import { writable } from 'svelte/store';

// method实例创建函数
const getTodoList = currentPage => {
	return alovaInstance.Get('/tood/list', {
		params: {
			currentPage,
			pageSize: 10
		}
	});
};

const { fetch } = useFetcher();
const currentPage = writable(1);
const {
	data,
	onSuccess
} = useWatcher(
	() => getTodoList($currentPage),
	[currentPage],
	{
		immediate: true
	}
);

// 当前页请求成功时预拉取下一页的数据
// 实现当翻页到下一页时不需要等待请求
onSuccess(() => {
	fetch(getTodoList($currentPage + 1));
});
</script>

<!-- views... -->
```

:::


:::info 📢注意事项
1. `useFetcher` 请求完成后只更新缓存，且如果发现该`Method`实例下还有`data`状态，也会同步更新它，从而保证页面数据一致，这是`useFetcher`用于跨模块/组件更新视图的保证。

2. 它默认忽略缓存强制发起请求，你也可以通过以下方式关闭。
```javascript
useFetcher({
  force: false
});
```
:::

更多关于强制发送请求的内容，查看 [进阶-强制发送请求](#强制发送请求)