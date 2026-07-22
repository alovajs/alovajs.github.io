---
title: Agent Skills
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 用 AI Agent 写 alova（Agent Skills）

如果你用 AI 编码助手（Claude Code / Cursor / CodeBuddy 等）开发，可以直接安装 alova 的 Agent Skills。它们把 alova 的官方最佳实践教给你的 Agent，让它不再靠猜，而是写出正确、地道的 alova 代码。

alova 提供了三个 Agent Skills，按你的场景选装：

| 技能 | 适用 | 覆盖 |
| --- | --- | --- |
| `alova-client` | 客户端 / 前端请求逻辑 | `usePagination`、`useForm`、`useUploader`、`useWatcher`、Token 认证、无感数据交互等全部客户端请求策略 |
| `alova-server` | 服务端请求治理 | `alova/server` 的 `atomize`、`retry`、`createRateLimiter` 等全部服务端请求策略 |
| `worma` | 已有 OpenAPI 规范的项目 | 让 Agent 直接读懂你的接口并生成类型安全的调用代码 |

### 安装

通过 skills CLI 安装：

<Tabs groupId="skill">
<TabItem value="alova-client" label="alova-client">

```bash
npx skills add alovajs/skills --skill alova-client-usage
```

`alova-client` 教你的 Agent 如何编写客户端 alova 代码——从一个 `useRequest` 到全套客户端请求策略。

</TabItem>
<TabItem value="alova-server" label="alova-server">

```bash
npx skills add alovajs/skills --skill alova-server-usage
```

`alova-server` 教你的 Agent 使用 `alova/server` 下的各类钩子，实现限流、重试与分布式原子请求。

</TabItem>
<TabItem value="worma" label="worma">

```bash
npx skills add alovajs/skills --skill worma-guidelines
```

`worma` 把来自 OpenAPI 规范的接口知识交给 Agent，让它能找到正确的接口并生成调用代码。详情见 [worma.js.org](https://worma.js.org)。

</TabItem>
</Tabs>

### 我该装哪个？

- 在写前端 / 客户端应用 → `alova-client`
- 在做服务端请求治理 → `alova-server`
- 已有 OpenAPI 规范、想让 Agent 读懂你的接口 → `worma`

你可以同时安装多个，它们能协同工作——例如 `worma` 提供接口知识，而 `alova-client` 告诉 Agent 如何用 alova 调用这些接口。

> 源码与完整文档：[github.com/alovajs/skills](https://github.com/alovajs/skills)。
