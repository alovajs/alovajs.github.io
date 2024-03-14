---
title: 手动失效
sidebar_position: 30
---

通常，自动失效缓存更加简洁，并且推荐优先使用它来失效缓存，当自动失效缓存不满足需求时，你还可以通过调用`invalidateCache`来失效缓存。

## 使用 method 实例失效缓存

在 `invalidateCache` 函数中传入一个 method 实例，它将查找此实例下的缓存进行失效。

在下面的例子中，当提交成功后，将使这条 todo 详情数据缓存失效。

```javascript
// 获取 id 为 1 的 todo 详情数据
const getTodoDetail = id =>
  alovaInstance.Get(`/todo/${id}`, {
    localCache: 1000000
  });
const { loading, data } = useRequest(getTodoDetail(1));
```

```javascript
// 提交数据并让 id 为 1 的 todo 详情数据失效。
const {
  // ...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });

// highlight-start
// 提交成功后失效缓存
onSuccess(() => {
  invalidateCache(getTodoDetail(1));
});
// highlight-end

const handleSubmit = () => {
  send({
    title: 'new todo',
    content: 'new todo content'
  });
}；
```

## 批量失效缓存

在下面的例子中，我们通过指定缓存的名称或名称的正则表达式来批量失效缓存。

```javascript
// 名称为todoList的method的缓存将失效
invalidateCache('todoList');

// 名称符合以下正则表达式的method的缓存将失效
invalidateCache(/^todoList/);
```

## 动态失效缓存

可能有时候你并不确定需要失效哪个缓存数据，我们可以使用 [method 匹配器](/tutorial/advanced/method-matcher) 来动态查找对应的 method 实例。以下例子展示了如何让名称为 todoList 的前 5 个 method 实例的缓存失效。

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

> 更多 method 匹配器的使用方法见 [method 匹配器](/tutorial/advanced/method-matcher)

## 失效所有缓存

```javascript
// 当不传任何参数时，失效所有响应缓存
invalidateCache();
```
