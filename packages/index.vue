<template>
  <div class="vue-file-viewer">
    <div class="banner" v-if="shoHead || !hidden">
      <div class="file-select">
        <button
          type="button"
          style="margin-right: 20px"
          @click.stop="isUrl = !isUrl"
        >
          【点击切换】{{ isUrl ? '上传预览' : '输入网址' }}
        </button>
        <div class="overlay">
          <span v-if="isUrl" style="white-space: pre;">
            <input
              type="text"
              v-model="inputUrl"
              placeholder="请输入浏览文件地址"
            />
            <button type="button" @click.stop="loadFromUrl(inputUrl, true)">
              预览
            </button>
          </span>
          <span v-else>
            <input type="file" @change="handleChange" />
          </span>
        </div>
      </div>
    </div>
    <div v-show="!loading && showScale" class="ctrol_btn">
      <div class="scale_add" @click="scaleBtn('add')">➕</div>
      <div class="scale_reduce" @click="scaleBtn('reduce')">➖</div>
      <div class="download" @click="fileDownload(file, uploadFileName)">
        下载
      </div>
    </div>
    <div>
      <div v-show="loading" class="loading">正在加载中，请耐心等待...</div>
      <div
        v-show="!loading"
        ref="output"
        :style="{ zoom: clientZoom, zIndex: 2013 }"
      ></div>
    </div>
  </div>
</template>

<script>
import { getExtend, readBuffer, render, fileDownload } from './util'
import { typeInfo } from './renders'
import renders from './renders'
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
    },
    // 是否显示头部
    shoHead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 是否默认为输入网址
      isUrl: true,
      // input输入的url
      inputUrl: '',
      // 上传文件名
      uploadFileName: '',
      // 加载状态跟踪
      loading: false,
      // 是否开启放大缩小按钮
      showScale: false,
      // 隐藏头部，当基于消息机制渲染，将隐藏
      hidden: false,
      // 安全宽度（低于此内容无法展示全）
      safeWith: 1400,
      // 当前文档的缩放比例
      clientZoom: 1
    }
  },
  created() {
    // 作为iframe使用时，允许使用预留的消息机制发送二进制数据，必须在url后添加?name=xxx.xxx&from=xxx
    const { from, name, fileUrl, shoHead } = parse(location.search.substring(1))
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
      this.loadFromUrl(fileUrl, Boolean(shoHead))
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
    fileDownload,
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
    loadFromUrl(url, shoHead = false) {
      this.hidden = !shoHead //隐藏头部
      this.loading = true
      this.inputUrl = url
      // 要预览的文件地址
      this.uploadFileName = url.substr(url.lastIndexOf('/') + 1)
      // 拼接iframe请求url
      axios({
        url,
        method: 'get',
        responseType: 'blob'
      })
        .then(({ data }) => {
          const file = new File([data], this.uploadFileName, {})
          this.handleChange({ target: { files: [file] } })
        })
        .finally(() => {
          this.loading = false
        })
        .catch(() => {
          console.error('文件下载失败')
          // 展示文件不存在
          renders['notFind'](
            url,
            this.$refs.output,
            getExtend(this.uploadFileName),
            this.uploadFileName
          )
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
        await this.displayResult(arrayBuffer, file)
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
      this.uploadFileName = name
      // 取得扩展名并统一转小写兼容大写
      const extend = getExtend(name).toLowerCase()
      // 媒体和图片类型或者不支持的类型不显示缩放按钮
      if (
        [...typeInfo.image, ...typeInfo.video].includes(extend) ||
        !renders[extend]
      ) {
        this.showScale = false
      } else {
        this.showScale = true
      }
      // 生成新的dom
      const node = document.createElement('div')
      // 清空容器里的元素
      this.$refs.output.innerHTML = ''
      // 容器追加新的子元素
      const child = this.$refs.output.appendChild(node)
      // 调用对应渲染方法进行渲染
      return new Promise((resolve, reject) =>
        render(buffer, child, extend, name)
          .then(() => {
            // 渲染结束调整缩放比例
            this.bodyScale()
            resolve()
          })
          .catch(reject)
      )
    }
  }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
