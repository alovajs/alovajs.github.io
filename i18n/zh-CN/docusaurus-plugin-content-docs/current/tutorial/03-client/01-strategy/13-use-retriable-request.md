---
title: 请求重试策略
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

请求失败可自动重试的 use hook，你可以将它用于重要的请求上。

<!-- ## 示例

[请求重试 Demo](/next/tutorial/example/react/retriable-hook) -->

## 特性

- 自定义重试次数或按条件判断是否需要重试；
- 重试延迟机制；
- 手动停止重试；

## 使用

### 基本用法

```javascript
import { useRetriableRequest } from 'alova/client';

const {
  // 加载状态，在重试期间一直为true，直到重试成功或失败
  loading,

  // 响应数据
  data,

  // 请求错误信息，每次请求或重试失败都将会有error实例
  // 上一次的error实例将被覆盖
  error,

  // 每次请求或重试失败都将触发onError事件
  onError,

  // 请求重试事件，在每次重试请求发出后立即触发
  onRetry,

  // 请求重试失败事件
  // 达到最大重试次数仍未请求成功，或手动停止重试都将触发
  onFail,

  // 请求或重试成功事件
  onSuccess,

  // 每次请求或重试，无论成功或失败都将触发完成事件
  onComplete
} = useRetriableRequest(request);
```

`useRetriableRequest`的最大请求重试次数默认为 3，且每次将延迟 1 秒重试。同时也会默认发出请求，可以通过设置`immediate`为 false 改变行为。

### 设置静态的最大重试次数

最大重试次数表示首次请求失败后，最多重试请求的次数，期间如果请求成功的话将会停止继续重试。默认最大重试次数为 3 次，你可以通过以下方式自定义设置。

请求重试达到最大次数仍然未成功时，将会触发`onFail`事件并停止请求重试，如果你在失败后希望继续重试，可以调用`send`函数，此时它将进行新一轮的请求和重试。

```javascript
const { send } = useRetriableRequest(request, {
  // ...
  // highlight-start
  // 设置最大重试次数为5
  retry: 5
  // highlight-end
});
```

### 动态设置最大重试次数

可能有时候你希望通过某个条件来判断是否需要继续重试，此时你可以将`retry`设置为返回 boolean 值的函数，来动态判断是否继续重试。

```javascript
useRetriableRequest(request, {
  // ...
  // highlight-start
  // 第一个参数为上一次的错误实例，从第二个参数开始为send传入的参数
  retry(error, ...args) {
    // 请求超时则继续重试
    return /network timeout/i.test(error.message);
  }
  // highlight-end
});
```

### 设置延迟时间

默认重试延迟时间为 1 秒，你可以通过以下方式自定义设置。

```javascript
useRetriableRequest(request, {
  // ...
  backoff: {
    // highlight-start
    // 设置延迟时间为2秒
    delay: 2000
    // highlight-end
  }
});
```

### 设置不固定的重试延迟时间

有时候你希望每次请求延迟时间都不是固定的，你可以按以下方式设置延迟增长倍数，延迟时间将按重试次数指数增长。

```javascript
useRetriableRequest(request, {
  // ...
  backoff: {
    delay: 2000,
    // highlight-start
    // multiplier设置为2时，第一次重试延迟为2秒，第二次为4秒，第三次为8秒，以此类推。
    multiplier: 2
    // highlight-end
  }
});
```

还不够？你甚至还可以为每次延迟时间增加随机抖动值，让它看着不那么规律。

```javascript
useRetriableRequest(request, {
  // ...
  backoff: {
    delay: 2000,
    multiplier: 2,
    // highlight-start
    /**
     * 延迟请求的抖动起始百分比值，范围为0-1
     * 当只设置了startQuiver时，endQuiver默认为1
     * 例如设置为0.5，它将在当前延迟时间上增加50%到100%的随机时间
     * 如果endQuiver有值，则延迟时间将增加startQuiver和endQuiver范围的随机值
     */
    startQuiver: 0.5,

    /**
     * 延迟请求的抖动结束百分比值，范围为0-1
     * 当只设置了endQuiver时，startQuiver默认为0
     * 例如设置为0.8，它将在当前延迟时间上增加0%到80%的随机时间
     * 如果startQuiver有值，则延迟时间将增加startQuiver和endQuiver范围的随机值
     */
    endQuiver: 0.8;
    // highlight-end
  }
});
```

