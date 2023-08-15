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
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## What is alova

A lightweight request strategy library, which provides targeted request strategies for different request scenarios to improve application availability and fluency, reduce server pressure, and enable applications to have excellent strategic thinking like a wise man. The alova core module provides various adapter interfaces and middleware mechanisms to ensure high scalability and realize more request scenarios. If you have an expected request scenario but we have not implemented it, you are also welcome to contribute your irreplaceable power to alova.

## Why create alova

Data requests have always been an essential part of applications. Since the birth of XMLHttpRequest, request schemes have emerged in an endless stream. Client data interaction exploration has always focused on the simplicity of requests, such as `$.ajax`, `axios`, `fetch api` and `react-query` and other request tools, the encoding form is constantly transitioning from callback function, Promise, and then to usehook, which makes the request easier and simpler. However, in the era of more and more emphasis on user experience, our focus From the simplicity of the request to the fluency of the application, developers need to write more complex request logic according to different business scenarios, which is a test of the developer's skill level.

Alova focuses on improving application fluency, and uses different request strategies to manage request timing and response data according to different request business scenarios, thereby improving performance and user experience, and reducing server pressure. **alova's mission is to enable developers to achieve more efficient Client-Server data interaction while writing a small amount of code**, so that both developers and users can benefit
.

On the basis of the above, we abstract the request scenario and propose [Request Scene Model(RSM)](./RSM), which explains alova's request strategy scheme well.

Alova has a very flexible expansion capability to implement request strategies in different scenarios. Our expectation for alova is **a request strategy tool that writes less code to achieve efficient data interaction in specific business scenarios**.

In the future, alova will continue to carry forward our exploration of request strategies.

> Currently supports `vue/react/react-native/svelte`, and `next/nuxt/sveltekit` and other SSR frameworks, and also supports `Uniapp/Taro` multi-terminal unified framework, more framework support, so stay tuned...

At the same time, in the scenario of non-sensing data interaction, alova has taken a big step forward. It allows users to respond without waiting for data requests to a certain extent. **In the next chapter, we will explain non-sensing data Interaction related content**.

## Reasons for choosing alova

Alova is also committed to solving the problem of client network requests, but unlike other request libraries, alova chooses the direction of business scenario request strategy, and it also provides rich Advanced Features.

- You may have been thinking about encapsulating `fetch` and `axios`, but now you don’t need to do this anymore, alova has prepared all the advanced request functions you need, such as request use hooks, automatic cache management , request sharing, cross-component update status, and request strategies in different business scenarios are available out of the box.
- alova is lightweight, only 4kb+, which is 30%+ of axios.
- alova is low-coupling, you can make alova work with any UI framework in any js environment through different adapters (the built-in supported UI framework is `vue/react/svelte`), and provides a unified experience And seamless code porting.
- The use of alova can also achieve a highly aggregated organization of API codes. The request parameters, cache behavior, and response data conversion of each API will be gathered in the same code block, which has great advantages for managing a large number of APIs.

### Complete feature list

1. 🕶 Provide a unified experience in the vue, react, and svelte, and seamlessly transplant
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

## alova request strategy list

Alova is the core library, which provides common functions such as caching strategy, request sharing strategy, and state management, and can meet more than 99% of request requirements. At the same time, alova also provides business logic and frequently used request strategy hooks, which can be directly used in specific scenarios. The following is a list of request policy hooks provided by alova.

