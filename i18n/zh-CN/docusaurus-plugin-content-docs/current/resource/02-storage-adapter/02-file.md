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
