/*
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:32
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 17:43:47
 * @Descripttion:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
// import Start from './views/Start.vue'

Vue.use(VueRouter)

export const routes = [
  { path: '/', name: 'Home', component: Home },
  // { path: '/start', name: '上手', component: Start },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({ routes })

export default router
