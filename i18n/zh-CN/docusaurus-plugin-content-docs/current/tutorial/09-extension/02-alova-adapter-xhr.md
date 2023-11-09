---
title: XMLHttpRequest适配器
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 安装

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-xhr --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-xhr
```

</TabItem>
</Tabs>

## 使用方法

### 创建 alova

使用 **xhrRequestAdapter** 作为 alova 的请求适配器。

```javascript
import { createAlova } from 'alova';
import { xhrRequestAdapter } from '@alova/adapter-xhr';

const alovaInst = createAlova({
  // ...
  requestAdapter: xhrResponseAdapter()
  // ...
});
```

### 请求

XMLHttpRequest 适配器提供了基本的配置参数，包含`responseType`、`withCredentials`、`mimeType`、`auth`，具体如下：

<Tabs groupId="framework">
<TabItem value="1" label="vue composition">

```html
<tempate>
  <div v-if="loading">加载中...</div>
  <div>请求数据为：{{ data }}</div>
</tempate>

<script setup>
  const list = () =>
    alovaInst.Get('/list', {
      /**
       * 设置响应数据类型
       * 可以设置更改响应类型。 值为：“arraybuffer”、“blob”、“document”、“json”和“text”
       * 默认为“json”
       */
      responseType: 'text',

      /**
       * 当凭证要包含在跨源请求中时为true。 当它们被排除在跨源请求中以及当 cookie 在其响应中被忽略时为 false。 默认为false
       */
      withCredentials: true,

      /**
       * 设置响应数据的mimeType
       */
      mimeType: 'text/plain; charset=x-user-defined',

      /**
       * auth 表示使用 HTTP Basic 身份验证，并提供凭据。
       * 这将设置一个 `Authorization` 标头，覆盖任何现有的
       * 使用 `headers` 设置的 `Authorization` 自定义标头。
       * 请注意，只有 HTTP Basic 身份验证可以通过此参数进行配置。
       * 对于 Bearer 令牌等，请改用 `Authorization` 自定义标头。
       */
      auth: {
        username: 'name1',
        password: '123456'
      }
    });
  const { loading, data } = useRequest(list);
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const list = () =>
  alovaInst.Get('/list', {
    /**
       * 设置响应数据类型
       * 可以设置更改响应类型。 值为：“arraybuffer”、“blob”、“document”、“json”和“text”
       * 默认为“json”
       */
      responseType: 'text',

      /**
       * 当凭证要包含在跨源请求中时为true。 当它们被排除在跨源请求中以及当 cookie 在其响应中被忽略时为 false。 默认为false
       */
      withCredentials: true,

      /**
       * 设置响应数据的mimeType
       */
      mimeType: 'text/plain; charset=x-user-defined',

      /**
       * auth 表示使用 HTTP Basic 身份验证，并提供凭据。
       * 这将设置一个 `Authorization` 标头，覆盖任何现有的
       * 使用 `headers` 设置的 `Authorization` 自定义标头。
       * 请注意，只有 HTTP Basic 身份验证可以通过此参数进行配置。
       * 对于 Bearer 令牌等，请改用 `Authorization` 自定义标头。
       */
      auth: {
        username: 'name1',
        password: '123456'
      }
  });

const App = () => {
  const { loading, data } = useRequest(list);

  return (
    { loading ? <div>加载中...</div> : null }
    <div>请求数据为：{ JSON.stringify(data) }</div>
  )
};
```

</TabItem>
<TabItem value="3" label="svelte">

```html
<script>
  const list = () =>
    alovaInst.Get('/list', {
      /**
       * 设置响应数据类型
       * 可以设置更改响应类型。 值为：“arraybuffer”、“blob”、“document”、“json”和“text”
       * 默认为“json”
       */
      responseType: 'text',

      /**
       * 当凭证要包含在跨源请求中时为true。 当它们被排除在跨源请求中以及当 cookie 在其响应中被忽略时为 false。 默认为false
       */
      withCredentials: true,

      /**
       * 设置响应数据的mimeType
       */
      mimeType: 'text/plain; charset=x-user-defined',

      /**
       * auth 表示使用 HTTP Basic 身份验证，并提供凭据。
       * 这将设置一个 `Authorization` 标头，覆盖任何现有的
       * 使用 `headers` 设置的 `Authorization` 自定义标头。
       * 请注意，只有 HTTP Basic 身份验证可以通过此参数进行配置。
       * 对于 Bearer 令牌等，请改用 `Authorization` 自定义标头。
       */
      auth: {
        username: 'name1',
        password: '123456'
      }
    });
  const { loading, data } = useRequest(list);
</script>

