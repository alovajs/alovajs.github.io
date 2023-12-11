---
title: 强制请求
sidebar_position: 40
---

强制请求是指绕过缓存的检查触发请求发送的机制，当需要在一定条件下获取最新的数据时很有用。

## 在 useHook 中设置强制请求

在`useRequest/useWatcher/useFetcher`三个核心 hook 中，都支持强制请求参数。

```javascript
// useRequest
useRequest(todoListGetter, {
  // highlight-start
  force: true
  // highlight-end
});

// useWatcher
useWatcher(todoListGetter, [page], {
  // highlight-start
  force: true
  // highlight-end
});

// useFetcher
useFetcher({
  // highlight-start
  force: true
  // highlight-end
});
```

### 动态设置 force 值

实际情况中，我们经常需要根据不同情况来设置是否需要强制发送请求，此时可以将 force 设置为一个函数，此函数也将接收来自 `send` 函数传入的参数。[具体请阅读提交表单章节](/tutorial/getting-started/submit-form)

```javascript
useRequest(todoListGetter, {
  // highlight-start
  force: isForce => {
    return isForce;
  }
  // highlight-end
});

// useWatcher
useWatcher(todoListGetter, [page], {
  // highlight-start
  force: isForce => {
    return isForce;
  }
  // highlight-end
});

// useFetcher
useFetcher({
  // highlight-start
  force: isForce => {
    return isForce;
  }
  // highlight-end
});
```

`useFetcher`是一个数据拉取的 useHook，将在后面的[数据拉取](/tutorial/advanced/data-fetching)中讲解。
