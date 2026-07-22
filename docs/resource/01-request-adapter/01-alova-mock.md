---
title: Mock data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This mock plugin is an alova request adapter. Unlike the traditional proxy approach, you can control the usage scope of mock data—globally, per group of interfaces, or even enabling/disabling a single interface. This is very useful in real business scenarios: each iteration adds or modifies a set of interfaces, and you usually want previous features to keep using the already-developed interfaces while new or modified ones use the mock data. In that case, each developer can group the interfaces of their iteration and toggle them on or off.

## Features

- Works seamlessly with alova
- Freely group simulated requests to enable or disable mock interfaces globally, by group, or individually
- Works with mockjs
- Do not pollute the production environment

## Install

<Tabs groupId="framework">
<TabItem value="1" label="npm">

```bash
npm install alova @alova/mock --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add alova @alova/mock
```

</TabItem>
<TabItem value="3" label="pnpm">

```bash
pnpm install alova @alova/mock
```

</TabItem>
</Tabs>

The following is the usage flow.

## Usage

### Define the mock interface

Use `defineMock` to define a set of mock interfaces. You can directly specify the return response data in each mock interface, or specify the response data to be dynamically calculated for the callback function.

```javascript title=mockGrou1.js
import { defineMock } from '@alova/mock';

export default defineMock(
  {
    // capture get request
    '/todo': [1, 2, 3, 4],

    // rest style request
    '/todo/{id}': ({ params }) => {
      const id = params.id;
      // ...
      return {
        title: '...',
        time: '10:00'
      };
    },

    // capture post request
    '[POST]/todo': ({ query, data }) => {
      // ...
      return { success: true };
    },

    // return more detailed information
    '[POST]/todo': ({ query, data }) => {
      //...
      return {
        status: 403,
        statusText: 'unknown error',
        responseHeaders: {
          //...
        },
        body: {
          success: true
        }
      };
    },

    // simulate network error
    '[POST]/todo': ({ query, data }) => {
      throw new Error('network error');
    },

    // Add `-` before the key to disable this mock interface
    '-[DELETE]/todo/{id}': ({ params }) => {
      // ...
      return { success: true };
    }
  },
  true
); // The second parameter indicates whether to enable this group of mock interfaces, the default is true, and can be set to false to disable it
```

### Create mock request adapter

Create a mock request adapter when calling `createAlova`, and pass in the mock interface to complete.

```javascript
import adapterFetch from 'alova/fetch';
import { createAlovaMockAdapter } from '@alova/mock';
import mockGroup1 from './mockGroup1';

// highlight-start
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  // Global control whether the mock interface is enabled, the default is true
  enable: true,

  // Non-mock request adapter, used to send requests when the mock interface is not matched
  httpAdapter: adapterFetch(),

  // mock interface response delay, in milliseconds
  delay: 1000,

  // Whether to print mock interface request information
  mockRequestLogger: true,

  // Simulation interface callback, data is the returned simulation data, you can use it to construct any object you want and return it to alova
  // The following is the default callback function, which is suitable for requesting the adapter using adapterFetch
  // If you are using other request adapters, please customize the return data structure suitable for the adapter in the mock interface callback
  onMockResponse: data => new Response(JSON.stringify(data))
});
// highlight-end

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // Use the mock request adapter, if you need to switch adapters, please see the following practical suggestions
  requestAdapter: mockAdapter,

  statesHook: /** ... */
});
```

### Paths match mode

:::info version required

1.5.0+

:::

By default, the path defined in `defineMock` is the full pathname of a url, see the following code snippet.

```javascript
const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org'
  //...
});
alovaInst.Get('/user?id=1').send();
```

When the request path in the example is `https://api.alovajs.org/user?id=1`, its full pathname is `/user`, which can match `/user` in `defineMock`.

Usually this is enough, but when your baseURL is not just a domain name.

```javascript
const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org/v1/subname'
  //...
});
alovaInst.Get('/user?id=1').send();
```

In this example, the request path is `https://api.alovajs.org/v1/subname/user?id=1`, and the mock matching path is `/v1/subname/user`. The `/v1/subname` part of the baseURL also needs to be included, which is slightly redundant when there are many interfaces.

At this point, you can set `matchMode` to `methodurl` in `createAlovaMockAdapter`. It will then match only the URL defined in the method instance; for example, the instance above will match `/user?id=1` without requiring the baseURL part to be written. Conversely, if the method instance's URL has a query parameter, it must also be included in the matching path of `defineMock`, such as `?id=1` here.

