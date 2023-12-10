---
title: Serial request
sidebar_position: 130
---

Serial requests also have two ways

## Approach 1

Let the first request be sent automatically, and the second request will be triggered in the `onSuccess` callback of the first request to complete the serial request. The serial request can be completed in the following way:

```javascript
//
const { data: todoList, onSuccess } = useRequest(todoListGetter);
const { data: todoDetail, send: sendTodoDetail } = useRequest(todoId => todoDetailGetter(todoId), { immediate: false });

// Get the list first, and then get the details of the first todo
onSuccess(event => {
  sendTodoDetail(event.todoList[0].id);
});
```

## Approach 2

Using the `send` function returned by the `useRequest` function, calling `send` will return a usable promise object.

```javascript
// Let them not automatically send requests first
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendTodoDetail } = useRequest(todoId => todoDetailGetter(todoId), { immediate: false });

// Use the promise object returned by the send function
const serialRequest = async () => {
  const todoList = await sendList();
  const todoDetail = await sendTodoDetail(todoList[0].id);
  // The serial request is completed, continue to process the business...
};
```
