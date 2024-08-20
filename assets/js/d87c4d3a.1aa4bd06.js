"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[6619],{35060:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>f,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var r=t(85893),a=t(11151),s=t(74866),o=t(85162);const i={title:"Middleware"},l=void 0,c={id:"tutorial/advanced/middleware",title:"Middleware",description:"Request middleware is an asynchronous function. it provides a powerful ability to control almost all behaviors of a request. If you just use alova, then you probably don't need to use request middleware, because it is mainly used to complete custom request strategies, no matter simple or complex request strategies, you may use it, let's look at it next What magical powers does it have.",source:"@site/versioned_docs/version-v2/tutorial/06-advanced/04-middleware.md",sourceDirName:"tutorial/06-advanced",slug:"/tutorial/advanced/middleware",permalink:"/v2/tutorial/advanced/middleware",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/versioned_docs/version-v2/tutorial/06-advanced/04-middleware.md",tags:[],version:"v2",sidebarPosition:4,frontMatter:{title:"Middleware"},sidebar:"tutorial",previous:{title:"Method Matcher",permalink:"/v2/tutorial/advanced/method-matcher"},next:{title:"custom method key",permalink:"/v2/tutorial/advanced/custom-method-key"}},d={},u=[{value:"Middleware function",id:"middleware-function",level:2},{value:"Control response data",id:"control-response-data",level:2},{value:"change request",id:"change-request",level:2},{value:"Control errors",id:"control-errors",level:2},{value:"Catch errors",id:"catch-errors",level:3},{value:"Throw an error",id:"throw-an-error",level:3},{value:"Control response delay",id:"control-response-delay",level:2},{value:"More than that",id:"more-than-that",level:2},{value:"Included request information",id:"included-request-information",level:2},{value:"Modify responsive data",id:"modify-responsive-data",level:2},{value:"Decorate events",id:"decorate-events",level:2},{value:"Abort or repeat send request",id:"abort-or-repeat-send-request",level:2},{value:"Controlled loading state",id:"controlled-loading-state",level:2}];function h(e){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Request middleware is an asynchronous function. it provides a powerful ability to control almost all behaviors of a request. If you just use alova, then you probably don't need to use request middleware, because it is mainly used to complete custom request strategies, no matter simple or complex request strategies, you may use it, let's look at it next What magical powers does it have."}),"\n",(0,r.jsx)(n.h2,{id:"middleware-function",children:"Middleware function"}),"\n",(0,r.jsxs)(n.p,{children:["Request middleware is an async function, You can define request middleware in ",(0,r.jsx)(n.code,{children:"useRequest"}),", ",(0,r.jsx)(n.code,{children:"useWatcher"}),", ",(0,r.jsx)(n.code,{children:"useFetcher"}),". The following is a simple request middleware, which prints some information before and after the request without changing any request behavior."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"useRequest(todoList, {\n  async middleware(_, next) {\n    console.log('before request');\n    await next();\n    console.log('after request');\n  }\n});\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Here are a few things you need to know about the ",(0,r.jsx)(n.code,{children:"next"})," function call. This function is also an asynchronous function. Calling it can continue to send requests. At this time, the ",(0,r.jsx)(n.em,{children:"loading"})," state will be set to true, and then the request will be sent. The return value of next is a Promise instance with the response data, you can manipulate the return value in the middleware function."]}),"\n",(0,r.jsx)(n.h2,{id:"control-response-data",children:"Control response data"}),"\n",(0,r.jsxs)(n.p,{children:["The return value of the middleware function will be used as the response data of this request to participate in subsequent processing. If the middleware does not return any data but calls ",(0,r.jsx)(n.code,{children:"next"}),", the response data of this request will be used for subsequent processing."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"// The modified result will be used as the response data\nuseRequest(todoList, {\n  async middleware(_, next) {\n    const result = await next();\n    result.code = 500;\n    return result;\n  }\n});\n\n// Will participate in subsequent processing with the response data of this request\nuseRequest(todoList, {\n  async middleware(_, next) {\n    await next();\n  }\n});\n\n// will respond with the string abc\nuseRequest(todoList, {\n  async middleware(_, next) {\n    await next();\n    return 'abc';\n  }\n});\n"})}),"\n",(0,r.jsxs)(n.p,{children:["There is also a special case here. When ",(0,r.jsx)(n.code,{children:"next"})," is not called and there is no return value, subsequent processing will not be performed, which means that ",(0,r.jsx)(n.em,{children:"onSuccess"}),", ",(0,r.jsx)(n.em,{children:"onError"}),", ",(0,r.jsx)(n.em,{children:"onComplete"})," response events will not be triggered."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"useRequest(todoList, {\n  async middleware() {}\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"change-request",children:"change request"}),"\n",(0,r.jsxs)(n.p,{children:["Sometimes you want to change the request. At this time, you can specify another method instance in ",(0,r.jsx)(n.code,{children:"next"}),", and the information in this method will be requested when sending the request. At the same time, you can also set whether to force the request through ",(0,r.jsx)(n.code,{children:"next"})," Penetrating the cache is also very simple."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"useRequest(todoList, {\n  async middleware(_, next) {\n    await next({\n      // Change the requested method instance\n      method: newMethodInstance,\n\n      // Whether to force the request this time\n      force: true\n    });\n  }\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"control-errors",children:"Control errors"}),"\n",(0,r.jsx)(n.h3,{id:"catch-errors",children:"Catch errors"}),"\n",(0,r.jsxs)(n.p,{children:["In the middleware, you can capture the request error generated in ",(0,r.jsx)(n.code,{children:"next"}),", after capturing, the global ",(0,r.jsx)(n.code,{children:"onError"})," hook will no longer be triggered."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"useRequest(todoList, {\n  async middleware(_, next) {\n    try {\n      await next();\n    } catch (e) {\n      console.error('Error caught', e);\n    }\n  }\n});\n"})}),"\n",(0,r.jsx)(n.h3,{id:"throw-an-error",children:"Throw an error"}),"\n",(0,r.jsx)(n.p,{children:"Of course, you can also throw a custom error in the middleware, even if the request is normal, it will enter the request error process."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"// No request is sent, and global and request-level onError will be triggered at the same time. If the request is sent through `method.send`, the promise instance of rejection will be returned\nuseRequest(todoList, {\n  async middleware(_, next) {\n    throw new Error('error on before request');\n    await next();\n  }\n});\n\n// After request is success, global and request-level onError will be triggered at the same time. If the request is sent through `method.send`, the promise instance of rejection will be returned\nuseRequest(todoList, {\n  async middleware(_, next) {\n    await next();\n    throw new Error('error on after request');\n  }\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"control-response-delay",children:"Control response delay"}),"\n",(0,r.jsx)(n.p,{children:"In the middleware, we can delay the response or respond in advance. In the case of advance, although the response data cannot be obtained, some other data can be returned as the response data to participate in subsequent processing."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"// Delay response for 1 second\nuseRequest(todoList, {\n  async middleware(_, next) {\n    await new Promise(resolve => {\n      setTimeout(resolve, 1000);\n    });\n    return next();\n  }\n});\n\n// Respond immediately and use the string abc as the response data\nuseRequest(todoList, {\n  async middleware(_, next) {\n    return 'abc';\n  }\n});\n"})}),"\n",(0,r.jsx)(n.h2,{id:"more-than-that",children:"More than that"}),"\n",(0,r.jsxs)(n.p,{children:["**So far, all we have mentioned is the use of the second parameter ",(0,r.jsx)(n.code,{children:"next"})," of the middleware, so what is the first parameter for? **"]}),"\n",(0,r.jsxs)(n.p,{children:["The first parameter of the middleware contains some information about this request, as well as the control functions for the status and events returned in useHook such as ",(0,r.jsx)(n.code,{children:"loading"}),", ",(0,r.jsx)(n.code,{children:"data"})," and ",(0,r.jsx)(n.code,{children:"onSuccess"}),". Let's move on!"]}),"\n",(0,r.jsx)(n.h2,{id:"included-request-information",children:"Included request information"}),"\n",(0,r.jsxs)(s.Z,{children:[(0,r.jsxs)(o.Z,{value:"front",label:"front hooks",children:[(0,r.jsx)(n.p,{children:"The following is the request information contained in the middleware of useRequest and useWatcher"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFrontMiddleware(context, next) {\n  // The method instance of this request\n  context.method;\n\n  // The parameter array sent by the send function, the default is []\n  context.sendArgs;\n\n  // The cache data hit by this request\n  context.cachedResponse;\n\n  // configuration collection of useHook\n  context.config;\n\n  // The various states returned by useHook, including the following attributes\n  // loading, data, error, downloading, uploading, and additional states managed by managedStates\n  context.frontStates;\n  //...\n}\n"})})]}),(0,r.jsxs)(o.Z,{value:"fetch",label:"fetcher hook",children:[(0,r.jsx)(n.p,{children:"The following is the request information contained in the middleware of useFetcher"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFetcherMiddleware(context, next) {\n  // The method instance of this request\n  context.method;\n\n  // The parameter group passed in by the fetch of useFetcher, the default is []\n  context.fetchArgs;\n\n  // The cache data hit by this request\n  context.cachedResponse;\n\n  // configuration collection of useHook\n  context.config;\n\n  // The various states returned by useHook, including the following attributes\n  // fetching, error, downloading, uploading\n  context.fetchStates;\n  //...\n}\n"})})]})]}),"\n",(0,r.jsx)(n.p,{children:"Next, let's take a look at what controls are available."}),"\n",(0,r.jsx)(n.h2,{id:"modify-responsive-data",children:"Modify responsive data"}),"\n",(0,r.jsxs)(n.p,{children:["Use ",(0,r.jsx)(n.code,{children:"context.update"})," to modify reactive data."]}),"\n",(0,r.jsxs)(s.Z,{children:[(0,r.jsx)(o.Z,{value:"front",label:"front hooks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFrontMiddleware(context, next) {\n  context.update({\n    // Modify the loading status to true in advance\n    loading: true,\n\n    // Modify the data value, such as setting custom initialization data\n    data: {\n      /* ... */\n    }\n  });\n  //...\n}\n"})})}),(0,r.jsx)(o.Z,{value:"fetch",label:"fetcher hook",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFetcherMiddleware(context, next) {\n  context.update({\n    // Modify the fetching status to true in advance\n    fetching: true,\n\n    // Modify the value of error\n    error: new Error('custom midleware error')\n  });\n  //...\n}\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"decorate-events",children:"Decorate events"}),"\n",(0,r.jsxs)(n.p,{children:["You can also decorate ",(0,r.jsx)(n.em,{children:"onSuccess"}),", ",(0,r.jsx)(n.em,{children:"onError"}),", ",(0,r.jsx)(n.em,{children:"onComplete"})," callback functions in middleware to make them richer, such as changing the parameters of the callback function, or receiving the return value of the callback function to achieve more functions."]}),"\n",(0,r.jsxs)(n.p,{children:["You can use ",(0,r.jsx)(n.code,{children:"decorateSuccess"}),", ",(0,r.jsx)(n.code,{children:"decorateError"}),", ",(0,r.jsx)(n.code,{children:"decorateComplete"})," functions to decorate callback functions. The following takes the success callback as an example, which is decorated in 3 places:"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Added ",(0,r.jsx)(n.code,{children:"custom"})," attribute to event object;"]}),"\n",(0,r.jsxs)(n.li,{children:["Added a second parameter to the success callback function, the value is ",(0,r.jsx)(n.code,{children:"extra data"}),";"]}),"\n",(0,r.jsx)(n.li,{children:"Receive the value of the second success callback function and print it;"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"const { onSuccess } = useRequest(todoList, {\n  //...\n  async middleware(context, next) {\n    // Decorate the successful callback function, the following function parameters are explained:\n    // handler: bound callback function\n    // event: the event object corresponding to the callback function\n    // index: The subscript of the callback function, indicating which callback function is currently being executed\n    // length: the number of callback functions bound\n    context.decorateSuccess((handler, event, index, length) => {\n      event.custom = 1;\n      const received = handler(event, 'extra data');\n      if (index === 1) {\n        console.log(`received the return value of ${index + 1} callback function:`, received);\n        // [Print information] Received the return value of the second callback function: I'm second handler\n      }\n    });\n    //...\n  }\n});\nonSuccess((event, extra) => {\n  console.log(event.custom); // 1\n  console.log(extra); // extra data\n});\nonSuccess((event, extra) => {\n  return \"I'm second handler\";\n});\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The usage of ",(0,r.jsx)(n.code,{children:"decorateError"}),", ",(0,r.jsx)(n.code,{children:"decorateComplete"})," is the same as ",(0,r.jsx)(n.code,{children:"decorateSuccess"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"abort-or-repeat-send-request",children:"Abort or repeat send request"}),"\n",(0,r.jsxs)(n.p,{children:["In the middleware, you can also receive ",(0,r.jsx)(n.code,{children:"abort"})," and ",(0,r.jsx)(n.code,{children:"send"})," functions returned by use hooks (",(0,r.jsx)(n.code,{children:"fetch"})," in useFetcher), and you can also send multiple requests when triggering a request intent."]}),"\n",(0,r.jsxs)(n.p,{children:["A typical usage example is request retry. After sending a request, if the request fails, it will automatically request again according to a certain strategy, and ",(0,r.jsx)(n.code,{children:"onSuccess"})," will be triggered after the retry is successful. The following is a sample code for a simple request retry."]}),"\n",(0,r.jsxs)(s.Z,{children:[(0,r.jsx)(o.Z,{value:"front",label:"front hooks",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFrontMiddleware(context, next) {\n  return next().catch(error => {\n    if (needRetry) {\n      setTimeout(() => {\n        context.send(...context.sendArgs);\n      }, retryDelay);\n    }\n    return Promise.reject(error);\n  });\n}\n"})})}),(0,r.jsx)(o.Z,{value:"fetch",label:"fetcher hook",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFetcherMiddleware(context, next) {\n  return next().catch(error => {\n    if (needRetry) {\n      setTimeout(() => {\n        context.fetch(context.method, ...context.fetchArgs);\n      }, retryDelay);\n    }\n    return Promise.reject(error);\n  });\n}\n"})})})]}),"\n",(0,r.jsxs)(n.p,{children:["If you need to abort the request inside the middleware, you can call ",(0,r.jsx)(n.code,{children:"context.abort()"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"controlled-loading-state",children:"Controlled loading state"}),"\n",(0,r.jsxs)(n.p,{children:["In the above content, we know that you can customize and modify the responsive data through ",(0,r.jsx)(n.code,{children:"context.update"}),", but when you modify the loading status value (",(0,r.jsx)(n.code,{children:"loading"})," or ",(0,r.jsx)(n.code,{children:"fetching"}),"), it will be hindered, because in normal circumstances Next, the loading status value will be automatically set to true when ",(0,r.jsx)(n.code,{children:"next"})," is called, and false will be automatically set in the response process, which will overwrite the loading status value modified by ",(0,r.jsx)(n.code,{children:"context.update"}),", at this time we can turn on the controlled loading status , after it is turned on, the ",(0,r.jsx)(n.code,{children:"next"})," function and the response process will no longer modify the loading status value, but we have full control over it."]}),"\n",(0,r.jsx)(n.p,{children:"Let's take request retry as an example. We hope that the loading status will remain true after the request is retried until the request ends."}),"\n",(0,r.jsxs)(s.Z,{children:[(0,r.jsxs)(o.Z,{value:"front",label:"front hooks",children:[(0,r.jsxs)(n.p,{children:["In the middleware of useRequest and useWatcher, use ",(0,r.jsx)(n.code,{children:"context.controlLoading"})," to enable custom control loading status."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFrontMiddleware(context, next) {\n  context.controlLoading();\n\n  // Set to true when the request starts\n  context.update({ loading: true });\n  return next()\n    .then(value => {\n      // set to false after successful request\n      context.update({ loading: false });\n      return value;\n    })\n    .catch(error => {\n      if (needRetry) {\n        setTimeout(() => {\n          context.send(...context.sendArgs);\n        }, retryDelay);\n      } else {\n        // Also set to false when not retrying again\n        context.update({ loading: false });\n      }\n      return Promise.reject(error);\n    });\n}\n"})})]}),(0,r.jsxs)(o.Z,{value:"fetch",label:"fetcher hook",children:[(0,r.jsxs)(n.p,{children:["In the middleware of useFetching, use ",(0,r.jsx)(n.code,{children:"context.controlFetching"})," to enable custom control loading state."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-javascript",children:"async function alovaFetcherMiddleware(context, next) {\n  context.controlFetching();\n\n  // Set to true when the request starts\n  context.update({ fetching: true });\n  return next()\n    .then(value => {\n      // set to false after successful request\n      context.update({ fetching: false });\n      return value;\n    })\n    .catch(error => {\n      if (needRetry) {\n        setTimeout(() => {\n          context.fetch(context.method, ...context.fetchArgs);\n        }, retryDelay);\n      } else {\n        // Also set to false when not retrying again\n        context.update({ fetching: false });\n      }\n      return Promise.reject(error);\n    });\n}\n"})})]})]})]})}function f(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},85162:(e,n,t)=>{t.d(n,{Z:()=>o});t(67294);var r=t(90512);const a={tabItem:"tabItem_Ymn6"};var s=t(85893);function o(e){let{children:n,hidden:t,className:o}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,o),hidden:t,children:n})}},74866:(e,n,t)=>{t.d(n,{Z:()=>y});var r=t(67294),a=t(90512),s=t(12466),o=t(16550),i=t(20469),l=t(91980),c=t(67392),d=t(20812);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function f(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const a=(0,o.k6)(),s=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(s),(0,r.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(a.location.search);n.set(s,e),a.replace({...a.location,search:n.toString()})}),[s,a])]}function x(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,s=h(e),[o,l]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!f({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:s}))),[c,u]=m({queryString:t,groupId:a}),[x,p]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,s]=(0,d.Nk)(t);return[a,(0,r.useCallback)((e=>{t&&s.set(e)}),[t,s])]}({groupId:a}),v=(()=>{const e=c??x;return f({value:e,tabValues:s})?e:null})();(0,i.Z)((()=>{v&&l(v)}),[v]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!f({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),p(e)}),[u,p,s]),tabValues:s}}var p=t(72389);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=t(85893);function b(e){let{className:n,block:t,selectedValue:r,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.o5)(),d=e=>{const n=e.currentTarget,t=l.indexOf(n),a=i[t].value;a!==r&&(c(n),o(a))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>l.push(e),onKeyDown:u,onClick:d,...s,className:(0,a.Z)("tabs__item",v.tabItem,s?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function j(e){let{lazy:n,children:t,selectedValue:a}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function w(e){const n=x(e);return(0,g.jsxs)("div",{className:(0,a.Z)("tabs-container",v.tabList),children:[(0,g.jsx)(b,{...n,...e}),(0,g.jsx)(j,{...n,...e})]})}function y(e){const n=(0,p.Z)();return(0,g.jsx)(w,{...e,children:u(e.children)},String(n))}},11151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>o});var r=t(67294);const a={},s=r.createContext(a);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);