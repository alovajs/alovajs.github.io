---
title: 串行请求
order: 50
---

## 串行请求
可通过以下写法完成串行请求：
```javascript
// 第一个请求自动发出，第二个请求等待第一个请求完成后再触发
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