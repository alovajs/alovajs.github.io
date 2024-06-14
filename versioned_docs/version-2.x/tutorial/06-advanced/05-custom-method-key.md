---
title: custom method key
sidebar_position: 50
---

:::info version required

v2.20.0+

:::

Method key is used to identify all data associated with method instances and has a great effect, for example:

- Caching of associated response data
- Identity sharing request
  -Associate the status value returned by useRequest and other useHook

By default, the method key is generated from the relevant request parameters of the method instance, which can accurately identify a request.

But sometimes you want to change it so that the above three situations can be recognized as the same method in different requests.

```javascript
//The method key is generated when creating, you can customize it through __key__
const methodInst = alovaInstance.Get('/api/user', {});
methodInst.__key__ = 'my-custom-method-key';
```
