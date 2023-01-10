<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:30
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 17:35:48
 * @Descripttion: 代码片段
-->
<template>
  <div class="code-snippet">
    <div class="language">{{ lang }}</div>
    <div class="line-numbers">
      <div v-for="n in lineCount" :key="n" class="line-number">{{ n }}</div>
    </div>
    <div class="render" v-html="result" />
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/tomorrow-night.css' // 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件

export default {
  name: 'CodeSnippet',
  props: {
    code: { type: String, default: '' },
    lang: { type: String, default: '' }
  },
  computed: {
    result() {
      const highlighted = hljs.highlight(this.lang, this.code.trim())
      return highlighted.value
    },
    lineCount() {
      const str = this.result
      let length = 0
      for (var i = 0; i < str.length; ++i) {
        if (str[i] === '\n') {
          length++
        }
      }
      return length + 1
    }
  }
}
</script>

<style lang="scss">
.code-snippet {
  @include h-box;
  background: white;
  border-radius: 3px;
  font-family: 'Roboto Mono', monospace;
  font-size: 10pt;
  overflow: auto;
  border-bottom: solid 2px $md-grey-300;
  border-right: solid 1px $md-grey-100;
  position: relative;

  .line-numbers,
  .render {
    padding: 32px 24px;
  }

  .line-numbers {
    background: $md-grey-200;
    color: $md-grey-400;
    border-radius: 2px 0 0 2px;
  }

  .render {
    white-space: pre;
  }

  .language {
    position: absolute;
    top: 0;
    right: 0;
    background: $md-grey-200;
    color: $md-grey-400;
    padding: 4px 4px 6px 6px;
    border-radius: 0 0 0 2px;
  }
}
</style>
