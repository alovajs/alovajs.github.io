import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: SvelteHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});
