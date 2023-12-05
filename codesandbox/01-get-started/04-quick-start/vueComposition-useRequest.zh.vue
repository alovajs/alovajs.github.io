<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <span v-else>responseData: {{ data }}</span>
</template>

<script setup>
import { useRequest } from 'alova';
import { alovaInstance } from './api';

// 使用alova实例创建method并传给useRequest即可发送请求
const { loading, data, error } = useRequest(
  alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
);
</script>