### 手动停止重试

因某些情况需要手动停止重试，无论当前正在请求中，还是在等待下一次重试，你都可以使用`stop`来停止它。

```javascript
const { stop } = useRetriableRequest(request, {
  // ...
});

const handleStop = () => {
  stop();
};
```

## API

### Hook 配置

继承[**useRequest**](/next/api/core-hooks#userequest)所有配置。

| 名称    | 描述                                                                      | 类型                            | 默认值                                         | 版本 |
| ------- | ------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------- | ---- |
| retry   | 最大重试次数，也可以设置为返回 boolean 值的函数，来动态判断是否继续重试。 | number                          | (error: Error, ...args: any[]) => boolean \| 3 | -    |
| backoff | 避让策略，设置重试延迟时间等                                              | [BackoffPolicy](#backoffpolicy) | -                                              | -    |

#### BackoffPolicy

| 名称        | 描述                                                                                                                                                                                                                              | 类型   | 默认值 | 版本 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ---- |
| delay       | 再次请求的延迟时间，单位毫秒                                                                                                                                                                                                      | number | 1000   | -    |
| multiplier  | 指定延迟倍数，例如把 multiplier 设置为 2、delay 为 1 秒时，第一次重试为 1 秒，第二次为 2 秒，第三次为 4 秒，以此类推                                                                                                              | number | 0      | -    |
| startQuiver | 延迟请求的抖动起始百分比值，范围为 0-1，当只设置了 startQuiver 时，endQuiver 默认为 1，例如设置为 0.5，它将在当前延迟时间上增加 50%到 100%的随机时间，如果 endQuiver 有值，则延迟时间将增加 startQuiver 和 endQuiver 范围的随机值 | number | 0      | -    |
| endQuiver   | 延迟请求的抖动结束百分比值，范围为 0-1，当只设置了 endQuiver 时，startQuiver 默认为 0，例如设置为 0.5，它将在当前延迟时间上增加 0%到 50%的随机时间，如果 startQuiver 有值，则延迟时间将增加 startQuiver 和 endQuiver 范围的随机值 | number | 0      | -    |

### 响应式数据

继承[**useRequest**](/next/api/core-hooks#userequest)所有响应式数据。

### 操作函数

继承[**useRequest**](/next/api/core-hooks#userequest)所有操作函数。

| 名称 | 描述                                                         | 函数参数 | 返回值 | 版本 |
| ---- | ------------------------------------------------------------ | -------- | ------ | ---- |
| stop | 停止重试，只在重试期间调用有效，停止后将立即触发 onFail 事件 | -        | -      | -    |

### 事件

继承[**useRequest**](/next/api/core-hooks#userequest)所有事件。

| 名称    | 描述                                                                                                                                                                                                                                         | 回调参数                                                 | 版本 |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---- |
| onRetry | 重试事件绑定，它们将在重试发起后触发                                                                                                                                                                                                         | 重试事件实例 [RetriableRetryEvent](#retriableretryevent) | -    |
| onFail  | 请求失败时触发，将在不再重试时触发，例如到达最大重试次数时，重试回调返回 false 时，手动调用 stop 停止重试时<br/>注意：<br/>1. onError 事件是在每次请求报错时都将被触发<br/>2. 如果没有重试次数时，onError、onComplete 和 onFail 会被同时触发 | 重试事件实例 [RetriableFailEvent](#retriablefailevent)   | -    |

#### RetriableRetryEvent

继承于 alova 的 Event 事件实例。

| 名称       | 描述                          | 类型   | 默认值   | 版本 |
| ---------- | ----------------------------- | ------ | -------- | ---- |
| retryTimes | 当前的重试次数                | number | required | -    |
| retryDelay | 本次重试的延迟时间，单位为 ms | number | required | -    |

#### RetriableFailEvent

继承于 alova 的 Event 事件实例。

| 名称       | 描述           | 类型   | 默认值   | 版本 |
| ---------- | -------------- | ------ | -------- | ---- |
| retryTimes | 当前的重试次数 | number | required | -    |
