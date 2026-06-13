:::info 使用范围

客户端 useHook

:::



在之前的[跨页面/模块更新响应状态](/tutorial/client/in-depth/update-across-components)章节中，介绍了如何通过`updateState`跨页面或模块更新响应状态，但它只能更新由 useHooks 创建的状态，如果需要跨组件更新自定义的状态，应该怎么做呢？让我们继续吧！

## 更新单个状态

可以在 useHooks 调用时通过`managedStates`管理额外的状态，并在其他模块/页面中调用`updateState`时，自动指定状态名称来更新它。

**vue:**



## 更新多个状态

在上面的例子中我们实现了跨页面对单个`allTodo`状态进行更新，实际上，通过`updateState`的对象描述方式可以同时更新任意多个状态。

```javascript
updateState('todoList', {
  state1: state1Data => {
    // ...
  },
  state2: state2Data => {
    // ...
  },
  state3: state3Data => {
    // ...
  }
  // ...
});
```

需要注意的是，以上 3 个额外的状态在更新前，需要通过`managedStates`属性来管理起来。

## data 状态更新的简写

当只更新 data 状态时，可以直接传入回调函数即可，而不需要指定为对象。

```javascript
updateState('todoList', {
  data: dataRaw => {
    // ...
  }
});

// 以下为简写
updateState('todoList', dataRaw => {
  // ...
});
```
