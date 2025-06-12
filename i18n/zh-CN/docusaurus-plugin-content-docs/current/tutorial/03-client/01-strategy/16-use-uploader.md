---
title: 统一的上传策略
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info 策略类型

use hook

alova@3.3+

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

简便的文件上传，传入 base64、file 对象、blob 对象、arraybuffer 对象、Canvas 都可以直接上传。

使用场景有：

1. 只有一个上传按钮
2. 上传组件的样式不符合
3. 上传数据格式多样化

## 特性

1. 多种格式自动转换
2. 支持单个文件与批量上传
3. 获取每个文件的上传进度和总进度
4. 限制文件格式和大小
5. 自动的预览缩略图

## 使用

### 基本用法

<Tabs groupId="framework">
<TabItem value="1" label="vue">

```html
<template>
  <button @click="handleUpload">上传</button>
  <div>总进度：{{ progress.uploaded / progress.total * 100 }}</div>
  <div>成功数：{{ successCount }}，失败数：{{ failCount }}</div>
  <div v-for="fileItem in fileList">
    <img :src="fileItem.src" />
    <span v-if="fileItem.status === 1"
      >上传进度：{{ fileItem.progress.uploaded / fileItem.progress.total * 100 }}</span
    >
    <span v-else-if="fileItem.status === 3">{{ fileItem.error.message }}</span>
  </div>
</template>

<script setup>
  const {
    // 文件数据列表，每项包含文件名、文件路径、上传状态、上传进度，具体格式见"上传文件数据"
    fileList,

    // 第一个文件数据项，一般用于上传单个文件使用
    file,

    // 是否正在上传
    uploading,

    // 上传错误信息
    error,

    // 上传成功数
    successCount,

    // 上传失败数
    failCount,

    // 上传总进度，包含uploaded和total
    progress,

    // 添加文件数据项，添加后自动转换为 File 对象
    appendFiles,

    // 删除文件
    removeFiles,

    // 触发上传
    upload,

    // 取消上传
    abort,

    // 每个文件上传成功事件
    onSuccess,

    // 每个文件上传失败事件
    onError,

    // 每个文件上传完成事件
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));

  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };
</script>
```

</TabItem>
<TabItem value="2" label="react">

```jsx
const App = () => {
  const {
    // 文件数据列表，每项包含文件名、文件路径、上传状态、上传进度，具体格式见下面
    fileList,

    // 第一个文件数据项，一般用于上传单个文件使用
    file,

    // 是否正在上传
    uploading,

    // 上传错误信息
    error,

    // 上传成功数
    successCount,

    // 上传失败数
    failCount,

    // 上传总进度，具体格式见下面
    progress,

    // 添加文件数据项，添加后自动转换为 File 对象
    appendFiles,

    // 删除文件
    removeFiles,

    // 触发上传
    upload,

    // 取消上传
    abort,

    // 每个文件上传成功事件
    onSuccess,

    // 每个文件上传失败事件
    onError,

    // 每个文件上传完成事件
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));
  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };

  return (
    <>
      <button onClick={handleUpload}>上传</button>
      <div>总进度：{(progress.uploaded / progress.total) * 100}</div>
      <div>
        成功数：{successCount}，失败数：{failCount}
      </div>
      {fileList.map((fileItem, index) => (
        <div key={index}>
          <img src={fileItem.src} />
          {fileItem.status === 1 ? (
            <span>
              上传进度：{(fileItem.progress.uploaded / fileItem.progress.total) * 100}
            </span>
          ) : fileItem.status === 3 ? (
            <span>{fileItem.error.message}</span>
          ) : null}
        </div>
      ))}
    </>
  );
};
```

</TabItem>

<TabItem value="3" label="svelte">

```html
<script>
  const {
    // 文件数据列表，每项包含文件名、文件路径、上传状态、上传进度，具体格式见下面
    fileList,

    // 第一个文件数据项，一般用于上传单个文件使用
    file,

    // 是否正在上传
    uploading,

    // 上传错误信息
    error,

    // 上传成功数
    successCount,

    // 上传失败数
    failCount,

    // 上传总进度，具体格式见下面
    progress,

    // 添加文件数据项，添加后自动转换为 File 对象
    appendFiles,

    // 删除文件
    removeFiles,

    // 触发上传
    upload,

    // 取消上传
    abort,

    // 每个文件上传成功事件
    onSuccess,

    // 每个文件上传失败事件
    onError,

    // 每个文件上传完成事件
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));

  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };
</script>

<button on:click="{handleUpload}">上传</button>
<div>总进度：{ $progress.uploaded / $progress.total * 100 }</div>
<div>成功数：{ $successCount }，失败数：{ $failCount }</div>
{#each $fileList as fileItem}
<div>
  <img src="{fileItem.src}" />
  {#if fileItem.status === 1}
  <span>上传进度：{ fileItem.progress.uploaded / fileItem.progress.total * 100 }</span>
  {#else if fileItem.status === 3}
  <span>{ fileItem.error.message }</span>
  {/if}
</div>
{/each}
```

