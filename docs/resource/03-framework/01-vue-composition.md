---
title: vue composition
---

Support request strategies in vue composition through `alova/vue`.

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';

const alovaInstance = createAlova({
  // ...
  statesHook: VueHook
});
```

If you use composition syntax in vue2, please use `alova/vue-demi`.

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue-demi';

const alovaInstance = createAlova({
  // ...
  statesHook: VueHook
});
```

After configuring `statesHook`, you can use all [client strategies](/tutorial/client/strategy). You can also use all client strategies in vue options, please refer to [vue options](/resource/framework/vue-options).
