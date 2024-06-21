---
title: vue options
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

Usually, use hook can only be used in vue's setup, but through the auxiliary function provided by `@alova/vue-options`, you can also use alova's use hook in vue's options, which is perfectly compatible with almost all functions of alova. You can use all request strategies of `alova/client` under options.

> It can be used in both vue2 and vue3.

[![npm](https://img.shields.io/npm/v/@alova/vue-options)](https://www.npmjs.com/package/@alova/vue-options)
[![build](https://github.com/alovajs/vue-options/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/alovajs/vue-options/actions/workflows/release.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/vue-options/badge.svg?branch=main)](https://coveralls.io/github/alovajs/vue-options?branch=main)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## Installation

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install alova @alova/vue-options --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add alova @alova/vue-options
```

</TabItem>
</Tabs>

:::info Version requirements

alova version >= 3.0.0

vue version >= 2.17.0

:::

## Usage

### Map hook status and functions to vue instance

First use `vueOptionHook` to create an alova instance.

```javascript
import { createAlova, Method } from 'alova';
import adapterFetch from 'alova/fetch';
import { VueOptionsHook } from '@alova/vue-options';

// api.js
const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueOptionsHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});

/** @type {() => Method<unknown, unknown, { content: string, time: string }[]>} */
export const getData = () => alovaInst.Get('/todolist');
```

Use `mapAlovaHook` to map the return value collection of use hook to the component instance. Here is how to access the responsive state and operation function:

1. You can use the key of the collection To access responsive states such as `loading/data/error`, such as `this.key.loading`, `this.key.data`.
2. You can access the operation function by adding the function name to the collection key and concatenating it with `$`, such as `this.key$send`, `this.key$onSuccess`.

The following is a complete example.

```html
<template>
  <div>
    <span role="loading">{{ todoRequest.loading ? 'loading' : 'loaded' }}</span>
    <span role="error">{{ todoRequest.error ? todoRequest.error.message : '' }}</span>
    <div role="data">{{ JSON.stringify(todoRequest.data) }}</div>
    <button
      @click="todoRequest$send"
      role="btnSend">
      send
    </button>
  </div>
</template>

<script>
  import { useRequest } from 'alova/client';
  import { mapAlovaHook } from '@alova/vue-options';
  import { getData } from './api';

  export default {
    // mapAlovaHook will return an array of mixins, the usage of use hook is the same as before
    mixins: mapAlovaHook(function (vm) {
      // You can access the component instance through this or vm
      // When using this, this callback function cannot be an arrow function
      console.log(this, vm);
      return {
        todoRequest: useRequest(getData)
      };
    }),
    created() {
      this.todoRequest.loading;
      this.todoRequest$send();
      this.todoRequest$onSuccess(event => {
        event.data.match;
        event.sendArgs.copyWithin;
      });
      this.todoRequest$onSuccess(event => {
        console.log('success', event);
      });
      this.todoRequest$onError(event => {
        console.log('error', event);
      });
    },
    mounted() {
      this.todoRequest$onComplete(event => {
        console.log('complete', event);
      });
    }
  };
</script>
```

### Computed properties

If you need to define a computed property that depends on the request status related to the hook, just write it as usual.

```javascript
export default {
  computed: {
    todoRequestLoading() {
      return this.todoRequest.loading;
    },
    todoRequestData() {
      return this.todoRequest.data;
    }
  }
};
```

### Listening to hook status changes

The usage of monitoring status is also consistent with vue.

```javascript
export default {
  watch: {
    'todoRequest.loading'(newVal, oldVal) {
      // ...
    }
  }
};
```

## Function description

### mapAlovaHook

`mapAlovaHook` is used to map the state and function set returned by alova's use hook to the vue component instance through mixins. It receives a callback function and returns the return value collection of the use hook.

It is worth noting that the callback function will be executed in the `created` phase, and you can access the vue component instance in the following way.

```javascript
// 1. Access the component instance through this. Note that the callback function cannot be an arrow function
mapAlovaHook(function () {
  console.log(this);
  return {
    todoRequest: useRequest(getData)
  };
});

// =======================
// 2. Access the component instance through function parameters. You can use arrow functions at this time
mapAlovaHook(vm => {
  console.log(vm);
  return {
    todoRequest: useRequest(getData)
  };
});
```

## Type support

### Automatic inference

`@alova/vue-options` provides complete ts type support. Regardless of whether typescript is used, the mapped value type will be automatically inferred, for example:

```javascript
this.todoRequest.loading; // boolean
this.todoRequest.error; // Error | undefined
this.todoRequest.data; // any
this.todoRequest$send; // (...args: any[]) => Promise<any>
this.todoRequest$onSuccess; // (handler: SuccessHandler) => void
this.todoRequest$onError; // (handler: ErrorHandler) => void
this.todoRequest$onComplete; // (handler: CompleteHandler) => void
// ...
```

### Add types to response data

Except for `this.todoRequest.data`, other values ​​have the correct type, so how to set the type for `data`? In fact, it is the same as alova in other environments.

**javascript**

In javascript, you can use type annotations to add types. The first two generic parameters of Method are `unknown`, and the third generic parameter is the type of the response data

```javascript
import { Method } from 'alova';

/** @type {() => Method<unknown, unknown, { content: string, time: string }[]>} */
export const getData = () => alovaInst.Get('/todolist');
```

**typescript**Add response data types in typescript, please read the [alova documentation typescript chapter](/next/tutorial/advanced/in-depth/typescript)

## Limitations

1. [Manage extra states](/next/tutorial/client/in-depth/manage-extra-states) is not supported yet.
