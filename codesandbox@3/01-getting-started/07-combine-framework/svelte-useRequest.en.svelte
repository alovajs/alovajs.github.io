<script>
  import { useRequest } from 'alova/client';
  import { alovaInstance } from './api';

  // Use the alova instance to create a method and pass it to useRequest to send a request
  const { loading, data, error, send, update, onSuccess } = useRequest(
    alovaInstance.Get('/todos/1', {
      cacheFor: 0
    }),
    {
      initialData: {}, // Set the initial data of the data state
      immediate: true // Whether to send the request immediately, the default is true
    }
  );
  onSuccess(event => {
    event.method; //The method of the current request
    event.data; //Response data of the current request
  });

  const handleSend = () => {
    send();
  };
  const handleUpdate = () => {
    update({
      data: { title: 'new title' }
    });

    // You can also modify the data value directly
    // $data = { title: 'new title' };
    // data.update(d => ({ title: 'new title' }));
  };
</script>

{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<div>
  <div>Request result: {{ data }}</div>
  <button on:click="{handleSend}">Manually send request</button>
  <button on:click="{handleUpdate}">Manually modify data</button>
</div>
{/if}
