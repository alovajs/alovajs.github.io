<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
  <span v-else>responseData: {{ data }}</span>
</template>

<script setup>
import { useRequest } from 'alova';
import { alovaInstance } from './api';

// Use the alova instance to create a method and pass it to useRequest to send the request
const { loading, data, error } = useRequest(alovaInstance.Get('/todos/1'));
</script>
