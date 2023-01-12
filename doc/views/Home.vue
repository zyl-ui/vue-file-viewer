<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:29
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-12 13:48:35
 * @Descripttion: 首页
-->
<template>
  <div class="page-home page">
    <section class="demo">
      <div class="section-content">
        <iframe
          scrolling="auto"
          src="./file-viewer/index.html?shoHead=true&&fileUrl=https://home.sharecorner.top/fileTest/pdf.pdf"
          style="border:0;height: 800px;width:100%"
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
