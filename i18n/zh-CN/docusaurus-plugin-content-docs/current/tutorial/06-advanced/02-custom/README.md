---
title: 概览
---

alova 具有很高的扩展性，它除了提供核心的缓存机制、请求共享机制以及状态管理等通用特性外，还提供了各类定制功能以及中间件机制，可以适配不同 js 环境，以及自定义请求策略，在接下来的章节中，我们将会详细介绍。

## 自定义适配器

为了满足 js 在不同环境下的运行需求，你可以自定义请求适配器、存储适配器，甚至是 UI 框架的状态适配器，在接下来的章节中也会详细介绍。以下列出了一些适配器示例。

- [fetch 适配器](https://github.com/alovajs/alova/blob/main/packages/alova/src/predefine/adapterFetch.ts)
- [localStorage 存储适配器](https://github.com/alovajs/alova/blob/main/packages/alova/src/defaults/cacheAdapter.ts)
- [vue states hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/vue.ts)

你也可以将多个类型的适配器组成一个集合，例如[Uniapp 适配器](/resource/request-adapter/uniapp)。

## 自定义客户端策略

alova 提供了 10+个自定义的客户端策略模块，但有时候可能你需要编写自己的策略模块，通常情况下，一个自定义的请求策略是基于`useRequest`、`useWatcher` 和 `useFetcher` 三个核心 useHook 的组合，以及为它们编写[中间件](/tutorial/client/in-depth/middleware)、缓存的操纵函数来控制它们的请求方式，从而实现各种效果的请求策略

以下的策略模块具有很好的代表性，强烈建议你参考源码寻找灵感。

- [usePagination 源码](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/pagination/usePagination.ts)
- [useCaptcha 源码](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/useCaptcha.ts)
- [useForm 源码](https://github.com/alovajs/alova/blob/main/packages/client/src/hooks/useForm.ts)

## 自定义服务端策略

服务端的策略模块是一个简单的函数，以下是一个请求重试的`Server hook`。

- [请求重试](https://github.com/alovajs/alova/blob/main/packages/server/src/hooks/retry.ts)
