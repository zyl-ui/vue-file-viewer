<!--
 * @Author: zhanghan
 * @Date: 2023-01-09 15:04:10
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-12 14:28:23
 * @Descripttion: 渲染不支持格式的容器
-->
<template>
  <div class="error">
    <div style="margin-top: 50vh">
      不支持
      <span style="color:skyblue">.{{ fileType }}</span>
      格式的在线预览，请下载后预览或转换为支持的格式
      <br />
      支持docx, xlsx, pptx, pdf, 以及纯文本格式和各种图片格式的在线预览
    </div>
    <button class="download" @click="fileDownload(url, fileName)">
      下载{{ fileName }}
    </button>
  </div>
</template>

<script>
import { fileDownload } from '../../util'
export default {
  name: 'error',
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
  },
  methods: {
    fileDownload
  }
}
</script>

<style scoped>
.error {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.2rem;
  padding: 10px;
}

.download {
  outline: none;
  border-radius: 20px;
  border: 1px solid #e3e3e3;
  font-size: 1.5rem;
  padding: 20px;
  cursor: pointer;
  background: #fafafa;
  margin-top: 25px;
}

@media (max-width: 992px) {
  .error {
    font-size: 2rem;
    line-height: 2.5rem;
  }
  .download {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .error {
    font-size: 3rem;
    line-height: 4rem;
  }
  .download {
    font-size: 4rem;
  }
}
</style>
