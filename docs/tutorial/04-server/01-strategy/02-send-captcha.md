---
title: Distributed captcha sending
---

:::info type

server hook

:::

Captcha code sending and captcha, support cluster management captcha code

## Features

- Easy to use;
- Support single machine, redis and other clusters to manage captcha codes;
- Customize captcha code validity time and resend interval;
- Captcha code anti-overwriting;
- Customize captcha code rules;

## Usage

### Basic usage

```javascript
// Create
const { sendCaptcha, verifyCaptcha } = createCaptchaProvider({
  store: RedisAdapter()
});

// Send captcha code
const key = '1234567890';
await sendCaptcha(
  (code, mobile) => alova.Post('/sms/send', { code, mobile }),
  // Mobile phone number as storage key
  { key }
);

// Verify captcha code
const captchaFromUserInput = '1234';
const isValid = await verifyCaptcha(captchaFromUserInput, key);
console.log(isValid ? 'Captcha passed' : 'Captcha code error');
```

### Set the captcha code storage

Before using it, you need to configure the storage of the captcha code through the `store` configuration. It is the storage adapter of Alova. If it is a single machine, you can use the file storage adapter, and in a distributed cluster, you can use the redis adapter. You can select the appropriate adapter in [Storage Adapter](/resource/storage-adapter), or [Custom Storage Adapter](/tutorial/advanced/custom/storage-adapter).

```javascript
const redisAdapter = new RedisStorageAdapter({
  host: 'localhost',
  port: '6379',
  username: 'default',
  password: 'my-top-secret',
  db: 0
});

createCaptchaProvider({
  store: redisAdapter
});
```

### Captcha code expiration time

Use `expireTime` to set the captcha code validity period, in milliseconds, default `300000` (5 minutes).

```javascript
createCaptchaProvider({
  expireTime: 10 * 60 * 1000
});
```

### Captcha code resend interval

Use `resetTime` to set the captcha code resend interval, in milliseconds, default `60000` (1 minute).

```javascript
createCaptchaProvider({
  resetTime: 5 * 60 * 1000
});
```

### Captcha code overwriting prevention

Use `resendFormStore` to set whether to resend the existing captcha code from the storage to prevent the problem of inconsistent captcha codes caused by users sending multiple times.

```javascript
createCaptchaProvider({
  // ...
  resendFormStore: true
});
```

### Custom captcha code generation rules

By default, 4 captcha codes consisting of 0 to 9 will be generated. You can set the captcha code generation rules through `codeSet` configuration. The following three schemes are supported:

#### Preset character set and length

```javascript
createCaptchaProvider({
  // ...
  codeSet: ['A', 'B', 'C', 1, 2, 3]
});
```

You can set the character set and length through `codeSet` configuration.

```javascript
createCaptchaProvider({
  // ...
  codeSet: {
    chars: ['A', 'B', 'C', 1, 2, 3], // optional
    length: 6 // Generate 6-digit captcha code, optional
  }
});
```

#### Completely customize generation logic

You can also specify `codeSet` as a function to customize the generation rules.

```javascript
createCaptchaProvider({
  codeSet: () => {
    // Generate a captcha code containing a check digit
    const baseCode = Math.random().toString().slice(2, 6);
    const checksum = baseCode.split('').reduce((a, b) => a + +b, 0) % 10;
    return baseCode + checksum; // such as "24682"
  }
});
```

### Custom storage key prefix

To prevent conflicts with existing storage keys, you can set the storage key prefix through the `keyPrefix` configuration, which defaults to `alova-captcha`

```javascript
createCaptchaProvider({
  // ...
  keyPrefix: 'payment-system'
});
```
