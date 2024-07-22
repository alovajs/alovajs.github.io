---
title: Process Shared Adapter
---

Process shared storage adapter allows you to share cache in multi-process environment.

We implemented two adapters that can be used in Node.js and Electron.

:::info Tips

Only supports Alova 3.0 and above.

:::

## Install

```bash
npm install @alova/psc --save
```

## Use in Node.js

In Node.js environment, you can use `createNodePSCSynchronizer` and `createPSCAdapter` to synchronize the cache between child processes.

1. Set up the synchronizer in the master process:

```javascript
const cluster = require('cluster');
const { createNodePSCSynchronizer } = require('@alova/psc');

if (cluster.isMaster) {
  // highlight-start
  // Make sure to call this before creating child processes
  await createNodePSCSynchronizer();
  // highlight-end
} else {
  // fork worker processes
}
```

2. Use the adapter in the child process:

In most cases, you can use it like this:

```javascript
const { createPSCAdapter, NodeSyncAdapter } = require('@alova/psc');

createAlova({
  // ...
  l1Cache: createPSCAdapter(NodeSyncAdapter())
});
```

### Sharing Multiple Caches

Of course, you can share both l1Cache and l2Cache at the same time! Just use the scope option and create different shared storage adapters.

```javascript
const process = require('node:process');

const createScopedPSCAdapter = (scope: string) =>
  createPSCAdapter(
    NodeSyncAdapter(),
    // This parameter is used to specify the storage adapter. We will introduce this later
    undefined,
    // highlight-start
    { scope }
    // highlight-end
  );

createAlova({
  // ...
  l1Cache: createScopedPSCAdapter('l1'),
  l2Cache: createScopedPSCAdapter('l2')
});
```

## Use in Electron

In the Electron environment, use `createElectronPSCSynchronizer` and `createPSCAdapter` to synchronize the cache between renderer processes.

1. Set up the synchronizer in the main process:

```javascript
// main.js
import { createElectronPSCSynchronizer } from '@alova/psc';
import { ipcMain } from 'electron';

// Initialize the synchronizer
createElectronPSCSynchronizer(ipcMain);

// ...other codes
```

2. Use the adapter in the renderer process and expose it to the global object:

```javascript
// payload.js
import { createPSCAdapter, ElectronSyncAdapter } from '@alova/psc';
import { ipcRenderer, contextBridge } from 'electron';

const pscAdapter = createPSCAdapter(ElectronSyncAdapter(ipcRenderer));

contextBridge.exposeInMainWorld('pscAdapter', pscAdapter);
```

3. Use it when creating the Alova instance:

```javascript
import { createAlova } from 'alova';

const alova = createAlova({
  // ...
  // highlight-start
  l1Cache: window.pscAdapter
  // highlight-end
});
```

If you use TypeScript, don't forget to add the global type declaration:

```typescript
// env.d.ts
declare global {
  interface Window {
    // ...
    // highlight-start
    pscAdapter: import('@alova/psc').SyncAdapter;
    // highlight-end
  }
}
```

:::warning note

When using multiple Alova instances, there is no need to create multiple `PSCAdapter` objects for them. Alova instances are identified by different IDs, so the same channel can be safely reused.

:::

## Custom Storage Adapter

By passing the second parameter to createPSCAdapter, you can specify the storage adapter to use.

```typescript
const pscAdapter = createPSCAdapter(
  ElectronSyncAdapter(
    ipcRenderer,
    // highlight-start
    // Same as passing to l1Cache in createAlova. Use default implementation if passing undefined.
    MyStorageAdapter()
    // highlight-end
  )
);

createAlova({
  // ...
  l1Cache: pscAdapter
});
```

> You can also use [lru-cache](https://www.npmjs.com/package/lru-cache) as a cache adapter.

## Custom SharedAdapter

If you want to implement your own process shared adapter, you need to:

1. Determine the communication method between processes.
2. Implement the `PSCSyncAdapter` interface:

In detail, the first step is to determine the bidirectional communication method between the main process and the child process. For example, in Node.js, alova uses `node-ipc` to implement communication between the main process and the child process. In Electron, we use `ipcRenderer` and `ipcMain`.

Next, implement the `SyncAdapter` interface for both the main process and the child process. Use `createSyncAdapter` for type assistance.

Here is an implementation in Electron:

```typescript
import { createPSCSynchronizer, createSyncAdapter } from '@/sharedCacheAdapter';
import type { IpcMain, IpcRenderer } from 'electron';

const EventName = {
  TO_MAIN: 'alova-ipc-to-main',
  TO_CLIENT: 'alova-ipc-to-client'
} as const;

/**
 * Use this function in payload.js/
 */
export function MyElectronSyncAdapter(ipcRenderer: IpcRenderer) {
  // createSyncAdapter is a helper to implement SyncAdapter. do nothing
  return createSyncAdapter({
    send(event) {
      ipcRenderer.emit(EventName.TO_MAIN, event);
    },
    receive(handler) {
      ipcRenderer.on(EventName.TO_CLIENT, (_, payload) => handler(payload));
    }
  });
}

let hasSynchronizer = false;

/**
 * Use this function in main process.
 */
export function createMyElectronSharedCacheSynchronizer(ipcMain: IpcMain) {
  if (hasSynchronizer) {
    return;
  }
  hasSynchronizer = true;

  createPSCSynchronizer(
    createSyncAdapter({
      send(event) {
        ipcMain.emit(EventName.TO_CLIENT, event);
      },
      receive(handler) {
        ipcMain.on(EventName.TO_MAIN, (_, payload) => handler(payload));
      }
    })
  );
}
```

And refer the example above.
