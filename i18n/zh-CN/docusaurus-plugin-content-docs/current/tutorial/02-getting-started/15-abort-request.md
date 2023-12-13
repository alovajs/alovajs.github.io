---
title: 中断请求
sidebar_position: 150
---

## 通过 useHook 函数中断请求

未设置`timeout`参数时请求是永不超时的，如果需要手动中断请求，可以在`useRequest/useWatcher`或函数被调用时接收`abort`方法。

```javascript
// useRequest
const {
  // ...
  // highlight-start
  // abort函数用于中断请求
  abort
  // highlight-end
} = useRequest(todoListGetter);

// useWatcher
const {
  // ...
  // highlight-start
  // abort函数用于中断请求
  abort
  // highlight-end
} = useRequest(todoListGetter, [page]);
```

然后再调用`abort`方法即可中断请求。

```javascript
const handleCancel = () => {
  abort();
};
```

> `[2.9.0+]`在 react 中，abort 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

## 通过 method 实例中断请求

`[2.6.2+]`另外，这个`abort`函数也会同时绑定到当前的 method 实例上，因此无论是通过`useRequest/useWatcher`还是`await alovaInstance.Get`发送的请求，也可以这样来中断请求。

```javascript
const todoListGetter = alovaInstance.Get('todo/list');
useRequest(todoListGetter);
useWatcher(() => todoListGetter);
await todoListGetter;

// highlight-start
// 调用method上的abort也可以中断请求
const handleCancel = () => {
  todoListGetter.abort();
};
// highlight-end
```

因此，如果需要实现在满足一定条件时批量中断请求，还可以在`beforeRequest`中调用`abort`中断请求。

```javascript
const alovaInst = createAlova({
  // ...
  beforeRequest(method) {
    if (someCondition) {
      method.abort();
    }
  }
});
```
