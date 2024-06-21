<template>
  <select v-model="userId">
    <option :value="1">User 1</option>
    <option :value="2">User 2</option>
    <option :value="3">User 3</option>
  </select>

  <!-- 渲染筛选后的todo列表 -->
  <div v-if="todo.loading">Loading...</div>
  <ul v-else>
    <li
      v-for="todoItem in todo.data"
      :key="todoItem.id">
      {{ todoItem.completed ? '(Completed)' : '' }}{{ todoItem.title }}
    </li>
  </ul>
</template>

<script>
import { mapAlovaHook } from '@alova/vue-options';
import { useWatcher } from 'alova';
import { alovaInstance } from './api';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};

export default {
  mixins: mapAlovaHook(function () {
    return {
      todo: useWatcher(
        // 必须设置为返回method实例的函数
        () => filterTodoList(this.userId),

        // 被监听的状态数组，这些状态变化将会触发一次请求
        ['userId']
      )
    };
  }),
  data() {
    return {
      userId: 1
    };
  }
};
</script>
