"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[1434],{9451:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var n=r(5893),a=r(1151),o=r(4866),s=r(5162);const l={title:"\u54cd\u5e94\u5904\u7406",sidebar_position:80},i=void 0,u={id:"tutorial/getting-started/response",title:"\u54cd\u5e94\u5904\u7406",description:"\u8bf7\u6c42\u5b8c\u6210\u540e\uff0c\u54cd\u5e94\u6570\u636e\u4f1a\u7ecf\u8fc7\u591a\u4e2a\u6d41\u7a0b\u7684\u5904\u7406\uff0c\u6700\u7ec8\u624d\u4f1a\u5728\u53d1\u9001\u8bf7\u6c42\u7684\u4f4d\u7f6e\u83b7\u5f97\u6700\u7ec8\u6570\u636e\uff0c\u6d41\u7a0b\u5982\u4e0b\uff1a",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorial/02-getting-started/08-response.md",sourceDirName:"tutorial/02-getting-started",slug:"/tutorial/getting-started/response",permalink:"/zh-CN/tutorial/getting-started/response",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/02-getting-started/08-response.md",tags:[],version:"current",sidebarPosition:80,frontMatter:{title:"\u54cd\u5e94\u5904\u7406",sidebar_position:80},sidebar:"tutorialSidebar",previous:{title:"\u8bbe\u7f6e\u521d\u59cb\u6570\u636e",permalink:"/zh-CN/tutorial/getting-started/initial-data"},next:{title:"\u624b\u52a8\u53d1\u9001\u8bf7\u6c42",permalink:"/zh-CN/tutorial/getting-started/request-manually"}},c={},d=[{value:"\u8f6c\u6362\u54cd\u5e94\u6570\u636e",id:"\u8f6c\u6362\u54cd\u5e94\u6570\u636e",level:2},{value:"\u7ed1\u5b9a\u54cd\u5e94\u56de\u8c03",id:"\u7ed1\u5b9a\u54cd\u5e94\u56de\u8c03",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",mermaid:"mermaid",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"\u8bf7\u6c42\u5b8c\u6210\u540e\uff0c\u54cd\u5e94\u6570\u636e\u4f1a\u7ecf\u8fc7\u591a\u4e2a\u6d41\u7a0b\u7684\u5904\u7406\uff0c\u6700\u7ec8\u624d\u4f1a\u5728\u53d1\u9001\u8bf7\u6c42\u7684\u4f4d\u7f6e\u83b7\u5f97\u6700\u7ec8\u6570\u636e\uff0c\u6d41\u7a0b\u5982\u4e0b\uff1a"}),"\n",(0,n.jsx)(t.mermaid,{value:"flowchart LR\r\n  classDef condition fill:#a8bcff\r\n\r\n  R1[\u54cd\u5e94\u6210\u529f] --\x3e alovaInstance.responded.onSuccess\r\n  alovaInstance.responded.onSuccess --\x3e throw{\u662f\u5426\u629b\u51fa\u9519\u8bef\uff1f}:::condition\r\n  throw --\x3e|\u5426| method.transformData\r\n  method.transformData --\x3e useRequest.onSuccess\r\n  throw --\x3e|\u662f| useRequest.onError\r\n\r\n  method.transformData --\x3e throw2{\u662f\u5426\u629b\u51fa\u9519\u8bef\uff1f}:::condition\r\n  throw2 --\x3e|\u5426| useRequest.onSuccess\r\n  throw2 --\x3e|\u662f| useRequest.onError\r\n\r\n  useRequest.onSuccess --\x3e throw3{\u662f\u5426\u629b\u51fa\u9519\u8bef\uff1f}:::condition\r\n  throw3 --\x3e|\u662f| useRequest.onError\r\n\r\n  R2[\u54cd\u5e94\u9519\u8bef] --\x3e alovaInstance.responded.onError\r\n  alovaInstance.responded.onError --\x3e throw4{\u662f\u5426\u629b\u51fa\u9519\u8bef\uff1f}:::condition\r\n  throw4 --\x3e|\u662f| useRequest.onError\r\n  throw4 --\x3e|\u5426| method.transformData"}),"\n",(0,n.jsxs)(t.p,{children:["\u5f53\u6ca1\u6709\u629b\u51fa\u9519\u8bef\u65f6\uff0c\u4e0b\u4e00\u4e2a\u8282\u70b9\u4f1a\u63a5\u6536\u5230\u4e0a\u4e00\u4e2a\u8282\u70b9\u7684\u8fd4\u56de\u503c\u3002\u5168\u5c40\u7684\u54cd\u5e94\u62e6\u622a\u5668\u5df2\u7ecf\u5728",(0,n.jsx)(t.a,{href:"/tutorial/getting-started/global-interceptor",children:"\u5168\u5c40\u62e6\u622a\u5668"}),"\u4e2d\u8bb2\u89e3\u8fc7\uff0c\u63a5\u4e0b\u6765\u6211\u4eec\u6765\u770b\u770b\u5728 method \u4e2d\u7684",(0,n.jsx)(t.code,{children:"transformData"}),"\u3002"]}),"\n",(0,n.jsx)(t.h2,{id:"\u8f6c\u6362\u54cd\u5e94\u6570\u636e",children:"\u8f6c\u6362\u54cd\u5e94\u6570\u636e"}),"\n",(0,n.jsxs)(t.p,{children:["\u5f53\u4e00\u4e2a\u8bf7\u6c42\u7684\u54cd\u5e94\u6570\u636e\u7ed3\u6784\u4e0d\u80fd\u76f4\u63a5\u6ee1\u8db3\u4f7f\u7528\u9700\u8981\u65f6\uff0c\u6211\u4eec\u53ef\u4ee5\u4e3a method \u5b9e\u4f8b\u8bbe\u7f6e",(0,n.jsx)(t.code,{children:"transformData"}),"\u51fd\u6570\u5c06\u54cd\u5e94\u6570\u636e\u8f6c\u6362\u6210\u9700\u8981\u7684\u7ed3\u6784\u3002"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const todoListGetter = alovaInstance.Get('/todo/list', {\r\n  params: {\r\n    page: 1\r\n  },\r\n\r\n  // \u51fd\u6570\u63a5\u53d7\u672a\u52a0\u5de5\u7684\u6570\u636e\u548c\u54cd\u5e94\u5934\u5bf9\u8c61\uff0c\u5e76\u8981\u6c42\u5c06\u8f6c\u6362\u540e\u7684\u6570\u636e\u8fd4\u56de\uff0c\u5b83\u5c06\u4f1a\u88ab\u8d4b\u503c\u7ed9data\u72b6\u6001\u3002\r\n  // \u6ce8\u610f\uff1arawData\u662f\u5168\u5c40\u54cd\u5e94\u62e6\u622a\u5668\uff08\u5982\u679c\u6709\u8bbe\u7f6e\uff09\u8fc7\u6ee4\u540e\u7684\u6570\u636e\uff0c\u54cd\u5e94\u62e6\u622a\u5668\u7684\u914d\u7f6e\u53ef\u4ee5\u53c2\u8003[\u8bbe\u7f6e\u5168\u5c40\u54cd\u5e94\u62e6\u622a\u5668]\u7ae0\u8282\u3002\r\n  transformData(rawData, headers) {\r\n    return rawData.list.map(item => {\r\n      return {\r\n        ...item,\r\n        statusText: item.done ? '\u5df2\u5b8c\u6210' : '\u8fdb\u884c\u4e2d'\r\n      };\r\n    });\r\n  }\r\n});\n"})}),"\n",(0,n.jsxs)(o.Z,{children:[(0,n.jsx)(s.Z,{value:"1",label:"useRequest",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const { data } = useRequest(todoListGetter);\n"})})}),(0,n.jsx)(s.Z,{value:"2",label:"method",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const data = await todoListGetter;\n"})})})]}),"\n",(0,n.jsx)(t.p,{children:"data \u503c\u5c06\u63a5\u6536\u5230\u8f6c\u6362\u540e\u7684\u6570\u636e\u683c\u5f0f\u3002"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-typescript",children:"type data = {\r\n  // ...\r\n  statusText: '\u5df2\u5b8c\u6210' | '\u8fdb\u884c\u4e2d';\r\n}[];\n"})}),"\n",(0,n.jsx)(t.admonition,{title:"\u6ce8\u610f",type:"warning",children:(0,n.jsxs)(t.p,{children:["\u5728 usehooks \u4e2d\u4f7f\u7528\u65f6\uff0c\u5728",(0,n.jsx)(t.code,{children:"transformData"}),"\u4e2d\u629b\u51fa\u9519\u8bef\u4e5f\u4f1a\u89e6\u53d1",(0,n.jsx)(t.code,{children:"onError"}),"\uff1b"]})}),"\n",(0,n.jsx)(t.h2,{id:"\u7ed1\u5b9a\u54cd\u5e94\u56de\u8c03",children:"\u7ed1\u5b9a\u54cd\u5e94\u56de\u8c03"}),"\n",(0,n.jsx)(t.p,{children:"\u5982\u9700\u8bbe\u7f6e\u8bf7\u6c42\u56de\u8c03\uff0c\u4f60\u8fd8\u53ef\u4ee5\u5728 useRequest \u7684\u8fd4\u56de\u53c2\u6570\u4e2d\u63a5\u6536\u56de\u8c03\u7684\u8bbe\u7f6e\u51fd\u6570\uff0c\u5982\u4e0b\uff1a"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const {\r\n  // ...\r\n\r\n  // \u6210\u529f\u56de\u8c03\u7ed1\u5b9a\r\n  onSuccess,\r\n\r\n  // \u5931\u8d25\u56de\u8c03\u7ed1\u5b9a\r\n  onError,\r\n\r\n  // \u5b8c\u6210\u56de\u8c03\u7ed1\u5b9a\uff0c\u56de\u8c03\u5728\u6210\u529f\u6216\u5931\u8d25\u90fd\u4f1a\u8c03\u7528\r\n  onComplete\r\n} = useRequest(todoListGetter);\r\nonSuccess(event => {\r\n  console.log('\u8bf7\u6c42\u6210\u529f\uff0c\u54cd\u5e94\u6570\u636e\u4e3a:', event.data);\r\n  console.log('\u672c\u6b21\u8bf7\u6c42\u7684method\u5b9e\u4f8b\u4e3a:', event.method);\r\n  console.log('\u54cd\u5e94\u6570\u636e\u662f\u5426\u6765\u81ea\u7f13\u5b58:', event.fromCache);\r\n});\r\nonError(event => {\r\n  console.log('\u8bf7\u6c42\u5931\u8d25\uff0c\u9519\u8bef\u4fe1\u606f\u4e3a:', event.error);\r\n  console.log('\u672c\u6b21\u8bf7\u6c42\u7684method\u5b9e\u4f8b\u4e3a:', event.method);\r\n});\r\nonComplete(event => {\r\n  // event.status\u5728\u6210\u529f\u65f6\u4e3asuccess\uff0c\u5931\u8d25\u65f6\u4e3aerror\r\n  console.log('\u8bf7\u6c42\u5b8c\u6210\uff0c\u72b6\u6001\u4e3a\uff1a', event.status);\r\n  console.log('\u672c\u6b21\u8bf7\u6c42\u7684method\u5b9e\u4f8b\u4e3a:', event.method);\r\n  console.log('\u54cd\u5e94\u6570\u636e\u662f\u5426\u6765\u81ea\u7f13\u5b58:', event.fromCache);\r\n  if (event.data) {\r\n    console.log('\u8bf7\u6c42\u6570\u636e\uff1a'\uff0cevent.data)\r\n  } else if (event.error) {\r\n    console.log('\u9519\u8bef\u4fe1\u606f\uff1a'\uff0cevent.error)\r\n  }\r\n});\n"})}),"\n",(0,n.jsx)(t.admonition,{title:"\u6ce8\u610f",type:"warning",children:(0,n.jsxs)(t.p,{children:["\u5728",(0,n.jsx)(t.code,{children:"onSuccess"}),"\u4e2d\u629b\u51fa\u9519\u8bef\u5c06\u4f1a\u89e6\u53d1",(0,n.jsx)(t.code,{children:"onError"}),"\u3002"]})})]})}function m(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},5162:(e,t,r)=>{r.d(t,{Z:()=>s});r(7294);var n=r(4334);const a={tabItem:"tabItem_Ymn6"};var o=r(5893);function s(e){let{children:t,hidden:r,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,n.Z)(a.tabItem,s),hidden:r,children:t})}},4866:(e,t,r)=>{r.d(t,{Z:()=>y});var n=r(7294),a=r(4334),o=r(2466),s=r(6550),l=r(469),i=r(1980),u=r(7392),c=r(12);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function m(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:r}=e;const a=(0,s.k6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,i._X)(o),(0,n.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function f(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,o=h(e),[s,i]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[u,d]=p({queryString:r,groupId:a}),[f,v]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,c.Nk)(r);return[a,(0,n.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:a}),b=(()=>{const e=u??f;return m({value:e,tabValues:o})?e:null})();(0,l.Z)((()=>{b&&i(b)}),[b]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!m({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),v(e)}),[d,v,o]),tabValues:o}}var v=r(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=r(5893);function x(e){let{className:t,block:r,selectedValue:n,selectValue:s,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.o5)(),c=e=>{const t=e.currentTarget,r=i.indexOf(t),a=l[r].value;a!==n&&(u(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;t=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;t=i[r]??i[i.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":r},t),children:l.map((e=>{let{value:t,label:r,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>i.push(e),onKeyDown:d,onClick:c,...o,className:(0,a.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function j(e){let{lazy:t,children:r,selectedValue:a}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function w(e){const t=f(e);return(0,g.jsxs)("div",{className:(0,a.Z)("tabs-container",b.tabList),children:[(0,g.jsx)(x,{...e,...t}),(0,g.jsx)(j,{...e,...t})]})}function y(e){const t=(0,v.Z)();return(0,g.jsx)(w,{...e,children:d(e.children)},String(t))}},1151:(e,t,r)=>{r.d(t,{Z:()=>l,a:()=>s});var n=r(7294);const a={},o=n.createContext(a);function s(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);