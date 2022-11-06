---
title: Method实例匹配器
order: 30
---


当我们在处理完一些业务时，需要调用`invalidateCache`、`updateState`、`fetch`来失效缓存、手动更新缓存、或重新拉取数据，一般会有两种场景：
1. 开发者知道需要操作哪个请求的数据，此时在调用上面三个函数时直接传入一个`Method`对象即可；
2. 开发者只知道需要操作某个顺序位的请求，而不确定具体哪个，此时我们就可以使用`Method`对象匹配器的方式过滤出来。


`Method`对象匹配器是依据`Method`对象设置的`name`属性来过滤的，多个匹配器允许设置相同的`name`，因此首先需要为需要过滤的`Method`对象设置`name`属性。
```javascript
// 每次调用getTodoList时都会生成一个新的Method对象，它们的name是相同的
const getTodoList = currentPage => alovaInstance.Get('/tood/list', {
  name: 'todoList',
  params: {
    currentPage,
    pageSize: 10
  }
});
```
其次，我们在调用`invalidateCache`、`updateState`、`fetch`函数时传入匹配器即可，完整的`Method`对象匹配器的格式如下：
```javascript
type MethodFilter = {
  name: string | RegExp;
  filter: (method: Method, index: number, methods: Method[]) => boolean;
};
```
`name`表示需要匹配的`Method`对象，它匹配出来是一个数组，然后通过`filter`过滤函数筛选出最终使用的`Method`对象集合，`filter`函数返回true表示匹配成功，返回false表示失败，让我们来看几个例子。
```javascript
// 以下表示匹配name为'todoList'的所有Method对象，并失效它们的缓存
invalidateCache({
  name: 'todoList',
  filter: (method, index, methods) => true,
});

// 以下表示匹配name为以'todo'开头的所有Method对象
invalidateCache({
  name: /^todo/,
  filter: (method, index, methods) => true,
});

// 如果不需要设置过滤函数，也可以直接传入一个字符串或者正则表达式
invalidateCache('todoList');
invalidateCache(/^todo/);

// 以下表示重新拉取todo列表最后一次请求的数据
const { fetch } = useFetcher(alova);
fetch({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1,
});
```
要特别注意的是，`invalidateCache`会失效所有过滤出来的`Method`对象所对应的缓存，而`updateState`和`fetch`只会使用`Method`对象集合中的第一个项进行操作。