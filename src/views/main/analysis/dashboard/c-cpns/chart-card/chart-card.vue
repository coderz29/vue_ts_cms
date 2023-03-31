<template>
  <div class="chart-card">
    <div class="header">
      <span>{{ props.title }}</span>
    </div>
    <div class="content">
      <span> <slot>默认的内容</slot> </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface IProps {
  title: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '默认标题'
})
</script>

<style lang="less" scoped>
.chart-card {
  padding: 20px;
  background-color: #fff;
  margin: 20px 0;
  .header {
    height: 38px;
    line-height: 18px;
    border-bottom: 1px solid rgb(210, 210, 210);
  }
  .content {
    padding-top: 20px;
  }
}
</style>
