---
title: Set initial data
sidebar_position: 40
---

When using `useRequest`, its `data` value defaults to undefined before the request is successful, but sometimes we need `data` to have an initial value before the request is successful. For example, when requesting a list, we usually need to initialize it to `[]`, otherwise it will throw error when rendering the list.

```javascript
useRequest(todoListGetter, {
  // highlight-start
  //The initial value of data before requesting response
  initialData: []
  // highlight-end
});
```
