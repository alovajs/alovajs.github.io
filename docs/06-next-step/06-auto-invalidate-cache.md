---
title: Automatic cache invalidation
sidebar_position: 50
---

## Active invalidation cache usage scenarios

Usually we use `invalidateCache` to manually invalidate the cache, that is, call it to invalidate the cache after an operation is performed. This is actually a way to trace the target cache from the invalidation source, and it is more suitable for the case where the source of the target cache invalidation is single. .

For example, when clicking on a list item, entering the edit page and submitting to modify this data, the detail cache data of this data needs to be cleared. In this example, the submit modification operation is the invalidation source, and the detail cache data is the target cache. The details cache of a piece of data will only be invalidated when the modification is submitted, and there is no other source of failure to invalidate it. At this time, it will be more convenient to use `invalidateCache` to manually clear the details cache.

## Usage scenarios of automatic invalidation cache

When there are multiple invalidation sources in a target cache, if we still use `invalidateCache`, we need to call it in multiple invalidation sources to invalidate the same target cache, which is not only cumbersome but also increases maintainability costs, at this time we can Uniformly set invalidation source rules in the target cache, as long as the rules match, the target cache can be automatically invalidated. It is actually another dimension of active cache invalidation.

![](https://user-images.githubusercontent.com/29848971/218662359-d7b999ba-2203-40e0-8152-f4159a6fb8e3.png)

## Set automatic invalidation rules

Setting this rule is very simple, you can set the `hitSource` parameter for it when creating a Method instance with caching.

### Invalidation source is set to method instance

With a fixed method instance as the invalidation source, as long as the method instance or its clone instance succeeds, the target cache will be cleared automatically.

```javascript
alova.Get('/todo/1', {
  //...
  hitSource: alova.Post('/todo', {})
});
```

### Match failure sources by method name

Like the method instance matcher, you can specify the name of the method in hitSource to match the failure source. Multiple failure sources can be set to the same name. When the method instance request with this name succeeds, the target cache will be automatically cleared.

```javascript
const methodSubmitTodo = data =>
  alova.Post('/todo', data, {
    name: 'submitTodo'
  });

alova.Get('/todo/1', {
  //...
  // Match the failure source whose method instance name is submitTodo
  hitSource: 'submitTodo'
});
```

### Match failure source by method name regular expression

If the method instance name is not fixed, you can specify a regular expression in hitSource to match the method name, and the target cache will be automatically cleared when the matched method instance succeeds in the request.

```javascript
const methodSubmitTodo = data =>
  alova.Post('/todo', data, {
    name: 'prefix-submitTodo'
  });

alova.Get('/todo/1', {
  //...
  // Match all instances whose method instance name starts with prefix
  hitSource: /^prefix/
});
```

### Combination setting failure source

If you want to use the above multiple rules to match failure sources, you can specify hitSource as an array, and the array item is any one of the above three rules, and the method instance that meets any one of the rules in the array will be matched.

```javascript
alova.Get('/todo/1', {
  //...
  // When the method instance request that satisfies any matching rule in the array succeeds, the cache will be invalidated
  hitSource: [alova.Post('/todo', {}), 'submitTodo', /^prefix/]
});
```

## hitSource data type

```typescript
type hitSource = string | RegExp | Method | (string | RegExp | Method)[];
```
