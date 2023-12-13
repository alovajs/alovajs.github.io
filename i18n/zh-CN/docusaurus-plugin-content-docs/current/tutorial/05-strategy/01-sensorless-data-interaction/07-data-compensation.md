---
title: 步骤4-数据补偿
sidebar_position: 70
---

用户可能在断网环境下进行了一些数据操作，此时静默队列内将堆满未提交的请求，当网络恢复后，由于时序机制的限制，完成这些请求需要消耗一点时间，此时加载的列表数据还不包括未提交请求的部分，这会让用户造成一定的困惑：

> “我明明已经新增了多条数据，为什么列表中没有？”

因此我们需要将未提交的数据手动补偿到列表中，从而让列表数据始终保持最新状态，在这一步中将会使用到保存的操作记录，对列表数据进行数据补偿，它其实也很简单，我们只需要在列表请求成功后遍历相关队列的 silentMethod 实例，将上一步记录的操作记录更新到列表数据中。

```javascript
import { useSQRequest, filterSilentMethods, equals } from '@alova/scene-vue';
import { todoList } from './api.js';
const { data, loading, onSuccess } = useSQRequest(todoList, {
  initialData: []
});

onSuccess(() => {
  // 获取default队列下的所有silentMethod实例
  const silentMethods = filterSilentMethods();
  silentMethods.forEach(({ reviewData }) => {
    if (!reviewData) {
      return;
    }
    const { operate, data } = reviewData;
    const index = todoListData.findIndex(({ id }) => equals(id, data.id));
    if ((operate === 'edit' || operate === 'remove') && index >= 0) {
      operate === 'edit' ? todoListData.splice(index, 1, data) : todoListData.splice(index, 1);
    } else if (operate === 'add' && index < 0) {
      // 在重新请求并命中缓存时将会有已添加的未提交项，这些需要过滤
      todoListData.unshift(data);
    }
  });
});
```

## 相关函数解释

### filterSilentMethods

按 method 名称或正则表达式过滤出指定的 silentMethod 实例，它的定义如下：

```typescript
function filterSilentMethods(
  methodNameMatcher?: string | number | RegExp,
  queueName?: string,
  filterActive?: boolean
): SilentMethod[];
```

**methodNameMatcher：**method 名称匹配器，如果是数字或字符串将过滤出完全匹配名称的结果，如果是正则表达式则过滤出匹配的结果，如果不传则过滤出所有结果；

**queueName**：指定查找的队列，未传时默认查找*default*队列；

**filterActive**：是否过滤掉激活状态的实例
