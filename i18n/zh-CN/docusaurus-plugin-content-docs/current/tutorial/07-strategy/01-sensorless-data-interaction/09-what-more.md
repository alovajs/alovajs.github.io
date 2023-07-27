---
title: 还有什么？
sidebar_position: 90
---

## 虚拟数据的作用说明

在之前的章节中我们以虚拟数据作为 id 占位符，但它的作用不止于此，它可以占位任意的响应数据，例如在复杂列表中，当创建数据项时服务端需要计算产生额外的数据，此时就可以将这些额外数据也通过虚拟数据占位，但这要求额外的数据需要在创建数据项时一并返回。看以下示例：

```javascript
const { onSuccess, send } = useSQRequest(createOrEditData, {
  behavior: 'silent',
  immediate: false,

  // 构造与响应数据相同的数据结构
  silentDefaultResponse: () => {
    return {
      id: '--',
      extra1: '',
      extra2: ''
    };
  }
});
onSuccess(event => {
  event.data.id; // 虚拟数据
  event.data.extra1; //虚拟数据
  event.data.extra2; //虚拟数据
});
```

## useSQRequest 中新增的事件

为了更好地监听请求在队列中的行为，`useSQRequset` 还额外提供了以下 3 个事件监听函数，你可以通过以下方式获取绑定函数。

```javascript
const { onBeforePushQueue, onPushedQueue, onFallback } = useSQRequest(/* ... */);
```

### onBeforePushQueue

silentMethod 进入请求队列前事件，当行为模式为`queue`或`silent`时有效，可以在这个事件回调中返回 `false` 来阻止当前 silentMethod 进入队列，例如你可能想当前 silentMethod 替换掉另外一个时，可以这样做：

```javascript
// ...
onBeforePushQueue(event => {
  // 每次替换指定id的旧silentMethod，减少请求次数
  const prevSumbmitMethod = getSilentMethod('temp' + id);
  if (event.silentMethod && prevSumbmitMethod) {
    prevSumbmitMethod.replace(event.silentMethod);
    return false;
  }
});
```

### onPushedQueue

silentMethod 进入队列后的事件，当行为模式为`queue`或`silent`时有效，如果在 **onBeforePushQueue** 事件中阻止了进入队列，则此函数不会触发。

### onFallback

类似传统的 optimistic ui 的解决方案，我们也提供了请求回退事件，当请求达到最大重试次数或者重试判定失败时都将会触发这个时间，你可以使用它处理一些回退操作。

:::caution 警告

当绑定回退事件后，即使行为模式是`silent`的请求也不再被持久化，它将会在刷新页面后丢失，这是因为持久化的 silentMethod 通常都是需要确保完成的，而不是回退让用户重新处理的，在这种情况下不应该使用回退功能。

:::

## 保存额外的操作数据

在创建或编辑数据项时，之前的章节仅保存了回显数据到`silentMethod.reviewData`中，如果有一些额外的数据需要记录，例如编辑页的菜单可选项等，我们同样需要记录它们以确保在断网情况下还可以选择到它们，此时将这些数据挂载到 silentMethod 实例上一起持久化。

一般而言，你可以以任意属性名保存持久化数据，但在 typescript 中会报错，因此为你指定了 `silentMethod.extraData` 属性作为额外数据的保存字段，记得通过 `silentMethod.save()` 持久化数据。

## 自定义序列化器

默认情况下，alova 是使用 localStorage 进行 silentMethod 的数据持久化的，因此在持久化时会调用`JSON.stringify`转换为字符串，但 json 数据只支持基本数据类型、纯对象以及数组，如果你希望序列化特殊的数据结构例如 Date 实例、RegExp 实例、函数以及自定义的类实例，alova 支持自定义的序列化器来处理它们，在存储时应该如何将它转换为 json 支持的数据结构，在取出时如何转换为原对象结构。

```javascript
const regExpSerializer = {
  // forward在序列化时被调用
  // 需要判断data是否为目标值，如果不是目标值则返回undefined，表示不处理它
  forward: data => data instanceof RegExp ? data.source : undefined,

  // backward在反序列化时被调用，data为forward中返回的值
  backward: source => new RegExp(source);
};

bootSilentFactory({
  // ...
  // 通过serializers使用这个序列化器
  serializers: {
    customRegExp: regExpSerializer
  }
})
```

