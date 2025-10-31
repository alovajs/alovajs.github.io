---
title: Payload Modifier
---

## Introduction

This plugin is designed to flexibly modify request and response parameters of API interfaces. It supports adding, deleting, and modifying parameter types, as well as adjusting parameter hierarchies via the `flat` feature.

Key features include:

- Supports modifying parameters in the following scopes: `params`, `pathParams`, `data`, and `response`.
- Allows precise control over modification scope using parameter name matching rules (`match`).
- Enables dynamic modification of parameter types and required status via the `handler` function.

## Basic Usage

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { payloadModifier } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // Modify the `userId` field in request parameters
        payloadModifier([
          {
            scope: 'params',
            match: key => key === 'userId',
            handler: schema => {
              return {
                'attr1?': 'string', // Mark as optional
                attr2: 'number', // Mark as required
                attr3: {
                  // Nested data
                  innerAttr: ['string', 'number', 'boolean']
                }
              };
            }
          }
        ])
      ]
    }
  ]
});
```

## Configuration Parameters

### Type Definitions

```typescript
/**
 * Scope of parameter modification
 */
type ModifierScope = 'params' | 'pathParams' | 'data' | 'response';

/**
 * Primitive types
 */
type SchemaPrimitive =
  | 'number'
  | 'string'
  | 'boolean'
  | 'undefined'
  | 'null'
  | 'unknown'
  | 'any'
  | 'never';

/**
 * Array type
 */
type SchemaArray = {
  type: 'array';
  items: Schema;
};

/**
 * Reference type (optional parameters are marked with `?` at the end of the key)
 */
type SchemaReference = {
  [attr: string]: Schema;
};

/**
 * Data Schema (supports union types)
 */
type Schema =
  | SchemaPrimitive
  | SchemaReference
  | SchemaArray
  | Array<SchemaPrimitive | SchemaReference | SchemaArray>
  | { oneOf: Schema[] }
  | { anyOf: Schema[] }
  | { allOf: Schema[] };

/**
 * Configuration interface
 */
interface Config<T extends Schema> {
  /**
   * Scope of application
   */
  scope: ModifierScope;

  /**
   * Matching rule
   * - string: Parameter name contains this string
   * - RegExp: Parameter name matches this regex
   * - function: Custom matching function
   */
  match?: string | RegExp | ((key: string) => boolean);

  /**
   * Parameter modification handler
   * @param schema Current parameter's Schema
   * @returns Returns various parameter types:
   * - Schema: Modified type
   * - { required: boolean, value: Schema }: Marks the parameter as required/optional
   * - void | null | undefined: Removes the field
   */
  handler: (
    schema: T
  ) => Schema | { required: boolean; value: Schema } | void | null | undefined;
}

/**
 * Plugin function
 */
function payloadModifier(configs: Config<Schema>[]): ApiPlugin;
```

### Example Configurations

#### Modify Parameter Type

```javascript
// Change the `age` field in `params` to `number` type
payloadModifier([
  {
    scope: 'params',
    match: 'age',
    handler: () => 'number'
  }
]);
```

#### Modify Nested Parameters

```javascript
// Modify nested parameters in `data`
payloadModifier([
  {
    scope: 'data',
    match: 'user',
    handler: () => ({
      name: 'string',
      age: 'number',
      address: {
        city: 'string',
        zipCode: 'number'
      }
    })
  }
]);
```

#### Remove a Parameter

```javascript
// Remove the `debugInfo` field from `response`
payloadModifier([
  {
    scope: 'response',
    match: 'debugInfo',
    handler: () => undefined
  }
]);
```

#### Union Types

```javascript
// Change the `id` field in `pathParams` to `string | number` type
payloadModifier([
  {
    scope: 'pathParams',
    match: 'id',
    handler: () => ['string', 'number']
  }
]);
```

## Advanced Usage

### Dynamically Modify Required Status

```javascript
// Mark the `email` field in `data` as required
```
