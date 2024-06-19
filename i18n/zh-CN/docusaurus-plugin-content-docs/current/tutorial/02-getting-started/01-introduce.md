---
title: 介绍alova
---

import Link from '@docusaurus/Link';
import NavCard from '@site/src/components/NavCard';
import SupportList from '@site/src/components/SupportList';

## alova 是什么？

alova 是一个创新的下一代请求工具，从前后端协作和 API 消费作为出发点，将 API 的消费从 7 步简化为只有 1 步，帮你在请求方面省去大部分的工作，让网络请求变得非常简单。我们来看看 alova 是如何帮你的简化工作的。

![](/img/overview_flow_cn.png)

## 如何做的？

### 请求策略

在实际项目中，前端请求总是需要根据不同场景考虑应该什么时候发出请求、什么时候不能发出请求、如何处理响应数据等才能满足项目的表现、性能的提高，这将导致开发人员时间成本和代码维护成本的增加，在 alova 中提供了一套完整的应对复杂请求场景的方案，我们称之为**请求策略**，只需一行代码就能快速实现各种复杂的请求逻辑，不仅能帮你提升开发效率，还能帮你提升 App 的运行效率，降低服务端压力。

例如，`useRequest`可以自动管理请求状态，**`loading/error/data` 是响应式的数据**，在 react、vue、svelte 等 UI 框架中可以直接在视图中绑定它们，而且会根据请求状态自动维护它这些响应式数据。

```javascript
const { loading, error, data } = useRequest(alova.Get('/api/user'));
```

再来一个分页请求策略，**当`page/pageSize`等发生变化时会自动以不同参数触发请求**。

```javascript
const { loading, error, data, page, pageSize, total } = usePagination((page, size) =>
  alova.Get('/api/user/list', {
    params: { page, size }
  })
);
```

alova 提供了 10+个基于[RSM](/about/RSM)规范的请求策略模块，它们以 useHook 的形式实现。

### alova 编辑器扩展

在 vscode 中使用 alova 扩展可以帮你自动生成包含完整的 API 文档标注，响应类型的请求代码，无论是 ts 项目还是 js 项目，你都可以获得完整的接口查询、接口详细信息，以及响应数据类型的智能提示。

这个扩展也优化了 API 的消费流程，感受不一样的 API 使用体验，在过去，你需要先查询 API 文档，并不断地在 API 文档与编辑器切换来编写请求代码，使用 alova 插件后，你可以不再需要离开编辑器，直接在编辑器中边查边使用 API。

> 关于 alova 插件的详细介绍，请参考 [集成编辑器扩展](/next/tutorial/getting-started/extension-integration)。

## 有什么不同吗？

与其他请求库不同的是，alova 的目标是让请求变得非常简单，并且保持更高效的数据交互。

我们为开发者和 App 使用者双方考虑，对于开发者来说，alova 为他们提供了极致的使用体验，对于应用的用户来说，他们可以享受到 alova 的高性能数据交互带来的流畅体验。

此外，再从具体的特性来看看：

- 与 axios 相似的 api 设计，让使用者学习成本更低；
- 高性能的客户端和服务端请求策略，让应用更流畅；
- 灵活性高，alova 的适配器可以让 alova 在任何 js 环境下，与任何 UI 框架协作使用，并且提供了统一的使用体验和完美的代码迁移；
- 2 种缓存模式和请求共享机制，提升请求性能并降低服务端压力；
- api 代码的高聚合组织，每个 api 的请求参数、缓存行为、响应数据转换等都将聚集在相同的代码块中，这对于管理大量的 api 有很大的优势；

:::info 对比

你还可以查看请[与其他请求库比较](/about/comparison)详细了解 alova 的不同之处。

:::

## 在任何 JS 环境下运行

不仅如此，alova 的灵活性非常高，你可以在以下任意的 JS 环境下，配合不同的请求工具使用（灰色部分将在未来逐渐支持）。

<SupportList showStatus></SupportList>

## 在线试用

你可以通过 Codesandbox [在线可编辑示例尝试 alovajs](/category/examples)直接在浏览器中运行项目，因此它与本地开发几乎无差别，同时无需在你的机器上安装任何东西。

## 脚手架推荐

<NavCard list={[
{
Image: <img src="https://codercup.github.io/unibest-docs/logo.svg"/>,
title: 'Uniapp 脚手架 - unibest',
desc: '集成了最新前端技术栈的跨端解决方案',
link: 'https://codercup.github.io/unibest-docs/',
target: '__blank'
}
]}></NavCard>

## 加入 alova 社区

import ImgDiscord from '@site/static/img/discord.svg';
import ImgX from '@site/static/img/x.svg';
import ImgWechat from '@site/static/img/wechat.svg';
import wechatQrcode from '@site/static/img/wechat_qrcode.jpg';

<NavCard list={[
{
Image: <ImgDiscord />,
title: 'Discord',
desc: '社区的 GPT 机器人为你解答',
link: 'https://discord.gg/S47QGJgkVb',
target: '__blank'
},
{
Image: <ImgWechat />,
title: '微信',
desc: '在群聊交流，更快获得回应',
link: wechatQrcode,
target: '__blank'
},
{
Image: <ImgX />,
title: 'X',
desc: '关注我们，持续获得最新动态',
link: 'https://x.com/alovajs',
target: '__blank'
}
]}></NavCard>

## 欢迎参与贡献

在参与贡献前，请务必详细阅读 [贡献指南](/next/contributing/overview)，以保证你的有效贡献。

## 开始

接下来，我们将从最简单的请求开始，再到请求策略的讲解，了解 alova 如何简化你的工作，再深入到进阶指南，以及在实际项目中总结的最佳实践。

让我们开始学习发送第一个请求吧！

<NavCard list={[
{
title: '第一个请求',
desc: '尝试使用 alova 发送第一个请求',
link: '/tutorial/getting-started/quick-start',
}
]}></NavCard>
