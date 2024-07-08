import { VueOptionsHook } from '@alova/vue-options';
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: VueOptionsHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
