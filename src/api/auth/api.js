import request from '@/utils/request'

export function getApiAll(params) {
  return request({
    url: '/admin/v1/authorization/apiAll',
    method: 'get',
    params
  })
}

export function listApi(params) {
  return request({
    url: '/admin/v1/authorization/api',
    method: 'get',
    params
  })
}

export function createApi(data) {
  return request({
    url: '/admin/v1/authorization/api',
    method: 'post',
    data
  })
}

export function updateApi(data) {
  return request({
    url: '/admin/v1/authorization/api',
    method: 'put',
    data
  })
}

export function deleteApi(params) {
  return request({
    url: '/admin/v1/authorization/api',
    method: 'delete',
    params
  })
}
