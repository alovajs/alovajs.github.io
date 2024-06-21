---
title: svelte
---

通过`alova/svelte`支持在 svelte 中使用请求策略。

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';

const alovaInstance = createAlova({
  // ...
  statesHook: SvelteHook
});
```
