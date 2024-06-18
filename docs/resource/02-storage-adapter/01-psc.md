---
title: Process Shared Adapter
sidebar_position: 10
---

Process shared storage adapter allows you to share cache in multi-process mode, which can be used in Nodejs and Electron.

## Use in Node.js

In Node.js environment, you can use `NodeSyncAdapter` and `createNodeSharedCacheSynchronizer` to achieve cache synchronization between processes.

1. Set up the synchronizer in the master process:

```javascript
const { createPSCSynchronizer, NodeSyncAdapter, is } = require('@alova/psc');
const cluster = require('cluster');

if (cluster.isMaster) {
  createPSCSynchronizer(NodeSyncAdapter());
} else {
  // fork worker processes
}
```

2. Use the adapter in the child process:

```javascript
const { createPSCAdapter, NodeSyncAdapter, ExplictCacheAdapter } = require('@alova/psc');

const pscAdapter = createPSCAdapter(NodeSyncAdapter(), new ExplictCacheAdapter());
createAlova({
  // ...
  l1Cache: pscAdapter
});
```

> You can also use [lru-cache](https://www.npmjs.com/package/lru-cache) as a cache adapter.

## Use in Electron

In Electron environment, you need to use `ElectronSyncAdapter` and `createPSCSynchronizer` to achieve cache synchronization between the main process and the rendering process.

1. Set up the synchronizer in the main process:

```javascript
import { createPSCSynchronizer, ElectronSyncAdapter } from 'your-module-name';

function setupMainProcess() {
  createPSCSynchronizer(ElectronSyncAdapter());
}

setupMainProcess();
```

2. Use the adapter in the renderer process:

```javascript
import { createPSCAdapter, ElectronSyncAdapter } from 'your-module-name';
import { ipcRenderer } from 'electron';

const pscAdapter = createPSCAdapter(ElectronSyncAdapter(ipcRenderer));
createAlova({
  // ...
  l1Cache: pscAdapter
});
```

This way you can keep the cache in sync between Electron's main process and renderer process.
