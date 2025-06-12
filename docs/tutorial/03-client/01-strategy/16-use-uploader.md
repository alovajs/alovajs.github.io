---
title: Unified upload strategy
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

:::info strategy type

use hook

alova@3.3+

:::

> Before using extended hooks, make sure you are familiar with the basic use of alova.

Simple file upload, base64, file object, blob object, arraybuffer object, Canvas can be directly uploaded.

Use scenarios include:

1. Only one upload button

2. The style of the upload component does not match

3. The upload data format is diverse

## Features

1. Automatic conversion of multiple formats

2. Support single file and batch upload

3. Get the upload progress and total progress of each file

4. Limit file format and size

5. Automatic preview thumbnail

## Usage

### Basic usage

<Tabs groupId="framework">

<TabItem value="1" label="vue">

```html
<template>
  <button @click="handleUpload">Upload</button>
  <div>Total progress: {{ progress.uploaded / progress.total * 100 }}</div>
  <div>Success number: {{ successCount }}, failure number: {{ failCount }}</div>
  <div v-for="fileItem in fileList">
    <img :src="fileItem.src" />
    <span v-if="fileItem.status === 1"
      >Upload progress: {{ fileItem.progress.uploaded / fileItem.progress.total * 100 }}</span
    >
    <span v-else-if="fileItem.status === 3">{{ fileItem.error.message }}</span>
  </div>
</template>

<script setup>
  const {
    // File data list, each item contains file name, file path, upload status, upload progress, for specific format, see "Upload file data"
    fileList,

    // The first file data item, generally used to upload a single file
    file,

    // Is it uploading
    uploading,

    // Upload error message
    error,

    // Number of successful uploads
    successCount,

    // Number of failed uploads
    failCount,

    // Total upload progress, including uploaded and total
    progress,

    // Add file data items, automatically converted to File objects after adding
    appendFiles,

    // Delete files
    removeFiles,

    // Trigger upload
    upload,

    // Cancel upload
    abort,

    // Each file upload success event
    onSuccess,

    // Each file upload failure event
    onError,

    // Each file upload completion event
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
    // File data list, each item contains file name, file path, upload status, upload progress, see the specific format below
    fileList,

    // The first file data item, generally used to upload a single file
    file,

    // Is it uploading
    uploading,

    // Upload error information
    error,

    // Number of successful uploads
    successCount,

    // Number of upload failures
    failCount,

    // Total upload progress, see the specific format below
    progress,

    // Add file data items, automatically converted to File objects after adding
    appendFiles,

    // Delete files
    removeFiles,

    // Trigger upload
    upload,

    // Cancel upload
    abort,

    // Each file upload success event
    onSuccess,

    // Each file upload failure event
    onError,

    // Each file upload completion event
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));
  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };

  return (
    <>
      <button onClick={handleUpload}>Upload</button>
      <div>Total progress: {(progress.uploaded / progress.total) * 100}</div>
      <div>
        Number of successes: {successCount}, number of failures: {failCount}
      </div>
      {fileList.map(fileItem => (
        <div>
          <img src={fileItem.src} />
          {fileItem.status === 1 ? (
            <span>
              Upload progress: {(fileItem.progress.uploaded / fileItem.progress.total) * 100}
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
    // File data list, each item contains file name, file path, upload status, upload progress, see the specific format below
    fileList,

    // The first file data item, generally used to upload a single file
    file,

    // Is it uploading
    uploading,

    // Upload error information
    error,

    // Number of successful uploads
    successCount,

    // Number of failed uploads
    failCount,

    // Total upload progress, see the specific format below
    progress,

    // Add file data items, automatically converted to File objects after adding
    appendFiles,

    // Delete files
    removeFiles,

    // Trigger upload
    upload,

    // Cancel upload
    abort,

    // Each file upload success event
    onSuccess,

    // Each file upload failure event
    onError,

    // Each file upload completion event
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));

  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };
</script>

<button on:click="{handleUpload}">Upload</button>
<div>Total progress: { $progress.uploaded / $progress.total * 100 }</div>
<div>Success number: { $successCount }, failure number: { $failCount }</div>
{#each $fileList as fileItem}
<div>
  <img src="{fileItem.src}" />
  {#if fileItem.status === 1}
  <span>Upload progress: { fileItem.progress.uploaded / fileItem.progress.total * 100 }</span>
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
    // File data list, each item contains file name, file path, upload status, upload progress, see the specific format below
    fileList,

    // The first file data item, generally used to upload a single file
    file,

    // Is it uploading
    uploading,

    // Upload error information
    error,

    // Number of successful uploads
    successCount,

    // Number of failed uploads
    failCount,

    // Total upload progress, see the specific format below
    progress,

    // Add file data items, automatically converted to File objects after adding
    appendFiles,

    // Delete files
    removeFiles,

    // Trigger upload
    upload,

    // Cancel upload
    abort,

    // Each file upload success event
    onSuccess,

    // Each file upload failure event
    onError,

    // Each file upload completion event
    onComplete
  } = useUploader(({ file, name }) => uploadFile(file, name));
  const handleUpload = async () => {
    await appendFiles();
    await upload();
  };

  return (
    <>
      <button onClick={handleUpload}>Upload</button>
      <div>Total progress: {(progress().uploaded / progress().total) * 100}</div>
      <div>
        Number of successes: {successCount()}, number of failures: {failCount()}
      </div>
      <For each={fileList()}>
        {fileItem => (
          <div>
            <img src={fileItem.src} />
            {fileItem.status === 1 ? (
              <span>
                Upload progress: {(fileItem.progress.uploaded / fileItem.progress.total) * 100}
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

### Append uploading files

`appendFiles` allows you to append files to the upload list by passing in base64, File object, Blob, ArrayBuffer, HTMLCanvasElement data formats, and automatically convert them into a unified File object. The following demonstrates its usage through specific scenarios.

#### Append a single File object

```javascript
// Create an object through new File, the name field is used to identify the file name
const file = {
  file: new File(['file content'], 'report.pdf', { type: 'application/pdf' })
};

