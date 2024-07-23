---
title: 缓存操作
---

## invalidateCache()

主动失效缓存。

> 前往[手动失效缓存](/tutorial/cache/manually-invalidate)查看详情。

- **类型**

```ts
function invalidateCache(matcher?: Method | Method[]): Promise<void>;
```

- **参数**

1. `matcher`：缓存失效的 method 实例或数组。

- **返回**

Promise 实例

- **示例**

```ts
import { invalidateCache } from 'alova';

await invalidateCache(method);
await invalidateCache([method1, method2]);

const methodSnapshots = alova.snapshots.match('method-name');
await invalidateCache(methodSnapshots);
```

## setCache()

设置响应缓存。

> 前往[缓存更新与查找](/tutorial/cache/set-and-query)查看详情。

- **类型**

```ts
function setCache(
  matcher: Method | Method[],
  dataOrUpdater: R | ((oldCache: R) => R | undefined | void),
  options?: CacheSetOptions
): Promise<void>;
```

- **参数**

1. `matcher`：值为 method 实例或实例数组。
2. `dataOrUpdater`：缓存数据或更新函数，如果为函数，则需要返回新的缓存数据，如果返回`undefined`或不返回则取消更新。
3. `options`：配置参数

| 参数名 | 类型                  | 说明                                                                                            |
| ------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| policy | 'l1' \| 'l2' \| 'all' | 缓存更新策略， `l1`为只更新 l1 层缓存，`l2`为只更新 l2 层缓存，`all`为同时更新 l1 和 l2 层缓存. |

- **返回**

Promise 实例

- **示例**

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

查询缓存。

> 前往[缓存更新与查找](/tutorial/cache/set-and-query)查看详情。

- **类型**

```ts
function queryCache(
  matcher?: Method,
  options?: CacheQueryOptions
): Promise<Responded | undefined>;
```

- **参数**

1. `matcher`：值为 method 实例、method 的 name 字符串、method 的 name 正则表达式，也可以设置为[method 匹配器](/tutorial/client/in-depth/method-matcher)，将会为符合条件的第一个 method 实例查询缓存数据。
2. `options`：配置参数

| 参数名 | 类型                  | 说明                                                                                            |
| ------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| policy | 'l1' \| 'l2' \| 'all' | 缓存获取策略， `l1`为只获取 l1 层缓存，`l2`为只获取 l2 层缓存，`all`为同时查询 l1 和 l2 层缓存. |

- **返回**

缓存数据的 Promise 实例，如果没有缓存则返回`undefined`。

- **示例**

```ts
import { queryCache } from 'alova';

const responseCache = await queryCache(method);
const methodSnapshot = alova.snapshots.match('method-name', true);
const responseCache = await queryCache(methodSnapshot, {
  policy: 'l2'
});
```
