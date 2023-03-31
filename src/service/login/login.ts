import wfRequest from '..'
import type { IAccount } from '@/types'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return wfRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return wfRequest.get({
    url: `/users/${id}`
    // 需要携带token才能访问
    // headers: {
    //   Authorization: localCache.getCache(LOGIN_TOKEN)
    // }
  })
}
// 根据角色id获取相应的菜单
export function getUserMenusByRoleId(id: number) {
  return wfRequest.get({
    url: `/role/${id}/menu`
  })
}
