---
title: Cache operation
---

## invalidateCache()

Active cache invalidation.

> Go to [Manually invalidate cache](/tutorial/cache/manually-invalidate) for details.

- **type**

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

1. `matcher`: Cache invalid matcher, the value is a method instance or array, or it can be set to [method instance matcher](/tutorial/client/in-depth/method-matcher).

- **return**

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

> Go to [Cache Update and Query](/tutorial/cache/set-and-query) for details.

- **type**

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

1. `matcher`: The value is method instance, method name string, method name regular expression. It can also be set to [method instance matcher](/tutorial/client/in-depth/method-matcher), which will match all matching The method instance of the condition sets the cached data.
2. `dataOrUpdater`: Cache data or update function. If it is a function, it needs to return new cached data. If it returns `undefined` or does not return, the update will be cancelled.

- **return**

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

> Go to [Cache Update and Query](/tutorial/cache/set-and-query) for details.

- **type**

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

1. `matcher`: The value is method instance, method name string, method name regular expression. It can also be set to [method instance matcher](/tutorial/client/in-depth/method-matcher), which will meet the conditions. The first method instance queries cached data.

- **return**

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
