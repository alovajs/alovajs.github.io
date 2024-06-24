---
title: Forced Request
---

Forced request is a mechanism that bypasses cache checks to trigger request sending. It is useful when you need to get the latest data under certain conditions.

## Forced request in method

Forced request by calling the send function of the method instance and passing true.

```javascript
const response = await alovaInstance.Get('/api/user').send(true);
```

## Forced request in useHook

Please go to [Automatically manage request status-Forced request](/next/tutorial/client/strategy/use-request) for details.
