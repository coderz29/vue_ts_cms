<template>
  <div class="login-panel">
    <h1 class="title">WF后台管理系统</h1>
    <div class="tab">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="帐号登陆" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登陆</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link class="wang" type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" round size="large" @click="handleLoginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    // 1.获取子组件的实例
    accountRef.value?.loginAction(isRemPwd.value)
    // 2.调用子组件的方法
  } else {
    console.log('用户点击了手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .tab {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        margin-left: 5px;
      }
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wang {
      margin-bottom: 1px;
    }
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
