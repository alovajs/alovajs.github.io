---
title: 发送请求
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

接下来我们要来看看如何实际发出请求了，在`alova`中提供了`useRequest`、`useWatcher`、`useFetcher`三种 use hook 实现请求时机，由它们控制何时应该发出请求，同时将会为我们创建和维护状态化的请求相关数据，如`loading`、`data`、`error`等，无需自主维护这些状态，下面我们来了解下它们。

本次我们先了解第一个 use hook，**useRequest**，它表示一次请求的发送，执行`useRequest`时默认会发送一次请求，在页面获取初始数据时是最常用的方法，同时也支持关闭它的默认的请求发送，这在提交数据等通过点击事件触发的请求场景非常有用。

## 初始数据请求

我们来为 todo 列表获取页面数据。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <!-- 你可以直接使用 data 来渲染 todo 列表 -->
  <div v-if="loading">Loading...</div>
  <div
    v-else-if="error"
    class="error">
    {{ error.message }}
  </div>
  <template v-else>
    <div v-for="todo in data">
      <div class="todo-title">{{ todo.title }}</div>
      <div class="todo-time">{{ todo.time }}</div>
    </div>
  </template>
</template>

<script setup>
  const {
    // loading是加载状态值，当加载时它的值为true，结束后自动更新为false
    // 它是一个Ref类型的值，你可以通过loading.value访问它，或直接绑定到界面中
    loading,

    // 响应数据，同样是Ref值
    data,

    // 请求错误对象，Ref值，请求错误时有值，否则为undefined
    error

    // 直接将Method实例传入即可发送请求
  } = useRequest(todoListGetter, {
    // 请求响应前，data的初始值
    initialData: []
  });
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const App = () => {
  const {
    // loading是加载状态值，当加载时它的值为true，结束后自动更新为false
    // 它的值为普通的boolean值，请求状态变化时内部将自动调用set函数更新它的值
    loading,

    // 响应数据
    data,

    // 请求错误对象，请求错误时有值，否则为undefined
    error

    // 直接将Method实例传入即可发送请求
  } = useRequest(todoListGetter, {
    // 请求响应前，data的初始值
    initialData: []
  });

  // 你可以直接使用 todoList 来渲染 todo 列表
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div class="error">{error.message}</div>;
  } else {
    return (
      <>
        <div v-for="todo in data">
          <div class="todo-title">{todo.title}</div>
          <div class="todo-time">{todo.time}</div>
        </div>
      </>
    );
  }
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const {
    // loading是加载状态值，当加载时它的值为true，结束后自动更新为false
    // 它是一个Writable类型的值，内部将维护它
    loading,

    // 响应数据
    data,

    // 请求错误对象，请求错误时有值，否则为undefined
    error

    // 直接将Method实例传入即可发送请求
  } = useRequest(todoListGetter, {
    // 请求响应前，data的初始值
    initialData: []
  });
</script>

