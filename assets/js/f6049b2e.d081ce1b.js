"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[7470],{50120:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>l});var r=n(85893),o=n(11151);n(74866),n(85162);const s={title:"Automatically refetch data"},a=void 0,i={id:"tutorial/client/strategy/use-auto-request",title:"Automatically refetch data",description:"use hook",source:"@site/docs/tutorial/03-client/01-strategy/07-use-auto-request.md",sourceDirName:"tutorial/03-client/01-strategy",slug:"/tutorial/client/strategy/use-auto-request",permalink:"/tutorial/client/strategy/use-auto-request",draft:!1,unlisted:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/tutorial/03-client/01-strategy/07-use-auto-request.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{title:"Automatically refetch data"},sidebar:"tutorial",previous:{title:"Token authentication interceptor",permalink:"/tutorial/client/strategy/token-authentication"},next:{title:"Cross components to trigger request",permalink:"/tutorial/client/strategy/action-delegation-middleware"}},u={},l=[{value:"Features",id:"features",level:2},{value:"Basic usage",id:"basic-usage",level:2},{value:"Pause request",id:"pause-request",level:2},{value:"Custom listening functions",id:"custom-listening-functions",level:2},{value:"Network reconnection custom function",id:"network-reconnection-custom-function",level:3},{value:"Polling custom function",id:"polling-custom-function",level:3},{value:"App switching custom function",id:"app-switching-custom-function",level:3},{value:"App focus custom function",id:"app-focus-custom-function",level:3}];function c(e){const t={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.admonition,{title:"strategy type",type:"info",children:(0,r.jsx)(t.p,{children:"use hook"})}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsx)(t.p,{children:"Before using extension hooks, make sure you are familiar with the basic use of alova."}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"Automatically fetch data through browser events or polling, allowing the interface to display the newest data."}),"\n",(0,r.jsx)(t.h2,{id:"features",children:"Features"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Supports refetching the newest data in scenarios such as browser focus, tab switching, network reconnection, polling requests, etc;"}),"\n",(0,r.jsx)(t.li,{children:"Supports request throttling, only one request will be sent if triggered multiple times in a short period of time;"}),"\n",(0,r.jsx)(t.li,{children:"Support custom event listening functions to adapt to usage scenarios in non-browser environments;"}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"basic-usage",children:"Basic usage"}),"\n",(0,r.jsxs)(t.p,{children:["By default, useHook",(0,r.jsx)(t.code,{children:"useAutoRequest"})," that automatically fetches data will automatically fetch the newest data when browser is visible, hidden, focused, and the network is reconnected, and will automatically cancel the listening event when the component is uninstalled."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"import { useAutoRequest } from 'alova/client';\n\nconst { loading, data, error } = useAutoRequest(() => method());\n"})}),"\n",(0,r.jsxs)(t.p,{children:["The return value of ",(0,r.jsx)(t.code,{children:"useAutoRequest"})," is the same as ",(0,r.jsx)(t.a,{href:"/api/core-hooks#userequest",children:"useRequest"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["In addition to supporting all configuration parameters of ",(0,r.jsx)(t.a,{href:"/api/core-hooks#userequest",children:"useRequest"}),", it also supports automatically fetched configuration parameters. You can turn on or off some events through the following configuration, or modify request throttling events."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"const { loading, data, error, onSuccess, onError, onComplete } = useAutoRequest(\n  () => method(),\n  {\n    /**\n     * Browser display hide trigger\n     * @default true\n     */\n    enableVisibility: true,\n\n    /**\n     * Triggered by browser focus\n     * @default true\n     */\n    enableFocus: true,\n\n    /**\n     * Triggered by network reconnection\n     * @default true\n     */\n    enableNetwork: true,\n\n    /**\n     *Throttling time, only one request will be sent if triggered multiple times within a certain period, unit ms\n     * @default 1000\n     */\n    throttle: 1000,\n\n    /**\n     * The time of polling request, effective when set greater than 0, unit ms\n     * @default 0\n     */\n    pollingTime: 2000\n\n    //Other parameters are the same as useRequest...\n  }\n);\n"})}),"\n",(0,r.jsx)(t.admonition,{title:"caching advice",type:"warning",children:(0,r.jsxs)(t.p,{children:["It is recommended to turn off the cache of the corresponding request when using ",(0,r.jsx)(t.code,{children:"useAutoRequest"}),", because when the cache is set, the cache will be hit when the automatic request is triggered and the newest data cannot be obtained. Please read ",(0,r.jsx)(t.a,{href:"/tutorial/cache/mode",children:"Cache Mode"})," for details."]})}),"\n",(0,r.jsx)(t.h2,{id:"pause-request",children:"Pause request"}),"\n",(0,r.jsxs)(t.p,{children:["When the user leaves the page but the component is not destroyed, ",(0,r.jsx)(t.code,{children:"useAutoRequest"})," will continue to request in the background. If you want to pause the request in this case, you can implement it in ",(0,r.jsx)(t.code,{children:"middleware"}),"."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"let pause = false;\nuseAutoRequest({\n  // ...\n  middleware(_, \u200b\u200bnext) {\n    if (!pause) {\n      next();\n    }\n  }\n});\n"})}),"\n",(0,r.jsxs)(t.p,{children:["You can pause or resume the automatic request by controlling the ",(0,r.jsx)(t.code,{children:"pause"})," variable."]}),"\n",(0,r.jsx)(t.h2,{id:"custom-listening-functions",children:"Custom listening functions"}),"\n",(0,r.jsx)(t.p,{children:"The above 4 methods of automatically fetching data are implemented by listening browser's events by default. When users use it in a non-browser environment, you may need to customize the listening function. This function receives the notification request function and useHook config as parameters, and returns a cancel listening function.\n."}),"\n",(0,r.jsxs)(t.p,{children:["The following is an example of custom listening function in ",(0,r.jsx)(t.code,{children:"react-native"}),":"]}),"\n",(0,r.jsx)(t.h3,{id:"network-reconnection-custom-function",children:"Network reconnection custom function"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"import NetInfo from '@react-native-community/netinfo';\nuseAutoRequest.onNetwork = (notify, config) => {\n  const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {\n    isConnected && notify();\n  });\n  return unsubscribe;\n};\n"})}),"\n",(0,r.jsx)(t.h3,{id:"polling-custom-function",children:"Polling custom function"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"useAutoRequest.onPolling = (notify, config) => {\n  const timer = setInterval(notify, config.pollingTime);\n  return () => clearInterval(timer);\n};\n"})}),"\n",(0,r.jsx)(t.h3,{id:"app-switching-custom-function",children:"App switching custom function"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"import { AppState, Text } from 'react-native';\nuseAutoRequest.onVisibility = (notify, config) => {\n  const subscription = AppState.addEventListener('change', state => {\n    state === 'active' && notify();\n  });\n  return () => subscription.remove();\n};\n"})}),"\n",(0,r.jsx)(t.h3,{id:"app-focus-custom-function",children:"App focus custom function"}),"\n",(0,r.jsx)(t.p,{children:"Since the App doesn't have a focus event, it can be set to an empty function to avoid throwing error."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-javascript",children:"useAutoRequest.onFocus = (notify, config) => {\n  return () => {};\n};\n"})})]})}function d(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},85162:(e,t,n)=>{n.d(t,{Z:()=>a});n(67294);var r=n(90512);const o={tabItem:"tabItem_Ymn6"};var s=n(85893);function a(e){let{children:t,hidden:n,className:a}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.Z)(o.tabItem,a),hidden:n,children:t})}},74866:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(67294),o=n(90512),s=n(12466),a=n(16550),i=n(20469),u=n(91980),l=n(67392),c=n(20812);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:o}}=e;return{value:t,label:n,attributes:r,default:o}}))}(n);return function(e){const t=(0,l.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function f(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:n}=e;const o=(0,a.k6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,u._X)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(o.location.search);t.set(s,e),o.replace({...o.location,search:t.toString()})}),[s,o])]}function m(e){const{defaultValue:t,queryString:n=!1,groupId:o}=e,s=h(e),[a,u]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[l,d]=p({queryString:n,groupId:o}),[m,g]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[o,s]=(0,c.Nk)(n);return[o,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:o}),b=(()=>{const e=l??m;return f({value:e,tabValues:s})?e:null})();(0,i.Z)((()=>{b&&u(b)}),[b]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!f({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);u(e),d(e),g(e)}),[d,g,s]),tabValues:s}}var g=n(72389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=n(85893);function x(e){let{className:t,block:n,selectedValue:r,selectValue:a,tabValues:i}=e;const u=[],{blockElementScrollPositionUntilNextRender:l}=(0,s.o5)(),c=e=>{const t=e.currentTarget,n=u.indexOf(t),o=i[n].value;o!==r&&(l(t),a(o))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=u.indexOf(e.currentTarget)+1;t=u[n]??u[0];break}case"ArrowLeft":{const n=u.indexOf(e.currentTarget)-1;t=u[n]??u[u.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>u.push(e),onKeyDown:d,onClick:c,...s,className:(0,o.Z)("tabs__item",b.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function y(e){let{lazy:t,children:n,selectedValue:o}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==o})))})}function j(e){const t=m(e);return(0,v.jsxs)("div",{className:(0,o.Z)("tabs-container",b.tabList),children:[(0,v.jsx)(x,{...t,...e}),(0,v.jsx)(y,{...t,...e})]})}function w(e){const t=(0,g.Z)();return(0,v.jsx)(j,{...e,children:d(e.children)},String(t))}},11151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>a});var r=n(67294);const o={},s=r.createContext(o);function a(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);