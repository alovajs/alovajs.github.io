export const quickStartVueCN = `<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <span v-else>responseData: {{ data }}</span>
</template>

<script setup>
import { createAlova, useRequest } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import VueHook from 'alova/vue';
// 1. 创建alova实例
const alovaInstance = createAlova({
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,
  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),
  // 全局的响应拦截器
  responded: response => response.json()
});
// 2. 使用alova实例创建method并传给useRequest即可发送请求
const { loading, data, error } = useRequest(
  alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
);
</script>`;
