import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(newCallBack?: CallbackFnType, editCallBack?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallBack) newCallBack()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallBack) editCallBack(itemData)
  }
  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal
