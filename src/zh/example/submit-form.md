---
title: 表单提交
order: 15
---

> 以vue3为例，但你还可以在react、svelte中使用alova，详细请阅读 [入门指南](/zh/overview/);


::: vue-playground

@file App.vue

```vue
<script setup>
import { ref } from 'vue';
import { addFruit } from './api.js';
import { useRequest } from 'alova';

const fruit = ref('');
const fruitsList = ref([]);
const {
  loading: submiting,
  send,
  onSuccess
} = useRequest(() => addFruit(fruit.value), {
  immediate: false
});
onSuccess(() => {
  fruitsList.value.push(fruit.value);
});
</script>

<template>
  <input v-model="fruit" />
  <button @click="send">提交</button>
  <ul v-else>
    <li
      v-for="item in fruitsList"
      :key="item">{{ item }}</li>
  </ul>
</template>
```

@file api.js

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter, defineMock } from 'alova/mock';

// mock data.
const mockData = defineMock({
  '[POST]/add-fruit': {
    success: true
  }
});
const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 2000 }),
  responsed: response => response.json(),
});

export const addFruit = fruit => alovaInst.Post('/add-fruit', { item: fruit });

```

@import

```json
{
  "imports": {
    "alova": "https://unpkg.com/alova/dist/alova.esm.js",
    "alova/GlobalFetch": "https://unpkg.com/alova/dist/adapter/globalfetch.esm.js",
    "alova/vue": "https://unpkg.com/alova/dist/hooks/vuehook.esm.js",
    "alova/mock": "https://unpkg.com/@alova/mock/dist/alova-mock.esm.js"
  }
}
```

:::


## 条件搜索