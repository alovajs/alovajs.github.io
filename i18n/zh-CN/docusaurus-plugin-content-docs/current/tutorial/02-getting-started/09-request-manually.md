---
title: 手动发送请求
sidebar_position: 90
---

## 关闭立即发送请求

`useRequest` 在调用时默认会立即发送请求，当需要使用`useRequest`提交数据时，例如创建一条新的 todo 项，可以先关闭默认发送请求，转为手动触发请求，并在 useRequest 中接收`send`函数用于手动发送请求，`send`函数将返回带响应数据的 Promise 实例，它将在请求响应后改为 resolve 状态。

此时为了接收`send`函数传入参数，可以将`useRequest`的第一个参数设置为函数。

```javascript
const {
  // ...
  // 手动发送器请求的函数，调用后发送请求
  send: addTodo

  // 在这边将会接收到 send 函数的参数
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // 当immediate为false时，默认不发出
  immediate: false
});

// 手动发送请求
const handleAddTodo = () => {
  const newTodo = {
    title: '新的todo项',
    time: new Date().toLocaleString()
  };
  // send函数返回一个Promise对象，可接收响应数据
  addTodo(newTodo)
    .then(result => {
      console.log('新增todo项成功，响应数据为:', result);
    })
    .catch(error => {
      console.log('新增todo项失败，错误信息为:', error);
    });
};
```

`send`函数可以让你自由地重复发起请求。

> `[2.9.0+]`在 react 中，send 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

## send 函数参数传递规则

在上面的示例中，send 函数触发请求时候，可以传入任意多个参数，这些参数其实可以分别被以下 5 个函数接收：

### 在 useRequest 回调函数中接收

当 useRequest 的第一个参数设置为回调函数时可以接收到，这通常在删除列表项时很有用，具体如下：

```javascript
const { send } = useRequest(id => removeTodoPoster(id));
send(1); // 上面回调函数中的id将接收到1
```

### 在 onSuccess、onError、onComplete 回调函数中接收

onSuccess、onError、onComplete 回调函数中的`event.sendArgs`以数组形式接收

```javascript
const { send, onSuccess, onError, onComplete } = useRequest(newTodo => alovaInstance.Post('/todo', newTodo));
onSuccess(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
onError(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
onComplete(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});

// 发送请求
send(1);
```

### 在 force 函数中接收

force 用于指定是否需要穿透响应缓存，关于响应缓存的内容将在后面的[缓存-强制请求](/tutorial/cache/force-request)讲解。

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {
    return !!id;
  }
});
send(1);
```
