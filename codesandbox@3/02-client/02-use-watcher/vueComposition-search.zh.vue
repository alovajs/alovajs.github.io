<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- 渲染筛选后的todo列表 -->
  <div v-if="loading">Loading...</div>
  <ul v-else>
    <li
      v-for="todo in data"
      :key="todo.id">
      {{ todo.completed ? '(Completed)' : '' }}{{ todo.title }}
    </li>
  </ul>
</template>

<script setup>
import { useWatcher } from 'alova/client';
import { ref } from 'vue';
import { alovaInstance } from './api';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};
const userId = ref(1);
const { loading, data } = useWatcher(
  // 必须设置为返回method实例的函数
  () => filterTodoList(userId.value),

  // 被监听的状态数组，这些状态变化将会触发一次请求
  [userId]
);
</script>
