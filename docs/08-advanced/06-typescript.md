---
title: Typescript
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In terms of Typescript, we have indeed spent a lot of energy on optimization in order to provide a better user experience. We try our best to use automatic inference types to reduce your trouble in defining types.

## Automatically infer alova useHooks state type

When createAlova creates an alova instance, it will automatically infer the state types created by `useRequest`, `useWatcher`, and `useFetcher` according to the incoming `statesHook`. Currently only supports Vue, React, Svelte.

The following are the state types returned by useHooks by default.

<Tabs groupId="framework">
<TabItem value="1" label="VueHook">

```typescript
const vueAlova = createAlova({
  statesHook: VueHook
  //...
});
const {
  loading, // Ref<boolean>
  data, // Ref<{ data: any }>
  error // Ref<Error>
} = useRequest(vueAlova.Get<{ data: any }>('/todo/list'));
```

</TabItem>
<TabItem value="2" label="ReactHook">

```typescript
const reactAlova = createAlova({
  statesHook: ReactHook
  //...
});
const {
  loading, // boolean
  data, // { data: any }
  error // Error
} = useRequest(reactAlova.Get<{ data: any }>('/todo/list'));
```

</TabItem>
<TabItem value="3" label="SvelteHook">

```typescript
const svelteAlova = createAlova({
  statesHook: SvelteHook
  //...
});
const {
  loading, // Writable<boolean>
  data, // Writable<{ data: any }>
  error // Writable<Error>
} = useRequest(svelteAlova.Get<{ data: any }>('/todo/list'));
```

</TabItem>
</Tabs>

The type of data will be different according to the response data type specified in different Method instances, let's continue to look down.

## The type of response data

When you specify a type for a data interface, there are two cases.

### Case 1

When the response data does not need to call `transformData` conversion, specify the type directly through generics

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get<Todo[]>('/todo/list');
const { data } = useRequest(Get);
// vue: The type of data is Ref<Todo[]>
// react: The type of data is Todo[]
// svelte: The type of data is Writable<Todo[]>
```

### Case 2

When the response data needs to be transformed by calling `transformData` again, it is necessary to specify the type in the transformation function parameter, and then its return value type will be used as the response data type.

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get('/todo/list', {
  // Write the type to the data parameter, and the headers will automatically infer, you don't need to specify the type
  transformData(data: Todo[], headers) {
    return data.map(item => ({
      ...item,
      status: item.done ? 'Completed' : 'Not completed'
    }));
  }
});

const { data } = useRequest(Get);
// vue: The type of data is Ref<(Todo & { status: string })[]>
// react: The type of data is (Todo & { status: string })[]
// svelte: The type of data is Writable<(Todo & { status: string })[]>
```

:::caution Caution

The response data is converted by the global response interceptor, so when setting the type, it should also be set to the converted type.

:::

## The type inferred from the request adapter

Because alova supports custom request adapters, and different adapters may have different request configuration objects, response objects, and response headers, the global `beforeRequest`, `responsed` interceptors, and the configuration objects when `Method` instances are created The type will be automatically inferred based on the type provided by the request adapter. Let's look at these types first.

Following are the types of GlobalFetch

```javascript
type GlobalFetch = () => (
  elements: RequestElements,
  method: Method<any, any, any, any, RequestInit, Response, Headers>
) => {
  response: () => Promise<Response>,
  headers: () => Promise<Headers>,
  onDownload: (handler: ProgressUpdater) => void,
  abort: () => void
};
```

In this type, three types of values `RC`, `RE` and `RH` are respectively specified, so in the global interceptor, method instance configuration, etc., it will be automatically inferred as the type given by the request adapter.

They are respectively expressed as:

- **RC**: Abbreviation of _RequestConfig_, request configuration object type
- **RH**: Abbreviation of _ResponseHeader_, response header object type
- **RE**: Abbreviation for _Response_, response type

If you are using **GlobalFetch**, their types will be inferred as:

- **RC**: fetch api request configuration object `RequestInit`;
- **RH**: response header object `Headers`;
- **RE**: response object `Response`;

