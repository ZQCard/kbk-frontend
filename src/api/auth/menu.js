import request from '@/utils/request'

export function getRoleMenu(params) {
  return request({
    url: '/admin/v1/authorization/roleMenuTree',
    method: 'get',
    params
  })
}

export function getBaseMenuTree(params) {
  return request({
    url: '/admin/v1/authorization/menuTree',
    method: 'get',
    params
  })
}


export function createMenu(data) {
  return request({
    url: '/admin/v1/authorization/menu',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: '/admin/v1/authorization/menu',
    method: 'put',
    data
  })
}

export function deleteMenu(params) {
  return request({
    url: '/admin/v1/authorization/menu',
    method: 'delete',
    params
  })
}