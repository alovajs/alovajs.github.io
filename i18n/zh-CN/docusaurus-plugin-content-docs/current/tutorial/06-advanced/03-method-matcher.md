---
title: method匹配器
sidebar_position: 30
---

method 匹配器是一个在已请求的 method 快照列表中动态查找 method 实例的方法。它一般用于，开发者不确定具体使用哪个 method 时，可以使用 method 匹配器按一定的规则查找。

## 匹配规则

当使用 method 实例请求时，它将被作为快照保存起来，method 匹配器依据 method 实例设置的`name`属性在这些 method 快照中进行查找，多个匹配器允许设置相同的`name`。

method 实例匹配类型如下：

```typescript
type MethodFilter =
  | string
  | RegExp
  | {
      name: string | RegExp;
      filter: (method: Method, index: number, methods: Method[]) => boolean;

      // 可选参数，如果传入alova对象则只匹配此alova所创建的Method实例，否则匹配所有alova实例的Method实例
      alova?: Alova;
    };
```

在以下函数中都可以使用 method 实例匹配器。

- [setCache](/tutorial/cache/set-and-query)
- [queryCache](/tutorial/cache/set-and-query)
- [invalidateCache](/tutorial/cache/manually-invalidate)
- [updateState](/tutorial/advanced/update-across-components)
- [useFetcher.fetch](/tutorial/advanced/use-fetcher)

## 通过 name 属性匹配

通过传入完整的实例名称进行匹配，它的匹配结果是一个数组。

```javascript
// 每次调用getTodoList时都会生成一个新的method实例，它们的name是相同的
const getTodoList = currentPage =>
  alova.Get('/todo/list', {
    // highlight-start
    name: 'todoList'
    // highlight-end
    // ...
  });

// 以下表示让name为'todoList'的所有Method实例的缓存失效
invalidateCache('todoList');
```

## 通过正则表达式匹配

通过传入正则表达式进行匹配，method 实例的 name 符合正则表达式的都将匹配，它的结果也是一个数组。

```javascript
// 以下表示让name为以'todo'开头的所有Method实例的缓存失效
invalidateCache(/^todo/);
```

## 过滤匹配结果

通过指定`filter`来进一步过滤不满足条件的 method 实例，filter 函数使用与 Array.prototype.filter 相同，返回 true 表示匹配成功，返回 false 表示失败，详见上面的类型声明。

让我们来看几个例子。

**让特定名称的最后一个 method 实例的缓存失效**

```javascript
invalidateCache({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

**设置由`alovaInst`创建的，特定名称的最后一个 method 实例的缓存**

```javascript
setCache(
  {
    name: /^todo/,
    filter: (method, index, methods) => index === methods.length - 1,

    // 如果传了alova参数，那么只匹配由此alova实例创建的Method实例，否则会在所有Method实例中匹配
    alova: alovaInst
  },
  newCache
);
```

**重新拉取 todo 列表最后一次请求的数据**

```javascript
const { fetch } = useFetcher();
fetch({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

> alova 参数可以进一步缩小匹配范围。

## 在不同函数中使用的区别

### invalidateCache

应用所有匹配的 Method 实例集合，即失效所有匹配的 Method 实例对应的缓存。

### setCache

应用所有匹配的 Method 实例集合，当传入静态数据时所有的 Method 实例缓存设置为相同值，传入回调函数时将循环调用此函数，并将返回值作为缓存数据。

### updateState

应用第一个匹配的 Method 实例。

### fetch

应用第一个匹配的 Method 实例，即只会拉取一次数据。
