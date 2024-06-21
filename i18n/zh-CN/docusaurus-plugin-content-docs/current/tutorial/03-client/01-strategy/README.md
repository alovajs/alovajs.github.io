---
title: 客户端策略
---

import DocCardList from '@theme/DocCardList';

像使用组件库一样，当你需要特定的请求策略的时候再学习它就可以了！

所有的客户端 use hooks 都有以下共同点：

1. 它们都依赖 statesHook，请在使用前[设置 statesHook](/next/tutorial/getting-started/basic/combine-framework)。

2. 它们的返回值中都包含`update`函数，用于主动更新导出的状态值。

3. 在 react 下为了性能表现，所有的操作函数例如`send`、`update`、`abort`等都使用了`useCallback`包装过。

4. 以`on`开头的绑定函数都可以进行链式调用。

## 目录

<DocCardList />
