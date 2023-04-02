import wfRequest from '@/service'

export function getGoodsCategoryList() {
  return wfRequest.post({
    url: '/goods/list'
  })
}
