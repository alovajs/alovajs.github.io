---
title: FAQs
---

## Why to create alova?

Data requests have always been an indispensable and important part of applications. Since the birth of XMLHttpRequest, request schemes have emerged in endlessly. Client-side data interaction exploration has always focused on the simplicity of requests, such as `$.ajax`, `axios`, `fetch api` and Request tools such as `react-query`, the coding form continues to evolve from callback functions, Promise, to usehook. These js libraries have done a good job in making requests simple, but they only provide common functions, which means For different request scenarios such as sharing requests, paging requests, form submissions, uploading and downloading files, etc., developers still need to write complex codes themselves, which reduces development efficiency and performance cannot be guaranteed. As user experience becomes more and more important, In this era, application fluency has become more and more important.

Additionally, the collaboration between client and server is also separated. Front-end engineers need to consult API documents and manually write API functions, and any changes of APIs need to actively notify front-end engineers, which will make your product more uncontrollable.

**We think there is a simpler solution is that based on your request scenarios such as pagination, form submission, breakpoint resumption, etc., select the corresponding useHook, which will help you manage data and control when requests should be sent**. This allows developers to achieve more efficient Client-Server data interaction while writing little code.

Additionally, alova has very flexible expansion capabilities to implement request strategies in different scenarios. You can also customize your own request scenarios. This part is in [Custom Chapter](/tutorial/advanced/custom).

In order to cover more request scenarios, we also abstracted the request scenarios into [Request scene model(RSM)](/about/RSM), which explains alova's request strategy scheme well. In the future, alova will continue to carry forward our exploration of request strategies.

## Alternative to the request libraries?

alova is a request strategy library, which was originally created to provide specific request strategy solutions for different request scenarios, so as to achieve a smooth request experience more concisely and elegantly, such as `$.ajax`, `axios` and `fetch- api`, etc. provide good support for request sending and response receiving, they are an essential part of the [RSM](/about/RSM) process (request events), alova still needs to dependent on them to make requests, so we can Think of alova as an weaponry of the request library, making the request library more powerful.

## Why binding UI framework?

Decoupling a js library means using it in more scenarios. For example, axios can be used in nodejs, but it also means that developers need to write more template code, such as using useHooks to encapsulate axios. However, alova abandons more usage scenarios brought about by decoupling, and positions the Scope of usage in conjunction with the UI framework to use alova in the most streamlined way. This is for the benefit of developers and is prevalent in a UI framework. Sometimes, deep binding can provide developers with direct-use functions and improve the developer's experience without requiring too much template code.

## Why does the request function use PascalCase specification?

Different from the axios, taking the GET method as an example, `axios.get` is a request action, while `alova.Get` creates a method instance but actually does not send request.

## Troubleshooting

Refer to [Troubleshooting](/tutorial/project/troubleshooting)