| Name                                 | Description                                                                                                                                                                                             | Documentation                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Paging request strategy              | Automatically manage paging data, data preloading, reduce unnecessary data refresh, improve fluency by 300%, reduce coding difficulty by 50%                                                            | [usePagination](../strategy/usePagination)                           |
| Non-inductive data interact strategy | A new interactive experience, submitting and responding, greatly reducing the impact of network fluctuations, making your application still available when the network is unstable or even disconnected | [useSQRequest](../strategy/sensorless-data-interaction/overview)     |
| Form Submit Strategy                 | A hook designed for form submission, through which you can easily implement form drafts, multi-page (multi-step) forms, in addition to providing common functions such as form reset                    | [useForm](../strategy/useForm)                                       |
| Send Captcha                         | Captcha sending hook, which saves you the trouble of developing the verification code sending function.                                                                                                 | [useCaptcha](../strategy/useCaptcha)                                 |
| Cross-component trigger request      | An alova middleware, which removes the limitation of component hierarchy and quickly triggers the operation function of any request in any component                                                    | [actionDelegationMiddleware](../strategy/actionDelegationMiddleware) |
| useRequest with serial               | A more concise and easy-to-use serial request use hook than [alova's serial request method](../next-step/serial-request), providing a unified loading status, error, and callback function              | [useSerialRequest ](../strategy/useSerialRequest)                    |
| useWatcher with serial               | A more concise and easy-to-use serial request use hook than [alova's serial request method](../next-step/serial-request), providing a unified loading status, error, and callback function.             | [useSerialWatcher](../strategy/useSerialWatcher)                     |
| Request retriable strategy           | Automatic retry on request failure, it plays an important role on important requests and polling requests                                                                                               | [useRetriableRequest](../strategy/useRetriableRequest)               |

### More request-related business scenarios are being collected...

If you still have a specific and typical business request scenario, but we have not implemented it yet, you can [submit an issue](https://github.com/alovajs/scene/issues/new/choose) to tell us here, we Will make it available to more people. You can also customize the request hook, please see the [Advanced](../../category/advanced) section.

## Library Stability

It has been about a year since the development of the first version of alova. During this year, we have continued to find problems and optimize them. So far, alova has passed 143 unit tests, with a coverage rate of 99%. Even so, alova is still a rookie, it still has a large development space.

If you find any problems with alova, you can tell us by [submit an issue](https://github.com/alovajs/alova/issues/new/choose), **WE PROMISE that after receiving the issue, it will be resolved as soon as possible. **

## Official Ecosystem

| Resources                                                          | Description                                  |
| ------------------------------------------------------------------ | -------------------------------------------- |
| [@alova/mock](https://github.com/alovajs/mock)                     | Mock request adapter for alova.js            |
| [@alova/scene-react](https://github.com/alovajs/scene)             | react request strategy library for alova.js  |
| [@alova/scene-vue](https://github.com/alovajs/scene)               | vue request strategy library for alova.js    |
| [@alova/scene-svelte](https://github.com/alovajs/scene)            | svelte request strategy library for alova.js |
| [@alova/adapter-uniapp](https://github.com/alovajs/adapter-uniapp) | uniapp adapter for alova.js                  |
| [@alova/adapter-taro](https://github.com/alovajs/adapter-taro)     | taro adapter for alova.js                    |
| [@alova/adapter-axios](https://github.com/alovajs/adapter-axios)   | axios adapter for alova.js                   |
| [@alova/adapter-xhr](https://github.com/alovajs/adapter-xhr)       | XMLHttpRequest adapter for alova.js          |

## Volume comparison of various libraries

| alova                                                                                             | axios                                                                                             | react-query                                                                                                   | vue-request                                                                                                   | vue                                                                                           | react                                                                                                     |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [![minzip](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova) | [![minzip](https://badgen.net/bundlephobia/minzip/axios)](https://bundlephobia.com/package/axios) | [![minzip](https://badgen.net/bundlephobia/minzip/react-query)](https://bundlephobia.com/package/react-query) | [![minzip](https://badgen.net/bundlephobia/minzip/vue-request)](https://bundlephobia.com/package/vue-request) | [![minzip](https://badgen.net/bundlephobia/minzip/vue)](https://bundlephobia.com/package/vue) | [![minzip](https://badgen.net/bundlephobia/minzip/react-dom)](https://bundlephobia.com/package/react-dom) |

## Welcome to contribute

Since its official propaganda in April 2023, alova has received 1500+ stars within 3 months.

We're honored to hear from developers around the world in Issues and Discussions.

We expect to make alova a common project for everyone who is willing to participate, instead of the alova team. We encourage everyone to become a contributor to the alova community with an open and inclusive attitude. Even if you are a junior developer, as long as your idea is in line with alova's goal, please generously participate.

Now alova is still a rookie, and it still has a long way to go. Participating in contributions now can let you win more effective contribution opportunities, and it will let developers all over the world to use your code.

We believe that contributing to alova is not only limited to code contributions, but also participating in any activities that are conducive to the development of alova is considered to contribute to alova, including the following 13 items, but not limited to these:

- use alova in your project
- star alova
- report bug
- Propose new feature ideas
- Pull Request
- Create an adapter or strategy library based on alova
- Participate in community/PR review
- Publish and disseminate information about alova
- Share experience
- Collaboration
- Donation
- Correct or add docs
- Translate docs
- and any other positive activity you can think of...

Contributing effectively will earn you some alova community fame. Before participating in the contribution, please be sure to read the [Contribution Guidelines](../../contributing/overview) in detail to ensure your effective contribution.

## Alternative to the request libraries?

alova is a request strategy library, which was originally created to provide specific request strategy solutions for different request scenarios, so as to achieve a smooth request experience more concisely and elegantly, such as `$.ajax`, `axios` and `fetch- api`, etc. provide good support for request sending and response receiving, they are an essential part of the [RSM](./RSM) process (request events), alova still needs to rely on them to make requests, so we can Think of alova as an arm of the request library, making the request library more powerful.

## Why binding UI framework?

Decoupling a js library means using it in more scenarios. For example, axios can be used in nodejs, but it also means that developers need to write more template code, such as using useHooks to encapsulate axios. However, alova abandons more usage scenarios brought about by decoupling, and positions the scope of use in conjunction with the UI framework to use alova in the most streamlined way. This is for the benefit of developers and is prevalent in a UI framework. Sometimes, deep binding can provide developers with direct-use functions and improve the developer's experience without requiring too much template code.
