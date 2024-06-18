---
title: Extension integration
sidebar_position: 90
---

Integrating Alova's editor extension can make it more powerful.

1. Automatically generate request code and response data types, and experience smart prompts for interface data in js projects.
2. Embed api documents in the code to experience the effect of checking and using APIs.
3. Update api regularly and actively notify front-end development, no longer relying on server-side developers to notify.

<a className="button button--primary">Install VS Code extension</a>

> Automatically generate support for swagger-v2 and openapi-v3 specifications.

## Configuration

When using the extension, you need to specify the input source and output directory from the openapi file, etc. Create `alova.config.js` in the project root directory. The specific configuration is as follows:

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
      // When this parameter is specified, the input field only needs to specify the address of the document without specifying the openapi file
      platform: 'swagger',

      // Output path of interface file and type file. Multiple generators cannot have the same address, otherwise the generated code will overwrite each other
      output: 'src/api',

      // (Optional) Specify the mediaType of the generated response data. Use this data type to generate the response ts format of the 200 status code. The default is application/json
      responseMediaType: 'application/json',

      // (Optional) Specify the bodyMediaType of the generated request body data. Use this data type to generate the ts format of the request body. The default is application/json
      bodyMediaType: 'application/json',

      /**
       * (Optional) The type of generated code. The optional values ​​are auto/ts/typescript/module/commonjs. The default is auto. The type of the current project will be determined by certain rules. If the generation is incorrect, you can also customize the specified type:
       * ts/typescript: The same meaning, indicating the generation of ts type files
       * module: Generate esModule specification files
       * commonjs: Indicates the generation of commonjs specification files
       */
      type: 'auto',

      /**
       * (Optional) Filter or convert the generated api interface function, return a new apiDescriptor to generate the api call function, if this function is not specified, the apiDescripor object is not converted
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
