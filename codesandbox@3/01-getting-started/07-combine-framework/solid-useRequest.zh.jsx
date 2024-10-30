import { useRequest } from 'alova/client';
import { alovaInstance } from './api';

const App = () => {
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
  };

  return (
    <>
      {loading() ? (
        <div>Loading...</div>
      ) : error() ? (
        <div>{error().message}</div>
      ) : (
        <div>
          <div>请求结果: {JSON.stringify(data)}</div>
          <button onClick={handleSend}>手动发送请求</button>
          <button onClick={handleUpdate}>手动修改data</button>
        </div>
      )}
    </>
  );
};
export default App;
