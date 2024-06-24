---
title: 开发React-Native应用
---

你同样可以使用 alova 开发 React-Native 应用，甚至可以直接使用 GlobalFetch 请求适配器来作为请求事件处理。

但是有以下的注意事项：

## metro 版本

在 alova 中的`package.json`中使用了`exports`来定义多个导出项，因此需要确保这两点：

1. metro 版本高于 0.76.0
2. 在`metro.config.js`中开启`resolver.unstable_enablePackageExports`。[详情点此查看](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)
