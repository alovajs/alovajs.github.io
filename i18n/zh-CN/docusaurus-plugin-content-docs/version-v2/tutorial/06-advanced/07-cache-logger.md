---
title: 缓存命中日志
---

:::info 版本要求

v2.8.0+

:::

在使用接口缓存时为了便于调试，当请求命中缓存而未发出网络请求时，将默认在控制台打印出命中的缓存信息，这可以解决在使用缓存时的一些困惑。

如果你在一些情况下（例如生产环境）不希望打印缓存信息或自定义控制打印缓存信息，alova 也提供了对它们的支持。

## 关闭打印缓存命中日志

可在创建 alova 实例时将`cacheLogger`设置为`false或null`关闭控制台打印。

```javascript
const alovaInstance = createAlova({
  // ...
  cacheLogger: false
});
```

你也可以根据不同的环境动态开启与关闭。

```javascript
const alovaInstance = createAlova({
  // ...
  // 在开发环境开启缓存命中日志
  cacheLogger: process.env.NODE_ENV === 'development'
});
```

## 自定义打印缓存命中日志

缓存日志默认通过`console.log`进行打印，如果你的项目环境中不支持`console.log`或其他目的，可以将`cacheLogger`指定为一个函数自定义处理缓存命中的日志。

```javascript
const alovaInstance = createAlova({
  // ...
  /**
   * 自定义的缓存命中日志函数
   * @param response 命中的缓存数据
   * @param method 当前的method实例
   * @param cacheMode 缓存模式  memory或restore
   * @param tag restore模式下的tag，只有在对应的缓存设置了tag时有值
   */
  cacheLogger(response, method, cacheMode, tag) {
    saveHitCache({
      response,
      method,
      cacheMode,
      tag
    });
  }
});
```
