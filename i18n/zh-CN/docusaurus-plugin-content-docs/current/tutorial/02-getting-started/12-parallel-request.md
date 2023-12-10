---
title: 并行请求
sidebar_position: 120
---

简单的并行请求，只需要同时调用多个 useRequest 即可。

```javascript
const { data: todoList } = useRequest(todoListGetter);
const { data: todoCounter } = useRequest(todoCountGetter);
```

但这样的请求只适用于单纯的并行请求，如果你需要在并行请求都完成后再进行某些操作，有以下两种方式可以实现：

## 方式 1

手动创建 promise 对象，并使用`Promise.all`完成效果。

```javascript
const { data: todoList, onSuccess: onListSuccess, onError: onListError } = useRequest(todoListGetter);
const { data: todoCounter, onSuccess: onCountSuccess, onError: onCountError } = useRequest(todoCountGetter);

// 手动创建promise对象
const listPromise = new Promise((resolve, reject) => {
  onListSuccess(resolve);
  onListError(reject);
});
const countPromise = new Promise((resolve, reject) => {
  onCountSuccess(resolve);
  onCountError(reject);
});
const [listEvent, countEvent] = await Promise.all([listPromise, countPromise]);
// 并行请求完成，继续处理业务...
```

## 方式 2

使用`useRequest`函数返回的`send`函数，调用`send`将会返回一个可用的 promise 对象。

```javascript
// 先让它们不自动发送请求
const { send: sendList } = useRequest(todoListGetter, { immediate: false });
const { send: sendCount } = useRequest(todoCountGetter, { immediate: false });

// 利用send函数返回的promise对象
const parallelRequest = async () => {
  const [listResponse, countResponse] = await Promise.all([sendList(), sendCount()]);
  // 并行请求完成，继续处理业务...
};
```
