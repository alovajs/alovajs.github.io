---
title: Cache operation
---

## invalidateCache()

Active cache invalidation.

> Go to [Manually invalidate cache](/v2/tutorial/cache/manually-invalidate) for details.

- **Type**
```ts
type MethodFilter =
  | string
  | RegExp
  | {
      name?: string | RegExp;
      filter?: MethodFilterHandler;
      alova?: Alova;
    };
function invalidateCache(matcher?: Method | Method[] | MethodFilter): void;
```

- **Parameters**

1. `matcher`: Cache invalid matcher, the value is a method instance or array, or it can be set to [method instance matcher](/v2/tutorial/advanced/method-matcher).

- **Return**
none

- **Example**

```ts
import { invalidateCache } from 'alova';

invalidateCache(method);
invalidateCache([method1, method2]);
invalidateCache({
  name: 'userMethod',
  filter: method => method.name === 'method1'
});
```

## setCache()

Set up response caching.

> Go to [Cache Update and Query](/v2/tutorial/cache/set-and-query) for details.

- **Type**
```ts
type MethodFilter =
  | string
  | RegExp
  | {
      name?: string | RegExp;
      filter?: MethodFilterHandler;
      alova?: Alova;
    };
function setCache(
  matcher: Method | Method[] | MethodFilter,
  dataOrUpdater: R | ((oldCache: R) => R | undefined | void)
): void;
```

- **Parameters**

1. `matcher`: The value can be a method instance, a method name string, or a method name regular expression. It can also be set to a [method instance matcher](/v2/tutorial/advanced/method-matcher), which sets the cached data for all matching method instances.
2. `dataOrUpdater`: Cache data or update function. If it is a function, it needs to return new cached data. If it returns `undefined` or does not return, the update will be cancelled.

- **Return**
none

- **Example**

```ts
import { setCache } from 'alova';

setCache(method, {});
setCache([method1, method2], {});
setCache(
  {
    name: 'userMethod',
    filter: method => method.name === 'method1'
  },
  {}
);
```

## queryCache()

Query cache.

> Go to [Cache Update and Query](/v2/tutorial/cache/set-and-query) for details.

- **Type**
```ts
type MethodFilter =
  | string
  | RegExp
  | {
      name?: string | RegExp;
      filter?: MethodFilterHandler;
      alova?: Alova;
    };
function queryCache(matcher?: Method | MethodFilter): R | undefined;
```

- **Parameters**

1. `matcher`: The value can be a method instance, a method name string, or a method name regular expression. It can also be set to a [method instance matcher](/v2/tutorial/advanced/method-matcher), which queries the cached data of the first matching method instance.

- **Return**
Cache data, or return `undefined` if not cached.

- **Example**

```ts
import { queryCache } from 'alova';

const responseCache = queryCache(method);
const responseCache = queryCache({
  name: 'userMethod',
  filter: method => method.name === 'method1'
});
```
