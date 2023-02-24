---
title: overview
sidebar_position: 10
---

<img width="350px" src={require('/img/logo-text.png').default} />

[![npm](https://img.shields.io/npm/v/alova)](https://www.npmjs.com/package/alova)
[![build](https://github.com/alovajs/alova/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/alovajs/alova/actions/workflows/main.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/alova/badge.svg?branch=main)](https://coveralls.io/github/alovajs/alova?branch=main)
[![minzipped size](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

## what is alova

A lightweight request strategy library, which provides targeted request strategies for different request scenarios to improve application availability and fluency, reduce server pressure, and enable applications to have excellent strategic thinking like a wise man. The alova core module provides various adapter interfaces and middleware mechanisms to ensure high scalability, so as to realize more request scenarios. If you have a request scenario that we are looking forward to but we have not realized it, you are also welcome to contribute your irreplaceable power to alova.

## Why create alova

Data requests have always been an essential part of applications. Since the birth of XMLHttpRequest, request schemes have emerged in an endless stream. The client's data interaction exploration has always focused on the following two directions:

1. Request implementation is getting simpler and simpler, such as `$.ajax`, `axios`, `react-query`, and `fetch api` and other request tools, the encoding form is constantly transitioning from callback function, Promise, and then to usehook, encoding The difficulty is getting smaller and smaller.
2. Data interaction prompts are becoming more and more friendly, and have roughly gone through the following stages:
   1. No state (stuck state)
   2. Loading waiting state, progress bar display
   3. Skeleton screen display, old data placeholder display

There are enough explorations in these two aspects, but in the era of more and more emphasis on user experience, we should pay more attention to the fluency of applications. People always blame the network state for the performance of data interaction, but we see frequent repeated requests everywhere.
Alova starts with the request strategy and is committed to solving the problem of application fluency. A good request strategy can not only improve performance and user experience, but also reduce the pressure on the server. **alova's mission is to make applications manage CS data interaction more intelligently**, and provide better request strategies for different request scenarios.
On the basis of the above, we abstract the request scenario and propose [Request Scenario Model (RSM)](../overview/RSM), which explains alova's request strategy scheme well.

Alova has a very flexible expansion capability to implement request strategies in different scenarios. Our expectation for alova is a request strategy tool that can implement efficient requests for specific scenarios with simple coding. At the same time, in the scenario of non-sensing data interaction, alova has taken a big step forward. It allows users to respond immediately after submission without waiting for data requests to a certain extent. In the future, alova will continue to carry forward our exploration of request strategies.

> Currently supports `vue`, `react`, `svelte`, and also supports `Uniapp`, `Taro`, more framework support please look forward...

## Reasons for choosing alova

Alova allows you to improve the fluency of the application in terms of requests while writing a small amount of code. It provides an out-of-the-box experience, while other request libraries pay more attention to the convenience of network requests. If you want to get a smooth application without writing more extra code, you might as well give it a try!

At the same time, alova also provides a wealth of features to meet 99% of the request requirements, the more complete features are as follows:

1. 🕶 Support vue, react, svelte
2. 📑 The api design is similar to axios, more simple and familiar
3. 🍵 Out-of-the-box high-performance request strategy, making the application smoother
4. 🐦 4kb, only 30% of axios+
5. 🔩 High flexibility, compatible with any request library, such as axios, superagent or fetch-api
6. 🔋 3 data cache modes to improve request performance and reduce server pressure
7. 🔌 Rich extension functions, you can customize request adapter, storage adapter, middleware, and states hook
8. 💕 Request sharing to avoid sending the same request at the same time
9. 🪑 Data pre-fetching, which means users can see information faster without waiting
10. 🦾 Real-time automatic status management
11. 🎪 Interactive documentation and examples
12. 🎈Typescript support
13. ⚡ Support tree shaking, which means that the production volume of alova is often less than 4kb

## request strategy

Alova is the core library that provides universal functions such as cache strategies, request sharing strategies, and status management, which can meet 90%+request requirements. The specific request strategy solutions are placed in `@Alova/scene-vue`, `@Alova/scene-react`,`@Alova/scene-svelte`, they rely on the development of ALOVA's expansion functions. The following two main request strategies.

### Pagination requesting strategy

Automatic management of paging data, pre -loading data, reducing unnecessary data refresh, increased by 300%, and decreased by 50%

### Silent submission strategy

Submitting is a response, which greatly reduces the impact of network fluctuations, allows your application to be unstable in the network, and even in the state of disconnection.

## Alternative to the requests library? ? ?

alova is a request strategy library, which was originally created to provide specific request strategy solutions for different request scenarios, so as to achieve a smooth request experience more concisely and elegantly, such as `$.ajax`, `axios` and `fetch- api`, etc. provide good support for request sending and response receiving, they are an essential part of the [RSM](./RSM) process (request events), alova still needs to rely on them to make requests, so we can Think of alova as an arm of the request library, making the request library more powerful.

## Volume comparison of various libraries

| alova                                                                                             | axios                                                                                             | react-query                                                                                                   | vue-request                                                                                                   | vue                                                                                           | react                                                                                                     |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [![minzip](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova) | [![minzip](https://badgen.net/bundlephobia/minzip/axios)](https://bundlephobia.com/package/axios) | [![minzip](https://badgen.net/bundlephobia/minzip/react-query)](https://bundlephobia.com/package/react-query) | [![minzip](https://badgen.net/bundlephobia/minzip/vue-request)](https://bundlephobia.com/package/vue-request) | [![minzip](https://badgen.net/bundlephobia/minzip/vue)](https://bundlephobia.com/package/vue) | [![minzip](https://badgen.net/bundlephobia/minzip/react-dom)](https://bundlephobia.com/package/react-dom) |
