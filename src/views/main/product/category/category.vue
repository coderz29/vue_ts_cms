<template>
  <div class="category">
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
    />
    <page-modal :modal-config="modalConfig" ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<style lang="less" scoped></style>