{#if $loading}
<div>加载中...</div>
{/if}
<div>请求数据为：{ data }</div>
```

</TabItem>
</Tabs>

### 上传

使用`FormData`上传文件，这个`FormData`实例会通过`xhr.send`发送到服务端。上传时将自动设置`Content-Type`，不需要自定义设置为`multipart/form-data`。

```javascript
const uploadFile = imageFile => {
  const formData = new FormData();
  formData.append('file', imageFile);
  return alovaInst.Post('/uploadImg', formData, {
    // 开启上传进度
    enableUpload: true
  });
};

const {
  loading,
  data,
  uploading,
  send: sendUpload
} = useRequest(uploadFile, {
  immediate: false
});

// 图片选择事件回调
const handleImageChoose = ({ target }) => {
  sendUpload(target.files[0]);
};
```

### 下载

将请求 url 指向文件地址即可下载，你也可以通过将`enableDownload`设置为 true 来开启下载进度。

```javascript
const downloadFile = () =>
  alovaInst.Get('/bigImage.jpg', {
    // 开启下载进度
    enableDownload: true,
    responseType: 'blob'
  });

const { loading, data, downloading, send, onSuccess } = useRequest(downloadFile, {
  immediate: false
});
onSuccess(({ data: imageBlob }) => {
  // 下载图片
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'image.jpg';
  anchor.click();
  URL.revokeObjectURL(anchor.href);
});
const handleImageDownload = () => {
  send();
};
```

## 模拟请求适配器兼容

在开发应用时，我们仍然可能需要用到模拟请求。只是默认情况下，[模拟请求适配器(@alova/mock)](../extension/alova-mock)的响应数据是一个`Response`实例，即默认兼容`GlobalFetch`请求适配器，当使用 XMLHttpRequest 适配器时，我们需要让模拟请求适配器的响应数据适配 XMLHttpRequest 适配器，此时你需要使用**@alova/adapter-xhr**包中导出的`xhrMockResponse`作为响应适配器。

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import { xhrRequestAdapter, xhrMockResponse } from '@alova/adapter-xhr';

const mocks = defineMock({
  // ...
});

// 模拟数据请求适配器
export default createAlovaMockAdapter([mocks], {
  // 指定请求适配器后，未匹配模拟接口的请求将使用这个适配器发送请求
  httpAdapter: xhrRequestAdapter(),

  // 使用xhrMockResponse，让模拟数据适配XMLHttpRequest适配器
  onMockResponse: xhrMockResponse
});

export const alovaInst = createAlova({
  // ...
  // 通过环境变量控制是否使用模拟请求适配器
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : xhrRequestAdapter()
});
```

## Typescript

XMLHttpRequest 请求适配器 提供了完整的类型适配。

### method 配置

在创建 method 实例时，除了 method 中通用的配置项外，你还可以使用`AlovaXHRRequestConfig`中的配置项。

```typescript
/**
 * xhr请求配置参数
 */
interface AlovaXHRRequestConfig {
  /**
   * 设置响应数据类型。
   *
   * 可以设置更改响应类型。 值为：“arraybuffer”、“blob”、“document”、“json”和“text”。
   * 设置1：如果当前全局对象不是 Window 对象，则忽略设置为“文档”。
   * 设置2：如果状态正在加载或完成，则抛出“InvalidStateError”DOMException。
   * 设置3：如果设置了同步标志且当前全局对象是 Window 对象，则抛出“InvalidAccessError”DOMException。
   * @default "json"
   */
  responseType?: XMLHttpRequestResponseType;

  /**
   * 当凭证要包含在跨源请求中时为true。 当它们被排除在跨源请求中以及当 cookie 在其响应中被忽略时为 false。 默认为false。
   * 如果状态未发送或未打开，或者设置了send() 标志，则抛出“InvalidStateError”DOMException。
   * @default false
   */
  withCredentials?: boolean;

  /**
   * 设置响应数据的mimeType
   */
  mimeType?: string;

  /**
   * `auth` 表示应该使用 HTTP Basic 身份验证，并提供凭据。
   * 这将设置一个 `Authorization` 标头，覆盖任何现有的
   * 使用 `headers` 设置的 `Authorization` 自定义标头。
   * 请注意，只有 HTTP Basic 身份验证可以通过此参数进行配置。
   * 对于 Bearer 令牌等，请改用 `Authorization` 自定义标头。
   */
  auth?: {
    username: string;
    password: string;
  };
}
```

### 响应数据

XMLHttpRequest 适配器响应数据如下：

```typescript
interface AlovaXHRResponseHeaders {
  [x: string]: any;
}
interface AlovaXHRResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  headers: AlovaXHRResponseHeaders;
}
```
