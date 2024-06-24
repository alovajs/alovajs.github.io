---
title: 步骤2-调整响应处理
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

在上一节的保守请求示例中，我们在 Todo 项的创建、编辑和删除请求响应后调用`fetch`重新拉取数据刷新的页面，为了能在操作后立即展示结果，我们需要进行以下调整：

1. 将创建、编辑和删除请求的行为模式设置为`silent`，它们将会在请求时立即触发成功回调；
2. 手动更新列表，而不是拉取数据，使用虚拟数据占位服务端的响应数据；
3. 保存操作记录，用于在刷新页面时进行数据补偿；

## 设置行为模式

通过配置参数`behavior`进行设置，可选参数为`queue`、`silent`、`static`，或者一个返回行为数据的函数实现动态设置行为模式，默认为`queue`。

以下为静态设置 behavior 参数。

```javascript
useSQRequest(createOrEditTodo, {
  // highlight-start
  behavior: 'silent',
  // highlight-end
  immediate: false
});
```

以下为动态设置 behavior 参数。

```javascript
const { send } = useSQRequest(createOrEditTodo, {
  // highlight-start
  // arg参数可通过send函数传入
  behavior: arg => {
    if (arg === 0) return 'silent';
    return 'queue';
  },
  // highlight-end
  immediate: false
});
```

> 当 behavior 设置为函数时，它将在每次发起请求时被调用，来确定本次请求以哪种行为来处理。

## 静默队列说明

将 behavior 参数设置为`queue`或`silent`后，请求将进入静默队列等待发起请求，默认情况下它们将进入名称为`default`的队列，你还可以指定其他队列来保存 silentMethod 实例，队列之间互不干扰。

```javascript
useSQRequest(createOrEditTodo, {
  // highlight-start
  // 指定请求信息进入名称为queue-2的队列中
  queue: 'queue-2',
  // highlight-end
  behavior: 'silent',
  immediate: false
});
```

## 在回调中手动更新列表

### 在新增/编辑后更新列表

<Tabs>
<TabItem value="1" label="列表页未销毁">

当列表页未被销毁，例如在当前页使用模态框操作，或使用了`<keep-alive>`(Vue)保留了页面组件，数据还会存在，此时我们使用**updateStateEffect**来更新列表数据，相比于 alova 导出的**updateState**，它具有追踪虚拟数据追踪功能，当获取到响应数据后，它将自动追踪列表数据内的虚拟数据，并替换为实际数据。

```javascript
import { useSQRequest, updateStateEffect } from '@alova/scene-*';
import { createOrEditTodo, todoList } from './api.js';

const { onSuccess } = useSQRequest(createOrEditTodo, {
  behavior: 'silent',
  immediate: false,

  // highlight-start
  // 在处理列表更新前，需要根据响应数据的结构先构造相同结构的虚拟响应数据
  // 例如，在创建 Todo 项时将返回这条数据的 id。
  silentDefaultResponse: () => {
    return {
      id: '--'
    };
  }
  // highlight-end
});

// highlight-start
onSuccess(({ data, silentMethod }) => {
  // 构造列表数据项
  const editingItem = {
    ...detail,

    // 当编辑时，使用原id，否则使用响应数据内的id
    // 在静默提交时，data.id为虚拟数据，在static行为模式时，data.id为实际的id值
    id: id || data.id
  };

  // 使用updateStateEffect，而不是updateState
  updateStateEffect(todoList(), todoListRaw => {
    if (id) {
      todoListRaw = todoListRaw.map(item => (item.id === id ? editingItem : item));
    } else {
      todoListRaw.unshift(editingItem);
    }
    return todoListRaw;
  });
});
// highlight-end
```

> updateStateEffect 的使用方法与[updateState](/tutorial/advanced/update-across-components)一致

</TabItem>
<TabItem value="2" label="列表页已销毁">

当列表页已被销毁，数据已被释放，例如跳转到了新页面，此时使用**setCache**更新缓存数据，当返回列表页时将重新发起请求并命中更新的缓存。

