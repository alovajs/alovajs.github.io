<script>
import { alovaInstance } from './api';

let data = null;
alovaInstance
  .Get('https://jsonplaceholder.typicode.com/todos/1')
  .send()
  .then(response => {
    data = JSON.stringify(response);
  });
</script>
<div>responseData: { data }</div>