---
title: 受控的缓存
sidebar_position: 60
---

:::info 版本要求

v2.1.0+

:::

在发送一个请求时，默认会先检查是否存在匹配的缓存数据，匹配到则会使用它作为响应数据进行返回，如果在一些场景下，用户需要使用自定义的缓存就必须先使用`setCache`同步设置缓存数据才能行得通，无疑加大了用户的负担，这是一种不受控的缓存。

如果你想要在不受控的缓存下使用**IndexedDB**自定义管理缓存数据，你可能会先为即将发送的请求预先设置命中的缓存，像这样：

```javascript
const getFile = fileName => {
  const fileGetter = alovaInstance.GET(`/file/${fileName}`);
  const tx = db.transaction(['files']);
  const getRequest = tx.objectStore('files').get(fileName);
  getRequest.onsuccess = ({ result }) => {
    setCache(fileGetter, result);
  };
  return fileGetter;
};
```

**❌ 但并不推荐以上的写法**，原因如下：

1. 每次调用`getFile`都会设置一次缓存，但 fileGetter 不一定用于发送请求；
2. IndexedDB 是异步接口，如果匹配缓存的步骤发生在 IndexedDB 触发 onsuccess 之前，那么就不会匹配到缓存数据，它们的顺序是不可预知的；
3. 自定义的缓存管理任务和 method 是分开的，但实际上它们应该聚合在一起；

在这种情况下，你可以使用受控的缓存来解决上面的问题，使用受控缓存也很简单，可以在 method 中的 localCache 设置为异步或同步函数，在这个函数中返回自定义数据作为命中的缓存数据进行返回。

```javascript
const getFile = fileName =>
  alovaInstance.GET(`/file/${fileName}`, {
    // 受控缓存函数支持异步和同步函数
    localCache() {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(['files']);
        const getRequest = tx.objectStore('files').get(fileName);
        getRequest.onsuccess = resolve;
        getRequest.onerror = reject;
      });
    }
  });
```

## 不使用缓存

如果你希望继续发送请求，可以在`localCache`中返回 `undefined` 或不返回任何数据，这在自定义管理缓存时未命中缓存的情况下很有用。

## 使用 transformData 设置缓存

由于 `transformData` 函数具有以下两个特性：

- 只有在响应时才被触发，而命中响应缓存时不会触发；
- 支持异步函数；

因此，你还可以配合它保存自定义的缓存，例如以文件为响应数据的缓存场景下，可以配合 IndexedDB 进行文件数据的缓存。

```javascript
const fileGetter = alovaInstance.Get('/file/file_name', {
  // 使用IndexedDB缓存文件
  async transformData(fileBlob) {
    await new Promise((resolve, reject) => {
      const tx = db.transaction(['files'], 'readwrite');
      const putRequest = tx.objectStore('files').put({
        file: fileBlob
      });
      putRequest.onsuccess = resolve;
      putRequest.onerror = reject;
    });
    return fileBlob;
  }
});
```

## 注意事项

在 usehooks 中使用时，在`localCache`函数中抛出错误将会触发`onError`，使用 method 实例直接发起请求时，将会返回一个 reject 状态的 promise 实例。

## 🎉 已完成基础使用

恭喜你！至此，你已完成了 alova 的基础使用，可以满足日常的项目实践。你可以选择接下来的学习内容。

import NavCard from '@site/src/components/NavCard';

<NavCard list={[
{
title: '进阶教程',
desc: '更深入地使用 alova，可以帮你快速解决更多棘手问题',
link: '/category/advanced'
},
{
title: '请求策略模块',
desc: '学习如何使用 alova 的请求策略模块，让你轻松应对各种请求场景',
link: '/category/strategy'
},
{
title: '最佳实践',
desc: '经过实践总结出的 alova 使用技巧',
link: '/category/best-practice'
}
]}></NavCard>
