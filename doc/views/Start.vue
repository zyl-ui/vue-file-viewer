<template>
  <div class="page-Start page">
    <section class="snippets">
      <div class="section-content">
        <CodeSnippet class="snippet" :code="mainSnippet" lang="js" />
      </div>
    </section>
  </div>
</template>

<script>
import CodeSnippet from '../components/CodeSnippet.vue'
import { config, upName } from '../config'

const mainSnippet = `
import Vue from 'vue'
import App from './App.vue'
import ${upName} from '${config.name}'
import '${config.name}.css'

Vue.use(${upName})

new Vue({
  el: '#app',
  render: h => h(App)
});
`
export default {
  name: 'Start',
  components: {
    CodeSnippet
  },
  data() {
    return {
      mainSnippet
    }
  }
}
</script>
