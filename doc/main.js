/*
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:32
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 15:37:42
 * @Descripttion:
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFileViewer from '../packages'
Vue.use(VueFileViewer)

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
