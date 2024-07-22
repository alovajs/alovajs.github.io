---
title: Combine Framework
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Next, we'll learn how to use it with UI frameworks, which allows alova to unleash its true power.

In [RSM](/tutorial/others/RSM), the request timing describes when the request should be sent. When used in the UI framework, it not only allows alova to automatically manage the responsive request status, but also automatically manages it through certain rules. Control when requests should be sent.

`alova` provides three core useHook implementation request timings: `useRequest`, `useWatcher`, and `useFetcher`. They control when requests should be issued, and at the same time they will create and maintain the responsive status of the request for us, such as` loading/data/error`, etc., you can use these reactive states directly in the view, and when they change, the view will also change accordingly.

## Set statesHook

Before using them, we need to set the corresponding statesHook on the alova instance. It must correspond to the UI framework used by the project. This is very important. It will tell alova that it should create responsive states corresponding to the UI framework. Currently, the following frameworks are supported:

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```js
import { createAlova } from 'alova';
import VueHook from 'alova/vue';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: VueHook
  // highlight-end
});
```

</TabItem>
<TabItem value="2" label="react">

```js
import { createAlova } from 'alova';
import ReactHook from 'alova/react';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: ReactHook
  // highlight-end
});
```

</TabItem>
<TabItem value="3" label="svelte">

```js
import { createAlova } from 'alova';
import SvelteHook from 'alova/svelte';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: SvelteHook
  // highlight-end
});
```

</TabItem>
<TabItem value="4" label="vue options">

When used in vue options style, additional installation of the `@alova/vue-options` package is required.

```js
import { createAlova } from 'alova';
import { VueOptionsHook } from '@alova/vue-options';

export const alovaInstance = createAlova({
  // ...
  // highlight-start
  statesHook: VueOptionsHook
  // highlight-end
});
```

</TabItem>
</Tabs>

If you wish to use alova outside of these UI frameworks, you can also implement a [custom statesHook](/tutorial/custom/custom-stateshook).

What are you waiting for? Let’s continue to understand the core useHook!