SilentFactory 内部默认提供了 Date 和 RegExp 的序列化器，你也可以使用相同的 key 来覆盖默认的序列化器

```javascript
const defaultSerializers = {
  Date: dateSerializer,
  RegExp: regExpSerializer
};
```

[阅读 Date 序列化器源码](https://github.com/alovajs/scene/blob/main/src/hooks/silent/serializer/date.ts)

## 操纵静默队列

静默队列用于保证请求时序问题，我们可以任意创建队列，进入队列的请求都将会以**SilentMethod**实例的形式保存在队列中，每个**SilentMethod**除了包含请求信息外，还包含静默提交的相关配置。静默队列是可以生成任意多个的，且支持查找、修改、删除队列中的 silentMethod 实例。

### 使用多个静默队列

行为模式设置为`queue`和`silent`的请求都会进入静默队列，默认情况下，silentMethod 实例将会被分配到**default**队列中，当需要分配到其他队列时可以在*useSQRequest*中指定`queue`参数。

```javascript
useSQRequest(createOrEditTodo, {
  // ...
  // 指定silentMethod实例进入名称为customQueue的队列中
  queue: 'customQueue',
  behavior: 'silent'
});
```

也可以将`queue`指定为函数，要求返回队列名称，这个函数将会在每次发起请求时被调用，函数参数来自于 send 函数。

```javascript
const { send } = useSQRequest(createOrEditTodo, {
  // ...
  // 根据useCustomQueue判断是否进入customQueue队列
  queue: useCustomQueue => (useCustomQueue ? 'customQueue' : 'default'),
  behavior: 'silent',
  immediate: false
});
const handleClick = () => {
  send(true);
};
```

### 查找 silentMethod

在之前的[数据补偿](../strategy/sensorless-data-interaction/data-compensation)中，我们使用了 [filterSilentMethods](../strategy/sensorless-data-interaction/data-compensation#filtersilentmethods) 查找指定队列的 silentMethod 实例，它将返回所有匹配的 silentMethod 实例，这里再介绍两种查找队列的方式：

#### 查找个 silentMethod 实例

使用`getSilentMethod`查询匹配的第一个 silentMethod 实例，用法与 [filterSilentMethods](../strategy/sensorless-data-interaction/data-compensation#filtersilentmethods) 相同。

```typescript
function filterSilentMethods(
  methodNameMatcher?: string | number | RegExp,
  queueName?: string,
  filterActive?: boolean
): SilentMethod | undefined;
```

#### 自定义查找

通过导出的 `silentQueueMap` 队列集合自定义查找，`silentQueueMap` 的数据结构为：

```javascript
const silentQueueMap = {
  default: [silentMethod1, silentMethod2 /* ... */],
  queueName1: [silentMethod3, silentMethod4 /* ... */],
  queueName2: [silentMethod5, silentMethod6 /* ... */]
  // ...
};
```

### 更改队列中的 silentMethod

当查找到你想要的 silentMethod 实例后，可以对这些等待中的 silentMethod 实例进行操纵。

#### 替换 silentMethod

调用`silentMethod.replace`可以在队列中将一个 silentMethod 替换为另一个 silentMethod。

```javascript
oldSilentMethod.replace(newSilentMethod);
```

#### 移除 silentMethod

调用`silentMethod.remove`可以将当前 silentMethod 在队列中移除。

```javascript
oldSilentMethod.remove();
```

#### 使用 silentQueueMap 更改 silentMethod

你还可以访问 `silentQueueMap` 自定义更改任意队列的任意数据。

```javascript
import { silentQueueMap } from '@alova/scene-*';

// 修改default队列中的所有silentMethod
silentQueueMap.default.forEach(silentMethodItem => {
  // ...
});
```

## 队列请求延迟

有些应用需要频繁地提交数据，例如编辑器类型应用，在编辑过程中进行实时保存，同时不打断用户使用，在这种类型的应用中使用静默提交时将会产生较多的请求信息，不仅会塞满前端缓存还会让服务端接收过多的请求，此时，我们可能不再需要将同步所有保存操作，而是在一段时间内发送一次操作，将有以下两种方案：

1. 对编辑操作节流，在 n 秒内只发起一次提交，这种方案可能会丢失延迟时间段内的操作记录，导致刷新时只能获取最后一次提交时的状态；
2. 延迟队列内的保存请求，并在延迟时间内只保留最新一次的请求信息，这样就可以减少请求的同时保留最新的编辑状态；

默认情况下，队列中的 silentMethod 会在上一个响应后立即发送请求，我们可以在启动时通过 `requestWait` 设置 silentMethod 的延迟发送时间，在这段时间里通过操纵队列保留最新的 silentMethod。

### 设置请求延迟

你可以对指定的队列设置延迟时间，也可以一次设置多个队列。

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  requestWait: [
    // customQueue队列内的每个silentMethod将会延迟5000ms发起请求
    { queue: 'customQueue', wait: 5000 },

    // 通过正则表达式对名称前缀为delay的队列统一设置3000ms延迟请求时间
    { queue: /^delay/, wait: 3000 }
  ]
  // highlight-end
});
```

当 `requestWait` 直接设置为数字时默认对 default 队列有效。

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  // default队列内的每个silentMethod将会延迟5000ms发起请求
  requestWait: 5000
  // highlight-end
});
```

### 动态设置请求延迟

很多时候我们只希望队列内的特定 silentMethod 设置延迟请求，此时可以通过函数来动态设置请求延迟，指定队列的每个 silentMethod 在发起请求前都将会调用这个函数，来确定延迟的时间。

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  requestWait: [
    {
      queue: /^delay,
      // 只对url为/edit的post请求延迟5000ms
      wait: (silentMethod, queuName) => {
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

同样的，当 `requestWait` 直接设置为函数时默认对 default 队列有效。

```javascript
bootSilentFactory({
  alova: alovaInst,
  // highlight-start
  requestWait: (silentMethod, queuName) => {
    const { type, url, data } = silentMethod.entity;
    if (type === 'POST' && url === '/edit') {
      return 5000;
    }
  }
  // highlight-end
});
```

## 动态设置 method 名称

为了便于查找，如果你需要动态设置 silentMethod 内 method 的名称，可以通过调用 setName。

```javascript
// 在请求成功时对silentMethod重新设置名称
onSuccess(({ data, silentMethod }) => {
  silentMethod.entity.setName('name' + data.id);
});
```

## 全局的静默提交事件

在之前的章节中，我们接触了 `onSilentSubmitSuccess`，我们总共提供了 5 个全局的事件。

### onSilentSubmitBoot

静默工厂启动事件，在静默工厂启动后触发。

```typescript
function onSilentSubmitBoot(handler: () => void): OffEventCallback;
```

### onBeforeSilentSubmit

`behavior=silent`的 silentMethod 请求前触发。

```typescript
function onBeforeSilentSubmit(handler: (event: GlobalSQEvent)): OffEventCallback;
```

### onSilentSubmitSuccess

`behavior=silent`的 silentMethod 请求成功时触发。

```typescript
function onSilentSubmitSuccess(handler: (event: GlobalSQSuccessEvent) => void): OffEventCallback;
```

### onSilentSubmitError

`behavior=silent`的 silentMethod 请求失败，但还没有达到最大重试次数时触发。

```typescript
function onSilentSubmitError(handler: (event: GlobalSQErrorEvent) => void): OffEventCallback;
```

### onSilentSubmitFail

`behavior=silent`的 silentMethod 在遇到请求失败时，以下 3 种情况将会触发此事件：

1. 请求重试到达最大次数时触发；
2. 未设置重试次数时，首次请求失败将会触发；
3. 请求未到最大重试次数，但重试判定为不再重试时触发；

```typescript
function onSilentSubmitFail(handler: (event: GlobalSQFailEvent) => void): OffEventCallback;
```

以上的事件绑定函数都将返回解绑函数，你可以在组件卸载前解绑事件。
