---
title: alova v3.0 Release Notes
---

:::warning beta reminder

alova@3.0 is currently in the beta stage, and some functions may be changed. If you find a bug, please let us know in [Github issues](https://github.com/alovajs/alova/issues/new/choose), and we will solve it as soon as possible.

:::

## Overall upgrade goal

alova@3.0 aims to further achieve the goal of "Run in any JS environment" and make it easier to use. We have fully redesigned and refactored the code in 3.0 to make it more user-friendly on the server and in more JS environments.

## Redesign alova

### Redesign the structure

1. Change the fetch adapter export path to `alova/fetch/`

```javascript
const adapterFetch = require('alova/fetch');
const alova = createAlova({
  requestAdapter: adapterFetch()
});
```

2. JS package structure adjustment

- Merge the original `@alova/scene-vue`, `@alova/scene-react`, `@alova/scene-svelte` into a package `alova/client` using cross-UI framework technology.

- Move `useRequest/useWatcher/useFetcher` to `alova/client`.

- Add `alova/server` to export the server-side scene strategy module.

Now you can directly use `alova/client` and `alova/server` as long as you install `alova`.

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

server hooks usage example

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
  throw new Error('Send failed');
}
```

### Redesign cache mode

In order to make alova shine on the server side and simplify alova's API, we considered the following cache application scenarios
Application scenarios

1. High access frequency and low latency requirements, such as hot news and product details, can further reduce network overhead and maintain faster response when the network is unstable.
2. Reduce the pressure on downstream servers. For example, for services with peak access periods, the upper-level cache can effectively reduce the pressure on the backend database and microservices.
3. Integrate data merging and processing of multiple downstream servers. Multiple serial requests may lead to longer response time and may consume performance due to complex data conversion. The converted data can be cached.
4. API rate limit and billing. Weather forecast service API updates weather information every hour, geographic location data API, etc.

As well as most asynchronous cache processing mechanisms, the following redesigns have been made:

#### 1. Remove the placeholder mode

Placeholder is only valid on the client and with useHook. In 3.0, initialData is added to support functions to achieve the same effect, as follows:

```javascript
const { onSuccess } = useRequest(Getter, {
  initialData() {
    // Set the last response data
    const storedData = localStorage.getItem('placeholder-data');
    return JSON.parse(storedData || '{}');

    // Also use alova's storage adapter
    // return alovaInst.l2cache.get('placeholder-data');
  }
});
onSuccess(({ data, method }) => {
  // Save response data
  localStorage.setItem('placeholder-data', JSON.stringify(data));

  // Also use alova's storage adapter
  alovaInst.l2cache.set('placeholder-data', data);
});
```

At this point, there are only two cache modes, the definition and usage remain unchanged, but the memory mode supports custom adapters and asynchronous operations, as follows:

- **memory mode**: supports custom memory adapters and asynchronous operations, for example, it can be customized as LRUCache in the server scenario, and can also manage processes across processes, or manage caches anywhere else you want.

- **restore mode**: response data will be cached in both memory and storage. When requesting, the memory cache will be searched first. If not found, it will be searched in storage. After a hit, the cache will be restored to the memory cache. If both miss, a request will be initiated.

#### 2. Memory cache and store cache support asynchronous operations

We can use memory as the first-level cache and storage cache as the second-level cache.

> Note: In terms of the use of a single cache, there is no difference between memory mode and storage mode. Both support custom adapters and asynchronous operations. You can also customize the cache to be placed anywhere, but the implementation mechanism is that the first-level cache takes precedence over the second-level cache. In restore mode, you can implement the mechanism of the second-level cache restoring the first-level cache.

Scenario recommendation: Memory mode uses local memory (including cross-process sharing in the cluster), and storage mode is placed in a persistent cache such as a file or Redis.

```js
const { LRUCache } = require('lru-cache');
const { createClient } = require('redis');

