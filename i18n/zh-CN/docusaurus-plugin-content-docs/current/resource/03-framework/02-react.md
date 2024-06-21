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
