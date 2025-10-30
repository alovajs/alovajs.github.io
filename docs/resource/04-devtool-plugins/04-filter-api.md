---
title: API Filter
---

## Introduction

This plugin is used to filter API interfaces based on URLs or tags, supporting multiple matching rules and combination conditions. Key features include:

- Filter by URL or tag
- Support for include and exclude rules
- Support for string, regular expression, or custom function matching
- Support for multi-condition combination filtering

## Basic Usage

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { apiFilter } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // Filter APIs containing a specific URL
        apiFilter({ include: '/api/user' })
      ]
    }
  ]
});
```

## Configuration Parameters

```typescript
interface Config {
  /**
   * Filter scope, defaults to 'url'
   * url: Filter by API path
   * tag: Filter by tag
   */
  scope?: 'url' | 'tag';

  /**
   * Include rule
   * string: Include this string
   * RegExp: Match this regex
   * function: Custom matching function
   */
  include?: string | RegExp | ((key: string) => boolean);

  /**
   * Exclude rule
   * string: Include this string
   * RegExp: Match this regex
   * function: Custom matching function
   */
  exclude?: string | RegExp | ((key: string) => boolean);
}

function apiFilter(config: Config | Config[]): ApiPlugin;
```

## Multi-Condition Configuration

```javascript
// Configure multiple filter conditions simultaneously
// The final result is the union of all conditions
apiFilter([
  {
    scope: 'url',
    include: /^\/api\/user/ // Include URLs starting with /api/user
  },
  {
    scope: 'tag',
    include: 'admin' // Include APIs with the 'admin' tag
  }
]);
```

### Combining Include and Exclude

```javascript
// Include specific URLs but exclude certain APIs
apiFilter({
  include: /\/api\/user/,
  exclude: '/api/user/list' // Exclude /api/user/list
});
```

> **Note**: When both `include` and `exclude` are specified, the result will exclude APIs matched by `exclude` from the `include` result.

### Custom Matching Rules

```javascript
// Use a custom function for matching
apiFilter({
  scope: 'url',
  include: key => key.startsWith('/api') && key.length > 10 // Include URLs starting with /api and longer than 10 characters
});
```