<!-- 你可以直接使用 todoList 来渲染 todo 列表 -->
{#if $loading}
<div>Loading...</div>
{:else if $error}
<div class="error">{ $error.message }</div>
{:else} {#each $data as todo}
<div>
  <div class="todo-title">{ todo.title }</div>
  <div class="todo-time">{ todo.time }</div>
</div>
{/each} {/if}
```

</TabItem>
</Tabs>

## 绑定请求回调

如需设置请求回调，你还可以在 useRequest 的返回参数中接收回调的设置函数，如下：

```javascript
const {
  // ...

  // 成功回调绑定
  onSuccess,

  // 失败回调绑定
  onError,

  // 完成回调绑定，回调在成功或失败都会调用
  onComplete
} = useRequest(todoListGetter);
onSuccess(event => {
  console.log('请求成功，响应数据为:', event.data);
  console.log('本次请求的method实例为:', event.method);
  console.log('响应数据是否来自缓存:', event.fromCache);
});
onError(event => {
  console.log('请求失败，错误信息为:', event.error);
  console.log('本次请求的method实例为:', event.method);
});
onComplete(event => {
  // event.status在成功时为success，失败时为error
  console.log('请求完成，状态为：', event.status);
  console.log('本次请求的method实例为:', event.method);
  console.log('响应数据是否来自缓存:', event.fromCache);
  if (event.data) {
    console.log('请求数据：'，event.data)
  } else if (event.error) {
    console.log('错误信息：'，event.error)
  }
});
```

:::warning 注意

在`onSuccess`中抛出错误将会触发`onError`

:::

## 手动发送请求

当你需要创建一条新的 todo 项时，可以先关闭默认发送请求，转为手动触发请求，并在 useRequest 中接收`send`函数用于手动发送请求，`send`函数将返回带响应数据的 Promise 实例，它将在请求响应后改为 resolve 状态。

```javascript
const {
  // ...
  // 手动发送器请求的函数，调用后发送请求
  send: addTodo
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // 当immediate为false时，默认不发出
  immediate: false
});

// 手动发送请求
const handleAddTodo = () => {
  const newTodo = {
    title: '新的todo项',
    time: new Date().toLocaleString()
  };
  // send函数返回一个Promise对象，可接收响应数据
  addTodo(newTodo)
    .then(result => {
      console.log('新增todo项成功，响应数据为:', result);
    })
    .catch(error => {
      console.log('新增todo项失败，错误信息为:', error);
    });
};
```

> `[2.9.0+]`在 react 中，send 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

## 强制发送请求

缓存数据可以很好地提升应用流畅性和减小服务端压力，但同时也存在着数据过期的问题，当你希望穿透缓存获取最新数据时，在 use hooks 的配置中设置`force`属性可以帮助你。

### 设置静态值

force 默认为 false，设置为 true 时将每次穿透缓存，并发送请求

```javascript
useRequest(alovaInstance.Get('/todo'), {
  force: true
});
```

### 动态设置 force 值

实际情况中，我们经常需要根据不同情况来设置是否需要强制发送请求，此时可以将 force 设置为一个函数，此函数可通过 send 函数传入。

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {
    return !!id;
  }
});
send(1);
```

## send 函数参数传递规则

在上面的示例中，调用 send 函数手动触发请求，它可以接受任意多个参数，这些参数将分别被以下 5 个函数接收：

### 在 useRequest 回调函数中接收

当 useRequest 的第一个参数设置为回调函数时可以接收到，这通常在删除列表项时很有用，具体如下：

```javascript
const { send } = useRequest(id => removeTodoPoster(id));
send(1); // 上面回调函数中的id将接收到1
```

### 在 onSuccess、onError、onComplete 回调函数中接收

onSuccess、onError、onComplete 回调函数中的`event.sendArgs`以数组形式接收

```javascript
const { send, onSuccess, onError, onComplete } = useRequest(newTodo => alovaInstance.Post('/todo', newTodo));
onSuccess(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
onError(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});
onComplete(event => {
  // sendArgs的值为[1]
  console.log(event.sendArgs);
});

// 发送请求
send(1);
```

### 在 force 函数中接收

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {
    return !!id;
  }
});
send(1);
```

## 设置初始响应数据

一个页面在获取到初始数据前，不可避免地需要等待服务端响应，在响应前一般需要先将状态初始化为一个空数组或空对象，以免造成页面报错，我们可以在`useRequest`中的第二个参数实现初始数据的设置。

```javascript
// 在useRequest中设置初始数据
const {
  // 响应前data的初始值为[]，而不是undefined
  // highlight-start
  data
} = useRequest(todoListGetter, {
  initialData: []
});
// highlight-end
```

## 手动修改状态值

在 alova 中，通过`useRequest`返回的`data`、`loading`、`error`等各项状态是允许自定义修改的，这在一些情况下将变得很方便。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 直接修改data值
data.value = {};

// 或者通过update函数修改
update({
  data: {}
});
```

</TabItem>

<TabItem value="2" label="react">

在 react 中，返回的状态是直接可使用的数据，因此需通过`update`函数来修改。

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 通过update修改data值
update({
  data: {}
});
```

</TabItem>

<TabItem value="3" label="svelte">

在 svelte 中，`useRequest`返回的状态为`writable`类型。

```javascript
const { data, loading, error, update } = useRequest(todoListGetter);

// ...
// 直接修改data值
$data = {};
// 或data.update(d => ({}));

