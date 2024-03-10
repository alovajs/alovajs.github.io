---
title: Getting Started
---

import NavCard from '@site/src/components/NavCard';
import SupportList from '@site/src/components/SupportList';

## alova 是什么

alova 是一个轻量级的请求策略库，除了提供基础的请求功能，还支持开发者使用声明式实现例如响应缓存、请求共享、分页请求、表单提交、断点续传等各种较复杂的请求，让开发者使用非常少量的代码就可以实现高可用性和高流畅性的请求功能，这意味着，你只需要按场景使用不同请求模块即可，这能帮你提升开发效率、应用运行效率，还能降低服务端压力。

最简单的请求与 axios 使用方式相同：

```javascript
const response = await alova.Get('/api/user');
```

让我们再看一个自动管理请求状态的示例，**loading、error、data 是响应式状态**，在 react、vue、svelte 等 UI 框架中可以直接在视图中绑定它们，而且会根据请求进度自动更新状态值。

```javascript
const { loading, error, data } = useRequest(alova.Get('/api/user'));
```

以下是一个分页请求策略的示例，**当 page/pageSize 等发生变化时会自动以不同参数触发请求**。

```javascript
const { loading, error, data, page, pageSize, total } = usePagination((page, size) =>
  alova.Get('/api/user/list', {
    params: { page, size }
  })
);
```

得益于 alova 的高灵活性，你可以在以下不同 JS 环境下搭配不同的请求库使用，并且提供了 [10+个请求策略模块](/category/strategy)。

<SupportList showStatus></SupportList>

## 为什么选择 alova

与其他请求库不同的是，alova 旨在简化请求逻辑，并保持高效的数据交互，它为复杂请求场景提供不同的请求策略。

我们为开发者和应用使用者双方面考虑，对于开发者来说，alova 为他们提供了简单的请求 api，和开箱即用的高性能请求策略模块，对于应用的用户来说，他们可以享受到 alova 的高性能数据交互带来的流畅体验。

此外，再从具体的特性来看看：

- 与 axios 相似的 api 设计，让使用者学习成本更低；
- 10+个开箱即用的高性能请求策略，让应用更流畅；
- alova 是轻量级的，只有 4kb+，是 axios 的 30%+；
- 灵活性高，alova 的适配器可以让 alova 在任何 js 环境下，与任何 UI 框架协作使用（内置支持的 UI 框架为`vue/react/svelte`），并且提供了统一的使用体验和完美的代码迁移；
  -. 3 种数据缓存模式，提升请求性能，同时降低服务端压力；
- 使用 alova 还能实现 api 代码的高聚合组织方式，每个 api 的请求参数、缓存行为、响应数据转换等都将聚集在相同的代码块中，这对于管理大量的 api 有很大的优势；

:::info 与其他请求库的对比

你还可以查看请[与其他请求库比较](/tutorial/others/comparison)详细了解 alova 的不同之处。

:::

## 在线试用

你可以通过 Codesandbox [在线可编辑示例尝试 alovajs](/category/examples)直接在浏览器中运行项目，因此它与本地开发几乎无差别，同时无需在你的机器上安装任何东西。

## 加入交流社区

- [加入在 Discord 社区参与交流](https://discord.gg/S47QGJgkVb)
- [加入微信群参与交流](/img/wechat_qrcode.jpg)

## 欢迎参与贡献

在参与贡献前，请务必详细阅读 [贡献指南](/contributing/overview)，以保证你的有效贡献。

## 开始

接下来，我们将从最简单的请求开始，再到请求策略的讲解，再深入到进阶指南，以及在实际项目中总结的最佳实践。

让我们开始学习发送第一个请求吧！

<NavCard list={[
{
title: '第一个请求',
desc: '尝试使用 alova 发送第一个请求',
link: '/tutorial/getting-started/first-request',
}
]}></NavCard>
