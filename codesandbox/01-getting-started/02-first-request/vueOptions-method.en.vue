<template>
  <span>responseData: {{ data }}</span>
</template>

<script>
import { alovaInstance } from './api';

export default {
  data() {
    return {
      data: null
    }
  },
  created() {
    alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.text())
      .then(text => {
        this.data = text;
      });
  }
}
</script>