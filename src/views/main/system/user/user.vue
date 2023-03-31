<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(formData: any) {
  // console.log(formData)
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof userModal>>()
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditBtnClick(itemData: any) {
  // console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped></style>
