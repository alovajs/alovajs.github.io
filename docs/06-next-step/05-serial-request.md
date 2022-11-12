---
title: 串行请求
sidebar_position: 50
---

让第一个请求自动发出，第二个请求在第一个请求的`onSuccess`回调中触发，即可完成串行请求，可通过以下写法完成串行请求：
```javascript
// 
const {
  data: todoList,
  onSuccess,
} = useRequest(todoListGetter);
const {
  data: todoDetail,
  send: sendTodoDetail
} = useRequest(todoId => todoDetailGetter(todoId), { immediate: false });

// 先获取列表，再获取第一个todo的详情
onSuccess(todoList => {
  sendTodoDetail(todoList[0].id);
});
```