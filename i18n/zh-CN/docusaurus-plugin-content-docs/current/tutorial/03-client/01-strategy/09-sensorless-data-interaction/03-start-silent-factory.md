---
title: 启动静默工厂
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

静默队列默认不启动，需要我们指定启动参数进行初始化，一般情况下，在入口文件中调用`bootSilentFactory`来初始化静默工厂，它将通过指定的配置项来读取还未执行的请求到对应的静默队列中并启动这些队列。

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```javascript
import { bootSilentFactory } from 'alova/client';
import { alovaInst } from '@/api';

bootSilentFactory({
  // 启动时指定 alova 实例，用于请求信息存储、请求发送
  alova: alovaInst,

  // 延迟启动的时间，单位毫秒，默认为2000ms，具体描述看后续说明
  delay: 1000
});
```

</TabItem>

<TabItem value="2" label="react">

```javascript
import { bootSilentFactory } from 'alova/client';
import { alovaInst } from '@/api';

bootSilentFactory({
  // 启动时指定 alova 实例，用于请求信息存储、请求发送
  alova: alovaInst,

  // 延迟启动的时间，单位毫秒，默认为2000ms，具体描述看后续说明
  delay: 1000
});
```

</TabItem>

<TabItem value="3" label="svelte">

```javascript
import { bootSilentFactory } from 'alova/client';
import { alovaInst } from '@/api';

bootSilentFactory({
  // 启动时指定 alova 实例，用于请求信息存储、请求发送
  alova: alovaInst,

  // 延迟启动的时间，单位毫秒，默认为2000ms，具体描述看后续说明
  delay: 1000
});
```

</TabItem>
</Tabs>

:::warning `delay`参数说明

在实际场景下，进入当前页面时也会发送请求加载页面数据，为了保证用户可以更快地看到页面数据，需要将加载数据的请求前置到队列起始位置，否则可能会造成加载数据的请求后置到队列尾部，此时就需要等到前面的所有请求完成才会加载页面数据，这显然是不合适的，因此通过延迟一段时间初始化来让加载数据的请求先进入队列，达到“插队”的效果，具体的延迟时间需要根据页面渲染所需的时间而定。

:::
