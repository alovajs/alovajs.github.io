import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { BaiduStatistics } from '@/components/BaiduStatistics';
import { GoogleAdsense } from '@/components/GoogleAdsense';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Alova.JS',
    template: '%s | Alova.JS'
  },
  description:
    'alova is perfectly compatible with your favorite HTTP clients and UI frameworks, accelerates business logic for both client and server apps, while making API documentation and and code interactive with each other.',
  icons: {
    icon: '/img/favicon.ico'
  },
  other: {
    'twitter:site': '@alovajs'
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.className}
      suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{
            defaultTheme: 'light',
            enableSystem: true
          }}>
          {children}
        </RootProvider>
        <BaiduStatistics />
        <GoogleAdsense />
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-539X2N2M');`
          }}
        />
        <script src="/iconfont/iconfont.js" />
      </body>
    </html>
  );
}
