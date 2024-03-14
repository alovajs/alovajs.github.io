import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';

const alovaInstance = createAlova({
  requestAdapter: GlobalFetch()
});
alovaInstance
  .Post('https://jsonplaceholder.typicode.com/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1
  })
  .then(response => response.text())
  .then(data => {
    app.innerHTML = data;
  });
