import wfRequest from '..'

// 所有的角色
export function getEntireRoles() {
  return wfRequest.post({
    url: '/role/list'
  })
}

// 所有的部门
export function getEntireDepartment() {
  return wfRequest.post({
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return wfRequest.post({
    url: '/menu/list'
  })
}
