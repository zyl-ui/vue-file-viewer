/*
 * @Author: zhanghan
 * @Date: 2022-11-22 16:39:30
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-09 19:59:32
 * @Descripttion: prettier 配置
 */
module.exports = {
  // tab缩进大小,默认为2
  tabWidth: 2,
  useTabs: false,
  // 使用分号, 默认true
  semi: false,
  // 使用单引号,
  singleQuote: true,
  // 行尾逗号,
  TrailingCooma: 'none',
  // 空格
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'ignore', // 不启用空格敏感格式化
  // 箭头函数参数括号 默认avoid 可选 avoid| always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'always'
}
