---
title: 自动失效缓存
sidebar_position: 20
---

有这样一个场景，当用户点开 todo 列表中的某一项，进入 todo 详情页并对它执行了编辑，此时我们希望上一页中的 todo 列表数据也更新为编辑后的内容，通常的做法是通过事件来触发上一页的内容更新，这样增加了维护成本。而`alova`提供了 3 种方式，可以很优雅地达到这个目的：

1. 使用`useFetcher`立即重新请求最新的数据，它将在[数据拉取](/tutorial/advanced/data-fetching)章节中讲解；
2. 更新缓存，这种方式将在后面的[缓存设置与查询](/tutorial/cache/set-and-query)章节中详细讲解；
3. 让这个响应缓存失效，当再次请求时将会因缓存失效而重新请求数据。这也是这个章节要讲解的内容。

自动失效缓存是在目标缓存中设置失效源规则，只要匹配规则都可以让目标缓存自动失效，这在很多时候省去了手动清除缓存的麻烦。

## 设置自动失效规则

设置这个规则很简单，你可以在创建一个带缓存的 Method 实例时，为它设置`hitSource`参数即可。

### 失效源设置为 method 实例

以一个固定的 method 实例作为失效源，只要此 method 实例或它的克隆实例请求成功，目标缓存将被自动清除。

```javascript
alova.Get('/todo/1', {
  // ...
  hitSource: alova.Post('/todo', {})
});
```

### 通过 method 名称匹配失效源

和 method 实例匹配器一样，你可以在 hitSource 中指定 method 的名称来匹配失效源，多个失效源可以设置为同一个名称，带有这个名称的 method 实例请求成功时，目标缓存将被自动清除。

```javascript
const methodSubmitTodo = data =>
  alova.Post('/todo', data, {
    name: 'submitTodo'
  });

alova.Get('/todo/1', {
  // ...
  // 匹配method实例名称为submitTodo的失效源
  hitSource: 'submitTodo'
});
```

### 通过 method 名称正则表达式匹配失效源

如果 method 实例名称不固定时，你可以在 hitSource 中指定一个正则表达式来匹配 method 名称，被匹配的 method 实例在请求成功时，目标缓存将被自动清除。

```javascript
const methodSubmitTodo = data =>
  alova.Post('/todo', data, {
    name: 'prefix-submitTodo'
  });

alova.Get('/todo/1', {
  // ...
  // 匹配method实例名称为prefix开头的所有实例
  hitSource: /^prefix/
});
```

### 组合设置失效源

如果你希望使用以上的多种规则匹配失效源，可以将 hitSource 指定为一个数组，数组项为以上 3 种规则的任意一种，满足数组任意一项规则的 method 实例将被匹配。

```javascript
alova.Get('/todo/1', {
  // ...
  // 满足数组中任意一项匹配规则的method实例请求成功时，此缓存将失效
  hitSource: [alova.Post('/todo', {}), 'submitTodo', /^prefix/]
});
```

## hitSource 数据类型

```typescript
type hitSource = string | RegExp | Method | (string | RegExp | Method)[];
```
