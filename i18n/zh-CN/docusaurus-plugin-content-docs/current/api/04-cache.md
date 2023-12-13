---
title: 缓存操作
sidebar_position: 40
---

## invalidateCache()

主动失效缓存。

> 前往[手动失效缓存](/tutorial/cache/manually-invalidate)查看详情。

- **类型**

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

- **参数**

1. `matcher`：缓存失效的匹配器，值为 method 实例或数组，也可以设置为[method 实例匹配器](/tutorial/advanced/method-matcher)。

- **返回**

无

- **示例**

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

设置响应缓存。

> 前往[缓存更新与查找](/tutorial/cache/set-and-query)查看详情。

- **类型**

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

- **参数**

1. `matcher`：值为 method 实例、method 的 name 字符串、method 的 name 正则表达式，也可以设置为[method 实例匹配器](/tutorial/advanced/method-matcher)，将会为所有符合条件的 method 实例设置缓存数据。
2. `dataOrUpdater`：缓存数据或更新函数，如果为函数，则需要返回新的缓存数据，如果返回`undefined`或不返回则取消更新。

- **返回**

无

- **示例**

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

查询缓存。

> 前往[缓存更新与查找](/tutorial/cache/set-and-query)查看详情。

- **类型**

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

- **参数**

1. `matcher`：值为 method 实例、method 的 name 字符串、method 的 name 正则表达式，也可以设置为[method 实例匹配器](/tutorial/advanced/method-matcher)，将会为符合条件的第一个 method 实例查询缓存数据。

- **返回**

缓存数据，如果没有缓存则返回`undefined`。

- **示例**

```ts
import { queryCache } from 'alova';

const responseCache = queryCache(method);
const responseCache = queryCache({
  name: 'userMethod',
  filter: method => method.name === 'method1'
});
```
