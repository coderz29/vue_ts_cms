import wfRequest from '@/service'

/**用户的网络请求 */
export function postUserListData(queryInfo: any) {
  return wfRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return wfRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return wfRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return wfRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/** 针对页面的网络请求：增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return wfRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return wfRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return wfRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return wfRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
