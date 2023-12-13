---
title: Invalidate Response Cache manually
sidebar_position: 30
---

Generally, automatic invalidation cache is more concise, and it is recommended to use it first to invalidate the cache. When the automatic invalidation cache does not meet the needs, you can also invalidate the cache by calling `invalidateCache`.

## Invalidate cache with method instance

In the invalidateCache function, a method instance is passed in, and it will always look for the cache under this instance to invalidate.

In the following example, when the submission is successful, the todo details data cache will be invalidated.

```javascript
// Get the todo details data with id 1
const getTodoDetail = id =>
  alovaInstance.Get(`/todo/${id}`, {
    localCache: 1000000
  });
const { loading, data } = useRequest(getTodoDetail(1));
```

```javascript
// Submit the data and invalidate the todo details with id 1.
const {
  // ...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });

// highlight-start
//Invalid cache after successful submission
onSuccess(() => {
  invalidateCache(getTodoDetail(1));
});
// highlight-end

const handleSubmit = () => {
  send({
    title: 'new todo',
    content: 'new todo content'
  });
};
```

:::info

Its function is far more than that. We can also invalidate any number or even all caches by setting `Method` instance matchers.

:::

## Invalidate cache dynamically

Maybe sometimes you are not sure which cache data needs to be invalidated, but you know how to find the cached data that needs to be invalidated. We can use [Method instance matcher](/tutorial/advanced/method-matcher) To dynamically find the corresponding method instance. The following example shows how to invalidate the cache for the first 5 Method instances named todoList.

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    // First set the name for the method instance, which is used to filter out the required Method instance when the Method instance cannot be specified directly
    name: 'todoList',
    // highlight-end
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const {
  //...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });
// After the submission is successful, the todo data cache on the first page will be invalidated
onSuccess(() => {
  // highlight-start
  // Invalidate the cache of the first 5 Method instances named todoList
  invalidateCache({
    name: 'todoList',
    filter: (method, index, ary) => {
      return index < 5;
    }
  });
  // highlight-end
});
```

> See [Method instance matcher](/tutorial/advanced/method-matcher) for more usage of `Method` instance matcher

## Invalidate all caches

```javascript
// When no parameters are passed, invalidate all response caches
invalidateCache();
```
