---
title: 初始数据
---

当使用 `useRequest` 和`useWatcher`时，data 在请求成功前默认为 `undefined`，但有时候我们需要 data 在请求成功前也有初始值，例如在请求列表时通常需要将它初始化为`[]`，否则在渲染视图时会因为无法循环渲染而导致报错。

```javascript
useRequest(todoListGetter, {
  // highlight-start
  // 请求响应前，data的初始值
  initialData: []
  // highlight-end
});
```

useWatcher 的设置方法也相同。

```javascript
useWatcher(() => todoListGetter, {
  // highlight-start
  // 请求响应前，data的初始值
  initialData: []
  // highlight-end
});
```
