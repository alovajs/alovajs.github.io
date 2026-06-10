---
title: Tag Modifier
---

## Introduction

This plugin is used to modify the `tags` of APIs from OpenAPI files.

## Basic Usage

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { tagModifier } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // Each API will call the callback function to return a new tag. If you don't want to modify a tag, return the original tag directly.
        tagModifier(tag => tag.toUpperCase()); // Example: Convert tag to uppercase
      ]
    }
  ]
});
```

## Configuration Parameters

```typescript
type ModifierHandler = (tag: string) => string;

function tagModifier(handler: ModifierHandler): ApiPlugin;
```

- `handler`: A function that takes the current `tag` as a parameter and returns the modified `tag`. If you don't want to modify it, return the original `tag` directly.

## Examples

### Example 1: Add a Prefix

```javascript
// Add "api_" prefix to all tags
tagModifier(tag => `api_${tag}`);
```

### Example 2: Filter Specific Tags

```javascript
// Only modify tags containing "user"
tagModifier(tag => {
  if (tag.includes('user')) {
    return tag.replace('user', 'member');
  }
  return tag; // Keep other tags unchanged
});
```

### Example 3: Convert to Camel Case

```javascript
// Convert tags to camel case
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
