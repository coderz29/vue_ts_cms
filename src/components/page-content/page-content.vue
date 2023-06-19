<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" :label="item.label" :prop="item.prop">
              <template #default="scoped">
                {{ formatUTC(scoped.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'img'">
            <el-table-column align="center" label="图片">
              <template #default="scoped">
                <slot :name="item.slotName" v-bind="scoped"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handle'">
            <el-table-column align="center" :label="item.label" :width="item.width">
              <template #default="scoped">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scoped.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scoped.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              show-overflow-tooltip
              align="center"
              :type="item.type"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
            />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import userSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const prop = defineProps<IProps>()

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 0.判断是否有对应的增删改查的权限
const isCreate = usePermissions(`${prop.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${prop.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${prop.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${prop.contentConfig.pageName}:query`)

// 1.发起action,请求usersList的数据
const systemStore = userSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

fetchPageListData()

// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数,用于发送网络请求
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset / size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  // console.log(queryInfo)
  systemStore.postPageListAction(prop.contentConfig.pageName, queryInfo)
}

// 5.编辑和删除操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction(prop.contentConfig.pageName, id)
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 6.新建用户的操作
function handleNewUserClick() {
  emit('newClick')
}

// 页码的跳转
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

// 暴露出去
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    margin: 0;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
