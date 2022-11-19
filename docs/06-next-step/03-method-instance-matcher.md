---
title: Method instance matcher
sidebar_position: 30
---

When we finish processing some business, we need to call `invalidateCache`, `setCacheData`, `updateState` and `fetch` to invalidate cache, update cache, update state across pages, or re-pull data, there are generally two scenarios :

1. The developer knows which request data needs to be manipulated. At this time, when calling the above function, a `Method` instance can be directly passed in;
2. The developer only knows the request that needs to operate a certain order bit, but is not sure which one. At this time, we can use the method of `Method` instance matcher to filter out.

The `Method` instance matcher is filtered according to the `name` attribute set by the `Method` instance. Multiple matchers are allowed to set the same `name`, so first you need to set the `name` attribute for the `Method` instance that needs to be filtered. .

Method instance matching types are as follows

```typescript
type MethodFilter =
  | string
  | RegExp
  | {
      name: string | RegExp;
      filter: (method: Method, index: number, methods: Method[]) => boolean;

      // Optional parameter, if an alova object is passed in, only the Method instance created by this alova is matched, otherwise it matches the Method instance of all alova instances
      alova?: alova;
    };
```

## match by name attribute

Match by passing in the full instance name, and its result is an array.

```javascript
// Each time getTodoList is called, a new Method instance is generated with the same name
const getTodoList = currentPage =>
  alova.Get('/tood/list', {
    name: 'todoList',
    params: {
      currentPage,
      pageSize: 10
    }
  });

// The following means to invalidate the cache of all Method instances whose name is 'todoList'
invalidateCache('todoList');
```

## match by regular expression

By passing in the regular expression to match, the name of the Method instance that matches the regular expression will be matched, and its result is also an array.

```javascript
// The following means to invalidate the cache of all Method instances whose name starts with 'todo'
invalidateCache(/^todo/);
```

## More complex matching methods

You can also specify `filter` to further filter `Method` instances that do not meet the conditions. The filter function is used in the same way as Array.prototype.filter. Returning true means the match is successful, and returning false means failure. For details, see the type declaration above.

Let's look at a few examples.

```javascript
// invalidate the cache of the last Method instance whose name is todoList
invalidateCache({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});

// Set the cache for the last Method instance whose name starts with todo
setCacheData(
  {
    name: /^todo/,
    filter: (method, index, methods) => index === methods.length - 1,

    // If the alova parameter is passed, only the Method instance created by this alova instance will be matched, otherwise it will be matched in all Method instances
    alova: alovaInst
  },
  newCache
);

// Re-pull the data of the last request of the todo list
const { fetch } = useFetcher();
fetch({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

> alova parameter to further narrow the match.

## Differences used in different functions

- invalidateCache: apply all matching Method instance sets, that is, invalidate the cache corresponding to all matching Method instances;
- setCacheData: applies all matching Method instance sets. When static data is passed in, all Method instance caches are set to the same value. When the callback function is passed in, this function will be called cyclically, and the return value will be used as the cached data;
- updateState: applies the first matching Method instance
- fetch: apply the first matching Method instance, that is, only pull data once
  `invalidateCache` will invalidate the cache corresponding to all filtered `Method` instances, while `updateState` and `fetch` will only operate on the first item in the set of `Method` instances.
