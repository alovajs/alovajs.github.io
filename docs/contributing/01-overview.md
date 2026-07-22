---
title: Contribution Guidelines
---

Hello, and welcome! This is alova's detailed contribution guide, covering how to contribute in all areas. Please keep reading.

## Preface

Over the past while, we have received active participation from developers around the world through GitHub issues and GitHub Discussions. We are deeply honored that alova is loved by more and more developers. Even so, alova is still young and has a long way to go.

**We hope to make alova a shared project for everyone willing to take part. We welcome everyone to become an alova community contributor with an open and inclusive attitude. We also believe contributing to alova is not limited to code — any activity that helps alova grow counts as a contribution. ** Contributing now gives you more meaningful opportunities to create value for developers worldwide. Even if you are a junior developer, as long as your ideas align with [Alova's mission and design concept](#alova-mission and design concept), please join us!**

> Here is a [Community Code of Conduct](./code-of-conduct), please refer to it.

## Contribution Directory

Here are 13 possible ways to contribute (not an exhaustive list). Pick the area you want to help with and follow the link for details:

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

Alova is a request tool that runs in any JS environment and focuses on request strategies. It helps developers minimize the effort of consuming APIs and boosts efficiency. We believe this is the direction of the next generation of request tools. **Its mission is to let developers achieve more efficient client-server data interaction while writing very little code.**

For developers, alova provides simple APIs, out-of-the-box advanced request features, and various lightweight, high-performance request strategy modules. For end users, it delivers the smooth experience of high-performance data interaction. As a result, alova has these features:

1. The API design similar to axios makes the learning cost of users lower;

2. Deep binding UI framework greatly improves the use benefits of developers;

3. Out-of-the-box advanced functions avoid repeated encapsulation, such as request sharing, request caching, etc., to reduce developers' repeated encapsulation;

4. Platform-independent coding method, which can be perfectly migrated on different platforms;

5. Highly scalable design, which can encapsulate highly reusable and high-performance business-related request strategies;

6. Highly aggregated and low-coupled method design improves the maintainability of API code;

### alova design concept

The design philosophy explains how alova should be designed. The following are its core design concepts.

1. Method proxy design: a highly cohesive, platform-independent design that runs through the whole request. You should be able to access it from any request function, and request-related data should live on the method instance;
2. State proxy design: the key technique behind UI-framework independence. It lets alova's useHooks run in different UI frameworks, so use state proxies when writing useHooks;
3. Highly extensible design. First, alova uses many adapter patterns and hooks, such as the `requestAdapter` and `l1Cache`/`l2Cache` adapters and the `beforeRequest`, `responded`, `transform`, and `cacheFor` hooks, most of which have default behavior. This keeps alova extensible while staying simple to use. Second, global request parameters such as `timeout` and `shareRequest` can be overridden per request.
4. A universal API design. First, it means the API is highly abstracted rather than built for one specific business; second, it is extensible enough to adapt as the API evolves.

> The universal API design applies only to the alova library. When designing a request strategy, you can tailor it to your specific business.

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

If you are skilled at project configuration and spot gaps in the alova project — incomplete or outdated config, or missing automation (for development or GitHub repo management) — you can contribute following the [New Feature Development](#New Feature Development) process.

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

Request strategies help developers write high-performance features more efficiently. The official [alova/client](/tutorial/client/strategy) and [alova/server](/tutorial/server/strategy) provide common strategies, but they may not cover every business scenario. Customizing your own reusable strategy on top of alova is a great option, and you can publish it to npm for others to use. See [Custom client strategy](/tutorial/advanced/custom/client-strategy) and [Custom server strategy](/tutorial/advanced/custom/server-strategy).

:::tip Submit your project

If you have written a JS library based on alova, please submit your project in [this issue](https://github.com/alovajs/alova/issues/165), which will give your project the opportunity to be displayed on the alova official website.

:::

### Participate in community/PR review

If you enjoy technical discussion, community participation may suit you best. You can discuss bugs and features in GitHub issues, or help others in [GitHub Discussions](https://github.com/alovajs/alova/discussions), [Discord](https://discord.gg/S47QGJgkVb), or our [WeChat group](/img/wechat_qrcode.jpg). You'll meet people worldwide, which is a lot of fun.

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

If you want to add documentation or found errors — wrong examples, typos, inaccurate descriptions, or missing content — you can [open a docs repo issue](https://github.com/alovajs/alovajs.github.io/issues/new) or [open a docs repo pull request](https://github.com/alovajs/alovajs.github.io/fork) to fix it directly. Either way is welcome; we appreciate any documentation suggestions or contributions.

### Translate docs

If you are good at different languages, you are welcome to translate the alova documents, which will help expand the scope and audience of alova.

## Become a core team member

For details, please refer to [here](./become-core-member)
