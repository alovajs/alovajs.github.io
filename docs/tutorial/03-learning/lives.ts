export const useWatcherSearchVue = `<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- Render the filtered todo list -->
  <div v-if="loading">Loading...</div>
  <ul v-else>
    <li v-for="todo in data" :key="todo.id">{{ todo.completed ? '(Completed)' : '' }}{{ todo.title }}</li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useWatcher } from 'alova';
import { alovaInstance } from './api';

// Create method instance
const filterTodoList = userId => {
  return alovaInstance.Get(\`/users/\${userId}/todos\`);
};
const userId = ref(1);
const {
  loading,
  data,
  error
} = useWatcher(

  // Must be set to a function that returns a method instance
  () => filterTodoList(userId.value),

  // The monitored status array, these status changes will trigger a request
  [userId]
);
</script>`;

export const useWatcherSearchVueOptions = `<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- Render the filtered todo list -->
  <div v-if="todo.loading">Loading...</div>
  <ul v-else>
    <li v-for="todoItem in todo.data" :key="todoItem.id">{{ todoItem.completed ? '(Completed)' : '' }}{{ todoItem.title }}</li>
  </ul>
</template>

<script>
import { useWatcher } from 'alova';
import { alovaInstance } from './api';
import { mapAlovaHook } from '@alova/vue-options';

// Create method instance
const filterTodoList = userId => {
  return alovaInstance.Get(\`/users/\${userId}/todos\`);
};

export default {
  mixins: mapAlovaHook(function() {
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
</script>`;

export const useWatcherSearchReact = `
import { useState } from 'react';
import { useWatcher } from 'alova';
import { alovaInstance } from './api';

//Create method instance
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

    // Must be set to a function that returns a method instance
    () => filterTodoList(userId),

    // The monitored status array, these status changes will trigger a request
    [userId]
  );

  return (
    <>
      <select value={userId} onChange={e => setUserId(e.target.value)}>
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
        <option value={3}>User 3</option>
      </select>

      {/* Render the filtered todo list */}
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
