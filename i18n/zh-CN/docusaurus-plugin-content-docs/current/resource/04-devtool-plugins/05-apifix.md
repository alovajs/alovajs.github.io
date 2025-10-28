---
title: Apifox 拉取器
---

## 介绍

本插件用于直接从 Apifox 导入 OpenAPI 文档，无需手动导出本地文件到项目中。主要功能包括：

- 支持从 Apifox 项目直接拉取 OpenAPI 文档
- 支持按标签筛选接口范围
- 支持多种 OpenAPI 版本和导出格式
- 支持自定义 Apifox 扩展属性和文件夹标签

使用此插件后不再需要设置`input`字段。

## 基本使用

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { apifox } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // 从 Apifox 项目拉取 OpenAPI 文档
        apifox({
          projectId: 'proj-123',
          apifoxToken: 'token-abc'
        })
      ]
    }
  ]
});
```

## 配置参数

```typescript
interface APIFoxBody {
  scope?: {
    type?: 'ALL' | 'SELECTED_TAGS';
    selectedTags?: string[];
    excludedByTags?: string[];
  };
  options?: {
    includeApifoxExtensionProperties?: boolean;
    addFoldersToTags?: boolean;
  };
  oasVersion?: '2.0' | '3.0' | '3.1';
  exportFormat?: 'JSON' | 'YAML';
  environmentIds?: string[];
}

interface ApifoxOptions
  extends Pick<APIFoxBody, 'oasVersion' | 'exportFormat'>,
    Pick<
      NonNullable<APIFoxBody['options']>,
      'includeApifoxExtensionProperties' | 'addFoldersToTags'
    > {
  projectId: string;
  apifoxToken: string;
  locale?: string;
  apifoxVersion?: string;
  selectedTags?: string[];
  excludedByTags?: string[];
}

function apifox(ApifoxOptions: ApifoxOptions): ApiPlugin;
```

### 参数说明

| 参数名                             | 类型                      | 默认值   | 描述                     |
| ---------------------------------- | ------------------------- | -------- | ------------------------ |
| `projectId`                        | `string`                  | -        | Apifox 项目 ID           |
| `apifoxToken`                      | `string`                  | -        | Apifox 访问令牌          |
| `locale`                           | `string`                  | -        | 语言环境                 |
| `apifoxVersion`                    | `string`                  | -        | Apifox API 版本          |
| `selectedTags`                     | `string[]`                | -        | 按标签筛选接口           |
| `excludedByTags`                   | `string[]`                | -        | 排除指定标签的接口       |
| `oasVersion`                       | `'2.0' \| '3.0' \| '3.1'` | `'3.0'`  | OpenAPI 版本             |
| `exportFormat`                     | `'JSON' \| 'YAML'`        | `'JSON'` | 导出格式                 |
| `includeApifoxExtensionProperties` | `boolean`                 | `false`  | 是否包含 Apifox 扩展属性 |
| `addFoldersToTags`                 | `boolean`                 | `false`  | 是否将文件夹路径作为标签 |

## 高级用法

### 按标签筛选接口

```javascript
// 仅拉取带有特定标签的接口
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  selectedTags: ['order', 'user']
});
```

### 排除指定标签的接口

```javascript
// 排除带有特定标签的接口
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  excludedByTags: ['test', 'deprecated']
});
```

### 自定义 OpenAPI 版本和导出格式

```javascript
// 使用 OpenAPI 3.1 和 YAML 格式
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  oasVersion: '3.1',
  exportFormat: 'YAML'
});
```

### 包含 Apifox 扩展属性

```javascript
// 包含 Apifox 扩展属性
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  includeApifoxExtensionProperties: true
});
```
