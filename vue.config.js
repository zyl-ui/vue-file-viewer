/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:03:01
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 14:45:44
 * @Descripttion:
 */

// 组件开发环境（编译构建的是examples文件夹内的东西，用于组件库开发调试）
const devConfig = require('./config/config.dev')

// 组件打包环境（编译构建的是packages文件夹内的东西，用于打包组件发布npm）
const buildConfig = require('./config/config.build')

// 组件打包环境（编译构建的是doc文件夹内的东西，用于文档演示调试和发布）
const docConfig = require('./config/config.doc')

// iframe（编译构建的是examples文件夹内的东西，用于打包项目对外作为iframe提供api使用）
const iframeConfig = require('./config/config.build.iframe')

let nowConf = {}

// 根据环境判断使用哪个配置
switch (process.env.VUE_APP_ENV) {
  case 'production':
    nowConf = buildConfig
    break
  case 'development':
    nowConf = devConfig
    break
  case 'doc':
    nowConf = docConfig
    break
  case 'iframe':
    nowConf = iframeConfig
    break
}

module.exports = nowConf