</TabItem>
<TabItem value="4" label="solid">

```jsx
const App = () => {
  const {
    // 文件数据列表，每项包含文件名、文件路径、上传状态、上传进度，具体格式见下面
    fileList,

    // 第一个文件数据项，一般用于上传单个文件使用
    file,

    // 是否正在上传
    uploading,

    // 上传错误信息
    error,

    // 上传成功数
    successCount,

    // 上传失败数
    failCount,

    // 上传总进度，具体格式见下面
    progress,

    // 添加文件数据项，添加后自动转换为 File 对象
    appendFiles,

    // 删除文件
    removeFiles,

    // 触发上传
    upload,

    // 取消上传
    abort,

    // 每个文件上传成功事件
    onSuccess,

    // 每个文件上传失败事件
    onError,

    // 每个文件上传完成事件
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));
  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };

  return (
    <>
      <button onClick={handleUpload}>上传</button>
      <div>总进度：{(progress().uploaded / progress().total) * 100}</div>
      <div>
        成功数：{successCount()}，失败数：{failCount()}
      </div>
      <For each={fileList()}>
        {fileItem => (
          <div>
            <img src={fileItem.src} />
            {fileItem.status === 1 ? (
              <span>
                上传进度：{(fileItem.progress.uploaded / fileItem.progress.total) * 100}
              </span>
            ) : fileItem.status === 3 ? (
              <span>{fileItem.error.message}</span>
            ) : null}
          </div>
        )}
      </For>
    </>
  );
};
```

</TabItem>
</Tabs>

### 添加上传文件

`appendFiles` 可以让你通过传入base64、File 对象、Blob、ArrayBuffer、HTMLCanvasElement数据格式追加文件到上传列表，并自动转换为统一的 File 对象。以下通过具体场景演示其用法。

#### 追加单个 File 对象

```javascript
// 通过 new File 创建对象，name 字段用于标识文件名
const file = {
  file: new File(['文件内容'], 'report.pdf', { type: 'application/pdf' })
};

// 调用 appendFiles，不传 start 则默认追加到列表末尾
const appendCount = await appendFiles(file);
```

#### 批量追加多种格式的文件数据

同时追加 base64 图片、Blob 数据和 Canvas 截图。

```javascript
// Base64 图片（需提供 name 和 mimeType）
const base64File = {
  file: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
  name: 'chart.png', // 默认为image.png
  mimeType: 'image/png' // 默认从base64数据前缀中获取
};

// Blob 数据（如从剪贴板获取）
const blob = new Blob(
  [
    JSON.stringify({
      data: 'test'
    })
  ],
  {
    type: 'application/json'
  }
);
const blobFile = {
  file: blob,
  name: 'config.json', // 默认为file
  mimeType: 'application/json' // 默认为blob.type
};

// Canvas
const canvas = document.querySelector('canvas');
const canvasFile = {
  file: canvas,
  name: 'screenshot.png', // 默认为image.png
  mimeType: 'image/png' // 默认为blob.type
};

// 批量追加文件
const appendCount = await appendFiles([base64File, blobFile, canvasFile]);
```

#### 插入到指定位置

将新上传的文件插入到列表的第 2 位。

```javascript
// 插入一个 CSV 文件
const insertFile = {
  file: new File(['id,name\n1,John'], 'data.csv', { type: 'text/csv' })
};

// 插入文件到位置2（索引从 0 开始）
const appendCount = await appendFiles(insertFile, {
  start: 2
});
```

#### 选择文件

当第一个参数不传入文件数据时，默认将打开上传对话框选择文件。

```javascript
// 通过 appendFiles 追加文件
const appendCount = await appendFiles({
  // 上传文件类型，此参数将设置到<input type="file"> 的 accept 属性
  // 具体查看[https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/input/file#accept]
  accept: 'png, jpg, jpeg',

  // 是否允许选择多个文件，此参数将设置到<input type="file"> 的 multiple 属性
  // 具体查看[https://developer.mozilla.org/docs/Web/HTML/Element/input/file#multiple]
  multiple: true,

  // 插入到列表开头
  start: 0
});
```

