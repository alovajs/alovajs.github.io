---
title: react
---

通过`alova/react`支持在 react 中使用请求策略。

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';

const alovaInstance = createAlova({
  // ...
  statesHook: ReactHook
});
```

配置`statesHook`后，你可以使用所有的[客户端策略](/tutorial/client/strategy)。
