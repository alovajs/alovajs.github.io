import { useRequest } from 'alova';
import { alovaInstance } from './api';

const App = () => {
  // 使用alova实例创建method并传给useRequest即可发送请求
  const { loading, data, error } = useRequest(alovaInstance.Get('https://jsonplaceholder.typicode.com/todos/1'));

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
  return <span>responseData: {JSON.stringify(data)}</span>;
};
export default App;
