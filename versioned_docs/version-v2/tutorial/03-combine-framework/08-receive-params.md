---
title: Receive Params
---

In both `useRequest` and `useWatcher` we can call the `send` function to manually trigger the request. When the send function triggers the request, any number of parameters can be passed in. These parameters can actually be received by the following three locations.

##Received in method handler

Can be received when their first argument is set to a callback function, which is often useful when removing list items, as follows:

```javascript
const { send } = useRequest(id =>
  // id will receive 1
  removeTodoPoster(id)
);
send(1);
```

```javascript
const { send } = useWatcher(
  userId =>
    // userId will receive 2
    todoListGetter(userId),
  [condition]
);
send(2);
```

## Receive in event callback function

Received through `event.sendArgs` in the event callback function, which is an array containing all parameters of the send function.

```javascript
const { send, onSuccess, onError, onComplete } = useRequest(newTodo =>
  alovaInstance.Post('/todo', newTodo)
);
onSuccess(event => {
  //The value of sendArgs is [1]
  console.log(event.sendArgs);
});
onError(event => {
  //The value of sendArgs is [1]
  console.log(event.sendArgs);
});
onComplete(event => {
  //The value of sendArgs is [1]
  console.log(event.sendArgs);
});

// send request
send(1);
```

##Received in force function

force is used to specify whether it is necessary to penetrate the response cache. The content of the response cache will be explained later in [Cache Mode](/v2/tutorial/cache/mode).

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {
    return !!id;
  }
});
send(1);
```

```javascript
const { send } = useWatcher(alovaInstance.Get('/todo'), [condition], {
  force: id => {
    return !!id;
  }
});
send(1);
```
