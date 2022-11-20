---
title: Cache Mode
sidebar_position: 40
---

Cached mode can better utilize server-side data multiple times, instead of sending a request to fetch data every time it is requested. `alova` provides three cache modes to meet different cache scenarios, namely memory mode, cache occupancy mode, and recovery mode. The cache mode can be set at different granularities such as global or request level. When set globally, all `Method` instances created by the same alova instance inherit the setting.

## memory mode (default)

In-memory mode places the cache in memory, which means that flushing the page cache will invalidate it, and is the most commonly used cache mode.

When you are writing the todo details page, you may think that users will frequently click to view the details in the todo list. If the user repeatedly views a certain detail, the request interface will not be repeated, and the data can be returned immediately, which improves the response speed. Colleagues also reduce server pressure. At this point we can set the response data cache for a todo detail `Method` instance.

```javascript
alovaInstance.GET('/todo/list', {
  // ...
  // highlight-start
  localCache: {
    // Set the cache mode to memory mode
    mode: cacheMode.MEMORY,

    // in milliseconds
    // When set to `Infinity`, it means that the data will never expire, when set to 0 or a negative number, it means no cache
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

The memory mode is the default mode, you can abbreviate it like this

```javascript
alovaInstance.GET('/todo/list', {
  // ...
  // highlight-start
  localCache: 60 * 10 * 1000
  // highlight-end
});
```

> GET requests will default to 300000ms (5 minutes) memory cache time, developers can also customize the settings.

> If you need to set the cache mode globally uniformly, see [Set cache mode globally](#Set cache mode globally) at the bottom of this section

## Cache placeholder mode

When you don't want the application to display Loading every time you enter, but want to replace Loading with old data, you can use cached placeholder mode, which has a better experience than Loading.

In cache occupancy mode, `data` will be immediately assigned to the old data cached last time. You can judge that if there is old data, use it instead of Loading display. At the same time, it will send a request to get the latest data and update the cache, so as to achieve In order to quickly display the actual data, and obtain the latest data.

Set on the `Method` instance:

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  localCache: {
    // Set the cache mode to persistent placeholder mode
    mode: cacheMode.STORAGE_PLACEHOLDER,
    // cache time
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

> If you need to set the cache mode globally uniformly, see [Set cache mode globally](#Set cache mode globally) at the bottom of this section

## recovery mode

In this mode, the server-side cached data will persist. If the expiration time is not reached, even if the page cache is refreshed, it will not be invalidated. It is generally used for some data that needs server-side management but is basically unchanged, such as the specific dates of annual holidays. It is different, but it will not change. In this scenario, we only need to set the cache expiration time to the last moment of this year.

Set on the `Method` instance:

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  // highlight-start
  localCache: {
    // Set cache mode to persistent mode
    mode: cacheMode.STORAGE_RESTORE,
    // cache time
    expire: 60 * 10 * 1000
  }
  // highlight-end
});
```

> If you need to set the cache mode globally uniformly, see [Set cache mode globally](#Set cache mode globally) at the bottom of this section

### What should I do if the data changes in recovery mode?

When the `Method` instance in recovery mode is set, it may be due to the change of interface data or the logic change of front-end processing response data. In this case, it is necessary to let the user re-cache the changed data after publishing the application. At this time, you can pass the `tag` The attribute sets the cache tag. Each persistent data contains a `tag` identifier. When the `tag` changes, the original persistent data will be invalid, and the new data will be retrieved and identified with the new `tag`. .

```javascript
const todoListGetter = alovaInstance.Get('/todo/list', {
  // ...
  localCache: {
    mode: cacheMode.STORAGE_RESTORE,
    expire: 60 * 10 * 1000,

    // highlight-start
    // Add or modify the tag parameter, the cached data will be invalid
    // It is recommended to use the form of version number management
    tag: 'v1'
    // highlight-end
  }
});
```

## Set cache mode globally

:::info tips
v1.3.0+
:::
The above settings are all set the cache mode separately on `Method`. If you need to set the cache mode globally, you can do it as follows:

```javascript
const alovaInstance = createAlova({
  // ...
  // highlight-start
  localCache: {
    // uniformly set the cache mode of POST
    POST: {
      mode: cacheMode.STORAGE_PLACEHOLDER,
      expire: 60 * 10 * 1000
    },
    // Uniformly set the cache mode for HEAD requests
    HEAD: 60 * 10 * 1000
  }
  // highlight-end
});
```

Thereafter, `Method` instances created by `alovaInstance` instances will use this cache setting by default, and it can also be overridden in `Method` instances.

> Note: When the cache mode is set globally, the original 5-minute GET cache mode will be overwritten.

## Expiration time type

There are two types of expiration time to choose from, **relative time** and **absolute time**

### Relative Time

That is, it starts when the cached data is saved, and the expiration time is in **milliseconds**. The above examples are all of this type.

```javascript
localCache: 60 * 10 * 1000;
```

```javascript
localCache: {
expire: 60 * 10 * 1000,
}
```

### absolute time

Taking a specific time point as the expiration time, the cache will expire at the set time point

```javascript
localCache: new Date('2030-01-01');
```

```javascript
localCache: {
  expire: new Date('2030-01-01');
}
```

## Cache key automatic maintenance

The key of the response data cache is uniquely identified by the combination of the method instance's request method (method), request address (url), request header parameters (headers), url parameters (params), and request body parameters (requestBody), and any location is different. will be treated as different keys.
