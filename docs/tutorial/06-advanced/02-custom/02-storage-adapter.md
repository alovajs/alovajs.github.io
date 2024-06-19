---
title: Storage Adapter
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

alova involves multiple features that require data persistence, such as persistent caching, silent submission, and offline submission. **By default, alova uses `localStorage` to store persistent data**, but considering the non-browser environment, it also supports customization.

Customizing the storage adapter is also very simple. You only need to specify the functions for saving data, getting data, and removing data, which is roughly like this.

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
  storageAdapter: customStorageAdapter
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
  storageAdapter: new CustomStorageAdapter()
});
```

</TabItem>
</Tabs>

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
  }
};
```
