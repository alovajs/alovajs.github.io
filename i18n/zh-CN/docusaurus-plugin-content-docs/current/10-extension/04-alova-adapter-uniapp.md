---
title: Uniapp适配器
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-uniapp --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-uniapp
```

</TabItem>
</Tabs>

```javascript
import { createAlova } from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';

const alovaInstance = createAlova(
  AdapterUniapp({
    baseURL: 'https://api.alovajs.org'
  })
);
```
