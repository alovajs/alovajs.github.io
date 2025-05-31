---
title: 分布式验证码服务
---

:::info 类型

server hook

:::

验证码发送和校验，支持集群管理验证码。

## 特性

- 使用简单；
- 支持单机、redis等集群管理验证码；
- 自定义验证码有效时间和重发间隔时间；
- 验证码防覆盖；
- 自定义验证码规则；

## 使用

### 基础用法

```javascript
// 创建
const { sendCaptcha, verifyCaptcha } = createCaptchaProvider({
  store: RedisAdapter()
});

// 发送验证码
const key = '1234567890';
await sendCaptcha(
  (code, mobile) => alova.Post('/sms/send', { code, mobile }),
  // 手机号作为存储键
  { key }
);

// 验证验证码
const captchaFromUserInput = '1234';
const isValid = await verifyCaptcha(captchaFromUserInput, key);
console.log(isValid ? '验证通过' : '验证码错误');
```

### 设置验证码存储器

在使用之前，需要通过`store`配置设置验证码的存储器，它是alova的存储适配器，如果是单机下可以使用文件存储适配器、分布式集群下可以使用redis适配器，你可以在[存储适配器](/resource/storage-adapter)中选择合适的适配器，也可以[自定义存储适配器](/tutorial/advanced/custom/storage-adapter)。

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

### 验证码过期时间

通过`expireTime`配置设置验证码有效期，单位毫秒，默认`300000`（5分钟）。

```javascript
createCaptchaProvider({
  expireTime: 10 * 60 * 1000
});
```

### 验证码重发间隔时间

通过`resetTime`配置设置验证码重发间隔时间，单位毫秒，默认`60000`（1分钟）。

```javascript
createCaptchaProvider({
  resetTime: 5 * 60 * 1000
});
```

### 验证码防覆盖

通过`resendFormStore`配置设置是否从存储重新发送已有验证码，防止用户多次发送导致验证码不一致的问题。

```javascript
createCaptchaProvider({
  // ...
  resendFormStore: true
});
```

### 自定义验证码生成规则

默认情况下，将会生成4为0到9组成的验证码，你可以通过`codeSet`配置设置验证码生成规则，支持以下三种方案：

#### 预设字符集和长度

```javascript
createCaptchaProvider({
  // ...
  codeSet: ['A', 'B', 'C', 1, 2, 3]
});
```

你有可以以通过`codeSet`配置设置字符集和长度。

```javascript
createCaptchaProvider({
  // ...
  codeSet: {
    chars: ['A', 'B', 'C', 1, 2, 3], // 可选
    length: 6 // 生成6位验证码，可选
  }
});
```

#### 完全自定义生成逻辑

也可以将`codeSet`指定为函数，自定义生成规则。

```javascript
createCaptchaProvider({
  codeSet: () => {
    // 生成包含校验位的验证码
    const baseCode = Math.random().toString().slice(2, 6);
    const checksum = baseCode.split('').reduce((a, b) => a + +b, 0) % 10;
    return baseCode + checksum; // 如"24682"
  }
});
```

### 自定义存储key前缀

为了防止与已存在的存储键冲突，可以通过`keyPrefix`配置设置存储键前缀，默认为`alova-captcha`

```javascript
createCaptchaProvider({
  // ...
  keyPrefix: 'payment-system'
});
```
