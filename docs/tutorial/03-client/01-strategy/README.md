---
title: Client Strategy
---

import DocCardList from '@theme/DocCardList';

Like using a component library, just learn it when you need a request strategy!

All client use hooks have the following in common:

1. They all rely on statesHook, please [set statesHook](/next/tutorial/getting-started/basic/combine-framework) before using.

2. Their return values ​​all contain the `update` function, which is used to actively update the exported state value.

3. For performance under react, all operation functions such as `send`, `update`, `abort`, etc. are wrapped with `useCallback`.

## Table of contents

<DocCardList />
