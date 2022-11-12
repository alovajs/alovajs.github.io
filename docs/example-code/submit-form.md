::: vue-playground Click right btn to view code

@file App.vue

```html
<template>
  <input v-model="fruit" placeholder="input a fruit" />
  <button @click="submitFruit" :disabled="submiting">Submit</button>
  <ul v-if="fruitsList.length > 0">
    <li v-for="item in fruitsList" :key="item">{{ item }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { addFruit } from './api.js';
import { useRequest } from 'alova';

const fruit = ref('');
const fruitsList = ref([]);
const {
  loading: submiting,
  send,
  onSuccess,
} = useRequest(() => addFruit(fruit.value), {
  immediate: false,
});
onSuccess(() => {
  fruitsList.value.push(fruit.value);
  fruit.value = '';
});

const submitFruit = () => {
  if (!fruit.value) {
    alert('Please input a fruit');
    return;
  }
  send();
};
</script>

```

@file api.js

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter, defineMock } from '@alova/mock';

// mock data.
const mockData = defineMock({
  '[POST]/add-fruit': {
    success: true,
  },
});

const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 1500 }),
  responsed: (response) => response.json(),
});

export const addFruit = (fruit) =>
  alovaInst.Post('/add-fruit', { item: fruit });

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