---
title: 缓存模式
sidebar_position: 60
---

import MemoryCache from '@site/example-links/MemoryCache';
import StoragePlaceholder from '@site/example-links/StoragePlaceholder';
import StorageRestore from '@site/example-links/StorageRestore';

缓存模式可以更好地多次利用服务端数据，而不需要每次请求时都发送请求获取数据。`alova`分别提供了 3 种缓存模式来满足不同的缓存场景，分别为内存模式、缓存占位模式、恢复模式。缓存模式可在全局或请求级等不同粒度下设置。全局设置时，所有由相同 alova 实例创建的`Method`实例都会继承该设置。

:::info 注意

是否使用缓存模式，以及使用哪种缓存模式需要根据场景而定，下面在单独介绍不同缓存模式时将会提及它们的使用场景。

:::

## 内存模式（默认）

内存模式将缓存放在内存中，这意味着刷新页面缓存即失效，是最常用的缓存模式。

内存模式一般用于解决短时间内（几分钟或几秒钟）频繁请求相同数据带来的性能消耗，例如当你在写 todo 详情页的时候，你可能会想到用户会频繁在 todo 列表中点击查看详情，如果用户重复查看某条详情时不再重复请求接口，并且能立即返回数据，提升了响应速度的同时也减小了服务器压力。此时我们就可以为某个 todo 详情`Method`实例设置响应数据缓存。

```javascript
alovaInstance.GET('/todo/list', {
  // ...
  // highlight-start
  localCache: {
    // 设置缓存模式为内存模式
    mode: 'memory',

    // 单位为毫秒
    // 当设置为`Infinity`，表示数据永不过期，设置为0或负数时表示不缓存
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

内存模式为默认模式，你可以这样简写

```javascript
alovaInstance.GET('/todo/list', {
  // ...
  // highlight-start
  localCache: 60 * 10 * 1000
  // highlight-end
});
```

> GET 请求将默认设置 300000ms(5 分钟)的内存缓存时间，开发者也可以自定义设置。

> 如果你需要全局统一设置缓存模式，见本节底部的 [全局设置缓存模式](#全局设置缓存模式)

### 内存缓存模式示例

<MemoryCache></MemoryCache>

## 缓存占位模式

这个缓存模式用于，当你不希望应用每次进入时都显示 Loading 图标，而希望使用旧数据替代时，你可以使用缓存占位模式，它的体验比 Loading 更好。

缓存占位模式下，`data`将立即被赋值为上次缓存的旧数据，你可以判断如果有旧数据则使用它替代 Loading 展示，同时它将发送请求获取最新数据并更新缓存，这样就达到了既快速展示实际数据，又获取了最新的数据。

在`Method`实例上设置：

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  localCache: {
    // 设置缓存模式为持久化占位模式
    mode: 'placeholder',
    // 缓存时间
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

> 如果你需要全局统一设置缓存模式，见本节底部的 [全局设置缓存模式](#全局设置缓存模式)

### 缓存占位模式示例

<StoragePlaceholder></StoragePlaceholder>

## 恢复模式

此模式下，服务端缓存数据将持久化，如果过期时间未到即使刷新页面缓存也不会失效，它一般用于一些需要服务端管理，但基本不变的数据，如每年的节假日具体日期有所不同，但不会再变动，这种场景下我们只需设置缓存过期时间为今年的最后一刻即可。

在`Method`实例上设置：

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  localCache: {
    // 设置缓存模式为持久化模式
    mode: 'restore',
    // 缓存时间
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

:::warning 注意

当 request body 是**FormData**、**Blob**、**ArrayBuffer**、**URLSearchParams**、**ReadableStream**等特殊数据时，将会被认为你是有意图和服务端通信的，在这种情况下不会进行缓存。

:::

> 如果你需要全局统一设置缓存模式，见本节底部的 [全局设置缓存模式](#全局设置缓存模式)

### 恢复模式示例

<StorageRestore></StorageRestore>

### 恢复模式下数据有变怎么办？

当设置了恢复模式的`Method`实例，可能由于接口数据变动，或前端处理响应数据的逻辑变动，此时需要在发布应用后让用户重新缓存变动后的数据，此时你可以通过`tag`属性设置缓存标签，每一份持久化数据都包含一个`tag`标识，当`tag`改变后原有的持久化数据将会失效，并重新获取新的数据，并用新的`tag`进行标识。

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  localCache: {
    mode: 'restore',
    expire: 60 * 10 * 1000,

    // highlight-start
    // 新增或修改tag参数，已缓存的数据将失效
    // 建议使用版本号的形式管理
    tag: 'v1'
    // highlight-end
  }
});
```

## 全局设置缓存模式

:::info 版本要求

v1.3.0+

:::

以上设置均是在`Method`上单独设置缓存模式的，如果你需要全局设置缓存模式，可以按如下方式做：

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  localCache: {
    // 统一设置POST的缓存模式
    POST: {
      mode: 'placeholder',
      expire: 60 * 10 * 1000
    },
    // 统一设置HEAD请求的缓存模式
    HEAD: 60 * 10 * 1000
  }
  // highlight-end
});
```

此后，通过`alovaInstance`实例创建的`Method`实例，都将默认使用这份缓存设置，同时也可以在`Method`实例中覆盖它。

> 注意：当全局设置了缓存模式后，原有的 5 分钟 GET 缓存模式将被覆盖。

## 全局关闭缓存模式

如果在你的项目中不希望使用任何请求缓存，可以在全局将它关闭，如果希望只在特定的几个请求中使用，也可以全局关闭它，并在指定的`Method`实例中设置即可。

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  // 设置为null即可全局关闭全部请求缓存
  localCache: null
  // highlight-end
});
```

## 过期时间类型

过期时间有两种类型可供选择，分别为 **相对时间** 和 **绝对时间**

### 相对时间

即在保存缓存数据时开始，过期的时长，以 **毫秒** 为单位，以上示例均为此类型。

```javascript
localCache: 60 * 10 * 1000;
```

```javascript
localCache: {
  expire: 60 * 10 * 1000,
}
```

### 绝对时间

以一个具体时间点为过期时间，缓存将在设定的时间点过期

```javascript
localCache: new Date('2030-01-01');
```

```javascript
localCache: {
  expire: new Date('2030-01-01');
}
```

## 缓存 key 自动维护

响应数据缓存的 key 是由 method 实例的请求方法(method)、请求地址(url)、请求头参数(headers)、url 参数(params)、请求体参数(requestBody)组合作为唯一标识，任意一个信息或位置不同都将被当做不同的 key。