## Global response interceptor parameter type

The global response interceptor `responsed` receives two parameters:

- The first one is the response data, its type is the response object **RE**;
- The second is the method instance of the current request, you can get the parameters of this request, or use it as the data transfer context before and after the request;

```typescript
type ResponsedHandler<R, T, RC, RE, RH> = (response: RE, methodInstance: Method<any, any, R, T, RC, RE, RH>) => any;
```

When the request adapter uses `GlobalFetch`, **RE** will be automatically inferred to be of type `Response`.

## Method configuration object type

```typescript
/**
  * request cache settings
  * expire: expiration time
  * 1. When set to a number: if it is greater than 0, the cached data will be returned first, and the expiration time unit is milliseconds, if it is less than or equal to 0, it will not be cached, and Infinity will never expire;
  * 2. When set to a Date object, it means
  * mode: cache mode, optional values are memory, placeholder, restore
  */
type CacheExpire = number | Date;
typeDetailLocalCacheConfig = {
   expire: CacheExpire;
   mode?: 'memory' | 'placeholder' | 'restore';

   /** Persistent cache tag, the original persistent data will be invalid after the tag is changed */
   tag?: string | number;
};
type LocalCacheConfig = CacheExpire | DetailLocalCacheConfig;

type AlovaMethodConfig<R, T, RC, RH> = {
   /** method object name, in the updateState, invalidateCache, setCache, and fetch functions, the corresponding method object can be obtained by name or wildcard */
   name?: string | number;
   params?: Arg;
   headers?: Arg;

   /** Current interrupt time */
   timeout?: number;

   /** The response data will not be requested again within the cache time. Get and head requests are kept fresh for 5 minutes (300000 milliseconds) by default, and other requests are not cached by default */
   localCache?: LocalCacheConfig;

   /**
    * Strike the source method instance, when the source method instance request is successful, the cache of the current method instance will be invalidated
    * As an automatic invalidation function, you only need to set the strike source instead of manually calling invalidateCache to invalidate the cache
    * At the same time, this function is more concise than the invalidateCache method in the intricate invalidation relationship
    * The value of this field can be set as a method instance, the name of other method instances, a name regular match, or an array of them
    */
   hitSource?: string | RegExp | Method | (string | RegExp | Method)[];

   /** Whether to enable the download progress information, after enabling it, each time the progress is requested, there will be a progress value, otherwise it will be 0, and it will not be enabled by default */
   enableDownload?: boolean;

   /** Whether to enable the upload progress information, the progress value will be available every time the progress is requested after enabling, otherwise the value is 0, and it is not enabled by default */
   enableUpload?: boolean;

   /** Response data conversion, the converted data will be converted to the data state, if there is no converted data, the response data will be directly used as the data state */
   transformData?: (data: T, headers: RH) => R;
} & RC;
```

In the Method configuration object, it contains the union of general configuration parameters and **RC** inferred from the request adapter. When the request adapter uses **GlobalFetch**, **RC** will be automatically inferred as `RequestInit` type .

## request adapter type

```typescript
interface RequestElements {
  readonly url: string;
  readonly type: MethodType;
  readonly headers: Arg;
  readonly data?: RequestBody;
}
type ProgressUpdater = (loaded: number, total: number) => void;
type AlovaRequestAdapter<R, T, RC, RE, RH> = (
  elements: RequestElements,
  method: Method<any, any, R, T, RC, RE, RH>
) => {
  response: () => Promise<RE>;
  headers: () => Promise<RH>;
  onDownload?: (handler: ProgressUpdater) => void;
  onUpload?: (handler: ProgressUpdater) => void;
  abort: () => void;
};
```

It should be noted that if the **RC**, **RE**, **RH** types need to be automatically inferred in alova, then no generics should be specified on the request adapter, otherwise it will cause type inference errors.

Take **GlobalFetch** as an example.

> [GlobalFetch source code click here to view](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)

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

## Customize the type of States Hook

Ccming soon...
