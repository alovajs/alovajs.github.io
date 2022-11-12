---
title: 状态变化请求
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


`useWatcher` 用于监听指定的状态变化时立即发送请求，主要用于数据随状态变化而更新的场景，如分页、数据筛选、模糊搜索。

## 关键字搜索
接下来我们以搜索 todo 项为例。
<Tabs>
<TabItem value="1" label="vue">

```html
<template>
	<!-- keyword随着输入内容变化而变化 -->
	<input v-model="keyword" />

	<!-- 渲染筛选后的todo列表 -->
	<div v-if="loading">Loading...</div>
	<template v-else>
		<div v-for="todo in data">
			<div class="todo-title">{{ todo.title }}</div>
			<div class="todo-time">{{ todo.time }}</div>
		</div>
	</template>
</template>

<script setup>
// 创建method实例
const filterTodoList = keyword => {
	return alovaInstance.Get('/tood/list/search', {
		params: {
			keyword
		}
	});
};
const keyword = ref('');
const {
	loading,
	data,
	error

	// 第一个参数必须为返回method实例的函数
} = useWatcher(
	() => filterTodoList(keyword.value),

	// 被监听的状态数组，这些状态变化将会触发一次请求
	[keyword],
	{
		// 设置500ms防抖，如果keyword频繁变化，只有在停止变化后500ms才发送请求
		debounce: 500
	}
);
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
// 创建method实例
const filterTodoList = keyword => {
	return alovaInstance.Get('/tood/list/search', {
		params: {
			keyword
		}
	});
};

const App = () => {
	const [keyword, setKeyword] = useState('');
	const {
		loading,
		data,
		error
		// 第一个参数必须为返回method实例的函数
	} = useWatcher(
		() => filterTodoList(keyword),

		// 被监听的状态数组，这些状态变化将会触发一次请求
		[keyword],
		{
			// 设置500ms防抖，如果keyword频繁变化，只有在停止变化后500ms才发送请求
			debounce: 500
		}
	);
	
	return <>
		{/* keyword随着输入内容变化而变化 */}
		<input value={keyword} onInput={e => setKeyword(e.target.value)} />

		{/* 渲染筛选后的todo列表 */}
		{ loading ? <div>Loading...</div> : null }
		{ !loading ? (
			<>
				{
					data.map(todo => <div>
						<div class="todo-title">{ todo.title }</div>
						<div class="todo-time">{ todo.time }</div>
					</div>)
				}
			</>
		) : null }
	</>;
}
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
import { writable } from 'svelte/store';

// 创建method实例
const filterTodoList = text => {
	return alovaInstance.Get('/tood/list/search', {
		params: {
			keyword: text
		}
	});
};
const keyword = writable('');

const {
	loading,
	data,
	error

	// 第一个参数必须为返回method实例的函数
} = useWatcher(
	() => filterTodoList($keyword),

	// 被监听的状态数组，这些状态变化将会触发一次请求
	[keyword],
	{
		// 设置500ms防抖，如果keyword频繁变化，只有在停止变化后500ms才发送请求
		debounce: 500
	}
);

const updateKeyword = e => {
	$keyword = e.target.value;
}
</script>
<!-- keyword随着输入内容变化而变化 -->
<input value={$keyword} on:input={updateKeyword} />

<!-- 渲染筛选后的todo列表 -->
{#if $loading}
	<div>Loading...</div>
{:else}
	{#each $data as todo}
		<div>
			<div class="todo-title">{ todo.title }</div>
			<div class="todo-time">{ todo.time }</div>
		</div>
	{/each}
{/if}
```

</TabItem>
</Tabs>

## 分页
以 todo 列表分页请求为例，你可以这样做。

<Tabs>
<TabItem value="1" label="vue">

```html
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

const currentPage = ref(1);
const {
	loading,
	data,
	error

	// 第一个参数为返回method实例的函数，而非method实例本身
} = useWatcher(
	() => getTodoList(currentPage.value),
	// 被监听的状态数组，这些状态变化将会触发一次请求
	[currentPage],
	{
		// ⚠️调用useWatcher默认不触发，注意和useRequest的区别
		// 手动设置immediate为true可以初始获取第1页数据
		immediate: true
	}
);
</script>
```

