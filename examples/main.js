/*
 * @Author: zhanghan
 * @Date: 2022-11-27 19:21:21
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 13:13:14
 * @Descripttion: 主入口文件
 */

import Vue from 'vue'
import App from './App.vue'

// import VueFileViewer from '../packages'
// Vue.use(VueFileViewer)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
