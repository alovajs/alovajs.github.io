---
title: 概述
sidebar_position: 10
---

<img width="350px" src={require('/img/logo-text.png').default} />

[![npm](https://img.shields.io/npm/v/alova)](https://www.npmjs.com/package/alova)
[![build](https://github.com/alovajs/alova/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/alovajs/alova/actions/workflows/release.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/alova/badge.svg?branch=main)](https://coveralls.io/github/alovajs/alova?branch=main)
[![minzipped size](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## alova 是什么

轻量级的请求策略库，它针对不同请求场景分别提供了具有针对性的请求策略，来提升应用可用性、流畅性，降低服务端压力，让应用如智者一般具备卓越的策略思维。alova 核心模块提供了各类适配器接口、中间件机制来保证高扩展能力，从而实现更多的请求场景。如果你有期待的请求场景但我们未实现的，也欢迎贡献你为 alova 贡献你不可替代的力量。

## 为什么创造 alova

数据请求一直是应用程序必不可少的重要部分，自从 XMLHttpRequest 诞生以来请求方案层出不穷，客户端的数据交互探索一直聚焦于以下两个方向：

1. 请求实现越来越简单，如`$.ajax`、`axios`、`react-query`，以及`fetch api`等请求工具，编码形式从回调函数、Promise，再到 usehook 不断过渡，编码难度越来越小。
2. 数据交互提示越来越友好，大致经历了以下几个阶段：
   1. 无状态（卡死状态）
   2. loading 等待状态、进度条展示
   3. 骨架屏展示、旧数据占位展示

在这两个方面的探索已经足够多了，只是，在越来越看重的用户体验的时代，我们更应该关注应用的流畅性。人们总是将数据交互的性能归咎于网络状态，但我们到处都能看到频繁的重复请求现象。
而 alova 就是从请求策略入手，致力于提高应用的流畅性，好的请求策略不仅能提升性能和用户体验，还可以降低服务端压力。**alova 的使命，就是让应用更高效地管理 Client-Server 数据交互**，针对不同的请求场景提供更好的请求策略。
在以上的基础上，我们将请求场景进行抽象提出了 [请求场景模型（RSM）](/get-started/RSM)，它很好地解释了 alova 的请求策略方案。

alova 具有很灵活的扩展能力来实现不同场景下的请求策略，我们对 alova 的预期是一个**简单编码即可实现特定场景的高效请求的请求策略工具**。

同时，在无感数据交互场景下，alova 已经走出了一大步，它让用户在一定程度上无需等待数据请求，以及提交即响应，**在接下来我们将会一个章节来讲解无感数据交互的相关内容**。

在未来，alova 将承载着我们对请求策略的探索之路继续前行。

> 目前支持`vue`、`react`和`react-native`、`svelte`，同时也支持`Uniapp`、`Taro`，更多框架支持敬请期待...

## 选择 alova 的理由

alova 也致力于解决客户端网络请求的问题，但与其他请求库不同的是，alova 选择了场景化请求策略的方向，好的请求策略可以让你在编写更少代码的情况下，提升应用在请求方面的流畅性。alova 提供了许多开箱即用的场景化请求策略，同时，alova 还提供了丰富的特性，满足 99% 的请求需求。

如果你希望不编写更多额外代码，也能获得流畅的应用，不妨来试试！

更完整的特性如下：

1. 🕶 在 vue、react、svelte 3 个 UI 框架，以及 uniapp、taro 环境下提供统一的使用体验，无缝移植
2. 📑 与 axios 相似的 api 设计，更简单熟悉
3. 🍵 开箱即用的高性能场景化请求策略，让应用更流畅
4. 🐦 4kb+，只有 axios 的 30%+
5. 🔩 高灵活性，兼容任意请求库，如 axios、superagent 或 fetch-api
6. 🔋 3 种数据缓存模式，提升请求性能，同时降低服务端压力
7. 🔌 丰富的扩展功能，可以自定义请求适配器、存储适配器、中间件，以及 states hook
8. 🖥️ [2.2.0+]服务端渲染（SSR）
9. 💕 请求共享，避免同时发送相同请求
10. 🪑 数据预拉取，这意味着用户可以更快看到信息，无需等待
11. 🦾 实时自动状态管理
12. 🎪 交互式文档和示例
13. 🎈 Typescript 支持
14. ⚡ 支持 tree shaking，这意味着 alova 的生产体积往往小于 4kb

## 请求策略

alova 是核心库，它提供了缓存策略、请求共享策略，以及状态管理等通用功能，能满足 90%+的请求需求。而将具体的请求策略方案放在了`@alova/scene-vue`、`@alova/scene-react`、`@alova/scene-svelte`中，它们是依赖 alova 的扩展功能开发的，目前提供了以下两个主要的请求策略。

### 分页请求策略

自动管理分页数据，数据预加载，减少不必要的数据刷新，流畅性提高 300%，编码难度降低 50%

### 静默提交策略

提交即响应，大幅降低网络波动造成的影响，让你的应用在网络不稳定，甚至断网状态下依然可用

### 更多请求相关的业务场景征集中...

如果你已经想到了一些特定且典型的业务请求场景，可以在这边 [提交 issue](https://github.com/alovajs/scene/issues/new/choose) 告诉我们，我们会实现它提供给更多人使用。

## 库稳定性

alova 从第一个版本的开发到现在已经过去一年左右的时间了，在这一年中我们也在持续发现问题优化，到目前为止 alova 已通过了 160+ 项单元测试，覆盖率为 99%。即便如此，alova 还属于新秀，因此我也建议你可以先保守使用。

如果发现了 alova 的任何问题，你都可以通过 [提交 issue](https://github.com/alovajs/alova/issues/new/choose) 告诉我们，**我们保证会在收到 issue 后，第一时间解决。**

## 官方生态

| 项目                                                               | 说明                              |
| ------------------------------------------------------------------ | --------------------------------- |
| [@alova/mock](https://github.com/alovajs/mock)                     | alova.js 的模拟请求适配器         |
| [@alova/scene-react](https://github.com/alovajs/scene)             | alova.js 的 react 请求策略库      |
| [@alova/scene-vue](https://github.com/alovajs/scene)               | alova.js 的 vue 请求策略库        |
| [@alova/scene-svelte](https://github.com/alovajs/scene)            | alova.js 的 svelte 请求策略库     |
| [@alova/adapter-uniapp](https://github.com/alovajs/adapter-uniapp) | alova.js 的 uniapp 适配器         |
| [@alova/adapter-taro](https://github.com/alovajs/adapter-taro)     | alova.js 的 taro 适配器           |
| [@alova/adapter-axios](https://github.com/alovajs/adapter-axios)   | alova.js 的 axios 适配器          |
| [@alova/adapter-xhr](https://github.com/alovajs/adapter-xhr)       | alova.js 的 XMLHttpRequest 适配器 |

## 各类库的体积对比

| alova                                                                                             | axios                                                                                             | react-query                                                                                                   | vue-request                                                                                                   | vue                                                                                           | react                                                                                                     |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [![minzip](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova) | [![minzip](https://badgen.net/bundlephobia/minzip/axios)](https://bundlephobia.com/package/axios) | [![minzip](https://badgen.net/bundlephobia/minzip/react-query)](https://bundlephobia.com/package/react-query) | [![minzip](https://badgen.net/bundlephobia/minzip/vue-request)](https://bundlephobia.com/package/vue-request) | [![minzip](https://badgen.net/bundlephobia/minzip/vue)](https://bundlephobia.com/package/vue) | [![minzip](https://badgen.net/bundlephobia/minzip/react-dom)](https://bundlephobia.com/package/react-dom) |

## 替代请求库？

alova 是一个请求策略库，它的创建初衷是对不同请求场景提供特定的请求策略解决方案，从而更简洁优雅地实现流畅的请求体验，而例如`$.ajax`、`axios`和`fetch-api`等对请求发送和响应接收提供了很好的支持，它们是 [RSM](/get-started/RSM) 流程中必不可少的一个环节（请求事件），alova 仍然需要依靠它们进行请求，因此我们可以将 alova 看作是请求库的一种武装，让请求库变得更加强大。

## 为什么要深度绑定 UI 框架？

对一个 js 库来说解耦意味着更多场景下的使用，例如 axios 可以在 nodejs 中使用，但同时意味着开发者需要写更多的模板代码，比如使用 useHooks 封装 axios 等。而 alova 摒弃了解耦带来的更多使用场景，将使用范围定位在与 UI 框架配合使用，以最精简的方式使用 alova，这是为了开发者的收益方面而考量的，在一个 UI 框架盛行的时候，深度绑定可以为开发者提供直接使用的功能，提升开发者的使用体验，而不需要太多的模板代码。
