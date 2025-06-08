---
title: alova实例
---

## createAlova()

创建一个 alova 实例。

- **类型**

```ts
function createAlova(options?: AlovaOptions): Alova;
```

- **参数**

1. config: 配置参数

| 参数名         | 类型                        | 说明                                                                                     |
| -------------- | --------------------------- | ---------------------------------------------------------------------------------------- |
| requestAdapter | object                      | 请求适配器，必填，[查看详情](/tutorial/advanced/custom/http-adapter)                     |
| id             | string \| number            | alova 实例 id，选填，[查看详情](/tutorial/cache/mode#%E8%AE%BE%E7%BD%AE-alova-id)        |
| baseURL        | string                      | 基础路径，选填，默认为空，[查看详情](/tutorial/getting-started/basic/alova)              |
| statesHook     | object                      | 状态管理钩子，选填，[查看详情](/tutorial/getting-started/basic/combine-framework)        |
| timeout        | number                      | 超时时间，默认不超时，[查看详情](/tutorial/getting-started/basic/alova)                  |
| cacheFor       | object                      | 本地缓存配置，默认 GET 有 5000ms 缓存，[查看详情](/tutorial/cache/mode)                  |
| l1Cache        | object                      | Level1 缓存适配器[查看详情](/tutorial/cache/mode)                                        |
| l2Cache        | object                      | Level2 缓存适配器，[查看详情](/tutorial/cache/mode)                                      |
| beforeRequest  | function                    | 请求前钩子，[查看详情](/tutorial/getting-started/basic/global-interceptor)               |
| responded      | object \| function          | 请求响应钩子，[查看详情](/tutorial/getting-started/basic/global-interceptor)             |
| shareRequest   | boolean                     | 共享请求，[查看详情](/tutorial/getting-started/basic/alova)                              |
| cacheLogger    | boolean \| null \| function | 缓存日志，[查看详情](/tutorial/advanced/in-depth/cache-logger)                           |
| snapshots      | number                      | method 快照的数量限制，默认为 1000，[查看详情](/tutorial/client/in-depth/method-matcher) |

- **返回**

Alova 实例

- **示例**

```ts
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import adapterFetch from 'alova/fetch';

const alova = createAlova({
  baseURL: 'https://example.com',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  timeout: 3000
  // ...
});
```

## alova.id

alova 实例 id，用于区分不同的 alova 实例，可在[method 匹配器](/tutorial/client/in-depth/method-matcher)中精准匹配指定 alova 的 method 实例。

- **类型**：string

## alova.options

通过`createAlova`创建 alova 实例时，默认配置与传入的配置对象合并后的对象。

- **类型**

```ts
interface AlovaOptions {
  statesHook: StatesHook;
  requestAdapter: AlovaRequestAdapter;
  baseURL?: string;
  timeout?: number;
  cacheFor?: GlobalcacheForConfig;
  l1Cache?: AlovaStorageAdapter;
  l2Cache?: AlovaStorageAdapter;
  beforeRequest?: Function;
  responded?: Function | ResponsedHandlerRecord;
  shareRequest?: boolean;
  cacheLogger?: boolean | null | Function;
  snapshots?: number;
}
```

## alova.l1Cache

alova 实例对应的 level1 缓存适配器，默认为内存缓存。

- **类型**

```ts
interface AlovaStorageAdapter {
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
  clear(): void;
}
```

## alova.l2Cache

alova 实例对应的 level2 缓存适配器，在客户端中默认为`localStorage`，服务端默认没有适配器。

- **类型**

```ts
interface AlovaStorageAdapter {
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
  clear(): void;
}
```

## alova.snapshots

当前实例的 method 快照存储器。

- **类型**

```ts
class MethodSnapshotContainer<AG extends AlovaGenerics> {
  records: Record<string, Set<Method<AG>>>;
  capacity: number;
  occupy: number;
  save(methodInstance: Method<AG>): void;
  match<M extends boolean = true>(
    matcher: MethodFilter<AG>,
    matchAll?: M
  ): M extends true ? Method<AG>[] : Method<AG> | undefined;
}
```

## alova.Request()

创建 method 实例。

- **类型**

```ts
interface Alova {
  Request(config?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

| 参数名       | 类型           | 说明                                                                                                                                                                                                                                                                                         |
| ------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url          | string         | 请求地址，相对于 baseURL                                                                                                                                                                                                                                                                     |
| method       | string         | 请求方法，默认为 GET                                                                                                                                                                                                                                                                         |
| headers      | object         | 请求头，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                   |
| params       | object         | 请求参数，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                 |
| name         | string         | method 对象名称，在 [updateState](/tutorial/client/in-depth/update-across-components)、[invalidateCache](/tutorial/cache/manually-invalidate)、[setCache](/tutorial/cache/set-and-query)、以及 [fetch 函数](/tutorial/client/strategy/use-fetcher)中可以通过名称或通配符获取对应 method 实例 |
| timeout      | number         | 请求超时时间，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                             |
| cacheFor     | cacheForConfig | 响应缓存时间，[查看详情](/tutorial/cache/mode)                                                                                                                                                                                                                                               |
| hitSource    | string         | 打击源方法实例，当源方法实例请求成功时，当前方法实例的缓存将被失效，[查看详情](/tutorial/cache/auto-invalidate)                                                                                                                                                                              |
| transform    | function       | 转换响应数据，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                             |
| shareRequest | boolean        | 请求级共享请求开关，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                       |
| meta         | any            | method 元数据， [查看详情](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                  |

> 除了可配置上面的参数外，还支持请求适配器支持的其他参数。

- **返回**

method 实例

- **示例**

```ts
const getUsers = alovaInstance.Request({
  url: '/users',
  method: 'GET',
  params: {
    id: 1
  }
  // ...
});
```

## alova.Get()

创建 GET 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Get(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. config: 配置参数

| 参数名       | 类型           | 说明                                                                                                                                                                                                                                                                                         |
| ------------ | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headers      | object         | 请求头，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                   |
| params       | object         | 请求参数，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                 |
| name         | string         | method 对象名称，在 [updateState](/tutorial/client/in-depth/update-across-components)、[invalidateCache](/tutorial/cache/manually-invalidate)、[setCache](/tutorial/cache/set-and-query)、以及 [fetch 函数](/tutorial/client/strategy/use-fetcher)中可以通过名称或通配符获取对应 method 实例 |
| timeout      | number         | 请求超时时间，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                             |
| cacheFor     | cacheForConfig | 响应缓存时间，[查看详情](/tutorial/cache/mode)                                                                                                                                                                                                                                               |
| hitSource    | string         | 打击源方法实例，当源方法实例请求成功时，当前方法实例的缓存将被失效，[查看详情](/tutorial/cache/auto-invalidate)                                                                                                                                                                              |
| transform    | function       | 转换响应数据，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                             |
| shareRequest | boolean        | 请求级共享请求开关，[查看详情](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                       |
| meta         | any            | method 元数据， [查看详情](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                  |

> 除了可配置上面的参数外，还支持请求适配器支持的其他参数。

- **返回**

method 实例

- **示例**

```ts
const getUsers = alovaInstance.Get('/users', {
  params: {
    id: 1
  }
  // ...
});
```

## alova.Post()

创建 POST 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Post(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. config: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

- **示例**

```ts
const postUsers = alovaInstance.Post(
  '/createUser',
  {
    name: 'alova',
    age: 18,
    gender: 'male'
  },
  {
    // 配置参数...
  }
);
```

## alova.Delete()

创建 DELETE 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Delete(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. config: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

- **示例**

```ts
const deleteUsers = alovaInstance.Delete(
  '/deleteUser',
  {
    id: 1
  },
  {
    // 配置参数...
  }
);
```

## alova.Put()

创建 PUT 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Put(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. config: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

- **示例**

```ts
const putUsers = alovaInstance.Put(
  '/updateUser',
  {
    id: 1,
    name: 'alova'
  },
  {
    // 配置参数...
  }
);
```

## alova.Head()

创建 HEAD 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Head(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. config: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

## alova.Patch()

创建 PATCH 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Patch(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. config: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

## alova.Options()

创建 OPTIONS 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Options(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. config: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例
