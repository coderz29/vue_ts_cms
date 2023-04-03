<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <template v-if="item.type === 'input'">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </el-form-item>
            </template>
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
            <template v-else>
              <el-form-item :label="item.label" :prop="item.prop">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </el-form-item>
            </template>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
// import useMainStore from '@/store/main/main'
import userSystemStore from '@/store/main/system/system'

// 0.定义prop
interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const prop = defineProps<IProps>()

// 1. 定义内部的属性
const dialogVisible = ref(false)
const initialData: any = {}
for (const item of prop.modalConfig.formItems) {
  initialData[item.prop] = ''
}
const formData = reactive<any>(initialData)

const isNewRef = ref(true)
const editData = ref()

// 2. 获取 roles / department数据
// const mainStore = useMainStore()
const systemStore = userSystemStore()
// const { entireDepartments } = storeToRefs(mainStore)

// 2. 定义设置 dialogVisible 方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

// 3. 点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = { ...formData }
  if (prop.otherInfo) {
    infoData = { ...infoData, ...prop.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(prop.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新的部门
    systemStore.newPageDataAction(prop.modalConfig.pageName, infoData)
  }
}

// 往外暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