### 触发上传

`upload` 函数用于触发文件上传流程，支持上传所有文件或指定的文件。

#### 自动上传所有待处理文件

上传列表中所有「未上传」或「上传失败」的文件。

```javascript
const response = await upload();
```

#### 指定上传特定文件

重新上传索引为 1 和 3 的文件，如果存在已上传成功的文件将会报错。

```javascript
const response = await upload(1, 3);
```

也可以传入`fileList`中指定的项进行上传

```javascript
const response = await upload(fileList[1], fileList[3]);
```

### 限制文件数量

通过`limit`限制上传文件数量，默认不限制。

```javascript
useUploader(({ file, name }) => uploadFile(file, name), {
  // 限制上传文件
  limit: 3
});
```

### 删除文件项

通过`removeFiles`函数可以删除上传列表中的文件项，正在上传的项将会被中断。

```javascript
// 删除所有项
removeFiles();
```

```javascript
// 删除索引为 0 和 2 的项
removeFiles(0, 2);
```

也可以传入`fileList`中指定的项进行删除

```javascript
removeFiles(fileList[1], fileList[3]);
```

### 中断上传

通过`abort`函数可以中断上传列表中的文件项。

```javascript
// 中断所有正在上传的项
abort();
```

```javascript
// 中断索引为 0 和 2 的项
abort(0, 2);
```

也可以传入`fileList`中指定的项进行中断

```javascript
abort(fileList[1], fileList[3]);
```

### 上传文件数据

当文件通过`appendFiles`添加到上传列表后，`fileList`和`file`将会被更新，它包含了上传文件的相关信息。

```javascript
const {
  // 类型为File[]
  fileList,

  // 类型为File
  file
} = useUploader(({ file, name }) => uploadFile(file, name));
```

它们包含的信息如下具体如下：

```typescript
interface File {
  // 临时路径或上传成功后的文件路径，非图片
  src?: string;

  // File 对象
  file: File;

  // 0 表示未上传，1 表示上传中，2 表示已完成， 3 表示上传错误
  status: 0 | 1 | 2 | 3;

  // 错误对象，当上传错误时需要将错误对象赋值上去
  error?: Error;

  // 上传进度信息
  progress: {
    uploaded: number;
    total: number;
  };
}
```

### 批量上传

默认情况下，当调用`upload`上传多个文件时，将会循环调用请求handler函数，这通常在接口只支持单个文件上传时比较方便，但当接口支持批量上传时，你可以通过设置`mode`为`batch`来开启批量上传，此时请求handler函数只会调用一次，并且获得数组参数。

```javascript
useUploader(fileList => batchUpload(fileList), {
  mode: 'batch'
});
```

### 图片预览

当上传图片并希望可以预览图片时，你可以设置`localLink`和`replaceSrc`。

```javascript
useUploader(({ file, name }) => uploadFile(file, name), {
  // 生成临时图片路径，用于在图片上传完成前也可以展示图片内容，默认为 false
  localLink: true,

  // 当上传成功时，可以自动将 fileList 项中的 src 字段替换为服务器上的文件地址，在上传图片时常用
  // data 为响应数据，此函数返回服务端的文件地址
  // 如果未指定此函数则不会有替换行为
  // index为图片下标，常用与mode为`batch`时
  replaceSrc: (data, index) => data.imgPath
});
```

### 自定义选择文件

在`appendFile`中提到，如果未传入`files`时将会打开一个对话框选择文件，这种默认在浏览器端有效，当你在非浏览器环境下使用此请求策略时，可以自定义文件选择。

以下是一个在react-native中选择图片的示例。

```javascript
useUploader.selectFile = async fileAppendOptions => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    throw new Error('Camera roll permission not granted');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });

  if (result.didCancel) {
    throw new Error('user canceled');
  }

  return result.assets.map(({ uri, type, name }) => ({
    file: uri,
    name: name || 'image.png',
    mimeType: type || 'image/png'
  }));
};
```

## API

### Hook 配置

