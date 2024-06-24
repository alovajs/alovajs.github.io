---
title: Typescript
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In terms of Typescript, we have indeed spent a lot of effort on optimization in order to provide a better user experience. We try our best to use automatic type inference to reduce the trouble of defining types for you.

## Automatically infer alova useHooks states type

When createAlova creates an alova instance, the state types created by `useRequest`, `useWatcher`, and `useFetcher` will be automatically inferred based on the passed `statesHook`. Currently only Vue, React, and Svelte are supported.

> `useFetcher` is a useHook used for data fetching. For details, please read [Advanced-Data fetching chapter](/tutorial/advanced/use-fetcher).

The following are the status types returned by useHooks by default.

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

The type of data will be different depending on the response data type specified in different Method instances, let's continue to look below.

## Type of response data

When you specify a type for a data interface, you need to divide it into two situations.

### Case 1

When the response data does not need to be converted by calling `transformData`, the type can be specified directly through generics.

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

When the response data needs to be converted by calling `transformData`, the type needs to be specified in the conversion function parameter, and then its return value type will be used as the response data type.

```typescript
interface Todo {
  title: string;
  time: string;
  done: boolean;
}
const Get = alovaInstance.Get('/todo/list', {
  //Write the type into the data parameter, and the headers will be automatically inferred, so you don’t need to specify the type.
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

:::warning note

The response data is converted by the global response interceptor, so when setting the type, it should also be set to the converted type.

:::

## Type inferred from request adapter

Because alova supports custom request adapters, and the request configuration objects, response objects, and response headers of different adapters may be different, so the global `beforeRequest`, `responded` interceptors, and the configuration object when the `Method` instance is created The types will be automatically inferred based on the types provided by the request adapter. Let's look at these types first.

If you are using [**GlobalFetch**](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts), alova will automatically infer the type using `fetch api`, The types of fetch api are as follows.

```typescript
declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
```

### Method configuration type of instance

The method configuration type will be automatically inferred as:

```typescript
// AlovaMethodCommonConfig is a unified request parameter and behavior parameter
// highlight-start
const methodConfig: AlovaMethodCommonConfig & RequestInit = {
  // highlight-end
  // ...
};
alovaInstance.Get('/api/user', methodConfig);
```

### Global response interceptor parameter type

The type of responded interceptor will be automatically inferred as:

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
