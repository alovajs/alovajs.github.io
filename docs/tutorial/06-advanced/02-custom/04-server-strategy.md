---
title: Server Strategy
---

Server strategy is also called `Server hook`, which is a decorated function of a method instance.

The following is the specification of server hooks, which receives a method instance and returns a new method instance, so it is very convenient to combine multiple server hooks.

```ts
export interface AlovaServerHook<Options extends Record<string, any>> {
  (method: Method, options: Options): Method;
}
```

Customizing `Server hook` is very simple. The following is a simple request retry example.

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

// Usage
const userData = await retry(alova.Get('/api/user'), {
  retry: 5,
  delay: 1500
});
```
