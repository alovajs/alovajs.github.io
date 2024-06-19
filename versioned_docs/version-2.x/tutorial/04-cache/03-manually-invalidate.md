---
title: Manually Invalidate
---

Generally, automatic invalidate cache is more concise, and it is recommended to use it first to invalidate the cache. When the automatic invalidate cache does not meet the needs, you can also invalidate the cache by calling `invalidateCache`.

## Use method instance invalidate cache

Pass in a method instance in the `invalidateCache` function, it will look for the cache under this instance to invalidate it.

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

## Batch invalidate cache

In the following example, we invalidate caches in batches by specifying the name of the cache or a regular expression of the name.

```javascript
//The cache of the method named todoList will be invalidated
invalidateCache('todoList');

// The cache of methods whose names match the following regular expression will be invalidated
invalidateCache(/^todoList/);
```

## Dynamic invalidate cache

Maybe sometimes you are not sure which cached data needs to be invalidated. We can use [Method instance matcher](/tutorial/advanced/method-matcher) to dynamically find the corresponding method instance. The following example shows how to invalidate the cache of the first 5 method instances named todoList.

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    // First set the name for the method instance, which is used to filter out the required Method instance when the Method instance cannot be specified directly.
    name: 'todoList',
    // highlight-end
    params: {
      currentPage,
      pageSize: 10
    }
  });
};

const {
  // ...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });
// After successful submission, the todo data cache of the first page will be invalidated.
onSuccess(() => {
  // highlight-start
  //The cache of the first 5 Method instances whose invalid name is todoList
  invalidateCache({
    name: 'todoList',
    filter: (method, index, ary) => {
      return index < 5;
    }
  });
  // highlight-end
});
```

> For more methods of using method instance matcher, see [Method instance matcher](/tutorial/advanced/method-matcher)

## Invalidate all caches

```javascript
// When no parameters are passed, all response caches are invalidated
invalidateCache();
```
