export const quickStartVue = {
  'zh-CN': `<template>
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
</script>`
};

export const quickStartReact = {
  'zh-CN': `import { createAlova, useRequest } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';

// 1. 创建alova实例
const alovaInstance = createAlova({
  // ReactHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: ReactHook,

  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: GlobalFetch(),

  // 全局的响应拦截器
  responded: response => response.json()
});

const App = () => {
  // 2. 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(
    alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
  );

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <span>responseData: {JSON.stringify(data)}</span>
  );
};
export default App;`
};

export const quickStartSvelte = {
  'zh-CN': `<script>
  import { createAlova, useRequest } from 'alova';
  import GlobalFetch from 'alova/GlobalFetch';
  import SvelteHook from 'alova/svelte';

  // 1. 创建alova实例
  const alovaInstance = createAlova({
    // SvelteHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
    statesHook: SvelteHook,

    // 请求适配器，推荐使用fetch请求适配器
    requestAdapter: GlobalFetch(),

    // GlobalFetch适配器将会返回Response实例，
    // 你可以设置一个全局的响应拦截器返回json数据
    responded: response => response.json()
  });

  // 2. 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(
    alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
  );
</script>

{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<span>responseData: {{ data }}</span>
{/if}`
};
