---
title: 发送请求
order: 10
---


接下来我们要来看看如何实际发出请求了，在`alova`中提供了`useRequest`、`useWatcher`、`useFetcher`三种`use hook`实现请求时机，由它们控制何时应该发出请求，同时将会为我们创建和维护状态化的请求相关数据，如`loading`、`data`、`error`等，省去了开发者自主维护这些状态的麻烦，下面我们来了解下它们。

## useRequest

它表示一次请求的发送，执行`useRequest`时默认会发送一次请求，在页面获取初始化数据时是最常用的方法。同时也支持关闭它的默认的请求发送，这在例如提交数据等通过点击事件触发的场景下非常有用。下面我们来发出对 todo 列表数据的请求。

```javascript
const {
	// loading是加载状态值，当加载时它的值为true，结束后自动更新为false
	// Vue3环境下（使用VueHook）：它是一个Ref类型的值，你可以通过loading.value访问它，或直接绑定到界面中
	// React16环境下（使用ReactHook）：它的值为普通的boolean值，请求状态变化时内部将调用setLoading函数更新它的值
	// 在Svelte环境下（使用SvelteHook）：它是一个Writable类型的值，内部将维护它的值
	loading,

	// 响应数据
	data: todoList,

	// 请求错误对象，请求错误时有值，否则为undefined
	error,

	// 成功回调绑定
	onSuccess,

	// 失败回调绑定
	onError,

	// 完成回调绑定
	onComplete

	// 直接将Method对象传入即可发送请求
} = useRequest(todoListGetter, {
	// 初始data数据
	initialData: []
});
onSuccess(todoListRaw => {
	console.log('请求成功，响应数据为:', todoListRaw);
});
onError(error => {
	console.log('请求失败，错误信息为:', error);
});
onComplete(() => {
	console.log('请求完成，不管成功失败都会调用');
});
```

你可以直接使用 todoList 来渲染 todo 列表

```html
<div v-if="loading">Loading...</div>
<div
	v-else-if="error"
	class="error">
	{{ error.message }}
</div>
<template v-else>
	<div v-for="todo in todoList">
		<div class="todo-title">{{ todo.title }}</div>
		<div class="todo-time">{{ todo.time }}</div>
	</div>
</template>
```

当你需要创建一条新的 todo 项时，可以先关闭默认发送请求，转为手动触发请求。然后将 useRequest 的第一个参数改为返回`Method`对象的函数，该函数在触发请求时被调用。

```javascript
const createTodoPoster = newTodo => alova.Post('/todo', newTodo);

const {
	loading,
	data,
	error,

	// 手动发送器请求的函数，调用后发送请求
	send: addTodo
} = useRequest(newTodo => createTodoPoster(newTodo), {
	// 当immediate为false时，默认不发出
	immediate: false
});

// 手动发送请求
const handleAddTodo = () => {
	/** 手动触发函数可接受任意个参数，这些参数将被传入4个函数
	 * 1. useRequest的第一个参数为回调函数时可以接收到
	 * 2. onSuccess设置的回调中从第二个参数开始接收（第一个参数为响应数据）
	 * 3. onError设置的回调中从第二个参数开始接收（第一个参数为错误对象）
	 * 4. onComplete设置的回调中从第一个参数开始接收
	 *
	 * 返回：一个Promise对象，可接收响应数据
	 */
	const newTodo = {
		title: '新的todo项',
		time: new Date().toLocaleString()
	};
	addTodo(newTodo)
		.then(result => {
			console.log('新增todo项成功，响应数据为:', result);
		})
		.catch(error => {
			console.log('新增todo项失败，错误信息为:', error);
		});
};
```

## 设置初始响应数据
一个页面在获取到初始数据前，不可避免地需要等待服务端响应，在响应前一般需要先将状态初始化为一个空数组或空对象，以免造成页面报错，我们可以在`useRequest`和`useWatcher`中的第二个参数实现初始数据的设置。
```javascript
// 在useRequest中设置初始数据
const {
  // 响应前data的初始值为[]，而不是undefined
  data
} = useRequest(todoListGetter, {
  initialData: []
});

// 在useWatcher中设置的方法相同
const {
  // 响应前data的初始值为[]，而不是undefined
  data
} = useWatcher(() => getTodoList(/* 参数 */), [/* 监听状态 */], {
  initialData: []
});
```

## 手动发送请求
...

## 参数传递
...

## 手动中断请求
未设置`timeout`参数时请求是永不超时的，如果需要手动中断请求，可以在`useRequest`、`useWatcher`函数被调用时接收`abort`方法。
```javascript
const {
  // 省略其他参数...

  // abort函数用于中断请求
  abort
} = useRequest(todoListGetter);

// 调用abort即可中断请求
const handleCancel = () => {
  abort();
};
```