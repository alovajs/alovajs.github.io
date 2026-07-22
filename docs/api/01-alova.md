---
title: Alova Instance
---

## createAlova()

Create an Alova instance.

- **Type**

```ts
function createAlova(options?: AlovaOptions): Alova;
```

- **Parameter**

1. config: configuration options

| Parameter name | Type                        | Description                                                                                                             |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| requestAdapter | object                      | Request adapter, required, [see details](/tutorial/advanced/custom/http-adapter)                                       |
| id             | string \| number            | Alova instance id, optional, [see details](/tutorial/cache/mode#set-alova-id)                                          |
| baseURL        | string                      | Base path, optional, default is empty, [see details](/tutorial/getting-started/basic/alova)                            |
| statesHook     | object                      | State management hook, optional, [see details](/tutorial/getting-started/basic/combine-framework)                       |
| timeout        | number                      | Timeout, default is no timeout, [see details](/tutorial/getting-started/basic/alova)                                    |
| cacheFor       | object                      | Local cache configuration, default GET has 5000ms cache, [see details](/tutorial/cache/mode)                            |
| l1Cache        | object                      | Level1 cache adapter [see details](/tutorial/cache/mode)                                                                |
| l2Cache        | object                      | Level2 cache adapter, [see details](/tutorial/cache/mode)                                                               |
| beforeRequest  | function                    | Before request hook, [see details](/tutorial/getting-started/basic/global-interceptor)                                  |
| responded      | object \| function          | Request response hook, [see details](/tutorial/getting-started/basic/global-interceptor)                                |
| shareRequest   | boolean                     | Share request, [see details](/tutorial/getting-started/basic/alova)                                                     |
| cacheLogger    | boolean \| null \| function | Cache log, [see details](/tutorial/advanced/in-depth/cache-logger)                                                      |
| snapshots      | number                      | Limits the number of retained method snapshots; defaults to 1000. [see details](/tutorial/client/in-depth/method-matcher) |

- **Return**

Alova instance

- **Example**

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

The alova instance ID, used to distinguish between different alova instances. It lets you precisely match the method instances of a specific alova instance via the [method matcher](/tutorial/client/in-depth/method-matcher).

- **Type**: string

## alova.options

When creating an alova instance via `createAlova`, this is the configuration object after merging the default options with the ones you provide.

- **Type**

```ts
interface AlovaOptions {
  statesHook: StatesHook;
  requestAdapter: AlovaRequestAdapter;
  baseURL?: string;
  timeout?: number;
  cacheFor?: GlobalCacheForConfig;
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

The level-1 cache adapter for this alova instance. Defaults to an in-memory cache.

- **Type**

```ts
interface AlovaStorageAdapter {
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
  clear(): void;
}
```

## alova.l2Cache

The level-2 cache adapter for this alova instance. Defaults to `localStorage` on the client; there is no adapter on the server by default.

- **Type**

```ts
interface AlovaStorageAdapter {
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
  clear(): void;
}
```

## alova.snapshots

The method snapshot storage for the current instance.

- **Type**

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

## alova.Get()

Creates a method instance for a GET request.

- **Type**

```ts
interface Alova {
  Get(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameter**

1. url: request URL
2. config: configuration options

| Parameter name | Type           | Description                                                                                                                                                                                                                                                                                                                 |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headers        | object         | request headers, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                       |
| params         | object         | Request parameters, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                   |
| name           | string         | Method object name. In [updateState](/tutorial/client/in-depth/update-across-components), [invalidateCache](/tutorial/cache/manually-invalidate), [setCache](/tutorial/cache/set-and-query), and [fetch function](/tutorial/client/strategy/use-fetcher), you can get the corresponding method instance by name or wildcard |
| timeout        | number         | Request timeout, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                      |
| cacheFor       | cacheForConfig | Response cache time, [see details](/tutorial/cache/mode)                                                                                                                                                                                                                                                                    |
| hitSource      | string         | Hit the source method instance. When the source method instance request succeeds, the cache of the current method instance will be invalidated. [see details](/tutorial/cache/auto-invalidate)                                                                                                                             |
| transform      | function       | Transform response data. [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                             |
| shareRequest   | boolean        | Request-level shared request switch. [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                 |
| meta           | any            | method metadata. [see details](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                                            |

> In addition to the configurable parameters above, other parameters supported by the request adapter are also supported.

- **Return**

method instance

- **Example**

```ts
const getUsers = alovaInstance.Get('/users', {
  params: {
    id: 1
  }
  // ...
});
```

## `[3.3.0+]` alova.Request()

Create a method instance.

- **Type**

```ts
interface Alova {
  Request(config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameter**

| Parameter name | Type           | Description                                                                                                                                                                                                                                                                                                            |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url            | string         | request URL                                                                                                                                                                                                                                                                                                            |
| method         | string         | request method, such as GET/POST, default is `GET`                                                                                                                                                                                                                                                                     |
| headers        | object         | request headers, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                 |
| params         | object         | request parameters, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                             |
| name           | string         | method object name, in [updateState](/tutorial/client/in-depth/update-across-components), [invalidateCache](/tutorial/cache/manually-invalidate), [setCache](/tutorial/cache/set-and-query), and [fetch function](/tutorial/client/strategy/use-fetcher) can get the corresponding method instance by name or wildcard |
| timeout        | number         | request timeout, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                 |
| cacheFor       | cacheForConfig | response cache time, [see details](/tutorial/cache/mode)                                                                                                                                                                                                                                                               |
| hitSource      | string         | hit source method instance, when the source method instance request is successful, the cache of the current method instance will be invalidated, [see details](/tutorial/cache/auto-invalidate)                                                                                                                        |
| transform      | function       | Convert response data, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                          |
| shareRequest   | boolean        | Request-level shared request switch, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                            |
| meta           | any            | method metadata, [see details](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                                       |

> In addition to the configurable parameters above, other parameters supported by the request adapter are also supported.

- **Return**

method instance

- **Example**

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

## alova.Post()

Create a method instance for a POST request.

- **Type**

```ts
interface Alova {
  Post(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameter**

1. url: request URL

2. data: request body

3. config: configuration options, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance

- **Example**

```ts
const postUsers = alovaInstance.Post(
  '/createUser',
  {
    name: 'alova',
    age: 18,
    gender: 'male'
  },
  {
    // Configuration parameters...
  }
);
```

## alova.Delete()

Create a method instance for a DELETE request.

- **Type**

```ts
interface Alova {
  Delete(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameter**

1. url: request URL

2. data: request body

3. config: configuration options, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance

- **Example**

```ts
const deleteUsers = alovaInstance.Delete(
  '/deleteUser',
  {
    id: 1
  },
  {
    // Configuration parameters...
  }
);
```

## alova.Put()

Create a method instance for a PUT request.

- **Type**

```ts
interface Alova {
  Put(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameter**

1. url: request URL

2. data: request body

3. config: configuration options, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance

- **Example**

```ts
const putUsers = alovaInstance.Put(
  '/updateUser',
  {
    id: 1,
    name: 'alova'
  },
  {
    // Configuration parameters...
  }
);
```

## alova.Head()

Create a method instance for HEAD request.

- **Type**

```ts
interface Alova {
  Head(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameter**

1. url: request URL
2. config: configuration options, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance

## alova.Patch()

Create a method instance for the PATCH request.

- **Type**

```ts
interface Alova {
  Patch(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameter**

1. url: request URL

2. data: request body

3. config: configuration options, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance

## alova.Options()

Create a method instance for OPTIONS request.

- **Type**

```ts
interface Alova {
  Options(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameter**

1. url: request URL
2. config: configuration options, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance
