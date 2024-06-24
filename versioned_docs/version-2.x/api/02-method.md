---
title: method instance
---

A method instance corresponds to a request information description, which has the URL, request headers, request parameters of a request, as well as request behavior parameters such as response data processing and cache data processing. Through method instances, you can feel a unified usage experience in any js environment, and it can run normally with very few changes. In addition, method instances put request parameters and request behavior parameters together, making it easier for APIs management instead of spreading it across multiple code files.

## PromiseLike attribute

After `[v2.16.0]`, the method instance is a PromiseLike instance, which has `then/catch/finally` functions, so you can use it as follows:

```ts
// Call the then function of method
method.then(res => {
  console.log(res);
});

// catch exception
method.catch(e => {
  console.log(e);
});

//Request completion call
method.finally(() => {
  console.log('Request completed');
});
```

In addition, requests can also be sent through the `await method`.

## new Method()

Create a custom method instance.

- **type**

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

- **Parameters**

1. `type`: request type
2. `context`: alova instance
3. `url`: request url
4. `config`: Configuration parameters, the type is the same as config parameter type of [alova.Get](/api/alova#alovaget)
5. `data`: request body data

- **Example**

```ts
import { Method } from 'alova';
import { alovaInstance } from './api';

const method = new Method('GET', alovaInstance, '/api/users', {
  params: {
    ID: 1
  }
});
```

## getMethodKey()

Get the key value of method. This key value is used as alova internal cache key.

- **type**

```ts
function getMethodKey(method: Method): string;
```

- **Parameters**

1. `method`: method instance

- **return**

The key value of the method instance passed in.

- **Example**

```ts
import { getMethodKey } from 'alova';

const method = alova.Get('/api/users');
const methodKey = getMethodKey(method);
```

## matchSnapshotMethod()

Obtain the requested method instance snapshot using the matching method of [method instance matcher](/tutorial/advanced/method-matcher) and return the matching result.

- **type**

```ts
type MethodFilter =
  | string
  | RegExp
  | {
      name?: string | RegExp;
      filter?: MethodFilterHandler;
      alova?: Alova;
    };
function matchSnapshotMethod(
  matcher: MethodFilter,
  matchAll?: boolean
): Method[] | Method | undefined;
```

- **Parameters**

1. `matcher`: method instance matcher
2. `matchAll`: Whether to match all, the default is true

- **return**

Returns an array of method instances when `matchAll` is true, otherwise returns a method instance or undefined

- **Example**

```ts
import { matchSnapshotMethod } from 'alova';

await alova.Get('/api/users');
const snapshotMethod = matchSnapshotMethod({
  name: 'user',
  filter(method, i, methodArray) {
    return method.url.includes('users');
  },
  alova: alova
});
```

## method.headers

Request header.

- **type**

```ts
interface Method {
  headers?: any;
}
```

## method.baseURL

The base path of the request, inherited from [alova instance](/api/alova).

- **type**

```ts
interface Method {
  baseURL: string;
}
```

## method.url

Create the url of the method instance.

- **type**

```ts
interface Method {
  url: string;
}
```

## method.type

Request type.

- **type**:

```ts
interface Method {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
}
```

## method.data

Request body.

- **type**

```ts
interface Method {
  data?: any;
}
```

## method.context

Create an alova instance of the current method.

- **type**

```ts
interface Method {
  context: Alova;
}
```

## method.hitSource

Hitting the source method instance, when the source method instance request succeeds, the cache of the current method instance will be invalidated. As an automatic invalidation function, you only need to set the hit source instead of manually calling `invalidateCache` to invalidate the cache. In addition, this function is more concise and effective than the `invalidateCache` method in complex invalidation relationships. The field value can be set to the name of the method instance, other method instances, name regular matching, or their array.

- **type**

```ts
interface Method {
  hitSource?: Method | string | RegExp | (Method | string | RegExp)[];
}
```

## method.meta

The metadata of method is used to record request feature information, [View details](/tutorial/getting-started/method-metadata).

- **type**

```ts
interface Method {
  meta?: any;
}
```

## method.config

Configuration information when creating a method through `alova.Get/alova.Post` and other methods, [View details](/api/alova#alovaget).

- **type**

```ts
interface Method {
  config: AlovaMethodCreateConfig;
}
```

## method.fromCache

Is the response of current request from cache.

- **type**

```ts
interface Method {
  fromCache: boolean;
}
```

## method.send()

Use this method instance to send the request directly. If you send the request after `[v2.16.0]`, you can omit calling this method.

- **type**

```ts
interface Method {
  send(forceRequest?: boolean): Promise<Response>;
}
```

- **Parameters**

1. `forceRequest`: whether to force the request, the default is false

- **return**

A Promise instance with response data.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method.send();
```

## method.abort()

Abort the current request.

- **type**

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

After `[v2.16.0]`, the method instance is a PromiseLike instance. You can directly call this method or `await method` to send a request and obtain the response data.

- **type**

```ts
interface Method {
  then(
    onFulfilled?: (value: Response) => any,
    onRejected?: (reason: any) => any
  ): Promise<Response>;
}
```

- **Parameters**

1. `onFulfilled`: callback function when the request is successful
2. `onRejected`: callback function when the request fails

- **return**

A Promise instance with response data.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method;
```

## method.catch()

After `[v2.16.0]`, the method instance is a PromiseLike instance. This method can be called directly to send requests and catch errors.

- **type**

```ts
interface Method {
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<Response | TResult>;
}
```

- **Parameters**

1. `onrejected`: callback function when request error

- **return**

Promise instance.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method.catch(error => {
  console.error('Request error');
});
```

## method.finally()

After `[v2.16.0]`, the method instance is a PromiseLike instance. This method can be called directly to send the request and handle the response completion.

- **type**

```ts
interface Method {
  finally(onfinally?: (() => void) | undefined | null): Promise<Response>;
}
```

- **return**

Promise instance.

- **Example**

```ts
const method = alova.Get('/api/users');
const response = await method.finally(() => {
  console.log('Request completed');
});
```

## method.onDownload()

Bind the download event to obtain download progress information.

- **type**

```ts
interface Method {
  onDownload(handler: ProgressHandler): () => void;
}
```

- **Parameters**

1. `handler` download event callback function

- **return**

unbind function

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

Bind the upload event to obtain upload progress information.

- **type**

```ts
interface Method {
  onUpload(handler: ProgressHandler): () => void;
}
```

- **Parameters**

1. `handler` upload event callback function

- **return**

unbind function

- **Example**

```ts
const method = alova.Get('/api/upload_file', formData);
const offEvent = method.onUpload(event => {
  console.log('File size:', event.total);
  console.log('Uploaded:', event.loaded);
});

offEvent();
```

## method.setName()

Set the name of the method instance.

- **type**

```ts
interface Method {
  setName(name: string | number): void;
}
```

- **Parameters**

1. `name`: the name of the method instance

- **return**

none

- **Example**

```ts
const method = alova.Get('/api/users', {
  name: 'user'
});
method.setName('newUser');
```
