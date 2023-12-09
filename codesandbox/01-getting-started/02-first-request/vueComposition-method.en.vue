<template>
  <span>responseData: {{ data }}</span>
</template>

<script setup>
import { ref } from 'vue';
import { alovaInstance } from './api';

const data = ref(null);
alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.text())
  .then(text => {
    data.value = text;
  });
</script>