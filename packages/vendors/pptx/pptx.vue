<template>
  <div class="pptx-wrapper" ref="wrapper" />
</template>

<script>
import $ from 'jquery'
import { DefaultOptions } from './options'
import Worker from './worker/pptx.worker'
import 'nvd3/build/nv.d3.min.css'

/**
 * pptx预览组件
 * 支持类型为
 *  application/vnd.openxmlformats-officedocument.presentationml.presentation
 * 的文件
 */
export default {
  name: 'pptx',
  props: {
    data: ArrayBuffer,
    options: {
      type: Object,
      default: DefaultOptions,
      description: '默认配置，支持扩展'
    }
  },
  data() {
    return {
      isDone: false,
      thumbElement: null,
      worker: null
    }
  },
  mounted() {
    this.startWorker()
  },
  methods: {
    // 启动worker逻辑
    startWorker() {
      // Actual Web Worker - If you want to use this, switching worker's url to Blob is probably better
      if (this.worker) {
        this.worker.terminate()
      }

      this.worker = new Worker()
      this.worker.addEventListener(
        'message',
        (event) => this.processMessage(event.data),
        false
      )
      // 定时检测执行情况，发现完成则及时关闭
      this.timer = setInterval(this.stopWorker, 500)
      // 通知worker开始工作
      this.worker.postMessage({
        type: 'processPPTX',
        data: this.data,
        IE11: !!window.MSInputMethodContext && !!document.documentMode,
        options: this.options
      })
    },
    // 停止worker逻辑
    stopWorker() {
      if (this.isDone) {
        this.worker.terminate()
        console.log('worker terminated')
        clearInterval(this.timer)
      }
    },
    // 窗口拖动大小，自动调整位置
    resize() {
      const $wrapper = $(this.$refs.wrapper)
      const slidesWidth = Math.max(
        ...Array.from($wrapper.children('section')).map((s) => s.offsetWidth)
      )
      const wrapperWidth = $wrapper[0].offsetWidth
      $wrapper.css({
        transform: `scale(${wrapperWidth / slidesWidth})`,
        'transform-origin': 'top left'
      })
    },
    // 核心处理逻辑
    processMessage(msg) {
      if (this.isDone) return
      const $wrapper = $(this.$refs.wrapper)
      const { thumbElement } = this
      switch (msg.type) {
        case 'slide':
          console.log('正在处理:', msg.slide_num)
          $wrapper.append(msg.data)
          break
        case 'pptx-thumb':
          if (thumbElement)
            $(thumbElement).attr('src', `data:image/jpeg;base64,${msg.data}`)
          break
        case 'slideSize':
          break
        case 'globalCSS':
          $wrapper.append(`<style>${msg.data}</style>`)
          break
        case 'Done':
          this.isDone = true
          break
        case 'WARN':
          console.warn('PPTX processing warning: ', msg.data)
          break
        case 'ERROR':
          this.isDone = true
          console.error('PPTX processing error: ', msg.data)
          break
        case 'DEBUG':
          console.debug('Worker: ', msg.data)
          break
        case 'INFO':
        default:
          console.info('Worker: ', msg.data)
      }
    }
  }
}
</script>

<style scoped>
@import 'styles/pptxjs.css';

.pptx-wrapper {
  margin: 0 auto;
}
</style>
