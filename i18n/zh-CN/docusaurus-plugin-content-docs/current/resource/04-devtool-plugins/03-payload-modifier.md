---
title: 参数修改器
---

## 介绍

本插件用于灵活修改 API 接口的请求和响应参数，支持增加、删除、修改参数类型，以及通过 `flat` 修改参数层级。

主要功能包括：

- 支持对 `params`、`pathParams`、`data`、`response` 范围的参数进行修改
- 支持通过参数名匹配规则（`match`）精确控制修改范围
- 支持通过 `handler` 函数动态修改参数类型和必填性

## 基本使用

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { payloadModifier } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // 修改请求参数中的 `userId` 字段
        payloadModifier([
          {
            scope: 'params',
            match: key => key === 'userId',
            handler: schema => {
              return {
                'attr1?': 'string', // 生成为可选参数
                attr2: 'number', // 生成为必填参数
                attr3: {
                  // 嵌套数据
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

## 配置参数

### 类型定义

```typescript
/**
 * 参数修改范围
 */
type ModifierScope = 'params' | 'pathParams' | 'data' | 'response';

/**
 * 基本类型
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
 * 数组类型
 */
type SchemaArray = {
  type: 'array';
  items: Schema;
};

/**
 * 引用类型（可选参数通过在 key 末端添加 `?` 表示）
 */
type SchemaReference = {
  [attr: string]: Schema;
};

/**
 * 数据 Schema（支持联合类型）
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
 * 配置接口
 */
interface Config<T extends Schema> {
  /**
   * 生效范围
   */
  scope: ModifierScope;

  /**
   * 匹配规则
   * - string: 原参数名包含此字符串
   * - RegExp: 原参数名匹配此正则
   * - function: 自定义匹配函数
   */
  match?: string | RegExp | ((key: string) => boolean);

  /**
   * 参数修改处理器
   * @param schema 当前参数的 Schema
   * @returns 返回多种参数，具体为：Schema表示修改的类型；
   * { required: boolean, value: Schema }表示可将当前值修改为是否必填；
   * void | null | undefined表示移除当前字段
   */
  handler: (
    schema: T
  ) => Schema | { required: boolean; value: Schema } | void | null | undefined;
}

/**
 * 插件函数
 */
function payloadModifier(configs: Config<Schema>[]): ApiPlugin;
```

### 示例配置

#### 修改参数类型

```javascript
// 将 `params` 中的 `age` 字段修改为 `number` 类型
payloadModifier([
  {
    scope: 'params',
    match: 'age',
    handler: () => 'number'
  }
]);
```

#### 修改嵌套参数

```javascript
// 修改 `data` 中的嵌套参数
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

#### 移除参数

```javascript
// 移除 `response` 中的 `debugInfo` 字段
payloadModifier([
  {
    scope: 'response',
    match: 'debugInfo',
    handler: () => undefined
  }
]);
```

#### 联合类型

```javascript
// 将 `pathParams` 中的 `id` 字段修改为 `string | number` 类型
payloadModifier([
  {
    scope: 'pathParams',
    match: 'id',
    handler: () => ['string', 'number']
  }
]);
```

## 高级用法

### 动态修改必填性

```javascript
// 将 `data` 中的 `email` 字段修改为必填
payloadModifier([
  {
    scope: 'data',
    match: 'email',
    handler: () => ({ required: true, value: 'string' })
  }
]);
```

### 可选参数与必填参数

在 `SchemaReference` 中，通过在参数名末尾添加 `?` 表示可选参数，否则为必填参数。例如：

```javascript
// 将 `data` 中的 `username` 设为必填，`age` 设为可选
payloadModifier([
  {
    scope: 'data',
    match: 'user',
    handler: () => ({
      username: 'string', // 必填参数
      'age?': 'number' // 可选参数
    })
  }
]);
```

### 使用正则匹配

```javascript
// 修改所有以 `_date` 结尾的参数为 `string` 类型
payloadModifier([
  {
    scope: 'params',
    match: /_date$/,
    handler: () => 'string'
  }
]);
```

### 支持 `oneOf`、`anyOf`、`allOf`

```javascript
// 使用数组定义多选一参数
payloadModifier([
  {
    scope: 'data',
    match: 'paymentMethod',
    handler: () => ([
      { type: 'string', cardNumber: 'string' },
      { type: 'number', email: 'string' }
    ])
  }
]);

// 使用 `oneOf` 定义多选一参数
payloadModifier([
  {
    scope: 'data',
    match: 'paymentMethod',
    handler: () => ({
      oneOf: [
        { type: 'string', cardNumber: 'string' },
        { type: 'number', email: 'string' }
      ]
    })
  }
]);

// 使用 `anyOf` 定义可选参数组合
payloadModifier([
  {
    scope: 'data',
    match: 'contactMethod',
    handler: () => ({
      anyOf: [
        { email: 'string', value: 'string' },
        { phone: 'string', value: 'number' }
      ]
    })
  }
]);

// 使用 `allOf` 定义参数组合
payloadModifier([
  {
    scope: 'data',
    match: 'userProfile',
    handler: () => ({
      allOf: [{ name: 'string' }, { age: 'number' }]
    })
  }
]);
```
