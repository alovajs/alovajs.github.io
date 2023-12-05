import { useEffect, useState } from 'react';
import { alovaInstance } from './api';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    alovaInstance
      .Get('https://jsonplaceholder.typicode.com/todos/1')
      .send()
      .then(response => {
        setData(response);
      });
  }, []);

  return <span>responseData: {JSON.stringify(data)}</span>;
};
export default App;
