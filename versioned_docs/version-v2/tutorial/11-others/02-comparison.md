---
title: Compare with other libraries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## react-query/swr/alova comparison

react-query is a powerful asynchronous state management library, swr is a React Hooks library for data requests, their common features are also using use hook to send and manage requests, and data caching function, the following is a comparison table of the three.

| Features ↓/Library →                | react-query                       | swr                                   | alova                                         |
| ----------------------------------- | --------------------------------- | ------------------------------------- | --------------------------------------------- |
| Positioning                         | Asynchronous state management     | React Hooks library for data requests | Extremely simplified API integration workflow |
| Usage mode                          | hooks                             | hooks                                 | Complete request scheme                       |
| Applicable environment              | client                            | client                                | client/server                                 |
| Framework support                   | Multi-package support             | React only                            | Adapter support                               |
| SSR                                 | ✅                                | ✅                                    | ✅                                            |
| Number of hooks                     | 2-3                               | 2-3                                   | 15+                                           |
| Hooks operation function            | ❌                                | ❌                                    | ✅                                            |
| Server                              | ❌                                | ❌                                    | nodejs/deno/bun                               |
| server hooks                        | ❌                                | ❌                                    | ✅                                            |
| Freedom                             | 🟡 Limited                        | 🟡 Limited                            | 🟢 High flexibility                           |
| Request sharing                     | ❌                                | ❌                                    | ✅                                            |
| Cache strategy                      | Single-level cache                | Single-level cache                    | Multi-level cache                             |
| Axios support                       | ✅                                | ✅                                    | ✅                                            |
| Fetch support                       | ✅                                | ✅                                    | ✅                                            |
| XMLHttpRequest support              | 🟡 Restricted                     | 🟡 Restricted                         | ✅                                            |
| Request method                      | Third-party library               | Third-party library                   | Unified Method proxy                          |
| openAPI support                     | 🟡 Restricted third-party library | 🟡 Restricted third-party library     | 🟢 More modern solutions                      |
| Dependency collection (performance) | ❌                                | ✅                                    | ✅                                            |
| Data synchronization                | ✅                                | ✅                                    | ✅                                            |

## Comparison with traditional request tools such as axios/fetch/XMLHttpRequest

Traditional request tools such as `axios/fetch/XMLHttpRequest` and the next-generation request tool alova solve different problems. The former focuses on sending requests and receiving responses, while the latter is used to improve APIs The consumption efficiency of alova is improved. They complement each other. Combining alova with traditional request tools can obtain more powerful request features. Let's take axios as an example.

### alova provides automated request status management for axios

When you only use axios, you usually need to maintain request-related status by yourself. You can get automated request status management capabilities by using alova's use hook.

<Tabs>
<TabItem value="1" label="axios only">

```javascript
// vue3 example
const loading = ref(false);
const data = ref({});
const error = ref(null);
const request = async () => {
  try {
    loading.value = true;
    data.value = await axios.get('/xxx');
  } catch (e) {
    error.value = e;
  }
  loading.value = false;
};
mounted(request);
```

</TabItem>
<TabItem value="2" label="axios+alova">

```javascript
// Use axios as alova's request adapter
const { loading, data, error } = useRequest(alova.Get('/xxx'));
```

</TabItem>
</Tabs>

### alova provides high-performance request strategies out of the box

alova provides you with [multiple high-performance request strategy modules](/tutorial/client/strategy). You can use different modules according to different request scenarios, which axios does not have.

### alova provides response data cache for axios

alova provides 3 caching modes to meet different caching scenarios, namely memory mode, cache occupying mode, and recovery mode. They are component-independent and can hit the cache as long as the request address and parameters are the same, unless you turn it off. Response data caching can greatly improve request fluency and reduce server pressure.

### alova provides request sharing function for axios

Request sharing will reuse the same request when sending multiple identical requests at the same time. It can also improve application fluency and reduce server pressure.

### alova provides data pre-fetching for axios

Requesting the data to be used in advance can also greatly improve application fluency.

### alova can manage request states

You can use alova across any component hierarchy to access stateful data in other components, which allows you to reduce some of the trouble of cross-component communication.
