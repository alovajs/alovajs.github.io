import { useRequest } from 'alova';
import { alovaInstance } from './api';

const App = () => {
  // Use the alova instance to create a method and pass it to useRequest to send the request
  const { loading, data, error } = useRequest(alovaInstance.Get('/todos/1'));

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
  return <span>responseData: {JSON.stringify(data)}</span>;
};
export default App;
