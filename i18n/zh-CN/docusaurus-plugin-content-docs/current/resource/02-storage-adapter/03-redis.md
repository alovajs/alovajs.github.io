---
title: Redis存储适配器
---

通过redis存储数据，支持分布式集群。使用[ioredis](https://www.npmjs.com/package/ioredis)实现。

:::info Tips

仅 alova 3.0+ 支持

:::

## 安装

```bash
# npm
npm install alova @alova/storage-redis --save
# yarn
yarn add alova @alova/storage-redis
# npm
pnpm install alova @alova/storage-redis
```

## 使用

### 基础用法

创建`RedisStorageAdapter`并指定redis服务器连接信息。

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

### 设置存储key前缀

默认情况下，存储key前缀为`alova:`，可以通过`keyPrefix`设置。

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

### 使用外部redis实例

如果你的项目中已经存在`ioredis`实例，并希望使用它进行操作，可以通过`client`设置。

```javascript
const redisAdapter = new RedisStorageAdapter({
  client: originalRedisClient
});
```
