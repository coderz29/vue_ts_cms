<template>
  <div class="card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="count1Ref" class="count">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span class="subtitle">{{ subtitle }}</span>
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="count2Ref" class="count">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
})

// 创建CountUP的实例对象
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
// 参数一：执行动画的元素
// 参数二：数字增加到多少
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, {})
  const countup2 = new CountUp(count2Ref.value!, props.number2, {})
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.card {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #888b8f;
  }
  .content {
    margin: 10px 0;
    font-size: 24px;
  }
  .footer {
    border-top: 1px solid #e0e1e2;
    padding-top: 10px;
    .subtitle {
      margin-right: 8px;
    }
    .count {
      color: #888b8f;
    }
  }
}
</style>
