---
title: alova实例
sidebar_position: 10
---

## createAlova()

创建一个 alova 实例。

- **类型**

```ts
function createAlova(options?: AlovaOptions): Alova;
```

- **参数**

1. options: 配置参数

| 参数名         | 类型                        | 说明                                                                                      |
| -------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| baseURL        | string                      | 基础路径，默认为空，[查看详情](/tutorial/getting-started/alova)                           |
| statesHook     | object                      | 状态管理钩子，选填，[查看详情](/tutorial/combine-framework)                               |
| requestAdapter | object                      | 请求适配器，必填，[查看详情](/tutorial/custom/custom-http-adapter)                        |
| timeout        | number                      | 超时时间，默认不超时，[查看详情](/tutorial/getting-started/alova)                         |
| localCache     | object                      | 本地缓存配置，默认 GET 有 5000ms 缓存，[查看详情](/tutorial/cache/mode)                   |
| storageAdapter | object                      | 本地存储适配器，默认为`localStorage`，[查看详情](/tutorial/custom/custom-storage-adapter) |
| beforeRequest  | function                    | 请求前钩子，[查看详情](/tutorial/getting-started/global-interceptor)                      |
| responded      | object \| function          | 请求响应钩子，[查看详情](/tutorial/getting-started/global-interceptor)                    |
| shareRequest   | boolean                     | 共享请求，[查看详情](/tutorial/getting-started/alova)                                     |
| errorLogger    | boolean\| null \| function  | 错误日志，[查看详情](/tutorial/advanced/error-logger)                                     |
| cacheLogger    | boolean \| null \| function | 缓存日志，[查看详情](/tutorial/advanced/cache-logger)                                     |

- **返回**

Alova 实例

- **示例**

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

alova 实例 id，用于区分不同的 alova 实例，可在[method 匹配器](/tutorial/advanced/method-matcher)中精准匹配指定 alova 的 method 实例。

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

alova 实例对应的存储适配器实例，默认为`AlovaGlobalStorage`，它使用的是`localStorage`。

- **类型**

```ts
interface AlovaStorageAdapter {
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
}
```

## alova.Get()

创建 GET 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Get(url: string, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. options: 配置参数

| 参数名         | 类型             | 说明                                                                                                                                                                                                                                                                           |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| headers        | object           | 请求头，[查看详情](/tutorial/getting-started/method)                                                                                                                                                                                                                           |
| params         | object           | 请求参数，[查看详情](/tutorial/getting-started/method)                                                                                                                                                                                                                         |
| name           | string           | method 对象名称，在 [updateState](/tutorial/advanced/update-across-components)、[invalidateCache](/tutorial/cache/manually-invalidate)、[setCache](/tutorial/cache/set-and-query)、以及 [fetch 函数](/tutorial/advanced/use-fetcher)中可以通过名称或通配符获取对应 method 实例 |
| timeout        | number           | 请求超时时间，[查看详情](/tutorial/getting-started/method)                                                                                                                                                                                                                     |
| localCache     | LocalCacheConfig | 响应缓存时间，[查看详情](/tutorial/cache/mode)                                                                                                                                                                                                                                 |
| hitSource      | string           | 打击源方法实例，当源方法实例请求成功时，当前方法实例的缓存将被失效，[查看详情](/tutorial/cache/auto-invalidate)                                                                                                                                                                |
| enableDownload | boolean          | 开启下载进度信息，[查看详情](/tutorial/combine-framework/download-upload-progress)                                                                                                                                                                                             |
| enableUpload   | boolean          | 开启上传进度信息，[查看详情](/tutorial/combine-framework/download-upload-progress)                                                                                                                                                                                             |
| transformData  | function         | 转换响应数据，[查看详情](/tutorial/combine-framework/response)                                                                                                                                                                                                                 |
| shareRequest   | boolean          | 请求级共享请求开关，[查看详情](/tutorial/getting-started/method)                                                                                                                                                                                                               |

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
  Post(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. options: 配置参数，参数类型同[alova.Get](#alovaget)

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
  Delete(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. options: 配置参数，参数类型同[alova.Get](#alovaget)

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
  Put(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. options: 配置参数，参数类型同[alova.Get](#alovaget)

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
  Head(url: string, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. options: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

## alova.Patch()

创建 PATCH 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Patch(url: string, data?: object | FormData | string | null, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. data: 请求 body
3. options: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例

## alova.Options()

创建 OPTIONS 请求的 method 实例。

- **类型**

```ts
interface Alova {
  Options(url: string, options?: AlovaMethodCreateConfig): Method;
}
```

- **参数**

1. url: 请求地址
2. options: 配置参数，参数类型同[alova.Get](#alovaget)

- **返回**

method 实例
