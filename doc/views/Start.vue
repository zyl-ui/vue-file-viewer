<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:29
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 14:02:18
 * @Descripttion: 快速上手
-->
<template>
  <div class="page-home page">
    <h3>属性(组件和iframe传参都支持)：</h3>
    <ul>
      <li>fileUrl: string 上传的地址（必传）</li>
      <li>
        useOfficeMicroOnline: boolean
        是否开启使用微软提供的office文件在线访问接口（内网无效，可选，默认false关闭）
      </li>
    </ul>
    <h3>注意事项：</h3>
    <h4>* 被浏览的文件链接必须同源或本身支持跨域才能访问和下载文件。</h4>
    <h4>
      *
      若发布生产的项目不在服务器域名根目录，记得配置打包的前缀路径，打包后资源才能被正常引用。（以vue-cli为例，配置
      <code>vue.config.js</code>
      的
      <code>publicPath: './'</code>
      ； 其他框架请自行选择合适的配置文件进行配置）
    </h4>
    <h4>
      *
      由于office系列格式的文件解析微软不开源，无法保证百分百还原文档效果，若实际需求没有严格要求百分百还原一致，您可以使用纯前端渲染office文件的这种方式，否则建议通过后端统一转为PDF或者图片格式进行浏览，PDF和图片格式的文件浏览效果最佳，内核渲染方案也较为成熟。
    </h4>
    <h4>
      * 或者您也可以通过iframe或者组件形式传递
      <code>useOfficeMicroOnline = true</code>
      这个属性开启office系列文件使用内置的微软文档在线访问接口，浏览效果会比纯前端渲染好。
    </h4>
    <h2>iframe方式示例（推荐）：</h2>
    <h3>使用说明：</h3>
    <h4>
      推荐独立部署本项目的编译编译构建产物
      <a
        href="https://github.com/zyl-ui/vue-file-viewer/tree/master/public/file-viewer"
        target="_blank"
      >
        file-viewer
      </a>
      ，并使用iframe方式引入以减少引入构建代价，提升构建效率。
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
    </h4>
    <h4>
      2、将下载后的 file-viewer
      文件夹整个放在项目公共文件夹中作为外部公共资源使用。 （以 vue-cli
      为例，放置在项目 public 文件夹下；其他框架自行选择合适的公共路径放置）
    </h4>

    <h3>一般url传入使用</h3>
    <section class="demo">
      <div class="section-content">
        <iframe
          src="./file-viewer/index.html?fileUrl=https://home.sharecorner.top/fileTest/pdf.pdf"
          scrolling="auto"
          style="border:0;height: 500px;width:100%"
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

    <h3>
      可通过
      <code>useOfficeMicroOnline = true</code>
      开启微软文档在线访问接口，该接口兼容不带后缀x的低版本文档，如：doc或者docx；
      开启后属于office的文件会通过微软提供的api接口进行访问
      <code>http://view.officeapps.live.com/op/view.aspx?src=文件地址</code>
      （隐私文件不推荐开启，该选项内网无联网时不可用）
    </h3>
    <section class="demo">
      <div class="section-content">
        <iframe
          src="./file-viewer/index.html?useOfficeMicroOnline=true&fileUrl=https://home.sharecorner.top/fileTest/doc.doc"
          scrolling="auto"
          style="border:0;height: 500px;width:100%"
        />
      </div>
    </section>
    <section class="snippets">
      <Collapse>
        <div class="section-content">
          <CodeSnippet
            class="snippet"
            :code="useOfficeMicroOnlineSnippet"
            lang="html"
          />
        </div>
      </Collapse>
    </section>

    <h3>支持接收二进制文件流消息推送</h3>
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
      <div class="section-content" style="height: 500px" id="blobIframe"></div>
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
    <CodeSnippet class="snippet" :code="installSnippet1" lang="js" />
    <CodeSnippet class="snippet" :code="installSnippet2" lang="js" />
    <div>或者页面内单独引入：</div>
    <CodeSnippet class="snippet" :code="installSnippet3" lang="js" />
    <h3>使用：</h3>
    <section class="demo">
      <div class="section-content">
        <vue-file-viewer
          :fileUrl="file"
          style="height: 500px;overflow: auto;"
        />
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
  style="border:0;height: 500px;width:100%"
/>
`

const useOfficeMicroOnlineSnippet = `
<iframe
  src="./file-viewer/index.html?useOfficeMicroOnline=true&fileUrl=https://home.sharecorner.top/fileTest/doc.doc"
  scrolling="auto"
  style="border:0;height: 500px;width:100%"
/>
`

const blobIframeSnippet1 = `
<div id="blobIframe" style="height: 500px"></div>
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

const installSnippet1 = `npm install --save '${config.name}'`

const installSnippet2 = `
import Vue from 'vue'
import App from './App.vue'
import VueFileViewer from '${config.name}'

Vue.use(VueFileViewer)

new Vue({
  el: '#app',
  render: h => h(App)
});
`

const installSnippet3 = `
import { VueFileViewer } from '${config.name}'

export default {
  components: {
    VueFileViewer
  }
}
`

const componentSnippet2 = `
data () {
  return {
    file: 'https://home.sharecorner.top/fileTest/word.docx' // or 原生 File 文件对象也可以被接收
  }
}
`

const componentSnippet1 = `
<vue-file-viewer :fileUrl="file"  style="height: 500px;overflow: auto;" />
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
      useOfficeMicroOnlineSnippet,
      blobIframeSnippet1,
      blobIframeSnippet2,
      installSnippet1,
      installSnippet2,
      installSnippet3,
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
