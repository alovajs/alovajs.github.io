---
title: Abort Request
---

Receive `abort` for manual abort request via useHook.

```javascript
// useRequest
const {
  // ...
  // highlight-start
  // abort function is used to abort requests
  abort
  // highlight-end
} = useRequest(todoListGetter);

// useWatcher
const {
  // ...
  // highlight-start
  // abort function is used to abort requests
  abort
  // highlight-end
} = useWatcher(todoListGetter, [page]);
```

Then call the `abort` method to abort the request.

```javascript
const handleCancel = () => {
  abort();
};
```

> **[2.9.0+]** In react, the abort function is wrapped using `useCallback`, and it is not restricted by closure traps. You can use it directly in events without worrying about causing performance problems.

**[2.6.2+]** In addition, this `abort` function will also be bound to the current method instance, so requests sent through `useRequest/useWatcher` can also be aborted in this way.

```javascript
const todoListGetter = alovaInstance.Get('todo/list');
useRequest(todoListGetter);
useWatcher(() => todoListGetter);

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
