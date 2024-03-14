<script>
import { useRequest } from 'alova';
import { alovaInstance } from './api';

// Use the alova instance to create a method and pass it to useRequest to send the request
const { loading, data, error } = useRequest(alovaInstance.Get('/todos/1'));
</script>

{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<span>responseData: { data }</span>
{/if}