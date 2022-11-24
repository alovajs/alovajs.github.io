import React from 'react';

// 自动判断语言环境
try {
  if (process.env.NODE_ENV !== 'development') {
    const storageKey = 'language.toggle';
    const locale = window.navigator.language;
    const href = window.location.href;
    if (['zh-CN'].includes(locale) && href.indexOf(locale) < 0 && !sessionStorage.getItem(storageKey)) {
      const hrefSplited = href.split('/');
      hrefSplited.splice(3, 0, locale);
      location.href =  hrefSplited.join('/');
      sessionStorage.setItem(storageKey, '1');
    }
  }
} catch(e) {}

// 默认实现，你可以自定义
export default function Root({ children }) {
  return <>{children}</>;
}
