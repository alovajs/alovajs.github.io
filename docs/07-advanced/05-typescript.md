---
title: Typescript
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In terms of Typescript, we really put a lot of effort into optimization in order to provide a better user experience, and we try our best to use automatically inferred types to reduce the trouble of defining types.

## useHooks state type

When `createAlova` creates an alova instance, it will automatically infer the state types created by `useRequest`, `useWatcher`, and `useFetcher` according to the `statesHook` passed in. Unfortunately, only three MVVM libraries, Vue, React, and Svelte are currently supported. If you involve other libraries, you need to write your own types to implement them.

The following are the state types returned by useHooks by default.

<Tabs>
<TabItem value="1" label="VueHook">

```javascript
const vueAlova = createAlova({
  statesHook: VueHook
  // ...
});
const {
  loading, // Ref<boolean>
  data, // Ref<unknown>
  error // Ref<Error>
} = useRequest(vuealovaInstance.Get('/todo/list'));
```

</TabItem>
<TabItem value="2" label="ReactHook">

```javascript
const reactAlova = createAlova({
  statesHook: ReactHook
  // ...
});
const {
  loading, // boolean
  data, // unknown
  error // Error
} = useRequest(reactalovaInstance.Get('/todo/list'));
```

</TabItem>
<TabItem value="3" label="SvelteHook">

```javascript
const svelteAlova = createAlova({
  statesHook: SvelteHook
  // ...
});
const {
  loading, // Writable<boolean>
  data, // Writable<unknown>
  error // Writable<Error>
} = useRequest(sveltealovaInstance.Get('/todo/list'));
```

</TabItem>
</Tabs>

You may find that the type of data is `unknown`, because data needs to be individually specified according to different Method instances, we will continue to look down.

## types of response data

When you specify a type for a data interface, there are two cases.

### Case 1

When the response data does not need to call `transformData` conversion, directly specify the type through the generic

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get<Todo[]>('/todo/list');
```

### Case 2

When the response data needs to be transformed by calling `transformData` again, you need to specify the type in the transformation function parameter, and then its return value type will be used as the response data type.

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get('/todo/list', {
  // Write the type to the data parameter, and the headers will be automatically inferred, so you don't need to specify the type
  transformData(data: Todo[], headers) {
    return data.map(item => ({
      ...item,
      status: item.done ? 'done' : 'incomplete'
    }));
  }
});
```

### Inference for the above cases

<Tabs>
<TabItem value="1" label="vue">

```typescript
const { data } = useRequest(() => Get);

// Case 1: The data type is automatically inferred as Ref<Todo[]>
// Case 1: The data type is automatically inferred as Ref<(Todo & {status: string})[]>
```

</TabItem>
<TabItem value="2" label="react">

```typescript
const { data } = useRequest(() => Get);

// Case 1: The data type is automatically inferred as Todo[]
// Case 1: The data type is automatically inferred as (Todo & {status: string})[]
```

</TabItem>
<TabItem value="3" label="svelte">

```typescript
const { data } = useRequest(() => Get);

// Case 1: The data type is automatically inferred as Writable<Todo[]>
// Case 1: The data type is automatically inferred as Writable<(Todo & {status: string})[]>
```

</TabItem>
</Tabs>

:::caution note
The response data is converted by the global response interceptor, so when setting the type, it should also be set to the converted type.
:::

## Types inferred from the request adapter

Because alova supports custom request adapters, and the request configuration objects, response objects, and response headers of different adapters may be different, the global `beforeRequest`, `responsed` interceptors, and the `Method` instance are created when the configuration object is created. The type will be automatically inferred based on the type provided by the request adapter. Let's look at these types first.

```typescript
/** Generic configuration type for generic Method instances */
type CommonMethodConfig = {
  readonly url: string;
  readonly method: MethodType;
  data?: Record<string, any> | FormData | string;
};

/** The type of the configuration object when the Method instance was created */
type AlovaMethodConfig<R, T, RC, RH> = {
  /** The following is the configuration object specified when creating the Method instance */
  name?: string;

  /** parameters in url, an object */
  params?: Record<string, any>;

  /** request header, an object */
  headers?: Record<string, any>;

  /** Silent request, onSuccess will be triggered immediately, if the request fails, it will be saved in the cache and continue to poll the request */
  silent?: boolean;

  /** Current interrupt time */
  timeout?: number;

  /** The response data will not be requested again within the cache time. Get requests are kept fresh for 5 minutes by default (300000 milliseconds), other requests are not cached by default */
  localCache?:
    | number
    | Date
    | {
        expire: number | Date;
        mode?: number;
        tag?: string | number;
      };

  /** Whether to enable download progress information. After enabling, each request for progress will have a progress value. Otherwise, the same value is 0, and it is not enabled by default. */
  enableDownload?: boolean;

  /** Whether to enable upload progress information. After enabling, each request for progress will have a progress value, otherwise the same value is 0, and it is not enabled by default */
  enableUpload?: boolean;

  /** Response data conversion, the converted data will be converted to data state, if there is no conversion data, the response data will be directly used as data state */
  transformData?: (data: T, headers: RH) => R;
} & RC;
```

