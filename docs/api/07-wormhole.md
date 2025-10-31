---
title: wormhole API
---

`@alova/wormhole` is a more modern openAPI generation solution for the alova library. It can generate API functions, complete API types, and complete API documents at the same time. Alova's development tools can eliminate the intermediate API documents for you, shortening the collaboration distance between the front-end and back-end like a wormhole. It is also the underlying implementation of the vscode extension.

## Installation

```bash
# npm
npm i @alova/wormhole --save-dev
# yarn
yarn add @alova/wormhole --dev
# pnpm
pnpm add @alova/wormhole -D
```

:::info extension installation tips

If you are using vscode, it is strongly recommended that you use `@alova/wormhole` with alova's vscode extension. Please refer to [OpenAPI Integration](/tutorial/getting-started/openapi-integration) to install vscode extension
.

If you are using other editors, you can also use the `@alova/wormhole` command to generate complete API information.

:::

## Commands

### gen

```bash
alova gen [-f, --force] [-c --cwd <path>] [-w --workspace]
```

gen will look for the `alova.config.{cjs,js,mjs,ts}` configuration file and use it to automatically generate API related information.

**Parameters:**

- **-f, --force**: By default, the latest openAPI file will be checked for updates. If this parameter is specified, the check will be ignored and regeneration will be forced.

- **-c, --cwd \<path\>**: Specify the working directory of the configuration file to be generated. The default is the current directory.

- **-w, --workspace**: Specifies whether to generate in workspace mode. It will search for configuration files based on `workspaces` in `package.json` or subpackages defined in `pnpm-workspace.yaml`, and generate API-related information for all subpackages.

### init

```bash
alova init [-t, --type <type>] [-c --cwd <path>]
```

Generate alova.config configuration file in the current directory. It will automatically generate configuration files with different suffixes according to the project type.

**Parameters: **

- **-t, --type**: Specifies the type of configuration file to be generated. The optional values ​​are: `auto/ts/typescript/module/commonjs`. The default is `auto`. It will automatically generate configuration files with different suffixes according to the project type.

- **-c, --cwd \<path\>**: Specifies the working directory of the configuration file to be generated. The default is the current directory.

## Node API

### createConfig()

Create a configuration file.

- **Type**

```ts
type TemplateType = 'typescript' | 'module' | 'commonjs';
interface ConfigCreationOptions {
  projectPath?: string;
  type?: TemplateType;
}
declare function createConfig(options?: ConfigCreationOptions): Promise<void>;
```

- **Parameter**

1. `projectPath`: project path, default is `process.cwd()`.
2. `type`: configuration file type, optional values ​​are `typescript`, `module`, `commonjs`.

- **Example**

```ts
import { createConfig } from '@alova/wormhole';

await createConfig();
```

### resolveWorkspaces()

Search for all directories containing alova.config configuration files under the monorepo project. It will search for configuration files based on `workspaces` in `package.json` or subpackages defined in `pnpm-workspace.yaml`

```ts
declare function resolveWorkspaces(projectPath?: string): Promise<string[]>;
```

- **Parameter**

1. `projectPath`: The project path to search, defaults to `process.cwd()`.

- **Return value**

An array of relative paths to directories containing alova.config configuration files.

- **Example**

```ts
import { resolveWorkspaces } from '@alova/wormhole';
const workspaces = await resolveWorkspaces();
```

### readConfig()

Read the alova.config configuration file and return the parsed configuration object.

```ts
declare function readConfig(projectPath?: string): Promise<Config>;
```

- **Parameter**

1. `projectPath`: The project path where the configuration file is located. The default value is `process.cwd()`.

- **Return value**

Configuration object.

```ts
import { generate } from '@alova/wormhole';
const config = await readConfig();
```

### generate()

Generate relevant API information based on the configuration object. Generally, it needs to be used with `readConfig()`.

```ts
type GenerateApiOptions = {
  force?: boolean;
  projectPath?: string;
};
declare function generate(config: Config, rules?: GenerateApiOptions): Promise<boolean[]>;
```

- **Parameters**

1. `config`: configuration object, which is usually read by `readConfig` function.
2. `rules`: generation rules, optional parameters are:
   - `force`: whether to force regeneration, the default is `false`.
   - `projectPath`: project path, the default is `process.cwd()`.

- **Return value**

An array that contains the result of `generator` items in configuration whether generation is successful.

- **Example 1**

Configuration files only exist in the root directory.

```ts
import { readConfig, generate } from '@alova/wormhole';

const config = await readConfig();
const results = await generate(config);
```

- **Example 2**

Configuration files exist in multiple subpackages (monorepo).

```ts
import { readConfig, generate, resolveWorkspaces } from '@alova/wormhole';
const workspaces = await resolveWorkspaces();
for (const workspace of workspaces) {
  const config = await readConfig(workspace);
  await generate(config);
}
```
