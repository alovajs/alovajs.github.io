---
title: Parallel Request
---

## Use method

Since method is a PromiseLike instance, to send parallel requests through method, you only need to use `Promise.all` to wait.

```javascript
const [todoList, todoCounter] = await Promise.all[(todoListGetter, todoCountGetter)];
```

## Use useRequest

For simple parallel requests, you only need to call multiple useRequests at the same time.

```javascript
const { data: todoList } = useRequest(todoListGetter);
const { data: todoCounter } = useRequest(todoCountGetter);
```

However, such requests are only applicable to simple parallel requests. If you need to perform some operations after all parallel requests are completed, there are two ways to achieve it:

### Method 1

Manually create a promise object and use `Promise.all` to complete the effect.

```javascript
const {
  data: todoList,
  onSuccess: onListSuccess,
  onError: onListError
} = useRequest(todoListGetter);
const {
  data: todoCounter,
  onSuccess: onCountSuccess,
  onError: onCountError
} = useRequest(todoCountGetter);

// Manually create a promise object
const listPromise = new Promise((resolve, reject) => {
  onListSuccess(resolve);
  onListError(reject);
});
const countPromise = new Promise((resolve, reject) => {
  onCountSuccess(resolve);
  onCountError(reject);
});
const [listEvent, countEvent] = await Promise.all([listPromise, countPromise]);
// Parallel requests completed, continue processing business...
```

### Method 2

Use the `send` function returned by the `useRequest` function. Calling `send` will return a usable promise object.

```javascript
// First, let them not automatically send requests
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendCount } = useRequest(todoCountGetter, { immediate: false });

// Use the promise object returned by the send function
const parallelRequest = async () => {
  const [listResponse, countResponse] = await Promise.all([sendList(), sendCount()]);
  // Parallel requests completed, continue processing business...
};
```
