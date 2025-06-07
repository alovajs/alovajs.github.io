---
title: Server Usage
---

As mentioned in the previous [Quick Start](/tutorial/getting-started/quick-start), alova can be used in server-side environments such as `nodejs/deno/bun`. You can use all functions except client request strategies on the server. In addition, alova also provides good support for server-side environments.

```js
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';

const alovaInstance = createAlova({
requestAdapter: adapterFetch()
});

alovaInstance.Get(...);
alovaInstance.Post(...);
```

## Server hooks

On the server, we also have different request scenarios, such as request retries, calling APIs to send verification codes, etc., which we call `Server hooks`. They are decorated functions of method instances, and multiple `Server hooks` can be used in combination.

The following is an example that combines `retry` and `sendCaptcha`, which implements sending verification codes by retrying after failure:

```js
const { retry, createCaptchaProvider } = require('alova/server');

const { sendCaptcha } = createCaptchaProvider({
  store: redisAdapter
});

// step1: create a method instance to send code.
const createCaptchaMethod = (code, key) = > alovaInstance.Post('/api/captcha', {
  code,
  email: key,
});

// step2: wrap `createCaptchaMethod` with sendCaptcha hook.
const captchaMethod = sendCaptcha(createCaptchaMethod, {
  key: 'xxx@xxx.com'
});

// step3: wrap `captchaMethod` with retry hook, and get the response result through `await`
const result = await retry(captchaMethod, {
  retry: 3,
  backoff: {
    delay: 2000
  }
});
```

You can also use multiple `server hooks` to wrap method instances directly.

```javascript
const result = await retry(
  sendCaptcha(
    (code, key) =>
      alovaInstance.Post('/api/captcha', {
        email,
        content: 'captcha content'
      }),
    { key: 'xxx@xxx.com' }
  ),
  {
    retry: 3,
    backoff: {
      delay: 2000
    }
  }
);
```

> For more `Server hooks`, please visit [Server Strategy](/tutorial/server/strategy).

## Multi-level Cache

alova provides a complete and simple cache function. Not only that, it also supports multi-level cache to provide the fastest request experience for your server application. You can freely choose to use single-level cache or multi-level cache. Their operating mechanisms are as follows:

```mermaid
flowchart LR
A[User request] --> B{Check L1 cache}
B -->|Hit| C[Return data]
B -->|Miss| D{Check L2 cache}
D -->|Hit| E[Update L1 cache]
E --> C
D -->|Miss| F[Request API interface]
F --> G[Update L2 cache]
G --> E
C --> H[End]

style F stroke-width:8px
```

Some application scenarios are as follows:

1. High access frequency and low latency requirements: such as popular news and product details, which can further reduce network overhead and maintain faster response when the network is unstable.
2. Reduce the pressure on downstream servers, such as services with peak access periods, and the upper-level cache can effectively reduce the pressure on the backend database and microservices.
3. Integrate data merging and processing of multiple downstream servers. Multiple serial requests may lead to longer response time and may consume performance due to complex data conversion. The converted data can be cached.
4. API rate limit and billing. Weather forecast service API updates weather information every hour, geographic location data API, etc.

By default, alova's first-level cache is a simple object cache in a key-value manner, without a second-level cache. You can configure it yourself. The following is an example of using an inter-process memory sharing adapter plus lru cache as the first-level cache and redis as the second-level cache.

```js
const { createPSCAdapter, NodeSyncAdapter } = require('@alova/psc');
const { LRUCache } = require('lru-cache');
const RedisStorageAdapter = require('./adapter-redis');

function lRUCache(options = {}) {
  const cache = new LRUCache(options);
  return {
    set(key, value) {
      return cache.set(key, value);
    },

    get(key) {
      return cache.get(key);
    },

    remove(key) {
      return cache.delete(key);
    },

    clear() {
      return cache.clear();
    }
  };
}

const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.dev',

  // Inter-process shared cache adapter
  l1Cache: createPSCAdapter(
    NodeSyncAdapter(),
    lRUCache({
      max: 1000,
      ttl: 1000 * 60 * 10
    })
  ),

  // redis cache adapter
  l2Cache: new RedisStorageAdapter({
    host: 'localhost',
    port: 6379,
    username: 'default',
    password: 'my-top-secret',
    db: 0
  })
});
```

The source code of the redis adapter mentioned above can be found in [Best Practice - L2 Cache Adapter](/tutorial/project/best-practice/l2-storage), and the adapter for shared memory between processes can be found here(/resource/storage-adapter/psc)

> For more detail of response cache, please refer to [Detailed Explanation of Cache](/tutorial/cache/mode).
