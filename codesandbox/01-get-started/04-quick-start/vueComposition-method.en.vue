<template>
  <span>responseData: {{ data }}</span>
</template>

<script setup>
import { ref } from 'vue';
import { alovaInstance } from './api';

const data = ref(null);
alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
  .send()
  .then(response => {
    data.value = response;
  });
</script>