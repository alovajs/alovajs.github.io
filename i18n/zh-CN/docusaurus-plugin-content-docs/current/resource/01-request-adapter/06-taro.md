---
title: Taro适配器
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 提示

此插件只支持 react 16.8+、vue3 版本的 taro 应用。

:::

## 安装

<Tabs>
<TabItem value="1" label="npm">

```bash
npm install @alova/adapter-taro --save
```

</TabItem>
<TabItem value="2" label="yarn">

```bash
yarn add @alova/adapter-taro
```

</TabItem>
</Tabs>

:::warning React-Native 应用

如果你正在使用 Taro 开发 React-Native 应用，请确保`metro >= 0.76.0`，并在`metro.config.js`中开启`resolver.unstable_enablePackageExports`

[关于 metro 的 unstable_enablePackageExports 参数](https://facebook.github.io/metro/docs/configuration/#unstable_enablepackageexports-experimental)

:::

:::warning 依赖预编译问题

在 Taro v3.5 beta 中新增了[依赖预编译功能](https://docs.taro.zone/blog/2022/05/19/Taro-3.5-beta#2-%E4%BE%9D%E8%B5%96%E9%A2%84%E7%BC%96%E8%AF%91)并在开发模式下默认开启，当你正在 Taro 中同时使用`alova`库和`@alova/scene-react(vue)`时可能导致报 `` [alova]can not call useHooks until set the `statesHook` at alova instance.``的错误，这是由于 prebundle 功能重复打包了两份不同的`alova`包导致，此时关闭 prebundle 功能即可解决此问题。

```js
// config/dev.ts
export default {
  // ...
  compiler: {
    type: 'webpack5',
    prebundle: {
      // 关闭prebundle
      enable: false
    }
  }
} satisfies UserConfigExport

```

感谢[LBinin 的 issue](https://github.com/alovajs/scene/issues/63)。

此问题已向 Taro 团队提交[issue](https://github.com/NervJS/taro/issues/15728)，期待解决此问题。

:::

## 使用方法

### 创建 alova

调用 **AdapterTaro** 将返回*请求适配器*、_存储适配器_，以及*ReactHook*，因此你不再需要设置这三个项，使用方法完全一致。

<Tabs groupId="framework">
<TabItem value="2" label="react">

```javascript
import { createAlova } from 'alova';
import AdapterTaro from '@alova/adapter-taro';

const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org',
  ...AdapterTaro()
});
```

</TabItem>

<TabItem value="1" label="vue">

```javascript
import { createAlova } from 'alova';
import AdapterTaroVue from '@alova/adapter-taro/vue';

const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org',
  ...AdapterTaroVue()
});
```

</TabItem>
</Tabs>

### 请求

请求的使用方法与 web 环境中使用完全一致。已经完全兼容`Taro.request`，你可以在创建 method 实例的*config*中指定`Taro.request`支持的[全部配置项](https://taro-docs.jd.com/docs/apis/network/request/)

<Tabs groupId="framework">
<TabItem value="2" label="react">

```jsx
const list = () =>
  alovaInst.Get('/list', {
    // 设置的参数将传递给Taro.request
    enableHttp2: true
  });

const App = () => {
  const { loading, data } = useRequest(list);

  return (
    { loading ? <View>加载中...</View> : null }
    <View>请求数据为：{ JSON.stringify(data) }</View>
  )
};
```

</TabItem>
<TabItem value="1" label="vue">

```html
<tempate>
  <view v-if="loading">加载中...</view>
  <view>请求数据为：{{ data }}</view>
</tempate>

<script setup>
  const list = () =>
    alovaInst.Get('/list', {
      // 设置的参数将传递给Taro.request
      enableHttp2: true
    });
  const { loading, data } = useRequest(list);
</script>
```

</TabItem>
</Tabs>

### 上传

在 method 实例的*config*中设置`requestType: 'upload'`时表示上传文件，请求适配器将会调用`Taro.uploadFile`，上传的文件数据放在 method 实例的 data 中，你需要在 data 中指定`name`和`filePath`，这 2 个参数将传到`Taro.uploadFile`中，同时，你还可以在 data 中指定这 2 个参数外的其他参数，请求适配器会将它们传入到`formData`参数中。

同样的，已经完全兼容`Taro.uploadFile`，你可以在创建 method 实例的*config*中指定`Taro.uploadFile`支持的[全部配置项](https://taro-docs.jd.com/docs/apis/network/upload/uploadFile)，如果还有额外的参数需要设置，请在 method 实例的*config*中指定。

<Tabs groupId="framework">
<TabItem value="2" label="react">

```jsx
const uploadFile = (name, filePath, formData) =>
  alovaInst.Post(
    '/uploadImg',
    {
      name,
      filePath,

      // 额外数据将传入uni.uploadFile的formData中
      ...formData
    },
    {
      // 设置请求方式为上传，适配器内将调用uni.uploadFile
      requestType: 'upload',

      // 开启上传进度
      enableUpload: true
    }
  );

const App = () => {
  const { loading, data, uploading, send } = useRequest(uploadFile, {
    immediate: false
  });

  const handleImageChoose = () => {
    Taro.chooseImage({
      success: chooseImageRes => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        send('fileName', tempFilePaths[0], {
          extra1: 'a',
          extra2: 'b'
        });
      }
    });
  };

  return (
    { loading ? <View>上传中...</View> : null }
    <View>上传进度：{ uploading.loaded }/{ uploading.total }</View>
    <Button onClick={handleImageChoose}>上传图片</Button>
    {/* ... */}
  )
}
```

</TabItem>
<TabItem value="1" label="vue">

```html
<tempate>
  <view v-if="loading">上传中...</view>
  <view>上传进度：{{ uploading.loaded }}/{{ uploading.total }}</view>
  <button @click="handleImageChoose">上传图片</button>
  <!-- ... -->
</tempate>

<script setup>
  const uploadFile = (name, filePath, formData) =>
    alovaInst.Post(
      '/uploadImg',
      {
        name,
        filePath,

        // 额外数据将传入uni.uploadFile的formData中
        ...formData
      },
      {
        // 设置请求方式为上传，适配器内将调用uni.uploadFile
        requestType: 'upload',

        // 开启上传进度
        enableUpload: true
      }
    );

  const { loading, data, uploading, send } = useRequest(uploadFile, {
    immediate: false
  });

  const handleImageChoose = () => {
    Taro.chooseImage({
      success: chooseImageRes => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        send('fileName', tempFilePaths[0], {
          extra1: 'a',
          extra2: 'b'
        });
      }
    });
  };
</script>
```

</TabItem>
</Tabs>

### 下载

在 method 实例的*config*中设置`requestType: 'download'`时表示下载文件，请求适配器将会调用`Taro.downloadFile`。

同样的，已经完全兼容`Taro.downloadFile`，你可以在创建 method 实例的*config*中指定`Taro.downloadFile`支持的[全部配置项](https://taro-docs.jd.com/docs/apis/network/download/downloadFile)，如果还有额外的参数需要设置，请在 method 实例的*config*中指定。

<Tabs groupId="framework">
<TabItem value="2" label="react">

```jsx
const downloadFile = filePath =>
  alovaInst.Get('/bigImage.jpg', {
    // 设置请求方式为下载，适配器内将调用uni.downloadFile
    requestType: 'download',
    filePath,

    // 开启下载进度
    enableDownload: true
  });

const App = () => {
  const { loading, data, downloading, send } = useRequest(downloadFile, {
    immediate: false
  });
  const handleImageDownload = () => {
    send('file_save_path');
  };

  return (
    { loading ? <View>下载中...</View> : null }
    <View>下载进度：{ downloading.loaded }/{ downloading.total }</View>
    <Button onClick={handleImageDownload}>下载图片</Button>
    {/* ... */}
  );
}
```

</TabItem>
<TabItem value="1" label="vue">

```html
<tempate>
  <view v-if="loading">下载中...</view>
  <view>下载进度：{{ downloading.loaded }}/{{ downloading.total }}</view>
  <button @click="handleImageDownload">下载图片</button>
  <!-- ... -->
</tempate>

<script setup>
  const downloadFile = filePath =>
    alovaInst.Get('/bigImage.jpg', {
      // 设置请求方式为下载，适配器内将调用uni.downloadFile
      requestType: 'download',
      filePath,

      // 开启下载进度
      enableDownload: true
    });

  const { loading, data, downloading, send } = useRequest(downloadFile, {
    immediate: false
  });

  const handleImageDownload = () => {
    send('file_save_path');
  };
</script>
```

</TabItem>
</Tabs>

## 模拟请求适配器兼容

在使用 Taro 开发应用时，我们仍然可能需要用到模拟请求，只是默认情况下，[模拟请求适配器(@alova/mock)](/resource/request-adapter/alova-mock)的响应数据是一个`Response`实例，即默认兼容`alova/fetch`请求适配器，当在 Taro 环境下使用时，我们需要让模拟请求适配器的响应数据是兼容 Taro 适配器的，因此你需要使用**@alova/adapter-taro**包中导出的`taroMockResponse`作为响应适配器。

```javascript
import { defineMock, createAlovaMockAdapter } from '@alova/mock';
import AdapterTaro, { taroRequestAdapter, taroMockResponse } from '@alova/adapter-taro';

const mocks = defineMock({
  // ...
});

// 模拟数据请求适配器
export default createAlovaMockAdapter([mocks], {
  // 指定taro请求适配器后，未匹配模拟接口的请求将使用这个适配器发送请求
  httpAdapter: taroRequestAdapter,

  //  模拟响应适配器，指定后响应数据将转换为taro兼容的数据格式
  onMockResponse: taroMockResponse
});

export const alovaInst = createAlova({
  baseURL: 'https://api.alovajs.org',
  timeout: 5000,
  ...AdapterTaro({
    // 通过环境变量控制是否使用模拟请求适配器
    mockRequest: process.env.NODE_ENV === 'development' ? mockAdapter : undefined
  })
  // ...
});
```

## Typescript

taro 请求适配器 提供了完整的类型适配，method 配置、响应数据的类型将与 taro 的类型完全匹配。

### method 配置

在创建 method 实例时，除了 method 中通用的配置项外，你还可以使用`Taro.request`、`Taro.uploadFile`和`Taro.downloadFile`中的配置项，我们已经在类型中去除了和 method 实例通用配置冲突的项。

```typescript
/**
 * Taro.request请求额外参数
 */
export type TaroRequestConfig = Omit<
  Taro.request.Option,
  'url' | 'data' | 'header' | 'method' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * Taro.uploadFile额外参数
 */
export type TaroUploadConfig = Omit<
  Taro.uploadFile.Option,
  | 'url'
  | 'filePath'
  | 'name'
  | 'header'
  | 'formData'
  | 'timeout'
  | 'success'
  | 'fail'
  | 'complete'
>;

/**
 * Taro.downloadFile额外参数
 */
export type TaroDownloadConfig = Omit<
  Taro.downloadFile.Option,
  'url' | 'header' | 'timeout' | 'success' | 'fail' | 'complete'
>;

/**
 * 合并的请求配置参数
 */
export type TaroConfig = {
  /**
   * 请求类型，upload表示上传，download表示下载，不填写表示正常请求
   */
  requestType?: 'upload' | 'download';
} & TaroRequestConfig &
  TaroUploadConfig &
  TaroDownloadConfig;
```

### 响应数据

因为 taro 请求适配器同时兼容了`Taro.request`、`Taro.uploadFile`和`Taro.downloadFile`，但它们的响应值类型稍有不同，所以响应数据类型是这样的：

```typescript
type TaroResponse =
  // Taro.request的响应类型
  | Taro.request.SuccessCallbackResult<any>

  // Taro.uploadFile的响应类型
  | Taro.uploadFile.SuccessCallbackResult

  // Taro.downloadFile的响应类型
  | Taro.downloadFile.FileSuccessCallbackResult;
```

在实际使用中，我们通常需要在全局处理响应数据，建议分开场景判断返回数据，一个简单的实例如下：

```typescript
const alovaInst = createAlova(
  baseURL: 'https://api.alovajs.org',
  ...AdapterTaro(),
  responded(response) {
    const { statusCode, data } = response as Taro.request.SuccessCallbackResult<any>;
    if (statusCode >= 400) {
      throw new Error('请求错误');
    }
    return data || null;
  }
});
```
