---
title: Request Rate Limit
---

:::info type

server hook

:::

Rate limit, a maximum of N requests can be initiated within a certain period of time, such as the following scenario.

1. When node is used as the middle layer to request downstream services, under the API with serious resource consumption, it is restricted by IP to avoid consuming downstream server resources
2. To prevent password brute force cracking, when the downstream server throws login errors repeatedly, it is restricted by IP or username
3. As a sending limit for sendCaptcha, it prevents users from sending verification codes frequently

## Features

1. Limit the number of requests within a certain period of time;
2. Support clusters, single server multi-threading or multi-server;
3. Support request interval time;
4. After the reachable rate limit, extend the reset time, such as login lock;
5. Reward mechanism, penalty mechanism, reset mechanism;

## Usage

### Basic usage

Create a reusable `rateLimit` function (server hook), and use it to wrap the method instance and return the method instance of the request limit.

```js
const rateLimit = createRateLimiter({
  /**
   * Point reset time, in ms
   * @default 4000
   */
  duration: 60 * 1000,
  /**
   * Maximum number of points that can be consumed within duration
   * @default 4
   */
  points: 4,
  /**
   * Namespace, to prevent conflicts when multiple rateLimits use the same storage
   */
  keyPrefix: 'user-rate-limit',
  /**
   * Lock duration, in ms, means that when the rate limit is reached, it will be extended by [blockDuration]ms. For example, if the password is incorrect 5 times within 1 hour, it will be locked for 24 hours. This 24 hours is this parameter
   */
  blockDuration: 24 * 60 * 60 * 1000,

  /**
   * Delayed operations will be executed evenly within the duration
   * @default false
   */
  execEvenly: true,

  /**
   * Minimum delay time (in milliseconds)
   * @default duration/points
   */
  execEvenlyMinDelayMs: 60 * 1000 / 4
});

// Use rateLimit in request
app.get('/api/user', (req, res) => {
  const userResult = await rateLimit(alova.Get('/api/user?id=' + req.query.id), {
    // Track request limits for different users by key
    key: req.query.id
  });
  // ...
});
```

:::warning Note

When a request is limited, an error will be thrown instead of waiting for the request.

:::

## Custom storage

By default, `rateLimit` uses the target `method.context.l2Cache` as storage, so when the `l2Cache` referenced by the target method meets the project requirements, you don't need any additional settings.

If not, you can also customize the storage for `rateLimit`, such as [@alova/psc](/resource/storage-adapter/psc) or redis adapter when the cluster is shared.

```js
const { createPSCAdapter, NodeSyncAdapter } = require('@alova/psc');

const rateLimit = createRateLimiter({
  // ...
  store: createPSCAdapter(NodeSyncAdapter())
});
```

`store` requires the alova storage adapter, and you can also [customize the storage adapter](/tutorial/advanced/custom/storage-adapter) to meet your personalized needs.

## Operation function

### Use times

By default, a request will consume one `point`, and you can also consume `points` manually.

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// Manually consume 1 `points`
const rateLimitRes = await limitedMethod.consume(1);
```

`rateLimitRes` is the status under the current key, the format is as follows.

```ts
interface RateLimitRes {
  /**
   * The number of milliseconds before the next operation is completed
   */
  msBeforeNext: 250;
  /**
   * The number of points remaining in the current duration
   */
  remainingPoints: 0;
  /**
   * The number of points consumed in the current duration
   */
  consumerPoints: 5;
  /**
   * The operation is the first operation in the current duration
   */
  isFirstInDuration: false;
}
```

### Rewards

Rewards refer to operations that increase `points`. You can temporarily increase `points` within a certain period of time.

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// Reward 1 `points`
const rateLimitRes = await limitedMethod.reward(1);
```

### Penalty

Penalty refers to the operation of reducing `points`. You can temporarily reduce `points` for a certain period of time.

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// Penalty 1 `points`
const rateLimitRes = await limitedMethod.penalty(1);
```

### Reset

Reset means restarting a new round of `points` consumption.

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// Reset `points`
const rateLimitRes = await limitedMethod.delete();
```

### Lock

Manually lock for a period of time.

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// Manually lock for 10 minutes
const rateLimitRes = await limitedMethod.block(10 * 60 * 1000);
```

> This hook is based on [node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) and implements most of its functions.
