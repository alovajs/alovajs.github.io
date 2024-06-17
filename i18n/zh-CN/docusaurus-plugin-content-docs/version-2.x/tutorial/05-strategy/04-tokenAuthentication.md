---
title: Token认证拦截器
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

策略类型：拦截器

版本要求：v1.3.0+

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

Token 认证拦截器，对基于 token 的登录、登出、token 附带、token 刷新进行统一管理，并支持无感刷新 token。

## 特性

- 统一维护 Token 身份认证的所有代码，包括登录、登出、token 附带、token 刷新等；
- 支持在客户端和服务端验证 token 过期，并无感刷新 token；
- 依赖 token 的请求自动等待 token 刷新完成再请求；
- 使用元数据设置请求身份；
- 自动放行不依赖 token 的访客请求；

## 安装

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```bash
# npm
npm install @alova/scene-vue --save
# yarn
yarn add @alova/scene-vue

```

</TabItem>
<TabItem value="2" label="react">

```bash
# npm
npm install @alova/scene-react --save
# yarn
yarn add @alova/scene-react

```

</TabItem>

<TabItem value="3" label="svelte">

```bash
# npm
npm install @alova/scene-svelte --save
# yarn
yarn add @alova/scene-svelte

```

</TabItem>
</Tabs>

:::info

以下所有拦截器都是可选的，只需要选择需要使用的即可。

:::

## 绑定 Token 认证拦截器

Token 身份认证是通过全局的拦截器完成的，分别提供了`createClientTokenAuthentication`和`createServerTokenAuthentication` 用于基于客户端和服务端的身份认证。

- 基于客户端的身份认证：表示从客户端判断 token 是否过期，例如在登录时获取到的 token 过期时间；
- 基于服务端的身份认证：表示从服务端返回的状态判断 token 是否过期，例如`status`为 401 时表示过期；

### 绑定基于客户端的身份认证的拦截器

```javascript
import { createClientTokenAuthentication } from '@alova/scene-*';
import { createAlova } from 'alova';

const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
  // ...
});

const alovaInstance = createAlova({
  // ...
  beforeRequest: onAuthRequired(method => {
    // ...原请求前拦截器
  }),
  responded: onResponseRefreshToken((response, method) => {
    //...原响应成功拦截器
    return response.json();
  })
});
```

在`onResponseRefreshToken`中也可以绑定响应错误和完成的拦截器，也和原来的用法相同。

```javascript
createAlova({
  // ...
  // highlight-start
  responded: onResponseRefreshToken({
    onSuccess: (response, method) => {
      //...原响应成功拦截器
    },
    onError: (error, method) => {
      //...原响应错误拦截器
    },
    onComplete: method => {
      //...原响应完成拦截器
    }
  })
  // highlight-end
});
```

如果不需要设置拦截器，也可以不传入拦截器函数。

```javascript
createAlova({
  //...
  // highlight-start
  beforeRequest: onAuthRequired(),
  responded: onResponseRefreshToken()
  // highlight-end
});
```

### 绑定基于服务端的身份认证拦截器

与基于客户端的用法相同

```javascript
import { createServerTokenAuthentication } from '@alova/scene-*';
import { createAlova } from 'alova';

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
  // ...
});

const alovaInstance = createAlova({
  // ...
  beforeRequest: onAuthRequired(method => {
    // ...原请求前拦截器
  }),
  responded: onResponseRefreshToken((response, method) => {
    //...原响应成功拦截器
    return response.json();
  })
});
```

:::warning

当你使用`GlobalFetch`适配器时，你可能会遇到`TypeError: Failed to execute 'json' on 'Response': body stream already read`这个问题，这是因为`Response`的`body stream`只能访问一次，你可以`response.clone().json()`来解决它。

:::

## 在客户端无感刷新 Token

设置`refreshToken`并指定 token 是否过期，以及调用刷新 token 的函数就可以了。当 token 刷新完成前，所有依赖 token 的请求都将会等待 token 刷新完成。

```javascript
createClientTokenAuthentication({
  refreshToken: {
    // 在请求前触发，将接收到method参数，并返回boolean表示token是否过期
    isExpired: method => {
      return tokenExpireTime < Date.now();
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async method => {
      try {
        const { token, refresh_token } = await refreshToken();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
      } catch (error) {
        // token刷新失败，跳转回登录页
        location.href = '/login';
        // 并抛出错误
        throw error;
      }
    }
  }
});
```

:::warning 注意