The `RC`, `RH`, and the missing `RE` mentioned above are all inferred by the request adapter, and they represent:

- **RC**: Request configuration object type
- **RH**: response header object type
- **RE**: response type

If you are using **GlobalFetch**, their types will be inferred as:

- **RC**: fetch api request configuration object `RequestInit`;
- **RH**: response header object `Headers`;
- **RE**: Response object `Response`;

## Global beforeRequest interceptor parameter type

The global pre-request interceptor `beforeRequest` receives an aggregated request configuration of type:

```typescript
/** alova request adapter configuration data type */
type AlovaRequestAdapterConfig<R, T, RC, RH> = CommonMethodConfig &
  AlovaMethodConfig<R, T, RC, RH> & {
    // Will ensure that the headers, params parameters are an object
    headers: Record<string, any>;
    params: Record<string, any>;
  };
```

```typescript
/** Generic request configuration */
type CommonMethodConfig = {
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
  data?: Record<string, any> | FormData | string;
};
```

```typescript
/** alova Method instance configuration type */
type AlovaMethodConfig<R, T, RC, RH> = {
  /** The name of the method object, in the updateState, invalidateCache, setCacheData, and fetch functions, the corresponding method object can be obtained by name or wildcard */
  name?: string;
  params?: Arg;
  headers?: Arg;

  /** Current interrupt time */
  timeout?: number;

  /** The response data will not be requested again within the cache time. The default preservation of get and head requests is 5 minutes (300000 milliseconds), and other requests are not cached by default */
  localCache?: LocalCacheConfig;

  /** Whether to enable download progress information. After enabling, each request for progress will have a progress value. Otherwise, the same value is 0, and it is not enabled by default. */
  enableDownload?: boolean;

  /** Whether to enable upload progress information. After enabling, each request for progress will have a progress value, otherwise the same value is 0, and it is not enabled by default */
  enableUpload?: boolean;

  /** Response data conversion, the converted data will be converted to data state, if there is no conversion data, the response data will be directly used as data state */
  transformData?: (data: T, headers: RH) => R;
} & RC;
```

## Global responsed interceptor parameter type

The global response interceptor `responsed` accepts two parameters:

- The first one is the response object, its type is the response object **RE**;
- The second is the request configuration object, you can get the parameters of this request, or use it as the data transfer context before and after the request;

```typescript
type ResponsedHandler<R, T, RC, RE, RH> = (response: RE, config: AlovaRequestAdapterConfig<R, T, RC, RH>) => any;
```

When the request adapter uses `GlobalFetch`, **RE** will be automatically inferred to be of type `Response`.

## Method config type

The type of the Method configuration object is the above mentioned [AlovaMethodConfig](#The type inferred from the request adapter), which contains the union of common configuration parameters and **RC** inferred from the request adapter. When the request adapter uses **GlobalFetch**, **RC** will be automatically inferred to be of type `RequestInit`.

## Request adapter

```typescript
interface Progress {
  total: number; // total amount
  loaded: number; // loaded amount
}

type AlovaRequestAdapter<R, T, RC, RE, RH> = (adapterConfig: AlovaRequestAdapterConfig<R, T, RC, RH>) => {
  response: () => Promise<RE>;
  headers: () => Promise<RH>;
  onDownload?: (handler: (total: number, loaded: number) => void) => void;
  onUpload?: (handler: (total: number, loaded: number) => void) => void;
  abort: () => void;
};
```

It should be noted that if **RC**, **RE**, **RH** types need to be automatically inferred in alova, no generics should be specified on the request adapter, otherwise it will cause type inference errors.

Take **GlobalFetch** for example.

> [Click here to view the source code of GlobalFetch](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)

```typescript
type GlobalFetch = (defaultRequestInit?: RequestInit) => (
  adapterConfig: AlovaRequestAdapterConfig<unknown, unknown, RequestInit, Headers>
) => {
  response: () => Promise<Response>;
  headers: () => Promise<Headers>;
  onDownload: (handler: (total: number, loaded: number) => void) => void;
  abort: () => void;
};
```

## Customize the type of statesHook

Coming soon...
