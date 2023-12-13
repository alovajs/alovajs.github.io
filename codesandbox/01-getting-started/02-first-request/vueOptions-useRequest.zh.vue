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
  mixins: mapAlovaHook(function() {
    return {
      // 使用alova实例创建method并传给useRequest即可发送请求
      todo: useRequest(
        alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
      )
    }
  }),
  data() {
    return {}; 
  }
}
</script>