---
title: react
---

Support request strategies in react through `alova/react`.

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';

const alovaInstance = createAlova({
  // ...
  statesHook: ReactHook
});
```

After configuring `statesHook`, you can use all [client strategies](/tutorial/client/strategy).
