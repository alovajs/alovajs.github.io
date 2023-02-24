---
title: 转换响应数据
sidebar_position: 10
---

当响应数据结构不能直接满足前端需求时，我们可以为method实例设置`transformData`钩子函数将响应数据转换成需要的结构，数据转换后将会作为`data`状态的值。

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  params: {
    page: 1,
  },

  // 函数接受未加工的数据和响应头对象，并要求将转换后的数据返回，它将会被赋值给data状态。
  // 注意：rawData一般是响应拦截器过滤后的数据，响应拦截器的配置可以参考[设置全局响应拦截器]章节。
  transformData(rawData, headers) {
    return rawData.list.map(item => {
      return {
        ...item,
        statusText: item.done ? '已完成' : '进行中',
      };
    });
  }
});
```