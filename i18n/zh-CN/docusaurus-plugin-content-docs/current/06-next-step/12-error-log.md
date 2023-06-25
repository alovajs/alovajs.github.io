---
title: 错误日志
sidebar_position: 110
---

:::info 版本要求

v2.6.0+

:::

为了方便调试，当在使用 use hooks 请求或响应处理错误时会默认在控制台打印错误日志，如果你在一些情况下（例如生产环境）不希望打印错误信息或自定义控制打印错误信息，alova 也提供了对它们的支持。

## 关闭打印错误日志

可在创建 alova 实例时将`errorLogger`设置为`false或null`关闭日志打印。

```javascript
const alovaInstance = createAlova({
  // ...
  errorLogger: false
});
```

## 自定义打印错误日志

错误日志默认通过`console.error`进行打印，如果你的项目环境中不支持`console.error`，或者希望收集错误信息，可以将`errorLogger`指定为一个函数自定义处理错误日志。

```javascript
const alovaInstance = createAlova({
  // ...
  // error为错误对象，methodInstance为错误出现对应的method实例
  errorLogger(error, methodInstance) {
    reportError(`${methodInstance.url}: ${error.message}`);
  }
});
```
