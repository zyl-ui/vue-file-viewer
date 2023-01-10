<!--
 * @Author: zhanghan
 * @Date: 2023-01-09 15:04:10
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 10:48:03
 * @Descripttion: 渲染图片的容器
-->
<template>
  <viewer :images="images">
    <img
      v-for="item in images"
      alt="图片"
      :src="item.src"
      :key="item.index"
      class="image"
    />
  </viewer>
</template>

<script>
import Vue from 'vue'
import viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(viewer)

export default {
  name: 'ImageViewer',
  props: {
    image: String
  },
  computed: {
    images() {
      return this.image ? [{ src: this.image }] : []
    }
  }
}
</script>

<style scoped>
.image {
  display: block;
  width: 80%;
  margin: 0 auto;
}
</style>