```javascript
createAlovaMockAdapter([mockGroup1 /** ... */], {
  //...
  // highlight-start
  matchMode: 'methodurl'
  // highlight-end
});
```

### Disable Mock API

The mock adapter provides three different granularities for disabling APIs: global disabling, mock group disabling, and mock API disabling. Disabled APIs will use `httpAdapter` to send requests.

Set `enable` to false in `createAlovaMockAdapter` to globally disable mock requests:

```javascript
createAlovaMockAdapter([mockGroup1 /** ... */], {
  // ...
  enable: false
});
```

Set `false` as the second parameter in `defineMock` to disable a mock group:

```javascript
defineMock(
  {
    /*...*/
  },
  false
);
```

Add `-` before the key in `defineMock` to disable a mock API:

```javascript
defineMock({
  '-[GET]/todo': {
    /*...*/
  }
});
```

## Practical advice

### Group interfaces per developer per version

In the team development scenario, we often only need to simulate some undeveloped interfaces for each version development, and use the test environment interface for the interface of the previous version. To manage mock interfaces more effectively, you can group them by two dimensions: development version and developer.

For example, there are two developers named _August_, _kevin_, they are developing v1.1 product features, they can manage the mock interface like this.

```javascript title=August-v1.1.js
import { defineMock } from '@alova/mock';

export default defineMock({
  '/todo': [
    /** */
  ],
  '[POST]/todo': ({ data }) => {
    // ...
    // return...
  }
  // ...
});
```

```javascript title=kevin-v1.1.js
import { defineMock } from '@alova/mock';

export default defineMock({
  '[PUT]/todo/add': ({ data }) => {
    // ...
    // return...
  },
  '[DELETE]/todo/remove': ({ data }) => {
    // ...
    // return...
  }
  // ...
});
```

```javascript title=request.js
import Augustv1_1 from './August-v1.1';
import Keevenv1_1 from './kevin-v1.1';

const mockAdapter = createAlovaMockAdapter([Augustv1_1, kevinv1_1], {
  httpAdapter: adapterFetch(),
  delay: 1000
});
export const alovaInst = createAlova({
  baseURL: 'http://xxx',
  requestAdapter: mockAdapter
  // ...
});
```

### Exclude mock code in production

Mock data is generally used only in the development environment and is replaced by the real interface in production, so this mock code becomes useless there. You can exclude it by checking environment variables, as shown below:

```javascript
const alovaFetch = adapterFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  httpAdapter: alovaFetch,
  delay: 1000,
});

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // highlight-start
  // In the production environment controlled by environment variables, the mock-related code will not be packaged in
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : adapterFetch,
  // highlight-end

  statesHook: /** ... */
});
```

### Use with mockjs

If you don't want to write the mock data yourself, but use it with a mock js library (such as mockjs), you can do so.

```javascript
import { defineMock } from '@alova/mock';
import Mock from 'mockjs';

export default defineMock({
  '/api1': Mock.mock({
    'id|1-10000': 100
  })
});
```

## Convert mock data

By default, **@alova/mock** packages the response data as a Response instance and the response header as a Headers instance, which is adapted for `adapterFetch`. If you use other request adapters, you need to convert the mock data to the corresponding format.

### Convert response data

You can intercept the mock response data in the `onMockResponse` field and return the transformed response data and response headers.

> You can also throw an error in onMockResponse to indicate a failed request.

```javascript
const mockAdapter = createAlovaMockAdapter(
   [
     /* mock data */
   ],
   {
     //...
     // highlight-start
     onMockResponse(response, request, currentMethod) {
       // response is the corresponding data set, which contains status, statusText, responseHeaders, body
       // request is the request data, which contains query, params, headers, data
       // currentMethod is the method instance of the current request
       //...
       // Return converted response data and response headers
       return {
         response: /** response data */,
         headers: /** Response headers */
       };
     }
     // highlight-end
   }
);
```

### Convert Error Instance

You can intercept the error instance in the `onMockError` field and return the converted error message.

> You can also throw an error in onMockError to indicate a failed request.

```javascript
const mockAdapter = createAlovaMockAdapter(
  [
    /* mock data */
  ],
  {
    //...
    // highlight-start
    onMockError(error, currentMethod) {
      // error is an error instance
      // currentMethod is the method instance of the current request
      //...
      // Return the converted error message collection
    }
    // highlight-end
  }
);
```
