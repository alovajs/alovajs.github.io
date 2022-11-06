
::: vue-playground Click right btn to view code

@file App.vue

```vue
<template>
  <span v-if="loading && festivals.length <= 0">Loading...</span>
  <span v-else-if="error">{{ error.message }}</span>
  <ul v-else class="list">
    <li v-for="fes in festivals" :key="fes.name">
      [{{ fes.date }}] {{ fes.name }}
    </li>
  </ul>

  <div v-if="!loading" class="notice">
    <div>
      <span class="link" @click="reloadPage">Reload page</span>
      <span>, you don't need to rerequest festival data until next year.</span>
    </div>
    <div>
      <span class="link" @click="invalidateOldData"
        >Invalidate the persitent data</span
      >
      <span> and reload page, you can see 'Loading...' again.</span>
    </div>
  </div>

  <div id="request-console">
    <strong>Request Records</strong>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { queryFestivals } from './api.js';
import { useRequest, invalidateCache } from 'alova';

const methodOfQueryFestivals = queryFestivals();
const {
  loading,
  error,
  data: festivals,
} = useRequest(methodOfQueryFestivals, {
  initialData: [],
});
const reloadPage = () => {
  location.reload();
};
const invalidateOldData = () => {
  invalidateCache(methodOfQueryFestivals);
  reloadPage();
};
</script>

<style scoped>
.list {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.list li {
  list-style-type: none;
  padding: 10px;
  border: solid 1px #ddd;
  margin-right: 10px;
  margin-bottom: 10px;
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

#request-console {
  width: 90%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 1px 1px 20px #ddd;
  position: fixed;
  left: 5%;
  bottom: 10px;
  z-index: 100;
  background: white;
}
#request-console > div {
  color: #999;
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
  '/query-festivals': () => {
    console.log('fff');
    return festivals;
  },
});

const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 1500 }),
  responsed: async (response, context) => {
    const res = await response.json();
    const consoleDiv = document.querySelector('#request-console div');

    const elDiv = document.createElement('div');
    elDiv.appendChild(
      document.createTextNode(new Date().toLocaleString() + ' ' + context.url)
    );
    consoleDiv.appendChild(elDiv);
    return res;
  },
});

export const queryFestivals = () => {
  const expireDate = new Date();
  expireDate.setMonth(11, 31);
  expireDate.setHours(23, 59, 59, 999);
  return alovaInst.Get('/query-festivals', {
    // set cache mode to 'STORAGE_RESTORE', It is generally used for data that remains unchanged for a certain period of time
    localCache: {
      mode: cacheMode.STORAGE_RESTORE,
      expire: expireDate,
    },
  });
};

const festivals = [
  {
    name: "New Year's Day",
    date: '01-01',
  },
  {
    name: "Valentine's Day",
    date: '02-14',
  },
  {
    name: "Women's Day",
    date: '03-08',
  },
  {
    name: "April Fools' Day",
    date: '04-01',
  },
  {
    name: 'May Day',
    date: '05-01',
  },
  {
    name: 'Dragon Boat Festival',
    date: '05-05',
  },
  {
    name: 'Mid-Autumn Festival',
    date: '08-15',
  },
  {
    name: "Motherland's National Day",
    date: '10-01',
  },
  {
    name: 'Christmas Day',
    date: '12-25',
  },
];

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