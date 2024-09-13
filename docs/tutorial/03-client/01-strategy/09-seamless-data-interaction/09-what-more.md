---
title: What more?
---

## Description of the role of virtual data

In the previous chapters we used virtual data as the id placeholder, but its function is more than that, it can occupy any response data, for example, in a complex list, when creating a data item, the server needs to calculate additional Data, at this time, these additional data can also be occupied by virtual data, but this requires that the additional data needs to be returned together when the data item is created. See the following example:

```javascript
const { onSuccess, send } = useSQRequest(createOrEditData, {
  behavior: 'silent',
  immediate: false,

  // Construct the same data structure as the response data
  silentDefaultResponse: () => {
    return {
      id: '--',
      extra1: '',
      extra2: ''
    };
  }
});
onSuccess(event => {
  event.data.id; // virtual data
  event.data.extra1; //virtual data
  event.data.extra2; //virtual data
});
```

## New events in useSQRequest

In order to better monitor the behavior of requests in the queue, `useSQRequset` also provides the following 3 additional event monitoring functions, you can obtain the binding functions in the following ways.

```javascript
const { onBeforePushQueue, onPushedQueue, onFallback } = useSQRequest(/* ... */);
```

###onBeforePushQueue

silentMethod is an event before entering the request queue. It is valid when the behavior mode is `queue` or `silent`. You can return `false` in this event callback to prevent the current silentMethod from entering the queue. For example, you may want to replace the current silentMethod with another one. It can be done like this:

```javascript
//...
onBeforePushQueue(event => {
  // Replace the old silentMethod with the specified id each time, reducing the number of requests
  const prevSumbmitMethod = getSilentMethod('temp' + id);
  if (event.silentMethod && prevSumbmitMethod) {
    prevSumbmitMethod.replace(event.silentMethod);
    return false;
  }
});
```

###onPushedQueue

silentMethod The event after entering the queue. It is valid when the behavior mode is `queue` or `silent`. If the queue is blocked in the **onBeforePushQueue** event, this function will not trigger.

### onFallback

Similar to the traditional optimistic ui solution, we also provide a request rollback event, which will be triggered when the request reaches the maximum number of retries or the retry judgment fails. You can use it to handle some rollback operations.

:::warning Warning

When the fallback event is bound, even if the behavior mode is `silent`, the request will no longer be persisted, and it will be lost after refreshing the page. This is because the persistent silentMethod usually needs to ensure completion, not Rollbacks allow the user to re-process, in which case the rollback function should not be used.

:::

## Save additional operation data

When creating or editing a data item, the previous chapters only saved the echo data to `silentMethod.reviewData`, if there are some additional data that need to be recorded, such as the menu options of the edit page, etc., we also need to record them to ensure They can also be selected when the network is disconnected. At this time, these data are mounted on the silentMethod instance and persisted together.

Generally speaking, you can save persistent data with any property name, but an error will be reported in typescript, so the `silentMethod.extraData` attribute is specified for you as the storage field for extra data, remember to use `silentMethod.save()` for persistence data.

## Custom serializer

By default, alova uses localStorage for silentMethod data persistence, so it will call `JSON.stringify` to convert to a string when persisting, but json data only supports basic data types, pure objects and arrays, if you want Serialize special data structures such as Date instances, RegExp instances, functions, and custom class instances. Alova supports custom serializers to handle them. How to convert it to a data structure supported by json when storing it? How to convert to the original object structure.

```javascript
const regExpSerializer = {
   // forward is called when serializing
   // Need to judge whether the data is the target value, if not, return undefined, indicating that it will not be processed
   forward: data => data instanceof RegExp ? data.source : undefined,

   // backward is called during deserialization, data is the value returned in forward
   backward: source => new RegExp(source);
};

bootSilentFactory({
   //...
   // use this serializer via serializers
   serializers: {
     customRegExp: regExpSerializer
   }
})
```

SilentFactory provides Date and RegExp serializers by default, and you can also use the same key to override the default serializers

