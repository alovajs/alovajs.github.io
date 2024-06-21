import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

const alovaInstance = createAlova({
  requestAdapter: GlobalFetch()
});
alovaInstance
  .Get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.text())
  .then(data => {
    app.innerHTML = data;
  });
