---
title: Compare with other libraries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Compare with axios

axios provides a very simple and easy-to-use HTTP request function based on promise. It only requires a simple line of code to send and receive requests, and can run in the browser and nodejs environment. It is a very excellent request js library.

But axios focuses on sending requests and receiving responses, which means that if you need to write more code by yourself to actively optimize the request function, and alova is like a weapon of axios, combining axios with alova can get more powerful request capabilities. The following are the request management capabilities added by alova to axios.

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

alova provides you with [multiple high-performance request strategy modules](/tutorial/strategy). You can use different modules according to different request scenarios, which axios does not have.

### alova provides response data cache for axios

alova provides 3 caching modes to meet different caching scenarios, namely memory mode, cache occupying mode, and recovery mode. They are component-independent and can hit the cache as long as the request address and parameters are the same, unless you turn it off. Response data caching can greatly improve request fluency and reduce server pressure.

### alova provides request sharing function for axios

Request sharing will reuse the same request when sending multiple identical requests at the same time. It can also improve application fluency and reduce server pressure.

### alova provides data pre-fetching for axios

Requesting the data to be used in advance can also greatly improve application fluency.

### alova can manage request states

You can use alova across any component hierarchy to access stateful data in other components, which allows you to reduce some of the trouble of cross-component communication.

## Compared with react-query and swr

react-query is a powerful asynchronous state management, and swr is a React Hooks library for data requests. Their common feature is the use of use hooks to send and manage requests, and data caching functions. For them, alova has the following differences at.

### alova has different goals

In fact, alova's use hook also refers to the design of react-query and swr, but alova chooses the direction of the request strategy library. You can use different request strategy modules in different request scenarios, allowing you to write less code. At the same time, more efficient Client-Server data interaction can also be achieved.

### Method proxy design

Both react-query and swr use `axios` or `fetch api` directly in use hook to send requests, while alova uses the `Method` proxy design mode. This design has the following 3 benefits:

1. Unified usage without different usage depending on the platform or UI framework.
2. Request libraries such as `axios` and `fetch api` are decoupled from each API in the form of request adapters, which allows alova to provide a unified development experience and perfect coding migration.
3. Each `Method` instance represents an API, you can aggregate the request parameters and request behavior parameters of the same API into the same `Method` instance without spreading them to different files, which is more suitable for managing a large number of APIs.
4. alova realizes automatic management of response data cache by serializing request parameters on the `Method` instance. You do not need to specify the cache key, and both react-query and swr need to customize the `queryKey` to manage the cache.

### High flexibility

Alova achieves high flexibility through various adapters and middleware. It can not only run in any js environment, but also support users to customize request modules in different scenarios.

### Lightweight

alova is very lightweight, and its size is only 30%+ of react-query and axios. Similar in size to swr, but provides richer functionality.
