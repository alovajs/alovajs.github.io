---
title: 步骤3-设置请求重试
---

当一个请求进入静默队列后是可以为它设置请求重试参数，来保证它的请求成功率，这在行为模式设置为 **queue** 和 **silent** 时都有效，不同的是，**silent** 行为下的请求默认是持久化的，请求成功前即使刷新也将继续发送请求，而 **queue** 行为下的请求不会被持久化，刷新后将被清除。

## 最大重试次数

设置最大重试次数，默认不重试。

```javascript
useSQRequest(createOrEditTodo, {
  // ...
  // highlight-start
  // 重试次数为3次
  maxRetryTimes: 3
  // highlight-end
});
```

## 请求延迟时间

默认情况下，每次间隔 1000ms 重试，我们可以在避让策略中自定义设置每次重试的延迟时间。

```javascript
useSQRequest(createOrEditTodo, {
  // ...
  maxRetryTimes: 3,
  // highlight-start
  // 每次延迟2000ms进行请求
  backoff: {
    delay: 2000
  }
  // highlight-end
});
```

如果需要按规则增长的延迟时间，可以再为它设置一个增长倍数，延迟时间将按重试次数指数增长。

```javascript
useSQRequest(createOrEditTodo, {
  // ...
  maxRetryTimes: 3,
  backoff: {
    delay: 2000,
    // highlight-start
    // multiplier设置为2时，第一次重试延迟为2秒，第二次为4秒，第三次为8秒，以此类推
    multiplier: 2
    // highlight-end
  }
});
```

还不够？你甚至还可以为每次延迟时间增加随机抖动值，让它看着不那么规律

```javascript
useSQRequest(createOrEditTodo, {
  // ...
  maxRetryTimes: 3,
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

## 重试判定规则

默认情况下，只要请求失败都将会重试，请求失败分为以下情况：

1. 请求错误，并且未被全局的`onError`钩子捕获错误；
2. 请求成功，但在全局的`onSuccess`钩子中抛出了错误；

但实际情况下，并不是所有的请求都需要重试，例如当遇到服务端错误，或网络断开时不应该重试，此时就需要设置重试判定规则。当请求失败时通常会获得一个 `Error` 实例，我们可以设置正则表达式对 `error.message` 或 `error.name` 进行匹配，匹配通过则不再重试。

```javascript
useSQRequest(createOrEditTodo, {
  // ...
  // highlight-start
  // 当抛出的错误name为500，或者错误的message匹配network error时不再重试
  retryError: {
    name: /^500$/,
    message: /network error/i
  }
  // highlight-end
});
```

你也可以设置其中一个匹配规则，当只设置 `message` 的匹配规则时，可以直接简写为正则表达式。

```javascript
// 只设置匹配错误的name
useSQRequest(createOrEditTodo, {
  // ...
  retryError: {
    name: /^500$/
  }
});

// 只设置匹配错误的message
useSQRequest(createOrEditTodo, {
  // ...
  retryError: /network error/i
});
```

为了不污染错误信息，通常情况下我们将会把服务端返回的错误代码放在 `error.name` 中，当然，你也可以拼接到 `error.message` 中，以 Response 的错误处理示例如下：

```javascript
const alovaInst = createAlova({
  // ...
  responded: {
    onSuccess(response) {
      // 500错误时抛出错误
      if (response.status === 500) {
        const error = new Error(response.statusText);
        error.name = response.status;
        throw error;
      }
      return response.json();
    }
  }
});
```

下一步，将会使用到保存的操作记录，对列表数据进行数据补偿，来达到最新状态。
