---
title: Typescript
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在Typescript方面，我们确实花了很大的精力优化，为的就是提供更好的使用体验，我们尽力地使用自动推断类型来减少你定义类型的麻烦。

## alova useHooks的状态类型
在`createAlova`创建alova实例时会根据传入的`statesHook`自动推断出`useRequest`、`useWatcher`、`useFetcher`所创建的状态类型。遗憾的是，目前只支持Vue、React、Svelte三个MVVM库，如果你涉及其他库就需要自己编写类型来实现了。

以下为预设中，useHooks返回的状态类型。

<Tabs>
<TabItem value="1" label="VueHook">

```javascript
const vueAlova = createAlova({
  statesHook: VueHook,
  // ...
});
const {
  loading,  // Ref<boolean>
  data,  // Ref<unknown>
  error,  // Ref<Error>
} = useRequest(vuealovaInstance.Get('/todo/list'));
```

</TabItem>
<TabItem value="2" label="ReactHook">

```javascript
const reactAlova = createAlova({
  statesHook: ReactHook,
  // ...
});
const {
  loading,  // boolean
  data,  // unknown
  error,  // Error
} = useRequest(reactalovaInstance.Get('/todo/list'));
```

</TabItem>
<TabItem value="3" label="SvelteHook">

```javascript
const svelteAlova = createAlova({
  statesHook: SvelteHook,
  // ...
});
const {
  loading,  // Writable<boolean>
  data,  // Writable<unknown>
  error,  // Writable<Error>
} = useRequest(sveltealovaInstance.Get('/todo/list'));
```

</TabItem>
</Tabs>

你可能会发现，data的类型是`unknown`，因为data需要根据不同的Method实例中单独指定类型，我们继续往下看。
## 响应数据的类型
当你为一个数据接口指定类型时，需要分为两种情况。

### 情况1
当响应数据不需要再调用`transformData`转换，直接通过泛型指定类型
```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get<Todo[]>('/todo/list');
```

### 情况2
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
```

### 以上情况对应的类型推断
<Tabs>
<TabItem value="1" label="vue">

```typescript
const { data } = useRequest(() => Get);

// 情况1：data类型自动推断为Ref<Todo[]>
// 情况1：data类型自动推断为Ref<(Todo & {status: string})[]>
```

</TabItem>
<TabItem value="2" label="react">

```typescript
const { data } = useRequest(() => Get);

// 情况1：data类型自动推断为Todo[]
// 情况1：data类型自动推断为(Todo & {status: string})[]
```

</TabItem>
<TabItem value="3" label="svelte">

```typescript
const { data } = useRequest(() => Get);

// 情况1：data类型自动推断为Writable<Todo[]>
// 情况1：data类型自动推断为Writable<(Todo & {status: string})[]>
```

</TabItem>
</Tabs>

:::caution 注意
响应数据是经过全局响应拦截器转换后的，因此设置类型时也应该设置为转换后的类型。
:::


## 根据请求适配器推断的类型
因为alova支持自定义请求适配器，而不同的适配器的请求配置对象、响应对象、响应头都可能不同，因此全局的`beforeRequest`、`responsed`拦截器，以及`Method`实例创建时的配置对象的类型，都会根据请求适配器提供的类型自动推断，我们先来看这几个类型。
```typescript
/** 通用的Method实例的通用配置类型 */
type CommonMethodConfig = {
  readonly url: string,
  readonly method: MethodType,
  data?: Record<string, any> | FormData | string,
};

