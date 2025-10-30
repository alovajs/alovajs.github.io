---
title: 插件开发指南
---

开发工具插件是一个对象，内部包含了各种不同生命周期的钩子（hooks），用于在代码生成过程中注入自定义逻辑，简化代码生成的逻辑控制。

此外，`@alova/wormhole` 中还提供了预设的插件，可直接使用。

import DocCardList from '@theme/DocCardList';

<DocCardList />

接下来，我们将详细介绍如何创建和使用插件。

### 插件接口

```ts
interface ApiPlugin {
  name?: string;

  /**
   * 替换或操作传递给 wormhole 的配置对象。
   * 返回 undefined, null 不会替换任何内容。
   */
  config?: (config: GeneratorConfig) => MaybePromise<GeneratorConfig | undefined | null | void>;

  /**
   * 在解析 OpenAPI 文件之前调用。
   */
  beforeOpenapiParse?: (config: GeneratorConfig) =>  void;

  /**
   * 在解析 OpenAPI 文件之后操作文档。
   * 返回 undefined, null 不会替换任何内容。
   */
  afterOpenapiParse?: (
    document: OpenAPIDocument
  ) => MaybePromise<OpenAPIDocument | undefined | null | void>;

  /**
   * 在生成代码之前操作模板数据。
   * 返回 undefined, null 不会替换任何内容。
   */
  beforeCodeGenerate?: (
    data: any,
    outputFile: string,
    ctx: {
      renderTemplate: () => Promise<string>;
      fileName: string;
    }
  ) => MaybePromise<string | undefined | null | void>;

  /**
   * 在代码生成完成后调用。
   */
  afterCodeGenerate?: (error?: Error) => void;
}
```

### 生命周期钩子详解

1. **`config`**

   - **作用**：替换或操作传递给 `wormhole` 的配置对象。
   - **使用场景**：动态修改生成器的全局配置。

2. **`beforeOpenapiParse`**

   - **作用**：在解析 OpenAPI 文件之前调用。
   - **使用场景**：获取完整的config配置，进行一些自定义操作。

3. **`afterOpenapiParse`**

   - **作用**：在解析 OpenAPI 文件之后操作文档。
   - **使用场景**：修改解析后的 OpenAPI 文档，例如添加或删除某些字段。

4. **`beforeCodeGenerate`**

   - **作用**：在生成代码之前操作模板数据。
   - **使用场景**：动态修改模板数据或文件名等。

5. **`afterCodeGenerate`**
   - **作用**：在代码生成完成后调用。
   - **使用场景**：处理生成过程中的错误或执行后续操作。

### 示例代码

以下是一个简单的修改tag的插件示例。

```ts
interface Config {
  match: (tag: any) => boolean;
  handler: (tag: any) => any;
}
const createTagModifierPlugin = (config: Config): ApiPlugin => ({
  afterOpenapiParse: apiDescription => {
    if (apiDescription.tags) {
      apiDescription.tags = apiDescription.tags.map(tag => {
        if (config.match(tag)) {
          return config.handler(tag);
        }
        return tag;
      });
    }
    return apiDescription;
  },
  afterCodeGenerate: error => {
    if (error) {
      console.error('[tag-modifier] 生成代码时出错：', error);
    } else {
      console.log('[tag-modifier] 代码生成完成！');
    }
  }
});
```

使用插件

```javascript title="alova.config.js"
export default defineConfig({
  generator: [
    {
      // ...
      createTagModifierPlugin({
        match: tag => tag.includes('foo'),
        handler: tag => tag.replace('foo', 'bar')
      })
    }
  ]
});
```

如果希望更多示例代码，请前往[官方预设插件源码](https://github.com/alovajs/devtools/tree/main/packages%2Fwormhole%2Fsrc%2Fplugins%2Fpresets)
