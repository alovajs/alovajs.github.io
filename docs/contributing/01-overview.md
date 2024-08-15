---
title: Contribution Guidelines
---

Hello, I'm glad to meet you here. This is a detailed alova contribution guide, which contains detailed guidance on contributions to all aspects of alova. Please continue reading.

## Preface

In the past period of time, we have received active participation from developers around the world in Github issues and Github Discussions. We are deeply honored, which means that alova is being loved by more and more developers. Even so, alova is still a rookie, and it still has a long way to go.

**We hope to make alova a common project for everyone who is willing to participate. We encourage everyone to become a contributor to the alova community with an open and inclusive attitude. Moreover, we believe that contributing to Alova is not limited to code contribution, but participating in any activities that are beneficial to the development of Alova is contributing to Alova. ** Now participating in contributions can win you more effective contribution opportunities. It allows you to provide your value to developers all over the world. Even if you are a junior developer, as long as your ideas are in line with [Alova's mission and design concept](#alova-mission and design concept), please participate generously!

> Here is a [Community Code of Conduct](./code-of-conduct), please refer to it.

## Contribution Directory

Here are 13 possible contributions for you to choose from, but not limited to these. You can choose the part you want to participate in and link to the corresponding location for detailed reading:

- [use alova in your project](#use-alova-in-your-project)
- [star alova](#star-alova)
- [report bug](#report-bug)
- [Propose new feature ideas](#propose-new-feature-ideas)
- [Pull Request](#pull-request)
- [Create an adapter or strategy library based on alova](#create-an-adapter-or-strategy-library-based-on-alova)
- [Participate in community/PR review](#participate-in-communitypr-review)
- [Publish and spread alova](#publish-and-spread-alova)
- [Share experience](#share-experience)
- [Collaboration](#collaboration)
- [Donation](#donation)
- [Correct or add docs](#correct-or-add-docs)
- [Translate docs](#translate-docs)

## Alova Mission and Design Concept

### Alova Mission

Alova's mission points out a clear development direction for it, and it clearly defines what Alova should do.

Alova is a request tool that can run in a full JS environment and focuses on request strategies. It mainly helps developers to reduce the consumption process of APIs to the extreme and improve efficiency. We believe that this is the direction of the next generation of request tools. **Its mission is to enable developers to achieve more efficient Client-Server data interaction while writing a small amount of code**.

For developers, alova provides them with simple APIs and out-of-the-box advanced request functions, as well as various simple and high-performance request strategy modules. For application users, they can enjoy the smooth experience brought by alova's high-performance data interaction. Therefore, alova has the following features:

1. The API design similar to axios makes the learning cost of users lower;

2. Deep binding UI framework greatly improves the use benefits of developers;

3. Out-of-the-box advanced functions avoid repeated encapsulation, such as request sharing, request caching, etc., to reduce developers' repeated encapsulation;

4. Platform-independent coding method, which can be perfectly migrated on different platforms;

5. Highly scalable design, which can encapsulate highly reusable and high-performance business-related request strategies;

6. Highly aggregated and low-coupled method design improves the maintainability of API code;

### alova design concept

The design concept points out how it should be designed. The following is the core design concept of alova.

1. Method proxy design, a highly aggregated, platform-independent design that runs through the request. You should be able to access it in any request function. From another perspective, request-related information should also be placed in the method instance;
2. State proxy design, which is our key technology to achieve UI framework independence. It allows alova's useHooks to run in different UI frameworks, so please use state proxy when writing useHooks;
3. High scalability design. First, alova's design uses a lot of adapter patterns and hook functions, such as adapters such as `requestAdapter`, `l1Cache/l2Cache`, etc., and hook functions such as `beforeRequest`, `reseponded`, `transform`, `cacheFor`, etc., and most of them have default behaviors. The purpose of this design is to keep high scalability while being simple enough to use; second, global request parameters can be overwritten, such as `timeout`, `shareRequest`, etc., and these parameters can be set separately for special requests.
4. The API design is universal. First, it means that the API function has a higher level of abstraction, rather than being proposed for a specific business; second, the API design is extensible to adapt to the iteration of the API

> The universal API design is only applicable to the Alova library. If you are conceiving a request strategy, you can design it according to the specific business.

## Select the contribution point you are interested in

### Use Alova in your project

We believe that you are also a contributor to Alova if you use Alova in your project. This is also telling people that Alova is a trustworthy open source project. Please submit your project in [this issue](https://github.com/alovajs/alova/issues/165), which may give you the opportunity to display your project on the Alova official website.

### Star alova

Although this may be considered insignificant, it represents your recognition of alova. Every star is also very important to alova. Please light up the star for us in the upper right corner of [alova's Github repository](https://github.com/alovajs/alova). This is very important to us.

### Report bug

Please go to [Github new issue](https://github.com/alovajs/alova/issues/new/choose) and select the corresponding template to submit. Detailed instructions will be shown in the submitted issue.

**Please note:** If you want to ask questions related to alova, please create it in [Github Discussion](https://github.com/alovajs/alova/discussions). Asking questions in the issue will be closed immediately.

### Propose new feature ideas

In order for alova to achieve its value and goals, please read the [alova mission and design philosophy](#alova-Mission and Design Philosophy) carefully before submitting a new feature idea, and ensure that your new idea is in line with alova's mission and design philosophy.

Then, please submit it in [🚀 New Feature Proposal](https://github.com/alovajs/alova/issues/new?assignees=&labels=feature-request&projects=&template=FEATURE_REQUEST_zh-CN.yml), and detailed instructions will be displayed when submitting the issue.

### Pull Request

You can contribute the following 3 aspects of code through pull request. If you are a new partner who is interested in participating, all the `good first issue` issues are listed in the [Github Contribution List](https://github.com/alovajs/alova/contribute), which is used to tell new partners who are interested in participating in the contribution. This is a good start.

#### Bug fixes

Issues marked as [`bug:confirmed`](https://github.com/alovajs/alova/labels/bug%3Aconfirmed) in Github issues are all confirmed bugs, and you can choose freely.

If you encounter a bug yourself, please [report the bug](#report-bug) first to ensure that the bug is confirmed to avoid invalid pull requests.

#### New feature development

Issues marked as [`feature-request:confirmed`](https://github.com/alovajs/alova/labels/feature-request%3Aconfirmed) in Github issues are all confirmed new features, and you can choose freely.

If you have an idea for adding a new feature, please [submit an issue for a new feature idea](#propose a new feature idea) first to ensure that the idea is confirmed to avoid invalid pull requests.

#### Project Configuration

If you are good at project configuration and find the shortcomings of the alova project, such as incomplete configuration, old configuration version, insufficient automation (including project development automation and Github repository management automation), you can also contribute according to the [New Feature Development](#New Feature Development) process.

:::warning Important

1. Please read the [Development Guidelines](./developing-guidelines) carefully before development, which can guide you step by step on how to contribute code.

2. When you identify an issue that needs to be resolved, please make sure it is not marked by someone else's pull request, which means it has been occupied by someone else.

:::

### Create an adapter or strategy library based on alova

alova provides highly extensible features, and you can write your own js library based on it.

#### Custom Adapter

Customize various adapters to meet the operating requirements in different environments. The following directions can be used for reference:

1. Customize statesHook to meet the execution under different UI frameworks, such as `solid/qwik`. Currently, `react/vue/svelte` is built-in. Please read [Customize statesHook](/tutorial/advanced/custom/stateshook);

2. Customize request adapters to allow alova to collaborate with more request schemes, such as `GraphQL/SSE`, etc. Please read [Customize request adapters](/tutorial/advanced/custom/http-adapter);

3. Customize storage adapters to meet the storage requirements of different environments, such as `react-native`, please read [Customize storage adapter](/tutorial/advanced/custom/storage-adapter);

4. Any combination of the above, such as the official [uniapp Adapter](https://github.com/alovajs/alova/tree/main/packages/adapter-uniapp), which includes request adapter and storage adapter.

#### Custom request strategy

Request strategy can help developers write high-performance functions more efficiently. Although the official [alova/client](/tutorial/client/strategy) and [alova/server](/tutorial/server/strategy) provide some commonly used request strategies, they are not enough to meet the various request-related business scenarios of developers. It is a good choice to customize your own reusable request strategy based on alova. You can also publish them to npm for everyone to use. Please read [Custom client strategy](/tutorial/advanced/custom/client-strategy) and [Custom server strategy](/tutorial/advanced/custom/server-strategy).

:::tip Submit your project

If you have written a JS library based on alova, please submit your project in [this issue](https://github.com/alovajs/alova/issues/165), which will give your project the opportunity to be displayed on the alova official website.

:::

### Participate in community/PR review

If you are interested in technical communication, then participating in more community communication may be more suitable for you. You can participate in the discussion of bugs and new features in Github issues, or answer questions for others in [Github Discussion](https://github.com/alovajs/alova/discussions), [Discord](https://discord.gg/S47QGJgkVb) or [WeChat group chat](/img/wechat_qrcode.jpg), which allows you to communicate with people from all over the world, which is a very interesting thing.

At the same time, you can also participate in PR review in [pull request](https://github.com/alovajs/alova/pulls), which is also a topic of communication.

### Publish and spread alova

You can publish or forward any information that is beneficial to the development of alova on any social platform, short video platform, or technology sharing platform, which is conducive to increasing the influence of alova. We will select relevant articles or videos and display them on the alova official website. Here are some good articles:

- [It’s time to replace your axios](https://medium.com/@huzhen555/its-time-to-replace-your-axios-12c014833b04)
- [Alova.js 筆記－試用相較 axios 更輕量、更高集成的請求庫](https://uu9924079.medium.com/alova-js-%E7%AD%86%E8%A8%98-%E8%A9%A6%E7%94%A8%E7%9B%B8%E8%BC%83-axios-%E6%9B%B4%E8%BC%95%E9%87%8F-%E6%9B%B4%E9%AB%98%E9%9B%86%E6%88%90%E7%9A%84%E8%AB%8B%E6%B1%82%E5%BA%AB-546ec5424df9)

### Share experience

If you have experience with alova worth sharing, or better practice cases, you can share them in [Github Discussion Practices](https://github.com/alovajs/alova/discussions/categories/practices), and the better sharing will also be displayed in the official document.

### Collaboration

We welcome project cooperation with any organization or individual, which can help us expand the influence of alova and accelerate the development of the project. If you have any cooperation suggestions or intentions, please send an email to **hujou555@gmail.com** to contact us.

### Donation

You can donate to the project through the following three channels. Please visit the donation page for donation privileges.

1. [Github sponsors](https://github.com/sponsors/alovajs)
2. [OpenCollective](https://opencollective.com/alova)
3. [afdian](https://afdian.net/a/huzhen555)

### Correct or add docs

If you need to add new document content, or find errors in alova's documents, such as wrong examples, wrong words, incorrect descriptions, or unmentioned content, you can [create a new document repository issue](https://github.com/alovajs/alovajs.github.io/issues/new) or [create a new document repository pull request](https://github.com/alovajs/alovajs.github.io/fork) to modify the error directly. This should be a better choice. We welcome any suggestions or contributions to the document.

### Translate docs

If you are good at different languages, you are welcome to translate the alova documents, which will help expand the scope and audience of alova.

## Become a core team member

For details, please refer to [here](./become-core-member)
