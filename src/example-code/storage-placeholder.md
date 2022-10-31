::: vue-playground

@file App.vue

```vue
<template>
  <span v-if="loading && randomNumbers.length <= 0">Loading...</span>
  <span v-else-if="error">{{ error.message }}</span>
  <ul v-else class="list">
    <li v-for="num in randomNumbers" :key="num">
      {{ num }}
    </li>
  </ul>

  <div v-if="!loading" class="notice">
    <div>
      <span class="link" @click="reloadPage">Reload page</span>
      <span>, you can see the old data instead of 'Loading...'</span
      >
    </div>
    <div>
      <span class="link" @click="invalidateOldData">Invalidate the data of placeholder</span>
      <span> and reload page, you can see
        'Loading...' again.</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { queryRandom } from './api.js';
import { useRequest, invalidateCache } from 'alova';

const methodOfQueryRandom = queryRandom();
const {
  loading,
  error,
  data: randomNumbers,
} = useRequest(methodOfQueryRandom, {
  initialData: [],
});
const reloadPage = () => {
  location.reload();
};
const invalidateOldData = () => {
  invalidateCache(methodOfQueryRandom);
  reloadPage();
};
</script>

<style scoped>
.list {
  padding: 0;
}
.list li {
  list-style-type: none;
  padding: 10px 0;
  border-bottom: solid 1px #ddd;
}
.notice {
  padding: 8px;
  background: #eee;
}
.link {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>

```

@file api.js

```js
import { createAlova, cacheMode } from 'alova';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter, defineMock } from '@alova/mock';

// mock data.
const mockData = defineMock({
  '/query-random': () => {
    return Array.from({ length: 5 }).map((_) =>
      (Math.random() * 100).toFixed(0)
    );
  },
});

const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 1500 }),
  responsed: (response) => response.json(),
});

export const queryRandom = () =>
  alovaInst.Get('/query-random', {
    // set cache mode to 'STORAGE_PLACEHOLDER', it means using old data to occupy loading status
    localCache: {
      mode: cacheMode.STORAGE_PLACEHOLDER,
      expire: 10 * 60 * 60,
    },
  });

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