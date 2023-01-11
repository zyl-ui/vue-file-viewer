<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:29
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-11 16:20:52
 * @Descripttion: 快速上手
-->
<template>
  <div class="page-home page">
    <h2>iframe方式示例（推荐）：</h2>
    <h3>使用说明：</h3>
    <h4>
      推荐独立部署
      {{ config.name }}
      的编译构建产物，并使用iframe方式引入以减少引入构建代价，提升构建效率。
    </h4>
    <h4>此种方式支持跨框架使用。</h4>
    <h3>使用步骤：</h3>
    <h4>
      1、需要自行前往本项目源码处下载编译构建后的产物
      <a
        href="https://github.com/zyl-ui/vue-file-viewer/tree/master/public/file-viewer"
        target="_blank"
      >
        file-viewer
      </a>
      。
      <br />
    </h4>
    <h4>
      2、将下载后的file-viewer文件夹整个放在项目公共文件夹中作为外部公共资源使用。
      <br />
      （以vue-cli为例，放置在项目public文件夹下；其他框架自行选择合适的公共路径放置）
    </h4>
    <h3>注意事项：</h3>
    <h4>* 本项目示例链接随时失效，请勿直接用于生产环境。</h4>
    <h4>* 被浏览的文件链接必须同源或本身支持跨域访问。</h4>
    <h4>
      *
      若发布生产的项目不在服务器域名根目录，记得配置打包的前缀路径，打包后资源才能被正常引用。（以vue-cli为例，配置
      <code>vue.config.js</code>
      的
      <code>publicPath: './'</code>
      ； 其他框架请自行选择合适的配置文件进行配置）
    </h4>
    <br />

    <h3>一般url传入使用</h3>
    <section class="demo">
      <div
        class="section-content swiper"
        style="height: 500px;overflow: hidden;"
      >
        <iframe
          src="./file-viewer/index.html?fileUrl=https://home.sharecorner.top/fileTest/pdf.pdf"
          scrolling="auto"
          style="border:0;height: 100%;width:100%"
        />
      </div>
    </section>
    <section class="snippets">
      <Collapse>
        <div class="section-content">
          <CodeSnippet class="snippet" :code="iframeSnippet" lang="html" />
        </div>
      </Collapse>
    </section>

    <h3>支持二进制文件流消息推送</h3>
    <h3>注意事项：</h3>
    <h4>
      *
      若为node环境，且发布生产的项目不在服务器域名根目录，这将导致生产和开发环境的引用路径不一致（由于动态赋值的路径只会被编译器原样解析，需要特别注意通过配置打包的前缀路径也不会对此次生效，例如
      <code>vue-cli</code>
      的
      <code>publicPath</code>
      ），可通过
      <code>process.env.NODE_ENV</code>
      进行手动判断。
    </h4>
    <h4>* 若为浏览器环境，若有需要可在前面配置统一前缀路径即可。</h4>
    <section class="demo">
      <div
        class="section-content swiper"
        style="height: 500px;overflow: hidden;"
        id="blobIframe"
      ></div>
    </section>
    <section class="snippets">
      <Collapse>
        <div class="section-content">
          <CodeSnippet class="snippet" :code="blobIframeSnippet1" lang="html" />
          <div class="plus">+</div>
          <CodeSnippet class="snippet" :code="blobIframeSnippet2" lang="js" />
        </div>
      </Collapse>
    </section>

    <h2>组件方式示例：</h2>
    <h3>安装：</h3>
    <CodeSnippet class="snippet" :code="installSnippet" lang="js" />
    <h3>使用：</h3>
    <section class="demo">
      <div class="section-content swiper" style="height: 500px;">
        <vue-file-viewer :file="file" />
      </div>
    </section>
    <section class="snippets">
      <Collapse>
        <div class="section-content">
          <CodeSnippet class="snippet" :code="componentSnippet1" lang="html" />
          <div class="plus">+</div>
          <CodeSnippet class="snippet" :code="componentSnippet2" lang="js" />
        </div>
      </Collapse>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import CodeSnippet from '../components/CodeSnippet.vue'
import Collapse from '../components/Collapse.vue'
import { config } from '../config'

const iframeSnippet = `
<iframe
  src="./file-viewer/index.html?fileUrl=https://home.sharecorner.top/fileTest/pdf.pdf"
  scrolling="auto"
  style="border:0;height: 100%;width:100%"
/>
`

const blobIframeSnippet1 = `
<div id="blobIframe"></div>
`