```javascript
const defaultSerializers = {
  Date: dateSerializer,
  RegExp: regExpSerializer
};
```

[Read Date serializer source code](https://github.com/alovajs/alova/blob/main/packages/client/src/util/serializer/date.ts)

## Manipulate the silent queue

Silent queues are used to ensure the timing of requests. We can create queues arbitrarily, and all requests entering the queue will be stored in the queue in the form of **SilentMethod** instances. Each **SilentMethod** not only contains request information, but also Contains relevant configuration for silent submission. Any number of silent queues can be generated, and it supports searching, modifying, and deleting silentMethod instances in the queue.

### Using multiple silent queues

Requests whose behavior mode is set to `queue` and `silent` will enter the silent queue. By default, the silentMethod instance will be assigned to the **default** queue. When it needs to be assigned to other queues, it can be assigned in _useSQRequest_ Specify the `queue` parameter.

```javascript
useSQRequest(createOrEditTodo, {
  //...
  // Specify the silentMethod instance to enter the queue named customQueue
  queue: 'customQueue',
  behavior: 'silent'
});
```

You can also specify `queue` as a function to return the name of the queue. This function will be called every time a request is made, and the function parameters come from the send function.

```javascript
const { send } = useSQRequest(createOrEditTodo, {
  //...
  // Determine whether to enter the customQueue queue according to useCustomQueue
  queue: useCustomQueue => (useCustomQueue ? 'customQueue' : 'default'),
  behavior: 'silent',
  immediate: false
});
const handleClick = () => {
  send(true);
};
```

### Find silentMethod

In the previous [data compensation](/tutorial/client/strategy/seamless-data-interaction/data-compensation), we used [filterSilentMethods](/tutorial/client/strategy/seamless-data-interaction/data-compensation#filtersilentmethods) to find the silentMethod of the specified queue instance, it will return all matching silentMethod instances, here are two more ways to find the queue:

#### Find a silentMethod instance

Use `getSilentMethod` to query the first matching silentMethod instance, the usage is the same as [filterSilentMethods](/tutorial/client/strategy/seamless-data-interaction/data-compensation#filtersilentmethods).

```typescript
function filterSilentMethods(
  methodNameMatcher?: string | number | RegExp,
  queueName?: string,
  filterActive?: boolean
): SilentMethod | undefined;
```

#### Custom Lookup

Customize the lookup through the exported `silentQueueMap` queue collection, the data structure of `silentQueueMap` is:

```javascript
const silentQueueMap = {
  default: [silentMethod1, silentMethod2 /* ... */],
  queueName1: [silentMethod3, silentMethod4 /* ... */],
  queueName2: [silentMethod5, silentMethod6 /* ... */]
  //...
};
```

### Change the silentMethod in the queue

After finding the silentMethod instance you want, you can manipulate these waiting silentMethod instances.

#### update silentMethod

Call `silentMethod.save` to update this silentMethod data to cache.

```javascript
silentMethod.extraData = { ... };
await silentMethod.save();
```

#### replace silentMethod

Call `silentMethod.replace` to replace a silentMethod with another silentMethod in the queue.

```javascript
oldSilentMethod.replace(newSilentMethod);
```

#### remove silentMethod

Call `silentMethod.remove` to remove the current silentMethod from the queue.

```javascript
oldSilentMethod.remove();
```

#### Use silentQueueMap to change silentMethod

You can also access `silentQueueMap` to custom change any data of any queue.

```javascript
import { silentQueueMap } from 'alova/client';

// Modify all silentMethods in the default queue
silentQueueMap.default.forEach(silentMethodItem => {
  //...
});
```

## Queue request delay

Some applications need to submit data frequently, such as editor-type applications, which are saved in real time during the editing process without aborting the user's use. When using silent submission in this type of application, more request information will be generated, not only It will fill up the front-end cache and make the server receive too many requests. At this time, we may no longer need to synchronize all save operations, but send an operation within a period of time. There will be the following two solutions:

1. Throttle the editing operation, and only initiate one submission within n seconds. This solution may lose the operation records during the delay period, resulting in only the status of the last submission being obtained when refreshing;
2. Delay the save request in the queue, and only keep the latest request information during the delay time, so that you can reduce the request while retaining the latest editing status;

By default, the silentMethod in the queue will send the request immediately after the last response. We can set the delay sending time of the silentMethod through `requestWait` at startup, and keep the latest silentMethod by manipulating the queue during this time.

### Set request delay

You can set the delay time for the specified queue, or you can set multiple queues at once.

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  requestWait: [
    // Each silentMethod in the customQueue queue will delay 5000ms to initiate a request
    { queue: 'customQueue', wait: 5000 },

    //Use a regular expression to uniformly set a 3000ms delay request time for the queue whose name is prefixed with delay
    { queue: /^delay/, wait: 3000 }
  ]
  // highlight-end
});
```

When `requestWait` is directly set to a number, it is valid for the default queue by default.

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  // Each silentMethod in the default queue will delay 5000ms to initiate a request
  requestWait: 5000
  // highlight-end
});
```

### Dynamically set the request delay

Many times we only want a specific silentMethod in the queue to set a delay request. At this time, a function can be used to dynamically set the request delay. Each silentMethod of the specified queue will call this function before initiating a request to determine the delay time.

```javascript
bootSilentFactory({
   alova: alovaInst,
   // highlight-start
   requestWait: [
     {
       queue: /^delay,
       // Only delay 5000ms for post requests with url /edit
       wait: (silentMethod, queueName) => {
         const { type, url, data } = silentMethod.entity;
         if (type === 'POST' && url === '/edit') {
           return 5000;
         }
       }
     },
   ]
   // highlight-end
});
```

Similarly, when `requestWait` is set directly to a function, it defaults to the default queue.

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  requestWait: (silentMethod, queueName) => {
    const { type, url, data } = silentMethod.entity;
    if (type === 'POST' && url === '/edit') {
      return 5000;
    }
  }
  // highlight-end
});
```

## Dynamically set the method name

For easy search, if you need to dynamically set the name of the method in silentMethod, you can call setName.

```javascript
// Reset the name of silentMethod on successful request
onSuccess(({ data, silentMethod }) => {
  silentMethod.entity.setName('name' + data.id);
});
```

## Global silent submit event

In the previous chapter, we touched `onSilentSubmitSuccess`, we provided a total of 5 global events.

### onSilentSubmitBoot

Silent factory start event, triggered after the silent factory is started.

```typescript
function onSilentSubmitBoot(handler: () => void): OffEventCallback;
```

###onBeforeSilentSubmit

Fired before a silentMethod request with `behavior=silent`.

```typescript
function onBeforeSilentSubmit(handler: (event: GlobalSQEvent)): OffEventCallback;
```

###onSilentSubmitSuccess

Fired when a silentMethod request with `behavior=silent` succeeds.

```typescript
function onSilentSubmitSuccess(
  handler: (event: GlobalSQSuccessEvent) => void
): OffEventCallback;
```

### onSilentSubmitError

Fired when the silentMethod request with `behavior=silent` fails, but the maximum number of retries has not been reached.

```typescript
function onSilentSubmitError(handler: (event: GlobalSQErrorEvent) => void): OffEventCallback;
```

### onSilentSubmitFail

When the silentMethod of `behavior=silent` encounters a request failure, the following 3 situations will trigger this event:

1. Triggered when the request reaches the maximum number of retries;
2. When the number of retries is not set, the first request failure will trigger;
3. Triggered when the request has not reached the maximum number of retries, but the retry is judged to be no more retries;

```typescript
function onSilentSubmitFail(handler: (event: GlobalSQFailEvent) => void): OffEventCallback;
```

The above event binding functions will return the unbinding function, and you can unbind the event before the component is unmounted.
