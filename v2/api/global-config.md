## globalConfig()

Global configuration.

- **Type**
```ts
function globalConfig(config: AlovaGlobalConfig): void;
```

- **Parameters**

1. config: configuration

| Parameter name | Type   | Description                                                                                                                        |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| limitSnapshots | number | method snapshot number limit, set to 0 to disable saving snapshots. After closing, the method snapshot matcher will be unavailable |

- **Return**
none

- **Example**

```ts
import { globalConfig } from 'alova';

globalConfig({
  limitSnapshots: 10
});
```
