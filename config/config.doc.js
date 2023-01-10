/*
 * @Author: zhanghan
 * @Date: 2022-11-28 09:13:53
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 20:05:15
 * @Descripttion: 文档环境配置
 */

module.exports = {
  outputDir: './doc-dist',
  publicPath: '/file-viewer-doc',
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'doc/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置
  chainWebpack: (config) => {
    // set worker-loader
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end()

    // 解决：worker 热更新问题
    config.module.rule('js').exclude.add(/\.worker\.js$/)

    // packages 加入编译
    config.module
      .rule('js')
      .include.add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')

    // 别名配置
    config.resolve.alias.set('@', '/doc').set('@packages', '/packages')
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/style/imports.scss";'
      }
    }
  }
}
