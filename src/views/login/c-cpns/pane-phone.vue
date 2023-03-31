<template>
  <div class="pane-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号" prop="phone">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verity-code">
          <el-input />
          <span>
            <el-button class="get-btn" type="primary">获取验证码</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
// import type { FormRules } from 'element-plus'
// import type { IPhone } from '@/types/login'
// import { reactive } from 'vue'

// const phoneNumber = reactive<IPhone>({
//   phone: 0
// })

// // const phoneRules: FormRules = {
//   phone: [
//     { required: true, message: '请输入手机号', trigger: 'blur' },
//     {
//       pattern: /^1[0-9]{11}$/,
//       message: '请输入手机号',
//       trigger: 'blur'
//     }
//   ]
// }
</script>

<style lang="less" scoped>
.verity-code {
  display: flex;
  .get-btn {
    margin-left: 8px;
  }
}
</style>
