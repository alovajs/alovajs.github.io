import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import ReactHook from 'alova/react';
export const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: ReactHook,
  requestAdapter: GlobalFetch(),
  responded: response => response.json()
});