/** Method实例创建时的配置对象的类型 */
type AlovaMethodConfig<R, T, RC, RH> = {
  /** 以下为创建Method实例时指定的配置对象 */
  name?: string,

  /** url中的参数，一个对象 */
  params?: Record<string, any>,

  /** 请求头，一个对象 */
  headers?: Record<string, any>,

  /** 静默请求，onSuccess将会立即触发，如果请求失败则会保存到缓存中后续继续轮询请求 */
  silent?: boolean,

  /** 当前中断时间 */
  timeout?: number,

  /** 响应数据在缓存时间内则不再次请求。get请求默认保鲜5分钟（300000毫秒），其他请求默认不缓存 */
  localCache?: number | Date | {
    expire: number | Date,
    mode?: number,
    tag?: string | number,
  },

  /** 是否启用下载进度信息，启用后每次请求progress才会有进度值，否则一致为0，默认不开启 */
  enableDownload?: boolean,

  /** 是否启用上传进度信息，启用后每次请求progress才会有进度值，否则一致为0，默认不开启 */
  enableUpload?: boolean,

  /** 响应数据转换，转换后的数据将转换为data状态，没有转换数据则直接用响应数据作为data状态 */
  transformData?: (data: T, headers: RH) => R,
} & RC;
```
上文中提到的`RC`、`RH`，以及未出现的`RE`都是通过请求适配器推断的，它们分别表示是：
- **RC**：请求配置对象类型
- **RH**：响应头对象类型
- **RE**：响应类型

如果你正在使用 **GlobalFetch**，他们的类型分别会被推断为：
- **RC**：fetch api的请求配置对象`RequestInit`;
- **RH**：响应头对象`Headers`;
- **RE**：响应对象`Response`;



## 全局请求前拦截器参数类型
全局请求前拦截器`beforeRequest`接收一个汇总的请求配置，它的类型为：
```typescript
/** alova请求适配器配置数据类型 */
type AlovaRequestAdapterConfig<R, T, RC, RH> = 
  CommonMethodConfig
  & AlovaMethodConfig<R, T, RC, RH>
  & {
    // 会保证headers、params参数是一个对象
    headers: Record<string, any>,
    params: Record<string, any>,
  };
```

```typescript
/** 通用的请求配置 */
type CommonMethodConfig = {
	readonly url: string;
	readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
	data?: Record<string, any> | FormData | string;
};
```

```typescript
/** alova Method实例配置类型 */
type AlovaMethodConfig<R, T, RC, RH> = {
	/** method对象名称，在updateState、invalidateCache、setCacheData、以及fetch函数中可以通过名称或通配符获取对应method对象 */
	name?: string;
	params?: Arg;
	headers?: Arg;

	/** 当前中断时间 */
	timeout?: number;

	/** 响应数据在缓存时间内则不再次请求。get、head请求默认保鲜5分钟（300000毫秒），其他请求默认不缓存 */
	localCache?: LocalCacheConfig;

	/** 是否启用下载进度信息，启用后每次请求progress才会有进度值，否则一致为0，默认不开启 */
	enableDownload?: boolean;

	/** 是否启用上传进度信息，启用后每次请求progress才会有进度值，否则一致为0，默认不开启 */
	enableUpload?: boolean;

	/** 响应数据转换，转换后的数据将转换为data状态，没有转换数据则直接用响应数据作为data状态 */
	transformData?: (data: T, headers: RH) => R;
} & RC;
```

## 全局响应拦截器参数类型
全局响应拦截器`responsed`接收两个参数：
- 第一个为响应对象，它的类型为响应对象 **RE**；
- 第二个为请求配置对象，你可以获取此次请求的参数，也可以用它作为请求前后的数据传递上下文；
```typescript
type ResponsedHandler<R, T, RC, RE, RH> = (
  response: RE,
  config: AlovaRequestAdapterConfig<R, T, RC, RH>
) => any;
```
当请求适配器使用`GlobalFetch`时，**RE** 将自动推断为`Response`类型。

## Method配置对象的类型
Method配置对象的类型为上面提到的 [AlovaMethodConfig](#根据请求适配器推断的类型)，它包含通用的配置参数和根据请求适配器推断出的 **RC** 的并集。当请求适配器使用 **GlobalFetch** 时，**RC** 将自动推断为`RequestInit`类型。


## 请求适配器类型
```typescript
interface Progress {
  total: number;  // 总量
  loaded: number; // 已加载量
}

type AlovaRequestAdapter<R, T, RC, RE, RH> = (adapterConfig: AlovaRequestAdapterConfig<R, T, RC, RH>) => {
  response: () => Promise<RE>,
  headers: () => Promise<RH>,
  onDownload?: (handler: (total: number, loaded: number) => void) => void,
  onUpload?: (handler: (total: number, loaded: number) => void) => void,
  abort: () => void,
};
```
需要注意的是，如果需要在alova中自动推断 **RC**、**RE**、**RH** 类型，那么请求适配器上不应该指定任何泛型，否则会导致类型推断错误。

以 **GlobalFetch** 为例。

> [GlobalFetch源码点此查看](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)

```typescript
type GlobalFetch = (defaultRequestInit?: RequestInit) => 
  (adapterConfig: AlovaRequestAdapterConfig<unknown, unknown, RequestInit, Headers>) => {
    response: () => Promise<Response>;
    headers: () => Promise<Headers>;
    onDownload: (handler: (total: number, loaded: number) => void) => void;
    abort: () => void;
  };
```

## 自定义States Hook的类型
敬请期待...