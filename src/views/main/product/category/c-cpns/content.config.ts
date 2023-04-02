const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建列表'
  },
  propsList: [
    { type: 'selection', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '类别名称', prop: 'name', width: '150px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handle', label: '操作', width: '150px' }
  ]
}

export default contentConfig
