---
title: 'alova v3.0 Release Notes'
---

## 整体升级目标

Alova@3.0旨在进一步实现“Run in any JS environment”的目标，通过重构和优化，使其在服务端和更多的 JS 环境中使用更加友好。

## 重新设计

### 重新设计结构

- **fetch 适配器导出路径改为 alova/fetch**

  ```javascript
  const adapterFetch = require('alova/fetch');
  const alova = createAlova({
    requestAdapter: adapterFetch()
  });
  ```

- **JS 包结构调整**

  - 新增 alova/client 和 alova/server 区分客户端 hook 和服务端 hook。
  - 核心 hooks 放在客户端 hook 中，统一在 alova 包中导出。

  ```javascript
  import vueHook from 'alova/vue';
  import reactHook from 'alova/react';
  import { useRequest, useWatcher, usePagination } from 'alova/client';
  const alova = createAlova({
    statesHook: vueHook,
    requestAdapter: fetchAdapter()
  });
  const { data, loading, error } = useRequest(alova.Get('/api/user'));
  ```

  ```javascript
  const { useRateLimit, sendCaptcha } = require('alova/server');
  const fetch = require('alova/fetch');
  const alova = createAlova({ requestAdapter: fetch() });
  const requestCaptcha = mobile => alova.Get('/api/captcha', { params: { mobile } });
  try {
    await sendCaptcha(requestCaptcha, { key: mobile, countdown: 60 });
  } catch (error) {
    throw new Error('发送失败');
  }
  ```

### 其他重构点

- **useForm 不再支持直接传入 id 返回缓存的 hookReturns**
- **updateStateEffect 不再支持 method 匹配器方式使用**
- **SilentMethod 函数改为返回 promise 的异步函数**
- **accessAction 新增 silent 参数**

## 废弃项

### useWatcher 的 sendable

- **废弃 useWatcher 的 sendable，通过 middleware 判断**

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

### mapWatcher

- **废弃 mapWatcher**

  ```typescript
  // alova@2.x
  export default {
    mixins: mapAlovaHook(function () {
      return { testRequest: useRequest(this.method) };
    }),
    watch: mapWatcher({
      'testRequest.data'() {
        /* ... */
      }
    })
  };

  // alova@3.x
  export default {
    watch: {
      'testRequest.data'() {
        /* ... */
      }
    }
  };
  ```

### localCache 更改为 cacheFor

- **localCache 更改为 cacheFor**

### 其他废弃项

- **updateState 的 onMatch 钩子**
- **matchSnapshotMethod**
- **getMethodKey**
- **method.**key**简化为 method.key**
- **method.transformData 简化为 method.transform**

## 其他修改项

### 使用更简单

- **去掉更多设置参数**

### 支持自定义 alova 实例 id

- **多服务器场景下，不同 alova 实例缓存隔离**
  ```typescript
  const alova = createAlova({
    id: 'custom-id',
    requestAdapter: fetchAdapter()
  });
  ```

### 支持依赖收集

- **性能优化，减少多余的视图渲染**

### middleware 优化

- **使用 proxyState 访问和修改状态**
  ```typescript
  middleware({ proxyStates, args }, { update }) => {
    const loadingValue = proxyStates.loading.v;
    proxyStates.loading.v = true;
  }
  ```

### 事件装饰

- **废弃 decorateSuccess/decorateError 等事件装饰**
  ```typescript
  import { decorateEvent } from '@alova/shared/createEventManager';
  const exposure = useRequest(/* ... */);
  exposure.onSuccess = decorateEvent(exposure.onSuccess, (handler, event) => {
    event.extraAttribute = {
      /* ... */
    };
    const res = handler(event, 1, 2, 3);
    return res;
  });
  exposure.onSuccess((event, extra1, extra2, extra3) => {
    return 100;
  });
  ```

### 限制 method 快照数量

```javascript
import { globalConfig } from 'alova';
globalConfig({
  methodSnapshots: 1000 // 设置最大数量，默认为1000
});
```

### 移除废弃的 responsed

- **统一使用 responded**
