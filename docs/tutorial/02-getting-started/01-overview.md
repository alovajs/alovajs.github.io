---
title: Overview
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

## What is alova

alova is a lightweight request strategy library. It supports developers to use declarative way for various complex requests such as request sharing, paging requests, form submission, breakpoint resumption, etc., allowing developers to use little code to complete high availability and high fluency network interaction. This means that you no longer need to write the codes about request logic, and no longer need to maintain relevant data and states yourself. You only need to select and use the request useHook, alova will take over it for you. This will improve development efficiency, application operation efficiency, and reduces server pressure.

## Reasons for choosing alova

Alova is also committed to solving the problem of client network requests, but unlike other request libraries, alova chooses the direction of business scenario request strategy, and it also provides rich Advanced Features.

- You may have been thinking about how to wrap `fetch` and `axios`. Now you no longer need to do this. alova complete complex requests with declarative style, such as request sharing, paging requests, form submissions, breakpoint uploads, etc, as well as automated cache management, request sharing, cross-component status update, etc.
- alova is lightweight, only 4kb+, which is 30%+ of axios.
- alova is low-coupling, you can make alova work with any UI framework in any js environment through different adapters (built-in supported UI framework is `vue/react/svelte`), and provides a unified experience and perfect code migration.
- alova can also achieve a highly aggregated organization of APIs. The request parameters, cache behavior, and response data transform of each API will be in the same code block, which has great advantages for managing a large number of APIs.

:::info Compare

For comparison with other request libraries, please [click here for more detail](/tutorial/others/comparison)

:::

## Features

1. 🕶 Provide a unified experience in the vue(composition/options), react, and svelte, and perfect migration
2. 📑 The api design is similar to axios, more simple and familiar
3. 🍵 Out-of-the-box high-performance request strategy, making the application smoother
4. 🐦 4kb+, only 30% of axios+
5. 🔩 High flexibility, compatible with any request library, such as axios, superagent or fetch-api
6. 🔋 3 data cache modes to improve request performance and reduce server pressure
7. 🔌 Rich extension functions, you can customize request adapter, storage adapter, middleware, and states hook
8. 🖥️ [2.2.0+]Server-side rendering(SSR)
9. 💕 Request sharing to avoid sending the same request at the same time
10. 🪑 Data pre-fetching, which means users can see information faster without waiting
11. 🦾 Real-time automatic status management
12. 🎪 Interactive documentation and examples
13. 🎈Typescript support
14. ⚡ Support tree shaking, which means that the production volume of alova is often less than 4kb

## Online trial

You can run the project directly in the browser via Codesandbox [Online editable examples to try alovajs](/category/examples), so it's almost the same as local development without having to install anything on your machine.

## Join alova community

- [Join Discord community](https://discord.gg/S47QGJgkVb)
- [Join Wechat group](/img/wechat_qrcode.jpg)

## Welcome to contribute

Before participating in the contribution, please be sure to read the [Contribution Guidelines](/contributing/overview) in detail to ensure your effective contribution.

## Start

Next let's [send the first request with alovajs](/tutorial/getting-started/first-request).
