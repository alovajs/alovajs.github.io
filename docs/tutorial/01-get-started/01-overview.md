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
[![qq](https://img.shields.io/badge/chat_with_CH-QQ-0094f7)](https://pd.qq.com/s/1cdjx0nnw)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## What is alova

alova is a lightweight request strategy library that supports developers to implement complex requests such as request sharing, paging requests, form submissions, breakpoint uploads and others with declarative style code, allowing developers to implement high availability and high fluency request with less code, which means that you no longer need to rack your brains to write request optimization code, and no longer need to maintain request data and related status by yourself. You only need to select and use the request module, and set After setting the parameters, alova will do it for you. This improves development efficiency, application operation efficiency, and reduces server pressure.

## Why create alova?

Data requests have always been an essential part of applications. Since the birth of XMLHttpRequest, request schemes have emerged in an endless stream. Client data interaction exploration has always focused on the simplicity of requests, such as `$.ajax`, `axios`, `fetch api` and `react-query` and other request tools, the coding form is continuously developed from callback function, Promise, and then usehook. These js libraries have done a good job in request simplicity, but they only provide general functions, which means For different request scenarios such as sharing requests, paging requests, form submissions, uploading and downloading files, etc., developers still need to write complex codes themselves, which reduces development efficiency and performance cannot be guaranteed. In this era, application fluency has become more and more important.

**We believe that there are simpler solutions, such as using a use hook to get and manage paging data, manage form data, and implement brokenpoint continuingly-transferring, etc. That is use different request strategies in different request scenarios to efficiently implement the request function, so that developers can code less and achieve more efficient Client-Server data interaction. This is the solution we proposed and the mission of alova.**

You can use different request strategies to manage request timing and response data according to different request business scenarios, thereby improving performance and user experience, and reducing server pressure, so that both developers and users can benefit. On the basis of the above, we abstract the request scenario and propose [Request Scenario Model (RSM)](/tutorial/get-started/RSM), which explains alova's request strategy scheme well.

alova has very flexible expansion capabilities to implement request strategies in different scenarios, and users can also customize their own request scenarios.

In the future, alova will continue to carry forward our exploration of request strategies.

> Currently supports `vue/react/react-native/svelte`, and `next/nuxt/sveltekit` and other SSR frameworks, and also supports `Uniapp/Taro` multi-terminal unified framework, more framework support, so stay tuned...

In the scenario of non-inductive data interaction, alova has taken a big step forward. It allows users to respond without waiting for data requests to a certain extent. **In the next chapter, we will explain the non-inductive data interaction in a chapter related information**.

## Reasons for choosing alova

Alova is also committed to solving the problem of client network requests, but unlike other request libraries, alova chooses the direction of business scenario request strategy, and it also provides rich Advanced Features.

- You may have been thinking about how to wrap `fetch` and `axios`. Now you no longer need to do this. alova complete complex requests with declarative style, such as request sharing, paging requests, form submissions, breakpoint uploads, etc, as well as automated cache management, request sharing, cross-component status update, etc.
- alova is lightweight, only 4kb+, which is 30%+ of axios.
- alova is low-coupling, you can make alova work with any UI framework in any js environment through different adapters (built-in supported UI framework is `vue/react/svelte`), and provides a unified experience and perfect code migration.
- alova can also achieve a highly aggregated organization of APIs. The request parameters, cache behavior, and response data transform of each API will be in the same code block, which has great advantages for managing a large number of APIs.

:::info More framework support

Now, alova is available in [vue options (vue2 and vue3)](https://vuejs.org/guide/introduction.html#api-styles), [click here to view details](/tutorial/framework/vue-options). In the future, the following frameworks will be supported:

- Function style such as `solid/preact/qwik`.
- class style such as `angular/lit/stencil`.
- options style such as `native mini Program (China🇨🇳)`.

:::

For comparison with other request libraries, please [click here for more detail](/tutorial/get-started/comparison)

### Complete feature list

1. 🕶 Provide a unified experience in the vue, react, and svelte, and perfect migration
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

| Name                                | Description                                                                                                                                                                                                   | Documentation                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Pagination request strategy         | Automatically manage paging data, data preloading, reduce unnecessary data refresh, improve fluency by 300%, and reduce coding difficulty by 50%                                                              | [usePagination](/tutorial/strategy/usePagination)                           |
| Non-sense data interaction strategy | A new interactive experience, submission and response, greatly reducing the impact of network fluctuations, allowing your application to still be available when the network is unstable or even disconnected | [useSQRequest](/tutorial/strategy/sensorless-data-interaction/overview)     |
| Form submission strategy            | A hook designed for form submission. Through this hook, you can easily implement form drafts and multi-page (multi-step) forms. In addition, it also provides common functions such as form reset             | [useForm](/tutorial/strategy/useForm)                                       |
| File upload strategy                | A simpler file upload strategy that supports automatic identification and conversion of base64, Blob, ArrayBuffer, and Canvas data                                                                            | [useUploader](/tutorial/strategy/useUploader)                               |
| Send verification code              | Verification code sending hook reduces the complexity of developing the verification code sending function.                                                                                                   | [useCaptcha](/tutorial/strategy/useCaptcha)                                 |
| Automatically re-pull data          | Automatically re-pull data under certain conditions to ensure that the latest data is always displayed.                                                                                                       | [useAutoRequest](/tutorial/strategy/useAutoRequest)                         |
| Trigger requests across components  | An alova middleware that eliminates component-level restrictions and quickly triggers the operation function of any request in any component                                                                  | [actionDelegationMiddleware](/tutorial/strategy/actionDelegationMiddleware) |
| UseRequest for serial requests      | A more concise and easy-to-use serial request use hook than [alova's serial request method](/tutorial/next-step/serial-request), providing unified loading status, error, and callback functions              | [useSerialRequest](/tutorial/strategy/useSerialRequest)                     |
| UseWatcher for serial requests      | A more concise and easy-to-use serial request use hook than [alova's serial request method](/tutorial/next-step/serial-request), providing unified loading status, error, and callback functions.             | [useSerialWatcher](/tutorial/strategy/useSerialWatcher)                     |
| Request retry strategy              | Automatic retry on request failure, which plays an important role on important requests and polling requests                                                                                                  | [useRetriableRequest](/tutorial/strategy/useRetriableRequest)               |
| SSE Requests                        | Requests via Server-sent Events                                                                                                                                                                               | [useSSE](/tutorial/strategy/useSSE)                                         |

### More request-related business scenarios are being collected...

If you still have a specific and typical business request scenario, but we have not implemented it yet, you can [submit an issue](https://github.com/alovajs/scene/issues/new/choose) to tell us here, we Will make it available to more people. You can also customize the request hook, please see the [advanced](/category/advanced) section.

## Join the channel community

- [Join Discord community](https://discord.gg/S47QGJgkVb)
- [Join QQ channel community](https://pd.qq.com/s/1cdjx0nnw)

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

Contributing effectively will earn you some alova community fame. Before participating in the contribution, please be sure to read the [Contribution Guidelines](/contributing/overview) in detail to ensure your effective contribution.

## Alternative to the request libraries?

alova is a request strategy library, which was originally created to provide specific request strategy solutions for different request scenarios, so as to achieve a smooth request experience more concisely and elegantly, such as `$.ajax`, `axios` and `fetch- api`, etc. provide good support for request sending and response receiving, they are an essential part of the [RSM](/tutorial/get-started/RSM) process (request events), alova still needs to dependent on them to make requests, so we can Think of alova as an weaponry of the request library, making the request library more powerful.

## Why binding UI framework?

Decoupling a js library means using it in more scenarios. For example, axios can be used in nodejs, but it also means that developers need to write more template code, such as using useHooks to encapsulate axios. However, alova abandons more usage scenarios brought about by decoupling, and positions the scope of use in conjunction with the UI framework to use alova in the most streamlined way. This is for the benefit of developers and is prevalent in a UI framework. Sometimes, deep binding can provide developers with direct-use functions and improve the developer's experience without requiring too much template code.
