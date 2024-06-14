---
title: 全局配置
sidebar_position: 60
---

## globalConfig()

全局配置。

- **类型**

```ts
function globalConfig(config: AlovaGlobalConfig): void;
```

- **参数**

1. config: 配置

| 参数名         | 类型   | 说明                                                                             |
| -------------- | ------ | -------------------------------------------------------------------------------- |
| limitSnapshots | number | method 快照数量限制，设置为 0 表示关闭保存快照，关闭后 method 快照匹配器将不可用 |

- **返回**

无

- **示例**

```ts
import { globalConfig } from 'alova';

globalConfig({
  limitSnapshots: 10
});
```
