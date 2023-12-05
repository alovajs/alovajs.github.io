<script>
import { useRequest } from 'alova';
import { alovaInstance } from './api';

// 使用alova实例创建method并传给useRequest即可发送请求
const { loading, data, error } = useRequest(alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1'));
</script>

{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<span>responseData: { data }</span>
{/if}