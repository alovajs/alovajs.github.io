<script>
import { useWatcher } from 'alova/client';
import { writable } from 'svelte/store';

//Create method instance
const filterTodoList = userId => {
  return alovaInstance.Get(`/users/${userId}/todos`);
};
const userId = writable(0);
const { loading, data, error } = useWatcher(
  // Parameters must be set to functions that return method instances
  () => filterTodoList($userId),

  // The monitored status array, these status changes will trigger a request
  [userId]
);
</script>

<select bind:value="{$userId}">
  <option value="{1}">User 1</option>
  <option value="{2}">User 2</option>
  <option value="{3}">User 3</option>
</select>

<!-- Render the filtered todo list -->
{#if $loading}
<div>Loading...</div>
{:else}
<ul>
  {#each $data as todo}
    <li class="todo-title">{ todo.completed ? '(Completed)' : '' }{ todo.title }</li>
  {/each}
</ul>
{/if}
