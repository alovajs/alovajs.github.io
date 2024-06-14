---
title: Alova Instance
sidebar_position: 40
---

Alova instances can not only create method instances of different types, but also set global parameters. The created method instances will inherit the parameters of this alova instance. When the parameters of the alova instance are set to the same parameters as the method instance, such as `timeout`, `shareRequest`, etc., the parameters of the method instance will be used first.

Next we look at the global parameters of alova.

## baseURL

After setting the baseURL, you no longer need to add the same url prefix for every request.

```javascript
const alovaInstance = createAlova({
  baseURL: 'https://api.alovajs.dev'
  // ...
});
```

At this point, you only need to specify pathname when creating a method instance.

```javascript
alovaInstance.Get('/todo/list');
```

## Global timeout

The following is to set the global request timeout.

```javascript
// Set request timeout globally
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // Request timeout, unit is milliseconds, default is 0, which means it will never timeout
  timeout: 50000
  // highlight-end
});
```

## Global sharing request

Set sharing requests globally.

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  shareRequest: false
  // highlight-end
});
```

## Request adapter

In the previous chapter we have configured the `alova/fetch` request adapter, which will be used to send requests initiated by this alova instance. In fact, we also provide various request adapters for different JS environments.

- [Mock request adapter](/tutorial/request-adapter/alova-mock)
- [XMLHttpRequest Adapter](/tutorial/request-adapter/alova-adapter-xhr)
- [axios adapter](/tutorial/request-adapter/alova-adapter-axios)
- [uniapp adapter](/tutorial/request-adapter/alova-adapter-uniapp)
- [taro adapter](/tutorial/request-adapter/alova-adapter-taro)

## Global response cache

You can also set the response cache globally:

```ts
const alovaInstance = createAlova({
  // ...
  cacheFor: {
    GET: 0, // Close all GET caches
    POST: 60 * 60 * 1000 // Set all POST caches for 1 hour
  }
});
```

For more details, please refer to [Response Cache](/tutorial/cache/mode)
