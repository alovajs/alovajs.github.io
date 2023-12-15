---
title: 通用的上传策略
sidebar_position: 50
---

:::warning

此策略暂未实现，以下为设计文档

:::

> 在使用扩展 hooks 前，确保你已熟悉了 alova 的基本使用。

简便的文件上传，传入 base64、file 对象、blob 对象、arraybuffer 对象、Canvas 都可以直接上传，内部实现自动转换，使用场景有：

1. 上传组件的样式不符合时
2. 上传数据格式多样时

## 功能需求

1. 支持单个、多个文件上传，多个文件同时上传时可以同时上传
2. 多个文件上传进度、总进度
3. 自动转换数据格式为 File
4. 失败可手动触发重新上传
5. 限制文件格式和大小
6. 文件数据回显
7. 自动的缩略图（适用于图片）
8. 文件上传总进度

## useUploader 的全部参数一览

```javascript
const {
  fileList, // 文件数据列表，每项包含文件名、文件路径、上传状态、上传进度，具体格式见下面
  file, // 第一个文件数据项，可以使用计算属性，一般用于上传单个文件使用
  loading, // 是否正在上传，boolean 值
  progress, // 上传总进度，具体格式见下面
  appendFiles, // 添加文件数据项（添加后自动转换为 File 对象）
  upload, // 上传操作，传入下标指定哪个项上传（用于错误重试），未传入上传全部未成功的项
  onFilesAppend, // 添加文件事件
  onExceed, // 文件数量被限制事件
  onFormatMismatch, // 文件格式不匹配事件
  onSuccess, // 每个文件上传成功事件
  onError, // 每个文件上传失败事件
  onComplete // 每个文件上传完成事件
} = useUploader(({ file, name }) => uploadFile(file, name), {
  limit: 3, // 限制上传文件
  accept: ['png', 'jpg', 'pdf'], // 接受的自动转换后的文件格式
  imageTempLink: true, // 是否生成临时图片路径，用于在图片上传完成前也可以展示图片内容，默认为 false

  // 设置一个函数，当上传成功时，可以自动将 fileList 项中的 src 字段替换为服务器上的文件地址，在上传图片时常用
  // data 为响应数据，此函数返回服务端的文件地址
  // 如果未指定此函数则不会有替换行为
  replaceSrcFromResponse: data => data.imgPath
});
```

## useUploader 参数的详细格式及解释

参数格式使用 typescript 表示，便于理解

### 返回的响应式状态

以下都是响应式的值

```typescript
// file值的格式
interface file {
  src?: string; // 临时路径或上传成功后的文件路径，非图片
  file: File; // File 对象
  status: 0 | 1 | 2 | 3; // 0 表示未上传，1 表示上传中，2 表示已完成， 3 表示上传错误
  error?: Error; // 错误对象，当上传错误时需要将错误对象赋值上去
  progress: {
    loaded: number; // 已上传大小
    total: number; // 文件总大小
  };
}
// fileList值的格式
type fileList = file[];

// loading值的格式
type loading = boolean; // 是否正在上传

// 上传总进度信息
interface progress {
  loaded: number; // 已上传的大小，多个文件叠加
  total: number; // 文件总大小，多个文件叠加
  count: number; // 正在上传的文件总数
  successCount: number; // 已成功上传的文件数
  failCount: number; // 上传失败的文件数
}
```

### 返回的操作函数

