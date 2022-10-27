---
title: 数据拉取
order: 30
---

`useFetcher` 它用于拉取数据，响应数据不能直接接收到，`useFetcher`的使用场景如下：

1. 预加载后续流程中将会使用到的数据并存放在缓存中，让用户不再等待数据加载的过程；
2. 跨页面刷新界面数据，拉取的数据在页面中存在渲染时，它除了会更新缓存外还会更新响应状态，让界面刷新，例如修改 todo 列表的某一项后重新拉取最新数据，响应后将会刷新界面。

与`useRequest`和`useWatcher`相比，`useFetcher`不返回`data`字段，将`loading`改名为了`fetching`，也没有`send`函数，但多了一个`fetch`函数，可以重复利用 fetch 函数拉取不同的数据，且使用同一个 fetching 和 error 等状态，从而达到统一处理的目的。

下面我们来实现修改某个 todo 数据，并重新拉取最新的 todo 列表数据，让界面刷新。

```javascript
const getTodoList = currentPage => {
	return alova.Get('/tood/list', {
		// 注意：这边设置了name属性，用于在无法直接指定Method对象时，过滤出需要的Method对象
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
	// 情况1：当你明确知道拉取todoList第一页数据时，传入一个Method对象
	fetch(getTodoList(1));

	// 情况2：当你只知道拉取todoList最后一次请求的数据时，通过Method对象匹配器来筛选
	fetch({
		name: 'todoList',
		filter: (method, index, ary) => {
			// 返回true来指定需要拉取的Method对象
			return index === ary.length - 1;
		}
	});
};
```

界面中还可以渲染统一的拉取状态。

```html
<div v-if="fetching">{{ 正在后台拉取数据... }}</div>
<!-- 省略todo参数设置相关的html -->
<button @click="handleSubmit">修改todo项</button>
```

`useFetcher` 请求完成后只更新缓存，且如果发现该`Method`对象下还有`data`状态，也会同步更新它，从而保证页面数据一致。它默认忽略缓存强制发起请求，你也可以通过以下方式关闭。
```javascript
useFetcher({
  force: false
});
```

更多关于强制发送请求的内容，查看 [进阶-强制发送请求](#强制发送请求)

至于`Method`对象匹配器，详细的使用方法见 [进阶-Method对象匹配器](#Method对象匹配器)