<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:30
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-10 16:03:20
 * @Descripttion: 
-->
<template>
  <div class="collapse" :class="{ open: open }">
    <div class="toggle" @click="open = !open">
      {{ title }}
      <span class="icon">▼</span>
    </div>
    <div v-if="open" class="content"><slot /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  computed: {
    title() {
      return this.open ? '隐藏代码' : '显示代码'
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  padding: 12px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  color: #666;

  .icon {
    display: inline-block;
    transition: transform 0.3s ease-in-out;
    transform-origin: center 10px;
  }

  &:hover {
    color: black;
    background: #f8f8f8;
  }
}

.open {
  .toggle {
    .icon {
      transform: rotate(180deg);
    }
  }
}
</style>
