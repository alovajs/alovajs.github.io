---
title: 服务端策略
---

服务端策略也被称为`Server hook`，是一个 method 实例的装饰函数。

以下是 server hooks 的规范，它接收 method 实例并返回一个新的 method 实例，因此可以很方便的组合多个 server hooks。

```ts
export interface AlovaServerHook<Options extends Record<string, any>> {
  (method: Method, options: Options): Method;
}
```

自定义`Server hook`非常简单，以下是一个简单的请求重试示例。

```js
import { HookedMethod } from 'alova/server';

const retry = (method, options) => {
  const { retry: maxRetryTimes = 3, delay = 1000 } = options;
  let retryTimes = 0;

  return new HookedMethod(method, forceRequest =>
    method.send(forceRequest).then(
      value => value,
      error => {
        if (retryTimes < maxRetryTimes) {
          retryTimes += 1;
          setTimeout(() => {
            method.send(forceRequest).catch(noop);
          }, delay);
        }
      }
    )
  );
};

// 使用
const userData = await retry(alova.Get('/api/user'), {
  retry: 5,
  delay: 1500
});
```
