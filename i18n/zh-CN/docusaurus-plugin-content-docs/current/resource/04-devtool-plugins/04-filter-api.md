---
title: API过滤器
---

## 介绍

本插件用于根据 URL 或标签（tag）过滤 API 接口，支持多种匹配规则和组合条件。主要功能包括：

- 支持按 URL 或 tag 过滤
- 支持包含（include）和排除（exclude）规则
- 支持字符串、正则表达式或自定义函数匹配
- 支持多条件组合过滤

## 基本使用

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { apiFilter } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // 过滤包含特定 URL 的 API
        apiFilter({ include: '/api/user' })
      ]
    }
  ]
});
```

## 配置参数

```typescript
interface Config {
  /**
   * 过滤范围，默认为 'url'
   * url: 按接口路径过滤
   * tag: 按标签过滤
   */
  scope?: 'url' | 'tag';

  /**
   * 包含规则
   * string: 包含此字符串
   * RegExp: 匹配此正则
   * function: 自定义匹配函数
   */
  include?: string | RegExp | ((key: string) => boolean);

  /**
   * 排除规则
   * string: 包含此字符串
   * RegExp: 匹配此正则
   * function: 自定义匹配函数
   */
  exclude?: string | RegExp | ((key: string) => boolean);
}

function apiFilter(config: Config | Config[]): ApiPlugin;
```

## 多条件配置

```javascript
// 同时配置多个过滤条件
// 最终结果为所有条件的并集
apiFilter([
  {
    scope: 'url',
    include: /^\/api\/user/ // 包含以 /api/user 开头的 URL
  },
  {
    scope: 'tag',
    include: 'admin' // 包含标签为 admin 的 API
  }
]);
```

### 包含与排除组合

```javascript
// 包含特定 URL 但排除部分 API
apiFilter({
  include: /\/api\/user/,
  exclude: '/api/user/list' // 排除 /api/user/list
});
```

> **注意**：当同时指定 `include` 和 `exclude` 时，会从 `include` 的结果中排除 `exclude` 匹配的 API。

### 自定义匹配规则

```javascript
// 使用自定义函数匹配
apiFilter({
  scope: 'url',
  include: key => key.startsWith('/api') && key.length > 10 // 包含以 /api 开头且长度超过 10 的 URL
});
```
