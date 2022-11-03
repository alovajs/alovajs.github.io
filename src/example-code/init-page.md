::: vue-playground Click right btn to view code

@file App.vue

```vue
<template>
  <span v-if="loading">Loading...</span>
  <span v-else-if="error">{{ error.message }}</span>
  <ul v-else>
    <li v-for="item in data" :key="item">{{ item }}</li>
  </ul>
</template>

<script setup>
import { listFruits } from './api.js';
import { useRequest } from 'alova';

const { data, loading, error } = useRequest(listFruits, {
  initialData: [],
});
</script>
```

@file api.js

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter, defineMock } from '@alova/mock';

// mock data
const mockData = defineMock({
  '/list-fruits': ['apple', 'banana', 'orange'],
});

// create a alova instance
const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 1500 }),
  responsed: response => response.json(),
});

export const listFruits = () => alovaInst.Get('/list-fruits');


```

@import

```json
{
  "imports": {
    "alova": "https://unpkg.com/alova/dist/alova.esm.js",
    "alova/GlobalFetch": "https://unpkg.com/alova/dist/adapter/globalfetch.esm.js",
    "alova/vue": "https://unpkg.com/alova/dist/hooks/vuehook.esm.js",
    "@alova/mock": "https://unpkg.com/@alova/mock/dist/alova-mock.esm.js"
  }
}
```

:::