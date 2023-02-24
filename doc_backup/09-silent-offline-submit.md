---
title: 静默/离线提交
sidebar_position: 90
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

假设你想要进一步提高创建 todo 项的体验感，让用户点击 **创建** 按钮后立即生效，而感觉不到提交服务器的过程，你可以考虑使用静默提交的方式。

你可能会想，服务器没有响应就可以把结果呈现给用户了吗？是的，alova 具有后台请求可靠机制，在网络连接环境下间隔 2 秒重复发起请求，直到请求顺利完成，这在服务提供不稳定的时候很有效，当然，还是需要提醒你的是，不稳定的情况下，如果你的数据在多端展示时，可能就会有点不同步了。

我们来展示一下静默创建 todo 项的代码。

```javascript
const createTodoPoster = newTodo => alovaInstance.Post('/todo/create', newTodo);

const { send, onSuccess } = useRequest(createTodoPoster, {
  // 在请求时开启静默提交
  silent: true
});
onSuccess(() => {
  // 设置为静默提交后，onSuccess将会立即被调用，并且回调函数的第一个参数为undefined
  // 而onError将永远不会被调用
  // 立即将新todo项添加到列表中
  updateState(todoListGetter, todoList => [...todoList, newTodo]);
});

// 点击创建按钮触发此函数
const handleSubmit = () => {
  send({
    title: 'test todo',
    time: '12:00'
  });
};
```

上面的静默提交会有一个问题，就是新的 todo 项没有 id，而 id 一般需要等提交返回才行，此时我们可以使用延迟数据更新。

```javascript
// 省略其他代码...
onSuccess(() => {
  updateState(todoListGetter, todoList => [
    ...todoList,
    {
      // id设为占位符，等待响应后将自动替换为实际数据
      '+id': ({ id }) => id,
      ...newTodo
    }
  ]);
});
```

> 深入了解 [延迟数据更新](./delayed-data-update)

## 离线提交

如果你正在开发一个在线文档编写器，用户的每次输入都需要自动同步到服务端，即使是离线状态下也支持用户继续编写，在这种场景下，我们可以使用`alova`的离线提交机制，其实这个功能和静默提交功能是一体化的，都是得益于`alova`的后台请求可靠机制。

它的处理方式是，当开启了静默提交后，在离线状态时提交数据会直接将请求数据缓存在本地，等到网络恢复后，会自动将缓存的请求数据重新提交到服务端，这就保证了离线状态下的静默提交也是可靠的。

接下来我们以在线文档编写器为示例，展示一下离线提交的代码。

<Tabs groupId="framework">
<TabItem label="vue" value="1">

```html
<template>
  <div v-if="loading">提交中...</div>
  <textarea v-model="editingText"></textarea>
</template>

<script setup>
  import { ref } from 'vue';
  import { useWatcher } from 'alova';

  const editingText = ref('');
  const saveDoc = () =>
    alovaInstance.Post('/doc/save', {
      text: editingText.value
    });
  const { loading } = useWatcher(saveDoc, [editingText], {
    // 开启静默提交
    silent: true,

    // 设置500ms防抖降低服务器压力
    debounce: 500
  });
</script>
```

</TabItem>
<TabItem label="react" value="2">

```jsx
import { useState } from 'react';
import { useWatcher } from 'alova';

const saveDoc = text => alovaInstance.Post('/doc/save', { text });
const App = () => {
  const [editingText, useEditingText] = useState('');

  const { loading } = useWatcher(() => saveDoc(editingText), [editingText], {
    // 开启静默提交
    silent: true,

    // 设置500ms防抖降低服务器压力
    debounce: 500
  });

  return (
    <>
      {loading ? <div>提交中...</div> : null}
      <textarea
        value={editingText}
        onInput={e => setEditingText(e.target.value)}></textarea>
    </>
  );
};
```

</TabItem>
<TabItem label="svelte" value="3">

```html
<script>
  import { writable } from 'svelte/store';
  import { useWatcher } from 'alova';

  const editingText = writable('');
  const saveDoc = () =>
    alovaInstance.Post('/doc/save', {
      text: $editingText
    });
  const { loading } = useWatcher(saveDoc, [editingText], {
    // 开启静默提交
    silent: true,

    // 设置500ms防抖降低服务器压力
    debounce: 500
  });
</script>
{#if loading}
<div>提交中...</div>
{/if}
<textarea bind:value="{editingText}"></textarea>
```

</TabItem>
</Tabs>

这样就完成了简单的在线文档编写器。当然，在静默提交创建 todo 项的例子中离线提交也是适用的，即在离线状态下也能保证顺利创建 todo 项。
