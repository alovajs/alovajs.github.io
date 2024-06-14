---
title: Server Strategy
---

import DocCardList from '@theme/DocCardList';

Like using a component library, you can learn it when you need a specific request strategy!

The following is the specification of server hooks, which receives a method instance and returns a new method instance, so it is very convenient to combine multiple server hooks.

```ts
/**
 * Server hook model, representing the types of all server hooks.
 * Pass a method or hooked method instance, set options, and return a hooked method instance.
 * You can continue to modify this method to achieve the effect of combining multiple server hooks.
 */
export interface AlovaServerHook<Options extends Record<string, any>> {
  (method: Method, options: Options): Method;
}
```

## Table of contents

<DocCardList />