const blobIframeSnippet2 = `
import axios from 'axios'
export default {
  data() {
    return {
      context: {
        // 查看器的地址
        // 自己项目内部署需要将编译后的产物file-viewer放在public文件夹中使用,编译后的产物需要下载，下载链接在文档上
        // 若为node环境，且发布生产的项目不在服务器域名根目录，这将导致生产和开发环境的引用路径不一致（由于动态赋值的路径只会被编译器原样解析，需要特别注意通过配置打包的前缀路径也不会对此次生效，例如vue-cli的publicPath），可通过process.env.NODE_ENV进行手动判断
        // origin: location.origin + process.env.NODE_ENV === 'production'
            ? '/你的前缀路径（没有可去除）/file-viewer/index.html'
            : '/file-viewer/index.html',
        // 若为浏览器环境，若有需要可在/file-viewer前面配置统一前缀路径即可
        origin: location.origin + '/你的前缀路径（没有可去除）/file-viewer/index.html',
        // 目标frame
        frame: null,
        // 浏览的文件url
        url: 'https://home.sharecorner.top/fileTest/pic.png'
      }
    }
  },
  mounted() {
    this.loadFromUrl()
  },
  methods: {
    // 获取文件二进制流
    loadFromUrl() {
      // 要预览的文件地址
      var url = this.context.url
      // 取得文件名
      var filename = url.substring(url.lastIndexOf('/') + 1)
      // 拼接iframe请求url
      var src =
        this.context.origin +
        '?name=' +
        encodeURIComponent(filename) +
        '&from=' +
        encodeURIComponent(location.origin)
      // 拼接frame
      var frame = this.appendFrame(src)
      // 绑定事件
      frame.onload = () => {
        axios({
          url,
          method: 'get',
          responseType: 'blob'
        }).then((data) => {
          if (!data) {
            console.error('文件下载失败')
          }
          console.log(data)
          // 最重要的一步，可以推送流到iframe
          frame.contentWindow.postMessage(data.data, this.context.origin)
        })
      }
    },
    // 插入iframe
    appendFrame(src) {
      var blobIframe = document.getElementById('blobIframe')
      if (this.context.frame) {
        blobIframe.removeChild(this.context.frame)
      }
      // 构建frame
      var frame = (this.context.frame = document.createElement('iframe'))
      frame.src = src
      frame.style = 'border:0;height: 100%;width:100%'
      return blobIframe.appendChild(frame)
    }
  }
`

const installSnippet = `
import Vue from 'vue'
import App from './App.vue'
import vueFileViewer from '${config.name}'

Vue.use(vueFileViewer)

new Vue({
  el: '#app',
  render: h => h(App)
});
`

const componentSnippet2 = `
data () {
  return {
    file: 'https://home.sharecorner.top/fileTest/word.docx' // or 原生 File 文件对象也可以被接收
  }
}
`

const componentSnippet1 = `
<vue-file-viewer :file="file" />
`
export default {
  name: 'Home',
  components: {
    CodeSnippet,
    Collapse
  },

  data() {
    return {
      config,
      iframeSnippet,
      blobIframeSnippet1,
      blobIframeSnippet2,
      installSnippet,
      componentSnippet2,
      componentSnippet1,
      file: 'https://home.sharecorner.top/fileTest/word.docx',
      context: {
        // 查看器的地址
        // 自己项目内部署需要将编译后的产物file-viewer放在public文件夹中使用,编译后的产物需要下载，下载链接在文档上
        // 若为node环境，且发布生产的项目不在服务器域名根目录，这将导致生产和开发环境的引用路径不一致（由于动态赋值的路径只会被编译器原样解析，需要特别注意通过配置打包的前缀路径也不会对此次生效，例如vue-cli的publicPath），可通过process.env.NODE_ENV进行手动判断
        origin:
          location.origin +
          (process.env.NODE_ENV === 'production'
            ? '/file-viewer-doc/file-viewer/index.html'
            : '/file-viewer/index.html'),
        // 目标frame
        frame: null,
        // 浏览的文件url
        url: 'https://home.sharecorner.top/fileTest/pic.png'
      }
    }
  },
  mounted() {
    this.loadFromUrl()
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  },
  methods: {
    // 获取文件二进制流
    loadFromUrl() {
      // 要预览的文件地址
      var url = this.context.url
      // 取得文件名
      var filename = url.substring(url.lastIndexOf('/') + 1)
      // 拼接iframe请求url
      var src =
        this.context.origin +
        '?name=' +
        encodeURIComponent(filename) +
        '&from=' +
        encodeURIComponent(location.origin)
      // 拼接frame
      var frame = this.appendFrame(src)
      // 绑定事件
      frame.onload = () => {
        axios({
          url,
          method: 'get',
          responseType: 'blob'
        }).then((data) => {
          if (!data) {
            console.error('文件下载失败')
          }
          console.log(data)
          // 最重要的一步，可以推送流到iframe
          frame.contentWindow.postMessage(data.data, this.context.origin)
        })
      }
    },
    // 插入iframe
    appendFrame(src) {
      var blobIframe = document.getElementById('blobIframe')
      if (this.context.frame) {
        blobIframe.removeChild(this.context.frame)
      }
      // 构建frame
      var frame = (this.context.frame = document.createElement('iframe'))
      frame.src = src
      frame.style = 'border:0;height: 100%;width:100%'
      return blobIframe.appendChild(frame)
    }
  }
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
