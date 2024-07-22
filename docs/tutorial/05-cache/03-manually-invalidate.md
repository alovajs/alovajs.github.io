---
title: Manual Invalidate
---

Generally, automatic cache invalidation is more concise and is recommended to be used first to invalidate the cache. When automatic cache invalidation does not meet the needs, you can also invalidate the cache by calling `invalidateCache`.

## Invalidate a single cache

Pass a method instance to the `invalidateCache` function, and it will find the cache under this instance for invalidation.

In the following example, when the submission is successful, the cache of this todo detail data will be invalidated.

```javascript
// Get the todo detail data with id 1
const getTodoDetail = id =>
  alovaInstance.Get(`/todo/${id}`, {
    cacheFor: 600 * 1000
  });
const { loading, data } = useRequest(getTodoDetail(1));
```

```javascript
// Submit the data and invalidate the todo detail data with id 1.
const {
  // ...
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });

// highlight-start
// Invalidate cache after successful submission
onSuccess(() => {
  invalidateCache(getTodoDetail(1));
});
// highlight-end

const handleSubmit = () => {
  send({
    title: 'new todo',
    content: 'new todo content'
  });
}；
```

## Invalidate multiple caches

You can also pass in an array of method instances to invalidate multiple caches.

```javascript
invalidateCache([method1, method2, ...]);
```

## Dynamically invalidate cache

Sometimes you may not be sure which cache data needs to be invalidated. We can use [method snapshot matcher](/tutorial/client/in-depth/method-matcher) to dynamically find the corresponding method instance. The following example shows how to invalidate the cache of the first five instances of a method called todoList.

```javascript
const getTodoList = currentPage => {
  return alovaInstance.Get('/todo/list', {
    // highlight-start
    // Set the name for the method instance first, which is used to filter out the required Method instance when the Method instance cannot be directly specified
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
// After successful submission, the todo data cache of the first page is fixedly invalidated
onSuccess(() => {
  // highlight-start
  // Invalidate the cache of the first 5 Method instances named todoList
  const matchedMethods = alovaInstance.snapshots.match({
    name: 'todoList',
    filter: (method, index, ary) => {
      return index < 5;
    }
  });
  invalidateCache(matchedMethods);
  // highlight-end
});
```

> For more usage of method matchers, see [method snapshot matcher](/tutorial/client/in-depth/method-matcher)

## Invalidate all caches

```javascript
// When no parameters are passed, invalidate all response caches
invalidateCache();
```