const client = createClient(/*...*/);
const alovaInst = createAlova({
  // ...
  // l1 is the highest priority cache, that is, the original memory cache
  l1Cache: new LRUCache(),
  // l2 is a lower memory cache, that is, the original persistent cache
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

An example of handling cache avalanche, solved by adding random expiration time

```javascript
alova.Get('/xxx', {
  cacheFor: {
    expire: 100000 * Math.floor(Math.random() * 1000),
    mode: 'restore'
  }
});
```

#### 3. Cache operation function optimization

1. In order to adapt to asynchronous storage adapters, cache operation functions `setCache`, `queryCache`, `invalidateCache` are changed to asynchronous functions.
2. Add separate control for level 1 and level 2 cache.
3. `setCache/queryCache/invalidateCache` no longer supports method matcher parameters. For details, see the method snapshot matcher modification section below.

```js
await setCache(methodInstance, data, {
  /**
   * Cache policy.
   * - l1: only set l1 cache.
   * - l2: only set l2 cache.
   * - all: set l1 cache and set l2 cache (method cache mode needs to be "restore").
   * @default all
   */
  policy: 'all'
});

/**
 * Cache policy.
 * - l1: only query l1 cache.
 * - l2: only query l2 cache.
 * - all: query l1 cache first, and query l2 cache if l1 cache is not found (method cache mode needs to be "restore").
 * @default all
 */
await queryCache(methodInstance, {
  policy: 'all'
});
await invalidateCache([methodInstance1, methodInstance2 /*...*/]);
```

#### 4. Set different cache expiration times

In high access frequency and low latency requirements, we often need to cache high-frequency access data in the local server for a short time, and set a cache with a longer expiration time in the remote cache server. At this time, we can do this:

```js
// Global settings
const alovaInst = createAlova({
  // ...
  cacheFor: {
    GET: {
      mode: 'restore',
      expire: ({ method, mode }) => {
        if (method.meta.setDiffExpire) {
          // Set a 5-minute cache in l1 cache and a 1-day cache in l2 cache
          return mode === 'memory' ? 5 * 60 : 24 * 60 * 60;
        }
      }
    }
  }
});

// Set for a single request
alovaInst.Get('/user/profile', {
  // ...
  cacheFor: {
    mode: 'restore',
    expire: ({ method, mode }) => {
      // Set 5 minutes cache in l1 cache, 1 day cache in l2 cache
      return mode === 'memory' ? 5 * 60 : 24 * 60 * 60;
    }
  }
});
```

### method snapshot matcher modification

The original method matcher can be used in `setCache`, `queryCache`, `invalidateCache`ache`, `useFetcher.fetch`, `updateState`, but the number of method instances they require is different. In addition, there is an ambiguity problem. Only method instances that have been requested are saved in the matcher container (memory). However, when the page is refreshed, when the persistent cache is obtained or invalidated, for example, `queryCache('method-name')`or`invalidateCache('method-name')` may be invalid because the method instance cannot be found in the snapshot, causing ambiguity.

Therefore, in alova@3, the method matcher is externalized, and the above five functions are changed to only support the passing of method instances. Users can clearly know whether the method instance snapshot has been found, which is more unified in usage and does not cause ambiguity. The code design is as follows:

```js
// alova@2 writing
invalidateCache('method-name');
const data = queryCache('method-name2');

// alova@3 writing
const methodSnapshots = alovaInst.snapshots.match('method-name'); // Match multiple
invalidateCache(methodSnapshots);
const oneSnapshot = alovaInst.snapshots.match('method-name2', true); // Match only one
const data = await queryCache(oneSnapshot);
```

### Rewrite snapshot matching and automatic invalidation cache algorithm

In 2.x, snapshot matching and automatic invalidation cache algorithms both search for the target method by traversing method snapshots. On the server side or long-running clients, the matching efficiency may be reduced due to too many snapshots, which will cause performance loss. In 3.x, the search steps will be reduced to improve the search efficiency.
Export new function:

```js
declare function hitCacheBySource(sourceMethod: Method): Promise<void>;
await hitCacheBySource(alova.Get('/api/profile'));
```

## Deprecated items

### Deprecated useWatcher's sendable

Deprecated useWatcher's sendable, judged by middleware.

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

### Deprecate `enableDownload/enableUpload` of method

These two parameters are no longer needed in method. They will be changed to automatically determine whether to enable or not. Getter will be used to determine whether uploading and downloading are used externally.

### Deprecate `placeholder` mode of method

We have mentioned in "redesign cache mode", `placeholder` mode has been replaced by other ways.

### Remove deprecated responsed

It is recommended to use the `responded` field uniformly in createAlova.

```js
createAlova({
  responded() {
    // ...
  }
});
```

### Deprecated error log control parameter errorLogger

In 2.x, an error message will be printed in the console whenever there is a request error. When the error is not caught at the request, the console will display two identical error messages, which is not very friendly.

In 3.x, if onError is bound or error is used, no error will be thrown. Otherwise, an error will be thrown to avoid displaying two error messages.

### Deprecated `onMatch` hook of `updateState`

Because updateState no longer supports method matchers, the `onMatch` hook is no longer useful.

### Deprecated `matchSnapshotMethod`

In alova@3.0, `alova.snapshots.match` is used to obtain the instance snapshot under the corresponding alova.

```js
alova.snapshots.match('method-name');
```

### Deprecated `getMethodKey`

alova@3.x no longer exports `getMethodKey`, you can import the function that calculates the method key from the following methods.

```js
import { key } from '@alova/shared/function';

const methodKey = key(methodInstance);

// or
const currentKey = methodInstance.generateKey();
```

### Deprecated middleware items

1. Deprecated `context.update` function.
2. Deprecate event decorations such as `decorateSuccess/decorateError/decorateComplete`. Now you can decorate events like this:

```js
import { decorateEvent } from '@alova/shared/createEventManager';

const exposure = useRequest(/* ... */);
exposure.onSuccess = decorateEvent(exposure.onSuccess, (handler, event) => {
  event.extraAttribute = {
    /* ... */
  }; // Mount extra attributes for event
  const res = handler(event, 1, 2, 3); // Pass extra parameters to event callback and get return value
  // ...
});

exposure.onSuccess((event, extra1, extra2, extra3) => {
  event.extraAttribute; // Extra attributes
  extra1; // 1
  extra2; // 2
  extra3; // 3
  return 100;
});
```

### @alova/vue-options deprecates `mapWatcher`

Listening to the return status of useHook no longer requires the use of the auxiliary function `mapWatcher`, so it is deprecated.

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

## @alova/scene-\* optimization

We have optimized some strategies of `@alova/scene-*` and moved them to `alova/client`.

### usePagination

#### 1. Set abortLast to true by default

When continuously turning pages or querying data, only the content of the last operation will be displayed, which is more in line with the experience.

```js
// 2.x requires explicit settings
usePagination({
  // ...
  abortLast: true
});

// 3.x does not require
usePagination({
  // ...
});
```

#### Optimize the use under react

Under react, the page and pageSize export items are no longer a reactState, and now update is used uniformly to change the state.

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

#### 1. No longer supports directly passing in id to return cached hookReturns

Due to the original scene The package is directly divided into three packages: `@alova/scene-react`, `@alova/scene-vue`, and `@alova/scene-svelte`. The export status of each package is fixed to the status type of the corresponding UI framework. After the revision, it is unified into a client library. When submitting a multi-step form, it is also necessary to provide a method instance or methodHandler to automatically infer which UI framework's status type should be exported, but the function remains unchanged.

```js
// In 2.x, states are the state types of the corresponding UI framework
const states = useForm('form-id');

// In 3.0, a method instance or methodHandler must also be provided
const { states, update } = useForm(formData => methodHandler(formData), {
  // ...
  id: 'form-id'
});
```

### useSQRequest

#### 1. `updateStateEffect` no longer supports the use of method matchers

Since updateState no longer supports the use of method matchers, `updateStateEffect` is modified synchronously, and the `onMatch` callback function is no longer supported.

#### 2. Modification of `SilentMethod` member method usage

Since l2Cache can be set as an asynchronous function, `SilentMethod.replace/remove/save` and `filterSilentMethods/getSilentMethod` are changed from synchronous functions to asynchronous functions that return promises.

```js
import { filterSilentMethods, getSilentMethod } from 'alova/client';

const silentMethods = await filterSilentMethods('method-name', 'queue-name');
const silentMethod = await getSilentMethod('method-name', 'queue-name');

await silentMethod.replace(newSilentMethod);
await silentMethod.remove();
await silentMethod.save();
```

### accessAction

Added silent parameter, controlled by silent parameter, no error is thrown when delegation is not matched

```js
// Error is thrown when method-name is not matched
accessAction('method-name', ({ send }) => {
  send();
});

// No error is thrown at this time
accessAction(
  'method-name',
  ({ send }) => {
    send();
  },
  true
);
```

### All useHook's force function is changed to AlovaEvent object

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
    // Get args
    const arg1 = event.sendArgs[0];
    const arg2 = event.sendArgs[1];

    // Get method
    const method = event.method;
  }
});
```

## Field name modification

### `method.__key__` is simplified to `method.key`

```js
// 2.x
method.__key__ = 'custom-key';

// 3.x
method.key = 'custom-key';
```

### `method.transformData` is simplified to `method.transform`

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

### `method.localCache` changed to `method.cacheFor`

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

### @alova/adapter-uniapp export name change

Since alova's `storageAdapter` was renamed to `l2Cache`, the export item `uniappStorageAdapter` of `@alova/adapter-uniapp` was changed to `uniappL2CacheAdapter`.

## Other optimizations

### Support dependency collection

This is a performance optimization. All useHooks in alova@3.x will not update unaccessed states to reduce redundant view rendering caused by internal state updates.

A simple example is as follows. When `loading` is not used, `useRequest` will not update the `loading` state to reduce additional view rendering.

```js
const App = () => {
  const { data } = useRequest(method1);
  return data ? <div>{data.name}</div> : null;
};

export default App;
```

### middleware optimization

In alova@2.x, accessing states data in middleware is not flexible enough because you get a framework-related state collection, which is not conducive to writing general middleware. Therefore, the following changes are made in 3.x:

1. Use the framework-independent proxyState to access and modify the state so that the middleware can be used in any UI framework.

```js
middleware({ proxyStates, args }, ({ update }) => {
  // Access state
  const loadingValue = proxyStates.loading.v;

  // Modify state
  proxyStates.loading.v = true;
});
```

2. sendArgs and fetchArgs are changed to args.

### All event binding functions return their own objects

In order to optimize the user experience and reduce renaming, all event binding functions return the export object of useHook to obtain the effect of chain call binding events.

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
