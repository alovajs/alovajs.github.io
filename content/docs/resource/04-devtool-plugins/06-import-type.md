---
title: Type Replacer
---

## Introduction

The `importType` plugin is used to replace custom types in `global.d.ts` by searching and replacing imported names. Key features include:

- Supports batch replacement of imported types in global type definitions
- Supports importing and replacing types from multiple modules
- Supports custom module paths and type names

## Basic Usage

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { importType } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // Replace type imports in `global.d.ts`
        importType({
          bar: ['Apis', 'Foo'], // import { Apis, Foo } from "bar"
          '@types/bar': ['Bar'], // import { Bar } from "@types/bar"
          'vue|type': ['Vue'] // import type { Vue } from "vue"
        })
      ]
    }
  ]
});
```

After this, the automatically generated type definitions like `bar` and `Bar` in `global.d.ts` will be replaced with the user-imported types, thereby modifying the auto-generated types.

## Configuration Parameters

`importType` accepts an object as a parameter, where the keys are module paths and the values are arrays of type names to be imported.

```typescript
interface ImportTypeConfig {
  /**
   * Module path
   * Supports regular module paths (e.g., 'bar') or typed module paths (e.g., 'vue|type')
   */
  [modulePath: string]: string[];
}

function importType(config: ImportTypeConfig): ApiPlugin;
```

### Multi-Module Configuration

```javascript
// Configure type replacements for multiple modules simultaneously
importType({
  bar: ['Apis', 'Foo'],
  '@types/bar': ['Bar'],
  'vue|type': ['Vue']
});
```

### Custom Module Paths

```javascript
// Use typed module paths
importType({
  'vue|type': ['Vue'] // import type { Vue } from "vue"
});
```
