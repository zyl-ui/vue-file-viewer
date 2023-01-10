/*
 * @Author: zhanghan
 * @Date: 2022-11-28 09:13:53
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-09 21:49:06
 * @Descripttion: 生产环境配置
 */

const path = require('path')
//  获取基于当前路径的目标文件
const resolve = (dir) => path.join(__dirname, '../', dir)

const buildConfig = {
  //  输出文件目录
  outputDir: resolve('lib'),
  productionSourceMap: false,
  //  webpack配置
  configureWebpack: {
    //  入口文件(这里获取到的是每个独立包的入口文件地址数组)
    entry: {
      // 全量引入的文件入口
      index: resolve('packages')
    },
    //  输出配置
    output: {
      //  主入口文件名称
      filename: '[name]/index.js',
      //  构建依赖类型
      libraryTarget: 'umd',
      //  库中被导出的项
      libraryExport: 'default',
      //  引用时的依赖名
      library: 'vue-file-viewer'
    }
  },
  css: {
    sourceMap: false,
    // 是否将组件中的css提取至一个独立的css，库构建时可以设置为false，免得用户需要自己导入css
    extract: false
    // extract: {
    //   filename: '[name]/index.css',
    // },
  },
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

    // 一些构建优化
    // 删除splitChunks，因为每个组件是独立打包，不需要抽离每个组件的公共js出来。
    config.optimization.delete('splitChunks')
    // 删除copy，不要复制public文件夹内容到lib文件夹中。
    config.plugins.delete('copy')
    // 删除preload以及prefetch，因为不生成html页面，所以这两个也没用。
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 删除html，只打包组件，不生成html页面。
    config.plugins.delete('html')
    // 删除hmr，删除热更新。
    config.plugins.delete('hmr')
    // 删除自动加上的入口App。
    config.entryPoints.delete('app')
  }
}

module.exports = buildConfig
