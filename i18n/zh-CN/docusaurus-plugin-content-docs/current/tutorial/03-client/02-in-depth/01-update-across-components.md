---
title: 跨组件更新状态
---

:::info 使用范围

客户端 useHook

:::

有这个一个场景，当用户点开 todo 列表中的某一项，进入 todo 详情页并对它执行了编辑，此时我们希望上一页中的 todo 列表数据，在不重新请求的情况下也更新为编辑后的内容，`useFetcher`就不再适用了。

此时可以使用`updateState`来更新任意模块/页面下的已存在的响应状态，它可以查找并修改其他模块内的响应式状态。

<!-- [这里有个`updateState`的 示例](/tutorial/example/vue/update-state) -->

## 使用 method 实例查找响应状态

当确定更新的响应状态对应的 method 实例时，你可以在`updateState`中传入此 method 实例，它将查找这个实例下是否存在对应的响应状态，并在回调函数中提供给你进行修改，最后将修改后的数据返回即可。

```javascript
import { updateState } from 'alova';

// 正在编辑的todo项
const editingTodo = {
  id: 1,
  title: 'todo1',
  time: '09:00'
};

const { send, onSuccess } = useRequest(createTodoPoster, { immediate: false });
onSuccess(() => {
  // highlight-start
  // 固定修改第一页的todo数据数据
  // updateState将返回是否更新成功
  const updated = updateState(getTodoList(1), todoList => {
    return todoList.map(item => {
      if (item.id === editingTodo.id) {
        return {
          ...item,
          ...editingTodo
        };
      }
      return item;
    });
  });
  // highlight-end
});
```

:::warning 注意

1. 通过`updateState`更新状态时，如果检测到缓存（内存缓存和持久化缓存）也将会更新新的数据更新缓存。
2. 只有当使用 useRequest、useWatcher 发起过请求时，alova 才会管理 hook 返回的状态，原因是响应状态是通过一个 Method 实例来生成 key 并保存的，但在未发起请求时 Method 实例内的 url、params、query、headers 等参数都还不确定。

:::

## 动态更新响应状态

可能有时候你并不确定需要更新 method 下的响应状态，但却知道以什么方式来找到需要失效的缓存数据，我们可以使用 [method 匹配器](/tutorial/client/in-depth/method-matcher) 来动态查找对应的 method 实例。以下例子展示了为名称为 todoList 的 method 实例对应的列表添加一条数据。

```javascript
updateState('todoList', todoListRaw => {
  todoListRaw.push({
    title: 'new todo',
    time: '10:00'
  });
  return todoListRaw;
});
```

关于 [method 快照匹配器](/tutorial/client/in-depth/method-matcher) 将在后面的章节中详细介绍。

## 监听匹配事件

在动态更新响应状态时，有时候你可能想要匹配到 method 实例时做一些处理，或者想要获取匹配的 method 实例，`updateState`还可以传入第三个参数来设置匹配事件来达到这些目的。

```javascript
updateState(
  'todoList',
  todoListRaw => {
    // ...
  },
  {
    // 匹配到method实例时调用，参数为匹配到的method实例
    onMatch: method => {
      // ...
    }
  }
);
```

:::warning ⚠️ 请确保组件未销毁

`updateState`默认会查找由 alova 的 useHooks 发送请求时所创建的响应状态，但由于防止内存溢出，一个组件的销毁同时也会回收它内部创建的所有状态，因此在使用`updateState`时请确保你希望更新的响应状态对应的容器组件未被销毁，否则将无法查找到对应的响应状态而导致更新失败。

这个问题常常出现在跨页面更新状态，我们容易忽略的是，在默认情况下，当页面跳转时上一个页面已被销毁，因此，如果你希望跨页面更新状态，这里有两个建议：

1. 将页面组件持久化，以保证被更新的状态还可以被查找到；
2. 使用 [setCache](/tutorial/cache/set-and-query) 替代`updateState`，其原理是，当上一个页面的请求存在缓存时，更新它的缓存以保证再次创建页面时，所触发的请求可以命中更新后的缓存，达到同样的效果。

:::

## 注意事项

1. 在实际使用中，不管是使用`useRequest`还是`useWatcher`发送请求时，你都可以调用`send`函数来指定不同参数重复发送请求，这些 use hook 返回的响应状态会被多个 method 实例引用，因此你可以选择任意一个 method 实例都可以匹配到同一个响应状态值；
2. 当动态查找更新响应状态时，method 匹配器找到了多个 method 实例，将会以第一个实例为准；
