---
title: mandatory request
sidebar_position: 40
---

Forced request refers to a mechanism that bypasses the cache check and triggers a request. It is useful when the latest data needs to be obtained under certain conditions.

## Set mandatory request in useHook

Among the three core hooks of `useRequest/useWatcher/useFetcher`, mandatory request parameters are supported.

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

### Dynamically set force value

In actual situations, we often need to set whether to force the request to be sent based on different situations. In this case, force can be set to a function, which will also receive parameters passed in from the `send` function. [Please read the Submit Form chapter for details](/tutorial/getting-started/submit-form)

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

`useFetcher` is a useHook for data fetching, which will be discussed in the [Data Fetching](/tutorial/advanced/data-fetching) chapter later.