// 或者通过update函数修改
update({
  data: {}
});
```

</TabItem>
</Tabs>

:::warning 注意事项

1. 自定义修改的值将会被`useRequest`内部的状态管理机制覆盖，如当你修改了`data`值，再次请求后`data`值将被赋值为最新的响应数据；
2. 通过直接修改的状态值不会同步修改缓存数据，如需要同步修改缓存数据，建议使用[updateState](../learning/update-response-data-across-modules)

:::

## 手动中断请求

未设置`timeout`参数时请求是永不超时的，如果需要手动中断请求，可以在`useRequest`函数被调用时接收`abort`方法。

```javascript
const {
  // ...
  // highlight-start
  // abort函数用于中断请求
  abort
  // highlight-end
} = useRequest(todoListGetter);

// highlight-start
// 调用abort即可中断请求
const handleCancel = () => {
  abort();
};
// highlight-end
```

> `[2.9.0+]`在 react 中，abort 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

`[2.6.2+]`另外，这个`abort`函数也会同时绑定到当前的 method 实例上，因此你也可以这样来中断请求。

```javascript
useRequest(todoListGetter);

// highlight-start
// 调用method上的abort也可以中断当前请求
const handleCancel = () => {
  todoListGetter.abort();
};
// highlight-end
```

`[2.6.2+]`你还可以在`beforeRequest`中调用`abort`中断请求。

```javascript
const alovaInst = createAlova({
  // ...
  beforeRequest(method) {
    if (someCondition) {
      method.abort();
    }
  }
});
```

## API

### Hook 配置

| 名称          | 描述                                                                | 类型                                                                                                                                  | 默认值 | 版本 |
| ------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| immediate     | 是否立即发起请求                                                    | boolean                                                                                                                               | true   | -    |
| initialData   | 初始的 data 值，在首次响应前 data 值为初始值，未设置时为`undefined` | any                                                                                                                                   | -      | -    |
| force         | 是否强制请求，可设置为函数动态返回 boolean 值                       | boolean | (...args: any[]) => boolean                                                                                            | false  | -    |
| managedStates | 额外的监管状态，可通过 updateState 更新                             | Record\<string | number | symbol, any\>                                                                                 | -      | -    |
| middleware    | 中间件函数，[了解 alova 中间件](../advanced/middleware)             | (context: [AlovaFrontMiddlewareContext](#alovafrontmiddlewarecontext), next: [AlovaGuardNext](#alovaguardnext)) => Promise\<any\> | -      | -    |

#### AlovaFrontMiddlewareContext

| 名称             | 描述                                                                                                 | 类型                                                                                                                                                                                                         | 版本    |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| method           | 当前请求的 method 对象                                                                               | Method                                                                                                                                                                                                       | -       |
| cachedResponse   | 命中的缓存数据                                                                                       | any                                                                                                                                                                                                          | -       |
| config           | 当前的 use hook 配置                                                                                 | Record\<string, any\>                                                                                                                                                                                          | -       |
| sendArgs         | 响应处理回调的参数，该参数由 use hooks 的 send 传入                                                  | any[]                                                                                                                                                                                                        | -       |
| frontStates      | use hook 前端状态集合，如 data、loading、error 等                                                    | [FrontRequestState](#frontrequeststate)                                                                                                                                                                      | -       |
| send             | 发送请求函数                                                                                         | (...args: any[]) => void                                                                                                                                                                                     | Promise |
| abort            | 中断函数                                                                                             | () => void                                                                                                                                                                                                   | -       |
| decorateSuccess  | 装饰成功回调函数                                                                                     | (decorator: (<br/>handler: (event: [AlovaSuccessEvent](#alovasuccessevent)) => void, <br/>event: [AlovaSuccessEvent](#alovasuccessevent), <br/>index: number, <br/>length: number<br/>) => void) => void     | -       |
| decorateError    | 装饰失败回调函数                                                                                     | (decorator: (<br/>handler: (event: [AlovaErrorEvent](#alovaerrorevent)) => void, <br/>event: [AlovaErrorEvent](#alovaerrorevent), <br/>index: number, <br/>length: number<br/>) => void) => void             | -       |
| decorateComplete | 装饰完成回调函数                                                                                     | (decorator: (<br/>handler: (event: [AlovaCompleteEvent](#alovacompleteevent)) => void, <br/>event: [AlovaCompleteEvent](#alovacompleteevent), <br/>index: number, <br/>length: number<br/>) => void) => void | -       |
| update           | 更新当前 use hook 前端状态的函数，在 react 中较有用                                                  | (newFrontStates: [FrontRequestState](#frontrequeststate)) => void;                                                                                                                                           | -       |
| controlLoading   | 将自定义控制 loading 的状态，调用内部不再触发 loading 状态的变更，传入 control 为 false 时将取消控制 | (control?: boolean) => void                                                                                                                                                                                  | -       |

#### AlovaGuardNext

```typescript
type AlovaGuardNext = (guardNextConfig?: {
  force?: boolean | (...args: any[]) => boolean;
  method?: Method;
}): Promise;
```

#### FrontRequestState

以下属性值将会根据`statesHook`自动推断出对应 UI 框架的响应式数据类型，在 vue3 中为`Ref`类型，在 react 中为普通值，在 svelte 中为`Writable`类型

| 名称        | 描述         | 类型                   | 版本 |
| ----------- | ------------ | ---------------------- | ---- |
| loading     | 请求加载状态 | boolean                | -    |
| data        | 响应数据     | any                    | -    |
| error       | 请求错误信息 | Error | undefined | -    |
| downloading | 下载进度信息 | Object                 | -    |
| uploading   | 上传进度信息 | Object                 | -    |

#### AlovaSuccessEvent

| 名称      | 描述                                                | 类型    | 版本 |
| --------- | --------------------------------------------------- | ------- | ---- |
| method    | 当前请求的 method 对象                              | Method  | -    |
| sendArgs  | 响应处理回调的参数，该参数由 use hooks 的 send 传入 | any[]   | -    |
| data      | 响应数据                                            | any     | -    |
| fromCache | 响应数据是否来自缓存                                | boolean | -    |

#### AlovaErrorEvent

| 名称     | 描述                                                | 类型   | 版本 |
| -------- | --------------------------------------------------- | ------ | ---- |
| method   | 当前请求的 method 对象                              | Method | -    |
| sendArgs | 响应处理回调的参数，该参数由 use hooks 的 send 传入 | any[]  | -    |
| error    | 响应错误实例                                        | Error  | -    |

#### AlovaCompleteEvent

| 名称      | 描述                                                | 类型                     | 版本 |
| --------- | --------------------------------------------------- | ------------------------ | ---- |
| method    | 当前请求的 method 对象                              | Method                   | -    |
| sendArgs  | 响应处理回调的参数，该参数由 use hooks 的 send 传入 | any[]                    | -    |
| status    | 响应状态，成功时为 success，失败时为 error          | 'success' | 'error' | -    |
| data      | 响应数据，成功时有值                                | any                      | -    |
| fromCache | 响应数据是否来自缓存，成功时有值                    | boolean                  | -    |
| error     | 响应错误实例，失败时有值                            | Error                    | -    |

### 响应式数据

| 名称        | 描述         | 类型                   | 版本 |
| ----------- | ------------ | ---------------------- | ---- |
| loading     | 请求加载状态 | boolean                | -    |
| data        | 响应数据     | any                    | -    |
| error       | 请求错误信息 | Error | undefined | -    |
| downloading | 下载进度信息 | Object                 | -    |
| uploading   | 上传进度信息 | Object                 | -    |

### 操作函数

| 名称   | 描述                                                | 函数参数                                                | 返回值  | 版本 |
| ------ | --------------------------------------------------- | ------------------------------------------------------- | ------- | ---- |
| send   | 发送请求函数                                        | ...args: any[]                                          | -       | -    |
| abort  | 中断函数                                            | -                                                       | Promise | -    |
| update | 更新当前 use hook 前端状态的函数，在 react 中较有用 | newFrontStates: [FrontRequestState](#frontrequeststate) | -       |

### 事件

| 名称       | 描述             | 回调参数                                         | 版本 |
| ---------- | ---------------- | ------------------------------------------------ | ---- |
| onSuccess  | 请求成功事件绑定 | event: [AlovaSuccessEvent](#alovasuccessevent)   | -    |
| onError    | 请求错误事件绑定 | event: [AlovaErrorEvent](#alovaerrorevent)       | -    |
| onComplete | 请求完成事件绑定 | event: [AlovaCompleteEvent](#alovacompleteevent) | -    |