// Call appendFiles, if start is not passed, it will be appended to the end of the list by default
const appendCount = await appendFiles(file);
```

#### Batch append file data in multiple formats

Append base64 images, Blob data and Canvas screenshots at the same time.

```javascript
// Base64 image (name and mimeType are required)
const base64File = {
  file: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
  name: 'chart.png', // defaults to image.png
  mimeType: 'image/png' // defaults to the base64 data prefix
};

// Blob data (such as obtained from the clipboard)
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
  name: 'config.json', // defaults to file
  mimeType: 'application/json' // defaults to blob.type
};

// Canvas
const canvas = document.querySelector('canvas');
const canvasFile = {
  file: canvas,
  name: 'screenshot.png', // defaults to image.png
  mimeType: 'image/png' // defaults to blob.type
};

// Batch append files
const appendCount = await appendFiles([base64File, blobFile, canvasFile]);
```

#### Insert to the specified position

Insert the newly uploaded file into the second position of the list.

```javascript
// Insert a CSV file
const insertFile = {
  file: new File(['id,name\n1,John'], 'data.csv', { type: 'text/csv' })
};

// Insert the file to position 2 (index starts at 0)
const appendCount = await appendFiles(insertFile, {
  start: 2
});
```

#### Select file

When no file data is passed, the upload dialog box will be opened by default to select the file.

```javascript
// Append files through appendFiles
const appendCount = await appendFiles({
  // Upload file type, this parameter will be set to the accept attribute of <input type="file">
  // See [https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/input/file#accept]
  accept: 'png, jpg, jpeg',

  // Whether to allow multiple files to be selected, this parameter will be set to the multiple attribute of <input type="file">
  // See [https://developer.mozilla.org/docs/Web/HTML/Element/input/file#multiple]
  multiple: true,

  // Insert to the start of the list
  start: 0
});
```

### Trigger upload

The `upload` function is used to trigger the file upload process, supporting uploading all files or specified files.

#### Automatically upload all pending files

Upload all "not uploaded" or "failed to upload" files in the upload list.

```javascript
const response = await upload();
```

#### Specify specific files to upload

Re-upload the files with indexes 1 and 3. If there are files that have been successfully uploaded, an error will be reported.

```javascript
const response = await upload(1, 3);
```

You can also pass in the item specified in `fileList` to upload

```javascript
const response = await upload(fileList[1], fileList[3]);
```

### Limit the number of files

Use `limit` to limit the number of uploaded files. The default is unlimited.

```javascript
useUploader(({ file, name }) => uploadFile(file, name), {
  // Limit uploaded files
  limit: 3
});
```

### Delete file items

The `removeFiles` function can be used to delete file items in the upload list. The items being uploaded will be interrupted.

```javascript
// Delete all items
removeFiles();
```

```javascript
// Delete items with index 0 and 2
removeFiles(0, 2);
```

You can also pass in the items specified in `fileList` to delete

```javascript
removeFiles(fileList[1], fileList[3]);
```

### Interrupt upload

The `abort` function can be used to interrupt the upload of file items in the list.

```javascript
// Abort all items being uploaded
abort();
```

```javascript
// Abort items with indexes 0 and 2
abort(0, 2);
```

You can also pass in the item specified in `fileList` to abort

```javascript
abort(fileList[1], fileList[3]);
```

### Upload file data

When a file is added to the upload list via `appendFiles`, `fileList` and `file` will be updated, which contains relevant information about the uploaded file.

```javascript
const {
  // Type is File[]
  fileList,

  // Type is File
  file
} = useUploader(({ file, name }) => uploadFile(file, name));
```

The information they contain is as follows:

```typescript
interface File {
  // Temporary path or file path after successful upload, not image
  src?: string;

