---
title: Typescript
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在 Typescript 方面，我们确实花了很大的精力优化，为的就是提供更好的使用体验，我们尽力地使用自动推断类型来减少你定义类型的麻烦。

## 自动推断 alova useHooks 状态类型

在 createAlova 创建 alova 实例时会根据传入的`statesHook`自动推断出`useRequest`、`useWatcher`、`useFetcher`等所有 useHooks 所创建的状态类型。

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

## 设置响应数据的类型

当你为一个数据接口指定类型时，需要分为两种情况。

### 情况 1

当响应数据不需要再调用`transform`转换，直接通过泛型指定类型

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

当响应数据需要再调用`transform`转换，那就需要在转换函数参数中指定类型，然后它的返回值类型将会作为响应数据类型。

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get('/todo/list', {
  // 将类型写到data参数中，而headers会自动推断，可以不用指定类型
  transform(data: Todo[], headers) {
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

因为 alova 支持自定义请求适配器，而不同的适配器的请求配置对象、响应对象、响应头都可能不同，因此全局的`beforeRequest`、`responded`拦截器，以及 method 实例创建时的配置对象的类型，都会根据请求适配器提供的类型自动推断，我们先来看这几个类型。

如果你正在使用 `alova/fetch`，alova 将会使用`fetch api`的类型自动推断，fetch api 的类型如下。

```typescript
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
```

### method 实例的配置类型

method 配置类型将被自动推断为：

```typescript
// AlovaMethodCommonConfig为统一的请求参数和行为参数
// highlight-start
const methodConfig: AlovaMethodCommonConfig & RequestInit = {
  // highlight-end
  // ...
};
alovaInstance.Get('/api/user', methodConfig);
```

### 全局响应拦截器参数类型

responded 拦截器的类型将被自动推断为：

```typescript
createAlova({
  // ...
  // highlight-start
  responded: (response: Response, method: Method) => {
    // highlight-end
    // ...
  }
});
```

## 自定义 meta 数据类型

默认情况下 method 元数据的类型为`any`，当你需要规范格式时，可以在项目的声明文件中配置以下类型。

```ts
import 'alova';

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: {
      role: string;
      errorModal: boolean;
    };
  }
}
```
