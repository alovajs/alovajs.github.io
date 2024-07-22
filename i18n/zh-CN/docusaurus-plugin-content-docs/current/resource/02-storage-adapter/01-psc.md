---
title: 进程共享适配器
---

进程共享存储适配器可以在多进程环境中共享 Alova 的缓存。

其中默认实现了两个适配器，可以在 Node.js 和 Electron 环境中使用。

:::info Tips

仅支持 Alova 3.0 以上版本

:::

## 安装

```bash
npm install @alova/psc --save
```

## 在 Node.js 中使用

在 Node.js 环境中，使用 `createNodePSCSynchronizer` 和 `createNodePSCAdapter` 来实现各子进程之间的缓存同步。

1. 在主进程中设置同步器:

```javascript
const cluster = require('cluster');
const { createNodePSCSynchronizer } = require('@alova/psc');

if (cluster.isMaster) {
  // highlight-start
  // 确保在创建子进程之前调用
  await createNodePSCSynchronizer();
  // highlight-end
} else {
  // fork worker processes
}
```

2. 在子进程中使用适配器:

我们提供了一个导出 `createNodePSCAdapter`，它是 `createPSCAdapter(NodeSyncAdapter())` 的别称。

通常情况下，像这样使用即可：

```javascript
const { createNodePSCAdapter } = require('@alova/psc');

createAlova({
  // ...
  l1Cache: createNodePSCAdapter()
});
```

### 共享多个缓存

当然，同时共享 `l1Cache` 和 `l2Cache` 也完全没有问题！使用 `scope` 选项，并创建不同的共享储存适配器即可。

```javascript
const process = require('node:process');
const { createPSCAdapter, NodeSyncAdapter } = require('@alova/psc');

const createScopedPSCAdapter = (scope: string) =>
  createPSCAdapter(
    NodeSyncAdapter(),
    // 这个参数用于指定储存适配器，我们稍后会介绍
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

## 在 Electron 中使用

在 Electron 环境中，使用 `createElectronPSCSynchronizer` 和 `createElectronPSCAdapter` 来实现各渲染进程之间的缓存同步。

1. 在主进程中设置同步器:

```javascript
// main.js
import { createPSCSynchronizer, ElectronSyncAdapter } from '@alova/psc';
import { ipcMain } from 'electron';

// 初始化同步器
createElectronPSCSynchronizer(ipcMain);

// ...other codes
```

2. 在渲染进程中使用适配器并暴露到全局对象:

```javascript
// payload.js
import { createPSCAdapter, ElectronSyncAdapter } from '@alova/psc';
import { ipcRenderer, contextBridge } from 'electron';

// createElectronPSCAdapter 也是一个别称
const pscAdapter = createElectronPSCAdapter(ipcRenderer);

contextBridge.exposeInMainWorld('pscAdapter', pscAdapter);
```

3. 在创建 alova 实例时使用：

```javascript
import { createAlova } from 'alova';

const alova = createAlova({
  // ...
  // highlight-start
  l1Cache: window.pscAdapter
  // highlight-end
});
```

如果使用 typescript，不要忘记补充全局类型：

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

当使用多个 alova 实例时，无需为其创建多个 `PSCAdapter` 对象。Alova 实例之间通过不同的 id 来标识自身，因此可安全地复用同一通道。

:::

## 自定义储存适配器

通过传入 `createPSCAdapter` 的第二个参数，可指定使用的储存适配器。

```typescript
const pscAdapter = createPSCAdapter(
  ElectronSyncAdapter(
    ipcRenderer,
    // highlight-start
    // 用法与 createAlova 时传入到 l1Cache 一致。如果传入 undefined，那么将使用默认实现
    MyStorageAdapter()
    // highlight-end
  )
);

createAlova({
  // ...
  l1Cache: pscAdapter
});
```

> 你还可以使用 [lru-cache](https://www.npmjs.com/package/lru-cache) 作为缓存适配器。

## 自定义共享适配器

如果你希望自己实现进程共享适配器，你需要：

1. 确定进程间的通信方式。
2. 实现 `SyncAdapter` 接口

具体而言，首先需要确定主进程与子进程之间的双向通信方式。例如，在 Node.js 中，alova 使用了 [node-ipc](https://www.npmjs.com/package/node-ipc) 实现主进程和子进程的通信；在 Electron 中，则使用 `ipcRenderer` 及 `ipcMain` 对象来实现。

随后，分别实现主进程和子进程的 `SyncAdapter` 接口，可通过 `createSyncAdapter` 提供类型帮助。

以下是一个在 Electron 中的实现：

```typescript
import { createPSCSynchronizer, createSyncAdapter } from '@/sharedCacheAdapter';
import type { IpcMain, IpcRenderer } from 'electron';

const EventName = {
  TO_MAIN: 'alova-ipc-to-main',
  TO_CLIENT: 'alova-ipc-to-client'
} as const;

/**
 * Use this function in payload.js
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

并参考上述示例使用即可。
