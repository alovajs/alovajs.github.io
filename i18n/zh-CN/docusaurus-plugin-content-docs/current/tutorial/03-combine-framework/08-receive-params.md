---
title: 接收参数
sidebar_position: 80
---

在`useRequest`和`useWatcher`中我们都可以调用`send`函数手动触发请求，send 函数触发请求时候，可以传入任意多个参数，这些参数其实可以分别被以下 3 个位置接收。

## 在 method handler 中接收

当它们的第一个参数设置为回调函数时可以接收到，这通常在删除列表项时很有用，具体如下：

```javascript
const { send } = useRequest(id =>
  // id将接收到1
  removeTodoPoster(id)
);
send(1);
```

```javascript
const { send } = useWatcher(
  userId =>
    // userId将接收到2
    todoListGetter(userId),
  [condition]
);
send(2);
```

## 在事件回调函数中接收

在事件回调函数中通过`event.sendArgs`接收，它是一个包含了 send 函数的所有参数的数组。

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

## 在 force 函数中接收

force 用于指定是否需要穿透响应缓存，关于响应缓存的内容将在后面的[缓存模式](/tutorial/cache/mode)中讲解。

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {
    return !!id;
  }
});
send(1);
```

```javascript
const { send } = useWatcher(alovaInstance.Get('/todo'), [condition], {
  force: id => {
    return !!id;
  }
});
send(1);
```
