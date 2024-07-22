---
title: Method Matcher
---

:::info Usage scope

Fully

:::

The method snapshot matcher is a method that dynamically searches for method instances in the requested method snapshot list. Each alova instance has an independent snapshot space. It is generally used when developers are not sure which method to use. The method snapshot matcher can be used to search according to certain rules.

It is generally used with the following 5 functions that need to use method instances.

1. [setCache](/tutorial/cache/set-and-query)
2. [queryCache](/tutorial/cache/set-and-query)
3. [invalidateCache](/tutorial/cache/manually-invalidate)
4. [updateState](/tutorial/client/in-depth/update-across-components)
5. [useFetcher.fetch](/tutorial/client/strategy/use-fetcher)

## Matching rules

When a method instance is requested, it will be saved as a snapshot. The method snapshot matcher searches for the method snapshots based on the `name` property set by the method instance. Multiple matchers are allowed to set the same `name`.

## Matching by name property

Match by passing in the full instance name. By default, a matching array is returned.

```javascript
// Each time getTodoList is called, a new method instance is generated, and their names are the same
const getTodoList = currentPage =>
  alova.Get('/todo/list', {
    name: 'todoList'
    // ...
  });

// Match all Method instances with the name `todoList`
const matchedMethods = alova.snaptshots.match('todoList');
```

## Match by regular expression

By passing in a regular expression for matching, all method instance names that match the regular expression will be matched, and the result is also an array.

```javascript
// Match all Method instances whose name starts with `todo`
const matchedMethods = alova.snaptshots.match(/^todo/);
```

## Filter matching results

By specifying `filter`, you can further filter method instances that do not meet the conditions. The filter function is used in the same way as Array.prototype.filter. Return true to indicate a successful match and false to indicate a failure. See the type declaration above for details.

Let's look at a few examples.

**Invalidate the cache of the last method instance of a specific name**

```javascript
const matchedMethods = alova.snaptshots.match({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

## Match a single method instance

You can also set the second function of the `match` function to `true` to return the first item of the matching result, and return `undefined` if no match is found.

```js
const matchedSingleMethod = alova.snaptshots.match(/^todo/, true);
```

## Limit instance snapshots

By default, 1000 method instance snapshots are saved, otherwise frequent requests may cause memory overflow. You can also adjust the limit as needed.

```js
import { globalConfig } from 'alova';

const alovaInstance = createAlova({
  // ...
  // Limit to 500 instance snapshots
  snapshots: 500
});
```

When set to 0, instance snapshots will no longer be saved, and the method snapshot matcher will not be used.
