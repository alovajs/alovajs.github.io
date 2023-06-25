---
title: 自动失效缓存
sidebar_position: 50
---

## 主动失效缓存的使用场景

通常我们会使用`invalidateCache`手动失效缓存，即在进行某项操作后调用它来失效缓存，这其实是一种从失效源追溯目标缓存的途径，它更适用于目标缓存失效来源是单一的情况。

例如，当点击一条列表项，进入编辑页并提交修改这条数据时，需要将这条数据的详情缓存数据进行清除，这个例子中，提交修改操作就是失效源，详情缓存数据就是目标缓存，这条数据的详情缓存只会在提交修改时失效，没有其他失效源需要再让它失效，此时使用`invalidateCache`手动清除详情缓存将更方便。

## 自动失效缓存的使用场景

当一个目标缓存存在多个失效源时，如果我们仍然使用`invalidateCache`的话，就需要在多个失效源中调用它失效同一个目标缓存，这不仅繁琐且增加了可维护成本，此时我们可以统一在目标缓存中统一设置失效源规则，只要匹配规则都可以让目标缓存自动失效。它其实是主动失效缓存的另一个维度。

![](https://user-images.githubusercontent.com/29848971/218662359-d7b999ba-2203-40e0-8152-f4159a6fb8e3.png)

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
