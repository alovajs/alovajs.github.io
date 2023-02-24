---
title: Custom Storage Adapter
sidebar_position: 30
---

Alova involves multiple functions that require data persistence, such as persistent cache, silent submission, and offline submission. **By default, alova will use `localStorage` to store persistent data**, but considering the non-browser environment, it also supports customization.

Customizing the storage adapter is also very simple, you only need to specify the functions for saving data, getting data, and removing data, roughly like this.

```javascript
const customStorageAdapter = {
  set(key, value) {
    // Save the data, value is structured data, which can be converted to a string by calling JSON.stringify
  },
  get(key) {
    // retrieve data
  },
  remove(key) {
    // remove data
  }
};
```

Then pass in this adapter when creating an `alova` instance.

```javascript
const alovaInstance = createAlova({
  //...
  storageAdapter: customStorageAdapter
});
```

## SessionStorage storage adapter example

```javascript
const sessionStorageAdapter = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return sessionStorage.getItem(key);
  },
  remove(key) {
    sessionStorage.removeItem(key);
  }
};
```
