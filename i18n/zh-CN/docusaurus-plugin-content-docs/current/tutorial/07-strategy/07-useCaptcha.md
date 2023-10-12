---
title: 发送验证码
sidebar_position: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

验证码发送 hook，减掉你在开发验证码发送功能时的繁琐。

## 示例

[发送验证码 Demo](../example/captcha-send)

## 特性

- ✨ 验证码发送后自动开始倒计时；
- ✨ 自定义倒计时秒数；
- ✨ 验证码发送限制；

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="vue">

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

## 基本使用

展示表单 hook 的基本使用。

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <input v-model="mobile" />
  <button
    @click="sendCaptcha"
    :loading="sending"
    :disabled="sending || countdown > 0">
    {{ loading ? '发送中...' : countdown > 0 ? `${countdown}后可重发` : '发送验证码' }}
  </button>
</template>

<script setup>
  import { ref } from 'vue';
  import { apiSendCaptcha } from './api.js';
  import { useCaptcha } from '@alova/scene-vue';

  const mobile = ref('');
  const {
    // 发送状态
    loading: sending,

    // 调用sendCaptcha才会请求接口发送验证码
    send: sendCaptcha
  } = useCaptcha(() => apiSendCaptcha(mobile.value));
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';
import { apiSendCaptcha } from './api.js';
import { useCaptcha } from '@alova/scene-react';

const App = () => {
  const [mobile, setMobile] = ref('');
  const {
    // 发送状态
    loading: sending,

    // 调用sendCaptcha才会请求接口发送验证码
    send: sendCaptcha
  } = useCaptcha(() => apiSendCaptcha(mobile));

  return (
    <div>
      <input
        value={mobile}
        onChange={({ target }) => setMobile(target.value)}
      />
      <button
        onClick={sendCaptcha}
        loading={sending}
        disabled={sending || countdown > 0}>
        {loading ? '发送中...' : countdown > 0 ? `${countdown}后可重发` : '发送验证码'}
      </button>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { apiSendCaptcha } from './api.js';
  import { useCaptcha } from '@alova/scene-vue';

  let mobile = '';
  const {
    // 发送状态
    loading: sending,

    // 调用sendCaptcha才会请求接口发送验证码
    send: sendCaptcha
  } = useCaptcha(() => apiSendCaptcha(mobile));
</script>

<input bind:value="{mobile}" />
<button
  on:click="{sendCaptcha}"
  loading="{$sending}"
  disabled="{$sending || $countdown > 0}">
  { $loading ? '发送中...' : $countdown > 0 ? `${$countdown}后可重发` : '发送验证码' }
</button>
```

</TabItem>
</Tabs>

默认情况下，验证码发送成功后将会倒计时 60 秒，当倒计时没有结束时再调用`send`将会抛出错误。

### 自定义倒计时秒数

你也可以自定义倒计时秒数

```javascript
useCaptcha(() => apiSendCaptcha(mobile.value), {
  // ...
  // highlight-start
  // 将倒计时设为20秒
  initialCountdown: 20
  // highlight-end
});
```

## API

### Hook 配置

继承[**useRequest**](../learning/use-request#api)除`immediate`外的所有配置，`useCaptcha`中`immediate`已硬编码为 false。

| 名称             | 描述                                                   | 类型   | 默认值 | 版本 |
| ---------------- | ------------------------------------------------------ | ------ | ------ | ---- |
| initialCountdown | 初始倒计时，当验证码发送成功时将会以此数据来开始倒计时 | number | 60     | -    |

### 响应式数据

继承[**useRequest**](../learning/use-request#api)所有响应式数据。

| 名称      | 描述                                                   | 类型   | 版本 |
| --------- | ------------------------------------------------------ | ------ | ---- |
| countdown | 当前倒计时，每秒-1，当倒计时结束后才可以再次发送验证码 | number | -    |

### 操作函数

继承[**useRequest**](../learning/use-request#api)所有操作函数。

| 名称 | 描述                                     | 函数参数                | 返回值                  | 版本 |
| ---- | ---------------------------------------- | ----------------------- | ----------------------- | ---- |
| send | 发送请求，当倒计时未结束时调用将抛出错误 | 与 useRequest.send 一致 | Promise&lt;Response&gt; | -    |

### 事件

继承[**useRequest**](../learning/use-request#api)所有事件。
