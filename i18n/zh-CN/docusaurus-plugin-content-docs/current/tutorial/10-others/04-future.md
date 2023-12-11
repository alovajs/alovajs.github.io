---
title: alova的未来
sidebar_position: 40
---

alovajs 的定位是轻量级的请求策略库，目前在请求功能和请求策略方面提供了较好的支持，但 alovajs 的未来不止于此。

## 更多的请求策略

这是一直不变的方向，我们会持续探索基于常见业务下的高效易用的请求策略。

## 更多的 UI 框架支持

alovajs 虽然是一个基于 UI 框架的请求工具，但它的灵活设计支持我们在各种 UI 框架中使用，最终将会兼容以下的 UI 框架和 js 环境：

- 函数风格框架，如`react/react-native/vue-composntion/svelte/solid/preact/qwik`。
- SSR 框架，如`next/nuxt/sveltekit`。
- class 风格框架，如`angular/lit/stencil`。
- options 风格框架，如`vue-options/原生小程序(中国🇨🇳)`。
- 多端适配框架，如`Uniapp/Taro`(中国 🇨🇳)。

详情请[前往 UI 框架](/category/framework)中查看。

## API 的自动管理和维护

在未来，alovajs 还致力于解决前端 API 的问题，并更进一步地简化前端开发的工作流，这就是 alovajs 的下一个发展方向：**API 的自动管理和维护**，具体包含以下三点。

1. 自动生成 ts 类型完整的、描述完整的请求函数，无论是 js 项目还是 ts 项目，都调用无需引入，让开发者就像直接调用`location.reload`这样方便，并且请求函数可直接看到完整的描述和请求参数类型提示，这些都可以由 openAPI 自动生成。

2. 由于自动生成的请求函数拥有完整的描述和类型提示，开发一个 vscode 插件通过关键字来快速检索需要使用的 API，你也不再需要去查阅 API 文档了。

3. 解决前后端协作断层的问题，接口的任何变动前端可知，可以在启动项目时被通知，如果在构建项目时发现存在变动，则会抛出错误停止构建，如果是 ts 项目也会在编译时抛出错误，也可以通过 vscode 插件查看变动记录。
