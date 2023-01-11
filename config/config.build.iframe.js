/*
 * @Author: zhanghan
 * @Date: 2022-11-28 09:13:53
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-11 15:23:46
 * @Descripttion: iframe开发环境配置
 */
const path = require('path')
//  获取基于当前路径的目标文件
const resolve = (dir) => path.join(__dirname, '../', dir)

module.exports = {
  publicPath: './',
  // 放在public下供项目演示时作为iframe入口使用
  outputDir: resolve('/public/file-viewer'),
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  assetsDir: 'static',
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
    config.resolve.alias.set('@', '/examples').set('@packages', '/packages')
  }
}
