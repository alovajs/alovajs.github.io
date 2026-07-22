## Why to create alova?

Data requests have always been an essential part of applications. Since the advent of XMLHttpRequest, countless request solutions have appeared. The focus of client-server data interaction has been on making requests simple — from `$.ajax` and `axios` to the `fetch` API and tools like `react-query`, the coding style has evolved from callbacks to Promises to hooks. These libraries do a great job of simplifying requests, but they only provide generic features. That means for specific scenarios such as shared requests, pagination, form submission, and file upload/download, developers still have to write complex code themselves, which hurts both efficiency and performance. As user experience matters more and more, application smoothness has become increasingly important.

In addition, the client and server are developed separately. Front-end engineers must read API docs and write API functions by hand, and any API change needs to be communicated to them actively — otherwise your product becomes harder to control.

**We believe there is a simpler approach: based on your request scenario — pagination, form submission, resumable uploads, and so on — pick the matching useHook, and it will manage your data and decide when to send requests.** This lets developers achieve more efficient client-server interaction while writing very little code.

alova is also highly extensible, letting you implement request strategies for different scenarios or even define your own. See the [Customization guide](/tutorial/advanced/custom).

To cover even more scenarios, we abstracted request scenarios into the [Request Scenario Model (RSM)](/about/RSM), which explains alova's request strategy approach well. alova will keep exploring new request strategies in the future.

## Is alova a replacement for request libraries?

alova is a request strategy library. It was created to provide tailored request-strategy solutions for different scenarios, delivering a smoother experience more concisely and elegantly. Libraries like `$.ajax`, `axios`, and the `fetch` API handle sending requests and receiving responses well; they are an essential part of the [RSM](/about/RSM) process (request events). alova still depends on them to actually make requests, so you can think of alova as an enhancement layered on top of a request library, making it more powerful.

## Why is alova tied to a UI framework?

Decoupling a JS library lets it be used in more scenarios — for example, axios runs in Node.js — but it also means developers must write more boilerplate, such as wrapping axios in hooks. alova gives up some of those decoupled use cases and instead targets usage alongside a UI framework, so you can use it in the most concise way. This benefits developers who already work within a UI framework: a tight integration provides ready-to-use features and a better experience without much boilerplate.

## Why do request functions use PascalCase?

Unlike axios, where `axios.get` is a request action, `alova.Get` creates a method instance but does not actually send a request.

## Troubleshooting

Refer to [Troubleshooting](/tutorial/project/troubleshooting)
