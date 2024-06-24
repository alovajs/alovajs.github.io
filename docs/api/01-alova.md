---
title: alova instance
---

## createAlova()

Create an alova instance.

- **type**

```ts
function createAlova(options?: AlovaOptions): Alova;
```

- **Parameters**

1. config: configuration parameters

| Parameter name | Type                        | Description                                                                                                      |
| -------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| baseURL        | string                      | Base path, empty by default, [View details](/next/tutorial/getting-started/basic/alova)                          |
| statesHook     | object                      | State management hook, optional, [View details](/next/tutorial/getting-started/basic/combine-framework)          |
| requestAdapter | object                      | Request adapter, required, [View details](/next/tutorial/advanced/custom/http-adapter)                           |
| timeout        | number                      | Timeout time, no timeout by default, [View details](/next/tutorial/getting-started/basic/alova)                  |
| cacheFor       | object                      | Local cache configuration, default GET has 5000ms cache, [View details](/next/tutorial/cache/mode)               |
| storageAdapter | object                      | Local storage adapter, default is `localStorage`, [View details](/next/tutorial/advanced/custom/storage-adapter) |
| beforeRequest  | function                    | Before request hook, [View details](/next/tutorial/getting-started/basic/global-interceptor)                     |
| responded      | object \| function          | Request response hook, [View details](/next/tutorial/getting-started/basic/global-interceptor)                   |
| shareRequest   | boolean                     | Share request, [View details](/next/tutorial/getting-started/basic/alova)                                        |
| cacheLogger    | boolean \| null \| function | Cache log, [View details](/next/tutorial/advanced/in-depth/cache-logger)                                         |

- **return**

Alova instance

- **Example**

```ts
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import VueHook from 'alova/vue';

const alova = createAlova({
  baseURL: 'https://example.com',
  statesHook: VueHook,
  requestAdapter: adapterFetch(),
  timeout: 3000
  // ...
});
```

## alova.id

The alova instance id is used to distinguish different alova instances. It can accurately match the method instance of the specified alova in [method instance matcher](/next/tutorial/client/in-depth/method-matcher).

- **Type**: string

## alova.options

When creating an alova instance through `createAlova`, the default configuration is merged with the passed-in configuration object.

- **type**

```ts
interface AlovaOptions {
  statesHook: StatesHook;
  requestAdapter: AlovaRequestAdapter;
  baseURL?: string;
  timeout?: number;
  cacheFor?: GlobalcacheForConfig;
  storageAdapter?: AlovaStorageAdapter;
  beforeRequest?: Function;
  responded?: Function | ResponsedHandlerRecord;
  shareRequest?: boolean;
  errorLogger?: boolean | null | Function;
  cacheLogger?: boolean | null | Function;
}
```

## alova.storage

The storage adapter instance corresponding to the alova instance defaults to `AlovaGlobalStorage`, which uses `localStorage`.

- **type**

```ts
interface AlovaStorageAdapter {
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
}
```

## alova.Get()

Create a method instance for the GET request.

- **type**

```ts
interface Alova {
  Get(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. config: configuration parameters

| Parameter name | Type           | Description                                                                                                                                                                                                                                                                                                                                        |
| -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headers        | object         | Request headers, [View details](/next/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                                       |
| params         | object         | Request parameters, [View details](/next/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                                    |
| name           | string         | method object name, in [updateState](/next/tutorial/client/in-depth/update-across-components), [invalidateCache](/next/tutorial/cache/manually-invalidate), [setCache](/next/tutorial/cache/set-and-query), and [fetch function](/next/tutorial/client/strategy/use-fetcher), you can obtain the corresponding method instance by name or wildcard |
| timeout        | number         | Request timeout, [View details](/next/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                                       |
| cacheFor       | cacheForConfig | Response cache time, [View details](/next/tutorial/cache/mode)                                                                                                                                                                                                                                                                                     |
| hitSource      | string         | Hit the source method instance. When the source method instance request is successful, the cache of the current method instance will be invalidated. [View details](/next/tutorial/cache/auto-invalidate)                                                                                                                                          |
| transform      | function       | Transform response data, [View details](/next/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                               |
| shareRequest   | boolean        | Request-level sharing request switch, [View details](/next/tutorial/getting-started/basic/method)                                                                                                                                                                                                                                                  |

> In addition to the configurable parameters above, other parameters supported by the request adapter are also supported.

- **return**

method instance

- **Example**

```ts
const getUsers = alovaInstance.Get('/users', {
  params: {
    ID: 1
  }
  // ...
});
```

## alova.Post()

Create a method instance for the POST request.

- **type**

```ts
interface Alova {
  Post(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. config: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

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

Create a method instance for the DELETE request.

- **type**

```ts
interface Alova {
  Delete(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. config: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance

- **Example**

```ts
const deleteUsers = alovaInstance.Delete(
  '/deleteUser',
  {
    ID: 1
  },
  {
    // Configuration parameters...
  }
);
```

## alova.Put()

Create a method instance for the PUT request.

- **type**

```ts
interface Alova {
  Put(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. config: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

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

Create a method instance of the HEAD request.

- **type**

```ts
interface Alova {
  Head(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. config: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance

## alova.Patch()

Create a method instance for the PATCH request.

- **type**

```ts
interface Alova {
  Patch(
    url: string,
    data?: object | FormData | string | null,
    config?: AlovaMethodCreateConfig
  ): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. config: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance

## alova.Options()

Create a method instance of the OPTIONS request.

- **type**

```ts
interface Alova {
  Options(url: string, config?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. config: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance
