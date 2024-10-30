<script>
import { useRequest } from 'alova/client';
import { alovaInstance } from './api';

// 使用alova实例创建method并传给useRequest即可发送请求
const { loading, data, error, send, update } = useRequest(
  alovaInstance.Get('/todos/1', {
    cacheFor: 0
  }),
  {
    initialData: {}, // 设置data状态的初始数据
    immediate: true // 是否立即发送请求，默认为true
  }
).onSuccess(event => {
  event.method; // 当前请求的method
  event.data; // 当前请求的响应数据
});

const handleSend = () => {
  send();
};
const handleUpdate = () => {
  update({
    data: { title: 'new title' }
  });

  // 也可以直接修改data值
  // $data = { title: 'new title' };
  // data.update(d => ({ title: 'new title' }));
}
</script>

{#if $loading}
<div>Loading...</div>
{:else if $error}
<div>{ $error.message }</div>
{:else}
<div>
  <div>请求结果: {{ data }}</div>
  <button on:click={handleSend}>手动发送请求</button>
  <button on:click={handleUpdate}>手动修改data</button>
</div>
{/if}