</TabItem>
<TabItem value="2" label="react">

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
	const [currentPage, setCurrentPage] = useState(1);
	const {
		loading,
		data,
		error

		// 第一个参数为返回method实例的函数，而非method实例本身
	} = useWatcher(
		() => getTodoList(currentPage),
		// 被监听的状态数组，这些状态变化将会触发一次请求
		[currentPage],
		{
			// ⚠️调用useWatcher默认不触发，注意和useRequest的区别
			// 手动设置immediate为true可以初始获取第1页数据
			immediate: true
		}
	);

	return (
		{/* ... */}
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
	return alovaInstance.Get('/tood/list', {
		params: {
			currentPage,
			pageSize: 10
		}
	});
};

const currentPage = writable(1);
const {
	loading,
	data,
	error

	// 第一个参数为返回method实例的函数，而非method实例本身
} = useWatcher(
	() => getTodoList($currentPage),
	// 被监听的状态数组，这些状态变化将会触发一次请求
	[currentPage],
	{
		// ⚠️调用useWatcher默认不触发，注意和useRequest的区别
		// 手动设置immediate为true可以初始获取第1页数据
		immediate: true
	}
);
</script>

<!-- ... -->
```

</TabItem>
</Tabs>

## 手动发送请求
有时候你希望在监听状态未变化时重新发送请求（如服务端数据已更新），你也可以通过`send`函数手动触发请求，用法和`useRequest`相同。
```javascript
const {
	// ...
  // highlight-start
	send,
  // highlight-end
} = useWatcher(
	() => getTodoList($currentPage),
	// 被监听的状态数组，这些状态变化将会触发一次请求
	[currentPage],
	{
		immediate: true
	}
);

// highlight-start
send();
// highlight-end
```

## send函数参数传递规则
在上面的示例中，调用send函数手动触发请求，它可以接受任意多个参数，这些参数将分别被以下4个函数接收：

### useWatcher回调函数
useWatcher的回调函数可接收到，具体如下：
```javascript
const { send } = useWatcher(currentPage => getTodoList(currentPage));
send(1);	// 上面回调函数中的currentPage将接收到1
```
### onSuccess回调函数
onSuccess设置的回调中从第二个参数开始接收（第一个参数为响应数据）
```javascript
const { send, onSuccess } = useWatcher(currentPage => getTodoList(currentPage));
onSuccess((responseData, currentPage) => {
	// responseData为响应的数据
	// currentPage将接收到1
});
send(1);
```

### onError回调函数
onError设置的回调中从第二个参数开始接收（第一个参数为错误对象）
```javascript
const { send, onError } = useWatcher(currentPage => getTodoList(currentPage));
onError((err, currentPage) => {
	// err为请求错误时抛出的Error对象
	// currentPage将接收到1
});
send(1);
```

### onComplete回调函数
4. onComplete设置的回调中从第一个参数开始接收
```javascript
const { send, onComplete } = useWatcher(currentPage => getTodoList(currentPage));
onComplete(id => {
	// currentPage将接收到1
});
send(1);
```


## 设置初始响应数据
一个页面在获取到初始数据前，不可避免地需要等待服务端响应，在响应前一般需要先将状态初始化为一个空数组或空对象，以免造成页面报错，我们可以在`useWatcher`中的第二个参数实现初始数据的设置。
```javascript
// 在useWatcher中同样可以设置data的初始值
const {
  // 响应前data的初始值为[]，而不是undefined
  data
} = useWatcher(
	() => getTodoList(/* 参数 */),
	[/* 监听状态 */],
	{
		initialData: []
	}
);
```


## 请求防抖
通常我们都会在频繁触发的事件层面编写防抖代码，这次我们在请求层面实现了防抖功能，这意味着你再也不用在模糊搜索功能中自己实现防抖了，用法也非常简单。
```javascript
const {
  loading,
  data,
  error
} = useWatcher(() => filterTodoList(keyword), 
  [keyword], {

    // highlight-start
    // 设置debounce属性，单位为毫秒
    // 如这边的keyword频繁变化，只有在停止变化后500ms才发送请求
    debounce: 500,
    // highlight-end
  }
);
```


## 手动中断请求
未设置`timeout`参数时请求是永不超时的，如果需要手动中断请求，可以在`useWatcher`函数被调用时接收`abort`方法。
```javascript
const {
  // ...
  // highlight-start
  // abort函数用于中断请求
  abort
  // highlight-end
} = useWatcher(() => filterTodoList(keyword), [keyword]);

// highlight-start
// 调用abort即可中断请求
const handleCancel = () => {
  abort();
};
// highlight-end
```