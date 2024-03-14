<template>
  <div v-if="todo.loading">Loading...</div>
  <div v-else-if="todo.error">{{ todo.error.message }}</div>
  <span v-else>responseData: {{ todo.data }}</span>
</template>

<script>
import { mapAlovaHook } from '@alova/vue-options';
import { useRequest } from 'alova';
import { alovaInstance } from './api';

export default {
  mixins: mapAlovaHook(function () {
    return {
      // Use the alova instance to create a method and pass it to useRequest to send the request
      todo: useRequest(alovaInstance.Get('/todos/1'))
    };
  }),
  data() {
    return {};
  }
};
</script>
