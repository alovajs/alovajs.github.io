---
title: 重命名
---

## 介绍

本插件用于对 API 接口的 URL 和参数进行重命名转换，支持多种命名风格和自定义转换规则。主要功能包括：

- 支持 URL/请求参数/路径参数/请求体/响应数据的重命名
- 内置驼峰式（camelCase）和下划线式（underscore）命名转换
- 支持自定义匹配规则和转换函数
- 支持多规则配置

## 基本使用

```javascript title="alova.config.js"
import { defineConfig } from '@alova/wormhole';
import { rename } from '@alova/wormhole/plugin';

export default defineConfig({
  generator: [
    {
      // ...
      plugin: [
        // 将URL中的下划线转为驼峰命名
        rename({ style: 'camelCase' })
      ]
    }
  ]
});
```

## 配置参数

```typescript
interface Config {
  /**
   * 生效范围，默认为'url'
   * url: 接口路径
   * params: 查询参数
   * pathParams: 路径参数
   * data: 请求体数据
   * response: 响应数据
   */
  scope?: 'url' | 'params' | 'pathParams' | 'data' | 'response';

  /**
   * 匹配规则，不指定则转换全部
   * string: 包含此字符串
   * RegExp: 匹配此正则
   * function: 自定义匹配函数
   */
  match?: string | RegExp | ((key: string) => boolean);

  /**
   * 命名风格
   * camelCase: 驼峰命名(userName)
   * underscore: 下划线命名(user_name)
   */
  style?: 'camelCase' | 'underscore';

  /**
   * 自定义转换函数
   * 会在style转换前执行
   */
  transform?: (apiDescriptor: ApiDescriptor) => string;
}

function rename(config: Config | Config[]): ApiPlugin;
```

## 多规则配置

```javascript
// 同时配置多个转换规则
// 转换前: /api/get_data/{item_id}
// 转换后: /api/getData/{itemId}
rename([
  {
    scope: 'url',
    style: 'camelCase',
    match: /_/ // 只转换包含下划线的部分
  },
  {
    scope: 'pathParams',
    style: 'camelCase'
  }
]);
```

### 自定义匹配规则

```javascript
// 只转换长度超过5的参数名
rename({
  scope: 'params',
  match: key => key.length > 5,
  style: 'camelCase'
});
```

### 自定义转换函数

```javascript
// 将特定参数重命名
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

> **注意**：转换完成后建议检查命名是否符合规范，特别是使用自定义转换时。
