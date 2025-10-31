---
title: wormhole API
---

`@alova/wormhole` 是专为 alova 库提供的更现代化的 openAPI 生成方案，它可以同时生成 API 函数、完整的 API 类型，和完整的 API 文档，alova 的开发工具可以为你消除中间的 API 文档，像虫洞一样拉近前后端的协作距离，它也是作为 vscode 扩展的底层实现。

## 安装

```bash
# npm
npm i @alova/wormhole --save-dev
# yarn
yarn add @alova/wormhole --dev
# pnpm
pnpm add @alova/wormhole -D
```

:::info 扩展安装提示

如果你正在使用 vscode，强烈建议你将`@alova/wormhole`配合 alova 的 vscode 扩展一起使用，安装 vscode 扩展，请参考[OpenAPI集成](/tutorial/getting-started/openapi-integration)。

如果你正在使用其他编辑器，你也可以通过`@alova/wormhole`的命令来生成完整的 API 信息。

:::

## Commands

### gen

```bash
alova gen [-f, --force] [-c --cwd <path>] [-w --workspace]
```

gen 将会查找`alova.config.{cjs,js,mjs,ts}`配置文件并使用它自动生成 API 相关信息。

**参数：**

- **-f, --force**：默认情况下，将会检查最新的 openAPI 文件是否有更新，指定此参数后将会忽略检查，并强制重新生成。

- **-c, --cwd \<path\>**：指定要生成的配置文件的工作目录，默认为当前目录。

- **-w, --workspace**：指定是否以 workspace 的方式生成，它将会根据`package.json`中的`workspaces`，或`pnpm-workspace.yaml`中定义的子包来查找配置文件，并生成所有子包的 API 相关信息。

### init

```bash
alova init [-t, --type <type>] [-c --cwd <path>]
```

在当前目录下生成 alova.config 配置文件，它将会根据项目类型自动生成不同后缀的配置文件。

**参数：**

- **-t, --type**：指定要生成的配置文件类型，可选值有：`auto/ts/typescript/module/commonjs`，默认为`auto`，它将根据项目类型自动生成不同后缀的配置文件。

- **-c, --cwd \<path\>**：指定要生成的配置文件的工作目录，默认为当前目录。

## Node API

### createConfig()

创建配置文件。

- **类型**

```ts
type TemplateType = 'typescript' | 'module' | 'commonjs';
interface ConfigCreationOptions {
  projectPath?: string;
  type?: TemplateType;
}
declare function createConfig(options?: ConfigCreationOptions): Promise<void>;
```

- **参数**

1. `projectPath`：项目路径，默认为`process.cwd()`。
2. `type`：配置文件类型，可选值为`typescript`、`module`、`commonjs`。

- **示例**

```ts
import { createConfig } from '@alova/wormhole';

await createConfig();
```

### resolveWorkspaces()

查找 monorepo 项目下所有包含 alova.config 配置文件的目录，它将会根据`package.json`中的`workspaces`，或`pnpm-workspace.yaml`中定义的子包来查找配置文件

```ts
declare function resolveWorkspaces(projectPath?: string): Promise<string[]>;
```

- **参数**

1. `projectPath`: 查找的项目路径，默认为`process.cwd()`。

- **返回值**

包含 alova.config 配置文件的目录相对路径的数组。

- **示例**

```ts
import { resolveWorkspaces } from '@alova/wormhole';
const workspaces = await resolveWorkspaces();
```

### readConfig()

读取 alova.config 配置文件，并返回解析后的配置对象。

```ts
declare function readConfig(projectPath?: string): Promise<Config>;
```

- **参数**

1. `projectPath`: 配置文件所在的项目路径，默认为`process.cwd()`。

- **返回值**

配置对象。

```ts
import { generate } from '@alova/wormhole';
const config = await readConfig();
```

### generate()

根据配置对象生成相关 API 信息，一般需要与 `readConfig()` 一起使用。

```ts
type GenerateApiOptions = {
  force?: boolean;
  projectPath?: string;
};
declare function generate(config: Config, rules?: GenerateApiOptions): Promise<boolean[]>;
```

- **参数**

1. `config`: 配置对象，它一般通过`readConfig`函数读取。
2. `rules`: 生成规则，可选参数有：
   - `force`: 是否强制重新生成，默认为`false`。
   - `projectPath`: 项目路径，默认为`process.cwd()`。

- **返回值**

一个数组，数组元素包含 config 中的`generator`项是否生成成功。

- **示例 1**

配置文件只存在于根目录下。

```ts
import { readConfig, generate } from '@alova/wormhole';

const config = await readConfig();
const results = await generate(config);
```

- **示例 2**

配置文件存在于多个子包中（monorepo）。

```ts
import { readConfig, generate, resolveWorkspaces } from '@alova/wormhole';

const workspaces = await resolveWorkspaces();
for (const workspace of workspaces) {
  const config = await readConfig(workspace);
  await generate(config);
}
```
