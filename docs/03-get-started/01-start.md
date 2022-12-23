---
title: start
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the next getting started guide, we will take todo as an example to explain `alova` around the needs of getting todo lists on different dates, viewing todo details, and creating, editing, and deleting items. . let's start!

## Create Alova instance

An `alova` instance is the starting point of use, and all requests need to start from it. It is written like `axios`, and the following is the simplest way to create an `alova` instance.

<Tabs>
<TabItem value="1" label="vue">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
const alovaInstance = createAlova({
  // Suppose we need to interact with the server for this domain
  baseURL: 'https://api.alovajs.org',

  // VueHook can help us use vue's ref function to create request-related states that can be managed by Alova, including request status loading, response data data, request error object error, etc. (detailed later)
  statesHook: VueHook,
  // request adapter, we recommend and provide the fetch request adapter
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
  // Suppose we need to interact with the server for this domain
  baseURL: 'https://api.alovajs.org',

  // ReactHook can help us call useState to create request-related states that can be managed by Alova, including request state loading, response data data, request error object error, etc. (detailed later)
  statesHook: ReactHook,
  // request adapter, we recommend and provide the fetch request adapter
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
  // Suppose we need to interact with the server for this domain
  baseURL: 'https://api.alovajs.org',

  // SvelteHook can help us call writable to create request-related states that can be managed by Alova, including request status loading, response data data, request error object error, etc. (detailed later)
  statesHook: SvelteHook,
  // request adapter, we recommend and provide the fetch request adapter
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

## Set the global request interceptor

Usually, we need to use the same configuration for all requests, such as adding token and timestamp to the request header, `alova` provides us with a global request interceptor, which will be triggered before the request, we can use this interceptor Set request parameters uniformly in `axios`, which is also similar to `axios`.

```javascript
const alovaInstance = createAlova({
  // ...
  // The function parameter config contains all the requested configurations such as url, params, data, headers, etc.
  // highlight-start
  beforeRequest(config) {
    // Suppose we need to add the token to the request header
    config.headers.token = 'token';
  }
  // highlight-end
});
```

## Set the global response interceptor

When we want to parse the response data and handle errors uniformly, we can specify a global response interceptor when creating an `alova` instance, which is also similar to `axios`. Response interceptors include interceptors for successful requests and interceptors for failed requests.

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // Use two items of the array to specify the interceptor for successful request and the interceptor for failed request respectively
  responsed: {
    // Interceptor for successful request
    // When using GlobalFetch to request the adapter, the first parameter receives the Response object
    // The second parameter is the configuration of the request, which is used to synchronize the configuration information before and after the request
    onSuccess: async (response, config) => {
      const json = await response.json();
      if (json.code !== 200) {
        // This request will throw an error when throwing an error or returning a Promise instance in the reject state
        throw new Error(json.message);
      }

      // The parsed response data will be passed to the hook function transformData, which will be explained later
      return json.data;
    },

    // Interceptor for failed requests
    // This interceptor will be entered when the request is wrong.
    // The second parameter is the configuration of the request, which is used to synchronize the configuration information before and after the request
    onError: (err, config) => {
      alert(error.message);
    }
  }
  // highlight-end
});
```

If you do not need to set an interceptor for failed requests, you can directly pass in the interceptor function for successful requests, instead of setting callbacks through objects.

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  async responsed(response, config) {
    // Interceptor for successful request
  }
  // highlight-end
});
```

:::caution special attention

1. The onError callback is a capture function for request errors. When an error is caught but no error is thrown or a Promise instance that returns a reject state, the request will be considered successful and no response data will be obtained.
2. responsed can be set to be a normal function and an asynchronous function
   :::

## Set the global request timeout

The following is to set the global request timeout time.

```javascript
// Globally set the request timeout
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // Request timeout, in milliseconds, the default is 0, which means never timeout
  timeout: 50000
  // highlight-end
});
```
