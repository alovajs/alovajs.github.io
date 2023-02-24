---
title: Advanced Overview
sidebar_position: 10
---

Alova is very flexible. In addition to providing common features such as core caching strategies, request sharing strategies, and state management, it also provides various customization functions and middleware mechanisms, which can adapt to different js environments and customize request strategies.

## Adapter

In order to meet the running requirements of js in different environments, you can customize the request adapter, storage adapter, and even the state adapter of the mvvm framework. Some adapter examples are listed below.

- [Mock Data Adapter](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)
- [localStorage storage adapter](https://github.com/alovajs/alova/blob/main/src/predefine/globalLocalStorage.ts)

## Write request strategy

Alova's request strategy is separate from the alova core library, so that developers can also take advantage of alova's flexibility to write their own request strategies. Usually, a custom request strategy is based on a combination of `useRequest`, `useWatcher` and `useFetcher`, and writing [middleware](/advanced/middleware) for them, caching manipulation functions to control them The request method, so as to realize the request strategy of various effects.

The request strategies in **@alova/scene** are well represented, and it is strongly recommended that you refer to the source code for inspiration.

- [Paging request strategy source code](https://github.com/alovajs/scene/blob/main/src/hooks/pagination/usePagination_unified.js)
- [Silent Request Strategy Source Code](https://github.com/alovajs/scene/blob/main/src/hooks/silent/useSQRequest.ts)
