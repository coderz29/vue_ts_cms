<template>
  <div class="role">
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
    <page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'element-plus'

import searchConfig from './config/search.config'
import PageSearch from '@/components/page-search/page-search.vue'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(newCallBack, editCallBack)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(menuList)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
function editCallBack(itemData: any) {
  // console.log('编辑', itemData)
  const menuIds = mapMenuListToIds(itemData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
