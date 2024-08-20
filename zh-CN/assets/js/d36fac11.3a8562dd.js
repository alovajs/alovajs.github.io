"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[2452],{40379:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>u,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>d});var n=a(85893),r=a(11151),s=a(74866),l=a(85162);const o={title:"\u5b58\u50a8\u9002\u914d\u5668"},u=void 0,c={id:"tutorial/advanced/custom/storage-adapter",title:"\u5b58\u50a8\u9002\u914d\u5668",description:"alova \u63d0\u4f9b\u4e86\u5b8c\u5584\u7684\u591a\u7ea7\u7f13\u5b58\u529f\u80fd\uff0c\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4f7f\u7528\u4ee5\u4e0b\u7f13\u5b58",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorial/06-advanced/02-custom/02-storage-adapter.md",sourceDirName:"tutorial/06-advanced/02-custom",slug:"/tutorial/advanced/custom/storage-adapter",permalink:"/zh-CN/tutorial/advanced/custom/storage-adapter",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/06-advanced/02-custom/02-storage-adapter.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"\u5b58\u50a8\u9002\u914d\u5668"},sidebar:"tutorial",previous:{title:"\u8bf7\u6c42\u9002\u914d\u5668",permalink:"/zh-CN/tutorial/advanced/custom/http-adapter"},next:{title:"\u5ba2\u6237\u7aef\u7b56\u7565",permalink:"/zh-CN/tutorial/advanced/custom/client-strategy"}},i={},d=[{value:"SessionStorage \u5b58\u50a8\u9002\u914d\u5668\u793a\u4f8b",id:"sessionstorage-\u5b58\u50a8\u9002\u914d\u5668\u793a\u4f8b",level:2}];function p(e){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"alova \u63d0\u4f9b\u4e86\u5b8c\u5584\u7684\u591a\u7ea7\u7f13\u5b58\u529f\u80fd\uff0c\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4f7f\u7528\u4ee5\u4e0b\u7f13\u5b58"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"L1 \u7f13\u5b58\uff1a\u5ba2\u6237\u7aef\u548c\u670d\u52a1\u7aef\u90fd\u4ee5 object \u7684 key-value \u5f62\u5f0f\u4fdd\u5b58"}),"\n",(0,n.jsxs)(t.li,{children:["L2 \u7f13\u5b58\uff1a\u5ba2\u6237\u7aef\u4f7f\u7528",(0,n.jsx)(t.code,{children:"localStorage"}),"\u6765\u5b58\u50a8\uff0c\u670d\u52a1\u7aef\u4e0d\u63d0\u4f9b L2 \u9002\u914d\u5668"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"\u5728\u7279\u5b9a\u60c5\u51b5\uff0c\u4f60\u53ef\u80fd\u9700\u8981\u81ea\u5b9a\u4e49\u4e0d\u540c\u7684\u5b58\u50a8\u9002\u914d\u5668\uff0c\u81ea\u5b9a\u4e49\u5b58\u50a8\u9002\u914d\u5668\u4e5f\u975e\u5e38\u7b80\u5355\uff0c\u4f60\u53ea\u9700\u8981\u6307\u5b9a\u4fdd\u5b58\u6570\u636e\u3001\u83b7\u53d6\u6570\u636e\uff0c\u4ee5\u53ca\u79fb\u9664\u6570\u636e\u7684\u51fd\u6570\u3002"}),"\n",(0,n.jsxs)(s.Z,{children:[(0,n.jsxs)(l.Z,{value:"1",label:"object",children:[(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const customStorageAdapter = {\n  set(key, value) {\n    // \u4fdd\u5b58\u6570\u636e\uff0cvalue\u4e3a\u7ed3\u6784\u5316\u6570\u636e\uff0c\u53ef\u8c03\u7528JSON.stringify\u8f6c\u6362\u4e3a\u5b57\u7b26\u4e32\n  },\n  get(key) {\n    // \u83b7\u53d6\u6570\u636e\uff0c\u9700\u8981\u8fd4\u56de\u7ed3\u6784\u5316\u6570\u636e\uff0c\u53ef\u8c03\u7528JSON.parse\u8f6c\u6362\u4e3a\u5bf9\u8c61\n  },\n  remove(key) {\n    // \u79fb\u9664\u6570\u636e\n  },\n  clear() {\n    // \u6e05\u7a7a\u6570\u636e\n  }\n};\n"})}),(0,n.jsx)(t.p,{children:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u9002\u914d\u5668\u3002"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const alovaInstance = createAlova({\n  // ...\n  l1Cache: customStorageAdapter, // l1\u7f13\u5b58\n  l2Cache: customStorageAdapter // l2\u7f13\u5b58\n});\n"})})]}),(0,n.jsxs)(l.Z,{value:"2",label:"class",children:[(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:"import { AlovaGlobalCacheAdapter } from 'alova';\n\nclass CustomStorageAdapter implements AlovaGlobalCacheAdapter {\n  set(key, value) {\n    // \u4fdd\u5b58\u6570\u636e\uff0cvalue\u4e3a\u7ed3\u6784\u5316\u6570\u636e\uff0c\u53ef\u8c03\u7528JSON.stringify\u8f6c\u6362\u4e3a\u5b57\u7b26\u4e32\n  }\n  get(key) {\n    // \u83b7\u53d6\u6570\u636e\uff0c\u9700\u8981\u8fd4\u56de\u7ed3\u6784\u5316\u6570\u636e\uff0c\u53ef\u8c03\u7528JSON.parse\u8f6c\u6362\u4e3a\u5bf9\u8c61\n  }\n  remove(key) {\n    // \u79fb\u9664\u6570\u636e\n  }\n  clear() {\n    // \u6e05\u7a7a\u6570\u636e\n  }\n}\n"})}),(0,n.jsx)(t.p,{children:"\u4f7f\u7528\u81ea\u5b9a\u4e49\u9002\u914d\u5668\u3002"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const alovaInstance = createAlova({\n  // ...\n  l1Cache: new CustomStorageAdapter(), // l1\u7f13\u5b58\n  l2Cache: new CustomStorageAdapter() // l2\u7f13\u5b58\n});\n"})})]})]}),"\n",(0,n.jsxs)(t.blockquote,{children:["\n",(0,n.jsxs)(t.p,{children:["\u4e86\u89e3\u66f4\u591a\u54cd\u5e94\u7f13\u5b58\u76f8\u5173\u5185\u5bb9\u8bf7\u53c2\u8003",(0,n.jsx)(t.a,{href:"/tutorial/cache/mode",children:"\u7f13\u5b58\u8be6\u89e3"}),"\u3002"]}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"sessionstorage-\u5b58\u50a8\u9002\u914d\u5668\u793a\u4f8b",children:"SessionStorage \u5b58\u50a8\u9002\u914d\u5668\u793a\u4f8b"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-javascript",children:"const sessionStorageAdapter = {\n  set(key, value) {\n    sessionStorage.setItem(key, JSON.stringify(value));\n  },\n  get(key) {\n    const data = sessionStorage.getItem(key);\n    return data ? JSON.parse(data) : data;\n  },\n  remove(key) {\n    sessionStorage.removeItem(key);\n  },\n  clear() {\n    sessionStorage.clear();\n  }\n};\n"})})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},85162:(e,t,a)=>{a.d(t,{Z:()=>l});a(67294);var n=a(90512);const r={tabItem:"tabItem_Ymn6"};var s=a(85893);function l(e){let{children:t,hidden:a,className:l}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,n.Z)(r.tabItem,l),hidden:a,children:t})}},74866:(e,t,a)=>{a.d(t,{Z:()=>k});var n=a(67294),r=a(90512),s=a(12466),l=a(16550),o=a(20469),u=a(91980),c=a(67392),i=a(20812);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:a}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:a,attributes:n,default:r}}=e;return{value:t,label:a,attributes:n,default:r}}))}(a);return function(e){const t=(0,c.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,a])}function h(e){let{value:t,tabValues:a}=e;return a.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:a}=e;const r=(0,l.k6)(),s=function(e){let{queryString:t=!1,groupId:a}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:t,groupId:a});return[(0,u._X)(s),(0,n.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(r.location.search);t.set(s,e),r.replace({...r.location,search:t.toString()})}),[s,r])]}function v(e){const{defaultValue:t,queryString:a=!1,groupId:r}=e,s=p(e),[l,u]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=a.find((e=>e.default))??a[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:s}))),[c,d]=m({queryString:a,groupId:r}),[v,b]=function(e){let{groupId:t}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,s]=(0,i.Nk)(a);return[r,(0,n.useCallback)((e=>{a&&s.set(e)}),[a,s])]}({groupId:r}),f=(()=>{const e=c??v;return h({value:e,tabValues:s})?e:null})();(0,o.Z)((()=>{f&&u(f)}),[f]);return{selectedValue:l,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);u(e),d(e),b(e)}),[d,b,s]),tabValues:s}}var b=a(72389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=a(85893);function j(e){let{className:t,block:a,selectedValue:n,selectValue:l,tabValues:o}=e;const u=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.o5)(),i=e=>{const t=e.currentTarget,a=u.indexOf(t),r=o[a].value;r!==n&&(c(t),l(r))},d=e=>{let t=null;switch(e.key){case"Enter":i(e);break;case"ArrowRight":{const a=u.indexOf(e.currentTarget)+1;t=u[a]??u[0];break}case"ArrowLeft":{const a=u.indexOf(e.currentTarget)-1;t=u[a]??u[u.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":a},t),children:o.map((e=>{let{value:t,label:a,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>u.push(e),onKeyDown:d,onClick:i,...s,className:(0,r.Z)("tabs__item",f.tabItem,s?.className,{"tabs__item--active":n===t}),children:a??t},t)}))})}function x(e){let{lazy:t,children:a,selectedValue:r}=e;const s=(Array.isArray(a)?a:[a]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===r));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==r})))})}function y(e){const t=v(e);return(0,g.jsxs)("div",{className:(0,r.Z)("tabs-container",f.tabList),children:[(0,g.jsx)(j,{...t,...e}),(0,g.jsx)(x,{...t,...e})]})}function k(e){const t=(0,b.Z)();return(0,g.jsx)(y,{...e,children:d(e.children)},String(t))}},11151:(e,t,a)=>{a.d(t,{Z:()=>o,a:()=>l});var n=a(67294);const r={},s=n.createContext(r);function l(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);