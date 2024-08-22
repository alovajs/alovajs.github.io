---
title: 请求速率限制
---

:::info 类型

server hook

:::

速率限制，在一定时间内最大只能发起 N 个请求，例如以下场景。

1. node 作为中间层请求下游服务时，在资源消耗严重的 api 下，通过 ip 进行限制以免消耗下游服务器资源
2. 防止密码暴力破解，下游服务器连续多次抛出登录错误时，通过 ip 或用户名进行限制
3. 作为 sendCaptcha 的发送限制，防止用户频繁发送验证码

## 特性

1. 在一定时间内限制请求次数；
2. 支持集群，单服务器多线程或者多服务器；
3. 支持请求间隔时间；
4. 可达速率限制后，延长重置时间，例如登录锁定；
5. 奖励机制、惩罚机制、重置机制；

## 用法

### 基本用法

创建一个可复用的`rateLimit`函数（server hook），并使用它包裹 method 实例并返回请求限制的 method 实例。

```js
const rateLimit = createRateLimiter({
  /**
   * 点数重置的时间，单位ms
   * @default 4000
   */
  duration: 60 * 1000,
  /**
   * duration内可消耗的最大数量
   * @default 4
   */
  points: 4,
  /**
   * 命名空间，多个rateLimit使用相同存储器时可防止冲突
   */
  keyPrefix: 'user-rate-limit',
  /**
   * 锁定时长，单位ms，表示当到达速率限制后，将延长[blockDuration]ms，例如1小时内密码错误5次，则锁定24小时，这个24小时就是此参数
   */
  blockDuration: 24 * 60 * 60 * 1000,

  /**
   * 延迟操作将在持续时间内均匀执行
   * @default false
   */
  execEvenly: true,

  /**
   * 最小延迟时间（以毫秒为单位）
   * @default duration/points
   */
  execEvenlyMinDelayMs: 60 * 1000 / 4
});

// 在请求中使用rateLimit
const app.get('/api/user', (req, res) => {
  const userResult = await rateLimit(alova.Get('/api/user?id=' + req.query.id), {

    // 通过key来追踪不同用户的请求限制
    key: req.query.id
  });
  // ...
});
```

:::warning 注意

当请求被限制时，将会抛出错误，而不是等待请求。

:::

## 自定义存储器

默认情况下，`rateLimit`使用目标`method.context.l2Cache`作为存储器，因此当目标 method 引用的`l2Cache`满足项目需求时，你不需要任何额外的设置。

如果不是，你也可以为`rateLimit`自定义设置存储器，例如集群共享的存储器时，[@alova/psc](/resource/storage-adapter/psc)或者 redis 适配器。

```js
const { createPSCAdapter, NodeSyncAdapter } = require('@alova/psc');

const rateLimit = createRateLimiter({
  // ...
  store: createPSCAdapter(NodeSyncAdapter())
});
```

`store`要求指定为 alova 存储适配器，，你也可以[自定义存储适配器](/tutorial/advanced/custom/storage-adapter)来满足个性化需求。

## 操作函数

### 使用次数

默认情况下，发出请求一次将消耗一次`points`，你也可以手动消耗`points`。

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// 手动消耗1个`points`
const rateLimitRes = await limitedMethod.consume(1);
```

`rateLimitRes`是当前 key 下的状态，格式如下。

```ts
interface RateLimitRes {
  /**
   * 下一个操作完成前的毫秒数
   */
  msBeforeNext: 250;
  /**
   * 当前持续时间内剩余的点数
   */
  remainingPoints: 0;
  /**
   * 当前持续时间内消耗的点数
   */
  consumerPoints: 5;
  /**
   * 操作是当前持续时间内的第一个操作
   */
  isFirstInDuration: false;
}
```

### 奖励

奖励是指增加`points`的操作，你可以临时增加一定时间内的`points`。

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// 奖励1个`points`
const rateLimitRes = await limitedMethod.reward(1);
```

### 惩罚

惩罚是指减少`points`的操作，你可以临时减少一定时间内的`points`。

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// 惩罚1个`points`
const rateLimitRes = await limitedMethod.penalty(1);
```

### 重置

重置是指在重新开启新一轮的`points`消耗。

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// 重置`points`
const rateLimitRes = await limitedMethod.delete();
```

### 锁定

手动锁定一段时间。

```js
const limitedMethod = rateLimit(alova.Get('/api/user?id=' + req.query.id), {
  key: req.query.id
});

// 手动锁定10分钟
const rateLimitRes = await limitedMethod.block(10 * 60 * 1000);
```

> 此 hook 的基于[node-rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)实现，并实现了它的大部分功能。
