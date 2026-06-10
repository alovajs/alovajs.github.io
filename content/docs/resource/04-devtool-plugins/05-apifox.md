---
title: Apifox Fetcher
---

## Introduction

This plugin is used to directly import OpenAPI documents from Apifox without manually exporting local files to the project. Key features include:

- Supports fetching OpenAPI documents directly from Apifox projects
- Supports filtering interfaces by tags
- Supports multiple OpenAPI versions and export formats
- Supports custom Apifox extension properties and folder tags

After using this plugin, there is no need to set the `input` field.

## Basic Usage

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { apifox } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // Fetch OpenAPI documents from an Apifox project
        apifox({
          projectId: 'proj-123',
          apifoxToken: 'token-abc'
        })
      ]
    }
  ]
});
```

## Configuration Parameters

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

### Parameter Descriptions

| Parameter Name                     | Type       | Default        | Description                         |
| ---------------------------------- | ---------- | -------------- | ----------------------------------- |
| `projectId`                        | `string`   | -              | Apifox project ID                   |
| `apifoxToken`                      | `string`   | -              | Apifox access token                 |
| `locale`                           | `string`   | `'zh-CN'`      | Language environment                |
| `apifoxVersion`                    | `string`   | `'2024-03-28'` | Apifox API version                  |
| `selectedTags`                     | `string[]` | -              | Filter interfaces by tags           |
| `excludedByTags`                   | `string[]` | -              | Exclude interfaces by tags          |
| `oasVersion`                       | `'2.0'     | '3.0'          | '3.1'`                              |
| `exportFormat`                     | `'JSON'    | 'YAML'`        | `'JSON'`                            |
| `includeApifoxExtensionProperties` | `boolean`  | `false`        | Include Apifox extension properties |
| `addFoldersToTags`                 | `boolean`  | `false`        | Use folder paths as tags            |

## Advanced Usage

### Filter Interfaces by Tags

```javascript
// Fetch only interfaces with specific tags
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  selectedTags: ['order', 'user']
});
```

### Exclude Interfaces by Tags

```javascript
// Exclude interfaces with specific tags
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  excludedByTags: ['test', 'deprecated']
});
```

### Custom OpenAPI Version and Export Format

```javascript
// Use OpenAPI 3.1 and YAML format
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  oasVersion: '3.1',
  exportFormat: 'YAML'
});
```

### Include Apifox Extension Properties

```javascript
// Include Apifox extension properties
apifox({
  projectId: 'proj-123',
  apifoxToken: 'token-abc',
  includeApifoxExtensionProperties: true
});
```
