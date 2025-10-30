---
title: Renaming
---

## Introduction

This plugin is used to rename URLs and parameters of API interfaces, supporting multiple naming styles and custom transformation rules. Key features include:

- Renaming for URLs, request parameters, path parameters, request bodies, response data, and reference type names.
- Built-in naming conversions: camelCase, pascalCase, kebabCase, and snakeCase.
- Support for custom matching rules and transformation functions.
- Support for multi-rule configurations.

## Basic Usage

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { rename } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // Convert underscores in URLs to camelCase
        rename({ style: 'camelCase' })
      ]
    }
  ]
});
```

## Configuration Parameters

```typescript
interface Config {
  /**
   * Scope of application, defaults to 'url'.
   * url: API path
   * params: Query parameters
   * pathParams: Path parameters
   * data: Request body data
   * response: Response data
   * refName: Reference type name
   */
  scope?: 'url' | 'params' | 'pathParams' | 'data' | 'response' | 'refName';

  /**
   * Matching rule. If not specified, all will be converted.
   * string: Contains this string
   * RegExp: Matches this regex
   * function: Custom matching function
   */
  match?: string | RegExp | ((key: string) => boolean);

  /**
   * Naming style.
   * camelCase: camelCase (userName)
   * kebabCase: kebab-case (user-name)
   * snakeCase: snake_case (user_name)
   * pascalCase: PascalCase (UserName)
   */
  style?: 'camelCase' | 'kebabCase' | 'snakeCase' | 'pascalCase';

  /**
   * Custom transformation function.
   * Executed before style conversion.
   */
  transform?: (apiDescriptor: ApiDescriptor) => string;
}

function rename(config: Config | Config[]): ApiPlugin;
```

> **Note** 1. `refName` and `kebabCase` cannot be configured simultaneously because type names cannot be in kebab-case format. 2. `params`, `pathParams`, `data`, and `response` only rename the first-level names.

## Multi-Rule Configuration

```javascript
// Configure multiple transformation rules simultaneously.
// Before: /api/get_data/{item_id}
// After: /api/getData/{itemId}
rename([
  {
    scope: 'url',
    style: 'camelCase',
    match: /_/ // Only convert parts containing underscores
  },
  {
    scope: 'pathParams',
    style: 'camelCase'
  }
]);
```

### Custom Matching Rules

```javascript
// Only rename parameter names longer than 5 characters.
rename({
  scope: 'params',
  match: key => key.length > 5,
  style: 'camelCase'
});
```

### Custom Transformation Function

```javascript
// Rename specific parameters.
rename({
  scope: 'data',
  match: ['user_info', 'order_list'],
  transform: api => {
    const map = {
      user_info: 'user',
      order_list: 'orders'
    };
    return map[api.key] || api.key;
  }
});
```
