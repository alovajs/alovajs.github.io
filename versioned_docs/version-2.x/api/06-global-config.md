---
title: Global configuration
sidebar_position: 60
---

## globalConfig()

Global configuration.

- **type**

```ts
function globalConfig(config: AlovaGlobalConfig): void;
```

- **Parameters**

1. config: configuration

| Parameter name | Type   | Description                                                                                                                        |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| limitSnapshots | number | method snapshot number limit, set to 0 to disable saving snapshots. After closing, the method snapshot matcher will be unavailable |

- **return**

none

- **Example**

```ts
import { globalConfig } from 'alova';

globalConfig({
  limitSnapshots: 10
});
```
