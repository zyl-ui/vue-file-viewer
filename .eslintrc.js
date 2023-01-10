/*
 * @Author: zhanghan
 * @Date: 2023-01-04 13:49:25
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 00:16:51
 * @Descripttion:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': ['error', { args: 'none' }], // 允许函数参数未使用
    'no-control-regex': 0, // 允许在正则表达式中使用控制字符
    //关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    // 强制使用单引号
    quotes: ['error', 'single'],
    // 强制不使用分号结尾
    semi: ['error', 'never']
  }
}
