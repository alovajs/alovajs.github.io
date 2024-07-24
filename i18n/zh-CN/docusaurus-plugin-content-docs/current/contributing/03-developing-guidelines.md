---
title: 开发指南
---

:::info 版本要求

Node.js 18+, pnpm 9+

:::

## 1. fork 仓库

[打开 alova 仓库 fork 页](https://github.com/alovajs/alova/fork)，点击“Create fork”fork 仓库，并将已 fork 的仓库克隆到本地。

## 2. 克隆项目到本地

使用`git clone`命令，或`Github Desktop`应用克隆项目。

## 3. 新建 pull request

你可以在编写完代码后[通过 fork 仓库创建 pull request](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)，也可以分为任意多次提交代码，而无需一次提交完整代码。

## 4. 在本地编码

### 安装依赖

使用`pnpm install`安装依赖。

### 安装推荐插件（vscode）

如果你使用 vscode，将会推荐你安装以下插件：

- eslint：检查代码质量
- prettier：格式化代码
- jest：自动执行单元测试用例，以及执行单个合集或单元测试用例
- EditorConfig：保证文件格式一致

### 项目结构

alova 是一个 monorepo 项目，结构如下：

```
|-.github
| |-ISSUE_TEMPLATE -> github issues模板
| |-workflows -> github action
| |-DISCUSSION_TEMPLATE -> github discussion模板
| |-pull_request_template -> github pull request模板
|-.changeset -> changeset配置
|-.husky -> husky配置
|-.vscode -> vscode配置
|-examples -> alova示例项目
|-internal -> 测试用例的公共模块
|-packages -> 项目源代码
|-scripts -> alova-scripts 脚本
|-其他配置文件

```

### 编码规范

#### 代码格式

请安装推荐的插件，在每次保存文件时，`prettier`和`eslint`会自动格式化代码，因此你可以不必在意格式的问题。

#### 尽量复用代码

在`packages/shared`中定义了公共的变量和方法，请先浏览它们，并尽量复用它们。

#### Typescript

1. 编写 typescript 类型时，请尽量编写合适的类型，并缩小类型范围。

2. `packages/alova`和`packages/client`包的类型是手动编写的，当修改它们时，请确保`packages/alova`和`packages/client`的`typings`也同步更新。

## 5. 单元测试指南

编写完代码后，添加对应的单元测试用例，尽量包含边缘情况的测试。

alova 项目使用 jest 作为单元测试框架，使用 msw 作为模拟服务器。建议使用 TDD 模式。每次修改代码后，运行对应的单元测试并通过它。

:::warning 重要

当你创建 pull request 提交代码时，请确保通过了全部单元测试，如果发现问题也可以再次提交，GitHub action 会再次自动运行。

:::

### 添加测试用例

每个包的单元测试用例存放在`packages/[packageName]/test`文件夹下，请找到对应的测试用例文件添加你的测试用例，如果没有合适的测试合集可自行创建；

### 运行和调试单个测试用例或合集

建议使用**jest**插件（上面推荐的插件之一）对单个用例或合集进行测试，你可以在测试用例中右键点击运行指定的用例，选择`Run Test`运行此测试用例，选择`Debug Test`断点调试此测试用例，如图：

![image](/img/run-single-test.png)

### 运行全部测试用例

1. 使用**jest**插件运行，如下图：

![image](/img/run-all-test.png)

2. 也可以通过命令行`pnpm run test`运行单元测试。

## 6. 提交代码

alova 使用 [changesets](https://github.com/changesets/changesets) 作为发布工具，它可以帮我们自动生成`CHANGELOG`提升版本号和发布，但你需要按以下流程提交代码。

1. 告诉 changeset 哪些包被改动了，使用`pnpm run changeset`命令，它将会以交互式的方式引导你填写。
2. 提交代码到远程仓库，需要确保提交的消息格式遵循[提交信息约定](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，建议你尽量使用`pnpm run commit`来自动生成符合规范的 git message。
3. 创建 pull request，并等待合并。

## 7.添加文档

如果你正在添加新特性，可尝试添加新特性的相关文档说明，详细请阅读[更正或编写文档](/contributing/overview#更正或编写文档)，否则请在 pull request 中说明。
