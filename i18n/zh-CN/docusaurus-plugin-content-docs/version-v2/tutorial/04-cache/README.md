---
title: 响应缓存
---

响应缓存是一个将服务端返回的数据缓存到客户端的技术，在可重复利用服务端数据时避免重复发送请求，既能立即响应用户请求，也能节省服务端资源。根据不同的缓存场景，alova 提供了 3 种模式，分别为**内存模式、缓存占位模式、恢复模式**，选择适合你的使用即可。

此外，使用缓存操作 API，你还可以自由添加、修改和删除缓存，以及自定义缓存匹配规则。

接下来，让我们从缓存模式开始理解吧！