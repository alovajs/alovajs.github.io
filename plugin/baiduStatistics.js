module.exports = async function myPlugin(context, { id }) {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    name: 'baidu-statistics',
    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              var _hmt = _hmt || [];
              (function () {
                var hm = document.createElement('script');
                hm.src = 'https://hm.baidu.com/hm.js?${id}';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `
          }
        ]
      };
    }
  };
};
