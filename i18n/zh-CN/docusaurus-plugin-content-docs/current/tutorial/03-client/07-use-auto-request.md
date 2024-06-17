---
title: 自动拉取数据
sidebar_position: 70
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

通过浏览器事件或轮询自动拉取数据，让界面展示最新数据。

## 特性

- 支持浏览器聚焦、tab 切换、网络重连、轮询请求等场景下拉取最新数据，可自定义配置监听类型；
- 支持请求节流，在短时间内多次触发只会发送 1 次请求；
- 支持自定义事件的监听函数，以适应非浏览器环境下的使用场景；

## 使用

在默认情况下，自动拉取数据的 useHook`useAutoRequest`会在浏览器显示隐藏、聚焦、网络重连时自动拉取最新数据，并在组件卸载时自动取消监听事件。

```javascript
import { useAutoRequest } from 'alova/client';

const { loading, data, error } = useAutoRequest(() => method());
```

`useAutoRequest`的返回值与[useRequest](/api/core-hooks#userequest)相同。

除了支持[useRequest](/api/core-hooks#userequest)的所有配置参数外，还支持自动拉取的配置参数，你可以通过以下配置开启或关闭一些事件，或修改请求节流事件。

```javascript
const { loading, data, error, onSuccess, onError, onComplete } = useAutoRequest(
  () => method(),
  {
    /**
     * 浏览器显示隐藏触发
     * @default true
     */
    enableVisibility: true,

    /**
     * 浏览器聚焦触发
     * @default true
     */
    enableFocus: true,

    /**
     * 网络重连触发
     * @default true
     */
    enableNetwork: true,

    /**
     * 节流时间，在一定时间内多次触发只会发送1次请求，单位ms
     * @default 1000
     */
    throttle: 1000,

    /**
     * 轮询请求的时间，设置大于0时有效，单位ms
     * @default 0
     */
    pollingTime: 2000

    // 其他参数同useRequest...
  }
);
```

:::warning 缓存建议

建议在使用`useAutoRequest`时关闭对应请求的缓存，因为当设置缓存时，在触发自动请求时也会命中缓存而获取不到最新数据。具体请阅读[缓存模式](/tutorial/cache/mode)。

:::

## 自定义监听函数

以上 4 种自动拉取数据的方式，默认是监听浏览器事件来实现的，当用户在非浏览器环境下使用时，需要自定义监听函数，此函数接收通知请求和 useHook 配置对象作为参数，并返回一个取消监听函数。
。

以下是在`react-native`中自定义监听函数的示例：

### 网络重连自定义函数

```javascript
import NetInfo from '@react-native-community/netinfo';
useAutoRequest.onNetwork = (notify, config) => {
  const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
    isConnected && notify();
  });
  return unsubscribe;
};
```

### 轮询自定义函数

```javascript
useAutoRequest.onPolling = (notify, config) => {
  const timer = setInterval(notify, config.pollingTime);
  return () => clearInterval(timer);
};
```

### 应用切换自定义函数

```javascript
import { AppState, Text } from 'react-native';
useAutoRequest.onVisibility = (notify, config) => {
  const subscription = AppState.addEventListener('change', state => {
    state === 'active' && notify();
  });
  return () => subscription.remove();
};
```

### 应用聚焦自定义函数

由于 App 没有聚焦事件，所以可以设置为空函数避免报错。

```javascript
useAutoRequest.onFocus = (notify, config) => {
  return () => {};
};
```
