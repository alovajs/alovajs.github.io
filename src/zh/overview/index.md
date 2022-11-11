---
title: 概述
order: 10
---

## 为什么创造alova
数据请求一直是应用程序必不可少的重要部分，只是自从XMLHttpRequest诞生以来，`$.ajax`、`axios`、`react-query`，以及`fetch api`等等绝大部分请求工具都以面向开发者而设计，请求的编码形式从回调函数到Promise，到async/await，再到usehook，而少有针对用户体验而设计。

在用户体验方面，基本以业务开发者根据数据交互场景自行定制开发，数据交互的用户体验设计也从最初的无状态（卡死），到等待状态展示（loading）、骨架屏展示，以及旧数据占位展示不断发展，以及响应数据本地缓存等场景，还有没有更广阔的请求场景呢，我们觉得是有的。

在这个基础上，我们将请求场景进行抽象提出了 [请求场景管理的概念（RSM）](../overview/RSM.html)，而alova就说一个RSM实现库，它将承载着我们对请求场景的探索之路。我们对alova的预期是一个兼具开发体验和用户体验的请求工具，它拥有很灵活的扩展能力来实现更多的请求场景，并且它除了具备`react-query`的能力外，还具备更安全的无感数据交互能力，它让用户在一定程度上无需等待数据交互，这得益于alova独特的数据预拉取、静默提交、延迟数据更新特性，无感数据交互能力也会是我们接下来继续探索的方向。

除此以外，alova还能与`axios`、`superagent`，还是浏览器的`fetch-api`等任意请求库/函数完美兼容 [看看alova与请求库的关系](../overview/relationship-with-http-lib.html)，同时还具备离线提交能力，以及更轻量的体积，是`react-query`体积的30%，`axios`的40%。

它目前支持`vue`、`react`、`svelte`，更多MVVM框架支持敬请期待...


## 特性

[![npm](https://img.shields.io/npm/v/alova)](https://www.npmjs.com/package/alova)
[![build](https://github.com/JOU-amjs/alova/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/JOU-amjs/alova/actions/workflows/main.yml)
[![coverage status](https://coveralls.io/repos/github/JOU-amjs/alova/badge.svg?branch=main)](https://coveralls.io/github/JOU-amjs/alova?branch=main)
[![minzipped size](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova)
[![dependency](https://badgen.net/bundlephobia/dependency-count/alova)](https://bundlephobia.com/package/alova)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

1. **[多框架支持]** alova通过states hook的设计将框架依赖分离，一套代码同时支持React/React Native/Vue/Svelte，或更多...
2. **[实时自动管理状态]** 您的一切请求数据和状态都将由alova管理，您只需直接使用即可
3. **[简单且熟悉]** 与axios相似的api设计，让您上手更简单熟悉
4. **[轻量级]** 压缩版只有4kb，只有axios的40%
5. **[简化请求逻辑]** 声明式请求实现，无需您编写请求数据和状态，以及特定场景下的请求代码
6. **[与任意请求库协作]** 不管您喜欢使用axios、superagent，还是浏览器的fetch-api，alova都可以不失特性地完美兼容
7. **[多模式缓存服务端数据]** 提供内存模式、持久化模式等多种服务端数据缓存模式，提升用户体验，同时降低服务端压力
8. **[更安全的乐观更新]** alova实现了后台轮询机制，即使重新进入仍有效，直到请求成功，并配合独有的延迟数据更新机制，保证了乐观更新的安全性
9. **[数据预拉取]** 在任何情况下自定义提前拉取接口数据，这意味着用户可以更快看到信息，无需等待
10. **[Typescript支持]** 如果您喜欢使用typescript，alova的一切都将是类型化的
11. **[离线提交]** 独有的请求缓存，即使在离线下也让请求具有可用性，而不打断正在使用的用户
12. **[TreeShaking支持]** alova未使用到的api将不会打包进生产包，这意味着alova的生产体积往往小于4kb


## 为什么选择alova
1. 自动化缓存key管理
2. 不论你使用`axios`还是`fetch`，还是`XMLHttpRequest`，alova的全局请求钩子和响应钩子等特性依然可用，而`react-query`、`swr`等必须依赖axios才能方便实现
3. 静默提交和延迟数据更新机制，实现更安全的乐观更新
4. 离线提交
5. 丰富的扩展，包括mock数据、更丰富的usehook、taro适配器、uniapp适配器
6. 轻量级，只有`react-query`体积的30%，`axios`的40%

## 各类库的体积对比

| alova                                                                                                     | react-query                                                                                                           | vue-request                                                                                                           | vue                                                                                                   | react                                                                                                             |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [![minzipped size](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova) | [![minzipped size](https://badgen.net/bundlephobia/minzip/react-query)](https://bundlephobia.com/package/react-query) | [![minzipped size](https://badgen.net/bundlephobia/minzip/vue-request)](https://bundlephobia.com/package/vue-request) | [![minzipped size](https://badgen.net/bundlephobia/minzip/vue)](https://bundlephobia.com/package/vue) | [![minzipped size](https://badgen.net/bundlephobia/minzip/react-dom)](https://bundlephobia.com/package/react-dom) |

