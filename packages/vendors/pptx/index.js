/*
 * @Author: zhanghan
 * @Date: 2023-01-09 15:04:10
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-09 16:36:35
 * @Descripttion: pptx渲染
 */

import Vue from 'vue'
import Pptx from './pptx.vue'

/**
 * pptx渲染逻辑，使用vue组件，重构自pptxjs，感谢大神让我站在巨人的肩膀上
 * @param buffer 二进制数据
 * @param target 目标
 */
export default async function renderPptx(buffer, target) {
  return new Vue({
    render: (h) => h(Pptx, { props: { data: buffer } }),
  }).$mount(target)
}
