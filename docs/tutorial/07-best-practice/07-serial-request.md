---
title: Serial Request
sidebar_position: 70
---

## Use method

Since method is a PromiseLike instance, you can use `await` to wait for the request to succeed.

```javascript
const todoList = await todoListGetter;
const todoDetail = await todoDetailGetter(todoList[0].id);
```

## Use useRequest

Serial requests also have two modes.

### Method 1

Let the first request be automatically sent, and the second request is triggered in the `onSuccess` callback of the first request to complete the serial request. The serial request can be completed by writing as follows:

```javascript
//
const { data: todoList, onSuccess } = useRequest(todoListGetter);
const { data: todoDetail, send: sendTodoDetail } = useRequest(
  todoId => todoDetailGetter(todoId),
  { immediate: false }
);

// Get the list first, then get the details of the first todo
onSuccess(event => {
  sendTodoDetail(event.todoList[0].id);
});
```

### Method 2

Use the `send` function returned by the `useRequest` function. Calling `send` will return a usable promise object.

```javascript
// First, let them not automatically send requests
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendTodoDetail } = useRequest(todoId => todoDetailGetter(todoId), {
  immediate: false
});

// Use the promise object returned by the send function
const serialRequest = async () => {
  const todoList = await sendList();
  const todoDetail = await sendTodoDetail(todoList[0].id);
  // Serial request completed, continue processing business...
};
```
