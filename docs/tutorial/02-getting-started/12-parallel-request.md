---
title: Parallel Requests
sidebar_position: 120
---

Simple parallel requests only need to call multiple useRequest at the same time.

```javascript
const { data: todoList } = useRequest(todoListGetter);
const { data: todoCounter } = useRequest(todoCountGetter);
```

But this kind of request is only suitable for pure parallel requests. If you need to perform some operations after the parallel requests are completed, there are two ways to achieve it:

## Approach 1

Create promise objects manually, and use `Promise.all` to complete the effect.

```javascript
const { data: todoList, onSuccess: onListSuccess, onError: onListError } = useRequest(todoListGetter);
const { data: todoCounter, onSuccess: onCountSuccess, onError: onCountError } = useRequest(todoCountGetter);

// Manually create the promise object
const listPromise = new Promise((resolve, reject) => {
  onListSuccess(resolve);
  onListError(reject);
});
const countPromise = new Promise((resolve, reject) => {
  onCountSuccess(resolve);
  onCountError(reject);
});
const [listEvent, countEvent] = await Promise.all([listPromise, countPromise]);
// The parallel request is completed, continue to process the business...
```

## Approach 2

Using the `send` function returned by the `useRequest` function, calling `send` will return an available promise object.

```javascript
// Let them not automatically send requests first
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendCount } = useRequest(todoCountGetter, { immediate: false });

// Use the promise object returned by the send function
const parallelRequest = async () => {
  const [listResponse, countResponse] = await Promise.all([sendList(), sendCount()]);
  // The parallel request is completed, continue to process the business...
};
```
