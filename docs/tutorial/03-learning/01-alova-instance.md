---
title: About alova instance
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip

In [Quick Start](/tutorial/get-started/quick-start), we initially used the alova example. If you have not read [Quick Start](/tutorial/get-started/quick-start), it is recommended that you read it before continuing Read this section.

:::

In fact, the alova instance is a global request configuration, and all requests passing through this alova instance will use its configuration information. Next, follow the sample code to understand these configurations!

In the following getting started guide, we will take todos as an example, and explain `alova` around the needs of obtaining todo lists for different dates, viewing todo details, and creating, editing, and deleting items. . let's start!

## Create an Alova instance

An alova instance is used at the beginning, all requests need to start from it. It is written like `axios`, the following is the simplest way to create an alova instance.

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';

const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.org',
  statesHook: VueHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="2" label="react">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';

const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.org',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="3" label="svelte">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';

const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.org',
  statesHook: SvelteHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
<TabItem value="4" label="vue options">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import { VueOptionsHook } from '@alova/vue-options'; // npm install @alova/vue-options

const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.org',
  statesHook: VueOptionsHook,
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

In the code for creating an alova instance, **baseURL, statesHook, and requestAdapter** are respectively specified. Now let's understand them:

1. **baseURL**: (optional) indicates the root path of the request. Requests sent through this alova instance will be spliced with baseURL in front, generally set to the domain name;
2. **statesHook**: (required) It is used to determine how to return stateful data in the use hook (such as useRequest). Currently, VueHook, ReactHook, and SvelteHook are provided to support vue, react, and svelte respectively. statesHook will help We create request-related states of different UI frameworks that can be managed by Alova, including request state loading, response data data, request error object error, etc.;
3. **requestAdapter**: (required) request adapter, the request adapter will be used to send all requests, the request sending module and the specific request information are decoupled. The example code uses the default provided **GlobalFetch**, which is supported by `window.fetch` for requests.

## Set global request interceptor

Usually, we need to use the same configuration for all requests, such as adding token and timestamp to the request header. `alova` provides us with a global request interceptor, which will be triggered before the request. We can use this interceptor Set the request parameters in a unified way, which is also similar to `axios`.

```javascript
const alovaInstance = createAlova({
  //...
  // The function parameter is a method instance, including request data such as url, params, data, headers, etc.
  // You are free to modify these data
  // highlight-start
  beforeRequest(method) {
    // Suppose we need to add token to the request header
    method.config.headers.token = 'token';
  }
  // highlight-end
});
```

You can also make beforeRequest an async function.

```javascript
const alovaInstance = createAlova({
  //...
  // highlight-start
  async beforeRequest(method) {
    // perform some asynchronous tasks
    //...
  }
  // highlight-end
});
```

> Detailed request method example introduction will be explained in the next section

## Set global response interceptors

When we want to unify the parsing of response data and uniform handling of errors, as well as handling the response completition, we can specify a global response interceptor when creating an `alova` instance, which is also similar to `axios`. Response interceptors include interceptors for successful requests, failed requests and completed requests.

```javascript
const alovaInstance = createAlova({
  //...
  // highlight-start
  // Use two items of the array to specify the interceptor for successful request and the interceptor for failed request
  responded: {
    // request success interceptor
    // When using the GlobalFetch request adapter, the first parameter receives the Response object
    // The second parameter is the method instance of the current request, you can use it to synchronize the configuration information before and after the request
    onSuccess: async (response, method) => {
      if (response.status >= 400) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      if (json.code !== 200) {
        // This request will throw an error when an error is thrown or a Promise instance in the reject state is returned
        throw new Error(json.message);
      }

      // The parsed response data will be passed to the transformData hook function of the method instance, and these functions will be explained later
      return json.data;
    },

    // Interceptor for request failure
    // This interceptor will be entered when the request is wrong.
    // The second parameter is the method instance of the current request, you can use it to synchronize the configuration information before and after the request
    onError: (err, method) => {
      alert(error.message);
    },

    // Interceptor for request completion
    // When you need logic that needs to be executed whether the request succeeds, fails, or hits the cache, you can specify a global `onComplete` interceptor when creating an `alova` instance, such as hiding request loading.
    // Receive the method instance of the current request
    onComplete: async method => {
      // Process request completion logic
    }
  }
  // highlight-end
});
```

If you don't need to set the interceptor for request failure, you can directly pass in the interceptor function for successful request instead of setting the callback through the object.

```javascript
const alovaInstance = createAlova({
  //...
  // highlight-start
  async responded(response, method) {
    // request success interceptor
  }
  // highlight-end
});
```

:::info 拦截器触发说明

当你使用`GlobalFetch`请求适配器时，由于`window.fetch`的特点，只有在连接超时或连接中断时才会触发`onError`拦截器，其他情况均会触发`onSuccess`拦截器，[详情请查看这边](https://developer.mozilla.org/docs/Web/API/fetch)

:::

:::info Instruction for interceptors triggering

When you use the `GlobalFetch` as the requestAdapter, due to the characteristics of `window.fetch`, the `onError` interceptor will only be triggered when the connection times out or breaks, and other cases will trigger the `onSuccess` interceptor, [for more details here](https://developer.mozilla.org/docs/Web/API/fetch)

:::

:::warning special attention

1. `onSuccess`, `onError` and `onComplete` can be set as synchronous function or asynchronous function.
2. The `onError` callback is a capture function for request errors. it will not emit `onError` when throw error in `onSuccess`. When an error is caught but no error is thrown or a Promise instance in the reject state is returned, the request will be considered successful and no response data will be obtained.
3. In 2.0.x and previous versions, `responded` was misspelled as `responsed`, and the two have been made compatible in 2.1.0. It is recommended to use `responded` instead of `responsed` in subsequent versions.

:::

## Set the global request timeout

The following is to set the global request timeout.

```javascript
// Globally set the request timeout
const alovaInstance = createAlova({
  //...
  // highlight-start
  // Request timeout time, in milliseconds, the default is 0, which means never timeout
  timeout: 50000
  // highlight-end
});
```

## others

In an alova instance, the following configuration can also be set:

1. [Cache mode of response data](/tutorial/learning/response-cache), we will elaborate in the following chapters;
2. [Custom storage adapter](/tutorial/advanced/custom-storage-adapter), which will be used for persistent response cache, which will be explained in the advanced chapter;
