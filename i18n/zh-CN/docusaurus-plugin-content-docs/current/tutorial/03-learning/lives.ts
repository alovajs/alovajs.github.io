export const useWatcherSearchVue = `<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- 渲染筛选后的todo列表 -->
  <div v-if="loading">Loading...</div>
  <ul v-else>
    <li v-for="todo in data" :key="todo.id">{{ todo.completed ? '(Completed)' : '' }}{{ todo.title }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useWatcher } from 'alova';
import { alovaInstance } from './api';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(\`/users/\${userId}/todos\`);
};
const userId = ref(1);
const {
  loading,
  data,
  error
} = useWatcher(

  // 必须设置为返回method实例的函数
  () => filterTodoList(userId.value),

  // 被监听的状态数组，这些状态变化将会触发一次请求
  [userId]
);
</script>`;

export const useWatcherSearchVueOptions = `<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- 渲染筛选后的todo列表 -->
  <div v-if="todo.loading">Loading...</div>
  <ul v-else>
    <li v-for="todoItem in todo.data" :key="todoItem.id">{{ todoItem.completed ? '(Completed)' : '' }}{{ todoItem.title }}</li>
  </ul>
</template>

<script>
import { useWatcher } from 'alova';
import { alovaInstance } from './api';
import { mapAlovaHook } from '@alova/vue-options';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(\`/users/\${userId}/todos\`);
};

export default {
  mixins: mapAlovaHook(function() {
    return {
      todo: useWatcher(

        // 必须设置为返回method实例的函数
        () => filterTodoList(this.userId),
      
        // 被监听的状态数组，这些状态变化将会触发一次请求
        ['userId']
      )
    };
  }),
  data() {
    return {
      userId: 1
    };
  }
};
</script>`;

export const useWatcherSearchReact = `
import { useState } from 'react';
import { useWatcher } from 'alova';
import { alovaInstance } from './api';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(\`/users/\${userId}/todos\`);
};

const App = () => {
  const [userId, setUserId] = useState(1);
  const {
    loading,
    data = [],
    error
  } = useWatcher(

    // 必须设置为返回method实例的函数
    () => filterTodoList(userId),

    // 被监听的状态数组，这些状态变化将会触发一次请求
    [userId]
  );

  return (
    <>
      <select value={userId} onChange={e => setUserId(e.target.value)}>
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
        <option value={3}>User 3</option>
      </select>

      {/* 渲染筛选后的todo列表 */}
      {loading ? <div>Loading...</div> : null}
      {!loading ? <ul>
        {data.map(todo => (
          <li>{todo.completed ? '(Completed)' : ''}{todo.title}</li>
        ))}
      </ul> : null}
    </>
  );
};
export default App;`;
