---
title: Redis Storage Adapter
---

Store data through redis and support distributed clusters. Use [ioredis](https://www.npmjs.com/package/ioredis) to implement it.

:::info Tips

Only alova 3.0+ is supported.

:::

## Installation

```bash
# npm
npm install alova @alova/storage-redis --save
# yarn
yarn add alova @alova/storage-redis
# npm
pnpm install alova @alova/storage-redis
```

## Usage

### Basic usage

Create `RedisStorageAdapter` and specify the redis server connection information.

```javascript
const { createAlova } = require('alova');
const RedisStorageAdapter = require('@alova/storage-redis');

const redisAdapter = new RedisStorageAdapter({
  host: 'localhost',
  port: '6379',
  username: 'default',
  password: 'my-top-secret',
  db: 0
});
const alovaInstance = createAlova({
  // ...
  l2Cache: redisAdapter
});
```

### Set the storage key prefix

By default, the storage key prefix is ​​`alova:`, which can be set via `keyPrefix`.

```javascript
const redisAdapter = new RedisStorageAdapter({
  host: 'localhost',
  port: '6379',
  username: 'default',
  password: 'my-top-secret',
  db: 0,

  // highlight-start
  keyPrefix: 'my-app:'
  // highlight-end
});
```

### Use an external redis instance

If you already have an `ioredis` instance in your project and want to use it for operations, you can set it through `client`.

```javascript
const redisAdapter = new RedisStorageAdapter({
  client: originalRedisClient
});
```
