---
title: method实例
---

一个 method 实例对应一个请求信息描述，它拥有一次请求的 url、请求头、请求参数，以及响应数据处理、缓存数据处理等请求行为参数。通过 method 实例，你可以在任意的 js 环境下感受到统一的使用体验，只需要非常少的改动就可以正常运行起来，此外，method 实例将请求参数和请求行为参数放在了一起，更便于 api 的管理，而不是分散在多个代码文件中。

## PromiseLike 特性

method 实例是一个 PromiseLike 实例，它拥有`then/catch/finally`函数，因此你可以按如下方式使用：

```ts
// 调用method的then函数
method.then(res => {
  console.log(res);
});

// 捕获异常
method.catch(e => {
  console.log(e);
});

// 请求完成调用
method.finally(() => {
  console.log('请求完成');
});
```

此外，也可以通过`await method`来发送请求。

## new Method()

自定义创建 method 实例。

- **类型**

```ts
interface MethodConstructor {
  new (
    type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH',
    context: Alova,
    url: string,
    config?: AlovaMethodCreateConfig,
    data?: Arg | string | FormData | Blob | ArrayBuffer | URLSearchParams | ReadableStream
  ): Method;
  readonly prototype: Method;
}
```

- **参数**

1. `type`：请求类型
2. `context`：alova 实例
3. `url`：请求 url
4. `config`：配置参数, 类型与[alova.Get](/api/alova#alovaget)的 config 参数类型一致
5. `data`：请求体数据

- **示例**

```ts
import { Method } from 'alova';
import { alovaInstance } from './api';

const method = new Method('GET', alovaInstance, '/api/users', {
  params: {
    id: 1
  }
});
```

## method.headers

请求头。

- **类型**

```ts
interface Method {
  headers?: any;
}
```

## method.baseURL

请求的基础路径，继承于[alova 实例](/api/alova)。

- **类型**

```ts
interface Method {
  baseURL: string;
}
```

## method.url

创建 method 实例的 url。

- **类型**

```ts
interface Method {
  url: string;
}
```

## method.type

请求类型。

- **类型**:

```ts
interface Method {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
}
```

## method.data

请求 body。

- **类型**

```ts
interface Method {
  data?: any;
}
```

## method.context

创建当前 method 的 alova 实例。

- **类型**

```ts
interface Method {
  context: Alova;
}
```

## method.hitSource

打击源方法实例，当源方法实例请求成功时，当前方法实例的缓存将被失效。作为自动失效功能，只需设置打击源即可，而不需要手动调用`invalidateCache`失效缓存。此外，此功能在错综复杂的失效关系中比`invalidateCache`方法更简洁有效，该字段值可设置为 method 实例、其他 method 实例的 name、name 正则匹配，或者它们的数组。

- **类型**

```ts
interface Method {
  hitSource?: Method | string | RegExp | (Method | string | RegExp)[];
}
```

## method.meta

method 的 元数据，用于记录请求特性信息，[详情查看](/tutorial/getting-started/basic/method-metadata)。

- **类型**

```ts
interface Method {
  meta?: any;
}
```

## method.config

通过`alova.Get/alova.Post`等方法创建 method 时的配置信息，[详情查看](/api/alova#alovaget)。

- **类型**

```ts
interface Method {
  config: AlovaMethodCreateConfig;
}
```

## method.fromCache

当前请求的数据是否来自缓存。

- **类型**

```ts
interface Method {
  fromCache: boolean;
}
```

## method.promise

当前请求的 Promise 实例，在请求中有值。

- **类型**

```ts
interface Method {
  promise?: Promise<Responded>;
}
```

- **示例**

```ts
createAlova({
  beforeRequest(method) {
    method!.promise.then(data => {
      // ...
    });
  }
});
```

## method.key

当前 method 的 key，你可以通过修改它自定义当前 method 的缓存 key。

- **类型**

```ts
interface Method {
  key: string;
}
```

> [查看自定义 method 的 key](/tutorial/advanced/in-depth/custom-method-key)

## method.dhs

当前 method 的下载进度事件的回调函数数组。

- **类型**

```ts
interface Method {
  dhs: ProgressHandler[];
}
```

## method.uhs

当前 method 的上传进度事件的回调函数数组。

- **类型**

```ts
interface Method {
  uhs: ProgressHandler[];
}
```

## method.send()

使用此 method 实例直接发送请求，发送请求可省略调用此方法。

- **类型**

```ts
interface Method {
  send(forceRequest?: boolean): Promise<Response>;
}
```

- **参数**

1. `forceRequest`：是否强制请求，默认为 false

- **返回**

附带响应数据的 Promise 实例。

- **示例**

```ts
const method = alova.Get('/api/users');
const response = await method.send();
```

## method.abort()

中止当前请求。

- **类型**

```ts
interface Method {
  abort(): void;
}
```

- **示例**

```ts
const method = alova.Get('/api/users');
method.abort();
```

## method.then()

method 实例是一个 PromiseLike 实例，可直接调用此方法或`await method`发送请求，获得响应数据。

- **类型**

```ts
interface Method {
  then(
    onFulfilled?: (value: Response) => any,
    onRejected?: (reason: any) => any
  ): Promise<Response>;
}
```

- **参数**

1. `onFulfilled`：请求成功时的回调函数
2. `onRejected`：请求失败时的回调函数

- **返回**

附带响应数据的 Promise 实例。

- **示例**

```ts
const method = alova.Get('/api/users');
const response = await method;
```

## method.catch()

method 实例是一个 PromiseLike 实例，可直接调用此方法发送请求，并捕获错误。

- **类型**

```ts
interface Method {
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<Response | TResult>;
}
```

- **参数**

1. `onrejected`：请求错误时的回调函数

- **返回**

Promise 实例。

- **示例**

```ts
const method = alova.Get('/api/users');
const response = await method.catch(error => {
  console.error('请求错误');
});
```

## method.finally()

method 实例是一个 PromiseLike 实例，可直接调用此方法发送请求，并处理响应完成。

- **类型**

```ts
interface Method {
  finally(onfinally?: (() => void) | undefined | null): Promise<Response>;
}
```

- **返回**

Promise 实例。

- **示例**

```ts
const method = alova.Get('/api/users');
const response = await method.finally(() => {
  console.log('请求完成');
});
```

## method.onDownload()

绑定下载事件，可获得下载进度信息。

- **类型**

```ts
interface Method {
  onDownload(handler: ProgressHandler): () => void;
}
```

- **参数**

1. `handler`下载事件回调函数

- **返回**

解绑函数

- **示例**

```ts
const method = alova.Get('/api/download_file');
const offEvent = method.onDownload(event => {
  console.log('文件大小：', event.total);
  console.log('已下载：', event.loaded);
});

offEvent();
```

## method.onUpload()

绑定上传事件，可获得上传进度信息。

- **类型**

```ts
interface Method {
  onUpload(handler: ProgressHandler): () => void;
}
```

- **参数**

1. `handler`上传事件回调函数

- **返回**

解绑函数

- **示例**

```ts
const method = alova.Get('/api/upload_file', formData);
const offEvent = method.onUpload(event => {
  console.log('文件大小：', event.total);
  console.log('已上传：', event.loaded);
});

offEvent();
```

## method.generateKey()

生成当前 method 的 key，它在创建 method 实例时被调用，你可以通过重写`Method.prototype.generateKey`方法自定义生成 key。

- **类型**

```ts
interface Method {
  generateKey(): string;
}
```

- **参数**

无

- **返回**

当前 method 实例的 key 值。

- **示例**

```ts
Method.prototype.generateKey = function () {
  // 自定义生成 key
  return customKey;
};
```

## method.setName()

设置 method 实例的 name。

- **类型**

```ts
interface Method {
  setName(name: string | number): void;
}
```

- **参数**

1. `name`：method 实例的 name

- **返回**

无

- **示例**

```ts
const method = alova.Get('/api/users', {
  name: 'user'
});
method.setName('newUser');
```
