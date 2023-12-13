<script>
import { alovaInstance } from './api';

let data = null;
alovaInstance
  .Get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.text())
  .then(text => {
    data = text;
  });
</script>
<div>responseData: { data }</div>