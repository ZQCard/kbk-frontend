import request from '@/utils/request'

export function listUser(params) {
  return request({
    url: '/admin/v1/user',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/admin/v1/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/v1/user',
    method: 'put',
    data
  })
}

export function deleteUser(params) {
  return request({
    url: '/admin/v1/user',
    method: 'delete',
    params
  })
}

export function recoverUser(data) {
  return request({
    url: '/admin/v1/user',
    method: 'patch',
    data
  })
}

export function forbidUser(data) {
  return request({
    url: '/admin/v1/user/forbid',
    method: 'patch',
    data
  })
}

export function approveUser(data) {
  return request({
    url: '/admin/v1/user/approve',
    method: 'patch',
    data
  })
}
