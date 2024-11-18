---
title: svelte
---

Support request strategies in svelte through `alova/svelte`.

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';

const alovaInstance = createAlova({
  // ...
  statesHook: SvelteHook
});
```

After configuring `statesHook`, you can use all [client strategies](/tutorial/client/strategy).
