---
title: 类型替换器
---

## 介绍

`importType` 插件用于替换 `global.d.ts` 中需要自定义的类型，通过引入名称查找和替换。主要功能包括：

- 支持批量替换全局类型定义中的引入类型
- 支持多模块引入和类型替换
- 支持自定义模块路径和类型名称

## 基本使用

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { importType } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // 替换 global.d.ts 中的类型引入
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

此时，`global.d.ts`中自动生成的`bar`、`Bar`等类型定义会被替换为用户引入的类型，从而修改自动生成的类型。

## 配置参数

`importType` 接受一个对象作为参数，对象的键为模块路径，值为需要引入的类型名称数组。

```typescript
interface ImportTypeConfig {
  /**
   * 模块路径
   * 支持普通模块路径（如 'bar'）或带类型的模块路径（如 'vue|type'）
   */
  [modulePath: string]: string[];
}

function importType(config: ImportTypeConfig): ApiPlugin;
```

### 多模块配置

```javascript
// 同时配置多个模块的类型替换
importType({
  bar: ['Apis', 'Foo'],
  '@types/bar': ['Bar'],
  'vue|type': ['Vue']
});
```

### 自定义模块路径

```javascript
// 使用带类型的模块路径
importType({
  'vue|type': ['Vue'] // import type { Vue } from "vue"
});
```
