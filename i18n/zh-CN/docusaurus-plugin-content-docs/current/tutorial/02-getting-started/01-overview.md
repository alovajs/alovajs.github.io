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
[![wechat](https://img.shields.io/badge/chat_with_CH-Wechat-07c160)](/img/wechat_qrcode.jpg)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## alova 是什么

alova 是一个轻量级的请求策略库，支持开发者使用声明式实现例如请求共享、分页请求、表单提交、断点续传等各种较复杂的请求，让开发者使用非常少量的代码就可以实现高可用性和高流畅性的请求功能，这意味着，你再也不需要自己绞尽脑汁编写请求优化代码，再也不需要自己维护请求数据和相关状态，你只需要选择并使用请求模块，设置参数后，alova 帮你搞定。从而提升开发效率、应用运行效率，还能降低服务端压力。

## 为什么选择 alova

alova 也致力于解决客户端网络请求的问题，但与其他请求库不同的是，alova 选择了业务场景化请求策略的方向，它配合`axios/fetch api`等请求库后能满足你绝大部分请求需求（99%）的同时，还提供了丰富的高级功能。

- 你可能曾经也在思考着应该封装`fetch`和`axios`，现在你不再需要这么做了，通过 alova 使用声明的方式完成请求，例如请求共享、分页请求、表单提交、断点上传等各种较复杂的请求，以及自动化缓存管理、请求共享、跨组件更新状态等。
- alova 是轻量级的，只有 4kb+，是 axios 的 30%+。
- 目前支持`vue/react/react-native/svelte`，以及`next/nuxt/sveltekit`等 SSR 框架，同时也支持`Uniapp/Taro`多端统一框架。
- alova 是低耦合的，你可以通过不同的适配器让 alova 在任何 js 环境下，与任何 UI 框架协作使用（内置支持的 UI 框架为`vue/react/svelte`），并且提供了统一的使用体验和完美的代码迁移。
- 使用 alova 还能实现 api 代码的高聚合组织方式，每个 api 的请求参数、缓存行为、响应数据转换等都将聚集在相同的代码块中，这对于管理大量的 api 有很大的优势。

:::info 对比

与其他请求库的对比，请[点此查看](/tutorial/others/comparison)

:::

## 特性

1. 🕶 在 vue(composition/options)、react、svelte 3 个 UI 框架，以及 uniapp、taro 环境下提供统一的使用体验，完美迁移
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

## 在线试用

你可以通过 Codesandbox [在线可编辑示例尝试 alovajs](/category/examples)直接在浏览器中运行项目，因此它与本地开发几乎无差别，同时无需在你的机器上安装任何东西。

## 加入交流社区

- [加入在 Discord 社区参与交流](https://discord.gg/S47QGJgkVb)
- [加入微信群参与交流](/img/wechat_qrcode.jpg)

## 欢迎参与贡献

在参与贡献前，请务必详细阅读 [贡献指南](/contributing/overview)，以保证你的有效贡献。

## 开始

接下来让我们先[使用 alovajs 发送第一个请求](/tutorial/getting-started/first-request)。
