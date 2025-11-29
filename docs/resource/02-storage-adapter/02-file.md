---
title: File Storage Adapter
---

Store data through files, use atomic file operations, and support server clusters.

:::info Tips

Only alova 3.0+ is supported.

:::

## Installation

```bash
# npm
npm install alova @alova/storage-file --save
# yarn
yarn add alova @alova/storage-file
# npm
pnpm install alova @alova/storage-file
```

## Usage

Create `FileStorageAdapter` and specify the file storage directory. If the directory does not exist, it will be created automatically.

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

## As an Atomic Lock

`[v3.4.0+]`this storage adapter includes a process lock based on `proper-lockfile`, which can be used with the `atomize` strategy to ensure request atomicity in multi-process environments. For details, refer to [Atomic Requests](/tutorial/server/strategy/atomize).

You can configure `proper-lockfile` options, which will be passed to `lock` and `unlock`. For specific parameters, see [proper-lockfile#usage](https://www.npmjs.com/package/proper-lockfile#usage).

```javascript
const fileAdapter = new FileStorageAdapter({
  // ...
  lockerOptions: {
    retries: 5 // Number of retries
    // ...
  }
});
```
