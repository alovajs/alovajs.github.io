---
title: Taro适配器
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-taro --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-taro
```

</TabItem>
</Tabs>

```javascript
import { createAlova } from 'alova';
import AdapterTaro from '@alova/adapter-taro';

// 默认情况下，将会使用ReactHook
const alovaInstance = createAlova(
  baseURL: 'https://api.alovajs.org',
  ...AdapterTaro()
);
```

## 暂未发布，敬请期待...
