---
title: 步骤5-编辑数据
---

> 当用户在断网情况下需要编辑数据，怎么办？

这时，需要分两种情况来说明：

1. 列表数据可以满足编辑页的数据回显，此时可以将列表数据传递到编辑页，而不需要通过请求获取，此时所有列表数据在静默提交模式下都支持编辑；
2. 编辑页回显数据需要通过 api 获取的，只有在本地有缓存的列表项才可以正常回显数据，例如：
   1. 在网络断开前已经访问过的列表项，再次请求可以命中缓存；
   2. 通过静默提交模式创建，但还没有提交成功的列表项，提交数据还存在于 silentMethod 实例中；

而在这边我们将重点讨论 **2-2** 的情况。

## 编辑静默提交项

在之前的章节中我们知道，当新建的数据项还没有成功提交时，将会使用虚拟数据作为 id 的占位符，通常，我们也是通过 id 来获取数据项的，此时我们在`useSQRequeset`上实现了虚拟数据拦截，一个请求如果附带了虚拟数据信息，它将在发送前被拦截并可以指定数据来替代响应数据，并且放弃这次请求。

还记得在 [步骤 2-调整响应处理](/v2/tutorial/strategy/sensorless-data-interaction/modify-response) 中保存的 **silentMethod.reviewData** 吗？

```javascript
onSuccess(({ silentMethod }) => {
  // 构造列表数据项
  const editingItem = {
    ...detail,
    id: id || data.id
  };
  // ...
  if (silentMethod) {
    // highlight-start
    // 设置名称是为了在拦截时查找对应的silentMethod实例
    silentMethod.entity.setName('edit' + editingItem.id);
    silentMethod.reviewData = {
      operate: id ? 'edit' : 'add',
      data: editingItem
    };
    // 别忘了调用save
    silentMethod.save();
    // highlight-end
  }
});
```

它不仅可以用于数据补偿，还可以用于在编辑页中回显数据。

```javascript
const { loading, data } = useSQRequest(id => todoDetail(id), {
  initialData: {
    title: '',
    time: new Date()
  },
  immediate: false,

  // highlight-start
  // 设置拦截函数，当这个请求存在虚拟数据时函数将被调用
  // 如果返回了reviewData则会替代响应数据，并放弃本次请求，否则仍然发起请求
  vDataCaptured: () => {
    const targetSM = filterSilentMethods('edit' + todoId).pop();
    if (targetSM?.reviewData) {
      return { ...targetSM.reviewData.data };
    }
  }
  // highlight-end
});
```

:::warning 注意

你可以在 **silentMethod.reviewData** 中保存足够多的数据，让它既可以满足列表数据补偿，也可以满足编辑页数据回显。

:::

至此，通过静默提交模式创建的数据项也支持编辑了！还有什么问题呢，嗯...还有最后一个。

## 当正在编辑的数据项提交成功时

当用户正在编辑一条还未提交成功的数据项时，它突然提交成功了！这时我们需要将编辑页中使用到的虚拟数据替换为实际数据，例如将虚拟 id 替换为实际的 id，在接下来的编辑中使用实际的 id 进行提交，这也很简单，我们只需要监听静默提交成功事件即可完成，它将接收到虚拟数据和实际数据组成的数据集合。

```javascript
import { onSilentSubmitSuccess, stringifyVData } from '@alova/scene-*';

// ...
// id在初始化时是虚拟数据
let id = /* todo virtual id */;

// highlight-start
// 绑定监听静默提交成功事件来更新id，并返回解绑函数，别忘了在组件销毁时调用解绑函数
const unbindEvent = onSilentSubmitSuccess(event => {
  const vDataId = stringifyVData(id);
  if (event.vDataResponse[vDataId]) {
    id = event.vDataResponse[vDataId];

    // 以下是将url中的虚拟id更改为实际的id
    history.replaceState(null, '', '?id=' + currentId);
  }
});
// highlight-end
```

在这边，`event.vDataResponse` 值是由虚拟数据 id 和实际数据组成的集合，它的格式如下:

```javascript
{
  '[vd:aaaaaa]': { id: 1 },
  '[vd:bbbbbb]': 1
}
```

至此，我们已经完成了一个简单列表的无感交互的所有内容，但在其他应用场景下如编辑类应用、复杂列表管理等，将可能遇到更多不一样的需求，此时 alova 还有什么特性是我们能使用的呢？请再看下一章！
