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

After configuring `statesHook`, you can use all [client strategies](/tutorial/client/strategy). You can also use all client strategies in Vue options; please refer to [Vue options](/resource/framework/vue-options).
