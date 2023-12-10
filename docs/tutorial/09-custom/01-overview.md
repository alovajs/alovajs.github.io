---
title: Overview
sidebar_position: 10
---

Alova has high scalability. In addition to providing common features such as core caching mechanism, request sharing mechanism, and state management, it also provides various customization functions and middleware mechanisms, which can adapt to different js environments and customize requests. Strategy.

## Adapter

In order to meet the running requirements of js in different environments, you can customize the request adapter, storage adapter, and even the state adapter of the UI framework, which will be introduced in detail in the next chapters. Some adapter examples are listed below.

- [fetch adapter](https://github.com/alovajs/alova/blob/main/src/predefine/GlobalFetch.ts)
- [localStorage storage adapter](https://github.com/alovajs/alova/blob/main/src/predefine/globalLocalStorage.ts)
- [vue states hook](https://github.com/alovajs/alova/blob/main/src/predefine/VueHook.ts)

You can also combine multiple types of adapters into a collection, for example [Uniapp Adapter](/tutorial/extension/alova-adapter-uniapp).

## Write request strategy

alova's request strategy is separate from the alova core library, so that developers can also take advantage of alova's high scalability to write their own request strategies. Usually, a custom request strategy is based on the combination of `useRequest`, `useWatcher` and `useFetcher`, and writing [middleware](./middleware), cache manipulation functions for them to control their The request method, so as to realize the request strategy of various effects.

The request strategies in **@alova/scene** are well represented, and it is strongly recommended that you refer to the source code for inspiration.

- [Paging request strategy source code](https://github.com/alovajs/scene/blob/main/src/hooks/pagination/usePagination.js)
- [Captcha strategy source code](https://github.com/alovajs/scene/blob/main/src/hooks/useCaptcha.ts)
- [Form submission strategy source code](https://github.com/alovajs/scene/blob/main/src/hooks/useForm.ts)
