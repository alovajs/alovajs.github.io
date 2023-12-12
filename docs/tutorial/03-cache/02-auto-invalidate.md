---
title: Automatic cache invalidation
sidebar_position: 20
---

There is a scenario where when the user clicks on an item in the todo list, enters the todo details page and edits it, at this time we hope that the todo list data on the previous page will also be updated with the edited content. Usually The approach is to trigger content updates on the previous page through events, which increases maintenance costs. And `alova` provides 3 ways to achieve this goal very elegantly:

1. Use `useFetcher` to immediately re-request the latest data, which will be explained in the [Data Fetching](/tutorial/advanced/data-fetching) chapter;
2. Update the cache. This method will be explained in detail in the [Cache set and query](/tutorial/cache/set-and-query) chapter later;
3. Invalidate the response cache. When requested again, the data will be requested again due to cache invalidation. This is also what this chapter will explain.

Automatic cache invalidation is to set invalidation source rules in the target cache. As long as the rules match, the target cache can be automatically invalidated. This saves the trouble of manually clearing the cache in many cases.

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

### Match invalidating source by method name

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

### Match invalidating source by regexp of method name

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

### Combination setting validating source

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
