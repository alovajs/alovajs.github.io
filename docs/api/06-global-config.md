---
title: Global Configuration
---

## globalConfig()

Global Configuration.

- **Type**

```ts
function globalConfig(config: AlovaGlobalConfig): void;
```

- **Parameter**

1. config: Configuration

| Parameter name | Type                          | Description                                                                                                                                                                                                                                             |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoHitCache   | 'global' \| 'self' \| 'close' | Default is `global`, `global` means that cache can be invalidated across multiple Alova instances, `self` means that only the cache of the current Alova instance is invalidated, and `close` means that the automatic invalidation cache is turned off |

- **Return**

None

- **Example**

```js
import { globalConfig } from 'alova';

globalConfig({
  autoHitCache: 'self'
});
```
