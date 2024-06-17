---
title: Token authentication interceptor
sidebar_position: 40
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

Policy type: Interceptor

Version requirements: v1.3.0+

:::

> Before using extension hooks, make sure you are familiar with the basic use of alova.

Token authentication interceptor provides unified management of token-based login, logout, token assignment, and token refresh, and supports silent token refresh.

## Features

- ✨ Unified maintenance of all codes for token identity authentication, including login, logout, token assignment, token refresh, etc.;
- ✨ Supports verification of token expiration on the client and server, and refreshes the token without any warning;
- ✨ Requests that rely on tokens automatically wait for the token refresh to complete before requesting;
- ✨ Set request ID with metadata;
- ✨ Automatically release visitor requests that do not rely on tokens;

## Install

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

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

:::info

All the following interceptors are optional, just choose the ones you want to use.

:::

## Bind Token authentication interceptor

Token identity authentication is completed through global interceptors, which provide `createClientTokenAuthentication` and `createServerTokenAuthentication` for client- and server-based identity authentication respectively.

- Client-based identity authentication: means judging whether the token has expired from the client, such as the token expiration time obtained during login;
- Server-based identity authentication: It indicates whether the token has expired based on the status returned from the server. For example, when `status` is 401, it means it has expired;

### Bind client-based authentication interceptor

```javascript
import { createClientTokenAuthentication } from '@alova/scene-*';
import { createAlova } from 'alova';

const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication({
  // ...
});

const alovaInstance = createAlova({
  // ...
  beforeRequest: onAuthRequired(method => {
    // ...interceptor before original request
  }),
  responded: onResponseRefreshToken((response, method) => {
    //...original response success interceptor
    return response.json();
  })
});
```

In `onResponseRefreshToken`, you can also bind response error and completion interceptors, which is the same as the original usage.

```javascript
createAlova({
  // ...
  // highlight-start
  responded: onResponseRefreshToken({
    onSuccess: (response, method) => {
      //...original response success interceptor
    },
    onError: (error, method) => {
      //...original response error interceptor
    },
    onComplete: method => {
      //...original response completion interceptor
    }
  })
  // highlight-end
});
```

If you don't need to set an interceptor, you don't need to pass in the interceptor function.

```javascript
createAlova({
  //...
  // highlight-start
  beforeRequest: onAuthRequired(),
  responded: onResponseRefreshToken()
  // highlight-end
});
```

### Bind server-based authentication interceptor

Same as client-based usage

```javascript
import { createServerTokenAuthentication } from '@alova/scene-*';
import { createAlova } from 'alova';

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication({
  // ...
});

const alovaInstance = createAlova({
  // ...
  beforeRequest: onAuthRequired(method => {
    // ...interceptor before original request
  }),
  responded: onResponseRefreshToken((response, method) => {
    //...original response success interceptor
    return response.json();
  })
});
```

:::warning

When you use the `GlobalFetch` adapter, you may encounter the problem `TypeError: Failed to execute 'json' on 'Response': body stream already read`. This is because the `body stream` of `Response` can only be accessed once, you can `response.clone().json()` to solve it.

:::

## Refresh Token silently on the client

Just set `refreshToken` and specify whether the token expires, and call the function to refresh the token. When the token refresh is completed, all requests that rely on the token will wait for the token refresh to complete.

```javascript
createClientTokenAuthentication({
  refreshToken: {
    // Triggered before the request, the method parameter will be received and a boolean will be returned to indicate whether the token has expired.
    isExpired: method => {
      return tokenExpireTime < Date.now();
    },

    // Triggered when the token expires, trigger the refresh token in this function
    handler: async method => {
      try {
        const { token, refresh_token } = await refreshToken();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
      } catch (error) {
        // redirect to login page once token refresh failed.
        location.href = '/login';
        // and must throw error.
        throw error;
      }
    }
  }
});
```

:::warning Attention

1. In order for the `refreshToken` request to pass smoothly, the `authRole` needs to be marked as `refreshToken` through metadata.
2. If the token refresh fails, an error must be thrown to prevent the failed API from retrying and the waiting APIs from continuing the request.

:::

> For more information about metadata, go to [method metadata](/tutorial/getting-started/method-metadata).

