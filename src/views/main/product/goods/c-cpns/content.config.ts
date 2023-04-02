const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新增商品'
  },
  propsList: [
    { type: 'selection', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', label: '商品名称', prop: 'name', width: '120px' },
    { type: 'normal', label: '原价格', prop: 'oldPrice', width: '80px' },
    { type: 'normal', label: '新价格', prop: 'newPrice', width: '80px' },
    { type: 'normal', label: '商品描述', prop: 'desc', width: '120px' },
    { type: 'normal', label: '状态', prop: 'status', width: '80px' },
    { type: 'img', label: '图片', slotName: 'imgUrl' },
    { type: 'normal', label: '库存', prop: 'inventoryCount', width: '80px' },
    { type: 'normal', label: '销量', prop: 'saleCount', width: '80px' },
    { type: 'normal', label: '收藏', prop: 'favorCount', width: '80px' },
    { type: 'normal', label: '地址', prop: 'address', width: '80px' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' }
  ]
}

export default contentConfig
