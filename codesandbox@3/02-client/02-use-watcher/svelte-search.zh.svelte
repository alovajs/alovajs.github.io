<script>
import { useWatcher } from 'alova/client';
import { writable } from 'svelte/store';

// 创建method实例
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};
const userId = writable(0);
const { loading, data, error } = useWatcher(
  // 参数必须设置为返回method实例的函数
  () => filterTodoList($userId),

  // 被监听的状态数组，这些状态变化将会触发一次请求
  [userId]
);
</script>

<select bind:value="{$userId}">
  <option value="{1}">User 1</option>
  <option value="{2}">User 2</option>
  <option value="{3}">User 3</option>
</select>

<!-- 渲染筛选后的todo列表 -->
{#if $loading}
<div>Loading...</div>
{:else}
<ul>
  {#each $data as todo}
    <li class="todo-title">{ todo.completed ? '(Completed)' : '' }{ todo.title }</li>
  {/each}
</ul>
{/if}
