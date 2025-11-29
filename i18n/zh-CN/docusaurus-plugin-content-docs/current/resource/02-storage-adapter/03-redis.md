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

构造函数参数与`new Redis()`时传入的参数一致，详情请参考[ioredis#Redis options](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options)。

可以通过`redisAdapter.client`访问Redis实例。

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

### 设置redis集群

`[v3.4.0+]`可以通过`nodes`设置redis集群节点，`options`设置ioredis的配置项。

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

构造函数参数的`nodes`和`options`将会分别传入`new Cluster(nodes, options)`，详情请参考[ioredis#Cluster options](https://github.com/luin/ioredis/blob/master/API.md#new-clusterstartupnodes-options)。

可以通过`redisAdapter.client`访问Cluster实例。

### 使用外部redis实例

如果你的项目中已经存在`ioredis`实例，并希望使用它进行操作，可以通过`client`设置，支持Redis实例和Cluster实例。

```javascript
const redisAdapter = new RedisStorageAdapter({
  client: originalRedisClient
});
```

## 作为原子锁

`[v3.4.0+]`此存储适配器内置了基于`@sesamecare-oss/redlock`的进程锁，可与`atomize`策略一起使用，确保多进程环境中的请求原子性。详情请参考[原子化请求](/tutorial/server/strategy/atomize)。

你可以设置`@sesamecare-oss/redlock`的配置项，具体参数请参考[@sesamecare-oss/redlock#configuration](https://www.npmjs.com/package/@sesamecare-oss/redlock#configuration)。

```javascript
const redisAdapter = new RedisStorageAdapter({
  // ...
  redlockOptions: {
    retryCount: 5 // 重试次数
    // ...
  }
});
```

### 过滤节点

当`redisAdapter.client`为Redis实例时，此实例会作为`@sesamecare-oss/redlock`的节点，当`redisAdapter.client`为Cluster实例时，Cluster的所有节点默认会作为`@sesamecare-oss/redlock`的节点，你可以通过`redlockFilter`过滤需要的节点。

```javascript
const redisAdapter = new RedisStorageAdapter({
  // ...
  // redisNode为Redis实例
  redlockFilter: redisNode => {
    // 过滤掉某个节点
    return redisNode.options.port !== 6380;
  }
});
```

### 设置redis锁的TTL

你可以通过`redlockTTL`设置redis锁的TTL，默认值为`5000ms`。

```javascript
const redisAdapter = new RedisStorageAdapter({
  // ...
  redlockTTL: 10000 // 设置锁的TTL为10秒
});
```
