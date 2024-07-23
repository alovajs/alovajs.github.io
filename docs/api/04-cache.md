---
title: Cache Operations
---

## invalidateCache()

Actively invalidate the cache.

> Go to [Manually Invalidate Cache](/tutorial/cache/manually-invalidate) for details.

- **Type**

```ts
function invalidateCache(matcher?: Method | Method[]): Promise<void>;
```

- **Parameter**

1. `matcher`: method instance or array for cache invalidation.

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

Set the response cache.

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

1. `matcher`: value is method instance or instance array.
2. `dataOrUpdater`: cache data or update function. If it is a function, it needs to return the new cache data. If it returns `undefined` or does not return, the update is canceled.
3. `options`: Configuration parameters

| Parameter name | Type                  | Description                                                                                                                                                              |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| policy         | 'l1' \| 'l2' \| 'all' | Cache update policy, `l1` means only updating the l1 layer cache, `l2` means only updating the l2 layer cache, and `all` means updating both the l1 and l2 layers cache. |

- **Return**

Promise instance

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

Query cache.

> Go to [Cache Update and Lookup](/tutorial/cache/set-and-query) for details.

- **Type**

```ts
function queryCache(
  matcher?: Method,
  options?: CacheQueryOptions
): Promise<Responded | undefined>;
```

- **Parameter**

1. `matcher`: The value is a method instance, a method name string, or a method name regular expression. It can also be set to a [method matcher](/tutorial/client/in-depth/method-matcher). The cache data will be queried for the first method instance that meets the conditions.
2. `options`: Configuration parameters

| Parameter name | Type                  | Description                                                                                                                                                                       |
| -------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| policy         | 'l1' \| 'l2' \| 'all' | Cache acquisition strategy, `l1` means only obtaining the l1 layer cache, `l2` means only obtaining the l2 layer cache, and `all` means querying both the l1 and l2 layer caches. |

- **Return**

Promise instance of cache data, returns `undefined` if there is no cache.

- **Example**

```ts
import { queryCache } from 'alova';

const responseCache = await queryCache(method);
const methodSnapshot = alova.snapshots.match('method-name', true);
const responseCache = await queryCache(methodSnapshot, {
  policy: 'l2'
});
```
