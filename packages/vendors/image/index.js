/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:21:33
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-09 21:27:28
 * @Descripttion: 图片渲染
 */
import Vue from 'vue'
import ImageViewer from './ImageViewer'
import { readDataURL } from '../../util'

/**
 * 图片渲染
 */
export default async function renderImage(buffer, target) {
  const url = await readDataURL(buffer)
  return new Vue({
    render: (h) => h(ImageViewer, { props: { image: url } })
  }).$mount(target)
}
