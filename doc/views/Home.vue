<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:29
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-11 13:51:05
 * @Descripttion: 首页
-->
<template>
  <div class="page-home page">
    <section class="demo">
      <div
        class="section-content swiper"
        style="height: 1000px;overflow: hidden;"
      >
        <iframe
          scrolling="auto"
          seamless
          src="./file-viewer/index.html?shoHead=true&&fileUrl=https://home.sharecorner.top/fileTest/pdf.pdf"
          style="border:0;height: 100%;width:100%"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.swiper {
  position: relative;
  overflow: auto;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
