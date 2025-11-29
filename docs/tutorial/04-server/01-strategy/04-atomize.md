---
title: Atomize Requests
---

:::info type

server hook

alova@3.4.0+

:::

> The atomize strategy can be used to ensure atomicity of requests in multi-process environments.

## Features

- Ensures atomicity of requests in multi-process environments;
- Customizable lock channels, timeout, and retry intervals;

## Notes

- This strategy requires the use of `@alova/storage-redis` or `@alova/storage-file` as the `l2Cache` of the alova instance.
  - `@alova/storage-redis` internally uses [`@sesamecare-oss/redlock`](https://www.npmjs.com/package/@sesamecare-oss/redlock) for distributed locking.
  - `@alova/storage-file` internally uses [`proper-lockfile`](https://www.npmjs.com/package/proper-lockfile) for file-based locking.
- Ensure that the lock is released after the request completes to avoid deadlocks.

## Usage

### Basic Usage

```javascript
const { atomize } = require('alova/server');
const { alovaInstance } = require('./api');

const res = await atomize(alovaInstance.Get('/api/user'));
```

By default, `atomize` uses the channel name `'default'`, a timeout of `5000ms`, and a retry interval of `100ms`.

### Customizing Lock Channel

You can specify a custom channel name or an array of channel names for locking, and different channels will not affect each other.

```javascript
const hookedMethod = atomize(request, {
  // highlight-start
  // Set a custom channel name
  channel: 'user_lock'
  // Or multiple channels
  // channel: ['user_lock', 'order_lock']
  // highlight-end
});
```

### Customizing Timeout and Interval

You can adjust the timeout for acquiring the lock and the interval between retries.

```javascript
const hookedMethod = atomize(request, {
  // highlight-start
  // Set timeout to 10 seconds
  timeout: 10000,
  // Set retry interval to 200ms
  interval: 200
  // highlight-end
});
```

### Error Handling

If the lock cannot be acquired within the specified timeout, an error will be thrown.

```javascript
try {
  const response = await atomize(request);
} catch (error) {
  console.error('Failed to acquire lock:', error.message);
}
```
