---
title: 串行请求的useRequest
sidebar_position: 100
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

这个 use hook 比[在最佳实践中的串行请求](/tutorial/best-practice/skills)更加简洁易用，统一的 loading 状态、error、回调函数。

## 特性

- ✨ 更加简洁易用的串行方式；
- ✨ 统一的请求状态和回调函数；
- ✨ send 函数可触发多个请求串行执行；

## 示例

[串行请求](/tutorial/example/serial-request)

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```bash
# npm
npm install @alova/scene-vue --save
# yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
# yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
# yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## 使用

### 基本用法

和`useRequest`的用法一样，只是第一个参数改变成了一个串行执行的 handler 数组，每个 handler 将接收上一个请求的响应数据。

```javascript
const {
  // 串行加载状态，全部请求完成才会改为false
  loading,

  // 最后一个请求的响应数据
  data,

  // 任意一个请求错误都将在这记录错误信息
  error,

  // 手动发送串行请求
  send,

  // 串行请求成功回调绑定函数
  onSuccess,

  // 串行请求错误回调绑定函数，任意一个请求错误都将触发它
  onError,

  // 串行请求完成回调绑定函数
  onComplete
} = useSerialRequest(
  [
    // args为send函数传入的参数
    (...args) => request1(args),

    // 从第二个handler开始，第一个参数为上一个请求的响应数据，args从第二个开始接收
    (response1, ...args) => request2(response1, args),
    (response2, ...args) => request3(response2, args)
  ],
  {
    immediate: false
  }
);

// 手动触发请求并传参
send(1, 2, 3);
```

值得注意的是，handler 数组中的第一项也可以指定为一个 method 实例，从第二项开始必须为函数。

```javascript
useSerialRequest([
  methodInstance,
  (response1, ...args) => request2(response1, args),
  (response2, ...args) => request3(response2, args)
]);
```

### 请求错误

串行请求任意一个请求错误时，将会触发`onError`，它的`event.method`将指向请求错误的 method 实例。

## API

### Hook 配置

继承[**useRequest**](/api/core-hooks#userequest)所有配置。

### 响应式数据

继承[**useRequest**](/api/core-hooks#userequest)所有响应式数据。

### 操作函数

继承[**useRequest**](/api/core-hooks#userequest)所有操作函数。

### 事件

继承[**useRequest**](/api/core-hooks#userequest)所有事件。
