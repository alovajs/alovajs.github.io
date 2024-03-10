---
title: 隐藏推荐提示
sidebar_position: 70
---

:::info 版本要求

v2.7.0-

:::

alova 可以配合扩展库获得更好的开发体验，为了让更多开发者获得更好的开发体验，在使用时将会在控制台中推荐 alova 的扩展。

![tips](/img/alova-tips.png)

这些提示代码将会在构建生产环境包时自动去除，如果你希望在开发环境隐藏它们，可以按以下方式：

## Vite

在`.env.development`文件中设置环境变量 **VITE_ALOVA_TIPS=0**

```bash title=.env.development
VITE_ALOVA_TIPS=0
```

:::warning 警告
如果信息仍然存在，请尝试将 vite 的依赖缓存删除，它在`node_modules/.vite/deps`。
:::

## Webpack

### Vue

在`.env.development`文件中设置环境变量 **VUE_APP_ALOVA_TIPS=0**

```bash title=.env.development
VUE_APP_ALOVA_TIPS=0
```

### React

在`.env.development`文件中设置环境变量 **REACT_APP_ALOVA_TIPS=0**

```bash title=.env.development
REACT_APP_ALOVA_TIPS=0
```
