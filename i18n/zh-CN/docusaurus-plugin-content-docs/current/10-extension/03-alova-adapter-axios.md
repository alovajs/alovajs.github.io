---
title: axios适配器
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 安装

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-axios --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-axios
```

</TabItem>
</Tabs>

## 使用方法

### 创建 alova

使用 **axiosRequestAdapter** 作为 alova 的请求适配器。

```javascript
import { createAlova } from 'alova';
import { axiosRequestAdapter } from '@alova/adapter-axios';

const alovaInst = createAlova(
  // ...
  requestAdapter: axiosResponseAdapter(),
  // ...
);
```

### 请求

请求的使用方法与 web 环境中使用完全一致。已经完全兼容**axios**，你可以在创建 method 实例的*config*中指定`axios`支持的[全部配置项](https://axios-http.com/docs/req_config)

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<tempate>
  <div v-if="loading">加载中...</div>
  <div>请求数据为：{{ data }}</div>
</tempate>

<script setup>
  const list = () =>
    alovaInst.Get('/list', {
      // 设置的参数将传递给axios
      paramsSerializer: params => {
        return Qs.stringify(params, { arrayFormat: 'brackets' });
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
    // 设置的参数将传递给axios
    paramsSerializer: params => {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
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
      // 设置的参数将传递给axios
      paramsSerializer: params => {
        return Qs.stringify(params, { arrayFormat: 'brackets' });
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

使用`FormData`上传文件，这个`FormData`实例会被传递到 axios 中，与 axios 上传文件用法保持了一致。

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

在开发应用时，我们仍然可能需要用到模拟请求。只是默认情况下，[模拟请求适配器(@alova/mock)](/extension/alova-mock)的响应数据是一个`Response`实例，即默认兼容`GlobalFetch`请求适配器，当使用 axios 适配器时，我们需要让模拟请求适配器的响应数据是**AxiosResponse**兼容的，错误实例是**AxiosError**，因此你需要使用**@alova/adapter-axios**包中导出的`axiosMockResponse`作为响应适配器。

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import { axiosRequestAdapter, axiosMockResponse } from '@alova/adapter-axios';

const mocks = defineMock({
  // ...
});

// 模拟数据请求适配器
export default createAlovaMockAdapter([mocks], {
  // 指定axios请求适配器后，未匹配模拟接口的请求将使用这个适配器发送请求
  httpAdapter: axiosRequestAdapter(),

  // axiosMockResponse中包含了onMockResponse和onMockError
  // 用于将模拟数据转换为AxiosResponse和AxiosError兼容的格式
  ...axiosMockResponse
});

export const alovaInst = createAlova({
  // ...
  // 通过环境变量控制是否使用模拟请求适配器
  requestAdapter: process.env.NODE_ENV === 'development' ? mockAdapter : axiosRequestAdapter()
});
```

## Typescript

axios 请求适配器 提供了完整的类型适配，method 配置、响应数据的类型将与 axios 的类型完全匹配。

### method 配置

在创建 method 实例时，除了 method 中通用的配置项外，你还可以使用`AxiosRequestConfig`中的配置项，我们已经在类型中去除了和 method 实例通用配置冲突的项。

```typescript
/**
 * axios请求配置参数
 * 去掉了与method冲突的属性
 */
export type AlovaAxiosRequestConfig = Omit<
  AxiosRequestConfig,
  | 'url'
  | 'method'
  | 'baseURL'
  | 'headers'
  | 'params'
  | 'data'
  | 'timeout'
  | 'cancelToken'
  | 'signal'
  | 'onUploadProgress'
  | 'onDownloadProgress'
>;
```

### 响应数据

axios 的响应数据类型是`AxiosResponse`，当你使用 axios 适配器时，也将获得相同格式的响应数据。在实际使用中，我们通常需要在全局处理响应数据，一个简单的实例如下：

```typescript
const alovaInst = createAlova(
  baseURL: 'https://api.alovajs.org',
  requestAdapter: axiosRequestAdapter(),
  responded(response) {
    // response自动被推断为AxiosResponse类型
    return response.data;
  }
});
```

### 错误

当 axios 遇到非 20x 和 30x 的响应状态码时将会抛出错误，为了包含更多信息，axios 将错误实例自定义设计成了一个`AxiosError`实例，而不是普通的 Error 实例，因此当遇到服务端错误或网络错误时都将抛出一个错误，你可以在全局的错误回调中捕获它。

```typescript
const alovaInst = createAlova(
  baseURL: 'https://api.alovajs.org',
  requestAdapter: axiosRequestAdapter(),
  responded: {
    onSuccess(response) {
      // response自动被推断为AxiosResponse类型
      return response.data;
    },
    onError(err: AxiosError) {
      // err默认为any，你可以强制转换为AxiosError处理
      // ...
    }
  }
});
```
