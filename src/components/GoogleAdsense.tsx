import Script from 'next/script';

const ADSENSE_ID = 'ca-pub-9340608779671156';

export function GoogleAdsense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
