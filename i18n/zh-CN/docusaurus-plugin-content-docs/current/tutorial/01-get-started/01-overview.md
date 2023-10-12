---
title: 概述
sidebar_position: 10
---

import Logo from '@site/static/img/logo-text.svg';

<Logo style={{
  width: '50%',
  maxWidth: '320px'
}} />

[![npm](https://img.shields.io/npm/v/alova)](https://www.npmjs.com/package/alova)
[![build](https://github.com/alovajs/alova/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/alovajs/alova/actions/workflows/release.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/alova/badge.svg?branch=main)](https://coveralls.io/github/alovajs/alova?branch=main)
[![minzipped size](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova)
[![stars](https://img.shields.io/github/stars/alovajs/alova?style=social)](https://github.com/alovajs/alova)
[![discord](https://img.shields.io/badge/chat-Discord-515ff1)](https://discord.gg/S47QGJgkVb)
[![qq](https://img.shields.io/badge/chat_with_CH-QQ-0094f7)](https://pd.qq.com/s/1cdjx0nnw)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## alova 是什么

alova 是一个轻量级的请求策略库，支持开发者使用声明式实现例如请求共享、分页请求、表单提交、断点续传等各种较复杂的请求，让开发者使用非常少量的代码就可以实现高可用性和高流畅性的请求功能，这意味着，你再也不需要自己绞尽脑汁编写请求优化代码，再也不需要自己维护请求数据和相关状态，你只需要选择并使用请求模块，设置参数后，alova 帮你搞定。从而提升开发效率、应用运行效率，还能降低服务端压力。

## 为什么创造 alova

数据请求一直是应用程序必不可少的重要部分，自从 XMLHttpRequest 诞生以来请求方案层出不穷，客户端的数据交互探索一直聚焦于请求的简单性，如`$.ajax`、`axios`、`fetch api`以及`react-query`等请求工具，编码形式从回调函数、Promise，再到 usehook 不断发展，这些 js 库在请求简单性上已经做得很好了，不过它们只提供了通用的功能，这意味着对于不同的请求场景例如共享请求、分页请求、表单提交、上传和下载文件等，开发者依然需要自己编写复杂的代码，降低开发效率，性能也无法得到保证，在越来越看重的用户体验的时代，应用的流畅性变得越来越重要。

**而我们认为还有更简单的方案，例如使用一个 use hook 实现对分页数据的获取和管理、实现对表单数据的管理、实现断点续传等，即在不同的请求场景下使用不同的请求策略模块来高效地实现请求功能，从而让开发者在编写更少量代码同时，也能实现更高效地 Client-Server 数据交互，这就是我们提出的解决方案，也是 alova 的使命。**

你可以根据不同的请求业务场景使用不同的请求策略来管理请求时机和响应数据，从而提升性能和用户体验，还可以降低服务端压力，让开发者和使用者都能获得收益。在以上的基础上，我们将请求场景进行抽象提出了 [请求场景模型（RSM）](/tutorial/get-started/RSM)，它很好地解释了 alova 的请求策略方案。在未来，alova 将承载着我们对请求策略的探索之路继续前行。

alova 具有很灵活的扩展能力来实现不同场景下的请求策略，用户也可以自定义自己的请求场景，这部分内容在[高级章节](/category/advanced)。

> 在无感数据交互场景下，alova 已经走出了一大步，它让用户在一定程度上无需等待数据请求，以及提交即响应，**在接下来我们将会一个章节来讲解无感数据交互的相关内容**。

## 选择 alova 的理由

alova 也致力于解决客户端网络请求的问题，但与其他请求库不同的是，alova 选择了业务场景化请求策略的方向，它配合`axios/fetch api`等请求库后能满足你绝大部分请求需求（99%）的同时，还提供了丰富的高级功能。

- 你可能曾经也在思考着应该封装`fetch`和`axios`，现在你不再需要这么做了，通过 alova 使用声明的方式完成请求，例如请求共享、分页请求、表单提交、断点上传等各种较复杂的请求，以及自动化缓存管理、请求共享、跨组件更新状态等。
- alova 是轻量级的，只有 4kb+，是 axios 的 30%+。
- 目前支持`vue/react/react-native/svelte`，以及`next/nuxt/sveltekit`等 SSR 框架，同时也支持`Uniapp/Taro`多端统一框架。
- alova 是低耦合的，你可以通过不同的适配器让 alova 在任何 js 环境下，与任何 UI 框架协作使用（内置支持的 UI 框架为`vue/react/svelte`），并且提供了统一的使用体验和完美的代码迁移。
- 使用 alova 还能实现 api 代码的高聚合组织方式，每个 api 的请求参数、缓存行为、响应数据转换等都将聚集在相同的代码块中，这对于管理大量的 api 有很大的优势。

:::info 多框架支持

现在，你还可以在 [vue options（vue2 和 vue3）](https://vuejs.org/guide/introduction.html#api-styles) 写法中完美使用 alova，[点此查看详情](/tutorial/framework/vue-options)。后续我们将陆续支持以下框架：

- 函数式，如`solid/preact/qwik`。
- class 式，如`angular/lit/stencil`。
- options 式，如`原生小程序(中国🇨🇳)`。

:::

与其他请求库的对比，请[点此查看](/tutorial/get-started/comparison)

### 完整的特性列表

1. 🕶 在 vue、react、svelte 3 个 UI 框架，以及 uniapp、taro 环境下提供统一的使用体验，完美迁移
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

## alova 请求策略表

alova 是核心库，它提供了缓存策略、请求共享策略，以及状态管理等通用功能，能满足 99%以上的请求需求。同时，alova 还提供了业务逻辑的，高频使用的请求策略 hook，可以直接用于特定场景。以下为 alova 提供的请求策略 hook 列表。

| 名称                  | 描述                                                                                                                                    | 文档                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 分页请求策略          | 自动管理分页数据，数据预加载，减少不必要的数据刷新，流畅性提高 300%，编码难度降低 50%                                                   | [usePagination](/tutorial/strategy/usePagination)                           |
| 无感数据交互策略      | 全新的交互体验，提交即响应，大幅降低网络波动造成的影响，让你的应用在网络不稳定，甚至断网状态下依然可用                                  | [useSQRequest](/tutorial/strategy/sensorless-data-interaction/overview)     |
| 表单提交策略          | 为表单提交而设计的 hook，通过此 hook 你可以很方便地实现表单草稿、多页面（多步骤）表单，除此以外还提供了表单重置等常用功能               | [useForm](/tutorial/strategy/useForm)                                       |
| 发送验证码            | 验证码发送 hook，减掉你在开发验证码发送功能时的繁琐。                                                                                   | [useCaptcha](/tutorial/strategy/useCaptcha)                                 |
| 跨组件触发请求        | 一个 alova 中间件，消除组件层级的限制，在任意组件中快速地触发任意请求的操作函数                                                         | [actionDelegationMiddleware](/tutorial/strategy/actionDelegationMiddleware) |
| 串行请求的 useRequest | 比[alova 的串行请求方式](/tutorial/next-step/serial-request)更加简洁易用的串行请求 use hook，提供统一的 loading 状态、error、回调函数   | [useSerialRequest](/tutorial/strategy/useSerialRequest)                     |
| 串行请求的 useWatcher | 比[alova 的串行请求方式](/tutorial/next-step/serial-request)更加简洁易用的串行请求 use hook，提供统一的 loading 状态、error、回调函数。 | [useSerialWatcher](/tutorial/strategy/useSerialWatcher)                     |
| 请求重试策略          | 请求失败自动重试，它在重要的请求和轮询请求上发挥重要作用                                                                                | [useRetriableRequest](/tutorial/strategy/useRetriableRequest)               |

### 更多请求相关的业务场景征集中...

如果你还有特定且典型的业务请求场景，但我们还未实现的，可以在这边 [提交 issue](https://github.com/alovajs/scene/issues/new/choose) 告诉我们，我们会实现它提供给更多人使用。同时也可以自定义请求 hook，请看 [高级](/category/advanced) 部分。

## 加入交流社区

- [加入在 Discord 社区参与交流](https://discord.gg/S47QGJgkVb)
- [加入 QQ 频道社区参与交流](https://pd.qq.com/s/1cdjx0nnw)

## 库稳定性

alova 从第一个版本的开发到现在已经过去一年左右的时间了，在这一年中我们也在持续发现问题优化，到目前为止 alova 已通过了 160+ 项单元测试，覆盖率为 99%。即便如此，alova 还属于新秀，它依然还有很长一段路需要走。

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

## 欢迎参与贡献

alova 自从 2023 年 4 月份正式对外发布以来，在 3 个月内已收到了 1500+star。

我们在 Issues 和 Disscussion 中收到了来自世界各地的开发者积极参与的信息，深感荣幸。

我们期望将 alova 打造成每位愿意参与的人的共同项目，而不是 alova 团队的，我们以开放包容的态度鼓励每个人成为 alova 社区的贡献者，即使你是一位初级开发者，只要想法符合 alova 的发展准则，也请大方地参与进来。

alova 还属于新秀，它依然还有很长一段路需要走，现在参与贡献可以为你赢得更多的有效贡献机会，它可以让你为全世界的开发者提供你的价值。

我们认为贡献 alova 不局限于代码贡献，而是参与任何有利于 alova 发展的活动都属于贡献 alova，具体包括以下 13 项，但不局限于这些：

- 在项目中使用 alova
- 为 alova 点星
- 报告 bug
- 提出新特性想法
- Pull Request
- 基于 alova 编写适配器和策略库
- 参与社区交流/PR review
- 发布和传播有利于 alova 的信息
- 分享使用经验
- 项目合作
- 项目捐赠
- 更正或编写文档
- 翻译文档
- 以及你能想到的其他正向发展的活动...

有效的贡献将为你赢得一定的 alova 社区名望。在参与贡献前，请务必详细阅读 [贡献指南](/contributing/overview)，以保证你的有效贡献。

## 替代请求库？

alova 是一个请求策略库，它的创建初衷是对不同请求场景提供特定的请求策略解决方案，从而更简洁优雅地实现流畅的请求体验，而例如`$.ajax`、`axios`和`fetch-api`等对请求发送和响应接收提供了很好的支持，它们是 [RSM](/tutorial/get-started/RSM) 流程中必不可少的一个环节（请求事件），alova 仍然需要依靠它们进行请求，因此我们可以将 alova 看作是请求库的一种武装，让请求库变得更加强大。

## 为什么要深度绑定 UI 框架？

对一个 js 库来说解耦意味着更多场景下的使用，例如 axios 可以在 nodejs 中使用，但同时意味着开发者需要写更多的模板代码，比如使用 useHooks 封装 axios 等。而 alova 摒弃了解耦带来的更多使用场景，将使用范围定位在与 UI 框架配合使用，以最精简的方式使用 alova，这是为了开发者的收益方面而考量的，在一个 UI 框架盛行的时候，深度绑定可以为开发者提供直接使用的功能，提升开发者的使用体验，而不需要太多的模板代码。
