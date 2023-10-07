---
title: 成为核心团队成员
sidebar_position: 20
---

你可以通过主动参与维护[alovajs 组织](https://github.com/alovajs)的一个或多个仓库来成为 alova 的核心团队成员，你的职责将会有以下 3 点：

1. 开发和维护你所选择的仓库，例如添加新特性、bug 修复、优化原有代码和项目配置、审核贡献者的代码等，及时解决用户在 github 或社交软件中提出的相关问题；
2. 编写和维护你所选择的仓库的开发文档，并不断优化使文档内容更清晰易懂；
3. 在社交平台或短视频平台等任意地方，以任意形式正面宣传你的相关仓库或 alova 核心库，例如发布文章或视频，提高 alovajs 生态的影响力；

## 加入要求和通道

### 要求

下面已列出[alovajs 组织](https://github.com/alovajs)中可参与开发和维护的仓库，你可以自行选择更感兴趣的仓库，需要注意的是，这些仓库的实现需要按提供的代码设计来实现，点击**可参与的仓库列表**中的每个链接即可查看代码设计，如有更好的实现也可以提出修改设计。

你需要以 PR 的形式提交对应仓库的实现代码，并发送邮件到 **hujou555@gmail.com** 进行申请，并附上 PR 链接，请务必在开头添加`alova核心成员申请`，我们将会在最快的时间内审核并告知结果，通过后即可成为对应仓库的核心团队成员。

> 你也可以在不加入 alova 核心团队成员的情况下，创建自己的 alova 适配仓库实现不同的想法。

## 可参与的仓库列表

### UI 框架适配库

- [**alova/solid**](https://github.com/alovajs/alova/tree/main/src/predefine)：[solidjs](https://www.solidjs.com/) 适配器，让 alova 兼容 [solidjs](https://www.solidjs.com/)，该模块将在 alova 核心库的`src/predefine`中添加。
- [**alova/preact**](https://github.com/alovajs/alova/tree/main/src/predefine)：[preact](https://preactjs.com/) 适配器，让 alova 兼容 [preact](https://preactjs.com/)，该模块将在 alova 核心库的`src/predefine`中添加。
- [**alova/qwik**](https://github.com/alovajs/alova/tree/main/src/predefine)：[qwik](https://qwik.builder.io/) 适配器，让 alova 兼容 [qwik](https://qwik.builder.io/)，该模块将在 alova 核心库的`src/predefine`中添加。
- [**@alova/angular**](https://github.com/alovajs/angular)：alova 的 [angular](https://angularjs.org/) 适配仓库。
- [**@alova/miniprogram**](https://github.com/alovajs/miniprogram)：alova 的原生小程序（中国 🇨🇳）适配仓库，支持[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/)、[qq 小程序](https://q.qq.com/wiki/develop/miniprogram/frame/)、[字节小程序](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/usage-guide)等支持`behaviors`属性的小程序。
- [**@alova/lit**](https://github.com/alovajs/lit)：alova 的 [lit](https://lit.dev/) 适配仓库。
- [**@alova/stencil**](https://github.com/alovajs/stencil)：alova 的 [stencil](https://stenciljs.com/) 适配仓库。

### 请求适配器

- [**@alova/adapter-graphql**](https://github.com/alovajs/adapter-graphql)：graphql 适配器，基于 graphql client 开发。

### 场景化请求模块

以下场景化模块均放在[@alova/scene](https://github.com/alovajs/scene)仓库中。

- 大文件断点续传模块。
- 更简单的文件上传模块，可根据传入数据的格式自动转换为 File 对象实现更简单的文件上传功能。
- 重复请求发送模块，用于轮询请求、浏览器 tab 切换请求、浏览器聚焦请求，从而保证页面数据的事实性。
- SSE 请求模块，基于`EventSource`的请求模块。
- 请求速率限制中间件，实现控制一定间隔内只发送 N 个请求，[可以参考此讨论](https://github.com/alovajs/alova/discussions/205)。

### 开发工具

- [**@alova/openapi**](https://github.com/alovajs/openapi)：根据 openapi 配置文件自动生成对应的`Method`集合，免去开发者自行编写`Method`实例，同时支持响应数据类型，和 api 变更提醒等。

- [**@alova/api-vscode**](https://github.com/alovajs/api-vscode)：vscode 插件，它将根据当前项目自动生成 api 列表，方便查阅和管理项目中的 api 定义，并提供变更提醒。
