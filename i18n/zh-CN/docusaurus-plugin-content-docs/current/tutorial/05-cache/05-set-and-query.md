---
title: 更新与查找缓存
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

缓存也支持更新和查找，在[缓存模式](/tutorial/cache/mode)中我们提到过，每份缓存数据是以发送请求的 method 实例作为 key 进行保存的，因此在手动更新缓存时也将使用 method 实例来查找对应的缓存数据。

## 更新缓存

### 更新静态值

使用`setCache`更新缓存数据，它的第一个参数为 method 实例，第二个为新的缓存数据，并返回一个 Promise 实例表示是否执行完毕。

```js
import { setCache } from 'alova';
await setCache(todoDetail(id), detailedData);
```

### 动态更新缓存

你也可以在`setCache`中传入一个回调函数来动态计算缓存数据，并返回需要更新的缓存数据，如果函数中返回了`undefined`则会中止缓存更新。

```javascript
await setCache(todoDetail(id), oldCache => {
  if (!oldCache.allowUpdate) {
    return; // 返回undefined中止缓存更新
  }

  // 返回需要缓存的数据
  return {
    ...oldCache,
    name: 'new name'
  };
});
```

### 更新策略

当传入的 method 设置了多级缓存时，默认会同时更新 L1 缓存和 L2 缓存，你可以通过`policy`控制单独更新指定的缓存。

```js
await setCache(todoDetail(id), detailedData, {
  /**
   * 缓存策略。
   * - l1：仅更新 l1 缓存。
   * - l2：仅更新 l2 缓存。
   * - all：更新 l1 缓存并更新 l2 缓存（方法缓存模式需要为 'restore'）。
   * @default 'all'
   */
  policy: 'l1'
});
```

## 查询缓存

通过`queryCache`方法来查询缓存数据，它接收 method 实例。

```javascript
import { queryCache } from 'alova';

const cachedData = await queryCache(getTodoListByDate('2022-10-01'));
```

你也可以通过 [method 快照匹配器](/tutorial/advanced/method-matcher) 动态查找 method 实例。

```javascript
const lastMethod = alovaInstance.snapshots.match('todoList', true);
const cachedData = lastMethod ? await queryCache(lastMethod) : undefined;
```

### 查询策略

当传入的 method 设置了多级缓存时，默认会先查询 L1 缓存，再查询 L2 缓存，你可以通过`policy`控制只查询指定的缓存。

```js
const cachedData = await queryCache(getTodoListByDate('2022-10-01'), {
  /**
   * 缓存策略。
   * - l1：仅查询 l1 缓存。
   * - l2：仅查询 l2 缓存。
   * - all：查询 l1 缓存并查询 l2 缓存（方法缓存模式需要为 'restore'）。
   * @default 'all'
   */
  policy: 'l1'
});
```
