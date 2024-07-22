---
title: Automatically refetch data
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic use of alova.

Automatically fetch data through browser events or polling, allowing the interface to display the newest data.

## Features

- Supports refetching the newest data in scenarios such as browser focus, tab switching, network reconnection, polling requests, etc;
- Supports request throttling, only one request will be sent if triggered multiple times in a short period of time;
- Support custom event listening functions to adapt to usage scenarios in non-browser environments;

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```bash
#npm
npm install @alova/scene-vue --save
# yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
#npm
npm install @alova/scene-react --save
# yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
#npm
npm install @alova/scene-svelte --save
# yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## Basic usage

By default, useHook`useAutoRequest` that automatically fetches data will automatically fetch the newest data when browser is visible, hidden, focused, and the network is reconnected, and will automatically cancel the listening event when the component is uninstalled.

```javascript
import { useAutoRequest } from '@alova/scene-*';

const { loading, data, error } = useAutoRequest(() => method());
```

The return value of `useAutoRequest` is the same as [useRequest](/api/core-hooks#userequest).

In addition to supporting all configuration parameters of [useRequest](/api/core-hooks#userequest), it also supports automatically fetched configuration parameters. You can turn on or off some events through the following configuration, or modify request throttling events.

```javascript
const { loading, data, error, onSuccess, onError, onComplete } = useAutoRequest(
  () => method(),
  {
    /**
     * Browser display hide trigger
     * @default true
     */
    enableVisibility: true,

    /**
     * Triggered by browser focus
     * @default true
     */
    enableFocus: true,

    /**
     * Triggered by network reconnection
     * @default true
     */
    enableNetwork: true,

    /**
     *Throttling time, only one request will be sent if triggered multiple times within a certain period, unit ms
     * @default 1000
     */
    throttle: 1000,

    /**
     * The time of polling request, effective when set greater than 0, unit ms
     * @default 0
     */
    pollingTime: 2000

    //Other parameters are the same as useRequest...
  }
);
```

:::warning caching advice

It is recommended to turn off the cache of the corresponding request when using `useAutoRequest`, because when the cache is set, the cache will be hit when the automatic request is triggered and the newest data cannot be obtained. Please read [Cache Mode](/v2/tutorial/cache/mode) for details.

:::

## Custom listening functions

The above 4 methods of automatically fetching data are implemented by listening browser's events by default. When users use it in a non-browser environment, you may need to customize the listening function. This function receives the notification request function and useHook config as parameters, and returns a cancel listening function.
.

The following is an example of custom listening function in `react-native`:

### Network reconnection custom function

```javascript
import NetInfo from '@react-native-community/netinfo';
useAutoRequest.onNetwork = (notify, config) => {
  const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
    isConnected && notify();
  });
  return unsubscribe;
};
```

### Polling custom function

```javascript
useAutoRequest.onPolling = (notify, config) => {
  const timer = setInterval(notify, config.pollingTime);
  return () => clearInterval(timer);
};
```

### App switching custom function

```javascript
import { AppState, Text } from 'react-native';
useAutoRequest.onVisibility = (notify, config) => {
  const subscription = AppState.addEventListener('change', state => {
    state === 'active' && notify();
  });
  return () => subscription.remove();
};
```

### App focus custom function

Since the App doesn't have a focus event, it can be set to an empty function to avoid throwing error.

```javascript
useAutoRequest.onFocus = (notify, config) => {
  return () => {};
};
```
