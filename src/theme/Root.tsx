import React from 'react';

// 自动判断语言环境
// if (process.env.NODE_ENV === 'development') {
//   const locale = window.navigator.language;
//   const pathname = window.location.pathname;
//   if (['zh-CN'].includes(locale) && pathname.indexOf(locale) < 0) {
//     location.href = '/' + locale + pathname;
//   }
// }

// 默认实现，你可以自定义
export default function Root({ children }) {
  return <>{children}</>;
}