1. 为了让`refreshToken`请求顺利通过，需要通过元数据标识`authRole`为`refreshToken`。
2. 如果 token 刷新失败必须抛出错误，阻止失败接口重试和等待接口继续请求。

:::

> 了解更多元数据的信息，请前往[method 元数据](/tutorial/getting-started/method-metadata)。

```javascript
export const refreshToken = () => {
  const method = alovaInstance.Get('/refresh_token');
  method.meta = {
    authRole: 'refreshToken'
  };
  return method;
};
```

## 在服务端无感刷新 Token

与在客户端无感刷新 Token 相同，指定 token 是否过期，以及调用刷新 token 的函数就可以了。当 token 刷新完成前，所有依赖 token 的请求都将会等待 token 刷新完成。

### 在请求成功拦截器中处理

当使用`GlobalFetch`时，只要服务端返回了响应数据，就会触发响应成功拦截器，此时我们需要在响应成功拦截器中处理 token 的刷新。

```javascript
createServerTokenAuthentication({
  refreshTokenOnSuccess: {
    // 响应时触发，可获取到response和method，并返回boolean表示token是否过期
    // 当服务端返回401时，表示token过期
    isExpired: (response, method) => {
      return response.status === 401;
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async (response, method) => {
      try {
        const { token, refresh_token } = await refreshToken();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
      } catch (error) {
        // token刷新失败，跳转回登录页
        location.href = '/login';
        // 并抛出错误
        throw error;
      }
    }
  }
});
```

### 在请求错误拦截器中处理

当使用`axios`拦截器时，服务端返回了非`200/300`的状态码就会触发响应错误拦截器，此时我们需要在响应错误拦截器中处理 token 的刷新。

```javascript
createServerTokenAuthentication({
  refreshTokenOnError: {
    // 响应时触发，可获取到error和method，并返回boolean表示token是否过期
    // 当服务端返回401时，表示token过期
    isExpired: (error, method) => {
      return error.response.status === 401;
    },

    // 当token过期时触发，在此函数中触发刷新token
    handler: async (error, method) => {
      try {
        const { token, refresh_token } = await refreshToken();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
      } catch (error) {
        // token刷新失败，跳转回登录页
        location.href = '/login';
        // 并抛出错误
        throw error;
      }
    }
  }
});
```

:::warning 注意

1. 为了让`refreshToken`请求顺利通过，需要通过元数据标识`authRole`为`refreshToken`。
2. 如果 token 刷新失败必须抛出错误，阻止失败接口重试和等待接口继续请求。

:::

> 了解更多元数据的信息，请前往[method 元数据](/tutorial/getting-started/method-metadata)。

```javascript
export const refreshToken = () => {
  const method = alovaInstance.Get('/refresh_token');
  method.meta = {
    authRole: 'refreshToken'
  };
  return method;
};
```

## 放行访客请求

有些接口不需要依赖 token 认证，我们称它们为“访客请求”，此时我们可以设置它们的元数据为`authRole: null`来绕过前端的拦截，让它们顺利发出请求和接收响应。

```javascript
export const requestTokenNotRequired = () => {
  const method = alovaInstance.Get('/token_not_required');
  method.meta = {
    authRole: null
  };
  return method;
};
```

## 登录拦截

在身份认证拦截器中，你还可以拦截登录请求，在拦截器中保存登录信息，达到统一维护身份认证代码的目的。

首先标识登录请求的元数据为`authRole: 'login'`。

```javascript
export const login = () => {
  const method = alovaInstance.Get('/login');
  method.meta = {
    authRole: 'login'
  };
  return method;
};
```

再在登录拦截器中保存登录信息。

```javascript
createClientTokenAuthentication({
  login(response, method) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refresh_token', response.refresh_token);
  }
});
```

> `createServerTokenAuthentication`的登录拦截器用法相同。

## 附加 token

通常，我们会在`beforeRequest`附加 token 到请求信息中。在 Token 认证拦截器中提供了`assignToken`回调函数用于附加 token，它会过滤访客请求和登录请求，并在请求前触发，也可以达到统一维护身份认证代码的目的。

```javascript
createClientTokenAuthentication({
  assignToken: method => {
    method.config.headers.Authorization = localStorage.getItem('token')};
  }
});
```

> `createServerTokenAuthentication`的 assignToken 回调函数用法相同。

## 登出拦截

当你的登出也需要调用接口时，也可以拦截登出请求，清除登录信息。

首先标识登出请求的元数据为`authRole: 'logout'`。

```javascript
export const logout = () => {
  const method = alovaInstance.Get('/logout');
  method.meta = {
    authRole: 'logout'
  };
  return method;
};
```

