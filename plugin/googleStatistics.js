export default async function (_, { id }) {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    name: 'google-statistics',
    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: `https://www.googletagmanager.com/gtag/js?id=${id}`
            }
          },
          {
            tagName: 'script',
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${id}');
            `
          }
        ]
      };
    }
  };
}
