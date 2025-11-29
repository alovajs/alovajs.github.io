---
title: 原子化请求
---

:::info type

server hook

alova@3.4.0+

:::

> atomize策略可用于确保多进程环境中的请求原子性。

## 特性

- 确保多进程环境中的请求原子性；
- 可自定义锁通道、超时时间和重试间隔；

## 注意事项

- 此策略需要使用`@alova/storage-redis`或`@alova/storage-file`作为alova实例的`l2Cache`。
  - `@alova/storage-redis`内部使用[`@sesamecare-oss/redlock`](https://www.npmjs.com/package/@sesamecare-oss/redlock)实现分布式锁。
  - `@alova/storage-file`内部使用[`proper-lockfile`](https://www.npmjs.com/package/proper-lockfile)实现基于文件的锁。
- 确保请求完成后释放锁，避免死锁。

## 使用

### 基本用法

```javascript
const { atomize } = require('alova/server');
const { alovaInstance } = require('./api');

const res = await atomize(alovaInstance.Get('/api/user'));
```

默认情况下，`atomize`使用通道名`'default'`，超时时间为`5000ms`，重试间隔为`100ms`。

### 自定义锁通道

可以指定自定义通道名或通道名数组进行锁定，不同的通道互不影响。

```javascript
const hookedMethod = atomize(request, {
  // highlight-start
  // 设置自定义通道名
  channel: 'user_lock'
  // 或多个通道
  // channel: ['user_lock', 'order_lock']
  // highlight-end
});
```

### 自定义超时时间和间隔

可以调整获取锁的超时时间和重试间隔。

```javascript
const hookedMethod = atomize(request, {
  // highlight-start
  // 设置超时时间为10秒
  timeout: 10000,
  // 设置重试间隔为200ms
  interval: 200
  // highlight-end
});
```

### 错误处理

如果在指定超时时间内无法获取锁，将抛出错误。

```javascript
try {
  const response = await atomize(request);
} catch (error) {
  console.error('获取锁失败:', error.message);
}
```
