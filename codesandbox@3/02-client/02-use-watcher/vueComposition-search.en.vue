<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- Render the filtered todo list -->
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

// Create method instance
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};
const userId = ref(1);
const { loading, data, error } = useWatcher(
  // Must be set to a function that returns a method instance
  () => filterTodoList(userId.value),

  // The monitored status array, these status changes will trigger a request
  [userId]
);
</script>
