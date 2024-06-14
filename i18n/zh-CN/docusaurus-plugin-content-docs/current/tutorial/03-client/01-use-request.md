---
title: 自动管理请求状态
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

useRequest 表示一次请求的发送，调用时默认将发送一次请求，在企业级项目中，在视图中展示数据的传输状态非常重要。在页面获取初始数据或提交数据时，useRequest 是最常用的 use hook 之一。

## 使用

它的基础用法已在[开始-结合 UI 框架](/tutorial/getting-started/combine-framework)中详细介绍。

### 设置初始数据

`data` 在请求成功前默认为 `undefined`，但有时候我们需要 data 在请求成功前也有初始值，例如在请求列表时通常需要将它初始化为`[]`，否则在渲染视图时会因为无法循环渲染而导致报错。

```javascript
const { data } = useRequest(todoListGetter, {
  // highlight-start
  // 请求响应前，data的初始值
  initialData: []
  // highlight-end
});
```

也可以将`initialData`设置成函数动态设置初始值，例如，当你不希望应用每次进入时都显示 Loading 图标，而希望使用旧数据替代时，你可以返回旧数据作为初始值，它的体验比 Loading 更好。

```js
const { onSuccess } = useRequest(todoListGetter, {
  initialData() {
    // 设置上一次的响应数据
    const storedData = localStorage.getItem('placeholder-data');
    return JSON.parse(storedData || '{}');

    // 也使用alova的level2存储适配器
    // return alovaInst.l2cache.get('placeholder-data');
  }
});
onSuccess(({ data, method }) => {
  // 保存响应数据
  localStorage.setItem('placeholder-data', JSON.stringify(data));

  // 也使用alova的level2存储适配器
  // alovaInst.l2cache.set('placeholder-data', data);
});
```

### 不立即发送请求

设置`immediate` 为 `false`避免立即请求。

```javascript
const { data } = useRequest(todoListGetter, {
  // highlight-start
  immediate: false
  // highlight-end
});
```

### 强制请求

强制请求是指绕过缓存的检查触发请求发送的机制，当需要在一定条件下获取最新的数据时很有用。

```javascript
useRequest(todoListGetter, {
  // highlight-start
  force: true
  // highlight-end
});
```

也可以设置为函数，当函数返回值为`true`时，强制请求。

```javascript
useRequest(todoListGetter, {
  // highlight-start
  force: ({ method, sendArgs }) => {
    return !!sendArgs[0];
  }
  // highlight-end
});
```

### 手动发送请求

将`useRequest`的第一个参数设置为函数。

```javascript
const {
  // ...
  // 手动发送器请求的函数，调用后发送请求
  send

  // 在这边将会接收到 send 函数的参数
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // 当immediate为false时，默认不发出
  immediate: false
});

send({
  /* todo data */
});
```

`send`函数可以让你自由地重复发起请求。

> 在 react 中，send 函数使用了`useCallback`包裹，同时它也不受闭包陷阱限制，你可以直接在事件中使用它，不用担心引起性能问题。

在`useRequest`和`useWatcher`中我们都可以调用`send`函数手动触发请求，send 函数触发请求时候，可以传入任意多个参数，这些参数其实可以分别被以下 3 个位置接收。

调用`send`支持传入任意多个参数，这些参数可以在以下 3 个位置接收。

#### 在 method handler 中接收

当它们的第一个参数设置为回调函数时可以接收到，这通常在删除列表项时很有用，具体如下：

```javascript
const { send } = useRequest(id =>
  // id将接收到1
  removeTodoPoster(id)
);
send(1);
```

#### 在事件回调函数中接收

在事件回调函数中通过`event.sendArgs`接收，它是一个包含了 send 函数的所有参数的数组。

```javascript
const { send, onSuccess, onError, onComplete } = useRequest(newTodo =>
  alovaInstance.Post('/todo', newTodo)
);
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

#### 在 force 函数中接收

force 用于指定是否需要穿透响应缓存，关于响应缓存的内容将在后面的[缓存模式](/tutorial/cache/mode)中讲解。

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: event => {
    return event.sendArgs[0];
  }
});
send(1);
```

### 下载和上传进度

通过`downloading`和`uploading`可以获得下载和上传的进度信息，你可以直接在视图中展示进度信息。

```javascript
const { downloading } = useRequest(alovaInstance.Get('/todo/downloadfile'));
const { uploading } = useRequest(alovaInstance.Get('/todo/uploadingfile'));
```

`downloading`和`uploading`的数据格式如下：

```ts
export type Progress = {
  total: number;
  loaded: number;
};
```

### 中断请求

通过 useHook 接收`abort`用于手动中断请求。

```javascript
const {
  // ...
  // highlight-start
  // abort函数用于中断请求
  abort
  // highlight-end
} = useRequest(todoListGetter);

abort();
```

### 额外的管理状态

设置额外的管理状态，这些状态可以实现跨组件更新，具体请查看[额外的管理状态](/tutorial/managed-state)。

### 中间件

通过`useRequest`的中间件几乎能控制一个请求的所有行为，例如你可以使用它阻止请求。

```js
let allowRequest = false;
useRequest(todoListGetter, {
  middleware(ctx, next) {
    if (!allowRequest) {
      return;
    }
    return next();
  }
});
```

具体请查看[深入客户端-中间件](/tutorial/middleware)。

## API

请查看[API-useRequest](/api/core-hooks#userequest)。
