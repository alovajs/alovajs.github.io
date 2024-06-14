---
title: 请求重试策略
sidebar_position: 10
---

:::info 类型

server hook

:::

请求重试策略，你可以将它用于重要的请求上。

## 特性

- ✨ 自定义重试次数或按条件判断是否需要重试；
- ✨ 重试延迟机制；

## 使用

### 基本用法

```javascript
const { retry } = require('alova/server');
const { alovaInstance } = require('./api');

const request = alovaInstance.Get('/api/user');
const hookedMethod = retry(request);
```

`retry`的最大请求重试次数默认为 3，且每次将延迟 1 秒重试。

### 设置静态的最大重试次数

最大重试次数表示首次请求失败后，最多重试请求的次数，期间如果请求成功的话将会停止继续重试。默认最大重试次数为 3 次，你可以通过以下方式自定义设置。

```javascript
const hookedMethod = retry(request, {
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
const hookedMethod = retry(request, {
  // ...
  // highlight-start
  // 第一个参数为上一次的错误实例，从第二个参数开始为send传入的参数
  retry(error) {
    // 请求超时则继续重试
    return /network timeout/i.test(error.message);
  }
  // highlight-end
});
```

### 设置延迟时间

默认重试延迟时间为 1 秒，你可以通过以下方式自定义设置。

```javascript
retry(request, {
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
retry(request, {
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
retry(request, {
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

## API

请查看[API-retry](/api/core-hooks#usewatcher)。