```javascript
export const refreshToken = () => {
  const method = alovaInstance.Get('/refresh_token');
  method.meta = {
    authRole: 'refreshToken'
  };
  return method;
};
```

## Refresh Token silently on the server side

The same as refreshing the token silently on the client, just specify whether the token expires and call the function to refresh the token. When the token refresh is completed, all requests that rely on the token will wait for the token refresh to complete.

### Processed in request success interceptor

When using `GlobalFetch`, as long as the server returns the response data, the response success interceptor will be triggered. At this time, we need to handle the token refresh in the response success interceptor.

```javascript
createServerTokenAuthentication({
  refreshTokenOnSuccess: {
    // Triggered when responding, the response and method can be obtained, and a boolean is returned to indicate whether the token has expired.
    // When the server returns 401, it means the token has expired.
    isExpired: (response, method) => {
      return response.status === 401;
    },

    // Triggered when the token expires, trigger the refresh token in this function
    handler: async (response, method) => {
      try {
        const { token, refresh_token } = await refreshToken();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
      } catch (error) {
        // redirect to login page once token refresh failed.
        location.href = '/login';
        // and must throw error.
        throw error;
      }
    }
  }
});
```

:::warning Special attention

1. In order for the `refreshToken` request to pass smoothly, the `authRole` needs to be marked as `refreshToken` through metadata.
2. If the token refresh fails, an error must be thrown to prevent the failed interface from retrying and the waiting interface from continuing the request.

:::

### Handled in request error interceptor

When using the `axios` interceptor, if the server returns a status code other than `200/300`, the response error interceptor will be triggered. At this time, we need to handle the token refresh in the response error interceptor.

```javascript
createServerTokenAuthentication({
  refreshTokenOnError: {
    // Triggered when responding, error and method can be obtained, and boolean is returned to indicate whether the token has expired.
    // When the server returns 401, it means the token has expired.
    isExpired: (error, method) => {
      return error.response.status === 401;
    },

    // Triggered when the token expires, trigger the refresh token in this function
    handler: async (error, method) => {
      try {
        const { token, refresh_token } = await refreshToken();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
      } catch (error) {
        // redirect to login page once token refresh failed.
        location.href = '/login';
        // and must throw error.
        throw error;
      }
    }
  }
});
```

:::warning Attention

1. In order for the `refreshToken` request to pass smoothly, the `authRole` needs to be marked as `refreshToken` through metadata.
2. If the token refresh fails, an error must be thrown to prevent the failed API from retrying and the waiting APIs from continuing the request.

:::

> For more information about metadata, please go to [method metadata](/tutorial/getting-started/method-metadata).

```javascript
export const refreshToken = () => {
  const method = alovaInstance.Get('/refresh_token');
  method.meta = {
    authRole: 'refreshToken'
  };
  return method;
};
```

## Release visitor request

Some interfaces do not need to rely on token authentication. We call them "guest requests". At this time, we can set their metadata to `authRole: null` to bypass the front-end interception and allow them to send requests and receive responses smoothly.

```javascript
export const requestTokenNotRequired = () => {
  const method = alovaInstance.Get('/token_not_required');
  method.meta = {
    authRole: null
  };
  return method;
};
```

## Login interception

In the identity authentication interceptor, you can also intercept login requests and save login information in the interceptor to achieve the purpose of unified maintenance of identity authentication codes.

First identify the metadata of the login request as `authRole: 'login'`.

```javascript
export const login = () => {
  const method = alovaInstance.Get('/login');
  method.meta = {
    authRole: 'login'
  };
  return method;
};
```

Then save the login information in the login interceptor.

```javascript
createClientTokenAuthentication({
  login(response, method) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refresh_token', response.refresh_token);
  }
});
```

> The login interceptor usage of `createServerTokenAuthentication` is the same.

## Assign token

Usually, we will append token to the request information in `beforeRequest`. The `assignToken` callback function is provided in the Token authentication interceptor for assigning tokens. It will filter guest requests and login requests and trigger them before the requests. It can also achieve the purpose of unified maintenance of identity authentication codes.

```javascript
createClientTokenAuthentication({
   assignToken: method => {
     method.config.headers.Authorization = localStorage.getItem('token')};
   }
});
```

