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
