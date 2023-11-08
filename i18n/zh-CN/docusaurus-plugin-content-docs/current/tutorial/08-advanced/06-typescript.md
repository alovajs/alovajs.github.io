---
title: Typescript
sidebar_position: 60
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在 Typescript 方面，我们确实花了很大的精力优化，为的就是提供更好的使用体验，我们尽力地使用自动推断类型来减少你定义类型的麻烦。

## 自动推断 alova useHooks 状态类型

在 createAlova 创建 alova 实例时会根据传入的`statesHook`自动推断出`useRequest`、`useWatcher`、`useFetcher`所创建的状态类型。目前只支持 Vue、React、Svelte。

以下为预设中，useHooks 返回的状态类型。

<Tabs groupId="framework">
<TabItem value="1" label="VueHook">

```typescript
const vueAlova = createAlova({
  statesHook: VueHook
  // ...
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
  // ...
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
  // ...
});
const {
  loading, // Writable<boolean>
  data, // Writable<{ data: any }>
  error // Writable<Error>
} = useRequest(svelteAlova.Get<{ data: any }>('/todo/list'));
```

</TabItem>
</Tabs>

data 的类型将会根据不同的 Method 实例中指定的响应数据类型而不同，我们继续往下看。

## 响应数据的类型

当你为一个数据接口指定类型时，需要分为两种情况。

### 情况 1

当响应数据不需要再调用`transformData`转换，直接通过泛型指定类型

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get<Todo[]>('/todo/list');
const { data } = useRequest(Get);
// vue: data的类型为Ref<Todo[]>
// react: data的类型为Todo[]
// svelte: data的类型为Writable<Todo[]>
```

### 情况 2

当响应数据需要再调用`transformData`转换，那就需要在转换函数参数中指定类型，然后它的返回值类型将会作为响应数据类型。

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get('/todo/list', {
  // 将类型写到data参数中，而headers会自动推断，可以不用指定类型
  transformData(data: Todo[], headers) {
    return data.map(item => ({
      ...item,
      status: item.done ? '已完成' : '未完成'
    }));
  }
});

const { data } = useRequest(Get);
// vue: data的类型为Ref<(Todo & { status: string })[]>
// react: data的类型为(Todo & { status: string })[]
// svelte: data的类型为Writable<(Todo & { status: string })[]>
```

:::warning 注意

响应数据是经过全局响应拦截器转换后的，因此设置类型时也应该设置为转换后的类型。

:::

## 根据请求适配器推断的类型

因为 alova 支持自定义请求适配器，而不同的适配器的请求配置对象、响应对象、响应头都可能不同，因此全局的`beforeRequest`、`responded`拦截器，以及`Method`实例创建时的配置对象的类型，都会根据请求适配器提供的类型自动推断，我们先来看这几个类型。

以下是 GlobalFetch 的类型

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

在这个类型中分别指定了`RC`、`RE`和`RH`三个类型的值，因此在全局的拦截器中、method 实例配置中等地方将自动推断为请求适配器给定的类型。

它们分别表示为：

- **RC**：*RequestConfig*的缩写，请求配置对象类型
- **RH**：*ResponseHeader*的缩写，响应头对象类型
- **RE**：*Response*的缩写，响应类型

如果你正在使用 **GlobalFetch**，他们的类型分别会被推断为：

- **RC**：fetch api 的请求配置对象`RequestInit`;
- **RH**：响应头对象`Headers`;
- **RE**：响应对象`Response`;

## 全局响应拦截器参数类型

全局响应拦截器`responded`接收两个参数：

- 第一个为响应数据，它的类型为响应对象 **RE**；
- 第二个为当前请求的 method 实例，你可以获取此次请求的参数，也可以用它作为请求前后的数据传递上下文；

```typescript
type RespondedHandler<R, T, RC, RE, RH> = (response: RE, methodInstance: Method<any, any, R, T, RC, RE, RH>) => any;
```

当请求适配器使用`GlobalFetch`时，**RE** 将自动推断为`Response`类型。

## Method 配置对象的类型

```typescript
/**
 * 请求缓存设置
 * expire: 过期时间
 *  1. 当设置为数字时：如果大于0则首先返回缓存数据，过期时间单位为毫秒，小于等于0不缓存，Infinity为永不过期；
 *  2. 当设置为Date对象时，表示
 * mode: 缓存模式，可选值为memory、placeholder、restore
 */
type CacheExpire = number | Date;
type DetailLocalCacheConfig = {
  expire: CacheExpire;
  mode?: 'memory' | 'placeholder' | 'restore';

  /** 持久化缓存标签，标签改变后原有持久化数据将会失效 */
  tag?: string | number;
};
type LocalCacheConfig = CacheExpire | DetailLocalCacheConfig;

type AlovaMethodConfig<R, T, RC, RH> = {
  /** method对象名称，在updateState、invalidateCache、setCache、以及fetch函数中可以通过名称或通配符获取对应method对象 */
  name?: string | number;
  params?: Arg;
  headers?: Arg;

  /** 当前中断时间 */
  timeout?: number;

  /** 响应数据在缓存时间内则不再次请求。get、head请求默认保鲜5分钟（300000毫秒），其他请求默认不缓存 */
  localCache?: LocalCacheConfig;

  /**
   * 打击源方法实例，当源方法实例请求成功时，当前方法实例的缓存将被失效
   * 作为自动失效功能，只需设置打击源即可，而不需要手动调用invalidateCache失效缓存
   * 同时，此功能在错综复杂的失效关系中比invalidateCache方法更简洁
   * 该字段值可设置为method实例、其他method实例的name、name正则匹配，或者它们的数组
   */
  hitSource?: string | RegExp | Method | (string | RegExp | Method)[];

  /** 是否启用下载进度信息，启用后每次请求progress才会有进度值，否则一致为0，默认不开启 */
  enableDownload?: boolean;

  /** 是否启用上传进度信息，启用后每次请求progress才会有进度值，否则一致为0，默认不开启 */
  enableUpload?: boolean;

  /** 响应数据转换，转换后的数据将转换为data状态，没有转换数据则直接用响应数据作为data状态 */
  transformData?: (data: T, headers: RH) => R;
} & RC;
```

Method 配置对象内，包含通用的配置参数和根据请求适配器推断出的 **RC** 的并集，当请求适配器使用 **GlobalFetch** 时，**RC** 将自动推断为`RequestInit`类型。

## 请求适配器类型

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

需要注意的是，如果需要在 alova 中自动推断 **RC**、**RE**、**RH** 类型，那么请求适配器上不应该指定任何泛型，否则会导致类型推断错误。

以 **GlobalFetch** 为例。

> [GlobalFetch 源码点此查看](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)

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

## 自定义 States Hook 的类型

敬请期待...
