---
title: Method实例匹配器
sidebar_position: 40
---

当我们在处理完一些业务时，需要调用`invalidateCache`、`setCache`、`updateState`和`fetch`来失效缓存、更新缓存、跨页面更新状态、或重新拉取数据，一般会有两种场景：

1. 开发者知道需要操作哪个请求的数据，此时在调用上面的函数时直接传入一个`Method`实例即可；
2. 开发者只知道需要操作某个顺序位的请求，而不确定具体哪个，此时我们就可以使用`Method`实例匹配器的方式过滤出来。

`Method`实例匹配器是依据`Method`实例设置的`name`属性来过滤的，多个匹配器允许设置相同的`name`，因此首先需要为需要过滤的`Method`实例设置`name`属性。

Method 实例匹配类型如下

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

## 通过 name 属性匹配

通过传入完整的实例名称进行匹配，它的匹配结果是一个数组。

```javascript
// 每次调用getTodoList时都会生成一个新的Method实例，它们的name是相同的
const getTodoList = currentPage =>
  alova.Get('/todo/list', {
    name: 'todoList',
    params: {
      currentPage,
      pageSize: 10
    }
  });

// 以下表示让name为'todoList'的所有Method实例的缓存失效
invalidateCache('todoList');
```

## 通过正则表达式匹配

通过传入正则表达式进行匹配，Method 实例的 name 符合正则表达式的都将匹配，它的结果也是一个数组。

```javascript
// 以下表示让name为以'todo'开头的所有Method实例的缓存失效
invalidateCache(/^todo/);
```

## 更复杂的匹配方式

你也可以指定`filter`来进一步过滤不满足条件的`Method`实例，filter 函数使用与 Array.prototype.filter 相同，返回 true 表示匹配成功，返回 false 表示失败，详见上面的类型声明。

让我们来看几个例子。

```javascript
// 让name为todoList的最后一个Method实例的缓存失效
invalidateCache({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});

// 设置name为todo开头的最后一个Method实例的缓存
setCache(
  {
    name: /^todo/,
    filter: (method, index, methods) => index === methods.length - 1,

    // 如果传了alova参数，那么只匹配由此alova实例创建的Method实例，否则会在所有Method实例中匹配
    alova: alovaInst
  },
  newCache
);

// 重新拉取todo列表最后一次请求的数据
const { fetch } = useFetcher();
fetch({
  name: 'todoList',
  filter: (method, index, methods) => index === methods.length - 1
});
```

> alova 参数可进一步缩小匹配范围。

## 在不同函数中使用的区别

- invalidateCache：应用所有匹配的 Method 实例集合，即失效所有匹配的 Method 实例对应的缓存；
- setCache：应用所有匹配的 Method 实例集合，当传入静态数据时所有的 Method 实例缓存设置为相同值，传入回调函数时将循环调用此函数，并将返回值作为缓存数据；
- updateState：应用第一个匹配的 Method 实例
- fetch：应用第一个匹配的 Method 实例，即只会拉取一次数据
  `invalidateCache`会失效所有过滤出来的`Method`实例所对应的缓存，而`updateState`和`fetch`只会使用`Method`实例集合中的第一个项进行操作。
