---
title: alova v3.0 发布日志
---

:::warning beta 提醒

alova@3.0 目前处于 beta 阶段，小部分功能可能会有所改动，如果发现 bug 请在[Github issues](https://github.com/alovajs/alova/issues/new/choose)中告诉我们，我们会在第一时间解决。

:::

## 整体升级目标

alova@3.0旨在进一步实现“Run in any JS environment”的目标，让使用更简单，我们在 3.0 中进行了全量的重新设计和代码重构，使其在服务端和更多的 JS 环境中使用更加友好。

## 重新设计 alova

### 重新设计结构

1. fetch 适配器导出路径改为 `alova/fetch/`

```javascript
const adapterFetch = require('alova/fetch');
const alova = createAlova({
  requestAdapter: adapterFetch()
});
```

2. JS 包结构调整

- 将原`@alova/scene-vue`、`@alova/scene-react`、`@alova/scene-svelte`使用跨 UI 框架技术合并为一个包`alova/client`。
- 将`useRequest/useWatcher/useFetcher`移至`alova/client`。
- 新增 `alova/server` 导出服务端场景策略模块。

现在只要安装`alova`就可以直接使用`alova/client`和`alova/server`。

```javascript
import vueHook from 'alova/vue';
import reactHook from 'alova/react';
import svelteHook from 'alova/svelte';
import vueDemiHook from 'alova/vue-demi';
import { useRequest, useWatcher, usePagination } from 'alova/client';
import adapterFetch from 'alova/fetch';

const alova = createAlova({
  statesHook: vueHook,
  requestAdapter: adapterFetch()
});
const { data, loading, error } = useRequest(alova.Get('/api/user'));
```

server hooks 使用示例

```javascript
const { useRateLimit, sendCaptcha } = require('alova/server');
import adapterFetch from 'alova/fetch';
const alova = createAlova({
  requestAdapter: adapterFetch()
});
const requestCaptcha = mobile => alova.Get('/api/captcha', { params: { mobile } });
try {
  await sendCaptcha(requestCaptcha, { key: mobile, countdown: 60 });
} catch (error) {
  throw new Error('发送失败');
}
```

### 重新设计缓存模式

为了让 alova 在服务端也能大放异彩，同时简化 alova 的 api，我们考虑了以下的缓存应用场景
应用场景

1. 高访问频率和低延迟需求，例如热门新闻、商品详情，可以进一步减少网络开销，在网络不稳定时也保持更快的响应。
2. 减轻下游服务器压力，例如有访问高峰期的服务，上层缓存可以有效减少对后端数据库和微服务的压力。
3. 整合多个下游服务器的数据合并和处理，多个串行请求可能导致更长的响应时间，也可能因复杂的数据转换消耗性能，可将转换后的数据进行缓存。
4. API 速率限制和计费，天气预报服务 API 每小时更新一次天气信息，地理位置数据 API 等。

以及大多数的异步缓存处理机制，现做出了如下的重新设计：

#### 1. 去掉 placeholder 模式

placeholder 只在客户端且搭配 useHook 才有效，3.0 中添加 initialData 对函数的支持，实现相同效果，如下：

```javascript
const { onSuccess } = useRequest(Getter, {
  initialData() {
    // 设置上一次的响应数据
    const storedData = localStorage.getItem('placeholder-data');
    return JSON.parse(storedData || '{}');

    // 也使用alova的存储适配器
    // return alovaInst.l2cache.get('placeholder-data');
  }
});
onSuccess(({ data, method }) => {
  // 保存响应数据
  localStorage.setItem('placeholder-data', JSON.stringify(data));

  // 也使用alova的存储适配器
  alovaInst.l2cache.set('placeholder-data', data);
});
```

此时，只存在两种缓存模式，定义和使用方式都不变，但对 memory 模式支持自定义适配器，并且支持异步操作，具体如下：

- **memory 模式**：支持自定义 memory 适配器并支持异步操作，例如在服务端场景可以自定义为 LRUCache，同时还可以跨进程管理进程，或者你想要的其他任何地方管理缓存。
- **restore 模式**：响应数据将同时缓存到 memory 和 storage 中，请求时将优先查找 memory 缓存，未找到时再在 storage 中的寻找，命中后将缓存恢复到 memory 缓存，如果都未命中则会发起请求。

#### 2. memory 缓存和 store 缓存支持异步操作

我们可以将内存作为一级缓存，storage 缓存作为二级缓存。

> 说明：从单个缓存的使用上来说，memory 模式和 storage 模式没有区别，都支持自定义适配器和异步操作，你也可以自定义将缓存放在任何地方，但实现机制上一级缓存优先于二级缓存，在 restore 模式下，你可以实现二级缓存恢复一级缓存的机制。

场景推荐：memory 模式使用本地内存（集群中包含跨进程共享），storage 模式放到持久化缓存中例如文件中或 Redis 中。

```js
const { LRUCache } = require('lru-cache');
const { createClient } = require('redis');

const client = createClient(/*...*/);
const alovaInst = createAlova({
  // ...
  // l1为优先级最高的缓存，即原来的内存缓存
  l1Cache: new LRUCache(),
  // l2为较低的内存缓存，即原来的持久化缓存
  l2Cache: {
    set: async (key, [data, expireTs]) => {
      await client.set(key, data, {
        EX: Number((expireTs - Date.now()) / 1000)
      });
    },
    get: async key => client.get(key),
    remove: async key => client.set(key, '', 0)
  }
});
```

一个处理缓存雪崩的示例，通过添加随机过期时间解决

```javascript
alova.Get('/xxx', {
  cacheFor: {
    expire: 100000 * Math.floor(Math.random() * 1000),
    mode: 'restore'
  }
});
```

#### 3. 缓存操作函数优化

1. 为了适应异步的存储适配器，缓存操作函数 `setCache`、`queryCache`、`invalidateCache` 改为异步函数。
2. 增加单独对 level 1 和 level 2 缓存的控制。
3. `setCache/queryCache/invalidateCache`不再支持 method 匹配器参数，具体下面的见 method 快照匹配器修改部分

```js
await setCache(methodInstance, data, {
  /**
   * 缓存策略。
   * - l1：只设置l1缓存。
   * - l2：只设置l2缓存。
   * - all:设置l1缓存和设置l2缓存（方法缓存模式需要为“restore”）。
   * @default all
   */
  policy: 'all'
});

/**
 * 缓存策略。
 * - l1：仅查询l1缓存。
 * - l2：仅查询l2缓存。
 * - all: 首先查询l1缓存，如果找不到l1缓存则查询l2缓存（方法缓存模式需要为“restore”）。
 * @default all
 */
await queryCache(methodInstance, {
  policy: 'all'
});
await invalidateCache([methodInstance1, methodInstance2 /*...*/]);
```

#### 4. 设置不同的缓存过期时间

在高访问频率和低延迟需求中，我们时常需要在服务器本地中短时缓存高频访问数据，同时在远程缓存服务器设置更长过期时间的缓存，此时可以这样做：

```js
// 全局设置
const alovaInst = createAlova({
  // ...
  cacheFor: {
    GET: {
      mode: 'restore',
      expire: ({ method, mode }) => {
        if (method.meta.setDiffExpire) {
          // 在l1缓存设置5分钟缓存，在l2缓存设置1天缓存
          return mode === 'memory' ? 5 * 60 : 24 * 60 * 60;
        }
      }
    }
  }
});

// 对单个请求设置
alovaInst.Get('/user/profile', {
  // ...
  cacheFor: {
    mode: 'restore',
    expire: ({ method, mode }) => {
      // 在l1缓存设置5分钟缓存，在l2缓存设置1天缓存
      return mode === 'memory' ? 5 * 60 : 24 * 60 * 60;
    }
  }
});
```

### method 快照匹配器修改

原 method 匹配器可以在 `setCache`、`queryCache`、`invalidateCache`、`useFetcher.fetch`、`updateState` 五个函数中使用，但它们需要的 method 实例数量各不相同，此外，还存在歧义问题，已发送过请求的 method 实例才会保存在匹配器容器中（内存），但当刷新页面后，再获取或失效持久化的缓存时，例如 `queryCache('method-name')`或 `invalidateCache('method-name')`可能因为在快照中找不到 method 实例而无效，造成歧义。

因此在 alova@3 中将 method 匹配器外部化，并且以上五个函数改为只支持传入 method 实例，用户可以清楚地知道是否有查找到 method 实例快照，更统一了使用方式，也不造成歧义。代码设计如下：

```js
// alova@2写法
invalidateCache('method-name');
const data = queryCache('method-name2');

// alova@3写法
const methodSnapshots = alovaInst.snapshots.match('method-name'); // 匹配多个
invalidateCache(methodSnapshots);
const oneSnapshot = alovaInst.snapshots.match('method-name2', true); // 只匹配一个
const data = await queryCache(oneSnapshot);
```

### 重写快照匹配和自动失效缓存算法

在 2.x 中，快照匹配和自动失效缓存算法都是通过遍历 method 快照的方式来查找目标 method 的，在服务端或长期运行的客户端中可能因快照过多而匹配效率降低，损耗性能，在 3.x 中将减少查找步骤，实现查找效率的提高。
导出新函数：

```js
declare function hitCacheBySource(sourceMethod: Method): Promise<void>;
await hitCacheBySource(alova.Get('/api/profile'));
```

## 废弃项

### 废弃 useWatcher 的 sendable

废弃 useWatcher 的 sendable，通过 middleware 判断。

```typescript
// alova@2.x
let sendable = false;
useWatcher(() => method, [xxx], { sendable: () => sendable });

// alova@3.x
let sendable = false;
useWatcher(() => method, [xxx], {
  async middleware(_, next) {
    if (sendable) {
      return next();
    }
  }
});
```

### 废弃 method 的 `enableDownload/enableUpload`

在 method 中不再需要这两个参数，将改为自动判断是否开启，通过 getter 判断外部是否使用了 uploading 和 downloading。

### 废弃 method 的 `placeholder`缓存模式

正如在“重新设计缓存模式”中所说，`placeholder`模式已使用其他方式替代实现。

### 移除废弃的 responsed

在 createAlova 中推荐统一使用`responded`字段。

```js
createAlova({
  responded() {
    // ...
  }
});
```

### 废弃错误日志控制参数 errorLogger

在 2.x 中，只要请求错误都将在控制台打印一条错误信息，当请求处未捕获错误时，控制台将会显示两条相同的错误信息，这不太友好。
在 3.x 中修改为，如果绑定了 onError，或者使用了 error 则不再抛出错误，否则抛出错误，避免显示两条错误信息。

### 废弃 `updateState` 的 `onMatch` 钩子

因为 updateState 不再支持 method 匹配器，因此 `onMatch` 钩子不再有用。

### 废弃`matchSnapshotMethod`

在alova@3.0 中通过 `alova.snapshots.match` 获取对应 alova 下的实例快照。

```js
alova.snapshots.match('method-name');
```

### 废弃`getMethodKey`

alova@3.x不再导出`getMethodKey`，可以从以下方式中导入计算 method key 的函数。

```js
import { key } from '@alova/shared/function';
const methodKey = key(methodInstance);

// 或者
const currentKey = methodInstance.generateKey();
```

### middleware 废弃项

1. 废弃了 `context.update` 函数。
2. 废弃`decorateSuccess/decorateError/decorateComplete`等事件装饰，现在可以这样装饰事件：

```js
import { decorateEvent } from '@alova/shared/createEventManager';

const exposure = useRequest(/* ... */);
exposure.onSuccess = decorateEvent(exposure.onSuccess, (handler, event) => {
  event.extraAttribute = {
    /* ... */
  }; // 为event挂载额外的属性
  const res = handler(event, 1, 2, 3); // 为事件回调传递额外参数，并获取返回值
  // ...
});

exposure.onSuccess((event, extra1, extra2, extra3) => {
  event.extraAttribute; // 额外的属性
  extra1; // 1
  extra2; // 2
  extra3; // 3
  return 100;
});
```

### @alova/vue-options 废弃 `mapWatcher`

监听 useHook 的返回状态不再需要使用辅助函数`mapWatcher`，因此废弃。

```js
// @alova/vue-options@1.x
export default {
  mixins: mapAlovaHook(function () {
    return {
      testRequest: useRequest(this.method)
    };
  }),

  watch: mapWatcher({
    'testRequest.data'() {
      // ...
    }
  })
}

// @alova/vue-options@2.0
export default {
  // ...
  watch: {
    'testRequest.data'() {
      // ...
    }
  }
}
```

## @alova/scene-\*优化

我们对`@alova/scene-*`做了部分策略的优化，并将它们移动到`alova/client`中。

### usePagination

#### 1. 默认设 abortLast 为 true

当连续翻页或查询数据时，只会展示最后一次操作的内容，更加符合体验。

```js
// 2.x需要显式设置
usePagination({
  // ...
  abortLast: true
});

// 3.x不需要
usePagination({
  // ...
});
```

#### 优化在 react 下的使用

在 react 下，page、pageSize 导出项不再是一个 reactState，现在统一使用 update 来更改状态。

```js
// 2.x
const {
  page: [page, setPage],
  pageSize: [pageSize, setPageSize]
  /*...*/
} = usePagination(/*...*/);
const handleAddPage = () => {
  setPage(page + 1);
};
const handleSetPageSize = newPageSize => {
  setPageSize(newPageSize);
};

// 3.x
const { page, pageSize, update /*...*/ } = usePagination(/*...*/);
const handleAddPage = () => {
  update({ page: page + 1 });
};
const handleSetPageSize = newPageSize => {
  update({ pageSize: newPageSize });
};
```

### useForm

#### 1. 不再支持直接传入 id 返回缓存的 hookReturns

由于原来的 scene 包直接划分为了`@alova/scene-react`、`@alova/scene-vue`、`@alova/scene-svelte`三个包，每个包的导出状态固定为对应 UI 框架的状态类型，改版后统一为了一个 client 库，在多步骤表单提交时也需要提供 method 实例或 methodHandler 来自动推断应该导出哪个 UI 框架的状态类型，但功能保持不变。

```js
// 2.x中states为对应的UI框架的状态类型
const staates = useForm('form-id');

// 3.x中必须也提供method实例或methodHandler
const { states, update } = useForm(formData => methodHandler(formData), {
  // ...
  id: 'form-id'
});
```

### useSQRequest

#### 1. `updateStateEffect` 不再支持 method 匹配器方式使用

由于 updateState 中不再支持 method 匹配器用法，`updateStateEffect`同步修改，同时也不再支持`onMatch`回调函数。

#### 2. `SilentMethod`成员方法使用修改

由于 l2Cache 可设置为异步函数的原因，`SilentMethod.replace/remove/save`以及 `filterSilentMethods/getSilentMethod` 由同步函数改为返回 promise 的异步函数。

```js
import { filterSilentMethods, getSilentMethod } from 'alova/client';

const silentMethods = await filterSilentMethods('method-name', 'queue-name');
const silentMethod = await getSilentMethod('method-name', 'queue-name');

await silentMethod.replace(newSilentMethod);
await silentMethod.remove();
await silentMethod.save();
```

### accessAction

新增 silent 参数，通过 silent 参数控制，当未匹配到 delegation 时不抛出错误

```js
// 未匹配到method-name时会抛出错误
accessAction('method-name', ({ send }) => {
  send();
});

// 此时不会抛出错误
accessAction(
  'method-name',
  ({ send }) => {
    send();
  },
  true
);
```

### 所有 useHook 的 force 函数更改为 AlovaEvent 对象

```js
// @2.x
useRequest(Getter, {
  force(arg1, arg2) {
    // ...
  }
});

// 3.x
useRequest(Getter, {
  force(event) {
    // 获取 args
    const arg1 = event.sendArgs[0];
    const arg2 = event.sendArgs[1];

    // 获取method
    const method = event.method;
  }
});
```

## 字段修改

### `method.__key__` 简化为 `method.key`

```js
// 2.x
method.__key__ = 'custom-key';

// 3.x
method.key = 'custom-key';
```

### `method.transformData` 简化为 `method.transform`

```js
// 2.x
alova.Get('/api/profile', {
  transformData(data) {
    return data.detail;
  }
});

// 3.x
alova.Get('/api/profile', {
  transform(data) {
    return data.detail;
  }
});
```

### `method.localCache` 更改为 `method.cacheFor`

```js
// 2.x
alova.Get('/api/profile', {
  localCache: 1000 * 60 * 60
});

// 3.x
alova.Get('/api/profile', {
  cacheFor: 1000 * 60 * 60
});
```

### @alova/adapter-uniapp 导出名称修改

由于 alova 的`storageAdapter`改名为`l2Cache`，因此`@alova/adapter-uniapp`的导出项`uniappStorageAdapter`更改为`uniappL2CacheAdapter`。

## 其他优化项

### 支持依赖收集

这是一个性能优化项，在alova@3.x中的所有 useHook 将不会更新未访问过的状态，以减少内部更新状态导致多余的视图渲染。

一个简单的示例如下，当未使用到`loading`时，`useRequest`的内部不会更新`loading`状态以减少额外的视图渲染。

```js
const App = () => {
  const { data } = useRequest(method1);
  return data ? <div>{data.name}</div> : null;
};

export default App;
```

### middleware 优化

在alova@2.x，在 middleware 中访问 states 数据显得不够灵活，因为你获得的是框架相关的状态集合，这不利于编写通用的 middleware，因此在 3.x 中做出以下修改：

1. 改用框架无关的 proxyState 来访问和修改状态，让 middleware 可以在任意的 UI 框架下使用。

```js
middleware({ proxyStates, args }, ({ update }) => {
  // 访问状态
  const loadingValue = proxyStates.loading.v;

  // 修改状态
  proxyStates.loading.v = true;
});
```

2. sendArgs 和 fetchArgs 更改为 args。

### 所有的事件绑定函数返回自身对象

为了优化使用体验，减少重命名，所有的事件绑定函数返回 useHook 的导出对象以获得链式调用绑定事件的效果。

```js
// 2.x
const { onSuccess, loading, data } = useRequest(method);
onSuccess(event => {
  // ...
});
const { onSuccess: onSuccess2, error } = useRequest(method2);
onSuccess2(event => {
  // ...
});

// 3.x
const { loading, data } = useRequest(method).onSuccess(event => {
  // ...
});
const { error } = useRequest(method2).onSuccess(event => {
  // ...
});
```
