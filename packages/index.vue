<template>
  <div class="vue-file-viewer">
    <div class="banner" v-if="!hidden">
      <h1>
        <div>
          在线文档查看
          <input class="file-select" type="file" @change="handleChange" />
        </div>
      </h1>
    </div>
    <div v-show="!loading && showScale" class="ctrol_btn">
      <div class="scale_add" @click="scaleBtn('add')">➕</div>
      <div class="scale_reduce" @click="scaleBtn('reduce')">➖</div>
    </div>
    <div>
      <div v-show="loading" class="loading">正在加载中，请耐心等待...</div>
      <div v-show="!loading" ref="output" :style="{ zoom: clientZoom }"></div>
    </div>
  </div>
</template>

<script>
import { getExtend, readBuffer, render } from './util'
import { parse } from 'qs'
import axios from 'axios'

/**
 * 支持嵌入式显示，基于postMessage支持跨域
 * 示例代码：
 *
 */
export default {
  name: 'VueFileViewer',
  props: {
    // 上传的地址
    file: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      // 加载状态跟踪
      loading: false,
      // 是否开始放大缩小按钮
      showScale: true,
      // 上个渲染实例
      last: null,
      // 隐藏头部，当基于消息机制渲染，将隐藏
      hidden: false,
      // 安全宽度（低于此内容无法展示全）
      safeWith: 1280,
      // 当前文档的缩放比例
      clientZoom: 1
    }
  },
  created() {
    // 作为iframe使用时，允许使用预留的消息机制发送二进制数据，必须在url后添加?name=xxx.xxx&from=xxx
    const { from, name, fileUrl } = parse(location.search.substring(1))
    if (from) {
      window.addEventListener('message', (event) => {
        const { origin, data: blob } = event
        if (origin === from && blob instanceof Blob) {
          // 构造响应，自动渲染
          const file = new File([blob], name, {})
          this.loadFromBlob(file)
        }
      })
    }
    // 作为iframe使用时，允许通过链接传参获取文件链接数据
    if (fileUrl) {
      this.loadFromUrl(fileUrl)
    }
    // 作为组件使用时，允许接收不同格式的文件数据（链接 or file）
    if (this.file) {
      typeof this.file === 'string'
        ? this.loadFromUrl(this.file)
        : this.loadFromBlob(this.file)
    }
  },
  mounted() {
    // 窗体大小改变时自动计算缩放比例
    window.onload = window.onresize = () => {
      this.bodyScale()
    }
  },
  methods: {
    // 设置缩放比例
    scaleBtn(type) {
      if (this.clientZoom <= 0.1 && type !== 'add') return
      type === 'add' ? (this.clientZoom += 0.1) : (this.clientZoom -= 0.1)
    },
    // 自动缩放比例
    bodyScale() {
      const devicewidth = document.documentElement.clientWidth
      const scale =
        devicewidth > this.safeWith ? 1 : devicewidth / this.safeWith // 分母——设计稿的尺寸
      this.clientZoom = scale
    },
    // 从url加载
    loadFromUrl(url) {
      this.hidden = true //隐藏头部
      this.loading = true
      // 要预览的文件地址
      const filename = url.substr(url.lastIndexOf('/') + 1)
      // 拼接iframe请求url
      axios({
        url,
        method: 'get',
        responseType: 'blob'
      })
        .then(({ data }) => {
          if (!data) {
            console.error('文件下载失败')
          }
          const file = new File([data], filename, {})
          this.handleChange({ target: { files: [file] } })
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 从file文件流加载
    loadFromBlob(file) {
      this.hidden = true //隐藏头部
      this.handleChange({ target: { files: [file] } })
    },
    // 监听上传事件获取文件信息，并处理文件
    async handleChange(e) {
      this.loading = true
      try {
        const [file] = e.target.files
        const arrayBuffer = await readBuffer(file)
        this.loading = false
        this.last = await this.displayResult(arrayBuffer, file)
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    // 文件信息处理，对应文件渲染方法
    displayResult(buffer, file) {
      // 取得文件名
      const { name } = file
      // 取得扩展名
      const extend = getExtend(name)
      if (
        [
          'gif',
          'jpg',
          'jpeg',
          'bmp',
          'tiff',
          'tif',
          'png',
          'svg',
          'mp4'
        ].includes(extend)
      ) {
        this.showScale = false
      } else {
        this.showScale = true
      }
      // 输出目的地
      const { output } = this.$refs
      // 生成新的dom
      const node = document.createElement('div')
      // 添加孩子，防止vue实例替换dom元素
      if (this.last) {
        output.innerHTML = ''
        this.last.$destroy()
      }
      const child = output.appendChild(node)
      // 调用渲染方法进行渲染
      return new Promise((resolve, reject) =>
        render(buffer, extend, child)
          .then(resolve)
          .catch(reject)
      )
    }
  }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
