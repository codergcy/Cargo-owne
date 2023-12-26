module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
    entry
      .add('@/mock')
      .end()
  },
  devServer: {
    // 端口配置
    port: 1888,
    // 反向代理配置
    proxy: {
      '/jeecg-boot': {
        target: 'https://platform.zgtian.cn/', //请求本地 需要jeecg-boot后台项目  http://192.168.1.54:3000/   http://192.168.1.48:8090   https://ntocc.cqysaj.com  wlhy-tms.manhuoda.com  https://dsly.manhuoda.com  http://192.168.1.47:8091
        ws: false,
        changeOrigin: true
      }
    }
  }
}
