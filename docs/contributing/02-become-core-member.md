---
title: Become a core team member
sidebar_position: 20
---

You can become a core team member of alova by actively participating in maintaining one or more repositories of [alovajs organization](https://github.com/alovajs). Your responsibilities will include the following three points:

1. Develop and maintain the warehouse of your choice, such as adding new features, bug fixes, optimizing original code and project configurations, reviewing contributors' codes, etc., and promptly solving related issues raised by users on github or social software;
2. Write and maintain the development documents of the warehouse you choose, and continuously optimize the document content to make it clearer and easier to understand;
3. Positively promote your relevant warehouses or alova core libraries in any form on social platforms or short video platforms, such as publishing articles or videos, to increase the influence of the alovajs ecosystem;

## Join requirements and apply

### Require

The warehouses that can participate in development and maintenance in [alovajs organization](https://github.com/alovajs) are listed below. You can choose the warehouses you are more interested in. It should be noted that the implementation of these warehouses needs to be as provided. Code design to implement (click each link to view the code design, and you can also propose modifications to the design if there is a better implementation). You need to submit the implementation code of the corresponding warehouse in the form of a PR for review. After passing it, you can become a core team member of the corresponding warehouse.

### Apply

Send an email to **hujou555@gmail.com** to apply and attach the PR link. Please be sure to add `alova core member application` at the beginning. We will review and inform you of the result as soon as possible.

## List of participating repositories

### UI framework adapters

- [**alova/solid**](https://github.com/alovajs/alova/tree/main/src/predefine): [solidjs](https://www.solidjs.com/) adapter, let alova is compatible with [solidjs](https://www.solidjs.com/), and this module will be added in `src/predefine` of the alova core library.
- [**alova/preact**](https://github.com/alovajs/alova/tree/main/src/predefine): [preact](https://preactjs.com/) adapter to make alova compatible [preact](https://preactjs.com/), this module will be added in `src/predefine` of the alova core library.
- [**alova/qwik**](https://github.com/alovajs/alova/tree/main/src/predefine): [qwik](https://qwik.builder.io/) adapter, let alova is compatible with [qwik](https://qwik.builder.io/), this module will be added in `src/predefine` of the alova core library.
- [**@alova/angular**](https://github.com/alovajs/angular): alova’s [angular](https://angularjs.org/) adaptation warehouse.
- [**@alova/miniprogram**](https://github.com/alovajs/miniprogram): alova’s native mini program (China🇨🇳) adaptation warehouse supports [WeChat mini program](https://developers.weixin.qq.com/miniprogram/dev/framework/), [qq applet](https://q.qq.com/wiki/develop/miniprogram/frame/), [byte applet](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/usage-guide) and other small programs that support the `behaviors` attribute.
- [**@alova/lit**](https://github.com/alovajs/lit): alova’s [lit](https://lit.dev/) adaptation repository.
- [**@alova/stencil**](https://github.com/alovajs/stencil): alova’s [stencil](https://stenciljs.com/) adaptation warehouse.

### Request adapters

- [**@alova/adapter-graphql**](https://github.com/alovajs/adapter-graphql): graphql adapter, developed based on graphql client.

### Scenario request modules

The following scene modules are placed in the [@alova/scene](https://github.com/alovajs/scene) warehouse.

- Large file breakpoint resume transfer module.
- A simpler file upload module that can automatically convert the incoming data format into a File object to implement a simpler file upload function.
- Repeat request sending module, used for polling requests, browser tab switching requests, and browser focus requests to ensure the factuality of page data.
- SSE request module, request module based on `EventSource`.

### Development tools

- [**@alova/openapi**](https://github.com/alovajs/openapi): Automatically generate the corresponding `Method` collection according to the openapi configuration file, eliminating the need for developers to write `Method` instances themselves. Supports response data types, API change reminders, etc.

- [**@alova/api-vscode**](https://github.com/alovajs/api-vscode): vscode plug-in, which will automatically generate an API list based on the current project, making it easy to view and manage the APIs in the project Define and provide change reminders.
