import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import SvelteHook from 'alova/svelte';
export const alovaInstance = createAlova({
  statesHook: SvelteHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});
