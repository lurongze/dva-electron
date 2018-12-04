const path = require('path');
// ref: https://umijs.org/config/
export default {
  publicPath: './',
  history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      pwa: false,
      // dynamicImport: true,
      title: 'dva-base',
      dll: false,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
      hardSource: true,
    }],
  ],
  alias:{
    components:path.resolve(__dirname,'src/components'),
    utils:path.resolve(__dirname,'src/utils'),
    services:path.resolve(__dirname,'src/services'),
    models:path.resolve(__dirname,'src/models'),
    themes:path.resolve(__dirname,'src/themes'),
    images:path.resolve(__dirname,'src/assets')
  }
}
