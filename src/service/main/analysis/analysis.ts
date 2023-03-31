import wfRequest from '@/service'

export function getAmountListData() {
  return wfRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return wfRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return wfRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return wfRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return wfRequest.get({
    url: '/goods/address/sale'
  })
}
