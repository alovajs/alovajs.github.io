::: vue-playground Click right btn to view code

@file App.vue

```html
<template>
  <span>{{
    loading
      ? 'Loading...'
      : 'Mouse move to items below, it will prefetch detail data.'
  }}</span>
  <div>
    <button @click="handleStudentAdd">Add student</button>
  </div>
  <ul v-if="students.length > 0" class="list">
    <li class="title">
      <span class="id">ID</span>
      <span class="name">Name</span>
      <span>Class</span>
    </li>
    <li v-for="item in students" :key="item.id">
      <span class="id">{{ item.id || '--' }}</span>
      <span class="name">{{ item.name }}</span>
      <span>{{ item.cls }}</span>
    </li>
  </ul>

  <detail v-model:show="showDetail"></detail>
  <div id="request-console">
    <strong>List data update records</strong>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { queryStudents } from './api.js';
import { useRequest, useFetcher } from 'alova';
import Detail from './Detail.vue';

const showDetail = ref(false);
const viewingId = ref(0);
const { loading, data: students } = useRequest(() => queryStudents(), {
  initialData: [],
  immediate: true,
});

const handleStudentAdd = () => {
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
}
.list .title {
  background: #eee;
  font-weight: bolder;
}
.list li .id {
  width: 60px;
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

@file api.js

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { createAlovaMockAdapter, defineMock } from '@alova/mock';

// mock data.
const mockData = defineMock({
  '/query-students': () => allStudents,
  '[POST]/student': ({ data }) => {
    const newId = allStudents.length + 1;
    allStudents.unshift({
      id: newId,
      ...data,
    });
    return { newId };
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
    name: 'student-list',
    params: { studentName, clsName },
  });
export const addStudent = (studentData) =>
  alovaInst.Post('/student', studentData);

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
];

```

@file Detail.vue
```html
<template>
  <div v-if="show" class="detail-modal">
    <div class="modal-mask" @click="emit('update:show', false)"></div>
    <div class="modal-body">
      <div class="detail-wrapper">
        <span class="title">Add student</span>
        <span>
          <label>Name: </label>
          <input v-model="name" />
        </span>
        <span>
          <label>Class: </label>
          <select v-model="cls">
            <option value="class 1">class 1</option>
            <option value="class 2">class 2</option>
            <option value="class 3">class 3</option>
          </select>
        </span>
        <span>
          <label>Age: </label>
          <select v-model="age">
            <option v-for="(_, i) in 5" :value="i + 12">{{ i + 12 }}</option>
          </select>
        </span>
        <span>
          <label>Sex: </label>
          <select v-model="sex">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </span>
        <button @click="submitStudent" :disabled="loading">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, watchEffect, defineEmits, ref } from 'vue';
import { useRequest, updateState } from 'alova';
import { addStudent } from './api.js';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['update:show']);

const name = ref('');
const cls = ref('class 1');
const age = ref(12);
const sex = ref('male');
const studentData = () => ({
  name: name.value,
  cls: cls.value,
  age: age.value,
  sex: sex.value,
});

const consoleListDataUpdateRecord2Panel = (content) => {
  const consoleDiv = document.querySelector('#request-console div');
  const elDiv = document.createElement('div');
  elDiv.appendChild(document.createTextNode(content));
  consoleDiv.appendChild(elDiv);
  elDiv.scrollIntoView(false);
};

const {
  loading,
  send: sendStudentAdd,
  onSuccess,
} = useRequest(() => addStudent(studentData()), {
  immediate: false,
  silent: true,
});
onSuccess(() => {
  updateState('student-list', (studentList) => {
    studentList.unshift({
      // delayed data update.
      '+id': ({ newId }) => {
        consoleListDataUpdateRecord2Panel(
          'Update the id of newest student, now it has the id where from server'
        );
        return newId;
      },
      ...studentData(),
    });

    consoleListDataUpdateRecord2Panel(
      'Add new student data to list without id'
    );
    return studentList;
  });
});

const submitStudent = () => {
  if (!name.value) {
    alert('Please input student name');
    return;
  }
  sendStudentAdd();
  emit('update:show', false);
};
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
.modal-body label {
  display: inline-block;
  width: 60px;
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
  align-items: flex-start;
}
.detail-wrapper > span {
  margin-bottom: 6px;
}
.title {
  font-weight: bolder;
  margin-bottom: 10px;
  font-size: 20px;
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