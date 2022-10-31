::: vue-playground

@file App.vue

```vue
<template>
  <input v-model="studentName" placeholder="input student name" />
  <select v-model="clsName">
    <option value="">select class</option>
    <option value="class 1">class 1</option>
    <option value="class 2">class 2</option>
    <option value="class 3">class 3</option>
  </select>
  <span v-if="loading">Loading...</span>
  <ul v-if="students.length > 0" class="list">
    <li v-for="item in students" :key="item">
      <span class="name">{{ item.name }}</span>
      <span>{{ item.cls }}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { queryStudents } from './api.js';
import { useWatcher } from 'alova';

const studentName = ref('');
const clsName = ref('');
const { loading, data: students } = useWatcher(
  () => queryStudents(studentName.value, clsName.value),
  [studentName, clsName],
  {
    initialData: [],
    debounce: 500,
    immediate: true,
  }
);
</script>

<style scoped>
.list {
  padding: 0;
}
.list li {
  list-style-type: none;
  padding: 10px 0;
  border-bottom: solid 1px #ddd;
  display: flex;
}
.list li .name {
  width: 100px;
}
</style>


```

@file api.js

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter, defineMock } from '@alova/mock';

// mock data.
const mockData = defineMock({
  '/query-students': ({ query }) => {
    const { studentName, clsName } = query;
    return allStudents.filter(
      ({ name, cls }) =>
        (studentName
          ? name.toLocaleLowerCase().indexOf(studentName.toLocaleLowerCase()) >=
            0
          : true) && (clsName ? clsName === cls : true)
    );
  },
});

const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 1500 }),
  responsed: (response) => response.json(),
});

export const queryStudents = (studentName, clsName) =>
  alovaInst.Get('/query-students', {
    params: { studentName, clsName },
  });

const allStudents = [
  {
    name: 'August',
    cls: 'class 1',
  },
  {
    name: 'Marshall',
    cls: 'class 3',
  },
  {
    name: 'Maxwell',
    cls: 'class 1',
  },
  {
    name: 'Kevin',
    cls: 'class 1',
  },
  {
    name: 'Julian',
    cls: 'class 2',
  },
  {
    name: 'Maxwell',
    cls: 'class 2',
  },
  {
    name: 'August',
    cls: 'class 1',
  },
  {
    name: 'Maxwell',
    cls: 'class 3',
  },
  {
    name: 'Marshall',
    cls: 'class 1',
  },
  {
    name: 'William',
    cls: 'class 1',
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