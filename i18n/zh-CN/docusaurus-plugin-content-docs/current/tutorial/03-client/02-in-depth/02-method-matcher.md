---
title: method匹配器
---

:::info 使用范围

全范围

:::

method 快照匹配器是一个在已请求的 method 快照列表中动态查找 method 实例的方法，每个 alova 实例都有独立的快照空间。它一般用于，开发者不确定具体使用哪个 method 时，可以使用 method 快照匹配器按一定的规则查找。

它一般与以下 5 个需要使用 method 实例的函数中使用。

1. [setCache](/tutorial/cache/set-and-query)
2. [queryCache](/tutorial/cache/set-and-query)
3. [invalidateCache](/tutorial/cache/manually-invalidate)
4. [updateState](/tutorial/client/in-depth/update-across-components)
5. [useFetcher.fetch](/tutorial/client/strategy/use-fetcher)

## 匹配规则

当使用 method 实例请求时将被作为快照保存起来，method 快照匹配器依据 method 实例设置的`name`属性在这些 method 快照中进行查找，多个匹配器允许设置相同的`name`。

## 通过 name 属性匹配

通过传入完整的实例名称进行匹配，默认返回匹配数组。

```javascript
// 每次调用getTodoList时都会生成一个新的method实例，它们的name是相同的
const getTodoList = currentPage =>
  alova.Get('/todo/list', {
    name: 'todoList'
    // ...
  });

// 匹配name为`todoList`的所有Method实例
const matchedMethods = alova.snaptshots.match('todoList');
```

## 通过正则表达式匹配

通过传入正则表达式进行匹配，method 实例的 name 符合正则表达式的都将匹配，它的结果也是一个数组。

```javascript
// 匹配name为以`todo`开头的所有Method实例
const matchedMethods = alova.snaptshots.match(/^todo/);
```

## 过滤匹配结果

通过指定`filter`来进一步过滤不满足条件的 method 实例，filter 函数使用与 Array.prototype.filter 相同，返回 true 表示匹配成功，返回 false 表示失败，详见上面的类型声明。

让我们来看几个例子。

**让特定名称的最后一个 method 实例的缓存失效**

```javascript
const matchedMethods = alova.snaptshots.match({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

## 匹配单个 method 实例

你还可以将`match`函数的第二个函数设置为`false`返回匹配结果的第一项，未匹配到时返回`undefined`。

```js
const matchedSingleMethod = alova.snaptshots.match(/^todo/, false);
```

## 限制实例快照

默认保存 1000 个 method 实例快照，否则在频繁的请求场景下可能导致内存溢出，你也可以根据需要调整限制数量。

```js
import { globalConfig } from 'alova';

const alovaInstance = createAlova({
  // ...
  // 限制保存500个实例快照
  snapshots: 500
});
```

当设置为 0 时将不再保存实例快照，此时也将无法使用 method 快照匹配器。
