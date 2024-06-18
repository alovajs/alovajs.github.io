---
title: 进程共享适配器
sidebar_position: 10
---

进程共享存储适配器可以让你在多进程模式中共享缓存，可以在 Nodejs 和 Electron 中使用。

## 在 Node.js 中使用

在 Node.js 环境中，您可以使用 `NodeSyncAdapter` 和 `createNodeSharedCacheSynchronizer` 来实现进程间的缓存同步。

1. 在主进程中设置同步器:

```javascript
const { createPSCSynchronizer, NodeSyncAdapter, is } = require('@alova/psc');
const cluster = require('cluster');

if (cluster.isMaster) {
  createPSCSynchronizer(NodeSyncAdapter());
} else {
  // fork worker processes
}
```

2. 在子进程中使用适配器:

```javascript
const { createPSCAdapter, NodeSyncAdapter, ExplictCacheAdapter } = require('@alova/psc');

const pscAdapter = createPSCAdapter(NodeSyncAdapter(), new ExplictCacheAdapter());
createAlova({
  // ...
  l1Cache: pscAdapter
});
```

> 你还可以使用[lru-cache](https://www.npmjs.com/package/lru-cache)作为缓存适配器。

## 在 Electron 中使用

Electron 环境下，您需要使用 `ElectronSyncAdapter` 和 `createPSCSynchronizer` 来实现主进程和渲染进程之间的缓存同步。

1. 在主进程中设置同步器:

```javascript
import { createPSCSynchronizer, ElectronSyncAdapter } from 'your-module-name';

function setupMainProcess() {
  createPSCSynchronizer(ElectronSyncAdapter());
}

setupMainProcess();
```

2. 在渲染进程中使用适配器:

```javascript
import { createPSCAdapter, ElectronSyncAdapter } from 'your-module-name';
import { ipcRenderer } from 'electron';

const pscAdapter = createPSCAdapter(ElectronSyncAdapter(ipcRenderer));
createAlova({
  // ...
  l1Cache: pscAdapter
});
```

通过这种方式，您可以在 Electron 的主进程和渲染进程之间保持缓存的同步。
