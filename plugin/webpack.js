export default function (context, options) {
  return {
    name: 'webpack-config',
    configureWebpack() {
      return {
        devServer: {
          host: '0.0.0.0'
        }
      };
    }
  };
}
