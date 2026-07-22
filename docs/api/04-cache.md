---
title: Cache Operations
---

## invalidateCache()

Actively invalidates the cache.

> Go to [Manually Invalidate Cache](/tutorial/cache/manually-invalidate) for details.

- **Type**

```ts
function invalidateCache(matcher?: Method | Method[]): Promise<void>;
```

- **Parameter**

1. `matcher`: A method instance or an array of method instances whose cache should be invalidated.

- **Return**

Promise Example

- **Example**

```ts
import { invalidateCache } from 'alova';

await invalidateCache(method);
await invalidateCache([method1, method2]);
const methodSnapshots = alova.snapshots.match('method-name');
await invalidateCache(methodSnapshots);
```

## setCache()

Sets the response cache.

> Go to [Cache Update and Lookup](/tutorial/cache/set-and-query) for details.

- **Type**

```ts
function setCache(
  matcher: Method | Method[],
  dataOrUpdater: R | ((oldCache: R) => R | undefined | void),
  options?: CacheSetOptions
): Promise<void>;
```

- **Parameter**

1. `matcher`: A method instance or an array of method instances.
2. `dataOrUpdater`: The cache data, or an updater function. If a function is provided, it must return the new cache data. Returning `undefined` (or nothing) cancels the update.
3. `options`: Cache update options.

| Parameter name | Type                  | Description                                                                                                                                                              |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| policy         | 'l1' \| 'l2' \| 'all' | The cache update policy. `l1` updates only the level-1 cache, `l2` updates only the level-2 cache, and `all` updates both. |

- **Return**

A `Promise` that resolves once the cache has been updated.

- **Example**

```ts
import { setCache } from 'alova';

await setCache(method, {});

await setCache([method1, method2], {});

const methodSnapshots = alova.snapshots.match('method-name');

await setCache(
  methodSnapshots,
  {},
  {
    policy: 'l1'
  }
);
```

## queryCache()

Queries the cache.

> Go to [Cache Update and Lookup](/tutorial/cache/set-and-query) for details.

- **Type**

```ts
function queryCache(
  matcher?: Method,
  options?: CacheQueryOptions
): Promise<Responded | undefined>;
```

- **Parameter**

1. `matcher`: A method instance, a method name string, or a method name regular expression. You can also pass a [method matcher](/tutorial/client/in-depth/method-matcher). The cache of the first matching method instance is queried.
2. `options`: Cache query options.

| Parameter name | Type                  | Description                                                                                                                                                                       |
| -------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| policy         | 'l1' \| 'l2' \| 'all' | The cache retrieval strategy. `l1` retrieves only the level-1 cache, `l2` retrieves only the level-2 cache, and `all` queries both. |

- **Return**

A `Promise` resolving to the cache data, or `undefined` if no cache is found.

- **Example**

```ts
import { queryCache } from 'alova';

const responseCache = await queryCache(method);
const methodSnapshot = alova.snapshots.match('method-name', true);
const responseCache = await queryCache(methodSnapshot, {
  policy: 'l2'
});
```
