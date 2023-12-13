---
title: Request manually
sidebar_position: 90
---

## Close request immediately

`useRequest` will send the request immediately when called by default, butWhen you need to use `useRequest` to submit data, such as creating a new todo item, you can first turn off the default sending request, switch to manually triggering the request, and receive the `send` function in useRequest to manually send the request. The `send` function A Promise instance with response data will be returned, which will change to the resolve state after requesting a response.

At this time, in order to receive the parameters passed by the `send` function, you can set the first parameter of `useRequest` to a function.

```javascript
const {
  // ...
  // Manual sender request function, send the request after calling
  send: addTodo

  //The parameters of the send function will be received here
} = useRequest(newTodo => alovaInstance.Post('/todo', newTodo), {
  // When immediate is false, it will not be emitted by default.
  immediate: false
});

// Manually send request
const handleAddTodo = () => {
  const newTodo = {
    title: 'New todo item',
    time: new Date().toLocaleString()
  };
  // The send function returns a Promise object that can receive response data
  addTodo(newTodo)
    .then(result => {
      console.log('The new todo item was added successfully, the response data is:', result);
    })
    .catch(error => {
      console.log('Failed to add todo item, error message is:', error);
    });
};
```

`send` function let you freely repeat the request.

> `[2.9.0+]` In react, the send function is wrapped with `useCallback`, and it is not restricted by closure traps. You can use it directly in events without worrying about causing performance problems.

## send function parameter passing rules

In the above example, when the send function triggers a request, any number of parameters can be passed in. These parameters can actually be received by the following five functions:

### Received in useRequest callback function

Can be received when the first parameter of useRequest is set to a callback function, which is often useful when deleting list items, as follows:

```javascript
const { send } = useRequest(id => removeTodoPoster(id));
send(1); // The id in the above callback function will receive 1
```

### Received in onSuccess, onError, onComplete callback functions

`event.sendArgs` in onSuccess, onError and onComplete callback functions are received in the form of arrays

```javascript
const { send, onSuccess, onError, onComplete } = useRequest(newTodo => alovaInstance.Post('/todo', newTodo));
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

### Received in force function

force is used to specify whether it is necessary to penetrate the response cache. The content of the response cache will be explained in the [Cache-force request](/tutorial/cache/force-request) later.

```javascript
const { send } = useRequest(alovaInstance.Get('/todo'), {
  force: id => {
    return !!id;
  }
});
send(1);
```
