---
title: Overview
---

alova has high scalability. In addition to providing common features such as core caching mechanism, request sharing mechanism and state management, it also provides various customization functions and middleware mechanisms, which can adapt to different js environments and customize request strategies. In the following chapters, we will introduce them in detail.

## Custom Adapter

In order to meet the running requirements of js in different environments, you can customize the request adapter, storage adapter, and even the state adapter of the UI framework, which will also be introduced in detail in the following chapters. Some adapter examples are listed below.

- [fetch adapter](https://github.com/alovajs/alova/blob/main/packages/alova/src/predefine/adapterFetch.ts)
- [localStorage storage adapter](https://github.com/alovajs/alova/blob/main/packages/alova/src/defaults/cacheAdapter.ts)
- [vue states hook](https://github.com/alovajs/alova/blob/main/packages/client/src/statesHook/vue.ts)

You can also group multiple types of adapters into a collection, such as [Uniapp adapter](/tutorial/request-adapter/alova-adapter-uniapp).

## Custom client strategy

alova provides 10+ custom client strategy modules, but sometimes you may need to write your own strategy module. Usually, a custom request strategy is based on the combination of the three core useHooks of `useRequest`, `useWatcher` and `useFetcher`, and writes [middleware](/tutorial/advanced/middleware) and cache manipulation functions for them to control their request methods, so as to achieve various request strategies

The following strategy modules are very representative, and it is strongly recommended that you refer to the source code for inspiration.

- [source of usePagination](https://github.com/alovajs/scene/blob/main/packages/client/src/hooks/pagination/usePagination.ts)
- [source of useCaptcha](https://github.com/alovajs/scene/blob/main/packages/client/src/hooks/useCaptcha.ts)
- [source of useForm](https://github.com/alovajs/scene/blob/main/packages/client/src/hooks/useForm.ts)

## Custom server-side strategy

The server-side strategy module is a simple function. The following is a `Server hook` for request retry.

- [Request retry](https://github.com/alovajs/scene/blob/main/packages/server/src/hooks/retry.ts)
