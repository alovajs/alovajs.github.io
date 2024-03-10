---
title: Hide recommend Tips
sidebar_position: 70
---

:::info version required

v2.7.0-

:::

Alova can cooperate with the extension library to obtain a better development experience. In order to allow more developers to obtain a better development experience, the extension of alova will be recommended in the console when using it.

![tips](/img/alova-tips.png)

These prompt codes will be automatically removed when building the production environment package. If you want to hide them in the development environment, you can do the following:

## Vite

Set environment variable **VITE_ALOVA_TIPS=0** in `.env.development` file

```bash title=.env.development
VITE_ALOVA_TIPS=0
```

:::warning Warning
If info still exists. you can try to remove the deps cache of vite, which at the dir `node_modules/.vite/deps`.
:::

## Webpack

### Vue

Set environment variable **VUE_APP_ALOVA_TIPS=0** in `.env.development` file

```bash title=.env.development
VUE_APP_ALOVA_TIPS=0
```

### React

Set environment variable **REACT_APP_ALOVA_TIPS=0** in `.env.development` file

```bash title=.env.development
REACT_APP_ALOVA_TIPS=0
```
