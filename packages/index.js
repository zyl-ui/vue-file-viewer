/*
 * @Author: zhanghan
 * @Date: 2023-01-04 13:49:25
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-09 21:59:26
 * @Descripttion: 注册组件
 */
import VueFileViewer from './index.vue'

VueFileViewer.install = (Vue) =>
  Vue.component(VueFileViewer.name, VueFileViewer)

export default VueFileViewer
