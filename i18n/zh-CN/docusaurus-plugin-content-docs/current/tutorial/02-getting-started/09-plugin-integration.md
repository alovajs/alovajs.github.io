---
title: 编辑器扩展集成
sidebar_position: 90
---

集成 alova 的编辑器扩展可以让它展现出它更强大的力量。

1. 自动生成请求代码和响应数据类型，在 js 项目中也能体验对接口数据的智能提示。
2. 将 api 文档嵌入代码中，带你体验边查边用 API 的效果。
3. 定时更新 api 并主动通知前端开发，不再依赖服务端开发人员通知。

<a className="button button--primary">安装 VS Code 扩展</a>

> 自动生成支持 swagger-v2 和 openapi-v3 规范。

## 配置

使用扩展时，你需要指定从 openapi 文件的输入源和输出目录等，在项目根目录下创建`alova.config.js`，具体配置如下：

```js
// alova.config.js
module.exports = {
  // api生成设置数组，每项代表一个自动生成的规则，包含生成的输入输出目录、规范文件地址等等
  generator: [
    // 服务器1
    {
      // input参数1：openapi的json文件url地址
      input: 'http://localhost:3000/openapi.json',

      // input参数2：以当前项目为相对目录的本地地址
      // input: 'openapi/api.json'

      // input参数3：没有直接指向openapi文件时，是一个文档地址，必须配合platform参数指定文档类型
      // input: 'http://192.168.5.123:8080'

      // （可选）platform为支持openapi的平台，目前只支持swagger，默认为空
      // 当指定了此参数后，input字段只需要指定文档的地址而不需要指定到openapi文件
      platform: 'swagger'

      // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
      output: 'src/api',

      // （可选）指定生成的响应数据的mediaType，以此数据类型来生成200状态码的响应ts格式，默认application/json
      responseMediaType: 'application/json',

      // （可选）指定生成的请求体数据的bodyMediaType，以此数据类型来生成请求体的ts格式，默认application/json
      bodyMediaType: 'application/json',

      /**
       * （可选）生成代码的类型，可选值为auto/ts/typescript/module/commonjs，默认为auto，会通过一定规则判断当前项目的类型，如果生成不正确你也可以自定义指定类型：
       * ts/typescript：意思相同，表示生成ts类型文件
       * module：生成esModule规范文件
       * commonjs：表示生成commonjs规范文件
       */
      type: "auto",

      /**
       * （可选）过滤或转换生成的api接口函数，返回一个新的apiDescriptor来生成api调用函数，未指定此函数时则不转换apiDescripor对象
       */
      handleApi: apiDescriptor => {
        // 返回falsy值表示过滤此api
        if (!apiDescriptor.path.startWith('/user')) {
          return;
        }

        apiDescriptor.parameter = apiDescriptor.parameter.filter(param => param.in === 'header' && param.name === 'token');
        delete apiDescriptor.requestBody.id;
        apiDescriptor.url = apiDescriptor.url.replace('/user', '');
        return apiDescriptor;
      }
    },

    // 服务器2
    {
      // ...
    }
  ],

  // （可选）是否自动更新接口，默认开启，每5分钟检查一次，false时关闭
  autoUpdate: true,

  /* 也可以配置更详细的参数
  autoUpdate: {
    // 编辑器开启时更新，默认false
    launchEditor: true,
    // 自动更新间隔，单位毫秒
    interval: 5 * 60 * 1000
  }
  */
}

```
