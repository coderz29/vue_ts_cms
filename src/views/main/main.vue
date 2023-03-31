<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <main-menu :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 处理main-header中折叠的变化
const isCollapse = ref(false)
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.main-content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    // 宽度发生变化时的动画
    transition: width 0.3s linear;
    scrollbar-width: none; /**firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