```javascript
import { useSQRequest, setCache, equals } from '@alova/scene-*';
import { createOrEditTodo, todoList } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') || '';
const { onSuccess } = useSQRequest(createOrEditTodo, {
  behavior: 'silent',
  immediate: false,

  // highlight-start
  // 在处理列表更新前，需要根据响应数据的结构先构造相同结构的虚拟响应数据
  // 例如，在创建 Todo 项时将返回这条数据的 id。
  silentDefaultResponse: () => {
    return {
      id: '--'
    };
  }
  // highlight-end
});
// highlight-start
onSuccess(({ data, silentMethod }) => {
  // 构造列表数据项
  const editingItem = {
    ...detail,

    // 当编辑时，使用原id，否则使用响应数据内的id
    // 在静默提交时，data.id为虚拟数据，在static行为模式时，data.id为实际的id值
    id: id || data.id
  };

  const methodTodoList = todoList();
  setCache(methodTodoList, todoListRaw => {
    if (id) {
      todoListRaw = todoListRaw.map(item => (equals(item.id, id) ? editingItem : item));
    } else {
      todoListRaw.unshift(editingItem);
    }
    return todoListRaw;
  });
  // 调用setUpdateState设置响应数据追踪，这样就实现了和updateStateEffect相同的延迟更新效果
  if (silentMethod) {
    silentMethod.setUpdateState(methodTodoList);
    silentMethod.save();
  }
});
// highlight-end
```

</TabItem>
</Tabs>

### 移除后更新列表

```javascript
import { useSQRequest, updateStateEffect } from '@alova/scene-*';
import { deleteTodo, todoList } from './api.js';

const { loading, data, send, onSuccess } = useSQRequest(deleteTodo, {
  immediate: false,
  // highlight-start
  behavior: 'silent'
  // highlight-end
});

onSuccess(({ sendArgs: [deletingId] }) => {
  updateStateEffect(todoList(), todoListRaw =>
    todoListRaw.filter(item => item.id !== deletingId)
  );
});

// 事件回调触发删除请求
const handleDelete = deletingId => {
  send(deletingId);
};
```

## 保存操作记录

仅仅完成手动更新列表还不够，我们还需要考虑当网络恢复后，当请求队列还存等待中的请求时，此时加载的列表数据还不包括未提交请求的部分，这会让用户造成一定的困惑：

> “我明明已经新增了多条数据，为什么列表中没有？”

因此我们需要在成功回调中记录操作，以及相关数据，以便再次加载列表数据时，将未提交的数据手动补偿到列表中，从而让列表数据始终保持最新状态。

保存操作记录也很简单，只需要将相关数据挂载到 silentMethod 实例上，它将随着实例一同被持久化。

### 创建/编辑成功回调

```javascript
// ...
onSuccess(({ silentMethod }) => {
  // 构造列表数据项
  const editingItem = {
    ...detail,
    id: id || data.id
  };
  // ...
  // highlight-start
  if (silentMethod) {
    // 设置名称，以便后续查询
    // 如果editingItem.id是虚拟数据将自动转换为它的id
    silentMethod.entity.setName('edit' + editingItem.id);
    silentMethod.reviewData = {
      operate: id ? 'edit' : 'add',
      data: editingItem
    };
    silentMethod.save();
  }
  // highlight-end
});
```

### 删除成功回调

```javascript
// ...
onSuccess(({ sendArgs: [deletingId], silentMethod }) => {
  // ...
  // highlight-start
  if (silentMethod) {
    silentMethod.reviewData = {
      operate: 'delete',
      data: {
        id: deletingId
      }
    };
    silentMethod.save();
  }
  // highlight-end
});
```

### 注意事项

1. onSuccess 回调函数中，只有在`queue`和`silent`行为模式下 silentMethod 才有值；
2. 一般而言，你可以通过`silentMethod.a = ...`、或`silentMethod.b = ...`来保存操作记录，但在 typescript 中会报错，因此特别提供了*reviewData*作为静默提交操作记录的保存属性；
3. 修改 silentMethod 数据后，需要通过`silentMethod.save()`来保存修改；

下一步将对静默提交请求设置重试参数。