  // File object
  file: File;

  // 0 means not uploaded, 1 means uploading, 2 means completed, 3 means upload error
  status: 0 | 1 | 2 | 3;

  // Error object, when uploading error, error object needs to be assigned
  error?: Error;

  // Upload progress information
  progress: {
    uploaded: number;
    total: number;
  };
}
```

### Batch upload

By default, when calling `upload` to upload multiple files, the request handler function will be called in a loop, which is usually convenient when the interface only supports single file upload. But when the interface supports batch upload, you can enable batch upload by setting `mode` to `batch`. At this time, the request handler function will only be called once and get the array parameter.

```javascript
useUploader(fileList => batchUpload(fileList), {
  mode: 'batch'
});
```

### Image preview

When uploading images and want to preview them, you can set `localLink` and `replaceSrc`.

```javascript
useUploader(({ file, name }) => uploadFile(file, name), {
  // Generate a temporary image path, which can be used to display the image content before the image is uploaded. The default value is false
  localLink: true,

  // When the upload is successful, the src field in the fileList item can be automatically replaced with the file address on the server. It is often used when uploading images
  // data is the response data. This function returns the file address on the server
  // If this function is not specified, there will be no replacement behavior
  // index is the image index, which is often used when mode is `batch`
  replaceSrc: (data, index) => data.imgPath
});
```

### Customize file selection

As mentioned in `appendFile`, if `files` is not passed in, a dialog box will be opened to select the file. This default is valid on the browser side. When you use this request strategy in a non-browser environment, you can customize the file selection.

The following is an example of selecting an image in react-native.

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

### Hook Configuration

| Name       | Description                                  | Type                                     | Default | Version |
| ---------- | -------------------------------------------- | ---------------------------------------- | ------- | ------- |
| limit      | Limit the number of uploads                  | number                                   | -       | 3.3.0   |
| localLink  | Whether to generate a local preview URL      | boolean                                  | false   | 3.3.0   |
| replaceSrc | Replace the file path with the response data | (response: any, index: number) => string | -       | 3.3.0   |
| mode       | Upload mode, single upload or batch upload   | 'each' \| 'batch'                        | 'each'  | 3.3.0   |

### Responsive data

| Name         | Description                                                                                          | Type                                         | Version |
| ------------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------- |
| fileList     | A list of file data, each item contains the file name, file path, upload status, and upload progress | [AlovaFileItem](#alovafileitem)[]            | 3.3.0   |
| file         | The first file data item, generally used to upload a single file                                     | [AlovaFileItem](#alovafileitem) \| undefined | 3.3.0   |
| uploading    | Is uploading in progress                                                                             | boolean                                      | 3.3.0   |
| error        | Upload error message                                                                                 | Error \| undefined                           | 3.3.0   |
| progress     | Total upload progress, including uploaded and total                                                  | [Progress](#progress)                        | 3.3.0   |
| successCount | Number of successful uploads                                                                         | number                                       | 3.3.0   |
| failCount    | Number of failed uploads                                                                             | number                                       | 3.3.0   |

#### AlovaFileItem

| Name     | Description                                                                      | Type                  | Version |
| -------- | -------------------------------------------------------------------------------- | --------------------- | ------- |
| file     | File object                                                                      | File                  | 3.3.0   |
| src      | File preview src                                                                 | string                | 3.3.0   |
| error    | Error object, with value when upload fails                                       | Error \| undefined    | 3.3.0   |
| status   | 0 means not uploaded, 1 means uploading, 2 means completed, 3 means upload error | 0 \| 1 \| 2 \| 3      | 3.3.0   |
| progress | Current file upload progress                                                     | [Progress](#progress) | 3.3.0   |

#### Progress

| Name     | Description              | Type   | Version |
| -------- | ------------------------ | ------ | ------- |
| uploaded | Number of uploaded files | number | 3.3.0   |
| total    | Total                    | number | 3.3.0   |

### Operation function

| Name        | Description                                                             | Function parameter                                                                                                        | Return value        | Version |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| appendFiles | Add file data item, automatically converted to File object after adding | file: [AlovaRawFile](#alovarawfile) \| [AlovaRawFile](#alovarawfile)[], options?: [FileAppendOptions](#fileappendoptions) | Promise\<number\>   | 3.3.0   |
| upload      | Upload file                                                             | ...positions: Array\<[AlovaFileItem](#alovafileitem) \| number\>                                                          | Promise\<Response\> | 3.3.0   |
| removeFiles | Delete file data item                                                   | ...positions: Array\<[AlovaFileItem](#alovafileitem) \| number\>                                                          | void                | 3.3.0   |
| abort       | Abort file upload                                                       | ...positions: Array\<[AlovaFileItem](#alovafileitem) \| number\>                                                          | void                | 3.3.0   |

#### AlovaRawFile

| Name     | Description                                                       | Type                                                       | Version |
| -------- | ----------------------------------------------------------------- | ---------------------------------------------------------- | ------- |
| file     | File object, base64, Blob, File, ArrayBuffer or HTMLCanvasElement | File \| string \| Blob \| ArrayBuffer \| HTMLCanvasElement | 3.3.0   |
| src      | File preview src                                                  | string?                                                    | 3.3.0   |
| name     | File name                                                         | string?                                                    | 3.3.0   |
| mimeType | File mimeType                                                     | string?                                                    | 3.3.0   |

#### FileAppendOptions

| Name     | Description                                                     | Type     | Version |
| -------- | --------------------------------------------------------------- | -------- | ------- |
| start    | Insert position                                                 | number?  | 3.3.0   |
| multiple | Whether multiple selection is allowed, valid in file dialog box | boolean? | 3.3.0   |
| accept   | Selectable file suffix, valid in file dialog box                | string?  | 3.3.0   |

### Event

| Name       | Description             | Callback parameter | Version |
| ---------- | ----------------------- | ------------------ | ------- |
| onSuccess  | Upload success event    | event              | 3.3.0   |
| onError    | Upload failure event    | event              | 3.3.0   |
| onComplete | Upload completion event | event              | 3.3.0   |
