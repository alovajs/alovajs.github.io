alova 的 OpenAPI 集成能力现已独立为单独项目 —— **[worma](https://worma.js.org)**。
worma 脱胎于 `@alova/wormhole`，是其官方、通用化的继任者：只需指向一份 OpenAPI 规范，
它便能生成类型安全的调用代码、TypeScript 类型、编辑器内 API 文档，以及 AI 友好的接口知识，且对 alova 开箱即用。

它能为你带来：
1. 自动生成类型安全的调用代码与响应类型 —— 即使在纯 JS 项目中也能体验。
2. 将 API 文档直接嵌入编辑器，无需离开编辑器即可查看每个接口详情。
3. 定时刷新接口并主动通知你 —— 不再等待服务端开发人员。

👉 [前往 worma 文档](https://worma.js.org/docs)

进一步参考：
- [alova 模板](https://worma.js.org/docs/template-system/predefined-templates) —— 为你的接口生成 alova 调用代码。
- [生成数据修改](https://worma.js.org/docs/plugin-system/builtin-plugins) —— 通过内置插件修改生成结果。

> 正在使用 `@alova/wormhole`？参见 [从 wormhole 迁移](https://worma.js.org/docs/migration/from-wormhole)。
