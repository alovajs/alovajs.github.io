---
title: Redis Storage Adapter
---

Store data using Redis, supporting distributed clusters. Implemented with [ioredis](https://www.npmjs.com/package/ioredis).

:::info Tips

Only supported in alova 3.0+

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

### Basic Usage

Create `RedisStorageAdapter` and specify Redis server connection details.

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

The constructor parameters are consistent with those passed to `new Redis()`. For details, refer to the [ioredis#Redis options](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options).

You can access the Redis instance via `redisAdapter.client`.

### Setting Storage Key Prefix

By default, the storage key prefix is `alova:`. You can customize it using `keyPrefix`.

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

### Configuring Redis Cluster

`[v3.4.0+]`You can set Redis cluster nodes via `nodes` and configure ioredis options via `options`.

```javascript
const redisAdapter = new RedisStorageAdapter({
  // highlight-start
  nodes: [
    { host: 'localhost', port: 6379 },
    { host: 'localhost', port: 6380 },
    { host: 'localhost', port: 6381 }
  ]
  // highlight-end
  options: {
    // ...
  }
});
```

The `nodes` and `options` parameters will be passed to `new Cluster(nodes, options)`. For details, refer to the [ioredis#Cluster options](https://github.com/luin/ioredis/blob/master/API.md#new-clusterstartupnodes-options).

You can access the Cluster instance via `redisAdapter.client`.

### Using an External Redis Instance

If your project already has an `ioredis` instance and you want to use it, you can set it via `client`. This supports both Redis and Cluster instances.

```javascript
const redisAdapter = new RedisStorageAdapter({
  client: originalRedisClient
});
```

## As an Atomic Lock

`[v3.4.0+]`This storage adapter includes a process lock based on `@sesamecare-oss/redlock`, which can be used with the `atomize` strategy to ensure request atomicity in multi-process environments. For details, refer to [Atomic Requests](/tutorial/server/strategy/atomize).

You can configure `@sesamecare-oss/redlock` options. For specific parameters, refer to [@sesamecare-oss/redlock#configuration](https://www.npmjs.com/package/@sesamecare-oss/redlock#configuration).

```javascript
const redisAdapter = new RedisStorageAdapter({
  // ...
  redlockOptions: {
    retryCount: 5 // Retry count
    // ...
  }
});
```

### Filtering Nodes

When `redisAdapter.client` is a Redis instance, it will be used as a node for `@sesamecare-oss/redlock`. When `redisAdapter.client` is a Cluster instance, all cluster nodes will be used by default. You can filter out wanted nodes via `redlockFilter`.

```javascript
const redisAdapter = new RedisStorageAdapter({
  // ...
  // redisNode is a Redis instance
  redlockFilter: redisNode => {
    // Filter out a specific node
    return redisNode.options.port !== 6380;
  }
});
```

### Setting Redis Lock TTL

You can set the Redis lock TTL via `redlockTTL`. The default value is `5000ms`.

```javascript
const redisAdapter = new RedisStorageAdapter({
  // ...
  redlockTTL: 10000 // Set lock TTL to 10 seconds
});
```
