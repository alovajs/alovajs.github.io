---
title: solidjs
---

通过`alova/solid`支持在 solid 中使用请求策略。

```js
import { createAlova } from 'alova';
import SolidHook from 'alova/solid';

const alovaInstance = createAlova({
  // ...
  statesHook: SolidHook
});
```

配置`statesHook`后，你可以使用所有的[客户端策略](/tutorial/client/strategy)。
