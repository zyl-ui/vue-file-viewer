/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-12 14:31:37
 * @Descripttion: 错误渲染
 */
import Vue from 'vue'
import error from './error'
import { readDataURL } from '../../util'

/**
 * 错误渲染
 */
export default async function renderError(buffer, target, fileType, fileName) {
  const url = await readDataURL(buffer)
  return new Vue({
    render: (h) => h(error, { props: { fileType, fileName, url } })
  }).$mount(target)
}
