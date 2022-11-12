::: vue-playground Click right btn to view code

@file App.vue

```html
<template>
  <span>{{
    loading ? 'Loading...' : 'Please click the item below to view detail.'
  }}</span>
  <ul v-if="students.length > 0" class="list">
    <li v-for="item in students" :key="item.id" @click="handleDetailShow(item.id)">
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
import { queryStudents } from './api.js';
import { useRequest } from 'alova';
import Detail from './Detail.vue';

const showDetail = ref(false);
const viewingId = ref(0);
const { loading, data: students } = useRequest(() => queryStudents(), {
  initialData: [],
  immediate: true,
});

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
}
#request-console > div {
  color: #999;
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
  '/query-students': [
    {
      id: 1,
      name: 'August',
      cls: 'class 1',
    },
  ],
  '/student/{id}': {
    id: 1,
    name: 'August',
    cls: 'class 1',
    age: 15,
    sex: 'man',
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

export const queryStudents = (studentName, clsName) =>
  alovaInst.Get('/query-students', {
    params: { studentName, clsName },
  });
export const queryStudentDetail = (id) =>
  alovaInst.Get(`/student/${id}`, {
    // set the timestamp of memery cache
    localCache: 10 * 60 * 60,
  });

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
        <span class="notice"
          >Now click mask to close, and reopen the modal, it will hit response
          cache, and it will not send request.</span
        >
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
  top: 10%;
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
.notice {
  color: red;
  background: #eee;
  padding: 6px;
}
</style>

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