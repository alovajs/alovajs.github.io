---
title: Global Configuration
---

## globalConfig()

Configures alova globally.

- **Type**

```ts
function globalConfig(config: AlovaGlobalConfig): void;
```

- **Parameter**

1. `config`: The global configuration.

| Parameter name | Type                          | Description                                                                                                                                                                                                                                             |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoHitCache   | 'global' \| 'self' \| 'close' | Defaults to `global`. `global` invalidates the cache across multiple alova instances; `self` invalidates only the current alova instance's cache; `close` disables automatic cache invalidation. |
| ssr            | boolean \| undefined          | Defaults to `undefined`, letting alova decide whether it is running on the server.                                                                                                                                            |

- **Return**

None

- **Example**

```js
import { globalConfig } from 'alova';

globalConfig({
  autoHitCache: 'self',
  ssr: true
});
```
