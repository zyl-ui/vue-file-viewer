<!--
 * @Author: zhanghan
 * @Date: 2023-01-09 15:04:10
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-12 14:43:21
 * @Descripttion: 渲染文件不存在的容器
-->
<template>
  <div class="notFind">
    <div style="margin-top: 50vh">
      {{ fileName }}文件不存在，请检查地址是否存在此文件：
      <a target="_blank" :href="url">{{ url }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFind',
  props: {
    // 文件名称
    fileName: {
      type: String,
      default: ''
    },
    // 文件后缀类型
    fileType: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.notFind {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.2rem;
  padding: 10px;
}

@media (max-width: 992px) {
  .notFind {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

@media (max-width: 768px) {
  .notFind {
    font-size: 3rem;
    line-height: 4rem;
  }
}
</style>
