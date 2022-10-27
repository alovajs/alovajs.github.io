---
title: 跨页面/模块更新响应数据
order: 30
---

我们继续以上一小节[主动失效响应缓存](#主动失效响应缓存)中提到的例子来说，当用户点开todo列表中的某一项，进入todo详情页并对它执行了编辑，此时我们希望上一页中的todo列表数据也更新为编辑后的内容，使用`useFetcher`和`invalidateCache`的方式都会重新发起请求，那有没有不需要重新请求的方法呢？

当然有！
```javascript
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
  // 第一个参数为Method对象，第二个为包含原缓存数据的回调函数，该函数需要返回修改后的数据
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
> 1. 自主修改缓存数据时，不仅会更新对应的响应式状态，如果存在持久化缓存也会一起被更新。
> 2. 只有当使用useRequest、useWatcher发起过请求时，alova才会管理hook返回的状态，原因是响应状态是通过一个Method对象来生成key并保存的，但在未发起请求时Method对象内的url、params、query、headers等参数都还不确定。

可能有时候你会希望在静默提交todo创建数据时，立即调用`updateState`更新数据，并且还希望在todo项创建完成后再次把`id`更新上去，你可以深入了解 [延迟数据更新](#延迟数据更新)