---
title: 全局配置
---

## globalConfig()

全局配置。

- **类型**

```ts
function globalConfig(config: AlovaGlobalConfig): void;
```

- **参数**

1. config: 配置

| 参数名       | 类型                          | 说明                                                                                                                    |
| ------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| autoHitCache | 'global' \| 'self' \| 'close' | 默认为`global`，`global`是可以跨多个 alova 实例失效缓存，`self`是只失效当前 alova 实例的缓存，`close`是关闭自动失效缓存 |
| ssr          | boolean \| undefined          | 默认为`undefined`，即交由 alova 来判断自身是否运行在服务端下                                                            |

- **返回**

无

- **示例**

```js
import { globalConfig } from 'alova';

globalConfig({
  autoHitCache: 'self',
  ssr: true
});
```
