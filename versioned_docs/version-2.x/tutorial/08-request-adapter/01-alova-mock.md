---
title: Mock data
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This mock plug-in is an alova request adapter. Different from the traditional Proxy form, you can control the scope of use of mock data. You can control the global scope, a group of interface scopes, and even the enabling and use of a certain interface. Disabled, which is very useful in our actual business scenarios. Each iteration will add or modify a set of interfaces. We hope that the previous functions will still follow the developed interfaces, and let the new or modified interfaces Taking the simulation data, at this time, each developer can group the interfaces involved in this iteration into a group, and turn them on or off.

## Features

- ✨Works seamlessly with alova
- ✨Arbitrary grouping of simulation requests to control global, group, and individual simulation interface enable and disable
- ✨Works with mockjs
- ✨Do not pollute the production environment

## Install

<Tabs groupId="framework">
<TabItem value="1" label="npm">

```bash
npm install @alova/mock --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/mock
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
); // The second parameter indicates whether to enable this group of mock interfaces, the default is true, and can be specified as false to close
```

### Create mock request adapter

Create a mock request adapter when calling `createAlova`, and pass in the mock interface to complete.

```javascript
import GlobalFetch from 'alova/GlobalFetch';
import { createAlovaMockAdapter } from '@alova/mock';
import mockGroup1 from './mockGroup1';

// highlight-start
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  // Global control whether the mock interface is enabled, the default is true
  enable: true,

  // Non-mock request adapter, used to send requests when the mock interface is not matched
  httpAdapter: GlobalFetch(),

  // mock interface response delay, in milliseconds
  delay: 1000,

  // Whether to print mock interface request information
  mockRequestLogger: true,

  // Simulation interface callback, data is the returned simulation data, you can use it to construct any object you want and return it to alova
  // The following is the default callback function, which is suitable for requesting the adapter using GlobalFetch
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

In this example, the request path is `https://api.alovajs.org/v1/subname/user?id=1`, the matching path of the mock is `/v1/subname/user`, and `/ in the baseURL needs to be v1/subname` is also written together, which is slightly redundant when the number of interfaces is large.

At this point, you can set `matchMode` to `methodurl` in `createAlovaMockAdapter`, it will only match the url defined in the method instance, for example, the above instance will match `/user?id=1` instead of The part in baseURL needs to be written. On the contrary, if the url in the method instance has a get parameter, it also needs to be written in the matching path of `defineMock`, just like `?id=1` here.

```javascript
createAlovaMockAdapter([mockGroup1 /** ... */], {
  //...
  // highlight-start
  matchMode: 'methodurl'
  // highlight-end
});
```

## Practical advice

### Group interfaces per developer per version

In the team development scenario, we often only need to simulate some undeveloped interfaces for each version development, and use the test environment interface for the interface of the previous version. At this time, in order to achieve better simulation interface management, you can use The two dimensions, development version and developer, group interfaces.

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
  httpAdapter: GlobalFetch(),
  delay: 1000
});
export const alovaInst = createAlova({
  baseURL: 'http://xxx',
  requestAdapter: mockAdapter
  // ...
});
```

### Exclude mock code in production

The mock data is generally only used in the development environment, and will be switched to the actual interface in the production environment, so this mock code becomes useless in the production environment. At this time, we can exclude this code by judging the environment variables. , you just need to do:

```javascript
const globalFetch = GlobalFetch();
const mockAdapter = createAlovaMockAdapter([mockGroup1, /** ... */], {
  httpAdapter: globalFetch,
  delay: 1000,
});

export const alovaInst = createAlova({
  baseURL: 'http://xxx',

  // highlight-start
  // In the production environment controlled by environment variables, the mock-related code will not be packaged in
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : globalFetch,
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

**@alova/mock** By default, the response data is packaged as a Response instance, and the response header is packaged as a Headers instance by default, which is adapted for `GlobalFetch`, but if you use other request adapters, you need to mock the data Convert to the corresponding format.

### Convert response data

You can intercept the mock response data in the `onMockResponse` field and return the transformed response data and response headers.

> You can also throw an ERROR in onMockResponse to indicate a failure request.

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

> You can also throw an ERROR in onMockResponse to indicate failure request.

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
