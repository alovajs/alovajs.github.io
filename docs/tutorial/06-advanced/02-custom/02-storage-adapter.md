---
title: Storage Adapter
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

alova provides a comprehensive multi-level cache function, and the following caches are used by default

- L1 cache: both the client and the server save in the form of object key-value

- L2 cache: the client uses `localStorage` to store, and the server does not provide an L2 adapter

In certain situations, you may need to customize different storage adapters. Customizing storage adapters is also very simple. You only need to specify functions for saving data, getting data, and removing data.

<Tabs>
<TabItem value="1" label="object">

```javascript
const customStorageAdapter = {
  set(key, value) {
    // Save data, value is structured data, you can call JSON.stringify to convert it to a string
  },
  get(key) {
    // Get data, you need to return structured data, you can call JSON.parse to convert it to an object
  },
  remove(key) {
    // Remove data
  },
  clear() {
    // Clear data
  }
};
```

Use a custom adapter.

```javascript
const alovaInstance = createAlova({
  // ...
  l1Cache: customStorageAdapter, // l1 cache
  l2Cache: customStorageAdapter // l2 cache
});
```

</TabItem>
<TabItem value="2" label="class">

```ts
import { AlovaGlobalCacheAdapter } from 'alova';

class CustomStorageAdapter implements AlovaGlobalCacheAdapter {
  set(key, value) {
    // Save data, value is structured data, you can call JSON.stringify to convert it to a string
  }
  get(key) {
    // Get data, you need to return structured data, you can call JSON.parse to convert it to an object
  }
  remove(key) {
    // Remove data
  }
  clear() {
    // Clear data
  }
}
```

Use a custom adapter.

```javascript
const alovaInstance = createAlova({
  // ...
  l1Cache: new CustomStorageAdapter(), // l1 cache
  l2Cache: new CustomStorageAdapter() // l2 cache
});
```

</TabItem>
</Tabs>

> For more information about response caching, please refer to [Detailed of Cache](/next/tutorial/cache/mode).

## SessionStorage Storage Adapter Example

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
