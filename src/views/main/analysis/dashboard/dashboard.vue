<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2. 中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card title="分类商品数量(饼图)">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card title="不同城市商品的销量">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card title="分类商品数量(玫瑰图)">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card title="分类商品的销量">
          <line-echart
            :values="showGoodsCategorySale.values"
            :labels="showGoodsCategorySale.labels"
          />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card title="分类商品的收藏">
          <bar-echart
            :values="showGoodsCategoryFavor.values"
            :labels="showGoodsCategoryFavor.labels"
          />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/main/analysis/analysis'
import CountCard from './c-cpns/count-card/count-card.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'

// 发起数据的请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 从store获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

// 获取数据
const showGoodsCategoryCount = computed(() => {
  let all = goodsCategoryCount.value.map((item) => {
    if (item.name.includes('测试') || item.name.includes('Polo')) {
      return
    } else {
      return { name: item.name, value: item.goodsCount }
    }
  })
  return all
})
// 折线图
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
// 柱状图
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
// 地图
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped></style>
