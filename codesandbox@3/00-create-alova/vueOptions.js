import { VueOptionsHook } from '@alova/vue-options';
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: VueOptionsHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});
