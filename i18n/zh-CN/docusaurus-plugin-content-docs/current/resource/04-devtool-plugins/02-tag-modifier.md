---
title: tags修改器
---

## 介绍

本插件用于修改来自OpenAPI文件中，API 的 `tags`。

## 基本使用

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { tagModifier } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // 每个api都会调用回调函数，返回新的tag。如果不希望修改某个tag，可以直接返回原tag。
        tagModifier(tag => tag.toUpperCase()); // 示例：将 tag 转为大写
      ]
    }
  ]
});
```

## 配置参数

```typescript
type ModifierHandler = (tag: string) => string;

function tagModifier(handler: ModifierHandler): ApiPlugin;
```

- `handler`: 一个函数，接收当前 `tag` 作为参数，返回修改后的 `tag`。如果不希望修改，可以直接返回原 `tag`。

## 示例

### 示例1：统一添加前缀

```javascript
// 为所有 tags 添加 "api_" 前缀
tagModifier(tag => `api_${tag}`);
```

### 示例2：过滤特定 tags

```javascript
// 只修改包含 "user" 的 tags
tagModifier(tag => {
  if (tag.includes('user')) {
    return tag.replace('user', 'member');
  }
  return tag; // 其他 tags 保持不变
});
```

### 示例3：转换为驼峰命名

```javascript
// 将 tags 转换为驼峰命名
tagModifier(tag => {
  return tag
    .split('_')
    .map((part, index) => {
      if (index === 0) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
});
```
