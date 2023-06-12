---
title: send captcha
sidebar_position: 40
---

:::info strategy type

use hook

:::

> Before using extension hooks, make sure you are familiar with the basic usage of alova.

The verification code sending hook saves you the trouble of developing the verification code sending function.

## Example

[Send Captcha Demo](/example/captcha-send)

## Features

- ✨ The countdown will start automatically after the verification code is sent;
- ✨ Custom countdown seconds;
- ✨ Verification code sending limit;

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```bash
# npm
npm install @alova/scene-vue --save
#yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
#yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
#yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

## use

## Basic usage

Demonstrates basic use of form hooks.

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <input v-model="mobile" />
  <button
    @click="sendCaptcha"
    :loading="sending"
    :disabled="sending || countdown > 0">
    {{ loading ? 'Sending...' : countdown > 0 ? `${countdown} can be resent` : 'Send verification code' }}
  </button>
</template>

<script setup>
  import { ref } from 'vue';
  import { apiSendCaptcha } from './api.js';
  import { useCaptcha } from '@alova/scene-vue';

  const mobile = ref('');
  const {
    // send status
    loading: sending,

    // Call sendCaptcha to request the interface to send the verification code
    send: sendCaptcha
  } = useCaptcha(() => apiSendCaptcha(mobile.value));
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
import { useState } from 'react';
import { apiSendCaptcha } from './api.js';
import { useCaptcha } from '@alova/scene-react';

const App = () => {
  const [mobile, setMobile] = ref('');
  const {
    // send status
    loading: sending,

    // Call sendCaptcha to request the interface to send the verification code
    send: sendCaptcha
  } = useCaptcha(() => apiSendCaptcha(mobile));

  return (
    <div>
      <input
        value={mobile}
        onChange={({ target }) => setMobile(target.value)}
      />
      <button
        onClick={sendCaptcha}
        loading={sending}
        disabled={sending || countdown > 0}>
        {loading ? 'Sending...' : countdown > 0 ? `${countdown} can be resent` : 'Send verification code'}
      </button>
    </div>
  );
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  import { apiSendCaptcha } from './api.js';
  import { useCaptcha } from '@alova/scene-vue';

  let mobile = '';
  const {
    // send status
    loading: sending,

    // Call sendCaptcha to request the interface to send the verification code
    send: sendCaptcha
  } = useCaptcha(() => apiSendCaptcha(mobile));
</script>

<input bind:value="{mobile}" />
<button
  on:click="{sendCaptcha}"
  loading="{$sending}"
  disabled="{$sending || $countdown > 0}">
  { $loading ? 'Sending...' : $countdown > 0 ? `after ${$countdown} seconds can be resent` : 'Send captcha' }
</button>
```

</TabItem>
</Tabs>

By default, after the verification code is successfully sent, it will count down for 60 seconds, and calling `send` when the countdown is not over will throw an error.

### Custom countdown seconds

You can also customize the countdown seconds

```javascript
useCaptcha(() => apiSendCaptcha(mobile.value), {
  //...
  // highlight-start
  // Set the countdown to 20 seconds
  initialCountdown: 20
  // highlight-end
});
```

## API

### Hook configuration

Inherit all configurations of [**useRequest**](/learning/use-request#api) except `immediate`, `immediate` in `useCaptcha` has been hard-coded to false.

| Name             | Description                                                                                                | Type   | Default | Version |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ------ | ------- | ------- |
| initialCountdown | Initial countdown, when the verification code is sent successfully, it will start countdown with this data | number | 60      | -       |

### Responsive data

Inherit all responsive data from [**useRequest**](/learning/use-request#api).

| Name      | Description                                                                                                 | Type   | Version |
| --------- | ----------------------------------------------------------------------------------------------------------- | ------ | ------- |
| countdown | The current countdown, -1 per second, the verification code can only be sent again after the countdown ends | number | -       |

### Action function

Inherit all action functions of [**useRequest**](/learning/use-request#api).

| name | description                                                                  | function parameters             | return value            | version |
| ---- | ---------------------------------------------------------------------------- | ------------------------------- | ----------------------- | ------- |
| send | Send a request, when the countdown is not over, the call will throw an error | Consistent with useRequest.send | Promise&lt;Response&gt; | -       |

### Event

Inherit all events from [**useRequest**](/learning/use-request#api).
