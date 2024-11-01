import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import SolidHook from 'alova/solid';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: SolidHook,
  requestAdapter: adapterFetch(),
  responded: response => response.json()
});
