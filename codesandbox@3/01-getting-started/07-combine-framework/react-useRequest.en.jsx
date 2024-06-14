import { useRequest } from 'alova/client';
import { alovaInstance } from './api';

const App = () => {
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
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <div>Request result: {JSON.stringify(data)}</div>
      <button onClick={handleSend}>Manually send request</button>
      <button onClick={handleUpdate}>Manually modify data</button>
    </div>
  );
};
export default App;
