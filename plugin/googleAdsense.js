/**
 * Google AdSense 插件
 * 该插件为网站添加 Google AdSense 支持
 */

module.exports = function (_, options) {
  const { id } = options || {};

  return {
    name: 'google-adsense',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${id}`,
              crossOrigin: 'anonymous'
            }
          }
        ]
      };
    }
  };
};
