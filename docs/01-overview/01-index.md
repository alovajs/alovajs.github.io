---
title: Overview
sidebar_position: 10
---

<img width="350px" src="/img/logo-text.png" />

## What is alova
A lightweight MVVM request scenario management library, it proposes better request management solutions for different request scenarios, allowing your application to manage CS data interaction more efficiently and experience better. Our expectation for alova is a request management tool that combines development experience and user experience, with very flexible expansion capabilities, and can implement more request scenarios. If you have an expected request scenario but we have not implemented it, you are also welcome to contribute your irreplaceable strength to alova.

## Why alova was created
Data request has always been an essential and important part of the application, but since the birth of XMLHttpRequest, most of the request tools such as `$.ajax`, `axios`, `react-query`, and `fetch api` are based on Designed by developers, the requested coding form develops:
1. Callback function
2. Promises
3. async/await asynchronous function
4. usehook form

They make the request implementation more and more convenient, but few are designed for user experience. The data interaction experience of most applications also stays at more and more friendly loading prompts. The development process has roughly gone through the following stages:
1. Stateless (stuck state)
2. Loading waiting state, progress bar display
3. Skeleton screen display, old data placeholder display

Most applications only display the request status, and few applications focus on the request strategy, but the request with a good strategy can improve the performance and user experience, reduce the pressure on the server, **alova's mission , is to let the application manage CS data interaction more intelligently, and propose better request management solutions for different request scenarios. On this basis, we abstract the request scene and put forward the concept of [Request scene management (RSM)] (../overview/RSM), and alova says an RSM implementation library, which will carry our request scene Path of discovery.

Our expectation for alova is a request management tool with both development experience and user experience. It has very flexible extension capabilities to achieve more request scenarios. In addition to the ability of `react-query`, It also has a more secure sensorless data interaction capability, which allows users to avoid waiting for data interaction to a certain extent, thanks to alova's unique data pre-fetching, silent submission, and delayed data update features.

> Currently supports `vue`, `react`, `svelte`, more MVVM framework support please stay tuned...

## Alternative to requests library???

The original intention of alova is to propose a solution for different request scenarios. It can implement request functions with better experience and performance more concisely and elegantly. It is an RSM implementation library, such as `$.ajax`, `axios` and `fetch-api`, etc. provide good support for request sending and response receiving, they are an indispensable link in the [RSM](./RSM) process (request event link), alova still needs to rely on them for request, so we can think of alova as an arm of the request library, making the request library more powerful.

## Features

[![npm](https://img.shields.io/npm/v/alova)](https://www.npmjs.com/package/alova)
[![build](https://github.com/alovajs/alova/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/alovajs/alova/actions/workflows/main.yml)
[![coverage status](https://coveralls.io/repos/github/alovajs/alova/badge.svg?branch=main)](https://coveralls.io/github/alovajs/alova?branch=main)
[![minzipped size](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova)
[![dependency](https://badgen.net/bundlephobia/dependency-count/alova)](https://bundlephobia.com/package/alova)
[![tree shaking](https://badgen.net/bundlephobia/tree-shaking/alova)](https://bundlephobia.com/package/alova)
![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

1. **[Multi-framework support]** alova separates framework dependencies through the design of states hook, a set of code supports React/React Native/Vue/Svelte, or more...
2. **[Real-time automatic status management]** All your request data and status will be managed by alova, you just need to use it directly
3. **[Simple and familiar]** API design similar to axios, making it easier and more familiar for you to get started
4. **[Lightweight]** compressed version is only 4kb, only 40% of axios
5. **[Simplify request logic]** Declarative request implementation, no need for you to write request data and status, as well as request code in specific scenarios
6. **[Collaborate with any request library]** Whether you like to use axios, superagent, or the browser's fetch-api, alova can be perfectly compatible without losing features
7. **[Multi-mode cache server data]** Provides a variety of server data cache modes such as memory mode, persistence mode, etc., to improve user experience and reduce server pressure at the same time
8. **[Safer optimistic update]** alova implements a background polling mechanism, which is still valid even if re-entry is successful until the request is successful, and with the unique delayed data update mechanism, the security of optimistic update is guaranteed
9. **[Data pre-pull]** Customize the interface data to be pulled in advance in any case, which means that users can see the information faster without waiting
10. **[Typescript support]** If you like to use typescript, everything in alova will be typed
11. **[Offline Submission]** Unique request cache, which makes requests available even offline without interrupting users in use
12. **[TreeShaking support]** APIs not used by alova will not be packaged into the production package, which means that the production volume of alova is often less than 4kb


## Why choose alova
1. Automatic cache key management
2. Whether you use `axios`, `fetch`, or `XMLHttpRequest`, alova's global request hooks and response hooks and other features are still available, while `react-query`, `swr`, etc. must rely on axios to facilitate implementation
3. Silent commit and delayed data update mechanism for safer optimistic update
4. Offline submission
5. Rich extensions, including mock data, richer usehook, taro adapter, uniapp adapter
6. Lightweight, only 30% of the volume of `react-query` and 40% of `axios`

## Volume comparison of various libraries

| alova | axios | react-query | vue-request | vue | react |
| ---- | ---- | ---- | ---- | ---- | ---- |
| [![minzip](https://badgen.net/bundlephobia/minzip/alova)](https://bundlephobia.com/package/alova) | [![minzip](https://badgen.net/bundlephobia/minzip/axios)](https://bundlephobia.com/package/axios) | [![minzip](https://badgen.net/bundlephobia/minzip/react-query)](https://bundlephobia.com/package/react-query) | [![minzip](https://badgen.net/bundlephobia/minzip/vue-request)](https://bundlephobia.com/package/vue-request) | [![minzip](https://badgen.net/bundlephobia/minzip/vue)](https://bundlephobia.com/package/vue) | [![minzip](https://badgen.net/bundlephobia/minzip/react-dom)](https://bundlephobia.com/package/react-dom) |