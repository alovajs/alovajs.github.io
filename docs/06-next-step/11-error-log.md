---
title: Error log
sidebar_position: 110
---

:::info Tips

v2.6.0+

:::

For the convenience of debugging, when using use hooks to request or respond to an error, the error log will be printed on the console by default. If you do not want to print an error message or customize the control to print an error message in some cases (such as a production environment), alova also Support for them is provided.

## Disable error log

Log printing can be turned off by setting `errorLogger` to `false or null` when creating an alova instance.

```javascript
const alovaInstance = createAlova({
  //...
  errorLogger: false
});
```

## Custom print error log

The error log is printed by `console.error` by default. If `console.error` is not supported in your project environment, or if you want to collect error information, you can specify `errorLogger` as a function to customize error log.

```javascript
const alovaInstance = createAlova({
  //...
  // error is the error instance, methodInstance is the method instance corresponding to the error
  errorLogger(error, methodInstance) {
    reportError(`${methodInstance.url}: ${error.message}`);
  }
});
```
