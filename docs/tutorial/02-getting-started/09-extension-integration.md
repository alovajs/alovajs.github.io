---
title: Editor extension integration
---

Integrating Alova's editor extension can make it more powerful.

1. Automatically generate request code and response data types, and experience smart prompts for interface data in js projects.
2. Embed API documents in the code to experience the effect of checking and using APIs.
3. Update APIs regularly and actively notify front-end developers, no longer relying on server-side developers to notify.

<a className="button button--primary" href="vscode:extension/Alova.alova-vscode-extension">Install VS Code extension</a>

> Automatically generate support for swagger-v2 and openapi-v3 specifications.

## Configuration

When using the extension, you need to specify the input source and output directory from the openapi file, etc. You can create a configuration file in the project root directory, which supports the following formats:

1. `alova.config.cjs`: a configuration file of the commonjs specification, using `module.exports` to export the configuration.

2. `alova.config.js`: a configuration file of the ESModule specification, using `export default` to export the configuration.

3. `alova.config.ts`: a configuration file in typescript format, using `export default` to export the configuration.

The specific configuration parameters are as follows, taking commonjs as an example.

```js
// alova.config.js
module.exports = {
  // API generation setting array, each item represents an automatically generated rule, including the generated input and output directories, standard file addresses, etc.
  generator: [
    // Server 1
    {
      // Input parameter 1: openapi json file url address
      input: 'http://localhost:3000/openapi.json',

      // Input parameter 2: local address with the current project as the relative directory
      // input: 'openapi/api.json'

      // Input parameter 3: When there is no direct reference to the openapi file, it is a document address, and the document type must be specified with the platform parameter
      // input: 'http://192.168.5.123:8080'

      // (Optional) platform is a platform that supports openapi. Currently only swagger is supported. The default is empty
      // When this parameter is specified, the input field only needs to specify the document address without specifying the openapi file
      platform: 'swagger',

      // Output path of interface file and type file. Multiple generators cannot have the same address, otherwise the generated code will overwrite each other.
      output: 'src/api',

      // (Optional) Specify the mediaType of the generated response data. Use this data type to generate the ts format of the response with a 200 status code. The default is application/json.
      responseMediaType: 'application/json',

      // (Optional) Specify the bodyMediaType of the generated request body data. Use this data type to generate the ts format of the request body. The default is application/json.
      bodyMediaType: 'application/json',

      // (Optional) Specify the generated api version. The default is auto. The version of the current project will be determined by the alova version installed in the current project. If the generation is incorrect, you can also customize the specified version.
      version: 'auto',

      /**
       * (Optional) The type of generated code. The optional values ​​are auto/ts/typescript/module/commonjs. The default is auto. The type of the current project will be determined by certain rules. If the generation is incorrect, you can also customize the specified type:
       * ts/typescript: The same meaning, indicating the generation of ts type files
       * module: Generate esModule specification file
       * commonjs: Generate commonjs specification file
       */
      type: 'auto',

      /**
       * (Optional) Filter or convert the generated api interface function, return a new apiDescriptor to generate the api call function, and do not convert the apiDescripor object when this function is not specified
       */
      handleApi: apiDescriptor => {
        // Returning a falsy value means filtering this api
        if (!apiDescriptor.path.startWith('/user')) {
          return;
        }

        apiDescriptor.parameter = apiDescriptor.parameter.filter(
          param => param.in === 'header' && param.name === 'token'
        );
        delete apiDescriptor.requestBody.id;
        apiDescriptor.url = apiDescriptor.url.replace('/user', '');
        return apiDescriptor;
      }
    },

    // Server 2
    {
      // ...
    }
  ],

  // (Optional) Whether to automatically update the interface, enabled by default, checked every 5 minutes, disabled when false
  autoUpdate: true

  /* You can also configure more detailed parameters
  autoUpdate: {
  // Update when the editor is opened, false by default
  launchEditor: true,
  // Automatic update interval, in milliseconds
  interval: 5 * 60 * 1000
  }
  */
};
```

## Call API

The generated API code is accessed by the global `Apis` variable by default. You can enjoy the smart prompts provided by the editor to quickly preview the API information, allowing you to check and use the API at the same time.

![Display detailed information of the interface](/img/vscode-api-doc.png)

Where `pet` is the tag of the API, and the API name corresponds to `operationId`.

![](/img/vscode-namespace-operationid.png)

When using the interface, you can specify the request parameters through `params/pathParams/data/headers`, which will intelligently prompt the parameters required by this interface. In addition, you can also specify other config parameters of the method instance.

```js
useRequest(() =>
  Apis.user.changeProfile({
    // (optional) query parameters
    params: {
      id: 12
    },
    // (optional) path parameters
    pathParams: {
      id2: 20
    },
    // (optional) body parameters
    data: {
      name: 'alova',
      age: 18
    },
    // (optional) header parameters
    headers: {
      'Content-Type': 'application/json'
    },

    // config items supported by other methods
    cacheFor: 100 * 1000,
    transform: response => response.detail
  })
);
```

## Quick access to API

Usually, we cannot know the tag and operationId of each API. In order to quickly access different APIs, you can quickly locate the corresponding API through the description of the target API or the url keyword. API, trigger quick positioning through the trigger word `a->`.

### Search by url

![](/img/vscode-query-with-url.png)

### Search by description

![](/img/vscode-query-with-description.png)

## Set alova parameters

Usually we will set global parameters in `createAlova`. In the automatically generated code, you can go to `${output}/index.[js/ts]` to set it. `${output}` is the `output` directory you specified in the configuration file. When regenerating the code, this file will not be overwritten.

The contents of the `index` file are as follows:

```js
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import vueHook from 'alova/vue';
import { createApis, withConfigType } from './createApis';

// The alova instance corresponding to the current api, you can modify the parameters here.
export const alovaInstance = createAlova({
  baseURL: 'server parameter in openapi file',
  statesHook: vueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest: method => {},
  responded: res => {
    return res.json();
  }
});

// Reusable method parameter configuration
export const $$userConfigMap = withConfigType({});

/**
 * @type {APIS}
 */
const Apis = createApis(alovaInstance, $$userConfigMap);
globalThis.Apis = Apis;
export default Apis;
```

You can write interceptors and replace request adapters as usual in `createAlova`.

One thing to note is that since method instances are automatically generated, you cannot directly set method parameters such as `transform/cacheFor` when creating a method. To achieve the same effect, you can specify the corresponding parameters in `withConfigType({})`.

The following is a comparison example.

```js
// Manually define the calling function
export const useProfile = () =>
  alovaInstance.Get('/user/profile', {
    cacheFor: 100 * 1000,
    transform(data) {
      return data.detail;
    }
  });
```

```js
// Set method parameters for automatically generated code
export const $$userConfigMap = withConfigType({
  'user.profile': {
    cacheFor: 100 * 1000,
    transform(data) {
      return data.detail;
    }
  }
});
```

user is tag, profile is operationId, you can open `${output}/apiDefinitions.[js/ts]` to view all api interface paths.

## Old project migration

If you want to integrate the vscode extension in a project that already uses alova, you need to follow the steps below:

1. Generate code according to the openapi specification file first.

2. Replace the alova instance in `${output}/index.[js/ts]` with the original alova instance code.

3. In the api call function that has been defined in the project, change the import path of the alova instance to `${output}/index.[js/ts]`.

In this way, you can integrate the automatically generated code without changing the original code.

## Notes

1. In a ts project, if you find that vscode cannot correctly prompt, please set `"strictNullChecks": true` in `tsconfig.json`.
