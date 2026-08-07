# react-query 还是 alova：看请求跑不跑出浏览器

选数据请求库，通常开头都是「谁的缓存更好」。这个问题跳过了一个事后才咬人的点：你的请求到底跑在哪？

如果你的请求全在浏览器里、而且用 React，react-query 是成熟、踩坑少的选择。可一旦你需要同一套请求逻辑跑在「不是 React Native 的手机端」，或者跑在一个调下游服务的 BFF 里，地图就变了。alova 把这些情况收到了同一套 API 下。这篇是直来直去的对比，也包括 alova 更弱的地方。

## react-query 明显领先的地方

先讲诚实的一面：

- **和 React 贴合。** react-query 是围着 React 的渲染模型建的。`useQuery` 这类 hook 天然嵌进组件，它的 devtools 和查询面板是这个领域里最顺手的。
- **缓存成熟度。** 它的缓存、去重、后台重拉、stale-while-revalidate，在大量生产应用里被反复验证过。
- **社区与答案。** 这么多年的 Stack Overflow、博客、能直接抄的片段，意味着大部分问题网上已经有人解过了。

如果你的前端是 React、只在浏览器里、你也对这个生态满意，react-query 是更稳的默认。说反话是不诚实的。

## alova 走得更远的地方

alova 也是请求策略层，但它不绑死某个框架或某个运行时：

- **一套 API 跨运行时。** 同一套 `useRequest`、`usePagination` 调用，跑在 Web、移动端（React Native / Expo / uni-app / Taro / 小程序）、以及服务端（Node BFF）。请求逻辑你只写一遍。
- **服务端 hook。** `alova/server` 给 BFF 的出站调用加了 `retry` 和 `createRateLimiter`，这一层 react-query 管不到，因为它活在浏览器里。
- **框架任选。** React、Vue、Svelte、Solid 都有一等公民级别的 hook，混合技术栈的团队不必被绑进 React。
- **站在你现有的适配器上。** alova 自己不发请求，它跑在 fetch 或 axios 适配器之上，所以你已经在用 axios 的话，它继续干活。

## 逐项对照

| 关注点 | react-query | alova |
| --- | --- | --- |
| 主运行时 | 浏览器（React） | Web、移动端、服务端（BFF） |
| 框架 | React 优先 | React / Vue / Svelte / Solid |
| 客户端缓存 | 极佳、成熟 | 不错，策略 hook |
| 服务端重试 / 限流 | 不归它管 | `alova/server` hook |
| 跨端 App | 仅 React Native | React Native、Expo、uni-app、Taro、小程序 |
| 自己发 HTTP | 否（底层 fetch/axios） | 否（fetch/axios 适配器） |
| 社区规模 | 非常大 | 较小 |

最后一行说明：两个库都不替代 axios。它们都坐在请求适配器之上，所以团队已经在用 axios 的话，发请求还是它的活。

## 什么时候 react-query 更对

- 前端是 React、只在浏览器，你想要最深的 React 缓存生态。
- 你不跑一个需要出站重试/限流的 BFF。
- 团队已经熟 react-query，用它出活快。

## 什么时候 alova 更合适

- 你要跨 Web、非 React Native 的 App、Node BFF 维护同一套请求逻辑。
- 你的 BFF 需要对下游调用做退避重试加客户端限流（见 [BFF 重试那篇](/blog/bff-retry)）。
- 你在用 Vue/Svelte/Solid，或混合栈，想要一个策略层。

## 什么情况下两个都不需要

如果你就发几个请求，手写 `loading`/`data`/`error` 三个状态也不重复，那 `fetch` 加一个小封装就够了。两个库只有在「同一类请求模式反复出现」时才值回票价。

- [alova 与其他库对比](https://alova.js.org/about/comparison)
- [服务端重试策略](https://alova.js.org/tutorial/server/strategy/retry)
