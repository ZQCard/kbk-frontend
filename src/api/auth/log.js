import request from '@/utils/request'

export function listLog(params) {
  return request({
    url: '/admin/v1/log/list',
    method: 'get',
    params
  })
}
