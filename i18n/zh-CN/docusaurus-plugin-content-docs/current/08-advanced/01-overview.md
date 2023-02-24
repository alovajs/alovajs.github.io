---
title: 高级概览
sidebar_position: 10
---

alova 很灵活，它除了提供核心的缓存策略、请求共享策略，以及状态管理等通用特性外，还提供了各类定制功能以及中间件机制，可以适配不同 js 环境，以及自定义请求策略。

## 适配器

为了满足 js 在不同环境下的运行需求，你可以自定义请求适配器、存储适配器，甚至是 mvvm 框架的状态适配器。以下列出了一些适配器示例。

- [模拟数据适配器](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)
- [localStorage 存储适配器](https://github.com/alovajs/alova/blob/main/src/predefine/globalLocalStorage.ts)

## 编写请求策略

alova 的请求策略和 alova 核心库是分开的，目的是为了开发者们也可以利用 alova 的灵活性来编写自己的请求策略。通常情况下，一个自定义的请求策略是基于`useRequest`、`useWatcher` 和 `useFetcher` 三者的组合，以及为它们编写[中间件](/advanced/middleware)，缓存的操纵函数来控制它们的请求方式，从而实现各种效果的请求策略。

**@alova/scene** 中的请求策略具有很好的代表性，强烈建议你参考源码寻找灵感。

- [分页请求策略源码](https://github.com/alovajs/scene/blob/main/src/hooks/pagination/usePagination_unified.js)
- [静默请求策略源码](https://github.com/alovajs/scene/blob/main/src/hooks/silent/useSQRequest.ts)
