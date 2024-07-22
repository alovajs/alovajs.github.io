---
title: 串行请求
---

## 使用 method

由于 method 是 PromiseLike 实例，可以使用`await`等待请求成功。

```javascript
const todoList = await todoListGetter;
const todoDetail = await todoDetailGetter(todoList[0].id);
```

## 使用 useRequest

串行请求也具有两种方式。

### 方法 1

让第一个请求自动发出，第二个请求在第一个请求的`onSuccess`回调中触发，即可完成串行请求，可通过以下写法完成串行请求：

```javascript
//
const { data: todoList, onSuccess } = useRequest(todoListGetter);
const { data: todoDetail, send: sendTodoDetail } = useRequest(
  todoId => todoDetailGetter(todoId),
  { immediate: false }
);

// 先获取列表，再获取第一个todo的详情
onSuccess(event => {
  sendTodoDetail(event.todoList[0].id);
});
```

### 方法 2

使用`useRequest`函数返回的`send`函数，调用`send`将会返回一个可用的 promise 对象。

```javascript
// 先让它们不自动发送请求
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendTodoDetail } = useRequest(todoId => todoDetailGetter(todoId), {
  immediate: false
});

// 利用send函数返回的promise对象
const serialRequest = async () => {
  const todoList = await sendList();
  const todoDetail = await sendTodoDetail(todoList[0].id);
  // 串行请求完成，继续处理业务...
};
```