| 名称       | 描述                         | 类型                                     | 默认值 | 版本  |
| ---------- | ---------------------------- | ---------------------------------------- | ------ | ----- |
| limit      | 限制上传数                   | number                                   | -      | 3.3.0 |
| localLink  | 是否生成本地预览URL          | boolean                                  | false  | 3.3.0 |
| replaceSrc | 使用响应数据替换文件路径     | (response: any, index: number) => string | -      | 3.3.0 |
| mode       | 上传模式，单个上传或批量上传 | 'each' \| 'batch'                        | 'each' | 3.3.0 |

### 响应式数据

| 名称         | 描述                                                       | 类型                                         | 版本  |
| ------------ | ---------------------------------------------------------- | -------------------------------------------- | ----- |
| fileList     | 文件数据列表，每项包含文件名、文件路径、上传状态、上传进度 | [AlovaFileItem](#alovafileitem)[]            | 3.3.0 |
| file         | 第一个文件数据项，一般用于上传单个文件使用                 | [AlovaFileItem](#alovafileitem) \| undefined | 3.3.0 |
| uploading    | 是否正在上传                                               | boolean                                      | 3.3.0 |
| error        | 上传错误信息                                               | Error \| undefined                           | 3.3.0 |
| progress     | 上传总进度，包含uploaded和total                            | [Progress](#progress)                        | 3.3.0 |
| successCount | 上传成功数                                                 | number                                       | 3.3.0 |
| failCount    | 上传失败数                                                 | number                                       | 3.3.0 |

#### AlovaFileItem

| 名称     | 描述                                                      | 类型                  | 版本  |
| -------- | --------------------------------------------------------- | --------------------- | ----- |
| file     | 文件对象                                                  | File                  | 3.3.0 |
| src      | 文件预览src                                               | string                | 3.3.0 |
| error    | 错误对象，上传失败时有值                                  | Error \| undefined    | 3.3.0 |
| status   | 0 表示未上传，1 表示上传中，2 表示已完成， 3 表示上传错误 | 0 \| 1 \| 2 \| 3      | 3.3.0 |
| progress | 当前文件上传进度                                          | [Progress](#progress) | 3.3.0 |

#### Progress

| 名称     | 描述     | 类型   | 版本  |
| -------- | -------- | ------ | ----- |
| uploaded | 已上传数 | number | 3.3.0 |
| total    | 总数     | number | 3.3.0 |

### 操作函数

| 名称        | 描述                                       | 函数参数                                                                                                                  | 返回值              | 版本  |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| appendFiles | 添加文件数据项，添加后自动转换为 File 对象 | file: [AlovaRawFile](#alovarawfile) \| [AlovaRawFile](#alovarawfile)[], options?: [FileAppendOptions](#fileappendoptions) | Promise\<number\>   | 3.3.0 |
| upload      | 上传文件                                   | ...positions: Array\<[AlovaFileItem](#alovafileitem) \| number\>                                                          | Promise\<Response\> | 3.3.0 |
| removeFiles | 删除文件数据项                             | ...positions: Array\<[AlovaFileItem](#alovafileitem) \| number\>                                                          | void                | 3.3.0 |
| abort       | 中断文件上传                               | ...positions: Array\<[AlovaFileItem](#alovafileitem) \| number\>                                                          | void                | 3.3.0 |

#### AlovaRawFile

| 名称     | 描述                                                           | 类型                                                       | 版本  |
| -------- | -------------------------------------------------------------- | ---------------------------------------------------------- | ----- |
| file     | 文件对象，base64, Blob, File, ArrayBuffer 或 HTMLCanvasElement | File \| string \| Blob \| ArrayBuffer \| HTMLCanvasElement | 3.3.0 |
| src      | 文件预览src                                                    | string?                                                    | 3.3.0 |
| name     | 文件名                                                         | string?                                                    | 3.3.0 |
| mimeType | 文件mimeType                                                   | string?                                                    | 3.3.0 |

#### FileAppendOptions

| 名称     | 描述                             | 类型     | 版本  |
| -------- | -------------------------------- | -------- | ----- |
| start    | 插入位置                         | number?  | 3.3.0 |
| multiple | 是否多选，文件对话框有效         | boolean? | 3.3.0 |
| accept   | 可选择的文件后缀，文件对话框有效 | string?  | 3.3.0 |

### 事件

| 名称       | 描述         | 回调参数 | 版本  |
| ---------- | ------------ | -------- | ----- |
| onSuccess  | 上传成功事件 | event    | 3.3.0 |
| onError    | 上传失败事件 | event    | 3.3.0 |
| onComplete | 上传完成事件 | event    | 3.3.0 |