```typescript
interface RawFile {
  file?: File | string | Blob | ArrayBuffer | HTMLCanvasElement; // 可以传入 base64、file 对象、blob 对象、arraybuffer，canvas 元素，回显时可不传
  src?: string; // 文件预览地址，如果传了即使 imageTempLink 为 true 也不会覆盖它
  name?: string; // 文件名，file 为非 File 对象时必填，在 new File 时用到
  mimeType?: string; // 内部转换为 File 对象时的文件类型，在 new File 时用到，建议 file 为非 File 对象时传入
  status?: 0 | 1 | 2 | 3; // 0 表示未上传，1 表示上传中，2 表示已完成，3 表示上传失败，不传默认为 0
}

/**
 * 追加上传的文件进去，追加后会自动将列表的 file 项转换为 File 对象，此时 name 必须有值
 */
type appendFiles = (
  files: RawFile | RawFile[], // 单个文件时传对象、多个文件时传数组
  start?: number // 从 fileList 哪个位置开始追加
) => number; // 追加成功的个数，可能因为数量限制、格式限制而追加失败

/**
 * 执行上传操作
 * 如果未传入参数则会自动将 fileList 内所有 file 属性有值的、status 为 0 和 3（未上传和上传失败）的重新发起上传请求
 * 如果传入了参数下标，则将 fileList 对应下标的项重新组成一个数组，也通过上面的条件过滤出可上传的进行上传请求，但此时如果有不符合条件的需要报错，而不是忽略
 *
 * 发起上传操作后：
 * 多个文件的上传将会并行发起上传请求，也就是将符合上传条件的文件数组遍历，依次调用 useUploader 的第一个回调函数获取 Method 对象发送请求，内部可以使用 useRequst 实现，因为 fileList 中有很多属性是在 useRequest 都可以提供
 */
type upload = (...indexes: number[]) => void;
```

### 事件绑定函数

每个事件绑定的回调函数都会接收一个事件对象，格式如下

```typescript
// 触发时机：调用appendFiles添加文件时触发
type onFilesAppend = (handler: (event: AlovaFileEvent) => void) => void;
interface AlovaFileEvent {
  files: file[]; // 符合条件的，并且转换过后的文件数组
  rawFiles: RawFile[]; // 在 appendFiles 中传入的符合条件的数据数组，是还未转换过后的文件数组
  allRawFiles: RawFile[]; // 在 appendFiles 中传入的原数据数组
}

// 触发时机：当调用appendFiles时，文件数量被限制时触发
type onExceed = (handler: (event: AlovaFileExceededEvent) => void) => void;
interface AlovaFileExceededEvent extends AlovaFileEvent {
  exceeded: number; // 超过的数量
  limit: number; // 总限制数量
}

// 触发时机：当调用appendFiles时，有文件格式不匹配时触发
type onFormatMismatch = (handler: (event: AlovaFileMismatchEvent) => void) => void;
interface AlovaFileMismatchEvent extends AlovaFileEvent {
  mismatchFiles: RawFile[]; // 格式不匹配的文件数组
}

// 触发时机：每个文件上传成功时触发，内部可复用useRequest的onSuccess事件
type onSuccess = (handler: (event: AlovaFileSuccessEvent) => void) => void;
interface AlovaFileSuccessEvent extends AlovaSuccessEvent {
  file: file; // 上传成功的文件项
}

// 触发时机：每个文件上传失败时触发，内部可复用useRequest的onError事件
type onError = (handler: (event: AlovaFileErrorEvent) => void) => void;
interface AlovaFileErrorEvent extends AlovaErrorEvent {
  file: file; // 上传失败的文件项
}

// 触发时机：每个文件上传完成时触发，内部可复用useRequest的onComplete事件
type onComplete = (handler: (event: AlovaFileCompleteEvent) => void) => void;
interface AlovaFileCompleteEvent extends AlovaCompleteEvent {
  file: file; // 上传成功的文件项
}
```

## 开发指南

开发前请仔细阅读[开发指南](/contributing/developing-guidelines)

开发此 use hook 需要开发以下内容：

1. 在 src/hooks 下编写 useUploader 功能代码
2. useUploader 功能的完整单元测试，建议在 vue 和 react 下测试
3. useUploader 的 typescript 类型声明，需要分别在`packages/scene-react/typings/index.d.ts`、`packages/scene-vue/typings/index.d.ts`、`packages/scene-svelte/typings/index.d.ts`下添加。公共的类型声明可以放在`typings/general.d.ts`中，打包时会将此文件分别复制到子包的`typings`文件夹下，也可以手动运行`npm run cp:files`复制文件夹。
