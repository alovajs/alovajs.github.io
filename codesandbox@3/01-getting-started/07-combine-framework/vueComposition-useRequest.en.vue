<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <div v-else>
    <div>Request result: {{ data }}</div>
    <button @click="handleSend">Manually send request</button>
    <button @click="handleUpdate">Manually modify data</button>
  </div>
</template>

<script setup>
import { useRequest } from 'alova/client';
import { alovaInstance } from './api';

// Use the alova instance to create a method and pass it to useRequest to send a request
const { loading, data, error, send, update } = useRequest(
  alovaInstance.Get('/todos/1', {
    cacheFor: 0
  }),
  {
    initialData: {}, // Set the initial data of the data state
    immediate: true // Whether to send a request immediately, the default is true
  }
).onSuccess(event => {
  event.method; //The method of the current request
  event.data; //Response data of the current request
});

const handleSend = () => {
  send();
};
const handleUpdate = () => {
  update({
    data: { title: 'new title' }
  });

  // You can also modify the data value directly
  // data.value = { title: 'new title' };
};
</script>
