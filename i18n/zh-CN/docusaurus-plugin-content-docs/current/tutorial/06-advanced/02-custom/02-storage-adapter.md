---
title: 存储适配器
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

alova 提供了完善的多级缓存功能，默认情况下使用以下缓存

- L1 缓存：客户端和服务端都以 object 的 key-value 形式保存
- L2 缓存：客户端使用`localStorage`来存储，服务端不提供 L2 适配器

在特定情况，你可能需要自定义不同的存储适配器，自定义存储适配器也非常简单，你只需要指定保存数据、获取数据，以及移除数据的函数。

<Tabs>
<TabItem value="1" label="object">

```javascript
const customStorageAdapter = {
  set(key, value) {
    // 保存数据，value为结构化数据，可调用JSON.stringify转换为字符串
  },
  get(key) {
    // 获取数据，需要返回结构化数据，可调用JSON.parse转换为对象
  },
  remove(key) {
    // 移除数据
  },
  clear() {
    // 清空数据
  }
};
```

使用自定义适配器。

```javascript
const alovaInstance = createAlova({
  // ...
  l1Cache: customStorageAdapter, // l1缓存
  l2Cache: customStorageAdapter // l2缓存
});
```

</TabItem>
<TabItem value="2" label="class">

```ts
import { AlovaGlobalCacheAdapter } from 'alova';

class CustomStorageAdapter implements AlovaGlobalCacheAdapter {
  set(key, value) {
    // 保存数据，value为结构化数据，可调用JSON.stringify转换为字符串
  }
  get(key) {
    // 获取数据，需要返回结构化数据，可调用JSON.parse转换为对象
  }
  remove(key) {
    // 移除数据
  }
  clear() {
    // 清空数据
  }
}
```

使用自定义适配器。

```javascript
const alovaInstance = createAlova({
  // ...
  l1Cache: new CustomStorageAdapter(), // l1缓存
  l2Cache: new CustomStorageAdapter() // l2缓存
});
```

</TabItem>
</Tabs>

> 了解更多响应缓存相关内容请参考[缓存详解](/next/tutorial/cache/mode)。

## SessionStorage 存储适配器示例

```javascript
const sessionStorageAdapter = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : data;
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  }
};
```
