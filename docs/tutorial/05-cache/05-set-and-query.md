---
title: Set & Query Cache
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cache also supports update and search. In [cache mode](/tutorial/cache/mode), we mentioned that each cache data is saved with the method instance that sent the request as the key, so when manually updating the cache, the method instance will also be used to search for the corresponding cache data.

## Update cache

### Update static values

Use `setCache` to update cache data. Its first parameter is the method instance, the second is the new cache data, and returns a Promise instance to indicate whether the execution is completed.

```js
import { setCache } from 'alova';
await setCache(todoDetail(id), detailedData);
```

### Dynamic cache update

You can also pass a callback function in `setCache` to dynamically calculate cache data and return the cache data to be updated. If `undefined` is returned in the function, the cache update will be aborted.

```javascript
await setCache(todoDetail(id), oldCache => {
  if (!oldCache.allowUpdate) {
    return; // Return undefined to abort cache update
  }

  // Return the data to be cached
  return {
    ...oldCache,
    name: 'new name'
  };
});
```

### Update strategy

When the passed method sets multi-level cache, the L1 cache and L2 cache will be updated by default. You can control the update of the specified cache separately through `policy`.

```js
await setCache(todoDetail(id), detailedData, {
  /**
   * Cache policy.
   * - l1: Update only l1 cache.
   * - l2: Update only l2 cache.
   * - all: Update l1 cache and update l2 cache (method cache mode needs to be 'restore').
   * @default 'all'
   */
  policy: 'l1'
});
```

## Query cache

Query cached data through the `queryCache` method, which receives a method instance.

```javascript
import { queryCache } from 'alova';

const cachedData = await queryCache(getTodoListByDate('2022-10-01'));
```

You can also dynamically find method instances through [method snapshot matchers](/tutorial/client/in-depth/method-matcher).

```javascript
const lastMethod = alovaInstance.snapshots.match('todoList', true);
const cachedData = lastMethod ? await queryCache(lastMethod) : undefined;
```

### Query strategy

When the incoming method is set with multi-level cache, the default is to query the L1 cache first, then the L2 cache. You can use `policy` to control only the specified cache.

```js
const cachedData = await queryCache(getTodoListByDate('2022-10-01'), {
  /**
   * Cache strategy.
   * - l1: query only the l1 cache.
   * - l2: query only the l2 cache.
   * - all: query the l1 cache and query the l2 cache (the method cache mode needs to be 'restore').
   * @default 'all'
   */
  policy: 'l1'
});
```
