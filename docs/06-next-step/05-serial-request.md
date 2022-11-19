---
title: Serial Request
sidebar_position: 50
---

Let the first request be sent automatically, and the second request will be triggered in the `onSuccess` callback of the first request to complete the serial request. The serial request can be completed by the following writing method:

```javascript
//
const { data: todoList, onSuccess } = useRequest(todoListGetter);
const { data: todoDetail, send: sendTodoDetail } = useRequest(todoId => todoDetailGetter(todoId), { immediate: false });

// Get the list first, then get the details of the first todo
onSuccess(todoList => {
  sendTodoDetail(todoList[0].id);
});
```
