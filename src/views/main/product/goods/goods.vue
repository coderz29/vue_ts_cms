<template>
  <div class="goods">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #imgUrl>
        <el-table-column align="center" label="图片">
          <img class="img" :src="goodsList[0].imgUrl" />
        </el-table-column>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useGoodsListStore from '@/store/main/product/product'

import pageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './c-cpns/search.config'

import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './c-cpns/content.config'

import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './c-cpns/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 编辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal()

// 图片
const goodsListStore = useGoodsListStore()
goodsListStore.getGoodsListAction()
const { goodsList } = storeToRefs(goodsListStore)
</script>

<style lang="less" scoped>
.img {
  width: 60px;
}
</style>
