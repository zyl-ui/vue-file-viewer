<template>
  <div id="app">
    <header>
      <h1>{{ config.name }}</h1>
      <div class="command">npm install --save {{ config.name }}</div>
      <div class="description">{{ config.description }}</div>
      <section class="nav">
        <router-link v-for="d in routes" :key="d.path" :to="d.path">
          {{ d.name }}
        </router-link>
        <a href="https://github.com/zyl-ui/vue-file-viewer" target="_blank">
          源码
        </a>
        <a @click="toggleFullscreen">切换全屏</a>
      </section>
    </header>

    <router-view />

    <section class="more">
      <div>
        (©) 2023 - {{ new Date().getFullYear() }} copy by
        <a href="https://blog.sharecorner.top/" target="_blank">追寻</a>
        特别鸣谢
        <a href="https://blog.csdn.net/wybaby168/" target="_blank">
          小爬的老粉丝
        </a>
        提供源码内核思路
      </div>
    </section>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { routes } from './router'
import { config } from './config'

export default {
  data() {
    return {
      routes: routes.filter((route) => route.name),
      config
    }
  },
  created() {
    document.title = config.name + '-demo'
  },
  methods: {
    toggleFullscreen(event) {
      if (screenfull.isEnabled) {
        screenfull.toggle(document.documentElement)
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: white;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background: $primary-color;
  padding: 32px 20px 20px;

  .description {
    color: white;
    margin-top: 24px;
  }
}

.page-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  word-break: break-word;
}

section {
  .section-content {
    margin: 0;
    box-sizing: border-box;
  }

  &.nav {
    text-align: center;
    background: $primary-color;
    padding: 40px 20px 0;
    @include h-box;
    @include box-center;

    a {
      display: inline-block;
      padding: 0 16px;
      height: 36px;
      line-height: 36px;
      color: white;
      background: lighten($primary-color, 10%);
      border-radius: 3px;

      &:hover {
        background: lighten($primary-color, 20%);
      }

      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}

.collapse {
  .section-content {
    padding: 12px 0 40px 0;
  }
}

h1 {
  margin-top: 0;
  color: white;
  font-weight: normal;
  text-align: center;
}

h2 {
  font-weight: normal;
}

a {
  color: $primary-color;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: lighten($primary-color, 10%);
  }
}

.command {
  background: darken($primary-color, 10%);
  color: white;
  font-family: monospace;
  max-width: 500px;
  margin: 12px auto;
  border-radius: 2px;
  padding: 12px 24px;
  box-sizing: border-box;
  text-align: center;
}

.description {
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.snippet {
  margin: 16px 0;
}

.plus {
  text-align: center;
  color: $primary-color;
  font-size: 32px;
  margin: 12px;
}

.snippets {
  background: #f7f7f7;
  border: 1px solid #f7f7f7;
  margin-bottom: 42px;
  border-radius: 0 0 3px 3px;
}

.demo {
  background: white;
  border: 1px solid #eee;
  border-radius: 3px 3px 0 0;
}

.more {
  font-size: 18px;
  text-align: center;
  background: lighten($primary-color, 45%);
  padding: 10px 0;
}
</style>
