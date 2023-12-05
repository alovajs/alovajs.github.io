<template>
  <span>responseData: {{ response }}</span>
</template>

<script>
import { alovaInstance } from './api';

export default {
  data() {
    return {
      response: null
    }
  },
  created() {
    alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
      .send()
      .then(response => {
        this.response = response;
      });
  }
}
</script>