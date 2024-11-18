---
title: solidjs
---

Support request strategies in solidjs through `alova/solid`.

```js
import { createAlova } from 'alova';
import SolidHook from 'alova/solid';

const alovaInstance = createAlova({
  // ...
  statesHook: SolidHook
});
```

After configuring `statesHook`, you can use all [client strategies](/tutorial/client/strategy).
