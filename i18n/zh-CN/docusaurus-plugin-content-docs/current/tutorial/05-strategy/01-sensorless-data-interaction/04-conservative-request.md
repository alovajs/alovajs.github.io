---
title: 步骤1-以保守请求实现功能
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

以 Todo 管理为示例，来实现 Todo 在无感交互模式下的创建、编辑、删除等功能，在接下来的章节中将提供请求相关的关键代码。

> 这里的[简单列表页示例](/tutorial/example/silent-submit-simple-list)包含了完整的代码，你可以进入体验。

在`@alova/scene-*`js 包中，将使用 **useSQRequest** 来替代 alova 提供的 **useRequest**，接下来先以最常见的保守请求模式来实现，再一步一步处理无感交互模式的兼容性。

## 创建 alova 实例和相关 method

```javascript title="api.js"
import { createAlova } from 'alova';

export const alovaInst = createAlova({
  /*...*/
});

/** 加载todo列表 */
const todoList = () => alovaInst.Get('/todo');

/** 加载todo详情 */
const todoDetail = id =>
  alovaInst.Get('/todo', {
    params: { id }
  });

/** 创建、编辑todo项 */
const createOrEditTodo = (data, id) =>
  alovaInst.Post('/todo', {
    data,
    id
  });

/** 删除todo项 */
const deleteTodo = id => alovaInst.Delete('/todo', { id });
```

这部分与[开始的章节](/tutorial/getting-started/quick-start)相同，不再重复说明。

## 启动静默工厂

```javascript title="main.js"
import { bootSilentFactory } from '@alova/scene-*';
import { alovaInst } from './api.js';

bootSilentFactory({
  alova: alovaInst
});
```

## 加载 Todo 列表

以最简单的方式加载并展示页面数据

```javascript
import { useSQRequest } from '@alova/scene-vue';
import { todoList } from './api.js';
const { data, loading, error } = useSQRequest(todoList, {
  initialData: []
});
```

## 进入 Todo 创建/编辑页

创建 todo 项时，id 为空，不发送详情获取请求，编辑 todo 项时，id 有值，将获取详情数据。

```javascript
import { useSQRequest } from '@alova/scene-*';
import { todoDetail } from './api.js';

const id = /* todo id */;
const { loading, data } = useSQRequest(() => todoDetail(id), {
  initialData: {
    title: '',
    time: new Date()
  },
  immediate: !!id
});
```

## 创建/编辑 Todo 项

通过提交事件触发请求，提交成功后调用 fetch 重新拉取最新的列表数据，界面将自动展示最新数据。

```javascript
import { useFetcher } from 'alova';
import { useSQRequest } from '@alova/scene-*';
import { createOrEditTodo, todoList } from './api.js';

const id = /* todo id */;
const { loading, data, send, onSuccess } = useSQRequest(createOrEditTodo, {
  immediate: false,
});

const { fetch } = useFetcher();
onSuccess(() => {
  // 重新拉取列表数据
  fetch(todoList);
})

// 提交事件回调函数
const handleSubmit = newData => {
  send(newData, id);
};

```

## 删除 Todo 项

通过 id 删除对应的 todo 项

```javascript
import { useSQRequest } from '@alova/scene-*';
import { deleteTodo, todoList } from './api.js';

const { loading, data, send, onSuccess } = useSQRequest(deleteTodo, {
  immediate: false
});

const { fetch } = useFetcher();
onSuccess(() => {
  // 重新拉取列表数据
  fetch(todoList);
});

// 事件回调触发删除请求
const handleDelete = deletingId => {
  send(deletingId);
};
```

至此，一个简单的 Todo 列表管理的相关请求功能就完成了，接下来我们将开始对它进行改造，来兼容无感交互模式。
