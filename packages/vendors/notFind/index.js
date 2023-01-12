/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-12 14:31:25
 * @Descripttion: 错误渲染
 */
import Vue from 'vue'
import notFind from './notFind'

/**
 * 错误渲染
 */
export default async function renderNotFind(url, target, fileType, fileName) {
  return new Vue({
    render: (h) => h(notFind, { props: { fileType, fileName, url } })
  }).$mount(target)
}
