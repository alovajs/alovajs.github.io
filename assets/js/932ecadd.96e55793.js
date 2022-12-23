"use strict";(self.webpackChunkalova_website=self.webpackChunkalova_website||[]).push([[921],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=s(a),u=r,f=m["".concat(p,".").concat(u)]||m[u]||c[u]||o;return a?n.createElement(f,i(i({ref:t},d),{},{components:a})):n.createElement(f,i({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},783:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=a(7462),r=(a(7294),a(3905));const o={title:"list of page numbers",sidebar_position:60},i=void 0,l={unversionedId:"example/paginated-list",id:"example/paginated-list",title:"list of page numbers",description:"The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the Getting Started Guide;",source:"@site/docs/02-example/10-paginated-list.md",sourceDirName:"02-example",slug:"/example/paginated-list",permalink:"/example/paginated-list",draft:!1,editUrl:"https://github.com/alovajs/alovajs.github.io/blob/main/docs/02-example/10-paginated-list.md",tags:[],version:"current",sidebarPosition:60,frontMatter:{title:"list of page numbers",sidebar_position:60},sidebar:"tutorialSidebar",previous:{title:"drop down to load more",permalink:"/example/load-more"},next:{title:"Getting Started",permalink:"/category/getting-started"}},p={},s=[],d={toc:s};function c(e){let{components:t,...a}=e;return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"The example uses vue3 as an example, but you can also use alova in react and svelte. For details, please read the ",(0,r.kt)("a",{parentName:"p",href:"../overview/index"},"Getting Started Guide"),";")),(0,r.kt)("iframe",{src:"https://codesandbox.io/embed/pagination-owb89r?fontsize=14&hidenavigation=1&theme=dark&module=%2Fsrc%2FApp.vue",style:{width:"100%",height:"500px",border:"0",borderRadius:"4px",overflow:"hidden"},title:"pagination",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),(0,r.kt)("admonition",{title:"example description",type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Using the ",(0,r.kt)("inlineCode",{parentName:"p"},"usePagination")," in the ",(0,r.kt)("strong",{parentName:"p"},"@alova/hooks")," extension, you can achieve a more high-performance and easy-to-use pagination function, automatic management of paging-related status, preloading of previous and previous pages, and automatic maintenance of data addition/editing/replacement/ Removed, and request-level stabilization."),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("em",{parentName:"p"},"Operation guide:")),(0,r.kt)("ol",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ol"},"After the initialization is completed, the next page of data will be preloaded, and there is no need to wait when turning to the next page;"),(0,r.kt)("li",{parentName:"ol"},"Adding, deleting, and modifying list items does not need to reset the list, it will be automatically processed into the same effect as the re-request;")),(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"../extension/alova-hooks/usePagination"},"usePagination documentation"))))}c.isMDXComponent=!0}}]);