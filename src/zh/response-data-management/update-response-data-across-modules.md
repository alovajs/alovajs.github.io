---
title: 跨页面/模块更新响应数据
order: 30
---

在上一小节[主动失效响应缓存](../response-data-management/invalidate-response-cache.html)的例子中，当用户点开todo列表中的某一项，进入todo详情页并对它执行了编辑，此时我们希望上一页中的todo列表数据也更新为编辑后的内容，使用`useFetcher`和`invalidateCache`的方式都会重新发起请求，那有没有不需要重新请求的方法呢？

当然有！

## 常规用法
```javascript{18-30}
import { updateState } from 'alova';

// 正在编辑的todo项
const editingTodo = {
  id: 1,
  title: 'todo1',
  time: '09:00'
};

const {
  send,
  onSuccess
} = useRequest(createTodoPoster, { immediate: false });

// 提交成功后，固定使第一页的todo数据缓存失效
onSuccess(() => {

  // 提交成功后，固定修改第一页的todo数据数据
  // 第一个参数为Method实例，第二个为包含原缓存数据的回调函数，该函数需要返回修改后的数据
  updateState(getTodoList(1), todoList => {
    return todoList.map(item => {
      if (item.id === editingTodo.id) {
        return {
          ...item,
          ...editingTodo,
        };
      }
      return item;
    });
  });
});
```

:::warning 注意
1. 通过`updateState`更新状态时，如果检测到缓存（内存缓存和持久化缓存）也将会更新新的数据更新缓存。
2. 只有当使用useRequest、useWatcher发起过请求时，alova才会管理hook返回的状态，原因是响应状态是通过一个Method实例来生成key并保存的，但在未发起请求时Method实例内的url、params、query、headers等参数都还不确定。
:::


## 高级用法
很多时候我们会有这样的需求，希望在静默提交创建todo项时，立即调用`updateState`更新数据得以立即展示新的todo项，并且同时还希望在todo项创建完成后再次把`id`更新上去，此时你可以使用[延迟数据更新](../next-step/delayed-data-update.html)