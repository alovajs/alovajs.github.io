---
title: 设置初始数据
sidebar_position: 70
---

当使用 `useRequest` 时，它的`data`值在请求成功前默认为 undefined，但有时候我们需要`data`在请求成功前也有初始值，例如在请求列表时通常需要讲它初始化为`[]`，否则在渲染视图时会因为无法循环渲染而导致报错。

```javascript
useRequest(todoListGetter, {
  // highlight-start
  // 请求响应前，data的初始值
  initialData: []
  // highlight-end
});
```
