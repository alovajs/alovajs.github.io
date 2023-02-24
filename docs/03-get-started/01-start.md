---
title: start
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the following getting started guide, we will take todos as an example, and explain `alova` around the needs of obtaining todo lists for different dates, viewing todo details, and creating, editing, and deleting items. . let's start!

## Create an Alova instance

An `alova` instance is used at the beginning, all requests need to start from it. It is written like `axios`, and the following is the simplest method to create an instance of `alova`.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
const alovaInstance = createAlova({
  // Suppose we need to interact with the server for this domain name
  baseURL: 'https://api.alovajs.org',

  // VueHook can help us use vue's ref function to create request-related states that can be managed by Alova, including request state loading, response data data, request error object error, etc. (details to follow)
  statesHook: VueHook,

  // request adapter, we recommend and provide fetch request adapter
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
  // Suppose we need to interact with the server for this domain name
  baseURL: 'https://api.alovajs.org',

  // ReactHook can help us call useState to create request-related states that can be managed by Alova, including request state loading, response data data, request error object error, etc. (details to follow)
  statesHook: ReactHook,

  // request adapter, we recommend and provide fetch request adapter
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
  // Suppose we need to interact with the server for this domain name
  baseURL: 'https://api.alovajs.org',

  // SvelteHook can help us call writable to create request-related states that can be managed by Alova, including request state loading, response data data, request error object error, etc. (details to follow)
  statesHook: SvelteHook,

  // request adapter, we recommend and provide fetch request adapter
  requestAdapter: GlobalFetch()
});
```

</TabItem>
</Tabs>

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

1. The onError callback is a capture function for request errors. When an error is caught but no error is thrown or a Promise instance in the reject state is returned, the request will be considered successful and no response data will be obtained.
2. responded can be set as a normal function or an asynchronous function.

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
