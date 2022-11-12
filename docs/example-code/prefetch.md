::: vue-playground Click right btn to view code

@file App.vue

```html
<template>
  <span>{{
    loading ? 'Loading...' : 'Mouse move to items below, it will prefetch detail data.'
  }}</span>
  <ul v-if="students.length > 0" class="list">
    <li
      v-for="item in students"
      :key="item.id"
      @click="handleDetailShow(item.id)"
      @mouseenter="handleFetchDetail(item.id)"
      @mouseleave="handleRemoveFetch(item.id)"
    >
      <span class="name">{{ item.name }}</span>
      <span>{{ item.cls }}</span>
    </li>
  </ul>

  <detail v-model:show="showDetail" :id="viewingId"></detail>

  <div id="request-console">
    <strong>Request Records</strong>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { queryStudents, queryStudentDetail } from './api.js';
import { useRequest, useFetcher } from 'alova';
import Detail from './Detail.vue';

const showDetail = ref(false);
const viewingId = ref(0);
const { loading, data: students } = useRequest(() => queryStudents(), {
  initialData: [],
  immediate: true,
});

const timers = {};
const { fetch } = useFetcher({ force: false }); // close force request
// Prefetch detail data when staying for more than 300 milliseconds
const handleFetchDetail = (id) => {
  timers[id] = setTimeout(() => {
    fetch(queryStudentDetail(id));
  }, 200);
};
const handleRemoveFetch = (id) => {
  if (timers[id]) {
    clearTimeout(timers[id]);
    delete timers[id];
  }
};

const handleDetailShow = (id) => {
  viewingId.value = id;
  showDetail.value = true;
};
</script>

<style scoped>
.list {
  padding: 0;
  border-top: solid 1px #ddd;
}
.list li {
  list-style-type: none;
  padding: 10px 0;
  border-bottom: solid 1px #ddd;
  display: flex;
  cursor: pointer;
}
.list li:hover {
  background: #eee;
}
.list li .name {
  width: 100px;
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
  height: 100px;
  overflow: auto;
}
#request-console > div {
  color: #999;
}
</style>

```


@file Detail.vue
```html
<template>
  <div v-if="show" class="detail-modal">
    <div class="modal-mask" @click="emit('update:show', false)"></div>
    <div class="modal-body">
      <div class="loading" v-if="loading">Loading...</div>
      <div class="detail-wrapper" v-else>
        <span class="title">Student Info</span>
        <span>Name: {{ detail.name }}</span>
        <span>Class: {{ detail.cls }}</span>
        <span>Age: {{ detail.age }}</span>
        <span>Sex: {{ detail.sex }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watchEffect, defineEmits } from 'vue';
import { queryStudentDetail } from './api.js';
import { useRequest } from 'alova';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['update:show']);

const {
  loading,
  data: detail,
  send,
} = useRequest((id) => queryStudentDetail(id), {
  initialData: {},
  immediate: false,
});
watchEffect(() => {
  if (props.show) {
    send(props.id);
  }
});
</script>

<style scoped>
.detail-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.modal-body {
  width: 80%;
  background-color: white;
  z-index: 20;
  position: absolute;
  left: 10%;
  top: 5%;
  padding: 20px;
  box-sizing: border-box;
}
.loading {
  font-size: 20px;
  font-weight: bolder;
  text-align: center;
  margin-top: 20px;
}
.detail-wrapper {
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: bolder;
  margin-bottom: 10px;
  font-size: 20px;
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
  '/query-students': () => allStudents,
  '/student/{id}': ({ params }) =>
    allStudents.find(({ id }) => params.id === id.toString()) || null,
});

const alovaInst = createAlova({
  baseURL: 'http://example.com',
  statesHook: VueHook,
  requestAdapter: createAlovaMockAdapter([mockData], { delay: 300 }),
  responsed: async (response, context) => {
    const res = await response.json();
    const consoleDiv = document.querySelector('#request-console div');

    const elDiv = document.createElement('div');
    elDiv.appendChild(
      document.createTextNode(new Date().toLocaleString() + ' ' + context.url)
    );
    consoleDiv.appendChild(elDiv);
    elDiv.scrollIntoView(false);
    return res;
  },
});

export const queryStudents = (studentName, clsName) =>
  alovaInst.Get('/query-students', {
    params: { studentName, clsName },
  });
export const queryStudentDetail = (id) =>
  alovaInst.Get(`/student/${id}`, {
    // set the timestamp of memery cache
    localCache: 10 * 60 * 60,
  });

const allStudents = [
  {
    id: 1,
    name: 'August',
    cls: 'class 1',
    age: 14,
    sex: 'male',
  },
  {
    id: 2,
    name: 'Marshall',
    cls: 'class 3',
    age: 13,
    sex: 'male',
  },
  {
    id: 3,
    name: 'Maxwell',
    cls: 'class 1',
    age: 15,
    sex: 'female',
  },
  {
    id: 4,
    name: 'Kevin',
    cls: 'class 1',
    age: 15,
    sex: 'male',
  },
  {
    id: 5,
    name: 'Julian',
    cls: 'class 2',
    age: 12,
    sex: 'female',
  },
  {
    id: 6,
    name: 'Maxwell',
    cls: 'class 2',
    age: 17,
    sex: 'female',
  },
  {
    id: 7,
    name: 'August',
    cls: 'class 1',
    age: 15,
    sex: 'male',
  },
  {
    id: 8,
    name: 'Maxwell',
    cls: 'class 3',
    age: 14,
    sex: 'female',
  },
  {
    id: 9,
    name: 'Marshall',
    cls: 'class 1',
    age: 12,
    sex: 'male',
  },
  {
    id: 10,
    name: 'William',
    cls: 'class 1',
    age: 16,
    sex: 'male',
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