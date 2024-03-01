---
title: 自定义存储适配器
sidebar_position: 30
---

alova 中涉及多个需要数据持久化的功能，如持久化缓存、静默提交和离线提交。**在默认情况下，alova 会使用`localStorage`来存储持久化数据**，但考虑到非浏览器环境下，因此也支持了自定义。

自定义存储适配器同样非常简单，你只需要指定保存数据、获取数据，以及移除数据的函数即可，大致是这样的。

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
  }
};
```

然后在创建`alova`实例时传入这个适配器即可。

```javascript
const alovaInstance = createAlova({
  // ...
  storageAdapter: customStorageAdapter
});
```

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
  }
};
```
