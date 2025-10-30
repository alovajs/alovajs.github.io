---
title: Plugin Development Guide
---

A devtool plugin is an object that contains various lifecycle hooks for injecting custom logic during code generation, simplifying the control of code generation logic.

Additionally, `@alova/wormhole` provides preset plugins that can be used directly.

import DocCardList from '@theme/DocCardList';

<DocCardList />

Next, we will detail how to create and use plugins.

### Plugin Definition

```ts
interface ApiPlugin {
  name?: string;

  /**
   * Replace or manipulate the configuration object passed to wormhole.
   * Returning undefined or null will not replace anything.
   */
  config?: (config: GeneratorConfig) => MaybePromise<GeneratorConfig | undefined | null | void>;

  /**
   * Called before parsing the OpenAPI file.
   */
  beforeOpenapiParse?: (config: GeneratorConfig) => void;

  /**
   * Manipulate the document after parsing the OpenAPI file.
   * Returning undefined or null will not replace anything.
   */
  afterOpenapiParse?: (
    document: OpenAPIDocument
  ) => MaybePromise<OpenAPIDocument | undefined | null | void>;

  /**
   * Manipulate template data before generating code.
   * Returning undefined or null will not replace anything.
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
   * Called after code generation is complete.
   */
  afterCodeGenerate?: (error?: Error) => void;
}
```

### Lifecycle Hooks Explained

1. **`config`**

   - **Purpose**: Replace or manipulate the configuration object passed to `wormhole`.
   - **Use Case**: Dynamically modify the generator's global configuration.

2. **`beforeOpenapiParse`**

   - **Purpose**: Called before parsing the OpenAPI file.
   - **Use Case**: Access the complete config for pre-processing.

3. **`afterOpenapiParse`**

   - **Purpose**: Manipulate the document after parsing the OpenAPI file.
   - **Use Case**: Modify the parsed OpenAPI document, such as adding or removing fields.

4. **`beforeCodeGenerate`**

   - **Purpose**: Manipulate template data before generating code.
   - **Use Case**: Dynamically modify template data or filenames.

5. **`afterCodeGenerate`**
   - **Purpose**: Called after code generation is complete.
   - **Use Case**: Handle errors during generation or perform follow-up actions.

### Example Code

Here is a simple plugin example for modifying tags.

```ts
import { createPlugin } from '@alova/wormhole';

interface Config {
  match: (tag: any) => boolean;
  handler: (tag: any) => any;
}
const createTagModifierPlugin = createPlugin((config: Config) => ({
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
      console.error('[tag-modifier] Error during code generation:', error);
    } else {
      console.log('[tag-modifier] Code generation complete!');
    }
  }
}));
```

Using the Plugin

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

For more example code, visit the [Official Preset Plugin Source](https://github.com/alovajs/devtools/tree/main/packages%2Fwormhole%2Fsrc%2Fplugins%2Fpresets).