再在登出拦截器中清除登录信息。

```javascript
createClientTokenAuthentication({
  logout(response, method) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }
});
```

> `createServerTokenAuthentication`的登录拦截器用法相同。

## 自定义标识身份

在上面的元数据身份标识中，实际上都默认的身份标识，如果需要自定义身份标识，你可以按下面这样设置。

### token 刷新身份标识

```javascript
createClientTokenAuthentication({
  refreshToken: {
    // highlight-start
    metaMatches: {
      refreshToken: true
    }
    // highlight-end
    // ...
  }
});
```

```javascript
createServerTokenAuthentication({
  refreshTokenOnSuccess: {
    // highlight-start
    metaMatches: {
      refreshToken: true
    }
    // highlight-end
    // ...
  },
  refreshTokenOnError: {
    // highlight-start
    metaMatches: {
      refreshToken: true
    }
    // highlight-end
    // ...
  }
});
```

然后，元数据中具有`refreshToken: true`的请求，就会被认定为`refreshToken`身份。

```javascript
export const refreshToken = () => {
  const method = alovaInstance.Get('/refresh_token');
  method.meta = {
    refreshToken: true
  };
  return method;
};
```

### 访客身份标识

```javascript
createClientTokenAuthentication({
  visitorMeta: {
    isVisitor: true
  }
});
```

然后，元数据中具有`isVisitor: true`的请求，就会被认定为访客身份。

```javascript
export const requestTokenNotRequired = () => {
  const method = alovaInstance.Get('/token_not_required');
  method.meta = {
    isVisitor: true
  };
  return method;
};
```

### 登录身份标识

```javascript
createClientTokenAuthentication({
  login: {
    // highlight-start
    metaMatches: {
      login: true
    },
    // highlight-end
    handler(response, method) {
      // 登录拦截器
    }
  }
});
```

然后，元数据中具有`login: true`的请求，就会被认定为`login`身份。

```javascript
export const login = () => {
  const method = alovaInstance.Get('/login');
  method.meta = {
    login: true
  };
  return method;
};
```

### 登出身份标识

```javascript
createClientTokenAuthentication({
  logout: {
    // highlight-start
    metaMatches: {
      logout: true
    },
    // highlight-end
    handler(response, method) {
      // 登出拦截器
    }
  }
});
```

然后，元数据中具有`logout: true`的请求，就会被认定为`logout`身份。

```javascript
export const logout = () => {
  const method = alovaInstance.Get('/logout');
  method.meta = {
    logout: true
  };
  return method;
};
```

> `createServerTokenAuthentication`的登录拦截器用法相同。

## Typescript

默认情况下，`createClientServerTokenAuthentication`和`createServerTokenAuthentication`适配了`GlobalFetch`请求适配器，你只需要指定`statesHook`的类型，如下：

```typescript
// highlight-start
const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication<
  typeof VueHook
>({
  // highlight-end
  //...
});

const alovaInstance = createAlova({
  // ...
  statesHook: VueHook,
  beforeRequest: onAuthRequired(method => {
    // method的类型为 Method<any, any, any, any, RequestInit, Response, Headers>
  }),
  responded: onResponseRefreshToken((response, method) => {
    // response的类型为Response
    return response.json();
  })
});
```

如果你使用的不是`GlobalFetch`请求适配器，你还需要指定请求适配器的类型，这也很简单。

以下为 axios 请求适配器为例，在`createClientTokenAuthentication`中指定请求适配器类型。

```typescript
import { axiosRequestAdapter } from '@alova/adapter-axios';

// highlight-start
const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication<
  typeof VueHook,
  typeof axiosRequestAdapter
>({
  // highlight-end
  //...
});
const alovaInstance = createAlova({
  //...
  statesHook: VueHook,
  // highlight-start
  beforeRequest: onAuthRequired(method => {
    // method的类型为 Method<any, any, any, any, AlovaAxiosRequestConfig, AxiosResponse, AxiosResponseHeaders>
    // highlight-end
  }),
  // highlight-start
  responded: onResponseRefreshToken((response, method) => {
    // response的类型为AxiosResponse
    // highlight-end
    return response.data;
  })
});
```

基于服务端的 Token 认证拦截器的用法相同。

```typescript
import { axiosRequestAdapter } from '@alova/adapter-axios';

// highlight-start
createServerTokenAuthentication<typeof VueHook, typeof axiosRequestAdapter>({
  // highlight-end
  //...
});
```
