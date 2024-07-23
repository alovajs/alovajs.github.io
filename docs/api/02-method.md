---
title: method instance
---

A method instance corresponds to a request information description. It has a request URL, request header, request parameters, and request behavior parameters such as response data processing and cache data processing. Through the method instance, you can experience a unified usage experience in any JS environment, and it can run normally with very few changes. In addition, the method instance puts the request parameters and request behavior parameters together, which is more convenient for API management, rather than being scattered in multiple code files.

## PromiseLike feature

The method instance is a PromiseLike instance, which has `then/catch/finally` functions, so you can use it as follows:

```ts
// Call method's then function
method.then(res => {
  console.log(res);
});

// Catch exceptions
method.catch(e => {
  console.log(e);
});

// Request completion call
method.finally(() => {
  console.log('request completed');
});
```

In addition, you can also send requests through `await method`.

## new Method()

Customize the creation of method instances.

- **Type**

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

- **Parameter**

1. `type`: request type

2. `context`: alova instance

3. `url`: request url

4. `config`: configuration parameters, the type is consistent with the config parameter type of [alova.Get](/api/alova#alovaget)

5. `data`: request body data

- **Example**

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

Request headers.

- **Type**

```ts
interface Method {
  headers?: any;
}
```

## method.baseURL

The base path of the request, inherited from [alova instance](/api/alova).

- **Type**

```ts
interface Method {
  baseURL: string;
}
```

## method.url

The url to create a method instance.

- **Type**

```ts
interface Method {
  url: string;
}
```

## method.type

Request type.

- **Type**:

```ts
interface Method {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
}
```

## method.data

Request body.

- **Type**

```ts
interface Method {
  data?: any;
}
```

## method.context

Create an Alova instance for the current method.

- **Type**

```ts
interface Method {
  context: Alova;
}
```

## method.hitSource

Hit the source method instance. When the source method instance request succeeds, the cache of the current method instance will be invalidated. As an automatic invalidation function, you only need to set the hit source, without manually calling `invalidateCache` to invalidate the cache. In addition, this function is more concise and effective than the `invalidateCache` method in complex invalidation relationships. The field value can be set to a method instance, the name of other method instances, a name regular match, or an array of them.

- **Type**

```ts
interface Method {
  hitSource?: Method | string | RegExp | (Method | string | RegExp)[];
}
```

## method.meta

Metadata of method, used to record request feature information, [Details](/tutorial/getting-started/basic/method-metadata).

- **Type**

```ts
interface Method {
  meta?: any;
}
```

## method.config

Configuration information when creating a method through methods such as `alova.Get/alova.Post`, [Details](/api/alova#alovaget).

- **Type**

```ts
interface Method {
  config: AlovaMethodCreateConfig;
}
```

## method.fromCache

Whether the data of the current request comes from the cache.

- **Type**

```ts
interface Method {
  fromCache: boolean;
}
```

## method.promise

The Promise instance of the current request, which has a value in the request.

- **Type**

```ts
interface Method {
  promise?: Promise<Responded>;
}
```

- **Example**

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

The key of the current method. You can customize the cache key of the current method by modifying it.

- **Type**

```ts
interface Method {
  key: string;
}
```

> [View the key of custom method](/tutorial/advanced/in-depth/custom-method-key)

## method.dhs

The callback function array of the download progress event of the current method.

- **Type**

```ts
interface Method {
  dhs: ProgressHandler[];
}
```

## method.uhs

The callback function array of the upload progress event of the current method.

- **Type**

```ts
interface Method {
  uhs: ProgressHandler[];
}
```

## method.send()

Use this method instance to send a request directly. You can omit calling this method when sending a request.

- **Type**

```ts
interface Method {
  send(forceRequest?: boolean): Promise<Response>;
}
```

- **Parameter**

1. `forceRequest`: Whether to force the request, default is false

- **Return**

Promise instance with response data.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method.send();
```

## method.abort()

Abort the current request.

- **Type**

```ts
interface Method {
  abort(): void;
}
```

- **Example**

```ts
const method = alova.Get('/api/users');
method.abort();
```

## method.then()

The method instance is a PromiseLike instance. You can directly call this method or `await method` to send a request and get the response data.

- **Type**

```ts
interface Method {
  then(
    onFulfilled?: (value: Response) => any,
    onRejected?: (reason: any) => any
  ): Promise<Response>;
}
```

- **Parameter**

1. `onFulfilled`: callback function when the request is successful

2. `onRejected`: callback function when the request fails

- **Return**

Promise instance with response data.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method;
```

## method.catch()

The method instance is a PromiseLike instance. You can directly call this method to send a request and catch errors.

- **Type**

```ts
interface Method {
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<Response | TResult>;
}
```

- **Parameter**

1. `onrejected`: callback function when request error occurs

- **Return**

Promise instance.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method.catch(error => {
  console.error('Request error');
});
```

## method.finally()

The method instance is a PromiseLike instance. You can directly call this method to send a request and handle the response completion.

- **Type**

```ts
interface Method {
  finally(onfinally?: (() => void) | undefined | null): Promise<Response>;
}
```

- **Return**

Promise instance.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method.finally(() => {
  console.log('Request completed');
});
```

## method.onDownload()

Binding the download event, you can get the download progress information.- **Type**

```ts
interface Method {
  onDownload(handler: ProgressHandler): () => void;
}
```

- **Parameter**

1. `handler` download event callback function

- **Return**

Unbinding function

- **Example**

```ts
const method = alova.Get('/api/download_file');
const offEvent = method.onDownload(event => {
  console.log('File size:', event.total);
  console.log('Downloaded:', event.loaded);
});

offEvent();
```

## method.onUpload()

Bind the upload event to get the upload progress information.

- **Type**

```ts
interface Method {
  onUpload(handler: ProgressHandler): () => void;
}
```

- **Parameter**

1. `handler` upload event callback function

- **Return**

Unbinding function

- **Example**

```ts
const method = alova.Get('/api/upload_file', formData);
const offEvent = method.onUpload(event => {
  console.log('File size:', event.total);
  console.log('Uploaded:', event.loaded);
});

offEvent();
```

## method.generateKey()

Generate the key of the current method. It is called when creating a method instance. You can customize the key generation by overriding the `Method.prototype.generateKey` method.

- **Type**

```ts
interface Method {
  generateKey(): string;
}
```

- **Parameter**

None

- **Return**

The key value of the current method instance.

- **Example**

```ts
Method.prototype.generateKey = function () {
  // Customize key generation
  return customKey;
};
```

## method.setName()

Set the name of the method instance.

- **Type**

```ts
interface Method {
  setName(name: string | number): void;
}
```

- **Parameter**

1. `name`: name of the method instance

- **Return**

None

- **Example**

```ts
const method = alova.Get('/api/users', {
  name: 'user'
});
method.setName('newUser');
```
