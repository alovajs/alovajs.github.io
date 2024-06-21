---
title: vue composition
---

通过`alova/vue`支持在 vue composition 使用请求策略。

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';

const alovaInstance = createAlova({
  // ...
  statesHook: VueHook
});
```

如果在 vue2 中使用 composition 语法，请使用`alova/vue-demi`。

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue-demi';

const alovaInstance = createAlova({
  // ...
  statesHook: VueHook
});
```
