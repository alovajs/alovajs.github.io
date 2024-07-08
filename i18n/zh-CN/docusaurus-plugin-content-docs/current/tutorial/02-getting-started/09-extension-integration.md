---
title: 编辑器扩展集成
---

集成 alova 的编辑器扩展可以让它展现出它更强大的力量。

1. 自动生成请求代码和响应数据类型，在 js 项目中也能体验对接口数据的智能提示。
2. 将 api 文档嵌入代码中，带你体验边查边用 API 的效果。
3. 定时更新 api 并主动通知前端开发，不再依赖服务端开发人员通知。

<a className="button button--primary" href="vscode:extension/Alova.alova-vscode-extension">安装 VS Code 扩展</a>

> 自动生成支持 swagger-v2 和 openapi-v3 规范。

## 配置

使用扩展时，你需要指定从 openapi 文件的输入源和输出目录等，你可以在项目根目录下创建配置文件，它支持以下格式：

1. `alova.config.cjs`：commonjs 规范的配置文件，使用`module.exports`导出配置。
2. `alova.config.js`：ESModule 规范的配置文件，使用`export default`导出配置。
3. `alova.config.ts`：typescript 格式的配置文件，使用`export default`导出配置。

具体的配置参数如下，以 commonjs 为例。

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
      platform: 'swagger',

      // 接口文件和类型文件的输出路径，多个generator不能重复的地址，否则生成的代码会相互覆盖
      output: 'src/api',

      // （可选）指定生成的响应数据的mediaType，以此数据类型来生成200状态码的响应ts格式，默认application/json
      responseMediaType: 'application/json',

      // （可选）指定生成的请求体数据的bodyMediaType，以此数据类型来生成请求体的ts格式，默认application/json
      bodyMediaType: 'application/json',

      // （可选）指定生成的api版本，默认为auto，会通过当前项目安装的alova版本判断当前项目的版本，如果生成不正确你也可以自定义指定版本
      version: 'auto',

      /**
       * （可选）生成代码的类型，可选值为auto/ts/typescript/module/commonjs，默认为auto，会通过一定规则判断当前项目的类型，如果生成不正确你也可以自定义指定类型：
       * ts/typescript：意思相同，表示生成ts类型文件
       * module：生成esModule规范文件
       * commonjs：表示生成commonjs规范文件
       */
      type: 'auto',

      /**
       * （可选）过滤或转换生成的api接口函数，返回一个新的apiDescriptor来生成api调用函数，未指定此函数时则不转换apiDescripor对象
       */
      handleApi: apiDescriptor => {
        // 返回falsy值表示过滤此api
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

    // 服务器2
    {
      // ...
    }
  ],

  // （可选）是否自动更新接口，默认开启，每5分钟检查一次，false时关闭
  autoUpdate: true

  /* 也可以配置更详细的参数
  autoUpdate: {
    // 编辑器开启时更新，默认false
    launchEditor: true,
    // 自动更新间隔，单位毫秒
    interval: 5 * 60 * 1000
  }
  */
};
```

## 调用 API

生成的 API 代码默认通过全局的`Apis`变量访问，你可以享受编辑器为你带来的智能提示来快速预览 API 信息，让你可以边查边使用 API。

![显示接口的详细信息](/img/vscode-api-doc.png)

其中`pet`是 API 的 tag，API 名称对应`operationId`。

![](/img/vscode-namespace-operationid.png)

在使用接口时，可以通过`params/pathParams/data/headers`来指定请求参数，它将会智能提示此接口需要的参数。此外，你还可以指定 method 实例的其他 config 参数。

```js
useRequest(() =>
  Apis.user.changeProfile({
    // （可选）query参数
    params: {
      id: 12
    },
    // （可选）path参数
    pathParams: {
      id2: 20
    },
    // （可选）body参数
    data: {
      name: 'alova',
      age: 18
    },
    // （可选）header参数
    headers: {
      'Content-Type': 'application/json'
    },

    // 其他method支持的config配置项
    cacheFor: 100 * 1000,
    transform: response => response.detail
  })
);
```

## 快速访问 API

通常，我们不可能知道每个 API 的 tag 和 operationId，为了快速访问不同的 API，你可以通过目标 API 的描述或 url 关键词快速定位到对应的 API，通过触发词`a->`触发快速定位。

### 通过 url 查找

![](/img/vscode-query-with-url.png)

### 通过描述查找

![](/img/vscode-query-with-description.png)

## 设置 alova 参数

通常我们会在`createAlova`中设置全局参数，在自动生成的代码中，你可以进入`${output}/index.[js/ts]`中进行设置，`${output}`是你在配置文件中指定的`output`目录。当重新生成代码时，此文件不会被覆盖。

`index`文件内容如下：

```js
import { createAlova } from 'alova';
import GlobalFetch from 'alova/GlobalFetch';
import vueHook from 'alova/vue';
import { createApis, withConfigType } from './createApis';

// 当前api对应的alova实例，你可以在此修改参数。
export const alovaInstance = createAlova({
  baseURL: 'openapi文件中的server参数',
  statesHook: vueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest: method => {},
  responded: res => {
    return res.json();
  }
});

// 可复用的method参数配置
export const $$userConfigMap = withConfigType({});

/**
 * @type {APIS}
 */
const Apis = createApis(alovaInstance, $$userConfigMap);
globalThis.Apis = Apis;
export default Apis;
```

你可以在`createAlova`中像往常一样编写拦截器，更换请求适配器。

有一点需要注意，由于 method 实例是自动生成的，你不能直接在创建 method 时设置`transform/cacheFor`等 method 参数，需要达到相同的效果，你可以在`withConfigType({})`中指定对应参数。

以下是一个对比的例子。

```js
// 手动定义调用函数
export const useProfile = () =>
  alovaInstance.Get('/user/profile', {
    cacheFor: 100 * 1000,
    transform(data) {
      return data.detail;
    }
  });
```

```js
// 为自动生成的代码设置method参数
export const $$userConfigMap = withConfigType({
  'user.profile': {
    cacheFor: 100 * 1000,
    transform(data) {
      return data.detail;
    }
  }
});
```

user 为 tag，profile 为 operationId，具体你可以打开`${output}/apiDefinitions.[js/ts]`中查看所有的 api 接口路径。
