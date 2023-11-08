---
title: Boot silent factory
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

We put all scene request strategies in the js package called `@alova/scene-*`, you need to install it before using it.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```bash
# npm
npm install @alova/scene-vue --save
#yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
#yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
#yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

The silent queue is not started by default, and we need to specify the startup parameters for initialization. In general, call `bootSilentFactory` in the entry file to initialize the silent factory, which will read unexecuted requests to the corresponding silent through the specified configuration items queues and start those queues.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```javascript
import { bootSilentFactory } from '@alova/scene-vue';
import { alovaInst } from '@/api';

bootSilentFactory({
  // Specify the alova instance at startup to request information storage and request sending
  alova: alovaInst,

  // Delay start time, in milliseconds, the default is 2000ms, see the follow-up instructions for details
  delay: 1000
});
```

</TabItem>

<TabItem value="2" label="react">

```javascript
import { bootSilentFactory } from '@alova/scene-react';
import { alovaInst } from '@/api';

bootSilentFactory({
  // Specify the alova instance at startup to request information storage and request sending
  alova: alovaInst,

  // Delay start time, in milliseconds, the default is 2000ms, see the follow-up instructions for details
  delay: 1000
});
```

</TabItem>

<TabItem value="3" label="svelte">

```javascript
import { bootSilentFactory } from '@alova/scene-svelte';
import { alovaInst } from '@/api';

bootSilentFactory({
  // Specify the alova instance at startup to request information storage and request sending
  alova: alovaInst,

  // Delay start time, in milliseconds, the default is 2000ms, see the follow-up instructions for details
  delay: 1000
});
```

</TabItem>
</Tabs>

:::warning `delay` parameter description

In actual scenarios, when entering the current page, a request is also sent to load the page data. In order to ensure that the user can see the page data faster, the request to load the data needs to be forwarded to the beginning of the queue, otherwise it may cause the loading data to fail. The request is placed at the end of the queue. At this time, it is necessary to wait until all the previous requests are completed before loading the page data. This is obviously inappropriate. Therefore, by delaying initialization for a period of time, the request for loading data enters the queue first to achieve "queue jumping" effect, the specific delay time depends on the time required for page rendering.

:::
