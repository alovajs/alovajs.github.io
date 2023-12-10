---
title: Abort request
sidebar_position: 150
---

## Abort the request through useHook function

When the `timeout` parameter is not set, the request will never time out. If you need to manually abort the request, you can receive the `abort` method when `useRequest/useWatcher` or the function is called.

```javascript
const {
  // ...
  // highlight-start
  // abort function is used to abort requests
  abort
  // highlight-end
} = useRequest(todoListGetter);

// highlight-start
//Call abort to abort the request
const handleCancel = () => {
  abort();
};
// highlight-end
```

> `[2.9.0+]` In react, the abort function is wrapped with `useCallback`, and it is not restricted by closure traps. You can use it directly in events without worrying about causing performance problems.

## Abort requests through method instances

`[2.6.2+]` In addition, this `abort` function will also be bound to the current method instance, so whether it is a request sent through `useRequest/useWatcher` or `await alovaInstance.Get`, it can also be like this to abort the request.

```javascript
const todoListGetter = alovaInstance.Get('todo/list');
useRequest(todoListGetter);
useWatcher(() => todoListGetter);
await todoListGetter;

// highlight-start
// Calling abort on the method can also abort the request
const handleCancel = () => {
  todoListGetter.abort();
};
// highlight-end
```

Therefore, if you need to abort requests in batches when certain conditions are met, you can also call `abort` in `beforeRequest` to abort requests.

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
