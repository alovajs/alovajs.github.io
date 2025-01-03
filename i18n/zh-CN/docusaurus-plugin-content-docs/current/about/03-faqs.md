---
title: FAQs
---

## 为什么创造 alova？

数据请求一直是应用程序必不可少的重要部分，自从 XMLHttpRequest 诞生以来请求方案层出不穷，客户端的数据交互探索一直聚焦于请求的简单性，如`$.ajax`、`axios`、`fetch api`以及`react-query`等请求工具，编码形式从回调函数、Promise，再到 usehook 不断发展，这些 js 库在请求简单性上已经做得很好了，不过它们只提供了通用的功能，这意味着对于不同的请求场景例如共享请求、分页请求、表单提交、上传和下载文件等，开发者依然需要自己编写复杂的代码，降低开发效率，性能也无法得到保证，在越来越看重的用户体验的时代，应用的流畅性变得越来越重要。

同时，客户端和服务端的协作也是割裂的，前端工程师需要查阅 API 文档并手动编写 API 函数，并且服务端 API 的任何更改都需要主动通知前端工程师，这将会使产品变得更加不可控。

**而我们认为还有更简单的方案，即根据请求场景，例如分页、表单提交、断点续传等，选择对应的 useHook，它将帮你管理数据，控制何时应该发送请求**。从而让开发者在编写少量代码也能实现更高效地 Client-Server 数据交互。

同时，alova 具有很灵活的扩展能力来实现不同场景下的请求策略，你也可以自定义自己的请求场景，这部分内容在[自定义章节](/tutorial/advanced/custom)。

为了覆盖更多请求场景，我们还将请求场景抽象成了 [请求场景模型（RSM）](/about/RSM)，它很好地解释了 alova 的请求策略方案。在未来，alova 将承载着我们对请求策略的探索之路继续前行。

## 替代请求库？

alova 是一个请求策略库，它的创建初衷是对不同请求场景提供特定的请求策略解决方案，从而更简洁优雅地实现流畅的请求体验，而例如`$.ajax`、`axios`和`fetch-api`等对请求发送和响应接收提供了很好的支持，它们是 [RSM](/about/RSM) 流程中必不可少的一个环节（请求事件），alova 仍然需要依靠它们进行请求，因此我们可以将 alova 看作是请求库的一种武装，让请求库变得更加强大。

## 为什么要深度绑定 UI 框架？

对一个 js 库来说解耦意味着更多场景下的使用，例如 axios 可以在 nodejs 中使用，但同时意味着开发者需要写更多的模板代码，比如使用 useHooks 封装 axios 等。而 alova 摒弃了解耦带来的更多使用场景，将使用范围定位在与 UI 框架配合使用，以最精简的方式使用 alova，这是为了开发者的收益方面而考量的，在一个 UI 框架盛行的时候，深度绑定可以为开发者提供直接使用的功能，提升开发者的使用体验，而不需要太多的模板代码。

## 为什么请求方法使用 PascalCase 规范？

有别于 axios 的的请求方法，以 GET 请求为例，`axios.get`是一个请求动作，而 alova.Get 则是创建一个 method 实例，实际还没有发送请求。

## Troubleshooting

前往[Troubleshooting](/tutorial/project/troubleshooting)查看。
