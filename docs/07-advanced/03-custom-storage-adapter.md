---
title: Custom Storage Adapter
sidebar_position: 30
---

Alova involves multiple functions that require data persistence, such as persistent caching, silent commit, and offline commit. **By default, alova will use `localStorage` to store persistent data**, but considering the non-browser environment, it also supports customization.

Custom storage adapters are also very simple, you only need to specify functions to save data, get data, and remove data, roughly like this.

```javascript
const customStorageAdapter = {
  setItem(key, value) {
    // save data
  },
  getItem(key) {
    // retrieve data
  },
  removeItem(key) {
    // remove data
  }
};
```

Then pass in this adapter when creating an `alova` instance.

```javascript
const alovaInstance = createAlova({
  // ...
  storageAdapter: customStorageAdapter
});
```
