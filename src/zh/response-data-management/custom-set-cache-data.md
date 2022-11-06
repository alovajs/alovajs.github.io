---
title: 手动设置缓存
order: 40
---

有些服务接口支持批量请求数据，它意味着总是由不确定的若干组响应数据组成，当我们想要在初始化页面时批量请求数据，然后在交互中只请求单条数据的情况下，会造成缓存穿透的问题。

例如我们需要按日期获取todo列表数据，在初始化时一次请求获取了5月1日到5日，5天的数据，然后用户在操作时又获取了一次5月1日的数据，此时不会命中初始化时的5月1日数据，因为初始化的5天数据是存放在一起的，而不是分开缓存的，此时我们就可以为这5天的数据一一手动创建单条的响应缓存，这样就可以解决单条数据请求时的缓存穿透的问题。

```javascript
import { setCacheData } from 'alova';

const getTodoListByDate = dateList => alovaInstance.Get('/todo/list/dates', {
  params: { dateList }
});
// 初始化时批量获取5天的数据
const dates = ref([
  '2022-05-01',
  '2022-05-02',
  '2022-05-03',
  '2022-05-04',
  '2022-05-05',
]);
const {
  // ...
  onSuccess
} = useWatcher(() => getTodoListByDate(dates.value.join()),
  [dates],
  {
    immediate: true
  }
);
onSuccess(todoListDates => {
  if (todoListDates.length <= 1) {
    return;
  }

  // 默认情况下，这5天的数据会一起缓存到一个key中
  // 为了让后续请求某一天的数据时也能命中缓存，我们可以将5天的数据拆解为按天，并通过setCacheData一一手动设置响应缓存
  // setCacheData的第一个参数为method实例对象，它用于指定缓存的key
  // 第二个参数为缓存数据
  todoListDates.forEach(todoDate => {
    setCacheData(getTodoListByDate(todoDate.date), [ todoDate ]);
  });
});
```
此时再在切换日期为5月1日时，它将会命中我们手动设置的响应缓存。
```javascript
const handleTodolistToggle = () => {
  // dates值正在被useWatcher监听，因此改变它就可以自动触发请求
  dates.value = ['2022-05-01'];
}
```