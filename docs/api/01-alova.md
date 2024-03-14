---
title: alova instance
sidebar_position: 10
---

## createAlova()

Create an alova instance.

- **type**

```ts
function createAlova(options?: AlovaOptions): Alova;
```

- **Parameters**

1. options: configuration parameters

| Parameter name | Type                        | Description                                                                                               |
| -------------- | --------------------------- | --------------------------------------------------------------------------------------------------------- |
| baseURL        | string                      | Base path, empty by default, [View details](/tutorial/getting-started/alova)                              |
| statesHook     | object                      | State management hook, optional, [View details](/tutorial/combine-framework)                              |
| requestAdapter | object                      | Request adapter, required, [View details](/tutorial/custom/custom-http-adapter)                           |
| timeout        | number                      | Timeout time, no timeout by default, [View details](/tutorial/getting-started/alova)                      |
| localCache     | object                      | Local cache configuration, default GET has 5000ms cache, [View details](/tutorial/cache/mode)             |
| storageAdapter | object                      | Local storage adapter, default is `localStorage`, [View details](/tutorial/custom/custom-storage-adapter) |
| beforeRequest  | function                    | Before request hook, [View details](/tutorial/getting-started/global-interceptor)                         |
| responded      | object \| function          | Request response hook, [View details](/tutorial/getting-started/global-interceptor)                       |
| shareRequest   | boolean                     | Share request, [View details](/tutorial/getting-started/alova)                                            |
| errorLogger    | boolean\| null \| function  | Error log, [View details](/tutorial/advanced/error-logger)                                                |
| cacheLogger    | boolean \| null \| function | Cache log, [View details](/tutorial/advanced/cache-logger)                                                |

- **return**

Alova instance

- **Example**

```ts
import { createAlova } from 'alova';

const alova = createAlova({
  baseURL: 'https://example.com',
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  timeout: 3000
  // ...
});
```

## alova.id

The alova instance id is used to distinguish different alova instances. It can accurately match the method instance of the specified alova in [method instance matcher](/tutorial/advanced/method-matcher).

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
  localCache?: GlobalLocalCacheConfig;
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
  Get(url: string, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. options: configuration parameters

| Parameter name | Type             | Description                                                                                                                                                                                                                                                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| headers        | object           | Request headers, [View details](/tutorial/getting-started/method)                                                                                                                                                                                                                                                |
| params         | object           | Request parameters, [View details](/tutorial/getting-started/method)                                                                                                                                                                                                                                             |
| name           | string           | method object name, in [updateState](/tutorial/advanced/update-across-components), [invalidateCache](/tutorial/cache/manually-invalidate), [setCache](/tutorial/cache/set-and-query), and [fetch function](/tutorial/advanced/use-fetcher), you can obtain the corresponding method instance by name or wildcard |
| timeout        | number           | Request timeout, [View details](/tutorial/getting-started/method)                                                                                                                                                                                                                                                |
| localCache     | LocalCacheConfig | Response cache time, [View details](/tutorial/cache/mode)                                                                                                                                                                                                                                                        |
| hitSource      | string           | Hit the source method instance. When the source method instance request is successful, the cache of the current method instance will be invalidated. [View details](/tutorial/cache/auto-invalidate)                                                                                                             |
| enableDownload | boolean          | Enable download progress information, [View details](/tutorial/combine-framework/download-upload-progress)                                                                                                                                                                                                       |
| enableUpload   | boolean          | Enable upload progress information, [View details](/tutorial/combine-framework/download-upload-progress)                                                                                                                                                                                                         |
| transformData  | function         | Transform response data, [View details](/tutorial/combine-framework/response)                                                                                                                                                                                                                                    |
| shareRequest   | boolean          | Request-level sharing request switch, [View details](/tutorial/getting-started/method)                                                                                                                                                                                                                           |

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
  Post(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. options: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

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
  Delete(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. options: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

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
  Put(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. options: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

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
  Head(url: string, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. options: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance

## alova.Patch()

Create a method instance for the PATCH request.

- **type**

```ts
interface Alova {
  Patch(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. data: request body
3. options: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance

## alova.Options()

Create a method instance of the OPTIONS request.

- **type**

```ts
interface Alova {
  Options(url: string, options?: AlovaMethodCreateConfig): Method;
}
```

- **Parameters**

1. url: request address
2. options: configuration parameters, the parameter type is the same as [alova.Get](#alovaget)

- **return**

method instance
