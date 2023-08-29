---
title: About alova instance
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip

In [Quick Start](../get-started/quick-start), we initially used the alova example. If you have not read [Quick Start](../get-started/quick-start), it is recommended that you read it before continuing Read this section.

:::

In fact, the alova instance is a global request configuration, and all requests passing through this alova instance will use its configuration information. Next, follow the sample code to understand these configurations!

In the following getting started guide, we will take todos as an example, and explain `alova` around the needs of obtaining todo lists for different dates, viewing todo details, and creating, editing, and deleting items. . let's start!

## Create an Alova instance

An alova instance is used at the beginning, all requests need to start from it. It is written like `axios`, the following is the simplest way to create an alova instance.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

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
</Tabs>

In the code for creating an alova instance, **baseURL, statesHook, and requestAdapter** are respectively specified. Now let's understand them:

- **baseURL**: (optional) indicates the root path of the request. Requests sent through this alova instance will be spliced with baseURL in front, generally set to the domain name;
- **statesHook**: (required) It is used to determine how to return stateful data in the use hook (such as useRequest). Currently, VueHook, ReactHook, and SvelteHook are provided to support vue, react, and svelte respectively. statesHook will help We create request-related states of different UI frameworks that can be managed by Alova, including request state loading, response data data, request error object error, etc.;
- **requestAdapter**: (required) request adapter, the request adapter will be used to send all requests, the request sending module and the specific request information are decoupled. The example code uses the default provided **GlobalFetch**, which is supported by `window.fetch` for requests.

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

## Set global response interceptor

When we want to unify the parsing of response data and uniform handling of errors, we can specify a global response interceptor when creating an `alova` instance, which is also similar to `axios`. Response interceptors include interceptors for successful requests and interceptors for failed requests.

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

:::caution special attention

1. Both `onSuccess` and `onError` can be set as synchronous function or asynchronous function.
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

1. [Cache mode of response data](../learning/response-cache), we will elaborate in the following chapters;
2. [Custom storage adapter](../advanced/custom-storage-adapter), which will be used for persistent response cache, which will be explained in the advanced chapter;
