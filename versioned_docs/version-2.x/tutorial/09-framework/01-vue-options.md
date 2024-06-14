---
title: vue2/3 options
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Usually, use hook can only be used in vue's setup, but through the helper function provided by `@alova/vue-options`, you can also use alova's use hook in vue's options, which is perfectly compatible with almost all functions of alova.

> Available in both vue2 and vue3.

[![npm](https://img.shields.io/npm/v/@alova/vue-options)](https://www.npmjs.com/package/@alova/vue-options)
[![build](https://github.com/alovajs/vue-options/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/alovajs/vue-options/actions/workflows/release.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/vue-options/badge.svg?branch=main)](https://coveralls.io/github/alovajs/vue-options?branch=main)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## Install

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

:::info alova requirements

alova version >= 2.13.2

:::

## Usage

### Map hook status and functions to vue instances

First use `vueOptionHook` to create an alova instance.

```javascript
import { createAlova, Method } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import { VueOptionsHook } from '@alova/vue-options';

// api.js
const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueOptionsHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});

/** @type {() => Method<unknown, unknown, { content: string, time: string }[]>} */
export const getData = () => alovaInst.Get('/todolist');
```

Then use `mapAlovaHook` to map the return value set of use hook to the component instance. The following is how to access the reactive state and operation functions:

1. You can access responsive status such as `loading/data/error` through the key of the collection, such as `this.key.loading`, `this.key.data`.
2. You can access the operation function through the key of the collection plus the function name, and use `$` to splice it, such as `this.key$send`, `this.key$onSuccess`.

Below is a complete example.

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
  import { useRequest } from 'alova';
  import { mapAlovaHook } from '@alova/vue-options';
  import { getData } from './api';

  export default {
    // mapAlovaHook will return the mixins array, and the usage of use hook is the same as before
    mixins: mapAlovaHook(function (vm) {
      // The component instance can be accessed through this or vm
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

If you need to define a computed property that depends on hook-related request status, just write it as usual.

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

### Watch hook status changes

Due to the limitations of vue2, all hook states are mounted on an object named `alovaHook$`, so you need to add the `alovaHook$` prefix when listening.

```javascript
export default {
  watch: {
    // ❌Unable to watch
    'todoRequest.loading'(newVal, oldVal) {
      // ...
    },
    // ✅watching is work
    'alovaHook$.todoRequest.loading'(newVal, oldVal) {
      // ...
    }
  }
};
```

But this is a bit troublesome, so a `mapWatcher` helper function is provided, which can not only automatically add prefixes, nested watching, but also batch watching.

#### Define single watch handler

```javascript
export default {
  watch: mapWatcher({
    // Usage 1
    'todoRequest.loading'(newVal, oldVal) {},

    // Usage 2
    todoRequest: {
      loading(newVal, oldVal) {},
      data(newVal, oldVal) {}
    }
  })
};
```

Watching object is also supported.

```javascript
export default {
  watch: mapWatcher({
    todoRequest: {
      data: {
        handler(newVal, oldVal) {},
        deep: true
      }
    }
  })
};
```

#### Batch define watch handlers

Multiple watching keys are separated by `,`.

```javascript
export default {
  watch: mapWatcher({
    // Usage 1
    'todoRequest1.data, todoRequest2.data'(newVal, oldVal) {},

    // Usage 2
    'todoRequest1, todoRequest2': {
      loading(newVal, oldVal) {},
      data(newVal, oldVal) {}
    },

    // Usage 3
    todoRequest1: {
      'loading, data'(newVal, oldVal) {}
    },

    // Usage 4
    'todoRequest1, todoRequest2': {
      'loading, data'(newVal, oldVal) {}
    }
  })
};
```

> Batch watching also supports watching object.

## Function description

### mapAlovaHook

`mapAlovaHook` is used to map the state and function collection returned by alova's use hook to the vue component instance through mixins. It receives a callback function and returns the return value collection of use hook.

It is worth noting that the callback function will be executed in the `created` phase, and you can access the vue component instance in the following way.

```javascript
// 1. Access the component instance through this. Note that the callback function cannot be an arrow function.
mapAlovaHook(function () {
  console.log(this);
  return {
    todoRequest: useRequest(getData)
  };
});

// =======================
// 2. Access the component instance through function parameters. In this case, arrow functions can be used
mapAlovaHook(vm => {
  console.log(vm);
  return {
    todoRequest: useRequest(getData)
  };
});
```

### mapWatcher

`mapWatcher` is an helper function used to quickly define the watching handlers of hook states. It receives an object whose key is the key of the hook state or a string representation of the nested value, and whose value is the watching handler or watching object.

```javascript
mapWatcher({
   'todoRequest.loading'(newVal, oldVal) {
     //...
   },
   todoRequest: {
     data(newVal, oldVal) {
       //...
     }
   },
   todoRequest: {
     'loading, data'(newVal, oldVal) {
       //...
     }
   }
}
```

In addition to supporting watching assistance for alova useHook, `mapWatcher` can also be used to batch set watching handlers of custom states.

```javascript
export default {
   data() {
     state1: '',
     state2: 0
   },

   // pass false at the second parameter to watch the custom states
   watch: mapWatcher({
    'state1, state2'(newVal, oldVal) {
       //...
     }
   }, false)
}
```

## Type support

### Automatic inference

`@alova/vue-options` provides complete ts type support. Whether using typescript or not, the mapped value type will be automatically inferred, for example:

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

### Add types for response data

Except for `this.todoRequest.data`, all other values have the correct type, so how to set the type for `data` too? In fact, it is the same as alova used in other environments.

**javascript**

In javascript, you can use type annotations to add types. The first two generic parameters of Method are `unknown`, and the third generic parameter is the type of response data.

```javascript
import { Method } from 'alova';

/** @type {() => Method<unknown, unknown, { content: string, time: string }[]>} */
export const getData = () => alovaInst.Get('/todolist');
```

**typescript**

To add response data type in typescript, please read [alova documentation typescript chapter](/tutorial/combine-framework/typescript)

## limit

1. [Manage extra states](/tutorial/advanced/manage-extra-states) is not supported yet.
2. Currently, only alova’s three core useHooks of `useRequest/useWatcher/useFetcher` are supported, as well as the encapsulation based on the core useHook in your own project. [@alova/scene](https://github.com/alovajs/scene) is not supported yet. extension useHook.