> The usage of assignToken callback function of `createServerTokenAuthentication` is the same.

## Logout interception

When your logout also requires calling the interface, you can also intercept the logout request and clear the login information.

First identify the logout request metadata as `authRole: 'logout'`.

```javascript
export const logout = () => {
  const method = alovaInstance.Get('/logout');
  method.meta = {
    authRole: 'logout'
  };
  return method;
};
```

Then clear the login information in the logout interceptor.

```javascript
createClientTokenAuthentication({
  logout(response, method) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }
});
```

> The login interceptor usage of `createServerTokenAuthentication` is the same.

## Custom identification identity

The above metadata identities are actually the default identities. If you need to customize the identity, you can set it as follows.

### token refresh identity

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

Then, requests with `refreshToken: true` in the metadata will be identified as `refreshToken`.

```javascript
export const refreshToken = () => {
  const method = alovaInstance.Get('/refresh_token');
  method.meta = {
    refreshToken: true
  };
  return method;
};
```

### Visitor identify

```javascript
createClientTokenAuthentication({
  visitorMeta: {
    isVisitor: true
  }
});
```

Then, requests with `isVisitor: true` in the metadata will be identified as visitors.

```javascript
export const requestTokenNotRequired = () => {
  const method = alovaInstance.Get('/token_not_required');
  method.meta = {
    isVisitor: true
  };
  return method;
};
```

### Login identity

```javascript
createClientTokenAuthentication({
  login: {
    // highlight-start
    metaMatches: {
      login: true
    },
    // highlight-end
    handler(response, method) {
      //Login interceptor
    }
  }
});
```

Then, requests with `login: true` in the metadata will be identified as `login` identity.

```javascript
export const login = () => {
  const method = alovaInstance.Get('/login');
  method.meta = {
    login: true
  };
  return method;
};
```

### Log out identity

```javascript
createClientTokenAuthentication({
  logout: {
    // highlight-start
    metaMatches: {
      logout: true
    },
    // highlight-end
    handler(response, method) {
      //Logout interceptor
    }
  }
});
```

Then, requests with `logout: true` in the metadata will be identified as `logout`.

```javascript
export const logout = () => {
  const method = alovaInstance.Get('/logout');
  method.meta = {
    logout: true
  };
  return method;
};
```

> The login interceptor usage of `createServerTokenAuthentication` is the same.

## Typescript

By default, `createClientServerTokenAuthentication` and `createServerTokenAuthentication` are adapted to the `GlobalFetch` request adapter, you can only specify the type of `StatesHook`, as follows:

```typescript
// highlight-start
const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication<typeof VueHook>({
  // highlight-end
  //...
});

const alovaInstance = createAlova({
  // ...
  beforeRequest: onAuthRequired(method => {
    // The type of method is Method<any, any, any, any, RequestInit, Response, Headers>
  }),
  responded: onResponseRefreshToken((response, method) => {
    //The response type is Response
    return response.json();
  })
});
```

If you are not using the `GlobalFetch` request adapter, You also need to specify the type of request adapter, which is also simple.

The following is an example of the axios request adapter. Specify the request adapter type in `createClientTokenAuthentication`.

```typescript
import { axiosRequestAdapter } from '@alova/adapter-axios';

// highlight-start
const { onAuthRequired, onResponseRefreshToken } = createClientTokenAuthentication<
  typeof ReactHook,
  typeof axiosRequestAdapter
>({
  // highlight-end
  //...
});
const alovaInstance = createAlova({
  //...
  // highlight-start
  beforeRequest: onAuthRequired(method => {
    // The type of method is Method<any, any, any, any, AlovaAxiosRequestConfig, AxiosResponse, AxiosResponseHeaders>
    // highlight-end
  }),
  // highlight-start
  responded: onResponseRefreshToken((response, method) => {
    //The response type is AxiosResponse
    // highlight-end
    return response.data;
  })
});
```

The server-based Token authentication interceptor is used in the same way.

```typescript
import { axiosRequestAdapter } from '@alova/adapter-axios';

// highlight-start
createServerTokenAuthentication<typeof ReactHook, typeof axiosRequestAdapter>({
  // highlight-end
  //...
});
```
