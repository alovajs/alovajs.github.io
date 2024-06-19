---
title: Custom Method Key
---

:::info Usage scope

Fully

:::

Method key is used to identify all data associated with method instances and has a great effect, for example:

- Caching of associated response data
- Identity sharing request
- Associate the states returned by useHooks such as `useRequest`, so that it can match these states with `updateState`.

By default, the method key is generated from the relevant request parameters of the method instance, which can accurately identify a request.

But sometimes you want to change it so that the above three situations can be recognized as the same method in different requests.

## Customize method instance key

```javascript
// Method key is generated when it is created, you can customize it through __key__
const methodInst = alovaInstance.Get('/api/user', {});
methodInst.__key__ = 'my-custom-method-key';
```

## Customize all method instance keys

The method key is generated through `Method.prototype.generateKey`, you can override this method to change the method key generation rules.

```javascript
import { Method } from 'alova';

Method.prototype.generateKey = function () {
  return 'your-custom-method-key';
};
```

You can also set different generation rules according to the alova instance.

```javascript
Method.prototype.generateKey = function () {
  if (this.context === alovaInstance1) {
    return 'alova-1-method-key';
  } else {
    // ...
  }
  return 'alova-default-method-key';
};
```
