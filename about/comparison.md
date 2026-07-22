## react-query/swr/alova comparison

react-query is a powerful asynchronous state management library, and swr is a React Hooks library for data fetching. They share common traits: both use hooks to send and manage requests, and both cache data. Here is a comparison table of the three.

| Features ↓/Library →                | react-query                       | swr                                   | alova                                         |
| ----------------------------------- | --------------------------------- | ------------------------------------- | --------------------------------------------- |
| Positioning                         | Asynchronous state management     | React Hooks library for data requests | Streamlined API integration workflow |
| Usage mode                          | hooks                             | hooks                                 | Complete request scheme                       |
| Applicable environment              | client                            | client                                | client/server                                 |
| Framework support                   | Multi-package support             | React only                            | Any framework (via adapters)                  |
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
| OpenAPI support                     | 🟡 Restricted third-party library | 🟡 Restricted third-party library     | 🟢 More modern solutions                      |
| Dependency collection (performance) | ❌                                | ✅                                    | ✅                                            |
| Data synchronization                | ✅                                | ✅                                    | ✅                                            |

## Compare with traditional request tools such as axios/fetch/XMLHttpRequest

Traditional request tools such as `axios`, `fetch`, and `XMLHttpRequest`, and the next-generation tool alova solve different problems. The former focus on sending requests and receiving responses, while alova improves how efficiently you consume APIs. They complement each other, and combining alova with a traditional tool gives you more powerful request capabilities. Let's use axios as an example.

### alova provides automated request status management for axios

When using axios alone, you usually maintain request-related state yourself. With alova's hooks, you get automated request state management.

**axios only:**

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


---

**axios+alova:**

```javascript
// Use axios as alova's request adapter
const { loading, data, error } = useRequest(alova.Get('/xxx'));
```


### alova provides high-performance request strategies out of the box

alova provides you with [multiple high-performance request strategy modules](/tutorial/client/strategy). You can use different modules according to different request scenarios, which axios does not have.

### alova provides response data cache for axios

alova provides three caching modes for different scenarios: memory mode, cache-occupying mode, and recovery mode. They are component-independent and hit the cache whenever the request URL and parameters match, unless you disable them. Response caching greatly improves responsiveness and reduces server load.

### alova provides request sharing function for axios

Request sharing reuses the same request when several identical requests are sent at once. It improves responsiveness and reduces server load.

### alova provides data pre-fetching for axios

Fetching data ahead of time also greatly improves responsiveness.

### alova can manage request states

You can use alova at any component level to access stateful data from other components, reducing some cross-component communication headaches.
