---
title: cache mode
sidebar_position: 40
---

The cache mode can make better use of server-side data multiple times without sending a request to get data every time a request is made. `alova` provides three cache modes to meet different cache scenarios, namely memory mode, cache replaceholder mode, and restore mode. The cache mode can be set at different granularities such as global or request level. When set globally, all Method instances created from the same alova instance will inherit the setting.

## memory mode (default)

The memory mode puts the cache in the memory, which means that the page cache is invalidated when it is refreshed, and is the most commonly used cache mode.

When you are writing a todo details page, you may think that users will frequently click to view details in the todo list. If users repeatedly view a certain detail, they will not repeatedly request the interface, and the data can be returned immediately, which improves the response speed. Colleagues also reduce server pressure. At this point we can set the response data cache for a todo detail `Method` instance.

```javascript
alovaInstance.GET('/todo/list', {
  //...
  // highlight-start
  localCache: {
    // Set cache mode to memory mode
    mode: 'memory',

    // unit is milliseconds
    // When set to `Infinity`, it means that the data will never expire, and when it is set to 0 or a negative number, it means no caching
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

Memory mode is the default mode, you can abbreviate like this

```javascript
alovaInstance.GET('/todo/list', {
  //...
  // highlight-start
  localCache: 60 * 10 * 1000
  // highlight-end
});
```

> GET requests will set the memory cache time of 300000ms (5 minutes) by default, and developers can also customize the settings.

> If you need to set the caching mode globally, see [Global setting cache mode] at the bottom of this section (#Global setting cache mode)

## cache replaceholder mode

When you don't want the application to display Loading every time it enters, but want to use old data instead of Loading, you can use the cache replaceholder mode, which has a better experience than Loading.

In the cache replaceholder mode, `data` will be immediately assigned the old data of the last cache. You can judge that if there is old data, use it to replace the Loading display. At the same time, it will send a request to obtain the latest data and update the cache, so as to achieve In order to quickly display the actual data, and obtain the latest data.

Set on `Method` instances:

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  //...
  // highlight-start
  localCache: {
    // Set the cache mode to persistent placeholder mode
    mode: 'placeholder',
    // cache time
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

> If you need to set the caching mode globally, see [Global setting cache mode] at the bottom of this section (#Global setting cache mode)

## restore mode

In this mode, the server-side cached data will be persistent. If the expiration time is not reached, even if the page cache is refreshed, it will not be invalidated. It is generally used for some data that requires server-side management but is basically unchanged, such as the specific dates of annual holidays. It is different, but it will not change again. In this scenario, we only need to set the cache expiration time to the last moment of this year.

Set on `Method` instances:

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  //...
  // highlight-start
  localCache: {
    // Set the cache mode to persistent mode
    mode: 'restore',
    // cache time
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

:::caution Caution

When request body is special data such as **FormData**, **Blob**, **ArrayBuffer**, **URLSearchParams**, **ReadableStream**, we think you intend to communicate with server. In this case would not cache data.

:::

> If you need to set the caching mode globally, see [Global setting cache mode] at the bottom of this section (#Global setting cache mode)

### What should I do if the data changes in restore mode?

When the `Method` instance in restore mode is set, it may be due to the change of the interface data or the logic change of the front-end processing response data. At this time, it is necessary to let the user re-cache the changed data after publishing the application. At this time, you can use `tag` The attribute sets the cache tag. Each piece of persistent data contains a `tag` identifier. When the `tag` changes, the original persistent data will become invalid, and new data will be obtained again, and the new `tag` will be used for identification .

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  //...
  localCache: {
    mode: 'restore',
    expire: 60 * 10 * 1000,

    // highlight-start
    // Add or modify the tag parameter, the cached data will be invalid
    // It is recommended to use version number management
    tag: 'v1'
    // highlight-end
  }
});
```

## Global setting cache mode

:::info Tips
v1.3.0+
:::
The above settings are all set separately on `Method`. If you need to set the cache mode globally, you can do it as follows:

```javascript
const alovaInstance = createAlova({
  //...
  // highlight-start
  localCache: {
    // Uniformly set the cache mode of POST
    POST: {
      mode: 'placeholder',
      expire: 60 * 10 * 1000
    },
    // Uniformly set the cache mode of the HEAD request
    HEAD: 60 * 10 * 1000
  }
  // highlight-end
});
```

Henceforth, the `Method` instance created by `alovaInstance` instance will use this cache setting by default, and it can also be overridden in the `Method` instance.

> Note: When the cache mode is set globally, the original 5-minute GET cache mode will be overwritten.

## Expiration time type

There are two types of expiration time to choose from, namely **relative time** and **absolute time**

### Relative Time

That is, the time to expire when the cached data is saved, in **milliseconds**, the above examples are all of this type.

```javascript
localCache: 60 * 10 * 1000;
```

```javascript
localCache: {
expire: 60 * 10 * 1000,
}
```

### absolute time

With a specific time point as the expiration time, the cache will expire at the set time point

```javascript
localCache: new Date('2030-01-01');
```

```javascript
localCache: {
  expire: new Date('2030-01-01');
}
```

## Cache key automatic maintenance

The key of the response data cache is uniquely identified by the combination of the request method (method), request address (url), request header parameters (headers), url parameters (params), and request body parameters (requestBody) of the method instance. Any information or Different positions will be treated as different keys.
