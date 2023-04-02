const modalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品信息',
    editTitle: '更新商品信息'
  },
  formItems: [
    { type: 'input', label: '商品名称', prop: 'name', placeholder: '请输入商品名称' },
    { type: 'input', label: '原价格', prop: 'oldPrice', placeholder: '请输入原价格' },
    { type: 'input', label: '新价格', prop: 'newPrice', placeholder: '请输入新价格' },
    { type: 'select', label: '状态', prop: 'status', placeholder: '请选择状态' },
    { type: 'input', label: '库存', prop: 'inventoryCount', placeholder: '请输入库存数量' },
    { type: 'input', label: '销量', prop: 'saleCount', placeholder: '请输入销量' },
    { type: 'input', label: '收藏', prop: 'favorCount', placeholder: '请输入收藏数量' },
    { type: 'input', label: '地址', prop: 'address', placeholder: '请输入地址' }
  ]
}

export default modalConfig
