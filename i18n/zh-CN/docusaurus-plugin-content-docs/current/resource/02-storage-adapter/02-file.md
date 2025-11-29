---
title: 文件存储适配器
---

通过文件存储数据，使用原子化文件操作，支持服务器集群。

:::info Tips

仅 alova 3.0+ 支持

:::

## 安装

```bash
# npm
npm install alova @alova/storage-file --save
# yarn
yarn add alova @alova/storage-file
# npm
pnpm install alova @alova/storage-file
```

## 使用

创建`FileStorageAdapter`并指定文件存储目录，如果目录不存在将会自动创建。

```javascript
const { createAlova } = require('alova');
const FileStorageAdapter = require('@alova/storage-file');

const dir = '~/alova/storage';
const fileAdapter = new FileStorageAdapter({ directory: dir });
const alovaInstance = createAlova({
  // ...
  l2Cache: fileAdapter
});
```

## 作为原子锁

`[v3.4.0+]`此存储适配器内置了基于`proper-lockfile`的进程锁，可以配合`atomize`策略使用，确保多进程环境下请求的原子性，详情请参考[原子化请求](/tutorial/server/strategy/atomize)。

你可以设置`proper-lockfile`的配置项，它将会传给`lock`和`unlock`，具体参数请参考[proper-lockfile#usage](https://www.npmjs.com/package/proper-lockfile#usage)。

```javascript
const fileAdapter = new FileStorageAdapter({
  // ...
  lockerOptions: {
    retries: 5 // 重试次数
    // ...
  }
});
```
