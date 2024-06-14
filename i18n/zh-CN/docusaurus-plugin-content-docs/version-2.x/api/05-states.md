---
title: 响应状态操作
sidebar_position: 50
---

## updateState

手动更新任意模块/页面下已存在的响应数据或额外的状态。

**⚠️ 请确保组件未销毁**

`updateState`默认会查找由 alova 的 useHooks 发送请求时所创建的响应状态，但由于防止内存溢出，一个组件的销毁同时也会回收它内部创建的所有状态，因此在使用`updateState`时请确保你希望更新的响应状态对应的容器组件未被销毁，否则将无法查找到对应的响应状态而导致更新失败。

这个问题常常出现在跨页面更新状态时，因为当页面跳转时我们容易忽略的是，默认情况下上一个页面已经被销毁了，因此，如果你希望跨页面更新状态，这边有两个建议：

1. 将页面组件持久化，以保证被更新的状态还可以被查找到；
2. 使用 [setCache](/tutorial/cache/set-and-query) 替代`updateState`，其原理是，当上一个页面的请求存在缓存时，更新它的缓存以保证再次创建页面时，所触发的请求可以命中更新后的缓存，达到同样的效果。

> 前往[跨页面/模块更新响应状态](/tutorial/advanced/update-across-components)查看详情。

> 使用 updateState 管理额外状态请参考[额外状态管理](/tutorial/advanced/manage-extra-states)。

- **类型**

```ts
type MethodFilter =
  | string
  | RegExp
  | {
      name?: string | RegExp;
      filter?: MethodFilterHandler;
      alova?: Alova<any, any, any, any, any>;
    };
function updateState(
  matcher: Method | MethodFilter,
  handleUpdate: UpdateStateCollection<Response>['data'] | UpdateStateCollection<Response>,
  options?: UpdateOptions
): boolean;
```

- **参数**

- `matcher`：值为 method 实例、method 的 name 字符串、method 的 name 正则表达式，也可以设置为[method 匹配器](/tutorial/advanced/method-matcher)，如果匹配到符合条件的 method，将会调用`handleUpdate`。
- `handleUpdate`：更新函数或更新函数集合，如果是函数集合，将会调用集合上对应的更新函数，并将返回值作为更新结果。
- `options`：可选项。

| 参数名  | 类型     | 说明                               |
| ------- | -------- | ---------------------------------- |
| onMatch | Function | 在匹配到 method 后，将会调用该函数 |

- **返回**

是否更新成功。

- **示例**

在页面或组件 A 中使用`useRequest`发送请求并获得响应数据。

```ts
const { data } = useRequest(
  alova.Get('/api/user', {
    name: 'user'
  })
);
```

在页面或组件 B 中使用`updateState`更新响应状态。

```ts
import { updateState } from 'alova';

// 通过method实例匹配
updateState(alova.Get('/api/user'), oldData => {
  return [
   ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ]
});

// 通过method name匹配
updateState('user', oldData => {
  return [
  ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ];
}

// 通过method name正则匹配
updateState(/^us/, oldData => {
  return [
  ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ];
})

// 通过method匹配器匹配
updateState({
  name: 'user',
  filter(method, i, methods) {
    return methods.length === i + 1;
  }
}, oldData => {
  return [
 ...oldData,
    {
      id: 10000,
      name: 'Alova',
    },
  ];
});
```
