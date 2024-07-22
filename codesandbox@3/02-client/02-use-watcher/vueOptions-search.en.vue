<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- Render the filtered todo list -->
  <div v-if="todo.loading">Loading...</div>
  <ul v-else>
    <li
      v-for="todoItem in todo.data"
      :key="todoItem.id">
      {{ todoItem.completed ? '(Completed)' : '' }}{{ todoItem.title }}
    </li>
  </ul>
</template>

<script>
import { mapAlovaHook } from '@alova/vue-options';
import { useWatcher } from 'alova/client';
import { alovaInstance } from './api';

// Create method instance
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};

export default {
  mixins: mapAlovaHook(function () {
    return {
      todo: useWatcher(
        // Must be set to a function that returns a method instance
        () => filterTodoList(this.userId),

        // The monitored status array, these status changes will trigger a request
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
</script>
