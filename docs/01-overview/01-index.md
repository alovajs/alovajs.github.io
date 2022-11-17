---
title: 概述
sidebar_position: 10
---

<img width="500px" src="/img/logo-text.png" />

## alova是什么
一个轻量级的MVVM请求场景管理库，它针对不同的请求场景提出了更好的请求管理方案，可以让你的应用管理CS数据交互更高效，体验更好。我们对 alova 的期望是一个结合了开发体验和用户体验的请求管理工具，具有非常灵活的扩展能力，可以实现更多的请求场景。如果你有期待的请求场景但我们未实现的，也欢迎贡献你为alova贡献你不可替代的力量。

## 为什么创造alova
数据请求一直是应用程序必不可少的重要部分，只是自从XMLHttpRequest诞生以来，`$.ajax`、`axios`、`react-query`，以及`fetch api`等等绝大部分请求工具都以面向开发者而设计，请求的编码形式发展：
1. 回调函数
2. Promise
3. async/await异步函数
4. usehook形式

它们让请求实现越来越方便，但少有针对用户体验而设计的，大多数应用的数据交互体验也都停留在越来越友好的加载提示，发展历程也大致经历了以下几个阶段：
1. 无状态（卡死状态）
2. loading等待状态、进度条展示
3. 骨架屏展示、旧数据占位展示

大多数应用都只做了请求状态的展示，很少有应用将思路放在请求策略上，但策略好的请求却能很好地提升性能和用户体验、降低服务端压力，**alova的使命，就是让应用更聪明地管理CS数据交互**，针对不同的请求场景提出更好的请求管理方案。在这个基础上，我们将请求场景进行抽象提出了 [请求场景管理的概念（RSM）](../overview/RSM)，而alova就说一个RSM实现库，它将承载着我们对请求场景的探索之路。

我们对alova的预期是一个**兼具开发体验和用户体验的请求管理工具**，它拥有很灵活的扩展能力来实现更多的请求场景，它除了具备`react-query`的能力外，还具备更安全的无感数据交互能力，它让用户在一定程度上无需等待数据交互，这得益于alova独特的数据预拉取、静默提交、延迟数据更新特性。

> 目前支持`vue`、`react`、`svelte`，更多MVVM框架支持敬请期待...

## 替代请求库？？？

alova的创建初衷是对不同请求场景提出的一个解决方案，它可以更简洁优雅地实现体验更好，性能更好的请求功能，是一个RSM实现库，而例如`$.ajax`、`axios`和`fetch-api`等对请求发送和响应接收提供了很好的支持，它们是 [RSM](./RSM) 流程中必不可少的一个环节（请求事件环节），alova仍然需要依靠它们进行请求，因此我们可以将alova看作是请求库的一种武装，让请求库变得更加强大。

## 特性

[![npm](https://img.shields.io/npm/v/alova)](https://www.npmjs.com/package/alova)
[![build](https://github.com/alovajs/alova/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/alovajs/alova/actions/workflows/main.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/alova/badge.svg?branch=main)](https://coveralls.io/github/alovajs/alova?branch=main)
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

| alova | axios | react-query | vue-request | vue | react |
| ---- | ---- | ---- | ---- | ---- | ---- |
| [![minzip](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova) | [![minzip](https://badgen.net/bundlephobia/minzip/axios)](https://bundlephobia.com/package/axios) | [![minzip](https://badgen.net/bundlephobia/minzip/react-query)](https://bundlephobia.com/package/react-query) | [![minzip](https://badgen.net/bundlephobia/minzip/vue-request)](https://bundlephobia.com/package/vue-request) | [![minzip](https://badgen.net/bundlephobia/minzip/vue)](https://bundlephobia.com/package/vue) | [![minzip](https://badgen.net/bundlephobia/minzip/react-dom)](https://bundlephobia.com/package/react-dom) |