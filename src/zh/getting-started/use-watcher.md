---
title: 状态变化请求
order: 50
---


`useWatcher` 用于监听指定的状态变化，然后立即发送请求，在分页、数据筛选、模糊搜索等场景很有用。同时如果你希望更新服务端数据，接下来我们以搜索 todo 项为例。

```javascript
// 创建method实例
const filterTodoList = text => {
	return alova.Get('/tood/list/search', {
		params: {
			searchText: text
		}
	});
};
const searchText = ref(''); // Vue3
// const [searchText, setSearchText] = useState('');   // React16

const {
	loading,
	data: todoList,
	error

	// 第一个参数必须为返回method实例的函数
} = useWatcher(
	() => filterTodoList(searchText.value),

	// 被监听的状态数组，这些状态变化将会触发一次请求
	[searchText],
	{
		// 设置500ms防抖，如果searchText频繁变化，只有在停止变化后500ms才发送请求
		debounce: 500
	}
);
```

```html
<!-- searchText随着输入内容变化而变化 -->
<input v-model="searchText" />

<!-- 渲染筛选后的todo列表 -->
<div v-if="loading">Loading...</div>
<template v-else>
	<div v-for="todo in todoList">
		<div class="todo-title">{{ todo.title }}</div>
		<div class="todo-time">{{ todo.time }}</div>
	</div>
</template>
```

如果要用在 todo 列表分页请求，你可以这样做。

```javascript
// method实例创建函数
const getTodoList = currentPage => {
	return alova.Get('/tood/list', {
		params: {
			currentPage,
			pageSize: 10
		}
	});
};

const currentPage = ref(1); // Vue3
const {
	loading,
	data: todoList,
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
```

> ⚠️ 如果你只希望重新请求当前页的数据（可能是数据更新了），你也可以手动触发请求，用法和`useRequest`相同。