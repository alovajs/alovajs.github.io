---
title: 请求方法实例
sidebar_position: 20
---

在alova中，每个请求都对应一个 method 实例，它描述了一次请求的 url、请求头、请求参数，以及响应数据处理、缓存数据处理等请求行为参数，但它不会实际发出请求。


## 创建实例
Method实例的创建也和 axios 的请求发送函数非常类似，下面我们先来创建一个获取 todo 列表的Method实例。

```javascript
// 创建一个Get实例，描述一次Get请求的信息
const todoListGetter = alovaInstance.Get('/todo/list', {
	// 请求头
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	// params参数将会以?的形式拼接在url后面
	params: {
		userId: 1
	}
});
```

接着再创建一个提交 todo 项的POST请求Method实例。

```javascript
// 创建Post实例
const createTodoPoster = alovaInstance.Post(
	'/todo/create',
	// 第二个参数是http body数据
	{
		title: 'test todo',
		time: '12:00'
	},
	// 第三个参数是请求配置相关信息
	{
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		params: {
			// ...
		}
	}
);
```

> ⚠️ 注意：`Method`实例里只是保存了请求所需要的信息，它不会发出请求，而是需要通过`use hook`发送请求（后续将详细讲解），这点与`axios`不同。


## 设置更细粒度的超时时间

全局的请求超时时间作用于所有的`Method`实例，但很多时候我们需要根据特殊请求设置不同的超时时间，此时我们可以设置请求级的超时时间，它将覆盖全局的`timeout`参数

```javascript
// 请求级别的请求超时时间
const todoListGetter = alovaInstance.Get('/todo/list', {
	// ...
  // highlight-start
	timeout: 10000
  // highlight-end
});
```


## 请求方法类型

`Alova`提供了包括 GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH 七种请求方法的抽象实例，具体的使用方式可以阅读 [请求方法详解](../next-step/request-method-details)。