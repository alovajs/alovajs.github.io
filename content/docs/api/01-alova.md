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

1. config: Configuration parameters

| Parameter name | Type                        | Description                                                                                                             |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| requestAdapter | object                      | Request adapter, required, [View details](/tutorial/advanced/custom/http-adapter)                                       |
| id             | string \| number            | Alova instance id, optional, [View details](/tutorial/cache/mode#set-alova-id)                                          |
| baseURL        | string                      | Base path, optional, default is empty, [View details](/tutorial/getting-started/basic/alova)                            |
| statesHook     | object                      | State management hook, optional, [see details](/tutorial/getting-started/basic/combine-framework)                       |
| timeout        | number                      | Timeout, default is no timeout, [see details](/tutorial/getting-started/basic/alova)                                    |
| cacheFor       | object                      | Local cache configuration, default GET has 5000ms cache, [see details](/tutorial/cache/mode)                            |
| l1Cache        | object                      | Level1 cache adapter [see details](/tutorial/cache/mode)                                                                |
| l2Cache        | object                      | Level2 cache adapter, [see details](/tutorial/cache/mode)                                                               |
| beforeRequest  | function                    | Before request hook, [see details](/tutorial/getting-started/basic/global-interceptor)                                  |
| responded      | object \| function          | Request response hook, [see details](/tutorial/getting-started/basic/global-interceptor)                                |
| shareRequest   | boolean                     | Share request, [see details](/tutorial/getting-started/basic/alova)                                                     |
| cacheLogger    | boolean \| null \| function | Cache log, [see details](/tutorial/advanced/in-depth/cache-logger)                                                      |
| snapshots      | number                      | method The number of snapshots is limited, the default is 1000, [see details](/tutorial/client/in-depth/method-matcher) |

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

alova instance id, used to distinguish different alova instances, can be used to accurately match the method instance of the specified alova in the [method matcher](/tutorial/client/in-depth/method-matcher).

- **Type**: string

## alova.options

When creating an alova instance through `createAlova`, the object after the default configuration is merged with the passed in configuration object.

- **Type**

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

The level1 cache adapter corresponding to the alova instance, the default is memory cache.

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

The level2 cache adapter corresponding to the alova instance. The default value is `localStorage` in the client, and there is no adapter on the server by default.

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

The method snapshot storage of the current instance.

- **Type** `ts class MethodSnapshotContainer<AG extends AlovaGenerics> { records: Record<string, Set<Method<AG>>>; capacity: number; occupy: number; save(methodInstance: Method<AG>): void; match<M extends boolean = true>( matcher: MethodFilter<AG>, matchAll?: M ): M extends true ? Method<AG>[] : Method<AG> | undefined; } ` ## al ova.Get() creates a method instance for a GET request.

- **Type**

```ts
interface Alova {
  Get(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameter**

1. url: request address
2. config: configuration parameters

| Parameter name | Type           | Description                                                                                                                                                                                                                                                                                                                 |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headers        | object         | Request header, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                       |
| params         | object         | Request parameters, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                   |
| name           | string         | Method object name. In [updateState](/tutorial/client/in-depth/update-across-components), [invalidateCache](/tutorial/cache/manually-invalidate), [setCache](/tutorial/cache/set-and-query), and [fetch function](/tutorial/client/strategy/use-fetcher), you can get the corresponding method instance by name or wildcard |
| timeout        | number         | Request timeout, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                      |
| cacheFor       | cacheForConfig | Response cache time, [see details](/tutorial/cache/mode)                                                                                                                                                                                                                                                                    |
| hitSource      | string         | Hit the source method instance. When the source method instance request succeeds, the cache of the current method instance will be invalidated. [View details](/tutorial/cache/auto-invalidate)                                                                                                                             |
| transform      | function       | Transform response data. [View details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                             |
| shareRequest   | boolean        | Request-level shared request switch. [View details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                 |
| meta           | any            | method metadata. [View details](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                                            |

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

## `[3.3.0+]`alova.Request()

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
| url            | string         | request url                                                                                                                                                                                                                                                                                                            |
| method         | string         | request method, such as GET/POST, default is `GET`                                                                                                                                                                                                                                                                     |
| headers        | object         | request header, [view details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                 |
| params         | object         | request parameters, [view details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                             |
| name           | string         | method object name, in [updateState](/tutorial/client/in-depth/update-across-components), [invalidateCache](/tutorial/cache/manually-invalidate), [setCache](/tutorial/cache/set-and-query), and [fetch function](/tutorial/client/strategy/use-fetcher) can get the corresponding method instance by name or wildcard |
| timeout        | number         | request timeout, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                 |
| cacheFor       | cacheForConfig | response cache time, [see details](/tutorial/cache/mode)                                                                                                                                                                                                                                                               |
| hitSource      | string         | hit source method instance, when the source method instance request is successful, the cache of the current method instance will be invalidated, [see details](/tutorial/cache/auto-invalidate)                                                                                                                        |
| transform      | function       | Convert response data, [View details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                          |
| shareRequest   | boolean        | Request-level shared request switch, [View details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                            |
| meta           | any            | method metadata, [View details](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                                       |

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

## alova.Get()

Create a method instance for a GET request.

- **Type**

```ts
interface Alova {
  Get(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameter**

1. url: request address
2. config: configuration parameters

| Parameter name | Type           | Description                                                                                                                                                                                                                                                                                                            |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headers        | object         | request header, [view details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                 |
| params         | object         | request parameters, [view details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                             |
| name           | string         | method object name, in [updateState](/tutorial/client/in-depth/update-across-components), [invalidateCache](/tutorial/cache/manually-invalidate), [setCache](/tutorial/cache/set-and-query), and [fetch function](/tutorial/client/strategy/use-fetcher) can get the corresponding method instance by name or wildcard |
| timeout        | number         | request timeout, [see details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                 |
| cacheFor       | cacheForConfig | response cache time, [see details](/tutorial/cache/mode)                                                                                                                                                                                                                                                               |
| hitSource      | string         | hit source method instance, when the source method instance request is successful, the cache of the current method instance will be invalidated, [see details](/tutorial/cache/auto-invalidate)                                                                                                                        |
| transform      | function       | Convert response data, [View details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                          |
| shareRequest   | boolean        | Request-level shared request switch, [View details](/tutorial/getting-started/basic/method)                                                                                                                                                                                                                            |
| meta           | any            | method metadata, [View details](/tutorial/getting-started/basic/method-metadata)                                                                                                                                                                                                                                       |

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

1. url: request address

2. data: request body

3. config: configuration parameters, parameter type is the same as [alova.Get](#alovaget)

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

1. url: request address

2. data: request body

3. config: configuration parameters, parameter type is the same as [alova.Get](#alovaget)

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

1. url: request address

2. data: request body

3. config: configuration parameters, parameter type is the same as [alova.Get](#alovaget)

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

1. url: request address
2. config: configuration parameters, parameter type is the same as [alova.Get](#alovaget)

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

1. url: request address

2. data: request body

3. config: configuration parameters, parameter type is the same as [alova.Get](#alovaget)

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

1. url: request address
2. config: configuration parameters, parameter type is the same as [alova.Get](#alovaget)

- **Return**

method instance
