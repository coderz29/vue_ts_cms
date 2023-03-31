<template>
  <div class="pane-account">
    <el-form
      :rules="accountRules"
      :model="account"
      label-width="60"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, ElForm } from 'element-plus'
import type { IAccount } from '@/types'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,16}$/,
      message: '请输入3~16位由数字或字母组成的帐号',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入帐号密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '请输入3位及以上由数字或字母组成的密码',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求（携带帐号和密码）
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.登录成功之后保存账号密码
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确的格式后再操作！')
    }
  })
}
// 给父组件暴露出去
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
