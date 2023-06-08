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

:::caution 注意

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

:::caution 注意事项

1. 自定义修改的值将会被`useRequest`内部的状态管理机制覆盖，如当你修改了`data`值，再次请求后`data`值将被赋值为最新的响应数据；
2. 通过直接修改的状态值不会同步修改缓存数据，如需要同步修改缓存数据，建议使用[updateState](/learning/update-response-data-across-modules)

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
