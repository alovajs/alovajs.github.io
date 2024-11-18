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

配置`statesHook`后，你可以使用所有的[客户端策略](/tutorial/client/strategy)。你还可以在 vue options 中使用所有的客户端策略，请参考[vue options](/resource/framework/vue-options)。
