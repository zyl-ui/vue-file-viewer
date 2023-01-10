/*
 * @Author: zhanghan
 * @Date: 2023-01-09 15:04:10
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-09 16:36:08
 * @Descripttion:
 */
import Vue from 'vue'
import PdfView from './PdfView.vue'

export default async function renderPdf(buffer, target) {
  return new Vue({
    render: (h) => h(PdfView, { props: { data: buffer } }),
  }).$mount(target)
}
