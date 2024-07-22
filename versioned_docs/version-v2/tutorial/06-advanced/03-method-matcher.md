---
title: Method Matcher
---

A method matcher is a method that dynamically finds a method instance in a list of requested method snapshots. It is generally used. When developers are not sure which method to use, they can use the method matcher to search according to certain rules.

## Matching rules

When a request is made using a method instance, it will be saved as a snapshot. The method matcher looks in these method snapshots based on the `name` attribute set by the method instance. Multiple matchers are allowed to set the same `name`.

Method instance matching types are as follows:

```typescript
type MethodFilter =
  | string
  | RegExp
  | {
      name: string | RegExp;
      filter: (method: Method, index: number, methods: Method[]) => boolean;

      // Optional parameter, if the alova object is passed in, it will only match the Method instance created by this alova, otherwise it will match the Method instances of all alova instances.
      alova?: Alova;
    };
```

The method instance matcher can be used in the following functions.

- [setCache](/v2/tutorial/cache/set-and-query)
- [queryCache](/v2/tutorial/cache/set-and-query)
- [invalidateCache](/v2/tutorial/cache/manually-invalidate)
- [updateState](/v2/tutorial/advanced/update-across-components)
- [useFetcher.fetch](/v2/tutorial/advanced/use-fetcher)

## Match by name attribute

Matching is performed by passing in the complete instance name, and its matching result is an array.

```javascript
// Each time getTodoList is called, a new method instance will be generated, and their names are the same.
const getTodoList = currentPage =>
  alova.Get('/todo/list', {
    // highlight-start
    name: 'todoList'
    // highlight-end
    // ...
  });

//The following means invalidating the cache of all Method instances with name 'todoList'
invalidateCache('todoList');
```

## Match by regular expression

By passing in a regular expression for matching, any method instance whose name matches the regular expression will be matched, and its result is also an array.

```javascript
// The following means invalidating the cache of all Method instances whose names start with 'todo'
invalidateCache(/^todo/);
```

## Filter matching results

Further filter method instances that do not meet the conditions by specifying `filter`. The filter function is used in the same way as Array.prototype.filter. Returning true indicates successful matching, and returning false indicates failure. See the type declaration above for details.

Let's look at a few examples.

**Invalidate the cache of the last method instance with a specific name**

```javascript
invalidateCache({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

**Set the cache of the last method instance of a specific name created by `alovaInst`**

```javascript
setCache(
  {
    name: /^todo/,
    filter: (method, index, methods) => index === methods.length - 1,

    // If the alova parameter is passed, only the Method instances created by this alova instance will be matched, otherwise it will be matched in all Method instances.
    alova: alovaInst
  },
  newCache
);
```

**Repulse the last requested data from the todo list**

```javascript
const { fetch } = useFetcher();
fetch({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

> The alova parameter can further narrow the matching scope.

## Differences in use in different functions

### invalidateCache

Apply the set of all matching Method instances, that is, invalidate the cache corresponding to all matching Method instances.

### setCache

All matching Method instance collections are applied. When static data is passed in, all Method instance caches are set to the same value. When the callback function is passed in, this function will be called cyclically and the return value will be used as cache data.

### updateState

The first matching Method instance is applied.

### fetch

The first matching Method instance is applied, i.e. the data will only be pulled once.

## Limit instance snapshots

`[v2.20.0+]` By default, 1000 method instance snapshots will be saved, otherwise memory overflow may occur in frequent request scenarios. You can also adjust the limit as needed.

```js
import { globalConfig } from 'alova';

globalConfig({
  // Limit saving to 500 instance snapshots
  limitSnapshots: 500
});
```

When set to 0, instance snapshots are no longer saved and the method matcher cannot be used.

```js
globalConfig({
  limitSnapshots: 0
});
```
