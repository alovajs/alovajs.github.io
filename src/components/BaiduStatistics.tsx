import Script from 'next/script';

const BAIDU_ID = '5afa4c96fca09cb386951b736ee31e56';

export function BaiduStatistics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Script
      id="baidu-tongji"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function () {
            var hm = document.createElement('script');
            hm.src = 'https://hm.baidu.com/hm.js?${BAIDU_ID}';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(hm, s);
          })();
        `
      }}
    />
  );
}
