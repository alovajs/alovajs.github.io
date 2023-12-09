import { useEffect, useState } from 'react';
import { alovaInstance } from './api';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    alovaInstance
      .Get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.text())
      .then(text => {
        setData(text);
      });
  }, []);

  return <span>responseData: {data}</span>;
};
export default App;
