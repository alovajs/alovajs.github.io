---
title: 响应处理
sidebar_position: 80
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

请求完成后，响应数据会经过多个流程的处理，最终才会在发送请求的位置获得最终数据，流程如下：

```mermaid
flowchart LR
  classDef condition fill:#a8bcff

  响应成功 --> alovaInstance.responded.onSuccess
  alovaInstance.responded.onSuccess --> throw{是否抛出错误？}:::condition
  throw -->|否| method.transformData
  method.transformData --> useRequest.onSuccess
  throw -->|是| useRequest.onError

  method.transformData --> throw2{是否抛出错误？}:::condition
  throw2 -->|否| useRequest.onSuccess
  throw2 -->|是| useRequest.onError

  useRequest.onSuccess --> throw3{是否抛出错误？}:::condition
  throw3 -->|是| useRequest.onError

  响应错误 --> alovaInstance.responded.onError
  alovaInstance.responded.onError --> throw4{是否抛出错误？}:::condition
  throw4 -->|是| useRequest.onError
  throw4 -->|否| method.transformData
```

当没有抛出错误时，下一个节点会接收到上一个节点的返回值。全局的响应拦截器已经在[全局拦截器](/tutorial/getting-started/global-interceptor)中讲解过，接下来我们来看看在 method 中的`transformData`。

## 转换响应数据

当一个请求的响应数据结构不能直接满足使用需要时，我们可以为 method 实例设置`transformData`函数将响应数据转换成需要的结构。

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  params: {
    page: 1
  },

  // 函数接受未加工的数据和响应头对象，并要求将转换后的数据返回，它将会被赋值给data状态。
  // 注意：rawData是全局响应拦截器（如果有设置）过滤后的数据，响应拦截器的配置可以参考[设置全局响应拦截器]章节。
  transformData(rawData, headers) {
    return rawData.list.map(item => {
      return {
        ...item,
        statusText: item.done ? '已完成' : '进行中'
      };
    });
  }
});
```

<Tabs>
<TabItem value="1" label="useRequest">

```javascript
const { data } = useRequest(todoListGetter);
```

</TabItem>
<TabItem value="2" label="method">

```javascript
const data = await todoListGetter;
```

</TabItem>
</Tabs>

data 值将接收到转换后的数据格式。

```typescript
type data = {
  // ...
  statusText: '已完成' | '进行中';
}[];
```

:::warning 注意

在 usehooks 中使用时，在`transformData`中抛出错误也会触发`onError`；

:::

## 绑定响应回调

如需设置请求回调，你还可以在 useRequest 的返回参数中接收回调的设置函数，如下：

```javascript
const {
  // ...

  // 成功回调绑定
  onSuccess,

  // 失败回调绑定
  onError,

  // 完成回调绑定，回调在成功或失败都会调用
  onComplete
} = useRequest(todoListGetter);
onSuccess(event => {
  console.log('请求成功，响应数据为:', event.data);
  console.log('本次请求的method实例为:', event.method);
  console.log('响应数据是否来自缓存:', event.fromCache);
});
onError(event => {
  console.log('请求失败，错误信息为:', event.error);
  console.log('本次请求的method实例为:', event.method);
});
onComplete(event => {
  // event.status在成功时为success，失败时为error
  console.log('请求完成，状态为：', event.status);
  console.log('本次请求的method实例为:', event.method);
  console.log('响应数据是否来自缓存:', event.fromCache);
  if (event.data) {
    console.log('请求数据：'，event.data)
  } else if (event.error) {
    console.log('错误信息：'，event.error)
  }
});
```

:::warning 注意

在`onSuccess`中抛出错误将会触发`onError`。

:::
